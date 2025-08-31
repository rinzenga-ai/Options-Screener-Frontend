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
        <header className="hero">
          <h1>Contact</h1>
          <p>Questions, demo requests, or enterprise discussions—happy to help.</p>
        </header>

        <main className="wrap">
          {sent && (
            <div className="alert success">
              Thank you—your message was sent. I’ll get back to you shortly.
            </div>
          )}

          <section className="grid">
            {/* Left: Direct contact info */}
            <div className="card">
              <h2>Reach me directly</h2>
              <ul className="contact-list">
                <li><span>📧</span><a href="mailto:rinzenga@yahoo.com">rinzenga@yahoo.com</a></li>
                <li><span>📞</span><a href="tel:16018628625">601.862.8625</a></li>
                <li><span>🌐</span><a href="https://options-screener-frontend.vercel.app" target="_blank" rel="noopener noreferrer">options-screener-frontend.vercel.app</a></li>
              </ul>
              <p className="note">
                Prefer email? That’s the quickest way to reach me. For a deeper walkthrough,
                include a couple of times that work for you.
              </p>
            </div>

            {/* Right: Formspree-powered form */}
            <div className="card">
              <h2>Send a message</h2>
              <form
                action="https://formspree.io/f/xqadbgel" // <-- replace with e.g. https://formspree.io/f/abcxyz
                method="POST"
              >
                {/* Helpful metadata */}
                <input type="hidden" name="_subject" value="Options Screener: New Contact" />
                {/* Redirect back to this page with a success flag */}
                <input type="hidden" name="_redirect" value="/contact?sent=1" />

                <div className="row">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" />
                </div>

                <div className="row">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>

                <div className="row">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="111-222-3434" />
                </div>

                <div className="row">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required placeholder="How can I help?" />
                </div>

                <div className="actions">
                  <button type="submit" className="btn primary">Send Message</button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .page { min-height: 100vh; background: #0b1220; color: #e5e7eb; }
        .hero { padding: 36px 16px 8px; text-align: center; }
        .hero h1 { margin: 0 0 6px; font-size: 32px; font-weight: 900; color: #fff; }
        .hero p { margin: 0; color: #cbd5e1; }

        .wrap { max-width: 980px; margin: 0 auto; padding: 16px; }
        .alert { padding: 12px 14px; border-radius: 10px; margin-bottom: 12px; border: 1px solid #334155; }
        .alert.success { background: #052e1a; border-color: #10b981; color: #d1fae5; }

        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }

        .card { background: #101828; border: 1px solid #243043; border-radius: 12px; padding: 16px; }
        .card h2 { margin: 0 0 10px; color: #fff; font-size: 20px; }

        .contact-list { list-style: none; padding: 0; margin: 0 0 12px; }
        .contact-list li { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; color: #e5e7eb; }
        .contact-list a { color: #93c5fd; text-decoration: none; }
        .contact-list a:hover { text-decoration: underline; }
        .note { color: #cbd5e1; margin: 6px 0 0; font-size: 14px; }

        form { display: grid; gap: 10px; }
        .row { display: grid; gap: 6px; }
        label { color: #cbd5e1; font-weight: 700; }
        input, textarea {
          background: #0f172a; color: #e5e7eb; border: 1px solid #334155; border-radius: 8px;
          padding: 10px 12px; font-size: 14px; outline: none;
        }
        input:focus, textarea:focus { border-color: #60a5fa; box-shadow: 0 0 0 2px rgba(96,165,250,.2); }

        .actions { display: flex; gap: 8px; }
        .btn { height: 36px; padding: 0 14px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #e5e7eb; cursor: pointer; }
        .btn.primary { background: #2563eb; border-color: #2563eb; color: #fff; }
        .btn.primary:hover { background: #1d4ed8; }
      `}</style>
    </>
  );
}
