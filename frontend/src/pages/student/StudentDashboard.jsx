// ============================================================
//  pages/student/StudentDashboard.jsx
// ============================================================

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import CircularProgress from "../../components/common/CircularProgress"
import { MessageRow, StatCard } from "../../components/dashboard/DashboardComponents"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Carte "Prochaine rendue" ─────────────────────────
function RenduCard({ date, delai, sae }) {
  const days = parseInt(delai.replace(/\D/g, ""))
  const isUrgent = days <= 15

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "#fff", borderRadius: 12, padding: "12px 16px",
      marginBottom: 10,
      boxShadow: "0 2px 10px rgba(124,58,237,.07)",
    }}>
      <div style={{
        background: "#7c3aed", color: "#fff",
        borderRadius: 10, padding: "6px 10px",
        fontWeight: 800, fontSize: 14,
        minWidth: 52, textAlign: "center",
      }}>
        {date}
      </div>

      <span style={{
        fontSize: 12, fontWeight: 600,
        color: isUrgent ? "#ef4444" : "#888",
      }}>
        {delai}
      </span>

      <span style={{
        fontSize: 13, color: "#aaa",
        marginLeft: "auto",
      }}>
        {sae}
      </span>
    </div>
  )
}

// ── Carte annonce ─────────────────────────
function AnnonceCard({ count, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#f4f0fb",
      borderRadius: 18,
      padding: 24,
      display: "flex",
      alignItems: "center",
      gap: 20,
      cursor: "pointer",
    }}>
      <div style={{ fontSize: 52 }}>📣</div>

      <div>
        <span style={{
          fontSize: 26,
          fontWeight: 900,
          color: "#1a1a2e",
        }}>
          {count} nouvelle{count > 1 ? "s" : ""}<br />
          annonce{count > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}

// ── COMPONENT PRINCIPAL ─────────────────────────
export default function StudentDashboard() {
  const navigate = useNavigate()

  const [expandedMsg] = useState(null)
  const [messages, setMessages] = useState([])
  const [progression, setProgression] = useState(0)
  const [progressionsSAE, setProgressionsSAE] = useState([]) // ✅ FIX IMPORTANT
  const [notifications, setNotifications] = useState(0)
  const [prochainsRendus, setProchainsRendus] = useState([])
const [semestreProgression, setSemestreProgression] = useState(0)
  const w = useWindowWidth()
  const isMobile = w < BP.mobile
  const isTablet = w < BP.tablet

  // FETCH DASHBOARD
  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch("http://localhost:8000/api/student/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur")
        return res.json()
      })
      .then(data => {
        console.log("DASHBOARD DATA :", data)

        setMessages(data.messages || [])
        setProgression(data.progression || 0)
        setProgressionsSAE(data.progressions_sae || []) // ✅ FIX
        setNotifications(data.notifications || 0)
        setSemestreProgression(data.semestre_progression || 0) // ✅ AJOUT

      
        const formatted = (data.prochains_rendus || []).map((r, i) => {
          const dateObj = new Date(r.date)
          const today = new Date()
          const diff = Math.ceil((dateObj - today) / (1000 * 60 * 60 * 24))

          return {
            id: i,
            date: dateObj.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
            delai: `dans ${diff} jours`,
            sae: r.title
          }
        })

        setProchainsRendus(formatted)
      })
      .catch(err => {
        console.error("Erreur dashboard:", err)
      })
  }, [])

  return (
    <PageLayoutStudent title="Tableau de bord">
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>

        {/* STATS */}
        <div style={{ display: "flex", flexDirection: isTablet ? "column" : "row", gap: 12 }}>
          <StatCard
            percent={progressionsSAE?.[0]?.progression || 0}
            label={progressionsSAE?.[0]?.code || "SAE"}
          />

          <StatCard
            percent={progressionsSAE?.[1]?.progression || 0}
            label={progressionsSAE?.[1]?.code || "SAE"}
          />

          <StatCard dark value={notifications} />
        </div>

        {/* GRID TOP */}
        <div style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1.6fr 1fr",
        }}>

          <AnnonceCard
            count={notifications}
            onClick={() => navigate("/student/annonces")}
          />

          {/* MESSAGES */}
          <div style={{
            background: "#fff",
            borderRadius: 18,
            padding: 20,
            boxShadow: "0 2px 18px rgba(0,0,0,.06)"
          }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 12 }}>
              Messages récents
            </h2>

            {messages.length === 0 ? (
              <div style={{ color: "#aaa", fontSize: 13 }}>
                Aucun message
              </div>
            ) : (
              messages.map(m => (
                <MessageRow
                  key={m.id}
                  name={m.name}
                  unread={m.unread}
                  expanded={expandedMsg === m.id}
                  onClick={() => navigate("/student/messages")}
                />
              ))
            )}

            <div style={{ marginTop: 10, textAlign: "right" }}>
              <button
                onClick={() => navigate("/student/messages")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#7c3aed",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Voir tous les messages →
              </button>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(160deg,#e8e0fa,#d4c5f5)",
            borderRadius: 18,
            minHeight: 160
          }} />
        </div>

        {/* GRID BOTTOM */}
        <div style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
        }}>

          <div style={{ background: "#ede9fb", borderRadius: 18, padding: 22 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 16 }}>
              Prochains rendus
            </h2>

            {prochainsRendus.map(r => (
              <RenduCard key={r.id} {...r} />
            ))}
          </div>

          <div style={{
            background: "#fff",
            borderRadius: 18,
            padding: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CircularProgress value={semestreProgression} size={140} saeMode />
          </div>

          <div style={{
            background: "linear-gradient(160deg,#e8e0fa,#d4c5f5)",
            borderRadius: 18
          }} />
        </div>

      </div>
    </PageLayoutStudent>
  )
}