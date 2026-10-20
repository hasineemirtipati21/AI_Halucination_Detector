import os
import re
import json
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

class ContentRequest(BaseModel):
    content: str

app = FastAPI()

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins.split(",") if origin.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to validate citations
def validate_citations(text):
    urls = re.findall(r'(https?://[^\s]+)', text)
    citation_results = []

    for url in urls:
        try:
            r = requests.head(url, timeout=5)
            if r.status_code < 400:
                status = "Valid Source"
            else:
                status = "Broken Link"
        except:
            status = "Fake Reference"
        citation_results.append({"url": url, "status": status})

    return citation_results

@app.post("/detect")
async def detect_content(req: ContentRequest):
    if not req.content.strip():
        return {
            "hallucination_score": 0,
            "confidence": 0,
            "risk": "Unknown",
            "facts": [],
            "citations": [],
            "reliability_score": 0
        }

    # Hallucination detection prompt
    prompt = f"""
You are an AI hallucination detection system.

Analyze the content for factual errors, impossible claims, or false associations.

Return ONLY valid JSON in this format:
{{
  "hallucination_score": 0-100,
  "confidence": 0-100,
  "risk": "Low" | "Medium" | "High"
}}

Content:
\"\"\"{req.content}\"\"\"
"""

    # Fact verification prompt
    fact_prompt = f"""
You are a fact-checking AI.

List all the claims in the following content and label each as True, False, or Uncertain.
Return ONLY JSON array like this:
[
  {{
    "claim": "Claim text",
    "status": "True" | "False" | "Uncertain"
  }}
]

Content:
\"\"\"{req.content}\"\"\"
"""

    try:
        # Hallucination detection
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You detect hallucinations in text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )
        output = response.choices[0].message.content.strip()
        start = output.find("{")
        end = output.rfind("}") + 1
        result = json.loads(output[start:end])

        # Fact verification
        fact_response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You verify factual claims."},
                {"role": "user", "content": fact_prompt}
            ],
            temperature=0
        )
        fact_output = fact_response.choices[0].message.content.strip()
        fact_start = fact_output.find("[")
        fact_end = fact_output.rfind("]") + 1
        facts = json.loads(fact_output[fact_start:fact_end])
        result["facts"] = facts

        # Citation validation
        citations = validate_citations(req.content)
        result["citations"] = citations

        # Reliability scoring
        reliability = 100
        reliability -= result["hallucination_score"] * 0.5

        for fact in facts:
            if fact["status"] == "False":
                reliability -= 5
            elif fact["status"] == "Uncertain":
                reliability -= 2

        for citation in citations:
            if citation["status"] in ["Broken Link", "Fake Reference"]:
                reliability -= 3

        reliability = max(0, min(100, reliability))
        result["reliability_score"] = round(reliability)

        return result

    except Exception as e:
        return {
            "hallucination_score": 0,
            "confidence": 0,
            "risk": "Unknown",
            "facts": [],
            "citations": [],
            "reliability_score": 0,
            "error": str(e)
        }
