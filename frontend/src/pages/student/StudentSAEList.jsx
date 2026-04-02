// pages/student/SAEList.jsx
// Branché sur GET /api/student/saes (StudentSAEController::list)


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"


// ── Mapping statut Symfony → etat front ──────────────────────
// Symfony renvoie : "in_progress" | "completed" | "upcoming"  (à adapter selon ton enum)
// Le front attend : "en_cours"   | "termine"   | "a_venir"
function mapStatut(status) {
  return {
    in_progress: "en_cours",
    completed:   "termine",
    upcoming:    "a_venir",
    // si Symfony envoie déjà en français, ces lignes couvrent aussi :
    en_cours:    "en_cours",
    termine:     "termine",
    a_venir:     "a_venir",
  }[status] ?? "a_venir"
}


function EtatBadge({ etat }) {
  const c = {
    en_cours: { label: "En cours", bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",  bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",  bg: "#fef9c3", color: "#854d0e" },
  }[etat] || { label: etat, bg: "#eee", color: "#333" }


  return (
    <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
      {c.label}
    </span>
  )
}


function ProgressBar({ value }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height: 6, overflow: "hidden", marginTop: 8 }}>
      <div style={{ height: "100%", borderRadius: 4, width: `${value ?? 0}%`, background: "linear-gradient(90deg,#7c3aed,#9d5cf5)" }} />
    </div>
  )
}


export default function StudentSAEList() {
  const navigate = useNavigate()
  const [filtre, setFiltre] = useState("tous")


  // ── État de chargement ────────────────────────────────────
  const [saes,    setSaes   ] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState(null)


  // ── Fetch au montage ──────────────────────────────────────
  useEffect(() => {
  const token = localStorage.getItem("token")

  fetch('http://localhost:8000/api/student/sae', {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
      .then(res => {
        if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`)
        return res.json()
      })
      .then(data => {
        // Symfony renvoie : [{ id, title, status, date_fin }, ...]
        // On normalise pour le front
        const normalised = data.map(sae => ({
          id:          sae.id,
          titre:       sae.title,
          etat:        mapStatut(sae.status),
          echeance:    sae.date_fin ?? null,
          // progression n'est pas renvoyée par list() → on met 0 par défaut
          // pour l'avoir : ajoute-la dans le contrôleur ou fetche le détail
          progression: sae.progression ?? 0,
        }))
        setSaes(normalised)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])


  // ── Filtrage local ────────────────────────────────────────
  const filtrees = filtre === "tous" ? saes : saes.filter(s => s.etat === filtre)


  return (
    <PageLayoutStudent title="Mes SAE">


      {/* ── Filtres ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { val: "tous",     label: "Toutes"    },
          { val: "en_cours", label: "En cours"  },
          { val: "termine",  label: "Terminées" },
          { val: "a_venir",  label: "À venir"   },
        ].map(f => (
          <button key={f.val} onClick={() => setFiltre(f.val)} style={{
            padding: "7px 16px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit",
            background: filtre === f.val ? "#7c3aed" : "#fff",
            color:      filtre === f.val ? "#fff"    : "#666",
            border: "1px solid #ddd", fontSize: 13, fontWeight: 500,
            transition: "all .15s",
          }}>
            {f.label}
          </button>
        ))}
      </div>


      {/* ── États de chargement / erreur ── */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 14 }}>Chargement des SAE…</div>
        </div>
      )}


      {error && (
        <div style={{ background: "#fce7e7", borderRadius: 12, padding: 16, color: "#991b1b", fontSize: 13, marginBottom: 16 }}>
          <strong>Erreur de connexion au serveur :</strong> {error}
          <br />
          <span style={{ fontSize: 11, opacity: .7 }}>Vérifie que Symfony est bien lancé et que la route /api/student/sae existe.</span>
        </div>
      )}


      {/* ── Liste des SAE ── */}
      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtrees.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#666" }}>
                {filtre === "tous" ? "Aucune SAE disponible" : "Aucune SAE dans cette catégorie"}
              </div>
            </div>
          ) : (
            filtrees.map(sae => (
              <div
                key={sae.id}
                onClick={() => navigate(`/student/saes/${sae.id}`)}
                style={{
                  background: "#fff", padding: "18px 20px",
                  borderRadius: 14, cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                  border: "1px solid #f0edf8",
                  transition: "transform .15s, box-shadow .15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,.12)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.06)" }}
              >
                {/* Titre */}
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 8 }}>
                  {sae.titre}
                </div>


                {/* Badge + échéance */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <EtatBadge etat={sae.etat} />
                  {sae.echeance && (
                    <span style={{ fontSize: 11, color: "#aaa" }}>
                      Échéance : {new Date(sae.echeance).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>


                {/* Progression */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888" }}>
                  <span>Progression</span>
                  <span style={{ fontWeight: 700, color: "#7c3aed" }}>{sae.progression}%</span>
                </div>
                <ProgressBar value={sae.progression} />
              </div>
            ))
          )}
        </div>
      )}
    </PageLayoutStudent>
  )
}

