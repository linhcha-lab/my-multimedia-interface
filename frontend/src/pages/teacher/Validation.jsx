// ============================================================
//  pages/teacher/Validation.jsx — Validation des publications
// ============================================================

import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { Svg, IC } from "../../components/common/Icons";
import { VALIDATIONS } from "../../data/mockData";

export default function Validation() {
  const [items, setItems] = useState(VALIDATIONS);

  const valider  = (id) => setItems(prev => prev.map(v => v.id === id ? { ...v, statut: "valide"  } : v));
  const refuser  = (id) => setItems(prev => prev.map(v => v.id === id ? { ...v, statut: "refuse"  } : v));

  const StatutBadge = ({ statut }) => {
    const c = {
      en_attente: { label: "En attente", bg: "#fef9c3", color: "#854d0e" },
      valide:     { label: "Validé",     bg: "#dcfce7", color: "#166534" },
      refuse:     { label: "Refusé",     bg: "#fce7e7", color: "#991b1b" },
    }[statut];
    return <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{c.label}</span>;
  };

  const enAttente = items.filter(v => v.statut === "en_attente").length;

  return (
    <PageLayout title="Validation des publications">
      {/* Compteur */}
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", borderRadius: 14, padding: "16px 22px", marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 32, fontWeight: 900, color: "#c8f000", fontFamily: "'Payton  One',sans-serif" }}>{enAttente}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.9)" }}>rendu{enAttente > 1 ? "s" : ""} en attente de validation</span>
      </div>

      {/* Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(v => (
          <div key={v.id} style={{
            background: "#fff", borderRadius: 16, padding: 18,
            boxShadow: "0 2px 12px rgba(0,0,0,.06)",
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            {/* Icône fichier */}
            <div style={{ width: 42, height: 42, borderRadius: 10, background: "#f4f0fb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg d={IC.file} size={20} color="#7c3aed" />
            </div>
            {/* Infos */}
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 3 }}>{v.etudiant}</div>
              <div style={{ fontSize: 11, color: "#9d5cf5", fontWeight: 600, marginBottom: 2 }}>{v.sae}</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>{v.fichier} · {new Date(v.date).toLocaleDateString("fr-FR")}</div>
            </div>
            {/* Badge statut */}
            <StatutBadge statut={v.statut} />
            {/* Boutons (seulement si en attente) */}
            {v.statut === "en_attente" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => refuser(v.id)} style={{
                  padding: "7px 14px", borderRadius: 10, border: "1.5px solid #fca5a5",
                  background: "none", color: "#ef4444", fontSize: 12,
                  fontWeight: 600, cursor: "pointer", fontFamily: "Plus Jakarta Sans",
                }}>Refuser</button>
                <button onClick={() => valider(v.id)} style={{
                  padding: "7px 14px", borderRadius: 10, border: "none",
                  background: "#22c55e", color: "#fff", fontSize: 12,
                  fontWeight: 600, cursor: "pointer", fontFamily: "Plus Jakarta Sans",
                }}>Valider</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
