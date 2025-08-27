import React, { useEffect, useMemo, useState } from "react";

/** ================== TYPES ================== */
interface TradeInput {
  symbol: string;
  tradeDate: string;        // YYYY-MM-DD
  expirationDate: string;   // YYYY-MM-DD
  type: "put" | "call";
  strike: number;
  bid: number;
  supportLevel: number;
  beta: number;
  delta: number;            // decimal (0.20 = 20%)
}

interface Tolerances {
  maxDTE?: number;
  minROI?: number;   // decimal
  maxBeta?: number;
  maxDelta?: number; // decimal
}

type TolKeys = "maxDTE" | "minROI" | "maxBeta" | "maxDelta";
type SortKey =
  | "symbol" | "tradeDate" | "expirationDate" | "dte" | "type"
  | "strike" | "bid" | "supportLevel" | "beta" | "delta"
  | "premium" | "breakeven" | "annualROI"
  | "collateralAtRisk" | "supportVariancePct" | "hardFail"
  | "score" | "suggestion";

type SuggestionLabel = "Conservative" | "Neutral" | "Aggressive";

type BreakdownPart = {
  key: string;
  label: string;
  max: number;
  earned: number;
  note?: string;
};

type ResultRow = {
  symbol: string;
  tradeDate: string;
  expirationDate: string;
  dte: number;
  type: "put" | "call";
  strike: number;
  bid: number;
  supportLevel: number;
  beta: number;
  delta: number;
  premium: number;
  breakeven: number;
  annualROI: number;
  collateralAtRisk?: number;
  supportVariancePct?: number | null;
  hardFail: boolean;
  score: number;
  suggestion: SuggestionLabel; // ensure union, not string
  // breakdown fields (optional)
  breakdown?: BreakdownPart[];
  totalPossible?: number;
  pointsBeforePenalties?: number;
  penaltiesApplied?: number;
  pointsFinal?: number;
};

/** ================== ICONS ================== */
const IconDuplicate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1z" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden focusable="false" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .15s ease" }}>
    <path fill="currentColor" d="M7 5l6 5-6 5V5z" />
  </svg>
);

