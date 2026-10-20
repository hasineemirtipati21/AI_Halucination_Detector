import React from "react";

const About = () => {
  return (
    <div
      style={{
        padding: "80px",
        maxWidth: "1100px",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        gap: "60px",
      }}
    >
      {/* LEFT CONTENT */}
      <div style={{ flex: 1 }}>
        <h1>About AI Hallucination & Citation Verification System</h1>

        <p>
          Generative AI models are increasingly used for research, education,
          content creation, and decision-making. While these systems offer
          powerful capabilities, they often generate information that appears
          highly confident but is factually incorrect. This issue is known as
          <strong> AI hallucination</strong>.
        </p>

        <p>
          A major extension of this problem is the creation of
          <strong> fake citations, non-existent references, and broken links</strong>.
          These references look valid but cannot be verified, making it
          difficult for users to trust AI-generated content. Such misinformation
          may lead to ethical concerns, legal risks, and poor decision-making.
        </p>

        <p>
          The <strong>AI Hallucination and Citation Verification System</strong>
          aims to solve this problem by automatically analyzing AI-generated
          content. It detects hallucinated claims, verifies factual statements,
          and validates citations against reliable sources.
        </p>

        <p>
          This platform helps users clearly distinguish between reliable and
          unreliable AI-produced information, promoting responsible AI usage
          and improving overall content credibility.
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="https://illustrations.popsy.co/amber/digital-nomad.svg"
          alt="AI Verification Illustration"
          style={{ width: "420px", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

export default About;
