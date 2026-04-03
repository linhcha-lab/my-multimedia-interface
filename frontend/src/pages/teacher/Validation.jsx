// ============================================================
//  pages/teacher/Validation.jsx — Validation des publications
// ============================================================

import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { Svg, IC } from "../../components/common/Icons";

export default function Validation() {
  const [items, setItems] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Erreur API");
        }

        const data = await res.json();

        const formatted = Array.isArray(data)
          ? data.map(p => ({
              id: p.id,
              etudiant: "Étudiant",
              sae: p.title || "Projet",
              fichier: p.images?.[0] || "Aucun fichier",
              date: new Date().toISOString(),

              statut:
                p.status === "submitted" ? "en_attente" :
                p.status === "validated" ? "valide" :
                p.status === "refused" ? "refuse" :
                "en_attente"
            }))
          : [];

        setItems(formatted);

      } catch (err) {
        console.error(" erreur fetch projects :", err);
        setItems([]);
      }
    };

    fetchProjects();
  }, []);

  // ================= ACTIONS =================
  const valider = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8000/api/projects/${id}/validate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setItems(prev =>
        prev.map(v => v.id === id ? { ...v, statut: "valide" } : v)
      );

    } catch (err) {
      console.error(" erreur validation :", err);
    }
  };

  const refuser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8000/api/projects/${id}/refuse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setItems(prev =>
        prev.map(v => v.id === id ? { ...v, statut: "refuse" } : v)
      );

    } catch (err) {
      console.error("❌ erreur refus :", err);
    }
  };

  // ================= BADGE =================
  const StatutBadge = ({ statut }) => {
    const map = {
      en_attente: { label: "En attente", bg: "#fef9c3", color: "#854d0e" },
      valide:     { label: "Validé",     bg: "#dcfce7", color: "#166534" },
      refuse:     { label: "Refusé",     bg: "#fce7e7", color: "#991b1b" },
    };

    const c = map[statut] || map.en_attente; 

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
    );
  };

  const enAttente = items.filter(v => v.statut === "en_attente").length;

  // ================= UI =================
  return (
    <PageLayout title="Validation des publications">

      {/* COMPTEUR */}
      <div style={{
        background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
        borderRadius: 14,
        padding: "16px 22px",
        marginBottom: 20,
        display: "inline-flex",
        alignItems: "center",
        gap: 12
      }}>
        <span style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#c8f000",
          fontFamily: "'Payton One',sans-serif"
        }}>
          {enAttente}
        </span>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255,255,255,.9)"
        }}>
          rendu{enAttente > 1 ? "s" : ""} en attente de validation
        </span>
      </div>

      {/* LISTE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(v => (
          <div key={v.id} style={{
            background: "#fff",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 2px 12px rgba(0,0,0,.06)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}>
            
            {/* ICON */}
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "#f4f0fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Svg d={IC.file} size={20} color="#7c3aed" />
            </div>

            {/* INFOS */}
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 3
              }}>
                {v.etudiant}
              </div>

              <div style={{
                fontSize: 11,
                color: "#9d5cf5",
                fontWeight: 600,
                marginBottom: 2
              }}>
                {v.sae}
              </div>

              <div style={{
                fontSize: 11,
                color: "#aaa"
              }}>
                {v.fichier} · {new Date(v.date).toLocaleDateString("fr-FR")}
              </div>
            </div>

            {/* BADGE */}
            <StatutBadge statut={v.statut} />

            {/* ACTIONS */}
            {v.statut === "en_attente" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => refuser(v.id)} style={btnRefuse}>
                  Refuser
                </button>
                <button onClick={() => valider(v.id)} style={btnValide}>
                  Valider
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </PageLayout>
  );
}

// ================= STYLES =================
const btnRefuse = {
  padding: "7px 14px",
  borderRadius: 10,
  border: "1.5px solid #fca5a5",
  background: "none",
  color: "#ef4444",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "Plus Jakarta Sans",
};

const btnValide = {
  padding: "7px 14px",
  borderRadius: 10,
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "Plus Jakarta Sans",
};