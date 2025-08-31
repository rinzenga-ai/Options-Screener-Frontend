import React, { useState } from "react";
import Head from "next/head";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple mailto handler (no backend). We can wire Formspree/EmailJS later.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Options Screener — Contact");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:rinzenga@yahoo.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Head>
        <title>Contact — Options Screener</title>
        <meta name="description" content="Contact the Options Screener team." />
      </Head>

      <div className="page">
        <header className="nav">
          <div className="container nav-inner">
            <a href="/" className="brand" aria-label="Options Screener Home">
              <img src="/inz-logo.png" alt="Logo" className="brand-logo" />
              <span className="brand-text">Options Screener</span>
            </a>
            <nav className="links" aria-label="Primary">
              <a href="/">Home</a>
              <a href="/app" className="btn small primary">Launch Demo</a>
            </nav>
          </div>
        </header>

        <main className="container main">
          <h1>Contact</h1>

          <div className="grid">
            <form className="card" onSubmit={handleSubmit} noValidate>
              <div className="row">
                <label htmlFor="name">Name</label>
                <input
                  id="name" name="name" type="text" value={form.name}
                  onChange={handleChange} placeholder="Your name" required
                />
              </div>
              <div className="row">
                <label htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com" required
                />
              </div>
              <div className="row">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="111-222-3434"
                />
              </div>
              <div className="row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" value={form.message}
                  onChange={handleChange} placeholder="How can we help?" required
                />
              </div>
              <button type="submit" className="btn primary">Send Message</button>
            </form>

            <aside className="card direct">
              <h2>Direct</h2>
              <p><strong>Ryan Inzenga</strong></p>
              <p><a href="mailto:rinzenga@yahoo.com" className="link">rinzenga@yahoo.com</a></p>
              <p><a href="tel:+16018628625" className="link">601.862.8625</a></p>
              <p className="muted">We typically reply within 1 business day.</p>
            </aside>
          </div>
        </main>

        <footer className="footer">
          <div className="container footer-inner">
            <div className="foot-left">
              <strong>Options Screener</strong>
              <div className="fine">© {new Date().getFullYear()} — All rights reserved.</div>
            </div>
            <div className="foot-right">
              <a href="/contact" className="muted">Contact</a>
              <span className="sep" aria-hidden>•</span>
              <span className="muted">For demonstration purposes; not financial advice.</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        :global(html, body) { margin: 0; padding: 0; }
        .page { background: #000; color: #e5e7eb; min-height: 100vh; }

        .container { max-width: 1180px; margin: 0 auto; padding: 0 20px; }

        /* Nav */
        .nav { position: sticky; top: 0; z-index: 10; background: #000; border-bottom: 1px solid #0b0b0b; }
        .nav-inner { height: 68px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; }
        .brand-logo { height: 56px; width: auto; display: block; }
        .brand-text { font-weight: 900; letter-spacing: .2px; color: #f3f4f6; font-size: 18px; }
        .links { display: flex; align-items: center; gap: 16px; }
        .links a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
        .links a:hover { color: #fff; }
        .btn.small { height: 30px; line-height: 30px; padding: 0 10px; border-radius: 8px; font-weight: 800; }

        .btn { display: inline-block; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 10px;
               text-decoration: none; font-weight: 800; border: 1px solid #64748b; background: #f8fafc; color: #0f172a; }
        .btn.primary { background: #2563eb; border-color: #2563eb; color: #fff; }
        .btn.primary:hover { background: #1d4ed8; }

        /* Main */
        .main { padding: 40px 0; }
        .main h1 { text-align: center; margin: 0 0 20px; font-size: 34px; font-weight: 900; }

        .grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 18px; align-items: start; }

        .card {
          background: #e9eef5; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 12px;
          padding: 18px; box-shadow: 0 8px 18px rgba(0,0,0,.25);
        }

        /* Ensure inputs never overflow the card */
        form .row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
        label { color: #0f172a; font-weight: 700; font-size: 14px; }
        input, textarea {
          display: block;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box; /* critical: no overflow */
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #94a3b8;
          background: #ffffff;
          color: #0f172a;
          font-size: 15px;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.2);
        }
        textarea { min-height: 120px; resize: vertical; }

        .direct h2 { margin: 0 0 8px; }
        .link { color: #0f172a; text-decoration: underline; }
        .link:hover { color: #1f2937; }
        .muted { color: #374151; }

        /* Footer */
        .footer { border-top: 1px solid #0b0b0b; background: #000; }
        .footer-inner { height: 72px; display: flex; align-items: center; justify-content: space-between; }
        .fine { color: #94a3b8; font-size: 12px; margin-top: 2px; }
        .muted { color: #94a3b8; text-decoration: none; }
        .muted:hover { color: #cbd5e1; }
        .sep { margin: 0 8px; color: #334155; }

        /* Responsive */
        @media (max-width: 940px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
