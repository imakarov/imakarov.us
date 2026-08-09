/* global React, SITE */
// Direction A — TERMINAL
// Mono-heavy, tight grid, command-line rhythm. Signal-green accent.
// Header is a status bar. Sections are numbered like file paths.

const TermA = ({ data = window.SITE }) => {
  const accent = "oklch(0.78 0.14 145)";
  const accentDim = "oklch(0.45 0.10 145)";
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const tStr = time.toISOString().slice(11, 19) + " UTC";

  return (
    <div style={{
      width: "100%", minHeight: "100%",
      background: "#0A0A0A", color: "#EDEDED",
      fontFamily: "var(--font-sans)",
      ["--accent"]: accent,
      ["--accent-dim"]: accentDim,
    }}>
      {/* Status bar */}
      <div style={{
        height: 36, padding: "0 28px",
        borderBottom: "1px solid #1F1F1F",
        display: "flex", alignItems: "center", gap: 18,
        fontFamily: "var(--font-mono)", fontSize: 11.5,
        color: "#7A7A7A",
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(8px)",
      }}>
        <span style={{ color: accent }}>●</span>
        <span style={{ color: "#EDEDED" }}>imakarov.us</span>
        <span>—</span>
        <span>v2026.05</span>
        <span style={{ marginLeft: "auto" }}>{tStr}</span>
        <span style={{ color: accent }}>READY</span>
      </div>

      {/* Hero */}
      <section style={{ padding: "72px 28px 56px", borderBottom: "1px solid #1F1F1F" }}>
        <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: "0.08em", marginBottom: 24 }}>
          ~/whoami
        </div>
        <h1 style={{
          margin: 0, fontSize: 56, lineHeight: 1.02,
          fontWeight: 500, letterSpacing: "-0.03em",
          maxWidth: 720,
        }}>
          Ilya Makarov.<br/>
          <span style={{ color: "#7A7A7A" }}>{data.tagline}</span>
        </h1>

        <div className="mono" style={{
          marginTop: 36, fontSize: 13, color: "#B4B4B4",
          display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px 18px", maxWidth: 560,
        }}>
          <span style={{ color: "#525252" }}>role</span>
          <span>Chief Growth Officer @ Co.Actor</span>
          <span style={{ color: "#525252" }}>building</span>
          <span>SwipeScan · FamilyCheckList · Co.Actor Growth</span>
          <span style={{ color: "#525252" }}>focus</span>
          <span>AI-native consumer · Data-driven GTM</span>
          <span style={{ color: "#525252" }}>status</span>
          <span style={{ color: accent }}>● Open to advisory & speaking</span>
        </div>
      </section>

      {/* Now — current focus */}
      <Section num="01" path="now/current_focus" title="Now — three in parallel">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid #1F1F1F" }}>
          {data.now.map((p, i) => (
            <a key={p.id} href={`product-${p.id}.html`} style={{
              padding: "28px 24px",
              borderRight: i < 2 ? "1px solid #1F1F1F" : "none",
              display: "block",
              transition: "background .15s",
              cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#0F0F0F"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div className="mono" style={{ fontSize: 11, color: accent, marginBottom: 14 }}>
                ▸ {String(i + 1).padStart(2, "0")}_{p.id}
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.01em" }}>
                {p.name}
              </div>
              <div className="mono" style={{ fontSize: 11, color: "#525252", marginBottom: 18, letterSpacing: "0.02em" }}>
                {p.kind}
              </div>
              <div style={{ fontSize: 13.5, color: "#B4B4B4", lineHeight: 1.55, marginBottom: 22 }}>
                {p.tagline}
              </div>
              <div className="mono" style={{
                fontSize: 11, color: "#7A7A7A", display: "flex",
                justifyContent: "space-between", alignItems: "center",
              }}>
                <span>{p.url}</span>
                <span style={{ color: accent }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Portfolio table */}
      <Section num="02" path="portfolio/all" title="All products">
        <table style={{
          width: "100%", borderCollapse: "collapse",
          fontFamily: "var(--font-mono)", fontSize: 12.5,
        }}>
          <thead>
            <tr style={{ color: "#525252", textAlign: "left" }}>
              <th style={th}>name</th>
              <th style={th}>year</th>
              <th style={th}>platform</th>
              <th style={th}>note</th>
            </tr>
          </thead>
          <tbody>
            {data.portfolio.map((p, i) => (
              <tr key={i} style={{ borderTop: "1px solid #1F1F1F", color: "#EDEDED" }}>
                <td style={td}>{p.name}</td>
                <td style={{ ...td, color: accent }}>{p.year}</td>
                <td style={{ ...td, color: "#B4B4B4" }}>{p.kind}</td>
                <td style={{ ...td, color: "#7A7A7A" }}>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Experience */}
      <Section num="03" path="bio/experience" title="Professional experience">
        <div style={{ display: "grid", gap: 0 }}>
          {data.experience.map((e, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 200px",
              padding: "18px 0", borderTop: "1px solid #1F1F1F",
              alignItems: "baseline",
            }}>
              <div className="mono" style={{ fontSize: 12, color: accent }}>{e.period}</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{e.role}</div>
              <div className="mono" style={{ fontSize: 12, color: "#7A7A7A" }}>{e.org}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Writing */}
      <Section num="04" path="writing/log" title="Writing log">
        <div>
          {data.writing.map((w, i) => (
            <a key={i} href="#" style={{
              display: "grid",
              gridTemplateColumns: "100px 100px 1fr 80px",
              gap: 24, padding: "16px 0",
              borderTop: "1px solid #1F1F1F",
              alignItems: "baseline",
              transition: "color .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = accent}
            onMouseLeave={e => e.currentTarget.style.color = "#EDEDED"}>
              <span className="mono" style={{ fontSize: 12, color: "#525252" }}>{w.date}</span>
              <span className="mono" style={{ fontSize: 11, color: "#7A7A7A" }}>{w.tag.toUpperCase()}</span>
              <span style={{ fontSize: 15 }}>{w.title}</span>
              <span className="mono" style={{ fontSize: 11, color: "#525252", textAlign: "right" }}>{w.read}</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Speaking */}
      <Section num="05" path="speaking/talks" title="Speaking & press">
        <div>
          {data.speaking.map((s, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "80px 200px 1fr",
              gap: 24, padding: "16px 0",
              borderTop: "1px solid #1F1F1F",
              alignItems: "baseline",
            }}>
              <span className="mono" style={{ fontSize: 12, color: accent }}>{s.year}</span>
              <span className="mono" style={{ fontSize: 12, color: "#7A7A7A" }}>{s.event}</span>
              <span style={{ fontSize: 15 }}>{s.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section num="06" path="contact/all" title="Get in touch" last>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, paddingTop: 8 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 12, letterSpacing: "-0.01em" }}>
              Talk to me about products,<br/>growth, or AI.
            </div>
            <div style={{ fontSize: 14, color: "#7A7A7A", marginBottom: 24, lineHeight: 1.6 }}>
              Reply usually within 24h.
              Best for: product collaborations, advisory, speaking invitations.
            </div>
            <a href={data.links.email} className="mono" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 18px", border: `1px solid ${accent}`,
              color: accent, fontSize: 12, letterSpacing: "0.04em",
              borderRadius: 4,
            }}>
              hi@imakarov.us <span>→</span>
            </a>
          </div>
          <div className="mono" style={{ fontSize: 12, color: "#B4B4B4" }}>
            <div style={{ color: "#525252", marginBottom: 14 }}>// channels</div>
            {Object.entries(data.links).filter(([k]) => k !== "email" && k !== "cv").map(([k, v]) => (
              <a key={k} href={v} style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0", borderTop: "1px solid #1F1F1F",
              }}>
                <span style={{ color: "#7A7A7A" }}>{k}</span>
                <span>{v.replace(/^https?:\/\//, "").replace("mailto:", "")} →</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mono" style={{
        padding: "28px", borderTop: "1px solid #1F1F1F",
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#525252",
      }}>
        <span>© 2026 imakarov.us</span>
        <span>Built in public · Last deploy: 2026-05-01</span>
      </footer>
    </div>
  );
};

const Section = ({ num, path, title, children, last }) => (
  <section style={{ padding: "56px 28px", borderBottom: last ? "none" : "1px solid #1F1F1F" }}>
    <div style={{
      display: "flex", alignItems: "baseline", gap: 18,
      marginBottom: 32, paddingBottom: 16,
    }}>
      <span className="mono" style={{ fontSize: 11, color: "#525252", letterSpacing: "0.05em" }}>
        {num}
      </span>
      <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.05em" }}>
        ~/{path}
      </span>
      <h2 style={{
        margin: 0, marginLeft: "auto", fontSize: 14, fontWeight: 500,
        color: "#7A7A7A", letterSpacing: "-0.005em",
      }}>
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const th = { padding: "10px 12px 10px 0", fontWeight: 400, fontSize: 11, letterSpacing: "0.04em" };
const td = { padding: "14px 12px 14px 0" };

window.TermA = TermA;
