/* global React, SITE */
// imakarov.us — main page (alive direction).
// Hero → Stats → Achievements (talks) → Companies → Independent products
// → Career → Communities & Learning → Contact

const useLang = () => {
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

const useReveal = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -80px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const ALIVE = ({ data = window.SITE }) => {
  const [lang, setLang] = useLang();
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS || { palette: "indigo-magenta", cubes: true });
  useReveal();

  const PALETTES = {
    "indigo-magenta": { a: "oklch(0.74 0.17 260)", b: "oklch(0.78 0.18 320)", c: "oklch(0.7 0.18 180)", g1: "#7C9BFF", g2: "#D77CFF", label: "Indigo · Magenta" },
    "amber-rose":     { a: "oklch(0.78 0.18 50)",  b: "oklch(0.74 0.18 20)",  c: "oklch(0.78 0.16 80)", g1: "#FFB960", g2: "#FF7E8A", label: "Amber · Rose" },
    "emerald-teal":   { a: "oklch(0.72 0.16 160)", b: "oklch(0.7 0.14 200)",  c: "oklch(0.74 0.16 130)", g1: "#5EE0B0", g2: "#5EBED0", label: "Emerald · Teal" },
    "violet-cyan":    { a: "oklch(0.7 0.2 290)",   b: "oklch(0.78 0.15 220)", c: "oklch(0.74 0.16 250)", g1: "#A77CFF", g2: "#5EE0E0", label: "Violet · Cyan" },
    "mono-warm":      { a: "oklch(0.78 0.06 70)",  b: "oklch(0.7 0.05 30)",   c: "oklch(0.75 0.05 50)",  g1: "#D4C2A8", g2: "#A89580", label: "Warm Mono" },
  };
  const pal = PALETTES[t.palette] || PALETTES["indigo-magenta"];
  const rootStyle = {
    "--accent": pal.a,
    "--accent2": pal.b,
    "--accent3": pal.c,
    "--cube-g1": pal.g1,
    "--cube-g2": pal.g2,
  };

  return (
    <div className="alive-root" style={rootStyle}>
      <AliveStyles />
      <AuroraBg cubes={t.cubes} />
      <Grain />

      <nav className="alive-nav">
        <div className="alive-mark"><span className="alive-mark-dot" />Ilya Makarov</div>
        <span className="mono" style={{ fontSize: 11, color: "#525252" }}>imakarov.us</span>
        <div className="alive-nav-links">
          <a href="#achievements">{lang === "ru" ? "Ачивменты" : "Achievements"}</a>
          <a href="#companies">{lang === "ru" ? "Компании" : "Companies"}</a>
          <a href="#independent">{lang === "ru" ? "Свои аппы" : "Independent"}</a>
          <a href="#career">{lang === "ru" ? "Карьера" : "Career"}</a>
          <a href="#communities">{lang === "ru" ? "Сообщества" : "Communities"}</a>
          <a href="#contact">{lang === "ru" ? "Контакт" : "Contact"}</a>
        </div>
        <div className="alive-lang">
          <button onClick={() => setLang("en")} className={lang === "en" ? "on" : ""}>EN</button>
          <button onClick={() => setLang("ru")} className={lang === "ru" ? "on" : ""}>RU</button>
        </div>
      </nav>

      <Ticker lang={lang} />

      {/* HERO */}
      <section className="alive-hero">
        <div className="hero-grid">
          <div data-reveal className="hero-copy">
            <div className="hero-pill">
              <span className="pulse" />
              {lang === "ru" ? "3 активные роли · 20 лет шипаю продукты" : "3 active roles · 20 years shipping products"}
            </div>
            <h1 className="hero-h">
              {lang === "ru" ? (
                <>Делаю <em>продукты</em>.<br/>Настраиваю <span className="hero-grad">процессы</span>.</>
              ) : (
                <>Ship <em>products</em>.<br/>Optimize <span className="hero-grad">processes</span>.</>
              )}
            </h1>
            <p className="hero-sub">
              {lang === "ru"
                ? "Двадцать лет шиплю продукты. Сейчас — CGO в Co.Actor, эдвайзер Smart Ranking, в фоне делаю свои аппы. Здесь живут компании, кейсы и публичные материалы."
                : "Twenty years shipping products. CGO at Co.Actor, advisor at Smart Ranking, building consumer apps in parallel. Companies, cases, and public material live here."}
            </p>
            <div className="hero-cta">
              <a href="#achievements" className="btn-primary">
                {lang === "ru" ? "Презентации и выступления →" : "Talks & decks →"}
              </a>
              <a href={data.links.notion} target="_blank" className="btn-ghost">
                {lang === "ru" ? "Полное био" : "Full bio"}
              </a>
            </div>
          </div>
          <div data-reveal className="hero-portrait">
            <image-slot
              id="portrait"
              shape="rounded"
              radius="20"
              src={(window.__resources && window.__resources.portrait) || "assets/portrait.jpg"}
              placeholder={lang === "ru" ? "Перетащи сюда портрет" : "Drop your portrait here"}
              style={{ width: "100%", height: 480, display: "block" }}
            ></image-slot>
            <div className="portrait-badge mono">
              ● {lang === "ru" ? "Открыт для адвайза и спикинга" : "Open to advisory & speaking"}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section data-reveal className="alive-stats">
        {data.stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-v">{s.v}</div>
            <div className="stat-k mono">{lang === "ru" ? s.kRU : s.kEN}</div>
          </div>
        ))}
      </section>

      {/* ACHIEVEMENTS — last 6 months, square cards grid */}
      <NumSection id="achievements" num="01" eyebrow={lang === "ru" ? "Последние 6 месяцев" : "Last 6 months"}
        title={lang === "ru" ? "Что произошло недавно." : "What happened recently."} lang={lang}>
        <div className="ach-squares">
          {data.achievements.filter(a => a.recent).map((a) => {
            const external = /^https?:/.test(a.url);
            const hasVisual = !!a.beforeImg;
            return (
              <a key={a.id} href={a.url} target={external ? "_blank" : undefined}
                 rel={external ? "noopener" : undefined} data-reveal
                 className={"ach-sq tag-" + a.tag.toLowerCase() + (hasVisual ? " ach-sq--visual" : "")}>
                <div className="ach-sq-top">
                  <span className="mono ach-sq-tag">{a.tag}</span>
                  <span className="mono ach-sq-when">{lang === "ru" ? (a.whenRU || a.year) : (a.whenEN || a.year)}</span>
                </div>
                <div className="ach-sq-title" style={hasVisual ? { fontSize: 15, lineHeight: 1.3 } : undefined}>
                  {lang === "ru" ? a.titleRU : a.titleEN}
                </div>
                {hasVisual && (
                  <div className="ach-split-vis">
                    <div className="ach-split-half">
                      <img src={a.beforeImg} alt="before" />
                      <span className="ach-split-lbl mono">BEFORE</span>
                    </div>
                    <div className="ach-split-sep" />
                    <div className="ach-split-half">
                      <img src={a.afterImg || a.beforeImg} alt="after" />
                      <span className="ach-split-lbl mono">AFTER</span>
                    </div>
                  </div>
                )}
                <div className="ach-sq-foot">
                  <span className="mono ach-sq-org">{lang === "ru" ? a.orgRU : a.orgEN}</span>
                  <span className="ach-sq-arrow">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </NumSection>

      {/* COMPANIES — 2x2 grid */}
      <NumSection id="companies" num="02" eyebrow={lang === "ru" ? "Компании" : "Companies"}
        title={lang === "ru" ? "Где я работал и работаю." : "Where I've worked and work."} lang={lang}>
        <div className="co-grid">
          {data.companies.map((c, i) => (
            <MagCard key={c.id} className="co-card" data-reveal as="a" href={c.url} style={{ "--c": c.accent }}>
              <div className="co-card-head">
                <span className="mono co-card-period">{lang === "ru" ? c.periodRU : c.periodEN}</span>
                <span className="mono co-card-num">0{i + 1}</span>
              </div>
              <div className="co-card-brand">
                {c.logo && <img src={(window.__resources && window.__resources[c.logoKey]) || c.logo} alt={c.name + " logo"} className="co-card-logo" />}
                <div className="co-card-name">{c.name}</div>
              </div>
              <div className="mono co-card-role">{lang === "ru" ? c.roleRU : c.roleEN}</div>
              <div className="mono co-card-kind">{lang === "ru" ? c.kindRU : c.kindEN}</div>
              <p className="co-card-tag">{lang === "ru" ? c.taglineRU : c.taglineEN}</p>
              <ul className="co-card-key">
                {(lang === "ru" ? c.keyRU : c.keyEN).slice(0, 3).map((k, j) => (
                  <li key={j}><span className="co-card-bullet" />{k}</li>
                ))}
              </ul>
              <div className="co-card-foot mono">
                <span>{lang === "ru" ? "Открыть страницу" : "Open page"}</span>
                <span className="co-card-arrow">→</span>
              </div>
            </MagCard>
          ))}
        </div>
      </NumSection>

      {/* INDEPENDENT — own consumer apps in parallel */}
      <NumSection id="independent" num="03" eyebrow={lang === "ru" ? "Свои продукты" : "Independent"}
        title={lang === "ru" ? "Что я строю в фоне, сам." : "What I build in parallel, solo."} lang={lang}>
        <div className="ind-grid">
          {data.independent.map((p) => (
            <MagCard key={p.id} className="ind-card" data-reveal as="a" href={p.url}>
              <image-slot id={`ind-${p.id}`} shape="rounded" radius="12"
                placeholder={lang === "ru" ? "Скрин аппа" : "App screen"}
                style={{ width: "100%", height: 240, display: "block" }} />
              <div className="ind-meta">
                <div className="ind-status mono">
                  <span className="pulse-sm" /> {p.status.toUpperCase()} · {lang === "ru" ? p.kindRU : p.kindEN}
                </div>
                <div className="ind-name">{p.name}</div>
                <p className="ind-tag">{lang === "ru" ? p.taglineRU : p.taglineEN}</p>
                <div className="ind-foot">
                  <span className="mono">{lang === "ru" ? "Подробнее" : "More"}</span>
                  <span className="ind-arrow">→</span>
                </div>
              </div>
            </MagCard>
          ))}
        </div>
      </NumSection>

      {/* CAREER — compact timeline */}
      <NumSection id="career" num="04" eyebrow={lang === "ru" ? "Карьера" : "Career"}
        title={lang === "ru" ? "20 лет, восемь ролей." : "20 years, eight roles."} lang={lang}>
        <div className="career-tl">
          <div className="career-spine" />
          {data.career.slice().reverse().map((e, i) => (
            <div key={i} data-reveal className="career-row">
              <div className="career-period mono">{e.period}</div>
              <div className="career-dot" />
              <div className="career-body">
                <div className="career-role">{e.role}</div>
                <div className="career-org">{e.org}</div>
                <div className="career-note">{lang === "ru" ? e.noteRU : e.noteEN}</div>
              </div>
            </div>
          ))}
        </div>
      </NumSection>

      {/* COMMUNITIES & LEARNING */}
      <NumSection id="communities" num="05" eyebrow={lang === "ru" ? "Сообщества и обучение" : "Communities & learning"}
        title={lang === "ru" ? "С кем учусь и где состою." : "Where I learn and belong."} lang={lang}>
        <div className="cl-wrap">
          <div data-reveal className="cl-block">
            <div className="mono cl-label">{lang === "ru" ? "СООБЩЕСТВА" : "COMMUNITIES"}</div>
            <div className="cl-comm">
              {data.communities.map((c) => (
                <div key={c.id} className="cl-comm-card">
                  <div className="cl-comm-name">{c.name}</div>
                  <div className="mono cl-comm-role">{lang === "ru" ? c.roleRU : c.roleEN}</div>
                  <p className="cl-comm-note">{lang === "ru" ? c.noteRU : c.noteEN}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="cl-block">
            <div className="mono cl-label">{lang === "ru" ? "СЕРТИФИКАЦИИ И КУРСЫ" : "CERTS & COURSES"}</div>
            <div className="cl-certs">
              {data.learning.certs.map((c, i) => {
                const Tag = c.url ? "a" : "div";
                const props = c.url ? { href: c.url, target: "_blank", rel: "noopener" } : {};
                return (
                  <Tag key={i} className={"cl-cert-row" + (c.url ? " is-link" : "")} {...props}>
                    <span className="cl-cert-name">{c.name}{c.url && <span className="cl-cert-arrow"> →</span>}</span>
                    <span className="mono cl-cert-kind">{lang === "ru" ? c.kindRU : c.kindEN}</span>
                  </Tag>
                );
              })}
            </div>
          </div>

          <div data-reveal className="cl-block cl-mentor">
            <div className="mono cl-label">{lang === "ru" ? "МЕНТОРИНГ" : "MENTORING"}</div>
            <p className="cl-mentor-text">
              {lang === "ru" ? data.learning.mentoringRU : data.learning.mentoringEN}
            </p>
          </div>
        </div>
      </NumSection>

      {/* CONTACT */}
      <NumSection id="contact" num="06" eyebrow={lang === "ru" ? "Контакт" : "Contact"}
        title={lang === "ru" ? "Поговорим." : "Let's talk."} lang={lang} last>
        <div data-reveal className="contact-card">
          <div>
            <div className="contact-h">
              {lang === "ru" ? "Продукты, GTM, AI, или просто привет." : "Products, GTM, AI — or just say hi."}
            </div>
            <div className="contact-sub">
              {lang === "ru" ? "Отвечаю в течение суток." : "Reply within 24h."}
            </div>
            <div className="contact-links">
              {Object.entries(data.links).filter(([k]) => k !== "email").map(([k, v]) => (
                <a key={k} href={v} target="_blank" className="mono">{k}</a>
              ))}
            </div>
          </div>
          <a href={data.links.email} className="btn-primary big">hi@imakarov.us →</a>
        </div>
      </NumSection>

      <footer className="alive-foot mono">
        <span>© 2026 Ilya Makarov</span>
        <span>{lang === "ru" ? "Сделано вручную · Vibe-coded" : "Built by hand · Vibe-coded"}</span>
      </footer>

      <TweaksPanel title={lang === "ru" ? "Tweaks" : "Tweaks"}>
        <TweakSection label={lang === "ru" ? "Палитра" : "Palette"} />
        <TweakSelect
          label={lang === "ru" ? "Цветовая схема" : "Color scheme"}
          value={t.palette}
          options={Object.keys(PALETTES).map(k => ({ value: k, label: PALETTES[k].label }))}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakToggle
          label={lang === "ru" ? "Кубики на фоне" : "Background cubes"}
          value={t.cubes}
          onChange={(v) => setTweak("cubes", v)}
        />
      </TweaksPanel>
    </div>
  );
};

// ── components ─────────────────────────────────────────────────────────

const NumSection = ({ id, num, eyebrow, title, children, lang, last }) => (
  <section id={id} className={"alive-section" + (last ? " last" : "")}>
    <div data-reveal className="sec-head">
      <span className="mono sec-num">{num} / {eyebrow.toUpperCase()}</span>
      <h2 className="sec-h">{title}</h2>
    </div>
    <div className="sec-body">{children}</div>
  </section>
);

const MagCard = ({ children, className = "", as: As = "div", style = {}, ...rest }) => {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", (x * 100 + 50).toFixed(1) + "%");
    el.style.setProperty("--my", (y * 100 + 50).toFixed(1) + "%");
    el.style.setProperty("--rx", (-y * 3).toFixed(2) + "deg");
    el.style.setProperty("--ry", (x * 3).toFixed(2) + "deg");
  };
  const reset = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <As ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={"mag-card " + className} style={style} {...rest}>
      <div className="mag-glow" />
      <div className="mag-inner">{children}</div>
    </As>
  );
};

const AuroraBg = ({ cubes = true }) => (
  <>
    <div className="aurora" aria-hidden>
      <div className="aurora-blob a" />
      <div className="aurora-blob b" />
      <div className="aurora-blob c" />
    </div>
    {cubes && (
      <svg className="cubes-bg" aria-hidden viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cubeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--cube-g1, #7C9BFF)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--cube-g2, #D77CFF)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <g className="cubes-group">
          <rect x="120" y="120" width="64" height="64" rx="12" fill="url(#cubeGrad)" opacity="0.45"/>
          <rect x="240" y="60" width="40" height="40" rx="8" fill="url(#cubeGrad)" opacity="0.35"/>
          <rect x="1380" y="180" width="80" height="80" rx="14" fill="url(#cubeGrad)" opacity="0.4"/>
          <rect x="1480" y="100" width="44" height="44" rx="9" fill="url(#cubeGrad)" opacity="0.3"/>
          <rect x="80" y="640" width="56" height="56" rx="11" fill="url(#cubeGrad)" opacity="0.4"/>
          <rect x="200" y="740" width="36" height="36" rx="7" fill="url(#cubeGrad)" opacity="0.28"/>
          <rect x="1320" y="700" width="72" height="72" rx="13" fill="url(#cubeGrad)" opacity="0.35"/>
          <rect x="1440" y="780" width="32" height="32" rx="6" fill="url(#cubeGrad)" opacity="0.25"/>
          <rect x="700" y="40" width="28" height="28" rx="5" fill="url(#cubeGrad)" opacity="0.22"/>
          <rect x="900" y="820" width="48" height="48" rx="10" fill="url(#cubeGrad)" opacity="0.3"/>
        </g>
      </svg>
    )}
  </>
);

const Grain = () => <div className="grain" aria-hidden />;

const Ticker = ({ lang }) => {
  const items = lang === "ru" ? [
    "● Сейчас: эдвайз в Smart Ranking",
    "▲ Шипаю v2 SwipeScan",
    "◆ CGO в Co.Actor — AI-контент в LinkedIn",
    "★ 1CLue Puzzles — daily streak",
    "▶ Telegram канал — обновления каждую неделю",
    "■ SLP · Rev Guild",
  ] : [
    "● Now: advising Smart Ranking",
    "▲ Shipping SwipeScan v2",
    "◆ CGO at Co.Actor — AI content for LinkedIn",
    "★ 1CLue Puzzles — daily streak live",
    "▶ Telegram channel updates weekly",
    "■ Communities: SLP · Rev Guild",
  ];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...items, ...items].map((s, i) => (
          <span key={i} className="ticker-item mono">{s}</span>
        ))}
      </div>
    </div>
  );
};

