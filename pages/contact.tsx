import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ContactPage() {
  const router = useRouter();
  const sent = router.query.sent === "1";

  return (
    <>
      <Head>
        <title>Contact • Options Screener</title>
        <meta name="description" content="Contact the Options Screener team." />
      </Head>

      <div className="page">
        {/* Top hero (matches landing background tone) */}
        <header className="hero">
          <h1>Contact</h1>
          <p>Questions, demo requests, or enterprise discussions—happy to help.</p>
        </header>

        <main className="wrap">
          {sent && (
            <div className="alert success" role="status" aria-live="polite">
              Thank you—your message was sent. I’ll get back to you shortly.
            </div>
          )}

          <section className="grid">
            {/* Left: Direct contact info (light card) */}
            <div className="card light">
              <h2>Reach Me Directly</h2>
              <ul className="contact-list">
                <li>
                  <span className="label">Email</span>
                  <a href="mailto:rinzenga@yahoo.com">rinzenga@yahoo.com</a>
                </li>
                <li>
                  <span className="label">Phone</span>
                  <a href="tel:16018628625">601.862.8625</a>
                </li>
                <li>
                  <span className="label">Website</span>
                  <a
                    href="https://options-screener-frontend.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    options-screener-frontend.vercel.app
                  </a>
                </li>
              </ul>
              <p className="note">
                Prefer email? That’s the quickest way to reach me. For a deeper walkthrough, include a
                couple of times that work for you.
              </p>
            </div>

            {/* Right: Formspree-powered form (light card) */}
            <div className="card light">
              <h2>Send a Message</h2>
              <form
                action="https://formspree.io/f/xqadbgel"
                method="POST"
                className="contact-form"
              >
                {/* Helpful metadata */}
                <input type="hidden" name="_subject" value="Options Screener: New Contact" />
                {/* Redirect back to this page with a success flag */}
                <input type="hidden" name="_redirect" value="/contact?sent=1" />

                <div className="row">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="111-222-3434"
                    autoComplete="tel"
                  />
                </div>

                <div className="row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="How can I help?"
                  />
                </div>

                <div className="actions">
                  <button type="submit" className="btn primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        /* Page background matches landing */
        .page {
          min-height: 100vh;
          background: #0b1220; /* same dark background as landing */
          color: #e5e7eb;
        }

        /* Hero */
        .hero {
          padding: 36px 16px 8px;
          text-align: center;
        }
        .hero h1 {
          margin: 0 0 6px;
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.2px;
        }
        .hero p {
          margin: 0;
          color: #cbd5e1;
        }

        /* Wrapper width aligns with landing layout */
        .wrap {
          max-width: 980px;
          margin: 0 auto;
          padding: 16px;
        }

        /* Success banner */
        .alert {
          padding: 12px 14px;
          border-radius: 10px;
          margin-bottom: 12px;
          border: 1px solid #334155;
        }
        .alert.success {
          background: #052e1a;
          border-color: #10b981;
          color: #d1fae5;
        }

        /* Two-column grid, responsive */
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        /* Light cards to match landing page boxes */
        .card.light {
          background: #e9eef5;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 16px;
          color: #0f172a; /* dark text on light card */
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
        }
        .card.light h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 20px;
          font-weight: 800;
        }

        /* Contact list, clean labels */
        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0 0 12px;
        }
        .contact-list li {
          display: flex;
          gap: 10px;
          align-items: baseline;
          margin-bottom: 8px;
          color: #0f172a;
        }
        .contact-list .label {
          width: 74px;
          font-weight: 700;
          color: #334155;
          flex: 0 0 auto;
        }
        .contact-list a {
          color: #1d4ed8;
          text-decoration: none;
          font-weight: 600;
        }
        .contact-list a:hover {
          text-decoration: underline;
        }
        .note {
          color: #334155;
          margin: 8px 0 0;
          font-size: 14px;
        }

        /* Form in light card (white inputs for readability) */
        .contact-form {
          display: grid;
          gap: 10px;
        }
        .row {
          display: grid;
          gap: 6px;
        }
        label {
          color: #0f172a;
          font-weight: 700;
          font-size: 14px;
        }
        input,
        textarea {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #94a3b8;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
        }
        input:focus,
        textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        /* Buttons (match landing) */
        .actions {
          display: flex;
          gap: 8px;
        }
        .btn {
          height: 36px;
          padding: 0 14px;
          border-radius: 8px;
          border: 1px solid #64748b;
          background: #f8fafc;
          color: #0f172a;
          cursor: pointer;
          font-weight: 700;
        }
        .btn:hover {
          background: #eef2f7;
        }
        .btn.primary {
          background: #2563eb;
          color: #fff;
          border-color: #2563eb;
        }
        .btn.primary:hover {
          background: #1d4ed8;
        }
      `}</style>
    </>
  );
}