/** ================== HELPERS ================== */
type FieldKind = "currency" | "decimal" | "percent" | "text" | "date" | "select";
const stripCurrency = (s: string) => s.replace(/[,$]/g, "").replace(/^\$/, "");
const sanitizeNumber = (raw: string) => {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
  return cleaned;
};
const sanitizePercent = (raw: string) => sanitizeNumber(raw.replace("%", ""));
const parseValue = (raw: string, kind: FieldKind): number | string => {
  if (raw == null) return "";
  if (kind === "currency") {
    const cleaned = sanitizeNumber(stripCurrency(raw));
    return cleaned === "" ? 0 : parseFloat(cleaned);
  }
  if (kind === "decimal") {
    const cleaned = sanitizeNumber(raw);
    return cleaned === "" ? 0 : parseFloat(cleaned);
  }
  if (kind === "percent") {
    const cleaned = sanitizePercent(raw);
    return cleaned === "" ? 0 : parseFloat(cleaned) / 100;
  }
  if (kind === "date" || kind === "text" || kind === "select") return raw;
  return raw;
};
const formatValue = (val: any, kind: FieldKind): string => {
  if (val === undefined || val === null) return "";
  switch (kind) {
    case "currency": return `$${Number(val).toFixed(2)}`;
    case "decimal":  return Number(val).toFixed(2);
    case "percent":  return `${(Number(val) * 100).toFixed(1)}%`;
    default:         return String(val ?? "");
  }
};
const fmtDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y.slice(-2)}`;
};
const fmtCurrency = (n: number, decimals = 2) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/** ================== INPUT CELL ================== */
interface TradeInputFieldProps {
  row: number;
  field: keyof TradeInput;
  kind: FieldKind;
  value: any;
  tradeDisplay: any[];
  setTradeDisplay: React.Dispatch<any>;
  trades: TradeInput[];
  setTrades: React.Dispatch<React.SetStateAction<TradeInput[]>>;
  options?: string[];
  align?: "left" | "center" | "right";
}
const TradeInputField: React.FC<TradeInputFieldProps> = ({
  row, field, kind, value, tradeDisplay, setTradeDisplay, trades, setTrades, options, align = "center"
}) => {
  const handleChange = (raw: string) => {
    setTradeDisplay((prev: any[]) => {
      const copy = [...prev]; copy[row] = { ...copy[row], [field]: raw }; return copy;
    });
    setTrades((prev) => {
      const copy = [...prev];
      const t = { ...copy[row] };
      (t as any)[field] = parseValue(raw, kind);
      copy[row] = t; return copy;
    });
  };
  const handleBlur = () => {
    setTradeDisplay((prev: any[]) => {
      const copy = [...prev];
      copy[row] = { ...copy[row], [field]: formatValue((trades[row] as any)[field], kind) };
      return copy;
    });
  };
  if (kind === "select" && options) {
    return (
      <select value={value ?? ""} onChange={(e) => handleChange(e.target.value)} className={`input ta-${align}`}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type={kind === "date" ? "date" : "text"}
      value={value ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      placeholder={kind === "currency" ? "$0.00" : kind === "percent" ? "0.0%" : ""}
      className={`input ta-${align}`}
    />
  );
};

/** ================== BADGES / SCORE ================== */
const SuggestionBadge: React.FC<{ value: SuggestionLabel }> = ({ value }) => {
  const config = {
    Conservative: { bg: "#0b3d2e", border: "#10b981" },
    Neutral:      { bg: "#3a3a0b", border: "#facc15" },
    Aggressive:   { bg: "#4a0d0d", border: "#f87171" },
  }[value];
  return (
    <span className="badge" style={{ background: config.bg, color: "#fff", border: `1px solid ${config.border}`, whiteSpace: "nowrap" }}>
      {value}
    </span>
  );
};
const ScoreBar: React.FC<{ score: number }> = ({ score }) => (
  <div className="score-wrap">
    <div className="score-track small">
      <div className="score-fill" style={{ width: `${Math.max(0, Math.min(100, score))}%` }} />
    </div>
    <span className="score-text">{(score ?? 0).toFixed(0)}%</span>
  </div>
);

/** ================== MAIN ================== */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

export default function Home() {
  const [trades, setTrades] = useState<TradeInput[]>([]);
  const [tradeDisplay, setTradeDisplay] = useState<any[]>([]);
  const [tolerances, setTolerances] = useState<Tolerances>({});
  const [displayTolerances, setDisplayTolerances] = useState<Record<TolKeys, string>>({
    maxDTE: "", minROI: "", maxBeta: "", maxDelta: "",
  });
  const [results, setResults] = useState<ResultRow[]>([]);
  const [sortKeyState, setSortKeyState] = useState<SortKey>("score");
  const [sortDirState, setSortDirState] = useState<"asc" | "desc">("desc");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  /** ------- LocalStorage (load on mount) ------- */
  useEffect(() => {
    try {
      const stTrades = localStorage.getItem("os_trades");
      const stTradeDisplay = localStorage.getItem("os_tradeDisplay");
      const stTol = localStorage.getItem("os_tolerances");
      const stTolDisp = localStorage.getItem("os_displayTolerances");
      if (stTrades) setTrades(JSON.parse(stTrades));
      if (stTradeDisplay) setTradeDisplay(JSON.parse(stTradeDisplay));
      if (stTol) setTolerances(JSON.parse(stTol));
      if (stTolDisp) setDisplayTolerances(JSON.parse(stTolDisp));
    } catch {}
  }, []);

  /** ------- LocalStorage (save on changes) ------- */
  useEffect(() => { try { localStorage.setItem("os_trades", JSON.stringify(trades)); } catch {} }, [trades]);
  useEffect(() => { try { localStorage.setItem("os_tradeDisplay", JSON.stringify(tradeDisplay)); } catch {} }, [tradeDisplay]);
  useEffect(() => { try { localStorage.setItem("os_tolerances", JSON.stringify(tolerances)); } catch {} }, [tolerances]);
  useEffect(() => { try { localStorage.setItem("os_displayTolerances", JSON.stringify(displayTolerances)); } catch {} }, [displayTolerances]);

  /** ------- Tolerances handlers ------- */
  const handleToleranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: TolKeys; value: string };
    const cleaned = sanitizeNumber(value);
    setDisplayTolerances((prev) => ({ ...prev, [name]: cleaned }));
    if (cleaned === "") { setTolerances((prev) => ({ ...prev, [name]: undefined })); return; }
    const numeric = parseFloat(cleaned); if (Number.isNaN(numeric)) return;
    if (name === "minROI" || name === "maxDelta") setTolerances((prev) => ({ ...prev, [name]: numeric / 100 }));
    else setTolerances((prev) => ({ ...prev, [name]: numeric }));
  };
  const handleToleranceBlur = (name: TolKeys) => {
    const val = displayTolerances[name]; if (val === "") return;
    let n = parseFloat(val); if (Number.isNaN(n)) return;
    if (name === "minROI" || name === "maxDelta") {
      if (n < 0) n = 0; if (n > 100) n = 100;
      setDisplayTolerances((prev) => ({ ...prev, [name]: String(n) }));
    } else if (name === "maxDTE") {
      if (n < 1) n = 1; setDisplayTolerances((prev) => ({ ...prev, [name]: String(Math.floor(n)) }));
    } else if (name === "maxBeta") {
      setDisplayTolerances((prev) => ({ ...prev, [name]: n.toFixed(2) }));
    }
  };
  const clearTolerances = () => {
    setTolerances({}); setDisplayTolerances({ maxDTE: "", minROI: "", maxBeta: "", maxDelta: "" });
  };

  /** ------- Trades: add / reset / dup / delete ------- */
  const addTrade = () => {
    setTrades((p) => [...p, { symbol: "", tradeDate: "", expirationDate: "", type: "put", strike: 0, bid: 0, supportLevel: 0, beta: 0, delta: 0 }]);
    setTradeDisplay((p) => [...p, { symbol: "", tradeDate: "", expirationDate: "", type: "put", strike: "", bid: "", supportLevel: "", beta: "", delta: "" }]);
  };
  const resetTrades = () => { setTrades([]); setTradeDisplay([]); setResults([]); setExpanded({}); };
  const duplicateRow = (i: number) => {
    setTrades((p) => { const c = [...p]; c.splice(i + 1, 0, { ...c[i] }); return c; });
    setTradeDisplay((p) => { const c = [...p]; c.splice(i + 1, 0, { ...c[i] }); return c; });
  };
  const deleteRow = (i: number) => {
    setTrades((p) => p.filter((_, idx) => idx !== i));
    setTradeDisplay((p) => p.filter((_, idx) => idx !== i));
  };

  /** ------- Evaluate / results ------- */
  const evaluateTrades = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/evaluate-trades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tolerances, trades }),
      });
      if (!res.ok) {
        const text = await res.text();
        alert(`Error evaluating trades: ${res.status} ${res.statusText}\n${text}`);
        return;
      }
      const data: ResultRow[] = await res.json();
      setResults(data);
      setExpanded({}); // collapse any open breakdowns
    } catch (err: any) {
      alert(`Network error: ${err?.message || err}`);
    }
  };
  const clearResults = () => { setResults([]); setExpanded({}); };

  /** ------- Sort ------- */
  const suggestionOrder: Record<SuggestionLabel, number> = { Conservative: 3, Neutral: 2, Aggressive: 1 };

  const sortedResults = useMemo(() => {
    const clone = [...results];
    const dir = sortDirState === "asc" ? 1 : -1;
    return clone.sort((a, b) => {
      const va = (a as any)[sortKeyState];
      const vb = (b as any)[sortKeyState];

      if (sortKeyState === "suggestion") {
        const aKey = String(va) as keyof typeof suggestionOrder;
        const bKey = String(vb) as keyof typeof suggestionOrder;
        return ((suggestionOrder[aKey] ?? 0) - (suggestionOrder[bKey] ?? 0)) * dir;
      }
      if (sortKeyState === "tradeDate" || sortKeyState === "expirationDate") {
        return String(va).localeCompare(String(vb)) * dir;
      }
      if (typeof va === "string" && typeof vb === "string") {
        return va.localeCompare(vb) * dir;
      }
      return ((Number(va) || 0) - (Number(vb) || 0)) * dir;
    });
  }, [results, sortKeyState, sortDirState]);

  const headerCell = (key: SortKey, label: string, align: "left" | "center" | "right" = "center") => (
    <th
      onClick={() => { if (sortKeyState === key) setSortDirState((d) => (d === "asc" ? "desc" : "asc")); else { setSortKeyState(key); setSortDirState("desc"); } }}
      className={`th-sort ${align === "right" ? "ta-right" : align === "left" ? "ta-left" : "ta-center"}`}
      title="Click to sort"
    >
      {label} {sortKeyState === key ? (sortDirState === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <div className="page">
      <style>{`
        /* Full black page */
        .page { padding: 0; margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #e5e7eb; background: #000; min-height: 100vh; }

        /* Header (pure black) */
        .header { background: #000; border-bottom: 1px solid #0b0b0b; }
        .header-inner { padding: 14px 16px; }
        .title { font-size: 26px; font-weight: 900; letter-spacing: .2px; margin: 0; color: #f3f4f6; }

        /* Content (full-width) */
        .wrap { padding: 16px; margin: 0; max-width: 100%; }

        /* Panels (lighter to pop from black) */
        .card { background: #e9eef5; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px 14px; box-shadow: 0 8px 18px rgba(0,0,0,0.25); }
        h3 { margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #0f172a; }

        .toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .btn { height: 32px; padding: 0 12px; border-radius: 8px; border: 1px solid #64748b; background: #f8fafc; cursor: pointer; color: #0f172a; font-weight: 700; }
        .btn:hover { background: #eef2f7; }
        .btn.primary { background: #2563eb; color: #fff; border-color: #2563eb; }
        .btn.primary:hover { background: #1d4ed8; }
        .btn.warn { border-color: #991b1b; color: #991b1b; background: #fff; }
        .btn.warn:hover { background: #fee2e2; }

        /* Sticky actions bar (kept, but left-aligned and placed under header) */
        .sticky-actions {
          position: sticky;
          top: 8px;
          z-index: 5;
          background: #e9eef5;
          padding: 8px;
          margin: -4px -8px 8px -8px;
          border-radius: 10px;
          border: 1px solid #cdd6e2;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex; justify-content: flex-start; gap: 8px; flex-wrap: wrap;
        }

        /* Inputs (compact) */
        .input { font-size: 13.5px; padding: 5px 6px; width: 100%; box-sizing: border-box; border: 1px solid #94a3b8; border-radius: 8px; background: #ffffff; color: #0f172a; }
        .input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.2); }
        .input-narrow { width: 72px; } /* ~4 digits wide */
        .ta-left { text-align: left; } .ta-center { text-align: center; } .ta-right { text-align: right; }
        label { color: #0f172a; font-size: 14px; white-space: nowrap; }

        /* Tolerances: single column; tight background hugging inputs */
        .tol-card { background: transparent; border: none; box-shadow: none; padding: 0; }
        .tol-wrap { display: inline-block; padding: 10px 12px; background: #e9eef5; border: 1px solid #cbd5e1; border-radius: 10px; }
        .tol-grid { display: grid; grid-template-columns: auto auto; gap: 8px 10px; align-items: center; }
        .tol-suffix { color: #334155; font-size: 14px; margin-left: 6px; }

        /* Tables: light scheme, full width; compact spacing */
        .table-shell { border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; background: #f1f5f9; }
        .table-wrap { max-width: 100%; overflow-x: hidden; }
        table { width: 100%; border-collapse: collapse; table-layout: auto; background: #ffffff; }
        thead { position: sticky; top: 0; z-index: 1; background: #e2e8f0; }
        th, td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; font-size: 12.5px; color: #0f172a; }
        tbody tr:nth-child(odd) { background: #fbfdff; }
        tbody tr:hover { background: #eef5ff; }
        th { font-weight: 800; color: #0f172a; user-select: none; cursor: pointer; }

        /* Narrow columns */
        .col-symbol { width: 110px; }        /* narrower symbol column */
        .col-narrow { width: 88px; }
        .col-actions { width: 110px; white-space: nowrap; }
        .col-details { width: 40px; }

        /* Card widths */
        .card-trades { max-width: 1300px; }
        .card-results { max-width: 100%; }

        .icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid #cbd5e1; border-radius: 8px; background: #ffffff; cursor: pointer; color: #334155; }
        .icon-btn:hover { background: #f8fafc; }
        .actions { display: inline-flex; gap: 6px; align-items: center; white-space: nowrap; }

        /* Badges & score */
        .badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 800; display: inline-block; }
        .score-wrap { display: inline-flex; align-items: center; gap: 6px; justify-content: center; color: #334155; }
        .score-track { width: 90px; height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
        .score-track.small { width: 60px; }
        .score-fill { height: 100%; background: #2563eb; }
        .score-text { font-size: 11.5px; color: #1f2937; word-break: keep-all; }

        /* Breakdown row */
        .breakdown { background: #f7fafc; }
        .bd-table { width: 100%; border-collapse: collapse; }
        .bd-table th, .bd-table td { border-bottom: 1px dashed #e2e8f0; padding: 6px 8px; font-size: 12px; color: #0f172a; }
        .bd-header { font-weight: 800; color: #0f172a; background: #edf2f7; }
      `}</style>

      {/* ===== Header ===== */}
      <header className="header">
        <div className="header-inner">
          <h1 className="title">Options Screener</h1>
        </div>
      </header>

      {/* ===== Content ===== */}
      <div className="wrap">
        {/* ============ TRADE TOLERANCES ============ */}
        <div className="card tol-card" style={{ marginBottom: 12 }}>
          <div className="tol-wrap">
            <h3 style={{ marginBottom: 8 }}>Trade Tolerances</h3>

            {/* Clear Tolerances button under header */}
            <div className="toolbar" style={{ margin: "0 0 10px 0" }}>
              <button className="btn warn" onClick={clearTolerances}>Clear Tolerances</button>
            </div>

            <div className="tol-grid">
              <label htmlFor="maxDTE">Max DTE</label>
              <input id="maxDTE" name="maxDTE" value={displayTolerances.maxDTE}
                    onChange={(e) => handleToleranceChange(e)}
                    onBlur={() => handleToleranceBlur("maxDTE")}
                    className="input input-narrow ta-right" inputMode="numeric" />

              <label htmlFor="minROI">Min Annual ROI</label>
              <div className="row" style={{ gap: 6 }}>
                <input id="minROI" name="minROI" value={displayTolerances.minROI}
                      onChange={(e) => handleToleranceChange(e)}
                      onBlur={() => handleToleranceBlur("minROI")}
                      className="input input-narrow ta-right" inputMode="decimal" />
                <span className="tol-suffix">%</span>
              </div>

              <label htmlFor="maxBeta">Max Beta</label>
              <input id="maxBeta" name="maxBeta" value={displayTolerances.maxBeta}
                    onChange={(e) => handleToleranceChange(e)}
                    onBlur={() => handleToleranceBlur("maxBeta")}
                    className="input input-narrow ta-right" inputMode="decimal" />

              <label htmlFor="maxDelta">Max Delta</label>
              <div className="row" style={{ gap: 6 }}>
                <input id="maxDelta" name="maxDelta" value={displayTolerances.maxDelta}
                      onChange={(e) => handleToleranceChange(e)}
                      onBlur={() => handleToleranceBlur("maxDelta")}
                      className="input input-narrow ta-right" inputMode="decimal" />
                <span className="tol-suffix">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ TRADE CONSIDERATONS ============ */}
        <div className="card card-trades" style={{ marginBottom: 12 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h3>Trade Consideratons</h3>
          </div>

          {/* Buttons under header, left-aligned; order: Add -> Reset -> Evaluate */}
          <div className="sticky-actions">
            <button className="btn primary" onClick={addTrade}>Add Trade</button>
            <button className="btn warn" onClick={resetTrades}>Reset Trades</button>
            <button className="btn" onClick={evaluateTrades}>Evaluate</button>
          </div>

          <div className="table-shell">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th className="ta-left col-symbol">Symbol</th>
                    <th className="ta-center col-narrow">Trade Date</th>
                    <th className="ta-center col-narrow">Expiration Date</th>
                    <th className="ta-center col-narrow">Type</th>
                    <th className="ta-center col-narrow">Strike</th>
                    <th className="ta-center col-narrow">Bid</th>
                    <th className="ta-center col-narrow">Support</th>
                    <th className="ta-center col-narrow">Beta</th>
                    <th className="ta-center col-narrow">Delta</th>
                    <th className="ta-center col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((_t, i) => (
                    <tr key={i}>
                      <td className="ta-left col-symbol">
                        <TradeInputField row={i} field="symbol" kind="text" align="left"
                          value={tradeDisplay[i]?.symbol}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="tradeDate" kind="date" align="center"
                          value={tradeDisplay[i]?.tradeDate}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="expirationDate" kind="date" align="center"
                          value={tradeDisplay[i]?.expirationDate}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="type" kind="select" options={["put","call"]} align="center"
                          value={tradeDisplay[i]?.type ?? "put"}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="strike" kind="currency" align="center"
                          value={tradeDisplay[i]?.strike}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="bid" kind="currency" align="center"
                          value={tradeDisplay[i]?.bid}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="supportLevel" kind="currency" align="center"
                          value={tradeDisplay[i]?.supportLevel}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="beta" kind="decimal" align="center"
                          value={tradeDisplay[i]?.beta}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-narrow">
                        <TradeInputField row={i} field="delta" kind="percent" align="center"
                          value={tradeDisplay[i]?.delta}
                          {...{ tradeDisplay, setTradeDisplay, trades, setTrades }} />
                      </td>
                      <td className="ta-center col-actions">
                        <div className="actions">
                          <button className="icon-btn" onClick={() => duplicateRow(i)} title="Duplicate row"><IconDuplicate /></button>
                          <button className="icon-btn" onClick={() => deleteRow(i)} title="Delete row"><IconTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {trades.length === 0 && (
                    <tr><td colSpan={10} className="ta-center" style={{ padding: 10, color: "#334155" }}>
                      No trades yet. Click <b>Add Trade</b> to start.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ============ TRADE EVALUATIONS (with breakdown) ============ */}
        {results.length > 0 && (
          <div className="card card-results" style={{ marginBottom: 12 }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3>Trade Evaluations</h3>
              <div className="toolbar">
                <button className="btn" onClick={() => {
                  const headers = [
                    "symbol","tradeDate","expirationDate","dte","type","strike","bid","supportLevel","beta","delta",
                    "premium","breakeven","annualROI","collateralAtRisk","supportVariancePct","hardFail","score","suggestion"
                  ];
                  const rows = results.map((r: any) =>
                    headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")
                  );
                  const csv = [headers.join(","), ...rows].join("\n");
                  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "results.csv"; a.click();
                }}>
                  Export CSV
                </button>
                <button className="btn warn" onClick={clearResults}>Clear Results</button>
              </div>
            </div>

            <div className="table-shell">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th className="ta-center col-details"></th>
                      {headerCell("symbol","Symbol","left")}
                      {headerCell("tradeDate","Trade Date","center")}
                      {headerCell("expirationDate","Expiration Date","center")}
                      {headerCell("dte","DTE","center")}
                      {headerCell("type","Type","center")}
                      {headerCell("strike","Strike","center")}
                      {headerCell("bid","Bid","center")}
                      {headerCell("supportLevel","Support","center")}
                      {headerCell("beta","Beta","center")}
                      {headerCell("delta","Delta","center")}
                      {headerCell("premium","Premium","center")}
                      {headerCell("breakeven","Breakeven","center")}
                      {headerCell("annualROI","Annual ROI","center")}
                      {headerCell("collateralAtRisk","Collateral","center")}
                      {headerCell("supportVariancePct","Support Var %","center")}
                      {headerCell("hardFail","Hard Fail","center")}
                      {headerCell("score","Score","center")}
                      {headerCell("suggestion","Suggestion","center")}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.map((r: ResultRow, idx: number) => {
                      const open = !!expanded[idx];
                      return (
                        <React.Fragment key={idx}>
                          <tr>
                            <td className="ta-center col-details">
                              <button className="icon-btn" title={open ? "Hide details" : "Show details"} onClick={() => setExpanded(e => ({ ...e, [idx]: !open }))}>
                                <IconChevron open={open} />
                              </button>
                            </td>
                            <td className="ta-left">{r.symbol}</td>
                            <td className="ta-center">{fmtDate(r.tradeDate)}</td>
                            <td className="ta-center">{fmtDate(r.expirationDate)}</td>
                            <td className="ta-center">{Math.round(r.dte)}</td>
                            <td className="ta-center">{r.type?.charAt(0).toUpperCase() + r.type?.slice(1)}</td>
                            <td className="ta-center">{fmtCurrency(r.strike, 2)}</td>
                            <td className="ta-center">{fmtCurrency(r.bid, 2)}</td>
                            <td className="ta-center">{fmtCurrency(r.supportLevel, 2)}</td>
                            <td className="ta-center">{(r.beta ?? 0).toFixed(2)}</td>
                            <td className="ta-center">{(r.delta * 100).toFixed(1)}%</td>
                            <td className="ta-center">{fmtCurrency(r.premium, 0)}</td>
                            <td className="ta-center">{fmtCurrency(r.breakeven, 2)}</td>
                            <td className="ta-center">{(r.annualROI * 100).toFixed(1)}%</td>
                            <td className="ta-center">{fmtCurrency(r.collateralAtRisk ?? 0, 0)}</td>
                            <td className="ta-center">{r.supportVariancePct != null ? `${Number(r.supportVariancePct).toFixed(1)}%` : ""}</td>
                            <td className="ta-center">{r.hardFail ? "Yes" : "No"}</td>
                            <td className="ta-center"><ScoreBar score={r.score ?? 0} /></td>
                            <td className="ta-center"><SuggestionBadge value={r.suggestion} /></td>
                          </tr>

                          {open && (
                            <tr className="breakdown">
                              <td colSpan={19} style={{ padding: 0 }}>
                                <div style={{ padding: "8px 10px" }}>
                                  <table className="bd-table">
                                    <thead>
                                      <tr className="bd-header">
                                        <th className="ta-left">Component</th>
                                        <th className="ta-center">Max Pts</th>
                                        <th className="ta-center">Earned</th>
                                        <th className="ta-left">Notes</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(r.breakdown as BreakdownPart[] | undefined)?.map((p, i2) => (
                                        <tr key={p.key ?? i2}>
                                          <td className="ta-left">{p.label}</td>
                                          <td className="ta-center">{p.max}</td>
                                          <td className="ta-center">{p.earned.toFixed(2)}</td>
                                          <td className="ta-left">{p.note ?? ""}</td>
                                        </tr>
                                      ))}
                                      <tr>
                                        <td className="ta-left" style={{ fontWeight: 800 }}>Subtotal</td>
                                        <td className="ta-center">{r.totalPossible}</td>
                                        <td className="ta-center">{Number(r.pointsBeforePenalties).toFixed(2)}</td>
                                        <td className="ta-left">Points before global penalties</td>
                                      </tr>
                                      <tr>
                                        <td className="ta-left" style={{ fontWeight: 800 }}>Penalties</td>
                                        <td className="ta-center">–</td>
                                        <td className="ta-center">-{Number(r.penaltiesApplied).toFixed(2)}</td>
                                        <td className="ta-left">Exceedance severity (global penalty pool)</td>
                                      </tr>
                                      <tr>
                                        <td className="ta-left" style={{ fontWeight: 900 }}>Final Points</td>
                                        <td className="ta-center">{r.totalPossible}</td>
                                        <td className="ta-center">{Number(r.pointsFinal).toFixed(2)}</td>
                                        <td className="ta-left">Final score = {(r.score ?? 0).toFixed(1)}%</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
