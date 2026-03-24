// ============================================================
//  pages/teacher/SAEList.jsx — Liste des SAE
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout";
import Modal      from "../../components/common/Modal";
import { Svg, IC } from "../../components/common/Icons";
import { SAES }   from "../../data/mockData";

// Badge coloré selon l'état de la SAE
function EtatBadge({ etat }) {
  const config = {
    en_cours: { label: "En cours",  bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",   bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",   bg: "#fef9c3", color: "#854d0e" },
  };
  const c = config[etat] || config.a_venir;
  return (
    <span style={{
      background: c.bg, color: c.color,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600,
    }}>
      {c.label}
    </span>
  );
}

// Barre de progression horizontale
function ProgressBar({ value }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height: 6, width: "100%", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 4,
        width: `${value}%`,
        background: value === 100
          ? "#22c55e"
          : "linear-gradient(90deg,#7c3aed,#9d5cf5)",
        transition: "width .3s",
      }} />
    </div>
  );
}

export default function SAEList() {
  const navigate      = useNavigate();
  const [filtre, setFiltre] = useState("tous");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ titre: "", semestre: "", echeance: "" });

  // Filtre les SAE selon le filtre sélectionné
  const saeFiltrees = filtre === "tous"
    ? SAES
    : SAES.filter(s => s.etat === filtre);

  return (
    <PageLayout title="Liste des SAE">

      {/* ── Barre du haut : filtres + bouton créer ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>

        {/* Filtres */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { val: "tous",     label: "Toutes" },
            { val: "en_cours", label: "En cours" },
            { val: "termine",  label: "Terminées" },
            { val: "a_venir",  label: "À venir" },
          ].map(f => (
            <button key={f.val} onClick={() => setFiltre(f.val)} style={{
              padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer",
              fontFamily: "inherit", fontWeight: 500,
              background: filtre === f.val ? "#7c3aed" : "#fff",
              color:      filtre === f.val ? "#fff"    : "#666",
              border:     filtre === f.val ? "none"    : "1px solid #e0daf5",
              transition: "all .15s",
            }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Bouton créer */}
        <button onClick={() => setShowModal(true)} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "9px 18px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
          color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          <Svg d={IC.plus} size={16} color="#fff" />
          Nouvelle SAE
        </button>
      </div>

      {/* ── Grille de cartes SAE ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {saeFiltrees.map(sae => (
          <div key={sae.id}
            onClick={() => navigate(`/teacher/saes/${sae.id}`)}
            style={{
              background: "#fff", borderRadius: 16, padding: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,.06)",
              cursor: "pointer", transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,.06)"; }}
          >
            {/* En-tête carte */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#9d5cf5", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>
                  {sae.code} · {sae.semestre}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>
                  {sae.titre}
                </div>
              </div>
              <EtatBadge etat={sae.etat} />
            </div>

            {/* Progression */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#888" }}>Progression</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed" }}>{sae.progression}%</span>
              </div>
              <ProgressBar value={sae.progression} />
            </div>

            {/* Infos bas */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa" }}>
              <span>{sae.groupes} groupe{sae.groupes > 1 ? "s" : ""}</span>
              <span>Échéance : {new Date(sae.echeance).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Aucun résultat */}
      {saeFiltrees.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#666" }}>Aucune SAE dans cette catégorie</div>
        </div>
      )}

      {/* Modale créer SAE */}
      {showModal && (
        <Modal title="Nouvelle SAE" onClose={() => setShowModal(false)}>
          {[
            { label: "Titre *",         champ: "titre",    type: "text", ph: "Ex : SAE 407 – Application mobile" },
            { label: "Semestre",        champ: "semestre", type: "text", ph: "Ex : BUT2 – S4" },
            { label: "Date d'échéance", champ: "echeance", type: "date", ph: "" },
          ].map(({ label, champ, type, ph }) => (
            <div key={champ} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 5, textTransform: "uppercase", letterSpacing: .5 }}>{label}</label>
              <input type={type} placeholder={ph} value={form[champ]}
                onChange={e => setForm(f => ({ ...f, [champ]: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e0daf5", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: "#2d2d4e" }} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1.5px solid #e0daf5", background: "none", fontSize: 14, cursor: "pointer", color: "#666" }}>Annuler</button>
            <button onClick={() => { alert("SAE créée ! (connecte l'API Symfony)"); setShowModal(false); }} style={{ flex: 1, padding: 11, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 700 }}>Créer</button>
          </div>
        </Modal>
      )}
    </PageLayout>
  );
}