const AliveStyles = () => (
  <style>{`
    .alive-root { width:100%; min-height:100%; background:#070708; color:#EDEDED;
      font-family: var(--font-sans); position:relative; overflow:hidden;
      --accent: oklch(0.74 0.17 260); --accent2: oklch(0.78 0.18 320); }
    [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.2,.7,.3,1),transform .8s cubic-bezier(.2,.7,.3,1)}
    [data-reveal].rv-in{opacity:1;transform:none}

    .cubes-bg{position:fixed;inset:0;z-index:1;width:100%;height:100%;pointer-events:none;opacity:.7}
    .cubes-group rect{transform-origin:center;animation:cubeFloat 14s ease-in-out infinite}
    .cubes-group rect:nth-child(2n){animation-duration:18s;animation-delay:-3s}
    .cubes-group rect:nth-child(3n){animation-duration:22s;animation-delay:-6s}
    .cubes-group rect:nth-child(5n){animation-duration:16s;animation-delay:-9s}
    @keyframes cubeFloat{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(8px,-12px) rotate(6deg)}}

    .aurora{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
    .aurora-blob{position:absolute;width:680px;height:680px;border-radius:50%;filter:blur(120px);opacity:.28;mix-blend-mode:screen}
    .aurora-blob.a{top:-220px;left:-160px;background:var(--accent);animation:auroraA 22s ease-in-out infinite}
    .aurora-blob.b{top:200px;right:-220px;background:var(--accent2);animation:auroraB 28s ease-in-out infinite}
    .aurora-blob.c{bottom:-260px;left:30%;background:oklch(0.7 0.18 180);animation:auroraC 32s ease-in-out infinite;opacity:.18}
    @keyframes auroraA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(140px,80px) scale(1.15)}}
    @keyframes auroraB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-100px,120px) scale(1.1)}}
    @keyframes auroraC{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,-80px) scale(1.2)}}

    .grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' seed='3'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>");
    }

    .alive-nav{position:sticky;top:0;z-index:20;height:60px;padding:0 40px;
      background:rgba(7,7,8,0.55);backdrop-filter:blur(18px);
      border-bottom:1px solid rgba(255,255,255,0.06);
      display:flex;align-items:center;gap:24px}
    .alive-mark{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;letter-spacing:-.01em}
    .alive-mark-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px var(--accent)}
    .alive-nav-links{margin-left:auto;display:flex;gap:22px;font-size:13px;color:#B4B4B4}
    .alive-nav-links a{transition:color .15s}
    .alive-nav-links a:hover{color:var(--accent)}
    .alive-lang{display:flex;border:1px solid rgba(255,255,255,0.1);border-radius:6px;overflow:hidden;font-family:var(--font-mono);font-size:11px}
    .alive-lang button{padding:6px 10px;background:transparent;border:none;color:#7A7A7A;cursor:pointer;letter-spacing:.05em}
    .alive-lang button.on{background:var(--accent);color:#070708}

    .ticker{position:relative;z-index:5;height:34px;border-bottom:1px solid rgba(255,255,255,0.06);overflow:hidden;background:rgba(255,255,255,0.02)}
    .ticker-track{display:flex;gap:48px;white-space:nowrap;animation:tick 50s linear infinite;height:100%;align-items:center;padding:0 24px}
    .ticker-item{font-size:11px;color:#7A7A7A;letter-spacing:.04em}
    @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

    .alive-hero{position:relative;z-index:5;padding:96px 40px 64px;max-width:1240px;margin:0 auto}
    .hero-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:center}
    .hero-pill{display:inline-flex;align-items:center;gap:10px;padding:6px 14px 6px 10px;border-radius:999px;
      background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
      font-size:12px;color:#B4B4B4;margin-bottom:32px}
    .pulse{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 var(--accent);animation:pulse 2s infinite}
    .pulse-sm{width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 var(--accent);animation:pulse 2s infinite;display:inline-block;margin-right:6px}
    @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(120,140,255,.6)}70%{box-shadow:0 0 0 10px rgba(120,140,255,0)}100%{box-shadow:0 0 0 0 rgba(120,140,255,0)}}

    .hero-h{margin:0;font-size:96px;line-height:.98;font-weight:500;letter-spacing:-.045em;text-wrap:balance}
    .hero-h em{font-style:italic;font-weight:400;color:var(--accent);font-family:"Instrument Serif",serif;font-size:1.08em;letter-spacing:-.02em}
    .hero-grad{background:linear-gradient(120deg,var(--accent) 0%,var(--accent2) 100%);
      -webkit-background-clip:text;background-clip:text;color:transparent}
    .hero-sub{font-size:19px;line-height:1.55;color:#B4B4B4;max-width:560px;margin:32px 0 0;text-wrap:pretty}
    .hero-cta{display:flex;gap:12px;margin-top:36px;flex-wrap:wrap}

    .btn-primary{padding:12px 22px;border-radius:8px;background:var(--accent);color:#070708;
      font-size:14px;font-weight:500;transition:transform .15s, box-shadow .15s}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(120,140,255,.35)}
    .btn-primary.big{padding:18px 30px;font-size:15px;white-space:nowrap}
    .btn-ghost{padding:12px 22px;border-radius:8px;border:1px solid rgba(255,255,255,0.14);
      font-size:14px;font-weight:500;color:#EDEDED;transition:border-color .15s,background .15s}
    .btn-ghost:hover{border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.04)}

    .hero-portrait{position:relative}
    .portrait-badge{position:absolute;left:16px;bottom:16px;padding:8px 12px;border-radius:8px;
      background:rgba(7,7,8,0.7);backdrop-filter:blur(8px);font-size:11px;color:var(--accent);
      border:1px solid rgba(120,140,255,.3)}

    .alive-stats{position:relative;z-index:5;max-width:1240px;margin:0 auto;padding:48px 40px;
      display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid rgba(255,255,255,0.06);
      border-bottom:1px solid rgba(255,255,255,0.06)}
    .stat{padding:24px 24px;border-right:1px solid rgba(255,255,255,0.06)}
    .stat:last-child{border-right:none}
    .stat-v{font-size:40px;font-weight:500;letter-spacing:-.03em;background:linear-gradient(120deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent}
    .stat-k{font-size:11px;color:#7A7A7A;margin-top:4px;letter-spacing:.05em}

    .alive-section{position:relative;z-index:5;padding:96px 40px;max-width:1240px;margin:0 auto;
      border-top:1px solid rgba(255,255,255,0.06)}
    .alive-section.last{border-bottom:none}
    .sec-head{display:grid;grid-template-columns:140px 1fr;gap:32px;align-items:start;margin-bottom:48px}
    .sec-num{font-size:11px;color:#525252;padding-top:14px;letter-spacing:.05em}
    .sec-h{margin:0;font-size:44px;font-weight:500;letter-spacing:-.03em;line-height:1.08;max-width:760px}

    /* Achievements — square cards, last 6 months only */
    .ach-squares{margin-left:172px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .ach-sq{aspect-ratio:1/1;padding:22px;border-radius:14px;display:flex;flex-direction:column;justify-content:space-between;
      background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);
      transition:border-color .25s,background .25s,transform .25s;color:#EDEDED;position:relative;overflow:hidden}
    .ach-sq::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
      background:radial-gradient(circle at 0% 0%,var(--tag-c,transparent) 0%,transparent 55%);opacity:.18;transition:opacity .25s}
    .ach-sq:hover{border-color:var(--tag-c);transform:translateY(-3px);background:rgba(255,255,255,0.04)}
    .ach-sq:hover::before{opacity:.35}
    .ach-sq.tag-launch{--tag-c:oklch(0.78 0.16 145)}
    .ach-sq.tag-role{--tag-c:oklch(0.74 0.17 260)}
    .ach-sq.tag-talk,.ach-sq.tag-deck,.ach-sq.tag-workshop{--tag-c:oklch(0.78 0.18 320)}
    .ach-sq.tag-milestone{--tag-c:oklch(0.78 0.16 50)}
    .ach-sq.tag-redesign{--tag-c:oklch(0.78 0.16 55)}
    .ach-sq.tag-shipped{--tag-c:oklch(0.74 0.17 260)}
    .ach-sq.tag-system{--tag-c:oklch(0.72 0.16 160)}
    .ach-split-vis{display:flex;border-radius:8px;overflow:hidden;flex:1;margin:10px 0;border:1px solid rgba(255,255,255,0.08);min-height:0;position:relative}
    .ach-split-half{flex:1;overflow:hidden;position:relative}
    .ach-split-half img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
    .ach-split-sep{width:2px;background:rgba(255,255,255,0.08);flex-shrink:0;position:relative;overflow:hidden}
    .ach-split-sep::after{content:"";position:absolute;inset:0;background:var(--tag-c);animation:sep-glow 2s ease-in-out infinite alternate;opacity:0.3}
    @keyframes sep-glow{0%{opacity:0.15;transform:scaleY(0.2)}100%{opacity:0.9;transform:scaleY(1)}}
    .ach-split-lbl{position:absolute;bottom:4px;left:4px;font-size:9px;letter-spacing:.08em;color:rgba(255,255,255,0.45);background:rgba(0,0,0,0.65);padding:2px 5px;border-radius:3px}
    .ach-sq--visual{animation:vis-glow 2.5s ease-in-out infinite alternate}
    @keyframes vis-glow{0%{box-shadow:0 0 0 0 transparent}100%{box-shadow:0 0 18px 0 color-mix(in srgb,var(--tag-c) 35%,transparent)}}
    .ach-sq-top{display:flex;justify-content:space-between;align-items:baseline;position:relative}
    .ach-sq-tag{font-size:10px;letter-spacing:.08em;padding:4px 8px;border-radius:4px;border:1px solid var(--tag-c);color:var(--tag-c)}
    .ach-sq-when{font-size:11px;color:#7A7A7A;letter-spacing:.04em}
    .ach-sq-title{font-size:18px;font-weight:500;line-height:1.32;letter-spacing:-.015em;text-wrap:pretty;position:relative}
    .ach-sq-foot{display:flex;justify-content:space-between;align-items:baseline;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);position:relative}
    .ach-sq-org{font-size:11px;color:#7A7A7A;letter-spacing:.04em}
    .ach-sq-arrow{color:#7A7A7A;transition:color .2s,transform .2s}
    .ach-sq:hover .ach-sq-arrow{color:var(--tag-c);transform:translateX(4px)}

    /* Companies grid 2x2 */
    .co-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-left:172px}
    .co-card{display:block;padding:32px;background:rgba(255,255,255,0.02);
      border:1px solid rgba(255,255,255,0.07);border-radius:14px;cursor:pointer;
      --c: var(--accent);transition:border-color .25s, background .25s, transform .25s}
    .co-card .mag-glow{background:radial-gradient(circle at var(--mx,50%) var(--my,50%),color-mix(in oklch,var(--c) 22%,transparent),transparent 50%)}
    .co-card:hover{border-color:var(--c)}
    .co-card-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px}
    .co-card-period{font-size:11px;color:var(--c);letter-spacing:.05em}
    .co-card-num{font-size:11px;color:#525252}
    .co-card-brand{display:flex;align-items:center;gap:14px}
    .co-card-logo{height:40px;width:auto;max-width:120px;object-fit:contain;border-radius:6px;background:#fff;padding:6px}
    .co-card-name{font-size:36px;font-weight:500;letter-spacing:-.03em;line-height:1.05}
    .co-card-role{font-size:13px;color:#B4B4B4;margin-top:8px}
    .co-card-kind{font-size:11px;color:#7A7A7A;margin-top:4px;letter-spacing:.05em}
    .co-card-tag{font-size:14px;line-height:1.55;color:#D4D4D4;margin:18px 0 0;text-wrap:pretty}
    .co-card-key{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:7px}
    .co-card-key li{font-size:13px;color:#B4B4B4;display:flex;align-items:center;gap:10px}
    .co-card-bullet{width:5px;height:5px;border-radius:50%;background:var(--c);flex-shrink:0}
    .co-card-foot{margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.07);
      display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#7A7A7A}
    .co-card-arrow{color:var(--c);transition:transform .2s}
    .co-card:hover .co-card-arrow{transform:translateX(4px)}

    /* Independent products */
    .ind-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-left:172px}
    .ind-card{display:block;cursor:pointer;overflow:hidden;padding:0;background:rgba(255,255,255,0.02);
      border:1px solid rgba(255,255,255,0.07);border-radius:14px;transition:border-color .25s}
    .ind-card:hover{border-color:rgba(120,140,255,.4)}
    .ind-card image-slot{display:block;border-bottom:1px solid rgba(255,255,255,0.07)}
    .ind-meta{padding:24px}
    .ind-status{font-size:11px;color:#7A7A7A;letter-spacing:.04em}
    .ind-name{font-size:24px;font-weight:500;letter-spacing:-.02em;margin-top:14px}
    .ind-tag{font-size:14px;color:#B4B4B4;line-height:1.55;margin:10px 0 0}
    .ind-foot{margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.07);
      display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#7A7A7A}
    .ind-arrow{color:var(--accent);transition:transform .2s}
    .ind-card:hover .ind-arrow{transform:translateX(4px)}

    /* Career timeline */
    .career-tl{position:relative;margin-left:172px;padding-left:32px}
    .career-spine{position:absolute;left:108px;top:8px;bottom:8px;width:1px;background:linear-gradient(180deg,rgba(120,140,255,.5),rgba(255,255,255,0.05))}
    .career-row{display:grid;grid-template-columns:120px 24px 1fr;gap:8px;padding:18px 0;align-items:start}
    .career-period{font-size:12px;color:#7A7A7A;padding-top:4px}
    .career-dot{width:10px;height:10px;border-radius:50%;background:var(--accent);margin:6px 0 0 -3px;
      box-shadow:0 0 0 4px rgba(120,140,255,.15);transition:box-shadow .2s,transform .2s}
    .career-row:hover .career-dot{transform:scale(1.3);box-shadow:0 0 0 8px rgba(120,140,255,.2)}
    .career-role{font-size:16px;font-weight:500}
    .career-org{font-size:13px;color:var(--accent);margin-top:2px;font-family:var(--font-mono)}
    .career-note{font-size:13px;color:#B4B4B4;line-height:1.55;margin-top:6px;max-width:600px}

    /* Communities & Learning */
    .cl-wrap{margin-left:172px;display:grid;grid-template-columns:1fr 1fr;gap:24px}
    .cl-block{padding:28px;border:1px solid rgba(255,255,255,0.07);border-radius:14px;background:rgba(255,255,255,0.02)}
    .cl-block.cl-mentor{grid-column:1/-1}
    .cl-label{font-size:11px;color:#525252;letter-spacing:.08em;margin-bottom:18px}
    .cl-comm{display:grid;gap:14px}
    .cl-comm-card{padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.05)}
    .cl-comm-card:last-child{border-bottom:none;padding-bottom:0}
    .cl-comm-name{font-size:20px;font-weight:500;letter-spacing:-.02em}
    .cl-comm-role{font-size:11px;color:var(--accent);margin-top:2px;letter-spacing:.05em}
    .cl-comm-note{font-size:13px;color:#B4B4B4;line-height:1.55;margin:10px 0 0}
    .cl-certs{display:grid;gap:12px}
    .cl-cert-row{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.05);transition:color .15s}
    .cl-cert-row.is-link{cursor:pointer}
    .cl-cert-row.is-link:hover{color:var(--accent)}
    .cl-cert-arrow{color:var(--accent);opacity:.65}
    .cl-cert-row:last-child{border-bottom:none;padding-bottom:0}
    .cl-cert-name{font-size:15px}
    .cl-cert-kind{font-size:11px;color:#7A7A7A;letter-spacing:.05em}
    .cl-mentor-text{font-size:18px;line-height:1.55;color:#D4D4D4;margin:0;text-wrap:pretty;max-width:680px}

    /* Contact */
    .contact-card{margin-left:172px;padding:48px;border-radius:16px;
      background:linear-gradient(135deg,rgba(120,140,255,.12),rgba(220,120,255,.06) 60%,transparent 100%),rgba(15,15,17,0.6);
      border:1px solid rgba(120,140,255,.3);
      display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;backdrop-filter:blur(8px)}
    .contact-h{font-size:30px;font-weight:500;letter-spacing:-.02em;line-height:1.2;text-wrap:pretty}
    .contact-sub{font-size:14px;color:#B4B4B4;margin-top:8px}
    .contact-links{display:flex;gap:18px;margin-top:20px;font-size:12px;color:#B4B4B4;text-transform:capitalize;flex-wrap:wrap}
    .contact-links a:hover{color:var(--accent)}

    .alive-foot{position:relative;z-index:5;padding:32px 40px;max-width:1240px;margin:0 auto;
      border-top:1px solid rgba(255,255,255,0.06);
      display:flex;justify-content:space-between;font-size:11px;color:#525252}

    .mag-card{position:relative;
      transform:perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
      transition:transform .25s cubic-bezier(.2,.7,.3,1),border-color .2s,background .2s}
    .mag-glow{position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(120,140,255,.18),transparent 50%);
      opacity:0;transition:opacity .2s}
    .mag-card:hover .mag-glow{opacity:1}
    .mag-inner{position:relative;height:100%}

    @media (max-width:980px){
      .hero-grid{grid-template-columns:1fr;gap:40px}
      .hero-h{font-size:64px}
      .alive-stats{grid-template-columns:repeat(2,1fr)}
      .stat{border-bottom:1px solid rgba(255,255,255,0.06)}
      .sec-head{grid-template-columns:1fr;gap:8px}
      .ach-list,.co-grid,.ind-grid,.career-tl,.cl-wrap,.contact-card{margin-left:0}
      .co-grid,.ind-grid,.cl-wrap{grid-template-columns:1fr}
      .ach-row{grid-template-columns:60px 1fr;gap:6px 12px}
      .ach-row .ach-tag{grid-column:1}
      .ach-row .ach-year{grid-column:2;text-align:left}
      .ach-row .ach-title{grid-column:1/-1}
      .ach-row .ach-org{grid-column:1/-1;text-align:left}
      .ach-row .ach-arrow{display:none}
      .ach-squares{grid-template-columns:1fr;margin-left:0}
      .alive-nav-links{display:none}
      .contact-card{grid-template-columns:1fr}
    }
  `}</style>
);

window.ALIVE = ALIVE;
