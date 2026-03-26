// ============================================================
//  pages/public/PublicHome.jsx
// ============================================================

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Données projets ───────────────────────────────────────────
const PROJETS = [
  {
    id: 1,
    titre: "FuturProof",
    auteur: "par Bastien Lecarpentier",
    date: "02/04/2026",
    categorie: "Réalité Virtuelle",
    cardBg: "#c8f000",
    imgBg: "#3b82f6",
    // Illustration téléphone sur fond bleu
    IlluComponent: () => (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", display:"flex", alignItems:"center", justifyContent:"center", borderRadius: 8 }}>
        <div style={{ width: 44, height: 88, background: "#fff", borderRadius: 8, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,0,0,.3)" }}>
          <div style={{ width: 38, height: 70, background: "#1e293b", borderRadius: 6, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 4 }}>
            <div style={{ width: 20, height: 12, background: "#c8f000", borderRadius: 2, opacity:.8 }} />
            <div style={{ width: 20, height: 2, background: "rgba(255,255,255,.4)", borderRadius: 1 }} />
            <div style={{ width: 20, height: 2, background: "rgba(255,255,255,.4)", borderRadius: 1 }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", border:"2px solid rgba(255,255,255,.5)", marginTop: 4 }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    titre: "MANY",
    auteur: "par Elise Vazquez",
    date: "02/04/2026",
    categorie: "Webdesign",
    cardBg: "#c8f000",
    // Illustration magazine sombre avec portrait
    IlluComponent: () => (
      <div style={{ width: "100%", height: "100%", background: "#e8e3dc", display:"flex", alignItems:"center", justifyContent:"center", borderRadius: 8, overflow:"hidden", position:"relative" }}>
        {/* Page de magazine */}
        <div style={{ width: "72%", height: "88%", background: "#fff", borderRadius: 4, boxShadow:"0 2px 12px rgba(0,0,0,.15)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* En-tête mag */}
          <div style={{ background: "#1a1a2e", padding: "6px 10px" }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", fontFamily:"'Syne',sans-serif", letterSpacing: 2 }}>MANY THINGS</div>
          </div>
          {/* Portrait */}
          <div style={{ flex: 1, background: "linear-gradient(180deg,#c4a882,#8b6e52)", position:"relative", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
            {/* Silhouette */}
            <div style={{ width: 32, height: 50, background: "#2d1a0e", borderRadius:"40% 40% 0 0", marginBottom: 0 }} />
            <div style={{ position:"absolute", top: 12, left:"50%", transform:"translateX(-50%)", width: 22, height: 22, background: "#c4a882", borderRadius:"50%", border:"2px solid rgba(0,0,0,.2)" }} />
          </div>
        </div>
        {/* Téléphone superposé */}
        <div style={{ position:"absolute", right: "12%", top: "15%", width: 28, height: 54, background: "#1a1a2e", borderRadius: 6, boxShadow:"0 4px 16px rgba(0,0,0,.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width: 22, height: 44, background: "#c4a882", borderRadius: 4, opacity:.6 }} />
        </div>
      </div>
    ),
  },
  {
    id: 3,
    titre: "Premia",
    auteur: "par Dounia Amrani",
    date: "02/04/2026",
    categorie: "Graphisme",
    cardBg: "#f0ebe3",
    // Illustration fond sombre avec icône trophée/lettre A
    IlluComponent: () => (
      <div style={{ width: "100%", height: "100%", background: "#1a1a2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius: 8, position:"relative", overflow:"hidden" }}>
        {/* Lettre stylisée */}
        <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", fontFamily:"'Syne',sans-serif", lineHeight: 1, opacity: .9 }}>A</div>
        {/* Lignes déco */}
        <div style={{ position:"absolute", bottom: 16, left: 16, right: 16 }}>
          <div style={{ height: 1, background: "rgba(255,255,255,.15)", marginBottom: 6 }} />
          <div style={{ fontSize: 7, color: "rgba(255,255,255,.4)", letterSpacing: 1 }}>PREMIA DESIGN STUDIO</div>
        </div>
        <div style={{ position:"absolute", top: 12, right: 12, width: 20, height: 20, borderRadius: "50%", border:"1.5px solid rgba(255,255,255,.2)" }} />
      </div>
    ),
  },
]

const FAQ_ITEMS = [
  "Quel est le taux d'insertion professionnelle des diplômés ?",
  "La formation est-elle reconnue par l'État ?",
  "Est-il possible de faire un stage à l'international ?",
]

// ── Accordéon ─────────────────────────────────────────────────
function FaqItem({ q }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 12,
        background: "none", border: "none", cursor: "pointer",
        padding: "16px 0", textAlign: "left",
        fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#fff",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#c8f000", fontSize: 14, flexShrink: 0 }}>⚡</span>
          {q}
        </span>
        <span style={{
          width: 24, height: 24, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "#fff", flexShrink: 0,
          lineHeight: 1,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform .2s",
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", paddingBottom: 14, paddingLeft: 24, lineHeight: 1.7 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cette information sera disponible bientôt.
        </p>
      )}
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function PublicHome() {
  const navigate = useNavigate()
  const width    = useWindowWidth()
  const isMobile = width < BP.mobile    // < 480
  const isTablet = width < BP.tablet    // < 768

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { min-height: 100%; }
        body { font-family: 'DM Sans', sans-serif; }
        button { font-family: 'DM Sans', sans-serif; cursor: pointer; }
      `}</style>

      {/* ════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════ */}
      <header style={{
        background: "#7c3aed",
        padding: isMobile ? "16px 20px" : "18px 40px",
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative", overflow: "hidden",
        minHeight: isMobile ? 90 : 120,
      }}>
        {/* Bouton Se connecter — haut gauche */}
        <button onClick={() => navigate("/login")} style={{
          background: "#c8f000", color: "#221A47",
          border: "none", borderRadius: 8,
          padding: isMobile ? "8px 14px" : "9px 18px",
          fontSize: isMobile ? 12 : 13, fontWeight: 700,
          zIndex: 2, flexShrink: 0,
          transition: "transform .15s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}
        >
          Se connecter
        </button>

        {/* Logo — centre */}
        <div style={{
          position: "absolute", left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center", zIndex: 2,
          top: isMobile ? 12 : 16,
        }}>
          <div style={{ fontFamily: "'Syne',sans-serif", color: "#fff", lineHeight: 1.1 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", gap: 2 }}>
              {/* Grande lettre M stylisée */}
              <span style={{ fontSize: isMobile ? 36 : 48, fontWeight: 900, lineHeight: 1, color: "#fff" }}>
                <span style={{ color: "#fff" }}>M</span>
              </span>
              <div style={{ textAlign: "left", paddingTop: 4 }}>
                <div style={{ fontSize: isMobile ? 10 : 13, fontWeight: 700, lineHeight: 1.2 }}>
                  <span style={{ fontStyle: "italic" }}>y</span><br />
                  Multimedia<br />
                  Interface
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Déco droite : cercle sombre + forme jaune */}
        {!isMobile && (
          <div style={{ position: "relative", width: 120, height: 100, zIndex: 1, flexShrink: 0 }}>
            {/* Grand cercle sombre */}
            <div style={{
              position: "absolute", right: -30, top: -30,
              width: 130, height: 130, borderRadius: "50%",
              background: "#221A47",
            }} />
            {/* Demi-lune jaune par-dessus */}
            <div style={{
              position: "absolute", right: 44, top: -20,
              width: 56, height: 80,
              background: "#c8f000",
              borderRadius: "0 0 50px 50px",
            }} />
            {/* Petit point jaune */}
            <div style={{
              position: "absolute", right: 18, top: 78,
              width: 14, height: 14, borderRadius: "50%",
              background: "#c8f000",
            }} />
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════
          HERO — citation + titre
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: "#7c3aed",
        padding: isMobile ? "32px 24px 48px" : "36px 60px 64px",
        textAlign: "center",
      }}>
        <h1 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: isMobile ? 24 : isTablet ? 30 : 36,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.3,
          maxWidth: 520,
          margin: "0 auto",
          // Guillemets décoratifs comme sur la maquette
        }}>
          <span style={{ color: "#c8f000", fontSize: isMobile ? 28 : 40, fontWeight: 900, lineHeight: 0, verticalAlign: "middle", marginRight: 4 }}>"</span>
          Découvrez les projets des étudiants en BUT Métiers du Multimédia et de l'Internet.
        </h1>
      </section>

      {/* ════════════════════════════════════════════════════
          PROJETS RÉCENTS
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: "#7c3aed",
        padding: isMobile ? "0 20px 60px" : "0 40px 80px",
      }}>
        <h2 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: isMobile ? 17 : 20, fontWeight: 800,
          color: "#fff", marginBottom: isMobile ? 20 : 28,
        }}>
          Les projets récents
        </h2>

        {/* Grille 3 cartes — staggered sur desktop */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 20,
          alignItems: "flex-start",
        }}>
          {PROJETS.map((p, i) => {
            // Décalage vertical pour l'effet staggered de la maquette
            const offsetTop = isMobile ? 0 : i === 0 ? 0 : i === 1 ? 28 : 52
            const { IlluComponent } = p
            return (
              <div key={p.id} style={{
                flex: isMobile ? "none" : 1,
                width: isMobile ? "100%" : "auto",
                marginTop: offsetTop,
                background: p.cardBg,
                borderRadius: 14,
                padding: 14,
                cursor: "pointer",
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 4px 20px rgba(0,0,0,.15)",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)"
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.25)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.15)"
                }}
                onClick={() => navigate(`/public/projets/${p.id}`)}
              >
                {/* Badge catégorie */}
                <div style={{
                  display: "inline-block",
                  background: "#221A47", color: "#fff",
                  fontSize: 9, fontWeight: 700,
                  padding: "4px 9px", borderRadius: 4,
                  marginBottom: 10, letterSpacing: .4,
                }}>
                  {p.categorie}
                </div>

                {/* Illustration */}
                <div style={{ height: isMobile ? 180 : 170, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
                  <IlluComponent />
                </div>

                {/* Titre gras */}
                <div style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 16, fontWeight: 900,
                  color: "#221A47", marginBottom: 3,
                }}>
                  {p.titre}
                </div>
                <div style={{ fontSize: 11, color: "#444", marginBottom: 2 }}>{p.auteur}</div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 14 }}>{p.date}</div>

                {/* Bouton Voir + */}
                <button style={{
                  background: "#221A47", color: "#fff",
                  border: "none", borderRadius: 6,
                  padding: "7px 18px", fontSize: 12, fontWeight: 600,
                }}>
                  Voir +
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA — "Voir tous les projets"
          Fond violet foncé + cartes fantômes
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: "#5b21b6",
        padding: isMobile ? "60px 20px" : "80px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: isMobile ? 200 : 260,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Cartes fantômes éparpillées — visibles sur desktop */}
        {!isMobile && [
          { l: "2%",  t: "5%",   w: 80,  h: 110, r: "-14deg" },
          { l: "8%",  t: "40%",  w: 65,  h: 90,  r: "10deg"  },
          { l: "16%", t: "-5%",  w: 72,  h: 100, r: "-6deg"  },
          { l: "24%", t: "30%",  w: 58,  h: 80,  r: "4deg"   },
          { r: "3%",  t: "8%",   w: 80,  h: 110, r2: "12deg" },
          { r: "10%", t: "42%",  w: 65,  h: 88,  r2: "-9deg" },
          { r: "18%", t: "-8%",  w: 72,  h: 100, r2: "5deg"  },
          { r: "26%", t: "28%",  w: 58,  h: 78,  r2: "-4deg" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            left: s.l, right: s.r,
            top: s.t,
            width: s.w, height: s.h,
            background: "rgba(255,255,255,.06)",
            borderRadius: 10,
            transform: `rotate(${s.r || s.r2})`,
            backdropFilter: "blur(2px)",
          }}>
            {/* Mini-image fantôme */}
            <div style={{ width: "100%", height: "60%", background: "rgba(255,255,255,.05)", borderRadius: "8px 8px 0 0" }} />
          </div>
        ))}

        {/* Bouton central */}
        <button onClick={() => navigate("/public/projets")} style={{
          position: "relative", zIndex: 2,
          background: "#c8f000", color: "#221A47",
          border: "none", borderRadius: 30,
          padding: isMobile ? "14px 36px" : "16px 52px",
          fontSize: isMobile ? 15 : 17, fontWeight: 800,
          fontFamily: "'Syne',sans-serif",
          boxShadow: "0 4px 20px rgba(0,0,0,.2)",
          transition: "transform .15s, box-shadow .15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.3)" }}
          onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.2)" }}
        >
          Voir tous les projets
        </button>
      </section>

      {/* ════════════════════════════════════════════════════
          MMI — "Mais MMI c'est quoi en fait ?"
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: "#7c3aed",
        padding: isMobile ? "60px 20px" : "80px 60px",
      }}>
        <h2 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: isMobile ? 22 : 30, fontWeight: 900,
          color: "#fff", textAlign: "center",
          marginBottom: isMobile ? 28 : 40,
        }}>
          Mais MMI, c'est quoi en fait ?
        </h2>

        {/* Grande carte blanche */}
        <div style={{
          background: "#fff", borderRadius: 16,
          padding: isMobile ? 20 : 28,
          maxWidth: 720, margin: "0 auto 20px",
          display: "flex", flexWrap: "wrap",
          gap: 24, alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo MMI stylisé */}
          <div style={{ minWidth: 110 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, color: "#7c3aed", lineHeight: 1.25 }}>
              {[
                { letter: "M", word: "étiers" },
                { letter: "M", word: "ultimedia" },
                { letter: "I", word: "nternet" },
              ].map(({ letter, word }) => (
                <div key={word} style={{ fontSize: 13, display: "flex", alignItems: "baseline", gap: 1 }}>
                  <span style={{ fontSize: 18 }}>{letter}</span>
                  <span style={{ color: "#2d2d4e", fontWeight: 700 }}>{word}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge "Un diplôme sur 3 ans" */}
          <div style={{
            background: "#221A47", color: "#c8f000",
            borderRadius: 12, padding: "14px 20px",
            fontFamily: "'Syne',sans-serif", fontWeight: 900,
            textAlign: "center", lineHeight: 1.3,
          }}>
            <span style={{ fontSize: isMobile ? 13 : 15 }}>Un diplôme sur</span>{" "}
            <span style={{ fontSize: isMobile ? 42 : 52, lineHeight: 1, display: "block" }}>3</span>
            <span style={{ fontSize: isMobile ? 13 : 15 }}>ans</span>
          </div>

          {/* Camembert SVG 60/40 */}
          <div>
            <svg width={isMobile ? 100 : 120} height={isMobile ? 100 : 120} viewBox="0 0 36 36">
              {/* 60% jaune (pratiques) */}
              <circle cx="18" cy="18" r="15.9" fill="none"
                stroke="#c8f000" strokeWidth="3.8"
                strokeDasharray="60 40"
                strokeDashoffset="25"
                transform="rotate(-90 18 18)"
              />
              {/* 40% sombre (théoriques) */}
              <circle cx="18" cy="18" r="15.9" fill="none"
                stroke="#221A47" strokeWidth="3.8"
                strokeDasharray="40 60"
                strokeDashoffset="-35"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5, marginTop: 6 }}>
              <div><span style={{ color: "#7c3aed", fontWeight: 700 }}>60% de cours</span> pratiques</div>
              <div><span style={{ color: "#221A47", fontWeight: 700 }}>40% de cours</span> théoriques</div>
            </div>
          </div>

          {/* Spécialités */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ background: "#f0edf8", borderRadius: 8, padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#221A47", textAlign: "center" }}>
              Une spécialité<br />Création Numérique
            </div>
            <span style={{ fontSize: 12, color: "#888" }}>ou</span>
            <div style={{ background: "#f0edf8", borderRadius: 8, padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#221A47", textAlign: "center" }}>
              Une spécialité<br />Développement Web
            </div>
          </div>
        </div>

        {/* Deux mini-cartes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16, maxWidth: 720, margin: "0 auto",
        }}>
          {/* Carte 1 — Formation pro */}
          <div style={{
            background: "#fff", borderRadius: 14,
            padding: isMobile ? 20 : 24, textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800, fontSize: 16, color: "#221A47",
              marginBottom: 18, lineHeight: 1.3,
            }}>
              Une formation<br />professionnalisante
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <div style={{ background: "#f0edf8", borderRadius: 8, padding: "10px 20px", fontSize: 12, fontWeight: 700, color: "#7c3aed" }}>STAGE</div>
              <div style={{ background: "#c8f000", borderRadius: 8, padding: "10px 20px", fontSize: 12, fontWeight: 700, color: "#221A47" }}>ALTERNANCE</div>
            </div>
          </div>

          {/* Carte 2 — Opportunités */}
          <div style={{
            background: "#fff", borderRadius: 14,
            padding: isMobile ? 20 : 24,
          }}>
            <div style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800, fontSize: 16, color: "#221A47",
              marginBottom: 18, lineHeight: 1.3,
            }}>
              Des opportunités rêvées
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Miniatures drapeaux */}
              <div style={{ display:"flex", gap: 4, marginRight: 4 }}>
                {["🇫🇷","🇨🇦","🇯🇵"].map(f => (
                  <span key={f} style={{ fontSize: 18 }}>{f}</span>
                ))}
              </div>
              <div style={{
                flex: 1, background: "#c8f000",
                borderRadius: 8, padding: "10px 12px",
                fontSize: 12, fontWeight: 700,
                color: "#221A47", textAlign: "center",
              }}>
                Semestres à l'étranger
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ — fond sombre
      ════════════════════════════════════════════════════ */}
      <section style={{
        background: "#0f0a1e",
        padding: isMobile ? "50px 20px 60px" : "70px 60px 80px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
          gap: isMobile ? 40 : 60,
          maxWidth: 900, margin: "0 auto",
          alignItems: "start",
        }}>

          {/* "FAQ" énorme — gauche */}
          <div>
            <h2 style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: isMobile ? 72 : 110, fontWeight: 900,
              color: "#fff", lineHeight: 0.9,
              letterSpacing: -4,
            }}>
              FAQ
            </h2>
          </div>

          {/* Droite : accordéon + zone question */}
          <div>
            {/* Questions */}
            <div style={{ marginBottom: 24 }}>
              {FAQ_ITEMS.map((q, i) => <FaqItem key={i} q={q} />)}
            </div>

            {/* Zone "Une question ?" */}
            <div style={{
              background: "#c8f000",
              borderRadius: 14,
              padding: "18px 18px 54px",
              position: "relative",
            }}>
              <div style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800, fontSize: 14,
                color: "#221A47", marginBottom: 12,
              }}>
                Une question ? ....
              </div>
              <textarea
                placeholder="Écris ta question ici…"
                rows={4}
                style={{
                  width: "100%", border: "none",
                  background: "rgba(34,26,71,.08)",
                  borderRadius: 8, padding: "10px 12px",
                  fontSize: 13, fontFamily: "'DM Sans',sans-serif",
                  resize: "none", outline: "none",
                  color: "#221A47",
                  "::placeholder": { color: "rgba(34,26,71,.4)" },
                }}
              />
              {/* Icône lien externe bas-droite */}
              <button style={{
                position: "absolute", bottom: 14, right: 14,
                width: 30, height: 30, borderRadius: 6,
                background: "rgba(34,26,71,.15)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#221A47", fontSize: 14, fontWeight: 700,
              }}>↗</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}