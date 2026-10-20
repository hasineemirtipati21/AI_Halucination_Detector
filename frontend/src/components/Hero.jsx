import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge">AI Verification System</span>

        <h1>
          Detect AI <br />
          Hallucinations & <br />
          Fake Citations
        </h1>

        <p>
          A web-based platform to verify AI-generated content, identify
          hallucinated claims, and validate citations for reliable information.
        </p>

        <button className="hero-btn">Start Detection</button>
      </div>

      <div className="hero-right">
        <img
          src="https://illustrations.popsy.co/amber/digital-nomad.svg"
          alt="AI Illustration"
        />
      </div>
    </section>
  );
};

export default Hero;
