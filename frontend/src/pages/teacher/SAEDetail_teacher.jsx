// pages/teacher/SAEList.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"
import { Svg, IC } from "../../components/common/Icons"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Composants ────────────────────────────────────────────────
function EtatBadge({ etat }) {
  const c = {
    en_cours: { label: "En cours", bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",  bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",  bg: "#fef9c3", color: "#854d0e" },
  }[etat] || { label: etat, bg: "#f0edf8", color: "#7c3aed" }

  return (
    <span style={{
      background: c.bg,
      color: c.color,
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600
    }}>
      {c.label}
    </span>
  )
}

function ProgressBar({ value }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height: 6, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          borderRadius: 4,
          width: `${value}%`,
          background: value === 100
            ? "#22c55e"
            : "linear-gradient(90deg,#7c3aed,#9d5cf5)"
        }}
      />
    </div>
  )
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────
export default function SAEList() {
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isMobile = width < BP.mobile

  const [filtre, setFiltre] = useState("tous")
  const [showModal, setShowModal] = useState(false)

  const [saes, setSaes] = useState([])
  const [loading, setLoading] = useState(true)

  // FETCH API
  useEffect(() => {
    fetch("http://localhost:8000/api/prof/sae", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setSaes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Erreur fetch SAE :", err)
        setLoading(false)
      })
  }, [])

  // FILTRE
  const saeFiltrees =
    filtre === "tous"
      ? saes
      : saes.filter(s => s.etat === filtre)

  // LOADING
  if (loading) {
 return (
  <PageLayout title="Liste des SAE">

    {/* FILTRES + BOUTON */}
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 22,
      flexWrap: "wrap",
      gap: 12
    }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { val: "tous",     label: "Toutes"    },
          { val: "en_cours", label: "En cours"  },
          { val: "termine",  label: "Terminées" },
          { val: "a_venir",  label: "À venir"   },
        ].map(f => (
          <button
            key={f.val}
            onClick={() => setFiltre(f.val)}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 500,
              background: filtre === f.val ? "#7c3aed" : "#fff",
              color:      filtre === f.val ? "#fff"    : "#666",
              border:     filtre === f.val ? "none"    : "1px solid #e0daf5",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 18px",
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit"
        }}
      >
        <Svg d={IC.plus} size={16} color="#fff" />
        Nouvelle SAE
      </button>
    </div>

    {/* LISTE */}
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fill,minmax(290px,1fr))",
      gap: 18
    }}>
      {saeFiltrees.map(sae => (
        <div
          key={sae.id}
          onClick={() => navigate(`/teacher/saes/${sae.id}`)}
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 16px rgba(0,0,0,.06)",
            cursor: "pointer",
            transition: "transform .15s, box-shadow .15s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform="translateY(-3px)"
            e.currentTarget.style.boxShadow="0 8px 28px rgba(124,58,237,.14)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform="none"
            e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,.06)"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12
          }}>
            <div>
              <div style={{
                fontSize: 10,
                color: "#9d5cf5",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: .5,
                marginBottom: 4
              }}>
                {sae.code} · {sae.semestre}
              </div>

              <div style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.3
              }}>
                {sae.titre}
              </div>
            </div>

            <EtatBadge etat={sae.etat} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
              fontSize: 12
            }}>
              <span style={{ color: "#888" }}>Progression</span>
              <span style={{ fontWeight: 700, color: "#7c3aed" }}>
                {sae.progression}%
              </span>
            </div>

            <ProgressBar value={sae.progression} />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "#aaa"
          }}>
            <span>
              {sae.groupes} groupe{sae.groupes > 1 ? "s" : ""}
            </span>

            <span>
              Échéance : {new Date(sae.echeance).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* EMPTY STATE */}
    {saeFiltrees.length === 0 && (
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#aaa"
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
        <div style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#666"
        }}>
          Aucune SAE dans cette catégorie
        </div>
      </div>
    )}

    {/* ✅ MODAL */}
    {showModal && (
      <CreationModal onClose={() => setShowModal(false)} />
    )}

  </PageLayout>
)
  }}