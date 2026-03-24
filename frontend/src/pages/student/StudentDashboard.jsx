// ============================================================
//  pages/student/Dashboard.jsx — Tableau de bord étudiant
// ============================================================

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import CircularProgress  from "../../components/common/CircularProgress"
import { MessageRow }    from "../../components/dashboard/DashboardComponents"
import { StatCard }      from "../../components/dashboard/DashboardComponents"
import { Svg, IC }       from "../../components/common/Icons"
import { MESSAGES, PROCHAINS_RENDUS, ANNONCES_STUDENT } from "../../data/mockData"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Carte "Prochaine rendue" ─────────────────────────────────
function RenduCard({ date, delai, sae }) {
  // Couleur du délai selon urgence
  const isUrgent = delai.includes("13") // moins de 15 jours
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "#fff", borderRadius: 12, padding: "12px 16px",
      marginBottom: 10,
      boxShadow: "0 2px 10px rgba(124,58,237,.07)",
    }}>
      {/* Date en badge violet */}
      <div style={{
        background: "#7c3aed", color: "#fff",
        borderRadius: 10, padding: "6px 10px",
        fontFamily: "'Syne',sans-serif", fontWeight: 800,
        fontSize: 14, flexShrink: 0, minWidth: 52, textAlign: "center",
      }}>
        {date}
      </div>
      {/* Délai */}
      <span style={{
        fontSize: 12, fontWeight: 600,
        color: isUrgent ? "#ef4444" : "#888",
        flexShrink: 0,
      }}>
        {delai}
      </span>
      {/* SAE */}
      <span style={{
        fontSize: 13, color: "#aaa", marginLeft: "auto",
        fontWeight: 500,
      }}>
        {sae}
      </span>
    </div>
  )
}

// ── Carte "Nouvelle annonce" ─────────────────────────────────
function AnnonceCard({ count, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#f4f0fb", borderRadius: 18, padding: 24,
      display: "flex", alignItems: "center", gap: 20,
      cursor: "pointer", minHeight: 140,
      transition: "box-shadow .2s, transform .15s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 28px rgba(124,58,237,.2)"; e.currentTarget.style.transform="translateY(-2px)" }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none" }}
    >
      {/* Illustration mégaphone SVG */}
      <div style={{ fontSize: 52, flexShrink: 0, userSelect: "none" }}>📣</div>
      <div>
        <span style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: 26, fontWeight: 900,
          color: "#1a1a2e", lineHeight: 1.2,
          display: "block",
        }}>
          {count} nouvelle{count > 1 ? "s" : ""}<br />annonce{count > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}

// ── Composant principal ──────────────────────────────────────
export default function StudentDashboard() {
  const [expandedMsg, setExpandedMsg] = useState(null)
  const navigate = useNavigate()

  const w        = useWindowWidth()
  const isMobile = w < BP.mobile
  const isTablet = w < BP.tablet

  // Nombre d'annonces non lues
  const annoncesNonLues = ANNONCES_STUDENT.filter(a => !a.lue).length

  return (
    <PageLayoutStudent title="Tableau de bord">
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>

        {/* ── Cartes stats (identiques à la vue enseignant) ── */}
        <div style={{ display: "flex", flexDirection: isTablet ? "column" : "row", gap: 12 }}>
          <StatCard percent={10} label={"Progression moyenne\nsur la SAE 406"} small={isMobile} />
          <StatCard percent={70} label={"Progression moyenne\nsur la SAE 403"} small={isMobile} />
          <StatCard dark small={isMobile} />
        </div>

        {/* ── Grille milieu ── */}
        <div style={{
          display: "grid", gap: 16,
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1.6fr 1fr",
        }}>

          {/* Carte annonce */}
          <AnnonceCard
            count={annoncesNonLues}
            onClick={() => navigate("/student/annonces")}
          />

          {/* Messages */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 2px 18px rgba(0,0,0,.06)" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>
              Messages
            </h2>
            {MESSAGES.map(m => (
              <MessageRow
                key={m.id}
                name={m.name}
                unread={m.unread}
                expanded={expandedMsg === m.id}
                onClick={() => setExpandedMsg(prev => prev === m.id ? null : m.id)}
              />
            ))}
          </div>

          {/* Carte violette vide (comme sur la maquette) */}
          <div style={{
            background: "linear-gradient(160deg,#e8e0fa,#d4c5f5)",
            borderRadius: 18, minHeight: 160,
          }} />
        </div>

        {/* ── Grille bas ── */}
        <div style={{
          display: "grid", gap: 16,
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
        }}>

          {/* Prochains rendus */}
          <div style={{ background: "#ede9fb", borderRadius: 18, padding: 22 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>
              Prochains rendus
            </h2>
            {PROCHAINS_RENDUS.map(r => (
              <RenduCard key={r.id} {...r} />
            ))}
          </div>

          {/* Cercle SAE en cours */}
          <div style={{
            background: "#fff", borderRadius: 18, padding: 22,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 18px rgba(0,0,0,.06)",
            gap: 16,
          }}>
            <CircularProgress value={6} size={isMobile ? 130 : 155} saeMode />
          </div>

          {/* Carte violette vide */}
          <div style={{
            background: "linear-gradient(160deg,#e8e0fa,#d4c5f5)",
            borderRadius: 18, minHeight: 120,
          }} />
        </div>
      </div>
    </PageLayoutStudent>
  )
}