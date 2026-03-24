import { useState } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { SAES_STUDENT } from "../../data/mockData"

function EtatBadge({ etat }) {
  const c = {
    en_cours: { label: "En cours", bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",  bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",  bg: "#fef9c3", color: "#854d0e" },
  }[etat] || { label: etat, bg: "#eee", color: "#333" }

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

export default function StudentSAEList() {
  const [filtre, setFiltre] = useState("tous")

  const filtrees =
    filtre === "tous"
      ? SAES_STUDENT
      : SAES_STUDENT.filter(s => s.etat === filtre)

  return (
    <PageLayoutStudent title="Liste SAE">

      {/* Filtres */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { val: "tous", label: "Toutes" },
          { val: "en_cours", label: "En cours" },
          { val: "termine", label: "Terminées" }
        ].map(f => (
          <button
            key={f.val}
            onClick={() => setFiltre(f.val)}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              cursor: "pointer",
              background: filtre === f.val ? "#7c3aed" : "#fff",
              color: filtre === f.val ? "#fff" : "#666",
              border: "1px solid #ddd"
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div>
        {filtrees.map(sae => (
          <div key={sae.id} style={{
            background: "#fff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 10
          }}>
            <div style={{ fontWeight: "bold" }}>
              {sae.code} — {sae.titre}
            </div>

            <EtatBadge etat={sae.etat} />

            <div>
              Progression : {sae.progression}%
            </div>
          </div>
        ))}
      </div>

    </PageLayoutStudent>
  )
}