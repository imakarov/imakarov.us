/* global React, SITE */
// Direction B — EDITORIAL TECH
// Large display type, numbered sections, generous whitespace, electric blue.
// Single-column rhythm with occasional 2-col splits. Linear/Vercel-adjacent.

const EditorialB = ({ data = window.SITE }) => {
  const accent = "oklch(0.72 0.16 250)";
  const accentSoft = "oklch(0.72 0.16 250 / 0.12)";

  return (
    <div style={{
      width: "100%", minHeight: "100%",
      background: "#0A0A0A", color: "#EDEDED",
      fontFamily: "var(--font-sans)",
      ["--accent"]: accent,
    }}>
      {/* Slim top nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 10,
        height: 56, padding: "0 40px",
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #161616",
        display: "flex", alignItems: "center", gap: 28,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
          Ilya Makarov
        </span>
        <span className="mono" style={{ fontSize: 11, color: "#525252" }}>imakarov.us</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 24, fontSize: 13, color: "#B4B4B4" }}>
          <a href="#now">Now</a>
          <a href="#products">Products</a>
          <a href="#bio">Bio</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
        </span>
        <a href={data.links.email} style={{
          padding: "7px 14px", borderRadius: 6,
          background: accent, color: "#0A0A0A",
          fontSize: 12.5, fontWeight: 500,
        }}>Get in touch</a>
      </nav>

      {/* Hero */}
      <section style={{ padding: "140px 40px 96px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "6px 12px 6px 8px", borderRadius: 999,
          background: accentSoft, border: `1px solid ${accent}`,
          fontSize: 12, color: accent, marginBottom: 36,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: accent, boxShadow: `0 0 0 3px ${accentSoft}`,
          }}></span>
          Currently shipping three products
        </div>

        <h1 style={{
          margin: 0, fontSize: 88, lineHeight: 0.98,
          fontWeight: 500, letterSpacing: "-0.04em",
          maxWidth: 900,
        }}>
          Product builder<br/>
          with an <span style={{ color: accent, fontStyle: "italic", fontWeight: 400 }}>AI</span> obsession.
        </h1>

        <p style={{
          fontSize: 20, lineHeight: 1.5, color: "#B4B4B4",
          maxWidth: 620, marginTop: 36, marginBottom: 0,
          textWrap: "pretty",
        }}>
          I'm Ilya. I build AI-native consumer apps and lead growth at Co.Actor.
          This is where I keep my products, writing, and what I'm working on right now.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          <a href="#products" style={btnPrimary(accent)}>See products →</a>
          <a href={data.links.cv} style={btnGhost()}>Download CV</a>
        </div>
      </section>

      {/* Now */}
      <NumSection num="01" eyebrow="Now" title="Three products in parallel.">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, marginTop: 8,
        }}>
          {data.now.map((p) => (
            <a key={p.id} href={`product-${p.id}.html`} style={{
              padding: 28, borderRadius: 12,
              background: "#0F0F0F", border: "1px solid #1F1F1F",
              display: "flex", flexDirection: "column", gap: 0,
              transition: "border-color .15s, transform .15s",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#2F2F2F"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1F1F1F"; e.currentTarget.style.transform = "none"; }}>
              <ProductGlyph id={p.id} accent={accent} />
              <div style={{
                marginTop: 22,
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 11, fontFamily: "var(--font-mono)", color: "#525252",
                letterSpacing: "0.04em",
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: p.status === "Live" ? accent : "#7A7A7A",
                }}></span>
                {p.status.toUpperCase()} · {p.kind.toUpperCase()}
              </div>
              <div style={{
                fontSize: 24, fontWeight: 500, marginTop: 12,
                letterSpacing: "-0.02em",
              }}>{p.name}</div>
              <p style={{
                fontSize: 14, color: "#B4B4B4",
                lineHeight: 1.55, margin: "10px 0 0",
              }}>{p.tagline}</p>
              <div style={{
                marginTop: 22, paddingTop: 18, borderTop: "1px solid #1F1F1F",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 12, color: "#7A7A7A",
              }}>
                <span className="mono">{p.url}</span>
                <span style={{ color: accent }}>Open →</span>
              </div>
            </a>
          ))}
        </div>
      </NumSection>

      {/* Bio */}
      <NumSection num="02" eyebrow="Bio" title="Who I am, briefly.">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, marginTop: 8,
        }}>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#EDEDED", margin: 0 }}>
              I'm a product person who codes. Ten years building consumer
              and B2B products, mostly at the intersection of growth, data,
              and now AI.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#B4B4B4", marginTop: 20 }}>
              These days I run growth at Co.Actor and build my own apps on the
              side — SwipeScan and FamilyCheckList. I write about what I learn
              while shipping in public.
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
              {data.stats.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: 28, fontWeight: 500, color: accent,
                    letterSpacing: "-0.02em",
                  }}>{s.v}</div>
                  <div className="mono" style={{ fontSize: 11, color: "#7A7A7A", marginTop: 4 }}>
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "#525252", marginBottom: 18, letterSpacing: "0.05em" }}>
              EXPERIENCE
            </div>
            {data.experience.map((e, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid #1F1F1F",
                alignItems: "baseline",
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{e.role}</div>
                  <div style={{ fontSize: 13, color: "#7A7A7A", marginTop: 2 }}>{e.org}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "#525252" }}>{e.period}</div>
              </div>
            ))}
          </div>
        </div>
      </NumSection>

      {/* Writing */}
      <NumSection num="03" eyebrow="Writing" title="Notes on building.">
        <div style={{ marginTop: 8 }}>
          {data.writing.map((w, i) => (
            <a key={i} href="#" style={{
              display: "grid",
              gridTemplateColumns: "120px 100px 1fr auto",
              gap: 32, padding: "22px 0",
              borderTop: "1px solid #1F1F1F",
              alignItems: "baseline",
              transition: "padding .15s, color .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
            onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}>
              <span className="mono" style={{ fontSize: 12, color: "#7A7A7A" }}>{w.date}</span>
              <span style={{
                fontSize: 11, color: accent, fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}>{w.tag.toUpperCase()}</span>
              <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{w.title}</span>
              <span style={{ fontSize: 13, color: "#7A7A7A" }}>{w.read} →</span>
            </a>
          ))}
        </div>
      </NumSection>

      {/* Speaking */}
      <NumSection num="04" eyebrow="Speaking" title="Recent talks.">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, marginTop: 8,
        }}>
          {data.speaking.map((s, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: 10,
              background: "#0F0F0F", border: "1px solid #1F1F1F",
            }}>
              <div className="mono" style={{ fontSize: 11, color: accent, marginBottom: 16 }}>
                {s.year}
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 12, letterSpacing: "-0.01em" }}>
                {s.title}
              </div>
              <div className="mono" style={{ fontSize: 11, color: "#7A7A7A" }}>{s.event}</div>
            </div>
          ))}
        </div>
      </NumSection>

      {/* Contact */}
      <NumSection num="05" eyebrow="Contact" title="Let's talk." last>
        <div style={{
          marginTop: 16,
          padding: 48, borderRadius: 14,
          background: `linear-gradient(135deg, ${accentSoft}, transparent 60%), #0F0F0F`,
          border: `1px solid ${accent}`,
          display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Product, growth, or AI advisory?<br/>
              <span style={{ color: "#B4B4B4" }}>Drop a line.</span>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 24, fontSize: 13, color: "#B4B4B4" }}>
              {Object.entries(data.links).filter(([k]) => !["email", "cv"].includes(k)).map(([k, v]) => (
                <a key={k} href={v} style={{ textTransform: "capitalize" }}>{k}</a>
              ))}
            </div>
          </div>
          <a href={data.links.email} style={{
            padding: "16px 28px", borderRadius: 8,
            background: accent, color: "#0A0A0A",
            fontSize: 15, fontWeight: 500, whiteSpace: "nowrap",
          }}>hi@imakarov.us →</a>
        </div>
      </NumSection>

      <footer style={{
        padding: "32px 40px", borderTop: "1px solid #161616",
        display: "flex", justifyContent: "space-between",
        fontSize: 12, color: "#525252", maxWidth: 1080, margin: "0 auto",
      }}>
        <span>© 2026 Ilya Makarov</span>
        <span className="mono">imakarov.us</span>
      </footer>
    </div>
  );
};

