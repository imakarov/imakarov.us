/* global React */
// Shared company-page template.
// Used by company-cscart.html, company-coactor.html, etc.
// Each page: <window.CompanyPage id="cscart" />

const useLangCompany = () => {
  const [lang, setLang] = React.useState(() => {
    const u = new URLSearchParams(location.search).get("lang");
    return u === "ru" ? "ru" : (localStorage.getItem("lang") === "ru" ? "ru" : "en");
  });
  React.useEffect(() => {
    localStorage.setItem("lang", lang);
    const u = new URL(location.href);
    u.searchParams.set("lang", lang);
    history.replaceState(null, "", u.toString());
  }, [lang]);
  return [lang, setLang];
};

const RevealCo = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
};

const CompanyPage = ({ id, content = {} }) => {
  const [lang, setLang] = useLangCompany();
  const c = window.SITE.companies.find(x => x.id === id);
  if (!c) return <div style={{ padding: 40, color: "white" }}>Company not found.</div>;

  // Per-company optional rich content (sections, presentations, screens)
  const sections = content.sections?.[lang] || content.sections?.en || [];
  const presentations = content.presentations || [];
  const screens = content.screens || [];

  return (
    <div className="co-root">
      <CompanyStyles accent={c.accent} />
      <div className="co-aurora" style={{ "--accent": c.accent }} aria-hidden>
        <div className="co-blob a" />
        <div className="co-blob b" />
      </div>

      <nav className="co-nav">
        <a href="index.html" className="co-back">← {lang === "ru" ? "На главную" : "Home"}</a>
        <span className="mono co-domain">imakarov.us / {c.id}</span>
        <div className="co-lang">
          <button onClick={() => setLang("en")} className={lang === "en" ? "on" : ""}>EN</button>
          <button onClick={() => setLang("ru")} className={lang === "ru" ? "on" : ""}>RU</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="co-hero">
        <div data-reveal className="co-hero-meta mono">
          {lang === "ru" ? c.periodRU : c.periodEN} · {lang === "ru" ? c.kindRU : c.kindEN}
        </div>
        <h1 data-reveal className="co-hero-name">{c.name}</h1>
        <div data-reveal className="co-hero-role">{lang === "ru" ? c.roleRU : c.roleEN}</div>
        <p data-reveal className="co-hero-tag">{lang === "ru" ? c.taglineRU : c.taglineEN}</p>
        {c.external && (
          <a data-reveal href={c.external} target="_blank" className="co-external mono">
            {c.external.replace(/^https?:\/\//, "")} →
          </a>
        )}
      </header>

      {/* HEADLINE METRIC */}
      {content.headline && (
        <section className="co-section co-headline-sec">
          <div data-reveal className="co-headline">
            <div className="co-headline-v">{content.headline.v}</div>
            <div className="co-headline-k mono">{lang === "ru" ? content.headline.kRU : content.headline.kEN}</div>
          </div>
        </section>
      )}

      {/* STATIC IMAGES — preloaded photos (team, etc.) */}
      {(content.staticImages || []).map((img, i) => (
        <section key={i} className="co-section co-static-sec">
          <div data-reveal className="co-static-wrap">
            <div className="mono co-static-label">{lang === "ru" ? img.labelRU : img.labelEN}</div>
            <img src={img.src} alt="" className="co-static-img" style={{ maxHeight: img.height || 480 }} />
          </div>
        </section>
      ))}

      {/* KEY RESULTS — pulled from data */}
      <section className="co-section">
        <div data-reveal className="co-sec-head">
          <span className="mono co-sec-num">01 / {lang === "ru" ? "КЛЮЧЕВЫЕ РЕЗУЛЬТАТЫ" : "KEY RESULTS"}</span>
          <h2 className="co-sec-h">{lang === "ru" ? "Что важно знать" : "What matters"}</h2>
        </div>
        <div className="co-key-grid">
          {(lang === "ru" ? c.keyRU : c.keyEN).map((k, i) => (
            <div key={i} data-reveal className="co-key-card">
              <span className="mono co-key-num">0{i + 1}</span>
              <span className="co-key-text">{k}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RICH SECTIONS — per-company narrative */}
      {sections.length > 0 && (
        <section className="co-section">
          <div data-reveal className="co-sec-head">
            <span className="mono co-sec-num">02 / {lang === "ru" ? "ЧТО Я СДЕЛАЛ" : "WHAT I DID"}</span>
            <h2 className="co-sec-h">{lang === "ru" ? "По делу" : "The work"}</h2>
          </div>
          <div className="co-narrative">
            {sections.map((s, i) => (
              <div key={i} data-reveal className="co-narr-row">
                <div className="co-narr-key">{s.key}</div>
                <div className="co-narr-body">
                  {s.body.split("\n\n").map((p, j) => <p key={j}>{p}</p>)}
                  {s.link && (
                    <a href={s.link} target="_blank" className="mono co-narr-link">
                      {s.linkLabel || s.link} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SCREENS — image-slot drop zones */}
      {screens.length > 0 && (
        <section className="co-section">
          <div data-reveal className="co-sec-head">
            <span className="mono co-sec-num">03 / {lang === "ru" ? "СКРИНЫ" : "SCREENS"}</span>
            <h2 className="co-sec-h">{lang === "ru" ? "Визуально" : "Visually"}</h2>
          </div>
          <div className={"co-screens " + (screens.length === 2 ? "two" : "one")}>
            {screens.map((s, i) => (
              <div key={i} data-reveal className="co-screen">
                <div className="mono co-screen-label">{lang === "ru" && s.labelRU ? s.labelRU : s.label}</div>
                <image-slot
                  id={`co-${id}-${s.id}`}
                  shape="rounded"
                  radius="12"
                  src={s.src}
                  placeholder={lang === "ru" ? (s.placeholderRU || s.placeholder || "Скрин") : (s.placeholder || "Screen")}
                  style={{ width: "100%", height: s.height || 360, display: "block" }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRESENTATIONS — from achievements, filtered */}
      {presentations.length > 0 && (
        <section className="co-section">
          <div data-reveal className="co-sec-head">
            <span className="mono co-sec-num">04 / {lang === "ru" ? "ПРЕЗЕНТАЦИИ" : "TALKS & DECKS"}</span>
            <h2 className="co-sec-h">{lang === "ru" ? "Публичные материалы" : "Public material"}</h2>
          </div>
          <div className="co-pres">
            {presentations.map((aid, i) => {
              const a = window.SITE.achievements.find(x => x.id === aid);
              if (!a) return null;
              return (
                <a key={a.id} href={a.url} target="_blank" data-reveal className="co-pres-row">
                  <span className="mono co-pres-tag">{a.tag}</span>
                  <span className="co-pres-title">{lang === "ru" ? a.titleRU : a.titleEN}</span>
                  <span className="mono co-pres-year">{a.year}</span>
                  <span className="co-pres-arrow">→</span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* GAMES — 1CLue style game catalog */}
      {(content.games || []).length > 0 && (
        <section className="co-section">
          <div data-reveal className="co-sec-head">
            <span className="mono co-sec-num">— / {lang === "ru" ? "ИГРЫ" : "GAMES"}</span>
            <h2 className="co-sec-h">{lang === "ru" ? "Прототипы и релизы" : "Prototypes and releases"}</h2>
          </div>
          <div className="co-games">
            {content.games.map((g) => (
              <div key={g.id} data-reveal className="co-game">
                <div className="co-game-head">
                  <span className="co-game-name">{g.name}</span>
                  <span className="mono co-game-kind">{lang === "ru" ? g.kindRU : g.kindEN}</span>
                </div>
                <p className="co-game-pitch">{lang === "ru" ? g.pitchRU : g.pitchEN}</p>
                <image-slot id={`game-${g.id}`} shape="rounded" radius="10"
                  src={g.img}
                  placeholder={lang === "ru" ? "Скрин " + g.name : g.name + " screen"}
                  style={{ width: "100%", height: 220, display: "block", marginTop: "16px" }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NAVIGATE — other companies */}
      <section className="co-section">
        <div data-reveal className="co-sec-head">
          <span className="mono co-sec-num">— / {lang === "ru" ? "ДАЛЬШЕ" : "MORE"}</span>
          <h2 className="co-sec-h">{lang === "ru" ? "Другие компании" : "Other companies"}</h2>
        </div>
        <div className="co-other">
          {window.SITE.companies.filter(o => o.id !== id).map((o) => (
            <a key={o.id} href={o.url} data-reveal className="co-other-card" style={{ "--c": o.accent }}>
              <span className="mono co-other-period">{lang === "ru" ? o.periodRU : o.periodEN}</span>
              <span className="co-other-name">{o.name}</span>
              <span className="mono co-other-role">{lang === "ru" ? o.roleRU : o.roleEN}</span>
              <span className="co-other-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="co-foot mono">
        <a href="index.html">← imakarov.us</a>
        <span>© 2026 Ilya Makarov</span>
      </footer>

      <RevealCo />
    </div>
  );
};

const CompanyStyles = ({ accent }) => (
  <style>{`
    .co-root { --accent: ${accent}; min-height: 100vh; background: #070708; color: #EDEDED;
      font-family: var(--font-sans); position: relative; overflow-x: hidden; }
    [data-reveal]{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.2,.7,.3,1),transform .8s cubic-bezier(.2,.7,.3,1)}
    [data-reveal].rv-in{opacity:1;transform:none}

    .co-aurora{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
    .co-blob{position:absolute;width:680px;height:680px;border-radius:50%;filter:blur(120px);opacity:.22;mix-blend-mode:screen;background:var(--accent)}
    .co-blob.a{top:-260px;left:-200px;animation:cob 24s ease-in-out infinite}
    .co-blob.b{bottom:-200px;right:-200px;animation:cob 30s ease-in-out infinite reverse;opacity:.14}
    @keyframes cob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(120px,80px) scale(1.15)}}

    .co-nav{position:sticky;top:0;z-index:20;height:60px;padding:0 40px;
      background:rgba(7,7,8,0.55);backdrop-filter:blur(18px);
      border-bottom:1px solid rgba(255,255,255,0.06);
      display:flex;align-items:center;gap:24px}
    .co-back{font-size:13px;color:#B4B4B4;transition:color .15s}
    .co-back:hover{color:var(--accent)}
    .co-domain{margin-left:auto;font-size:11px;color:#525252}
    .co-lang{display:flex;border:1px solid rgba(255,255,255,0.1);border-radius:6px;overflow:hidden;font-family:var(--font-mono);font-size:11px}
    .co-lang button{padding:6px 10px;background:transparent;border:none;color:#7A7A7A;cursor:pointer;letter-spacing:.05em}
    .co-lang button.on{background:var(--accent);color:#070708}

    .co-hero{position:relative;z-index:5;max-width:960px;margin:0 auto;padding:120px 40px 80px}
    .co-hero-meta{font-size:12px;color:#7A7A7A;letter-spacing:.05em;margin-bottom:24px}
    .co-hero-name{margin:0;font-size:96px;line-height:.95;font-weight:500;letter-spacing:-.045em;
      background:linear-gradient(120deg,#EDEDED 30%,var(--accent) 100%);
      -webkit-background-clip:text;background-clip:text;color:transparent}
    .co-hero-role{font-size:18px;color:var(--accent);margin-top:18px;font-family:var(--font-mono)}
    .co-hero-tag{font-size:22px;line-height:1.5;color:#B4B4B4;max-width:680px;margin:24px 0 0;text-wrap:pretty}
    .co-external{display:inline-block;margin-top:32px;font-size:13px;color:var(--accent);
      padding:10px 18px;border:1px solid var(--accent);border-radius:8px;transition:background .2s}
    .co-external:hover{background:color-mix(in oklch,var(--accent) 15%,transparent)}

    .co-section{position:relative;z-index:5;max-width:960px;margin:0 auto;padding:80px 40px;
      border-top:1px solid rgba(255,255,255,0.06)}
    .co-sec-head{display:grid;grid-template-columns:140px 1fr;gap:32px;align-items:start;margin-bottom:48px}
    .co-sec-num{font-size:11px;color:#525252;padding-top:14px;letter-spacing:.05em}
    .co-sec-h{margin:0;font-size:40px;font-weight:500;letter-spacing:-.03em;line-height:1.1}

    .co-key-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-left:172px}
    .co-key-card{display:grid;grid-template-columns:48px 1fr;gap:16px;padding:24px;
      border:1px solid rgba(255,255,255,0.07);border-radius:12px;background:rgba(255,255,255,0.02);
      transition:border-color .2s,background .2s,transform .2s}
    .co-key-card:hover{border-color:var(--accent);background:color-mix(in oklch,var(--accent) 6%,transparent);transform:translateY(-2px)}
    .co-key-num{font-size:13px;color:var(--accent);font-weight:500}
    .co-key-text{font-size:16px;line-height:1.45;font-weight:400}

    .co-narrative{margin-left:172px;display:grid;gap:32px}
    .co-narr-row{display:grid;grid-template-columns:160px 1fr;gap:32px;padding-bottom:32px;border-bottom:1px solid rgba(255,255,255,0.05)}
    .co-narr-row:last-child{border-bottom:none}
    .co-narr-key{font-size:14px;font-weight:500;color:var(--accent);position:sticky;top:80px;align-self:start}
    .co-narr-body p{font-size:16px;line-height:1.65;color:#D4D4D4;margin:0 0 12px;text-wrap:pretty}
    .co-narr-link{display:inline-block;margin-top:8px;font-size:12px;color:var(--accent)}

    .co-screens{margin-left:172px;display:grid;gap:24px}
    .co-screens.two{grid-template-columns:1fr 1fr}
    .co-screen{position:relative;padding-top:24px}
    .co-screen-label{position:absolute;top:0;left:0;font-size:11px;color:#7A7A7A;letter-spacing:.05em}

    .co-pres{margin-left:172px}
    .co-pres-row{display:grid;grid-template-columns:90px 1fr 60px 24px;gap:20px;padding:22px 0;
      border-top:1px solid rgba(255,255,255,0.07);align-items:baseline;transition:padding .2s,color .2s}
    .co-pres-row:hover{padding-left:8px;color:var(--accent)}
    .co-pres-tag{font-size:11px;color:var(--accent);letter-spacing:.05em}
    .co-pres-title{font-size:17px;font-weight:500;letter-spacing:-.01em}
    .co-pres-year{font-size:12px;color:#7A7A7A;text-align:right}
    .co-pres-arrow{color:#7A7A7A;text-align:right}

    .co-other{margin-left:172px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .co-other-card{display:grid;gap:6px;padding:24px;border-radius:12px;
      border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);
      position:relative;transition:border-color .2s,background .2s,transform .2s}
    .co-other-card:hover{border-color:var(--c);background:color-mix(in oklch,var(--c) 8%,transparent);transform:translateY(-2px)}
    .co-other-period{font-size:11px;color:#7A7A7A;letter-spacing:.05em}
    .co-other-name{font-size:22px;font-weight:500;letter-spacing:-.02em;color:#EDEDED}
    .co-other-role{font-size:12px;color:var(--c);margin-top:2px}
    .co-other-arrow{position:absolute;top:24px;right:24px;color:#525252;transition:color .2s,transform .2s}
    .co-other-card:hover .co-other-arrow{color:var(--c);transform:translateX(4px)}

    .co-foot{position:relative;z-index:5;max-width:960px;margin:0 auto;padding:32px 40px;
      border-top:1px solid rgba(255,255,255,0.06);
      display:flex;justify-content:space-between;font-size:11px;color:#525252}
    .co-foot a{color:#7A7A7A;transition:color .15s}
    .co-foot a:hover{color:var(--accent)}

    .co-headline-sec{padding-top:32px;padding-bottom:32px}
    .co-headline{display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:center;padding:32px 0}
    .co-headline-v{font-size:120px;font-weight:500;letter-spacing:-.045em;line-height:.9;background:linear-gradient(120deg,#EDEDED 30%,var(--accent) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
    .co-headline-k{font-size:14px;color:#B4B4B4;letter-spacing:.02em;text-wrap:pretty;max-width:280px}

    .co-static-sec{padding-top:32px;padding-bottom:32px}
    .co-static-wrap{position:relative;padding-top:24px}
    .co-static-label{position:absolute;top:0;left:0;font-size:11px;color:#7A7A7A;letter-spacing:.05em}
    .co-static-img{width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,0.08);object-fit:cover}

    .co-games{margin-left:172px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
    .co-game{padding:24px;border:1px solid rgba(255,255,255,0.07);border-radius:14px;background:rgba(255,255,255,0.02);transition:border-color .2s,background .2s}
    .co-game:hover{border-color:var(--accent);background:color-mix(in oklch,var(--accent) 6%,transparent)}
    .co-game-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
    .co-game-name{font-size:24px;font-weight:500;letter-spacing:-.02em}
    .co-game-kind{font-size:11px;color:var(--accent);letter-spacing:.05em;padding:3px 8px;border:1px solid var(--accent);border-radius:4px}
    .co-game-pitch{font-size:14px;line-height:1.55;color:#B4B4B4;margin:0;text-wrap:pretty}

    @media (max-width:780px){
      .co-hero-name{font-size:64px}
      .co-sec-head{grid-template-columns:1fr;gap:8px}
      .co-key-grid,.co-narrative,.co-pres,.co-other,.co-screens{margin-left:0;grid-template-columns:1fr}
      .co-narr-row{grid-template-columns:1fr;gap:8px}
      .co-narr-key{position:static}
      .co-screens.two{grid-template-columns:1fr}
      .co-headline{grid-template-columns:1fr;gap:8px}
      .co-headline-v{font-size:72px}
      .co-games{margin-left:0;grid-template-columns:1fr}
    }
  `}</style>
);

window.CompanyPage = CompanyPage;
