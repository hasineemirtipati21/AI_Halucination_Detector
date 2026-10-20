import React, { useState } from "react";
import "./Dashboard.css";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetection = async () => {
    if (!content) {
      alert("Please enter content");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to detect content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Detect AI <br /> Hallucinations & <br /> Fake Citations
          </h1>
          <p>
            Verify AI-generated content, detect hallucinations, and assess risk.
          </p>
          <button
            className="hero-btn"
            onClick={() =>
              document
                .getElementById("detect-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Detection
          </button>
        </div>
        <div className="hero-right">
          <img
            src="https://illustrations.popsy.co/amber/digital-nomad.svg"
            alt="AI Illustration"
          />
        </div>
      </section>

      {/* DETECTION AREA */}
      <section className="detect-section" id="detect-section">
        <h2>Start Detection</h2>
        <textarea
          placeholder="Paste AI-generated content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleDetection}>Analyze Content</button>

        {loading && <p style={{ marginTop: "20px", color: "orange" }}>⏳ Analyzing...</p>}

        {result && !loading && (
          <div className="analysis-box">
            <h3>Analysis Result</h3>
            <p><strong>Hallucination Score:</strong> {result.hallucination_score}%</p>
            <p><strong>Confidence Level:</strong> {result.confidence}%</p>
            <p><strong>Risk Assessment:</strong> {result.risk}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${result.hallucination_score}%` }}
              />
            </div>

            {/* FACT VERIFICATION */}
            {result.facts && result.facts.length > 0 && (
              <div className="fact-verification">
                <h4>Fact Verification</h4>
                <ul>
                  {result.facts.map((fact, index) => (
                    <li key={index}>
                      <strong>{fact.claim}:</strong> {fact.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CITATION VALIDATION */}
            {result.citations && result.citations.length > 0 ? (
              <div className="citation-validation">
                <h4>Citation Validation</h4>
                <ul>
                  {result.citations.map((citation, index) => (
                    <li key={index}>
                      <strong>{citation.url}:</strong> {citation.status}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No citations found.</p>
            )}

            {/* RELIABILITY SCORING */}
            {result.reliability_score !== undefined && (
              <div className="reliability-score">
                <h4>Reliability Score</h4>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${result.reliability_score}%`,
                      backgroundColor:
                        result.reliability_score > 70
                          ? "green"
                          : result.reliability_score > 40
                          ? "orange"
                          : "red",
                    }}
                  />
                </div>
                <p>{result.reliability_score}% reliable</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