const NumSection = ({ num, eyebrow, title, children, last }) => (
  <section style={{
    padding: "80px 40px",
    maxWidth: 1080, margin: "0 auto",
    borderTop: "1px solid #161616",
  }}>
    <div style={{
      display: "grid", gridTemplateColumns: "120px 1fr",
      gap: 32, alignItems: "start", marginBottom: 36,
    }}>
      <div className="mono" style={{ fontSize: 11, color: "#525252", paddingTop: 14, letterSpacing: "0.05em" }}>
        {num} / {eyebrow.toUpperCase()}
      </div>
      <h2 style={{
        margin: 0, fontSize: 40, fontWeight: 500,
        letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 620,
      }}>{title}</h2>
    </div>
    <div style={{ marginLeft: 152 }}>{children}</div>
  </section>
);

const ProductGlyph = ({ id, accent }) => {
  // Simple geometric glyphs as visual anchors — no fake icons
  const common = { width: 44, height: 44, display: "block" };
  if (id === "swipescan") return (
    <svg {...common} viewBox="0 0 44 44" fill="none">
      <rect x="6" y="8" width="22" height="28" rx="3" stroke={accent} strokeWidth="1.5"/>
      <rect x="14" y="14" width="24" height="22" rx="3" fill="#0F0F0F" stroke={accent} strokeWidth="1.5"/>
      <line x1="20" y1="22" x2="32" y2="22" stroke={accent} strokeWidth="1.5"/>
      <line x1="20" y1="27" x2="28" y2="27" stroke={accent} strokeWidth="1.5"/>
    </svg>
  );
  if (id === "familychecklist") return (
    <svg {...common} viewBox="0 0 44 44" fill="none">
      <rect x="8" y="8" width="28" height="28" rx="3" stroke={accent} strokeWidth="1.5"/>
      <path d="M14 18 L17 21 L23 14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="26" y1="17" x2="32" y2="17" stroke={accent} strokeWidth="1.5"/>
      <path d="M14 28 L17 31 L23 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="26" y1="27" x2="32" y2="27" stroke={accent} strokeWidth="1.5"/>
    </svg>
  );
  return (
    <svg {...common} viewBox="0 0 44 44" fill="none">
      <path d="M8 32 L16 20 L22 26 L36 12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="12" r="2" fill={accent}/>
      <line x1="8" y1="36" x2="36" y2="36" stroke="#1F1F1F" strokeWidth="1"/>
    </svg>
  );
};

const btnPrimary = (a) => ({
  padding: "12px 22px", borderRadius: 8,
  background: a, color: "#0A0A0A",
  fontSize: 14, fontWeight: 500,
});
const btnGhost = () => ({
  padding: "12px 22px", borderRadius: 8,
  background: "transparent", color: "#EDEDED",
  fontSize: 14, fontWeight: 500,
  border: "1px solid #2A2A2A",
});

window.EditorialB = EditorialB;
