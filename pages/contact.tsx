import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now: just log form data
    console.log("Submitted:", form);
    alert("Thanks! Your message has been recorded.");
  };

  return (
    <div className="page">
      <style>{`
        .page {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          background: #000;
          color: #fff;
          min-height: 100vh;
          padding: 40px 20px;
        }
        .wrap {
          max-width: 700px;
          margin: 0 auto;
          background: #1f2937;
          padding: 30px;
          border-radius: 12px;
        }
        h1 {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 20px;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        label {
          font-size: 14px;
          margin-bottom: 4px;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #374151;
          background: #111827;
          color: #fff;
          font-size: 15px;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #2563eb;
        }
        textarea {
          min-height: 120px;
        }
        .btn {
          background: #2563eb;
          border: none;
          padding: 12px;
          border-radius: 8px;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
        }
        .btn:hover {
          background: #1d4ed8;
        }
      `}</style>

      <div className="wrap">
        <h1>Contact</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="601.862.8625" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help?" />
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}
