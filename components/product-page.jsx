/* global React */
// Shared subpage shell for product detail pages.
// Dark, mono-accented, site nav on top (same as the main page), returns to hub.

// Same storage key and ?lang= param as the main page, so the language follows the visitor across pages.
const usePageLang = () => {
  const [lang, setLang] = React.useState(() => {
    const u = new URLSearchParams(location.search).get("lang");
    return u === "ru" ? "ru" : (localStorage.getItem("lang") === "ru" ? "ru" : "en");
  });
  React.useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    const u = new URL(location.href);
    u.searchParams.set("lang", lang);
    history.replaceState(null, "", u.toString());
  }, [lang]);
  return [lang, setLang];
};

const NAV = [
  ["competencies", "Экспертиза", "Expertise"], ["achievements", "Ачивменты", "Achievements"],
  ["companies", "Компании", "Companies"], ["independent", "Свои аппы", "Independent"],
  ["career", "Карьера", "Career"], ["contact", "Контакт", "Contact"],
];

const PP_CSS = `
  .pp-nav{position:sticky;top:0;z-index:20;height:60px;padding:0 32px;background:rgba(10,10,10,0.8);backdrop-filter:blur(18px);
    border-bottom:1px solid #1F1F1F;display:flex;align-items:center;gap:22px}
  .pp-mark{white-space:nowrap;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;letter-spacing:-.01em;color:#EDEDED}
  .pp-mark-dot{width:8px;height:8px;border-radius:50%}
  .pp-links{margin-left:auto;display:flex;gap:20px;font-size:13px;color:#B4B4B4}
  .pp-links a:hover{color:#EDEDED}
  .pp-site{font-size:12px;padding:7px 14px;border-radius:6px;white-space:nowrap}
  .pp-lang{display:flex;border:1px solid rgba(255,255,255,0.1);border-radius:6px;overflow:hidden;font-family:var(--font-mono);font-size:11px}
  .pp-lang button{padding:6px 10px;background:transparent;border:none;color:#7A7A7A;cursor:pointer;letter-spacing:.05em}
  .pp-crumb{max-width:980px;margin:0 auto;padding:20px 32px 0;font-size:12px;display:flex;gap:10px}
  @media (max-width:860px){ .pp-links,.pp-domain{display:none} .pp-site{margin-left:auto} .pp-nav{padding:0 16px;gap:12px} }
`;

// lang/setLang: pass them on pages that have translated content — then the EN/RU switch is shown.
const ProductPage = ({ product, accent = "oklch(0.78 0.18 60)", site, siteLabel = "Open product →", visual,
                       lang = "en", setLang, children }) => {
  const accentSoft = accent.replace(")", " / 0.12)");
  const ru = lang === "ru";
  const home = "index.html" + (setLang ? `?lang=${lang}` : "");
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#EDEDED", fontFamily: "var(--font-sans)" }}>
      <style>{PP_CSS}</style>
      <nav className="pp-nav">
        <a href={home} className="pp-mark">
          <span className="pp-mark-dot" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />Ilya Makarov
        </a>
        <span className="mono pp-domain" style={{ fontSize: 11, color: "#525252" }}>imakarov.us</span>
        <div className="pp-links">
          {NAV.map(([id, r, e]) => <a key={id} href={`${home}#${id}`}>{ru ? r : e}</a>)}
        </div>
        {site && <a href={site} target="_blank" rel="noopener" className="pp-site"
                    style={{ border: `1px solid ${accent}`, color: accent }}>{siteLabel}</a>}
        {setLang && <div className="pp-lang">
          {["en", "ru"].map(l => (
            <button key={l} onClick={() => setLang(l)}
                    style={lang === l ? { background: accent, color: "#070708" } : undefined}>{l.toUpperCase()}</button>
          ))}
        </div>}
      </nav>
      <div className="pp-crumb mono">
        <a href={`${home}#independent`} style={{ color: "#7A7A7A" }}>← {ru ? "Свои аппы" : "Independent"}</a>
        <span style={{ color: "#2A2A2A" }}>/</span>
        <span style={{ color: accent }}>products/{product.id}</span>
      </div>

      {/* Hero */}
      <section style={{
        padding: "64px 32px 64px",
        maxWidth: 980, margin: "0 auto",
      }}>
        <div className="mono" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontSize: 11, color: accent, marginBottom: 28, letterSpacing: "0.05em",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent }}></span>
          {product.status.toUpperCase()} · {((ru && product.kindRU) || product.kind || product.kindEN || '').toUpperCase()}
        </div>
        <h1 style={{
          margin: 0, fontSize: 72, fontWeight: 500,
          letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 24,
        }}>
          {product.name}
        </h1>
        <p style={{
          fontSize: 22, lineHeight: 1.45, color: "#B4B4B4",
          margin: 0, maxWidth: 680, textWrap: "pretty",
        }}>{(ru && product.taglineRU) || product.tagline || product.taglineEN}</p>
      </section>

      {/* Visual (custom per page, placeholder otherwise) */}
      <section style={{ padding: "0 32px 64px", maxWidth: 980, margin: "0 auto" }}>
        {visual || <div style={{
          height: 380, borderRadius: 14,
          background: `radial-gradient(circle at 30% 30%, ${accentSoft}, transparent 60%),
                       repeating-linear-gradient(45deg, #0F0F0F 0 20px, #131313 20px 40px)`,
          border: "1px solid #1F1F1F",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div className="mono" style={{ fontSize: 11, color: "#525252", letterSpacing: "0.05em" }}>
            // PRODUCT SHOT · {product.name.toUpperCase()}
          </div>
        </div>}
      </section>

      {children}

      {/* Footer */}
      <footer className="mono" style={{
        padding: "32px", borderTop: "1px solid #1F1F1F",
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#525252", maxWidth: 980, margin: "0 auto",
      }}>
        <a href={home}>← {ru ? "На главную" : "Back to hub"}</a>
        <span>© 2026 imakarov.us</span>
      </footer>
    </div>
  );
};

const ProdSection = ({ num, title, accent, children }) => (
  <section style={{
    padding: "48px 32px", maxWidth: 980, margin: "0 auto",
    borderTop: "1px solid #1F1F1F",
  }}>
    <div style={{
      display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28,
    }}>
      <span className="mono" style={{ fontSize: 11, color: accent, letterSpacing: "0.05em" }}>{num}</span>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: "-0.015em" }}>{title}</h2>
    </div>
    {children}
  </section>
);

window.ProductPage = ProductPage;
window.ProdSection = ProdSection;
