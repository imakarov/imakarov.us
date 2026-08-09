/* global React, SITE */
// Direction C — GRID INDEX
// Dense data-driven tile matrix, amber accent. Everything is a card in a grid.
// Feels like a personal dashboard / OS launcher.

const GridC = ({ data = window.SITE }) => {
  const accent = "oklch(0.78 0.18 60)";
  const accentSoft = "oklch(0.78 0.18 60 / 0.15)";

  return (
    <div style={{
      width: "100%", minHeight: "100%",
      background: "#0A0A0A", color: "#EDEDED",
      fontFamily: "var(--font-sans)",
      ["--accent"]: accent,
    }}>
      {/* Compact header */}
      <header style={{
        padding: "20px 24px",
        borderBottom: "1px solid #1F1F1F",
        display: "flex", alignItems: "center", gap: 18,
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: accent, color: "#0A0A0A",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 600, fontSize: 13, letterSpacing: "-0.02em",
        }}>IM</div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>Ilya Makarov</div>
          <div className="mono" style={{ fontSize: 10.5, color: "#525252" }}>imakarov.us · index</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, fontSize: 12, fontFamily: "var(--font-mono)" }}>
          {["telegram", "facebook", "linkedin", "github"].map(k => (
            <a key={k} href={data.links[k]} style={{
              padding: "6px 10px", borderRadius: 5,
              border: "1px solid #1F1F1F", color: "#B4B4B4",
              transition: "border-color .15s, color .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1F1F1F"; e.currentTarget.style.color = "#B4B4B4"; }}>
              {k}
            </a>
          ))}
        </div>
      </header>

      <div style={{ padding: 24, display: "grid", gap: 16 }}>
        {/* Row 1 — hero tile + stats */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <Tile span style={{ padding: 36, background: "#0F0F0F", borderColor: "#1F1F1F" }}>
            <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: "0.05em", marginBottom: 24 }}>
              ● ACTIVE · 3 PRODUCTS IN PARALLEL
            </div>
            <div style={{
              fontSize: 52, fontWeight: 500, letterSpacing: "-0.03em",
              lineHeight: 1.04, maxWidth: 640,
            }}>
              I build products.<br/>
              <span style={{ color: "#7A7A7A" }}>Mostly with AI.</span><br/>
              <span style={{ color: accent }}>Always shipping.</span>
            </div>
            <div style={{
              marginTop: 32, fontSize: 15, color: "#B4B4B4",
              maxWidth: 540, lineHeight: 1.55, textWrap: "pretty",
            }}>
              Chief Growth Officer at Co.Actor. Independent founder of SwipeScan
              and FamilyCheckList. This grid is everything I'm building, writing,
              and saying — kept current.
            </div>
          </Tile>
          <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gap: 16 }}>
            <Tile style={{ padding: 24 }}>
              <div className="mono" style={{ fontSize: 11, color: "#525252", marginBottom: 18 }}>NOW</div>
              <div style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                Leading growth at <span style={{ color: accent }}>Co.Actor</span>.
                Shipping <span style={{ color: accent }}>SwipeScan v2</span>.
                Onboarding redesign for <span style={{ color: accent }}>FamilyCheckList</span>.
              </div>
            </Tile>
            <Tile style={{ padding: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
                {data.stats.slice(0, 4).map((s, i) => (
                  <div key={i} style={{
                    padding: 20,
                    borderRight: i % 2 === 0 ? "1px solid #1F1F1F" : "none",
                    borderTop: i >= 2 ? "1px solid #1F1F1F" : "none",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 500, color: accent, letterSpacing: "-0.02em" }}>
                      {s.v}
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: "#7A7A7A", marginTop: 4, letterSpacing: "0.04em" }}>
                      {s.k.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </Tile>
          </div>
        </div>

        {/* Row 2 — Active products */}
        <RowLabel num="01" label="ACTIVE PRODUCTS" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {data.now.map((p) => (
            <a key={p.id} href={`product-${p.id}.html`}>
              <Tile interactive style={{ padding: 0, overflow: "hidden" }}>
                <div style={{
                  height: 140,
                  background: `radial-gradient(circle at 30% 20%, ${accentSoft}, transparent 60%), #0F0F0F`,
                  borderBottom: "1px solid #1F1F1F",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <ProductMark id={p.id} accent={accent} />
                  <div className="mono" style={{
                    position: "absolute", top: 12, left: 12,
                    fontSize: 10, color: accent, letterSpacing: "0.05em",
                  }}>● {p.status.toUpperCase()}</div>
                  <div className="mono" style={{
                    position: "absolute", top: 12, right: 12,
                    fontSize: 10, color: "#525252",
                  }}>{p.id.toUpperCase()}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>
                    {p.name}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: "#7A7A7A", marginTop: 6 }}>
                    {p.kind}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#B4B4B4", lineHeight: 1.55, margin: "16px 0 0" }}>
                    {p.tagline}
                  </p>
                  <div style={{
                    marginTop: 22, paddingTop: 16, borderTop: "1px solid #1F1F1F",
                    display: "flex", justifyContent: "space-between",
                    fontSize: 12, color: "#525252",
                  }}>
                    <span className="mono">{p.url}</span>
                    <span style={{ color: accent }}>→</span>
                  </div>
                </div>
              </Tile>
            </a>
          ))}
        </div>

        {/* Row 3 — Bio + Experience side by side */}
        <RowLabel num="02" label="BIO" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Tile style={{ padding: 32 }}>
            <div className="mono" style={{ fontSize: 11, color: "#525252", marginBottom: 18 }}>ABOUT</div>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0, color: "#EDEDED" }}>
              Product builder, growth lead, and AI generalist. I've spent ten
              years shipping consumer apps and B2B products.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#B4B4B4", marginTop: 16 }}>
              Currently splitting time between <span style={{ color: accent }}>Co.Actor</span>
              {" "}(growth) and my own products. I write about data-driven GTM,
              shipping in public, and the messy reality of AI-native UX.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
              {["AI-native UX", "Data-driven GTM", "Consumer apps", "Mobile", "B2B SaaS"].map(t => (
                <span key={t} className="mono" style={{
                  padding: "5px 10px", borderRadius: 999,
                  border: "1px solid #2A2A2A", fontSize: 11, color: "#B4B4B4",
                }}>{t}</span>
              ))}
            </div>
          </Tile>
          <Tile style={{ padding: 32 }}>
            <div className="mono" style={{ fontSize: 11, color: "#525252", marginBottom: 18 }}>EXPERIENCE</div>
            {data.experience.map((e, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 110px",
                padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid #1F1F1F",
                alignItems: "baseline", gap: 12,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{e.role}</div>
                  <div style={{ fontSize: 12, color: "#7A7A7A", marginTop: 2 }}>{e.org}</div>
                </div>
                <div className="mono" style={{ fontSize: 10.5, color: accent, textAlign: "right" }}>
                  {e.period}
                </div>
              </div>
            ))}
            <a href={data.links.cv} style={{
              display: "inline-block", marginTop: 20,
              fontSize: 12, color: accent, fontFamily: "var(--font-mono)",
            }}>↓ Download full CV</a>
          </Tile>
        </div>

        {/* Row 4 — Writing tile + speaking tile */}
        <RowLabel num="03" label="WRITING & SPEAKING" />
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
          <Tile style={{ padding: 0 }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1F1F1F", display: "flex", justifyContent: "space-between" }}>
              <span className="mono" style={{ fontSize: 11, color: "#525252" }}>WRITING · {data.writing.length}</span>
              <a href="#" style={{ fontSize: 11, color: accent, fontFamily: "var(--font-mono)" }}>view all →</a>
            </div>
            {data.writing.map((w, i) => (
              <a key={i} href="#" style={{
                display: "grid",
                gridTemplateColumns: "90px 80px 1fr auto",
                gap: 16, padding: "16px 24px",
                borderTop: i === 0 ? "none" : "1px solid #1F1F1F",
                alignItems: "baseline",
              }}>
                <span className="mono" style={{ fontSize: 11, color: "#525252" }}>{w.date.slice(0, 7)}</span>
                <span className="mono" style={{ fontSize: 10, color: accent, letterSpacing: "0.04em" }}>{w.tag.toUpperCase()}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{w.title}</span>
                <span className="mono" style={{ fontSize: 11, color: "#7A7A7A" }}>{w.read}</span>
              </a>
            ))}
          </Tile>
          <Tile style={{ padding: 0 }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1F1F1F" }}>
              <span className="mono" style={{ fontSize: 11, color: "#525252" }}>SPEAKING · {data.speaking.length}</span>
            </div>
            {data.speaking.map((s, i) => (
              <div key={i} style={{
                padding: "16px 24px",
                borderTop: i === 0 ? "none" : "1px solid #1F1F1F",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 11, fontFamily: "var(--font-mono)", color: "#7A7A7A",
                  marginBottom: 6,
                }}>
                  <span>{s.event}</span>
                  <span style={{ color: accent }}>{s.year}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{s.title}</div>
              </div>
            ))}
          </Tile>
        </div>

        {/* Row 5 — Links + Contact */}
        <RowLabel num="04" label="CHANNELS" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {Object.entries(data.links).filter(([k]) => k !== "cv").map(([k, v]) => (
            <a key={k} href={v}>
              <Tile interactive style={{ padding: 18 }}>
                <div className="mono" style={{ fontSize: 10, color: "#525252", marginBottom: 12, letterSpacing: "0.05em" }}>
                  {k.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>
                  {v.replace(/^https?:\/\//, "").replace("mailto:", "").replace(/\/$/, "")}
                </div>
                <div style={{ fontSize: 11, color: accent, marginTop: 14, fontFamily: "var(--font-mono)" }}>
                  open →
                </div>
              </Tile>
            </a>
          ))}
        </div>

        {/* Final CTA */}
        <Tile style={{
          padding: 36, marginTop: 8,
          background: `linear-gradient(135deg, ${accentSoft}, transparent 70%), #0F0F0F`,
          borderColor: accent,
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32,
        }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Want to talk products, growth, or AI?
            </div>
            <div style={{ fontSize: 14, color: "#B4B4B4", marginTop: 8 }}>
              hi@imakarov.us — usually replies within 24h.
            </div>
          </div>
          <a href={data.links.email} style={{
            padding: "14px 24px", borderRadius: 8,
            background: accent, color: "#0A0A0A",
            fontSize: 14, fontWeight: 500, whiteSpace: "nowrap",
          }}>Get in touch →</a>
        </Tile>
      </div>

      <footer className="mono" style={{
        padding: "20px 24px", borderTop: "1px solid #1F1F1F",
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#525252",
      }}>
        <span>© 2026 Ilya Makarov</span>
        <span>Last updated 2026-05-01</span>
      </footer>
    </div>
  );
};

const Tile = ({ children, style = {}, interactive }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "#0F0F0F",
        border: "1px solid #1F1F1F",
        borderRadius: 10,
        height: "100%",
        transition: "border-color .15s, transform .15s",
        cursor: interactive ? "pointer" : "default",
        borderColor: hover ? "#3A3A3A" : (style.borderColor || "#1F1F1F"),
        transform: hover ? "translateY(-2px)" : "none",
        ...style,
      }}
    >{children}</div>
  );
};

const RowLabel = ({ num, label }) => (
  <div className="mono" style={{
    display: "flex", alignItems: "center", gap: 12,
    paddingTop: 24, paddingBottom: 4,
    fontSize: 10.5, color: "#525252", letterSpacing: "0.08em",
  }}>
    <span>— {num}</span>
    <span>{label}</span>
    <span style={{ flex: 1, height: 1, background: "#1F1F1F" }}></span>
  </div>
);

const ProductMark = ({ id, accent }) => {
  if (id === "swipescan") return (
    <div style={{ display: "flex", gap: 6 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 32, height: 44, borderRadius: 4,
          border: `1.5px solid ${accent}`, background: "#0A0A0A",
          transform: `rotate(${(i - 1) * 8}deg) translateY(${Math.abs(i - 1) * 2}px)`,
          opacity: i === 1 ? 1 : 0.5,
        }}></div>
      ))}
    </div>
  );
  if (id === "familychecklist") return (
    <div style={{ display: "grid", gap: 5 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{
            width: 14, height: 14, borderRadius: 3,
            border: `1.5px solid ${accent}`,
            background: i < 2 ? accent : "transparent",
          }}></div>
          <div style={{ width: 50 + i * 8, height: 6, background: i < 2 ? "#2A2A2A" : "#1F1F1F", borderRadius: 2 }}></div>
        </div>
      ))}
    </div>
  );
  return (
    <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
      <path d="M4 36 Q20 36 28 24 T52 16 T76 8" stroke={accent} strokeWidth="2" fill="none"/>
      <circle cx="76" cy="8" r="3" fill={accent}/>
    </svg>
  );
};

window.GridC = GridC;
