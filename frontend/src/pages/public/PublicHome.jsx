// ============================================================
//  pages/public/PublicHome.jsx — Page d'accueil publique
// ============================================================

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

const VIOLET = "#7B00FF"
const JAUNE  = "#DBFF00"
const DARK   = "#0F0720"
const WHITE  = "#FFFFFF"

const PROJETS = [
  { id: 1, titre: "FuturProof", auteur: "Bastian Lecarpentier", date: "02/04/2026", categorie: "Réalité Virtuelle", badgeBg: "#DBFF00", badgeColor: "#0F0720", imageBg: "linear-gradient(160deg,#1a1035,#3a1080)", emoji: "📱" },
  { id: 2, titre: "MANY",       auteur: "Elise Vazquez",        date: "02/04/2026", categorie: "Webdesign",         badgeBg: "#0F0720", badgeColor: "#FFFFFF", imageBg: "linear-gradient(160deg,#111,#2a2a3e)",  emoji: "🖼️" },
  { id: 3, titre: "Premia",     auteur: "Dounia Amrani",        date: "02/04/2026", categorie: "Graphisme",         badgeBg: "#0F0720", badgeColor: "#FFFFFF", imageBg: "linear-gradient(160deg,#0a0a12,#1a1a2a)", emoji: "🎨" },
]

const FAQ_ITEMS = [
  "Quel est le taux d'insertion professionnelle des diplômés ?",
  "La formation est-elle reconnue par l'État ?",
  "Est-il possible de faire un stage à l'international ?",
]

function ProjetCard({ projet, offsetTop }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        width: 195, flexShrink: 0, marginTop: offsetTop,
        boxShadow: hover ? "0 24px 60px rgba(0,0,0,.4)" : "0 8px 24px rgba(0,0,0,.25)",
        transform: hover ? "translateY(-8px)" : "none",
        transition: "all .22s ease", cursor: "pointer",
      }}
    >
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", top: 10, left: 10, zIndex: 2,
          background: projet.badgeBg, color: projet.badgeColor,
          borderRadius: 6, padding: "3px 10px",
          fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
        }}>
          {projet.categorie}
        </span>
        <div style={{
          height: 175, background: projet.imageBg,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44,
        }}>
          {projet.emoji}
        </div>
      </div>
      <div style={{ padding: "14px 14px 18px" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 900, color: "#0F0720", marginBottom: 3 }}>{projet.titre}</div>
        <div style={{ fontSize: 11, color: "#444", marginBottom: 2 }}>par {projet.auteur}</div>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 14 }}>{projet.date}</div>
        <button style={{ background: "#0F0720", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Voir +
        </button>
      </div>
    </div>
  )
}

function FaqRow({ question }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,.1)", padding: "18px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#7B00FF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 9, color: "#fff", fontWeight: 900 }}>M</span>
          </span>
          <span style={{ fontSize: 14, color: "#fff", lineHeight: 1.4 }}>{question}</span>
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 20, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none", transition: "transform .2s",
        }}>+</span>
      </button>
      {open && (
        <div style={{ paddingLeft: 30, paddingTop: 10, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>
          Toutes les informations sont disponibles sur notre site ou contactez-nous directement.
        </div>
      )}
    </div>
  )
}

