// ============================================================
//  pages/public/ProjetDetail.jsx
//  Page de détail d'un projet — Route : /public/projets/:id
//
//  COMMENT ÇA MARCHE :
//  1. React Router lit l'`:id` dans l'URL (ex: /public/projets/3)
//  2. On cherche le projet dans PROJETS (le tableau dans projets.js)
//  3. On affiche ses données — titre, couleurs, photos, description
//  4. La structure HTML est toujours la même, seul le contenu change
//
//  Plus tard avec une vraie BDD :
//  Remplace la ligne `const projet = PROJETS.find(...)`
//  par : const projet = await fetch(`/api/projets/${id}`)
// ============================================================

import { useParams, useNavigate } from "react-router-dom"

import { PROJETS } from "../../../data/mockData.js";

import { PROJETS, CATEGORIES } from "../../../data/mockData";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; }

  @keyframes titleIn {
    from { opacity: 0; transform: translateY(50px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes phoneIn {
    from { opacity: 0; transform: translateY(40px) scale(.96); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }

  .detail-title { animation: titleIn .7s cubic-bezier(.16,1,.3,1) both; }
  .detail-phone { animation: phoneIn .9s cubic-bezier(.16,1,.3,1) .15s both; }

  .gallery-item {
    overflow: hidden;
    transition: transform .3s ease;
  }
  .gallery-item:hover { transform: scale(1.03); z-index: 2; }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
`

// ── Header fixe ───────────────────────────────────────────────
function Header() {
  const navigate = useNavigate()
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 24px",
      background: "rgba(255,255,255,.93)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,.07)",
    }}>
      {/* Logo — remplace par <img src="/assets/logo-mmi.png" /> */}
      <div onClick={() => navigate("/public")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 32, color: "#7c3aed", lineHeight: 1 }}>M</span>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, color: "#221A47", lineHeight: 1.3 }}>
          <em style={{ fontStyle: "italic" }}>y</em><br/>Multimedia<br/>Interface
        </div>
      </div>
      {/* Avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Syne',sans-serif", fontWeight: 900, color: "#fff", fontSize: 15,
        boxShadow: "0 4px 12px rgba(124,58,237,.3)", cursor: "pointer",
      }}>S</div>
    </header>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: "#7c3aed", padding: "20px 24px",
      textAlign: "center", fontSize: 13, color: "rgba(255,255,255,.8)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
      <span>©</span> Tous droits réservés My Multimedia Interface
    </footer>
  )
}

// ══════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════
export default function ProjetDetail() {
  const { id } = useParams()        // lit l'id dans l'URL
  const navigate = useNavigate()

  // ── On cherche le projet par son id ──────────────────────
  // C'est la seule ligne à changer quand tu auras une vraie API
  const projet = PROJETS.find(p => p.id === id)

  // ── Projet introuvable ou masqué ─────────────────────────
  if (!projet || !projet.visible) {
    return (
      <>
        <style>{STYLE}</style>
        <Header />
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 16, background: "#f5f4f8", paddingTop: 80,
        }}>
          <div style={{ fontSize: 56 }}>🔍</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 24, color: "#221A47" }}>
            Projet introuvable
          </h2>
          <p style={{ color: "#888", fontSize: 14 }}>Ce projet n'existe pas ou n'est plus disponible.</p>
          <button onClick={() => navigate("/public/projets")} style={{
            marginTop: 8, padding: "12px 28px", borderRadius: 30,
            background: "#7c3aed", color: "#fff", border: "none",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>← Retour aux projets</button>
        </div>
        <Footer />
      </>
    )
  }

  const { titre, auteur, couleurFond, couleurTexte, photoMain, photosSecond, description, pdf } = projet

  return (
    <>
      <style>{STYLE}</style>
      <Header />

      {/* ══════════════════════
          HERO — fond coloré + titre + photo principale
      ══════════════════════ */}
      <section style={{
        background: couleurFond,
        paddingTop: 72,         // compense le header fixe
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Titre énorme */}
        <h1 className="detail-title" style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(48px, 13vw, 130px)",
          color: couleurTexte,
          textAlign: "center",
          lineHeight: 0.9,
          letterSpacing: "-2px",
          padding: "44px 24px 0",
          width: "100%",
        }}>
          {titre}
        </h1>

        {/* Auteur — aligné à droite */}
        <p style={{
          color: couleurTexte, opacity: .85,
          fontSize: "clamp(13px, 2vw, 18px)",
          alignSelf: "flex-end",
          paddingRight: "clamp(20px, 7vw, 90px)",
          marginTop: 10,
        }}>
          {auteur}
        </p>

        {/* Photo principale portrait */}
        <div className="detail-phone" style={{
          marginTop: 32,
          width: "clamp(200px, 40vw, 360px)",
        }}>
          <img
            src={photoMain}
            alt={titre}
            style={{
              width: "100%",
              aspectRatio: "9/18",
              objectFit: "cover",
              borderRadius: 32,
              boxShadow: "0 40px 80px rgba(0,0,0,.3)",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════
          GALERIE — 4 photos secondaires côte à côte pleine largeur
      ══════════════════════ */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}>
        {(photosSecond || []).map((src, i) => (
          <div key={i} className="gallery-item">
            <img
              src={src}
              alt={`${titre} photo ${i + 1}`}
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        ))}
      </section>

      {/* ══════════════════════
          DESCRIPTION — paragraphe de texte
      ══════════════════════ */}
      <section style={{
        background: "#fff",
        padding: "clamp(48px, 8vw, 96px) clamp(20px, 10vw, 120px)",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          lineHeight: 1.8,
          color: "#333",
          maxWidth: 720,
        }}>
          {description}
        </p>

        {/* Bouton PDF si présent */}
        {pdf && (
          <a href={pdf} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginTop: 36, padding: "13px 28px",
            background: couleurFond, color: couleurTexte,
            borderRadius: 30, fontSize: 14, fontWeight: 700,
            textDecoration: "none", fontFamily: "'Syne',sans-serif",
            boxShadow: `0 6px 20px ${couleurFond}66`,
          }}>
            📄 Voir le livrable PDF
          </a>
        )}
      </section>

      <Footer />
    </>
  )
}