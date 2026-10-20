import React from "react";

const featureData = [
  { title: "AI Hallucination Detection", icon: "🧠" },
  { title: "Fact Verification", icon: "✅" },
  { title: "Citation Validation", icon: "📚" },
  { title: "Reliability Scoring", icon: "📊" },
];

const Features = () => {
  return (
    <div style={{ padding: "80px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "50px" }}>
        Features
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
        }}
      >
        {featureData.map((feature, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginRight: "20px",
              }}
            >
              {feature.icon}
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{feature.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
