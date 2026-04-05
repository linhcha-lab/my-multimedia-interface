// ============================================================
//  pages/teacher/Students.jsx — Liste des étudiants
// ============================================================

import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { Svg, IC } from "../../components/common/Icons";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search,  setSearch ] = useState("");
  const [groupe,  setGroupe ] = useState("tous");


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/students", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error("Erreur API");

        const data = await res.json();

       
        const formatted = data.map(s => ({
          id: s.id,
          prenom: s.firstName,
          nom: s.lastName,
          groupe: s.parcours || "N/A",
          semestre: s.year,
          progression: Math.floor(Math.random() * 100), // temporaire
          email: s.email,
        }));

        setStudents(formatted);

      } catch (err) {
        console.error("Erreur chargement étudiants :", err);
      }
    };

    fetchStudents();
  }, []);

  const groupes = ["tous", ...new Set(students.map(s => s.groupe))];

  const filtres = students.filter(s => {
    const matchSearch = `${s.prenom} ${s.nom}`.toLowerCase().includes(search.toLowerCase());
    const matchGroupe = groupe === "tous" || s.groupe === groupe;
    return matchSearch && matchGroupe;
  });

  return (
    <PageLayout title="Étudiants">

      {/* ── Barre filtres ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {/* Recherche */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa" }}>
            <Svg d={IC.search} size={16} />
          </div>
          <input
            type="text"
            placeholder="Rechercher un étudiant…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 12px 10px 36px",
              borderRadius: 12, border: "1px solid #e0daf5",
              fontSize: 13, outline: "none", fontFamily: "Plus Jakarta Sans",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filtre groupe */}
        <select value={groupe} onChange={e => setGroupe(e.target.value)} style={{
          padding: "10px 14px", borderRadius: 12, border: "1px solid #e0daf5",
          fontSize: 13, outline: "none", fontFamily: "Plus Jakarta Sans", background: "#fff", color: "#2d2d4e",
        }}>
          {groupes.map(g => (
            <option key={g} value={g}>{g === "tous" ? "Tous les groupes" : g}</option>
          ))}
        </select>
      </div>

      {/* ── Tableau des étudiants ── */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,.06)", overflow: "hidden" }}>
        {/* En-tête */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          padding: "12px 20px", background: "#f8f6fc",
          borderBottom: "1px solid #f0edf8",
          fontSize: 11, fontWeight: 700, color: "#9d9dbd",
          textTransform: "uppercase", letterSpacing: .5,
        }}>
          <span>Étudiant</span>
          <span>Groupe</span>
          <span>Progression</span>
          <span>Email</span>
        </div>

        {/* Lignes */}
        {filtres.map((s, i) => (
          <div key={s.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            padding: "14px 20px",
            borderBottom: i < filtres.length - 1 ? "1px solid #f0edf8" : "none",
            alignItems: "center",
            transition: "background .15s", cursor: "pointer",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#faf8ff"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            {/* Nom */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 13,
              }}>
                {s.prenom.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>
                  {s.prenom} {s.nom}
                </div>
                <div style={{ fontSize: 11, color: "#aaa" }}>
                  BUT2 – {s.semestre}
                </div>
              </div>
            </div>

            {/* Groupe */}
            <span style={{ fontSize: 13, color: "#555" }}>{s.groupe}</span>

            {/* Progression */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 4 }}>
                {s.progression}%
              </div>
              <div style={{ background: "#f0edf8", borderRadius: 4, height: 5, width: 80 }}>
                <div style={{
                  height: "100%",
                  borderRadius: 4,
                  width: `${s.progression}%`,
                  background: "linear-gradient(90deg,#7c3aed,#9d5cf5)"
                }} />
              </div>
            </div>

            {/* Email */}
            <span style={{ fontSize: 12, color: "#7c3aed" }}>{s.email}</span>
          </div>
        ))}

        {filtres.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#aaa", fontSize: 13 }}>
            Aucun étudiant trouvé
          </div>
        )}
      </div>
    </PageLayout>
  );
}