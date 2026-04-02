// ============================================================
//  pages/teacher/Announcements.jsx — Mes annonces
// ============================================================

import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import Modal      from "../../components/common/Modal";
import { Svg, IC } from "../../components/common/Icons";

export default function Announcements() {
  const [annonces,   setAnnonces  ] = useState([]);
  const [showModal,  setShowModal ] = useState(false);
  const [form,       setForm      ] = useState({ titre: "", sae: "", contenu: "" });

  // 🔥 Récupération des annonces depuis Symfony
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/api/announcements", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Erreur API");
        }

        const data = await res.json();

        // Adapter les données backend → frontend
        const formatted = data.map(a => ({
          id: a.id,
          titre: a.title,
          contenu: a.content,
          sae: "SAE " + a.sae,
          date: a.createdAt
        }));

        setAnnonces(formatted);

      } catch (err) {
        console.error("Erreur chargement annonces :", err);
      }
    };

    fetchAnnonces();
  }, []);

  const handleCreate = () => {
    if (!form.titre.trim()) { alert("Le titre est obligatoire."); return; }

    const nouvelle = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split("T")[0]
    };

    setAnnonces(prev => [nouvelle, ...prev]);
    setForm({ titre: "", sae: "", contenu: "" });
    setShowModal(false);
  };

  return (
    <PageLayout title="Mes annonces">
      {/* Bouton créer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button onClick={() => setShowModal(true)} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 18px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
          color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "Plus Jakarta Sans",
        }}>
          <Svg d={IC.plus} size={16} color="#fff" />
          Nouvelle annonce
        </button>
      </div>

      {/* Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {annonces.map(a => (
          <div key={a.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 10, color: "#9d5cf5", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, marginRight: 8 }}>
                  {a.sae}
                </span>
                <span style={{ fontSize: 11, color: "#bbb" }}>
                  {new Date(a.date).toLocaleDateString("fr-FR")}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9d5cf5" }}>
                  <Svg d={IC.edit} size={16} />
                </button>

                <button
                  onClick={() => setAnnonces(prev => prev.filter(x => x.id !== a.id))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171" }}
                >
                  <Svg d={IC.trash} size={16} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
              {a.titre}
            </div>

            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              {a.contenu}
            </div>
          </div>
        ))}
      </div>

      {/* Modale */}
      {showModal && (
        <Modal title="Nouvelle annonce" onClose={() => setShowModal(false)}>
          {[
            { label: "Titre *",     champ: "titre",   type: "text",     ph: "Ex : Report de l'échéance" },
            { label: "SAE liée",    champ: "sae",     type: "text",     ph: "Ex : SAE 403" },
            { label: "Contenu *",   champ: "contenu", type: "textarea", ph: "Détails de l'annonce…" },
          ].map(({ label, champ, type, ph }) => (
            <div key={champ} style={{ marginBottom: 14 }}>
              <label style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: "#7c3aed",
                marginBottom: 5,
                textTransform: "uppercase",
                letterSpacing: .5
              }}>
                {label}
              </label>

              {type === "textarea" ? (
                <textarea
                  placeholder={ph}
                  value={form[champ]}
                  rows={4}
                  onChange={e => setForm(f => ({ ...f, [champ]: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1.5px solid #e0daf5",
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "Plus Jakarta Sans",
                    boxSizing: "border-box",
                    resize: "vertical",
                    color: "#2d2d4e"
                  }}
                />
              ) : (
                <input
                  type={type}
                  placeholder={ph}
                  value={form[champ]}
                  onChange={e => setForm(f => ({ ...f, [champ]: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1.5px solid #e0daf5",
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "Plus Jakarta Sans",
                    boxSizing: "border-box",
                    color: "#2d2d4e"
                  }}
                />
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                flex: 1,
                padding: 11,
                borderRadius: 12,
                border: "1.5px solid #e0daf5",
                background: "none",
                fontSize: 14,
                cursor: "pointer",
                color: "#666"
              }}
            >
              Annuler
            </button>

            <button
              onClick={handleCreate}
              style={{
                flex: 1,
                padding: 11,
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                fontSize: 14,
                cursor: "pointer",
                color: "#fff",
                fontWeight: 700
              }}
            >
              Publier
            </button>
          </div>
        </Modal>
      )}
    </PageLayout>
  );
}