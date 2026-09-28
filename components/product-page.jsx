/* global React */
// Shared subpage shell for product detail pages.
// Dark, mono-accented, returns to hub.

const ProductPage = ({ product, accent = "oklch(0.78 0.18 60)", site, siteLabel = "Open product →", visual, children }) => {
  const accentSoft = accent.replace(")", " / 0.12)");
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#EDEDED", fontFamily: "var(--font-sans)" }}>
      {/* Top bar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 10,
        padding: "16px 32px", borderBottom: "1px solid #1F1F1F",
        background: "rgba(10,10,10,0.85)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", gap: 18,
      }}>
        <a href="index.html" className="mono" style={{
          fontSize: 12, color: "#7A7A7A", display: "flex", alignItems: "center", gap: 8,
        }}>
          ← imakarov.us
        </a>
        <span className="mono" style={{ fontSize: 11, color: "#2A2A2A" }}>/</span>
        <span className="mono" style={{ fontSize: 12, color: accent }}>products/{product.id}</span>
        {site && <a href={site} target="_blank" rel="noopener" style={{
          marginLeft: "auto", fontSize: 12,
          padding: "7px 14px", border: `1px solid ${accent}`, color: accent, borderRadius: 6,
        }}>{siteLabel}</a>}
      </header>

      {/* Hero */}
      <section style={{
        padding: "96px 32px 64px",
        maxWidth: 980, margin: "0 auto",
      }}>
        <div className="mono" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontSize: 11, color: accent, marginBottom: 28, letterSpacing: "0.05em",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent }}></span>
          {product.status.toUpperCase()} · {(product.kind || product.kindEN || '').toUpperCase()}
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
        }}>{product.tagline || product.taglineEN}</p>
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
        <a href="index.html">← Back to hub</a>
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
