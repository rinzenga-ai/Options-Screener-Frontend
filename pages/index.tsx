import React from "react";
import Head from "next/head";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Options Screener — Data-Driven Trade Evaluation</title>
        <meta
          name="description"
          content="Quantitative scoring for options trades. Configure tolerances, evaluate instantly, and export — built for institutional use."
        />
        <meta property="og:title" content="Options Screener" />
        <meta
          property="og:description"
          content="Quantitative trade scoring with ROI, risk, and configurable tolerances."
        />
        <meta property="og:image" content="/hero.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Options Screener" />
        <meta
          name="twitter:description"
          content="Quantitative trade scoring with ROI, risk, and tolerances."
        />
        <meta name="twitter:image" content="/hero.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page">
        {/* ====== Top Nav ====== */}
        <header className="nav">
          <div className="container nav-inner">
            <a href="/" className="brand" aria-label="Options Screener Home">
              <img src="/inz-logo.png" alt="Logo" className="brand-logo" />
              <span className="brand-text">Options Screener</span>
            </a>
            <nav className="links" aria-label="Primary">
              <a href="#problem">Problem</a>
              <a href="#solution">Solution</a>
              <a href="#features">Features</a>
              <a href="/app" className="btn small primary">Launch Demo</a>
              {/* New: Contact link styled like the other text links */}
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* ====== Hero ====== */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title">Data-Driven Trade Evaluation Platform</h1>

              <p className="sub">
                Evaluate options trades with transparent scoring. Set tolerances for ROI, Delta, Beta, and DTE,
                then compare candidates instantly — consistent, auditable, and easy to export.
              </p>

              <ul className="bullets">
                <li><span className="dot" /> Configurable tolerances with meaningful penalties</li>
                <li><span className="dot" /> Clear breakdown of points and deductions</li>
                <li><span className="dot" /> Suggestion bands: Conservative / Neutral / Aggressive</li>
                <li><span className="dot" /> CSV export and production-ready API</li>
              </ul>

              <div className="cta">
                <a href="/app" className="btn primary" aria-label="Launch demo app">Launch Demo</a>
                <a
                  href="/one-pager.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                  aria-label="Download one-pager PDF"
                >
                  Download One-Pager
                </a>
              </div>
            </div>

            <div className="hero-shot">
              <img src="/hero.png" alt="Options Screener — app screenshot" />
            </div>
          </div>
        </section>

        {/* ====== Problem ====== */}
        <section id="problem" className="section">
          <div className="container">
            <div className="grid-2">
              <div className="card">
                <h2>The Problem</h2>
                <p>
                  Evaluating puts/calls is noisy and manual. Traders juggle ROI, Delta, Beta, DTE and support levels
                  while bias slips in. Existing tools are slow, inconsistent, and hard to audit.
                </p>
              </div>
              <div className="card">
                <h2>What’s Needed</h2>
                <p>
                  A configurable scoring system that applies risk thresholds consistently, surfaces the right opportunities,
                  and produces transparent outputs for review and compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== Solution / Features ====== */}
        <section id="solution" className="section band">
          <div className="container">
            <div className="center">
              <h2>The Solution</h2>
              <p className="muted">
                Options Screener ranks trades using your tolerances — fast, consistent, auditable.
              </p>
            </div>

            <div id="features" className="features" role="list">
              <div className="feature" role="listitem">
                <h3>Configurable Tolerances</h3>
                <p>
                  Set limits for ROI, Delta, Beta, and DTE. Exceedances apply meaningful penalties
                  so your policy drives the score.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Transparent Scoring</h3>
                <p>
                  Per-trade breakdown shows points, deductions, and final score. Executive-friendly suggestion
                  bands: Conservative / Neutral / Aggressive.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Fast Evaluation</h3>
                <p>
                  Enter trades, click Evaluate, and export results. Built on a production API ready for
                  enterprise integration.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Professional UI</h3>
                <p>
                  Clean, compact, and accessible. Light cards over a dark canvas focus attention on decisions,
                  not clutter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section id="cta" className="section">
          <div className="container">
            <div className="cta-band">
              <div className="cta-text">
                <h2>See it in action</h2>
                <p className="muted">
                  Try the live demo and download the one-pager. And for a deeper walkthrough, feel free to reach out anytime.
                </p>
              </div>
              <div className="cta-buttons">
                <a href="/app" className="btn primary large">Launch Demo</a>
                <a
                  href="/one-pager.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost large"
                >
                  Download One-Pager
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ====== Footer ====== */}
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

      {/* ====== Styles ====== */}
      <style jsx>{`
        :global(html, body) { padding: 0; margin: 0; }
        .page { background: #000; color: #e5e7eb; min-height: 100vh; }

        /* Centered container, consistent width across sections */
        .container { max-width: 1180px; margin: 0 auto; padding: 0 20px; }
        .center { text-align: center; }

        /* Top nav */
        .nav { position: sticky; top: 0; z-index: 10; background: #000; border-bottom: 1px solid #0b0b0b; }
        .nav-inner { height: 68px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; }
        .brand-logo { height: 60px; width: auto; display: block; }
        .brand-text { font-weight: 900; letter-spacing: .2px; color: #f3f4f6; font-size: 18px; }
        .links { display: flex; align-items: center; gap: 16px; }
        .links a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
        .links a:hover { color: #fff; }
        .links .btn.small { margin-left: 6px; } /* keep a bit of space before the Contact link */

        /* Buttons */
        .btn { display: inline-block; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 10px;
               text-decoration: none; font-weight: 800; border: 1px solid #64748b; background: #f8fafc; color: #0f172a; }
        .btn:hover { background: #eef2f7; }
        .btn.primary { background: #2563eb; border-color: #2563eb; color: #fff; }
        .btn.primary:hover { background: #1d4ed8; }
        .btn.ghost { background: transparent; color: #e5e7eb; border-color: #64748b; }
        .btn.ghost:hover { background: rgba(255,255,255,.06); }
        .btn.small { height: 30px; line-height: 30px; padding: 0 10px; border-radius: 8px; font-weight: 800; }
        .btn.large { height: 48px; line-height: 48px; padding: 0 18px; border-radius: 12px; font-size: 16px; }

        /* Hero band */
        .hero {
          background:
            radial-gradient(1200px 600px at 20% -10%, rgba(37,99,235,.25), transparent 60%),
            radial-gradient(1000px 500px at 90% -10%, rgba(16,185,129,.18), transparent 50%),
            #000;
          border-bottom: 1px solid #0b0b0b;
        }
        .hero-inner {
          display: grid; grid-template-columns: 1.1fr .9fr; gap: 32px;
          align-items: center; padding: 60px 0; min-height: 72vh;
        }
        .hero-copy { text-align: center; }
        .hero-title { margin: 0 0 18px; font-size: 42px; font-weight: 900; color: #fff; white-space: nowrap; }
        .sub { margin: 0 auto 20px; color: #d6d9df; max-width: 820px; line-height: 1.65; }

        /* Bullets */
        .bullets { margin: 0 auto 22px; padding-left: 0; list-style: none; max-width: 760px; }
        .bullets li { display: flex; gap: 12px; margin: 10px 0; color: #eceff4; line-height: 1.6; }
        .dot { display: inline-block; width: 7px; height: 7px; border-radius: 999px; background: #fff; margin-top: 8px; flex: 0 0 7px; }
        .cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        .hero-shot { display: flex; justify-content: center; }
        .hero-shot img { width: 100%; max-width: 640px; height: auto; border-radius: 14px; border: 1px solid #1f2937; box-shadow: 0 12px 30px rgba(0,0,0,.45); background: #0b0b0b; }

        /* Sections */
        .section { padding: 48px 0; }
        .band { background: #0a0a0a; border-top: 1px solid #0b0b0b; border-bottom: 1px solid #0b0b0b; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card {
          background: #e9eef5; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 12px;
          padding: 18px; box-shadow: 0 8px 18px rgba(0,0,0,.25);
        }
        .card h2 { margin: 0 0 8px; color: #0f172a; }

        .features { margin-top: 18px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .feature {
          background: #f1f5f9; color: #0f172a; border: 1px solid #d7dee8; border-radius: 12px;
          padding: 16px; box-shadow: 0 6px 14px rgba(0,0,0,.15);
        }
        .feature h3 { margin: 0 0 6px; }

        /* CTA Band */
        .cta-band {
          display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; align-items: center;
          background: #0a0a0a; border: 1px solid #101214; border-radius: 14px;
          padding: 18px 20px;
        }
        .cta-text h2 { margin: 0 0 8px; }
        .cta-buttons { display: flex; gap: 16px; justify-content: flex-end; flex-wrap: wrap; }

        /* Footer */
        .footer { border-top: 1px solid #0b0b0b; background: #000; }
        .footer-inner { height: 72px; display: flex; align-items: center; justify-content: space-between; }
        .fine { color: #94a3b8; font-size: 12px; margin-top: 2px; }
        .muted { color: #94a3b8; text-decoration: none; }
        .muted:hover { color: #cbd5e1; }
        .sep { margin: 0 8px; color: #334155; }

        /* Responsive */
        @media (max-width: 1200px) {
          .features { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 940px) {
          .hero-inner { grid-template-columns: 1fr; padding: 44px 0; min-height: auto; }
          .grid-2 { grid-template-columns: 1fr; }
          .cta-band { grid-template-columns: 1fr; gap: 12px; }
          .cta-buttons { justify-content: center; }
          .hero-title { white-space: normal; } /* allow wrap on smaller screens */
        }
        @media (max-width: 560px) {
          .brand-logo { height: 50px; }
          .btn.large { height: 46px; line-height: 46px; }
        }
      `}</style>
    </>
  );
}