export default function PublicHome() {
  const navigate = useNavigate()
  const width    = useWindowWidth()
  const isMobile = width < BP.mobile
  const isTablet = width < BP.tablet

  // Remplacer par useAuth() quand AuthContext sera prêt
  // Pour tester : mets connecte = true et role = "teacher" ou "student"
  const connecte = false
  const role     = "student"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body { font-family: 'DM Sans', sans-serif; }
        button { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div>

        {/* ══ HERO ══ */}
        <div style={{ background: "#7B00FF", position: "relative", overflow: "hidden", paddingBottom: 48 }}>
          {/* Déco cercle sombre */}
          <div style={{ position: "absolute", top: -50, right: -60, width: 260, height: 260, background: "#0F0720", borderRadius: "50%", zIndex: 0 }} />
          {/* Déco cercle jaune */}
          <div style={{ position: "absolute", top: 14, right: 14, width: 100, height: 100, background: "#DBFF00", borderRadius: "50%", zIndex: 1 }} />

          {/* Nav */}
          <div style={{
            position: "relative", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: isMobile ? "20px 18px" : "26px 48px",
          }}>
            {/* Bouton Se connecter / Mon espace */}
            <button
              onClick={() => connecte ? navigate(role === "teacher" ? "/teacher/dashboard" : "/student/dashboard") : navigate("/login")}
              style={{
                background: "#DBFF00", color: "#0F0720",
                border: "none", borderRadius: 30, padding: "10px 24px",
                fontWeight: 800, fontSize: 13, cursor: "pointer",
                fontFamily: "'Syne',sans-serif",
                transition: "opacity .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {connecte ? "Mon espace →" : "Se connecter"}
            </button>

            {/* Logo centré */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.2, color: "#fff" }}>
                <span style={{ display: "block", fontSize: isMobile ? 28 : 36, color: "#DBFF00", lineHeight: 1 }}>M</span>
                <span style={{ fontSize: isMobile ? 11 : 13 }}>y<br />Multimedia<br />Interface</span>
              </div>
            </div>

            <div style={{ width: 130 }} />
          </div>

          {/* Titre */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: isMobile ? "36px 24px 20px" : "52px 90px 24px" }}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: isMobile ? 24 : isTablet ? 30 : 38,
              color: "#fff", lineHeight: 1.25, maxWidth: 520, margin: "0 auto",
            }}>
              Découvrez les projets des étudiants en BUT Métiers du Multimédia et de l'Internet.
            </h1>
          </div>
        </div>

        {/* ══ PROJETS RÉCENTS ══ */}
        <div style={{ background: "#7B00FF", padding: isMobile ? "16px 18px 48px" : "16px 48px 64px" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: isMobile ? 20 : 24, color: "#fff", marginBottom: 28 }}>
            Les projets récents
          </h2>
          <div style={{ display: "flex", gap: isMobile ? 14 : 28, alignItems: "flex-start", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 16 : 0 }}>
            <ProjetCard projet={PROJETS[0]} offsetTop={0} />
            <ProjetCard projet={PROJETS[1]} offsetTop={isMobile ? 0 : 44} />
            <ProjetCard projet={PROJETS[2]} offsetTop={isMobile ? 0 : 88} />
          </div>
        </div>

        {/* ══ BOUTON VOIR TOUS ══ */}
        <div style={{ background: "#7B00FF", position: "relative", overflow: "hidden", padding: isMobile ? "48px 18px" : "72px 48px", textAlign: "center" }}>
          {/* Cartes fantômes déco */}
          {[
            { t: "8%",  l: "1%",   rot: "-14deg", w: 110, h: 150 },
            { t: "5%",  l: "18%",  rot: "6deg",   w: 90,  h: 130 },
            { t: "2%",  r: "3%",   rot: "12deg",  w: 120, h: 160 },
            { t: "45%", r: "1%",   rot: "-9deg",  w: 100, h: 140 },
            { t: "48%", l: "4%",   rot: "18deg",  w: 80,  h: 120 },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute", top: s.t, left: s.l, right: s.r,
              width: s.w, height: s.h,
              background: `rgba(255,255,255,${0.06 + i * 0.015})`,
              borderRadius: 10, transform: `rotate(${s.rot})`,
              filter: "blur(1.5px)", pointerEvents: "none",
            }} />
          ))}
          <button
            onClick={() => navigate("/public/projets")}
            style={{
              position: "relative", zIndex: 2,
              background: "#DBFF00", color: "#0F0720",
              border: "none", borderRadius: 50,
              padding: isMobile ? "14px 36px" : "18px 60px",
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: isMobile ? 16 : 22, cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,.22)",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(0,0,0,.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.22)"; }}
          >
            Voir tous les projets
          </button>
        </div>

        {/* ══ MMI C'EST QUOI ══ */}
        <div style={{ background: "#7B00FF", padding: isMobile ? "40px 18px 56px" : "56px 48px 72px" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: isMobile ? 22 : 30, color: "#fff", textAlign: "center", marginBottom: 32 }}>
            Mais MMI, c'est quoi en fait ?
          </h2>

          {/* Grande carte */}
          <div style={{ background: "#fff", borderRadius: 20, padding: isMobile ? 20 : 28, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
              {/* Logo MMI */}
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, lineHeight: 1.35, fontSize: 13, color: "#0F0720", minWidth: 90 }}>
                <span style={{ fontSize: 26, color: "#7B00FF" }}>M</span>étiers<br />
                <span style={{ color: "#7B00FF" }}>M</span>ultimédia<br />
                <span style={{ color: "#7B00FF" }}>I</span>nternet
              </div>

              {/* Diplôme */}
              <div style={{ background: "#DBFF00", borderRadius: 10, padding: "10px 20px", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "#0F0720", whiteSpace: "nowrap" }}>
                Un diplôme sur <span style={{ fontSize: 32, verticalAlign: "middle" }}>3</span> ans
              </div>

              {/* Camembert */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <svg viewBox="0 0 36 36" width="76" height="76" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
                  <circle cx="18" cy="18" r="15.9" fill="#eee" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7B00FF" strokeWidth="7.2" strokeDasharray="60 40" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#DBFF00" strokeWidth="7.2" strokeDasharray="40 60" strokeDashoffset="-60" />
                </svg>
                <div style={{ fontSize: 11, lineHeight: 2, color: "#0F0720" }}>
                  <div><span style={{ color: "#7B00FF", fontWeight: 800 }}>●</span> 60% de cours pratiques</div>
                  <div><span style={{ color: "#aaaa00", fontWeight: 800 }}>●</span> 40% de cours théoriques</div>
                </div>
              </div>
            </div>

            {/* Spécialités */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ background: "#f0ebff", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#0F0720" }}>
                Une spécialité<br />Création Numérique
              </div>
              <span style={{ fontSize: 13, color: "#555" }}>ou</span>
              <div style={{ background: "#f0ebff", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#0F0720" }}>
                Une spécialité<br />Développement Web
              </div>
            </div>
          </div>

          {/* 2 petites cartes */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: isMobile ? 20 : 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#0F0720", marginBottom: 18, lineHeight: 1.3 }}>
                Une formation<br />professionnalisante
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {["STAGE", "ALTERNANCE"].map(l => (
                  <div key={l} style={{ background: "#f0ebff", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 12, color: "#0F0720" }}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: isMobile ? 20 : 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#0F0720", marginBottom: 16, lineHeight: 1.3 }}>
                Des opportunités rêvées
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 14, fontSize: 22 }}>
                {["🇫🇷","🇨🇦","🇯🇵","🇩🇪"].map(f => <span key={f}>{f}</span>)}
              </div>
              <div style={{ background: "#DBFF00", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, color: "#0F0720", display: "inline-block" }}>
                Semestres à l'étranger
              </div>
            </div>
          </div>
        </div>

        {/* ══ FAQ ══ */}
        <div style={{ background: "#0F0720", padding: isMobile ? "48px 18px 60px" : "64px 48px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "180px 1fr", gap: isMobile ? 36 : 80, alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: isMobile ? 72 : 110, color: "#fff", lineHeight: 1 }}>
                FAQ
              </div>
            </div>
            <div>
              {FAQ_ITEMS.map((q, i) => <FaqRow key={i} question={q} />)}
              <div style={{ marginTop: 28, background: "#DBFF00", borderRadius: 14, padding: "18px 20px", minHeight: 80, position: "relative" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#0F0720" }}>
                  Une question ? ….
                </div>
                <div style={{
                  position: "absolute", bottom: 12, right: 14,
                  width: 24, height: 24, border: "2px solid rgba(0,0,0,.25)",
                  borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 12, color: "rgba(0,0,0,.4)",
                }}>↗</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}