import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just UI success (can connect backend later)
    console.log("Contact Form Data:", form);
    setSuccess(true);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Get in Touch With Us</h2>
        <p>Have questions or feedback? We'd love to hear from you.</p>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        ) : (
          <div className="success-message">
            ✅ Message sent successfully!  
            <br /> We’ll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
