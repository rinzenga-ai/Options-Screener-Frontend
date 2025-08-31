import React from "react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="page">
      <style>{`
        .page {
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          background: #000;
          color: #fff;
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .logo {
          display: block;
          margin: 0 auto 30px auto;
        }
        .hero {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero h1 {
          font-size: 40px;
          font-weight: 900;
          margin-bottom: 18px;
          white-space: nowrap; /* prevent wrapping */
        }
        .hero p {
          font-size: 18px;
          color: #d1d5db;
          margin-bottom: 18px;
        }
        .bullets {
          list-style: disc;
          list-style-position: inside;
          padding-left: 20px;
          text-align: left;
          display: inline-block;
          margin: 0 auto;
        }
        .bullets li {
          margin: 6px 0;
          font-size: 16px;
          color: #f9fafb;
        }
        .section {
          margin: 60px 0;
          text-align: center;
        }
        .section h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 18px;
        }
        .section p {
          font-size: 17px;
          color: #d1d5db;
          max-width: 700px;
          margin: 0 auto 22px auto;
        }
        .btn {
          display: inline-block;
          margin: 0 10px;
          padding: 12px 22px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .btn.primary {
          background: #2563eb;
          color: #fff;
        }
        .btn.primary:hover {
          background: #1d4ed8;
        }
        .btn.secondary {
          background: #374151;
          color: #fff;
        }
        .btn.secondary:hover {
          background: #4b5563;
        }
        footer {
          margin-top: 80px;
          padding: 20px;
          text-align: center;
          color: #9ca3af;
          border-top: 1px solid #1f2937;
        }
        footer a {
          color: #9ca3af;
          text-decoration: underline;
        }
      `}</style>

      <div className="wrap">
        {/* ===== Logo ===== */}
        <Image
          src="/inz-logo-transparent.png"
          alt="INZ Logo"
          width={220}   // enlarged logo size
          height={220}
          className="logo"
        />

        {/* ===== Hero Section ===== */}
        <div className="hero">
          <h1>Data Driven Trade Evaluation Platform</h1>
          <p>Smarter decisions. Cleaner workflows. Proven results.</p>
          <ul className="bullets">
            <li>Instant evaluation of options trades</li>
            <li>Custom tolerances and scoring breakdown</li>
            <li>Professional UI built for investors</li>
          </ul>
        </div>

        {/* ===== Demo Section ===== */}
        <div className="section">
          <h2>See it in Action</h2>
          <p>
            Try the live demo and download the one-pager. And for a deeper walkthrough, 
            feel free to reach out anytime.
          </p>
          <a href="https://options-screener-frontend.vercel.app" className="btn primary">
            Launch Demo
          </a>
          <a href="/one-page.pdf" className="btn secondary">
            Download One-Pager
          </a>
        </div>

        {/* ===== Contact Section ===== */}
        <footer>
          <p>
            For inquiries, contact:{" "}
            <a href="mailto:rinzenga@yahoo.com">rinzenga@yahoo.com</a>
          </p>
          <p>© {new Date().getFullYear()} INZ Options Screener</p>
        </footer>
      </div>
    </div>
  );
}
