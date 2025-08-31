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
            <a href="/" className="brand" aria-label="INZ Options Screener Home">
              <img src="/inz-logo.png" alt="INZ logo" className="brand-logo" />
              <span className="brand-text">Options Screener</span>
            </a>
            <nav className="links" aria-label="Primary">
              <a href="#problem">Problem</a>
              <a href="#solution">Solution</a>
              <a href="#features">Features</a>
              <a href="/app" className="btn small primary">Launch Demo</a>
            </nav>
          </div>
        </header>

        {/* ====== Hero ====== */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>Data-Driven Trade Evaluation Platform</h1>
              <p className="sub">
                Quantitative scoring for options trades. Configure tolerances,
                evaluate instantly, and export — built for institutional use.
              </p>
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
              <ul className="bullets">
                <li>Custom tolerances for ROI / Delta / Beta / DTE</li>
                <li>Transparent scoring with exceedance penalties</li>
                <li>Conservative / Neutral / Aggressive suggestion bands</li>
                <li>CSV export and production-ready API</li>
              </ul>
            </div>
            <div className="hero-shot">
              <img src="/hero.png" alt="Options Screener — app screenshot" />
            </div>
          </div>
        </section>

        {/* ====== Problem ====== */}
        <section id="problem" className="section">
          <div className="container two-col">
            <div className="card">
              <h2>The Problem</h2>
              <p>
                Evaluating puts/calls is noisy and manual. Traders juggle ROI,
                Delta, Beta, DTE and support levels while bias slips in. Existing
                tools are slow, inconsistent, and hard to audit.
              </p>
            </div>
            <div className="card">
              <h2>What’s Needed</h2>
              <p>
                A configurable scoring system that applies risk thresholds
                consistently, surfaces the right opportunities, and produces
                transparent outputs for review and compliance.
              </p>
            </div>
          </div>
        </section>

        {/* ====== Solution / Features ====== */}
        <section id="solution" className="section light">
          <div className="container">
            <div className="center">
              <h2>The Solution</h2>
              <p className="muted">
                Options Screener ranks trades using your tolerances — fast,
                consistent, auditable.
              </p>
            </div>

            <div id="features" className="features" role="list">
              <div className="feature" role="listitem">
                <h3>Configurable Tolerances</h3>
                <p>
                  Set limits for ROI, Delta, Beta, and DTE. Exceedances apply
                  meaningful penalties so your policy drives the score.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Transparent Scoring</h3>
                <p>
                  Per-trade breakdown shows points, deductions, and final score.
                  Executive-friendly suggestion bands: Conservative / Neutral / Aggressive.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Fast Evaluation</h3>
                <p>
                  Enter trades, click Evaluate, and export results. Built on a
                  production API ready for enterprise integration.
                </p>
              </div>
              <div className="feature" role="listitem">
                <h3>Professional UI</h3>
                <p>
                  Clean, compact, and accessible. Light cards over a dark canvas
                  to focus attention on decisions, not clutter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section id="cta" className="section cta">
          <div className="container cta-inner">
            <div>
              <h2>See it in action</h2>
              <p className="muted">
                Try the live demo and download the one-pager. For enterprise
                licensing or a deeper walkthrough, reach out anytime.
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
        </section>

        {/* ====== Footer ====== */}
        <footer className="footer">
          <div className="container footer-inner">
            <div className="foot-left">
              <strong>Options Screener</strong>
              <div className="fine">© {new Date().getFullYear()} — All rights reserved.</div>
            </div>
            <div className="foot-right">
              <a href="mailto:youremail@example.com" className="muted">Contact</a>
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

        /* Container is now left-justified */
        .container { width: 100%; padding: 0 16px; }
        .center { text-align: center; }

        /* Top nav */
        .nav { position: sticky; top: 0; z-index: 10; background: #000; border-bottom: 1px solid #0b0b0b; }
        .nav-inner { height: 56px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
        .brand-logo { height: 44px; width: auto; display: block; } /* logo larger than before */
        .brand-text { font-weight: 900; letter-spacing: .2px; color: #f3f4f6; font-size: 18px; }
        .links a { color: #cbd5e1; margin-left: 16px; text-decoration: none; font-weight: 600; }
        .links a:hover { color: #fff; }

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

        /* Hero */
        .hero {
          background: radial-gradient(1200px 600px at 20% -10%, rgba(37,99,235,.25), transparent 60%),
                      radial-gradient(1000px 500px at 90% -10%, rgba(16,185,129,.18), transparent 50%),
                      #000;
          border-bottom: 1px solid #0b0b0b;
        }
        .hero-inner { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; padding: 48px 0; align-items: center; }
        .hero-copy h1 { margin: 0 0 10px; font-size: 36px; font-weight: 900; color: #fff; }
        .sub { margin: 0 0 16px; color: #cbd5e1; max-width: 620px; }
        .cta { display: flex; gap: 12px; margin: 16px 0 8px; flex-wrap: wrap; }
        .bullets { margin: 18px 0 0; padding-left: 18px; color: #cbd5e1; }
        .bullets li { margin: 6px 0; }
        .hero-shot img { width: 100%; height: auto; border-radius: 14px; border: 1px solid #1f2937; box-shadow: 0 12px 30px rgba(0,0,0,.45); background: #0b0b0b; }

        /* Sections */
        .section { padding: 42px 0; }
        .section.light { background: #0a0a0a; border-top: 1px solid #0b0b0b; border-bottom: 1px solid #0b0b0b; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .card { background: #e9eef5; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; box-shadow: 0 8px 18px rgba(0,0,0,.25); }
        .card h2 { margin: 0 0 6px; color: #0f172a; }

        .features { margin-top: 18px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .feature { background: #f1f5f9; color: #0f172a; border: 1px solid #d7dee8; border-radius: 12px; padding: 14px; box-shadow: 0 6px 14px rgba(0,0,0,.15); }
        .feature h3 { margin: 0 0 6px; }

        /* CTA band */
        .cta { background: #000; }
        .cta-inner { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; align-items: center; }

        /* Footer */
        .footer { border-top: 1px solid #0b0b0b; background: #000; }
        .footer-inner { height: 72px; display: flex; align-items: center; justify-content: space-between; }
        .fine { color: #94a3b8; font-size: 12px; margin-top: 2px; }
        .muted { color: #94a3b8; }
        .sep { margin: 0 8px; color: #334155; }

        /* Responsive */
        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr; padding: 30px 0; }
          .two-col { grid-template-columns: 1fr; }
          .features { grid-template-columns: 1fr 1fr; }
          .cta-inner { grid-template-columns: 1fr; gap: 12px; }
          .links a { margin-left: 12px; }
        }

        @media (max-width: 560px) {
          .features { grid-template-columns: 1fr; }
          .btn.large { height: 46px; line-height: 46px; }
          .hero-copy h1 { font-size: 28px; }
          .brand-logo { height: 36px; } /* slightly smaller on mobile */
        }
      `}</style>
    </>
  );
}

