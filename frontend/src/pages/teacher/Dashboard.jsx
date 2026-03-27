// ============================================================
//  pages/teacher/Dashboard.jsx
//  Tableau de bord enseignant — page principale
// ============================================================

import { useState } from "react";
import PageLayout       from "../../components/layout/PageLayout";
import CircularProgress from "../../components/common/CircularProgress";
import Modal            from "../../components/common/Modal";
import { StatCard, GroupCard, MessageRow } from "../../components/dashboard/DashboardComponents";
import { Svg, IC }      from "../../components/common/Icons";
import { MESSAGES, GROUP_PROGRESS, QUICK_STATS } from "../../data/mockData";
import { useWindowWidth, BP } from "../../hooks/useWindowWidth";

// ── Formulaire dans la modale ────────────────────────────────
function PlanifierForm({ onClose }) {
  const [form, setForm] = useState({ titre: "", semestre: "", echeance: "", desc: "" });
  const set = (champ, val) => setForm(f => ({ ...f, [champ]: val }));

  const handleSubmit = () => {
    if (!form.titre.trim()) { alert("Le titre est obligatoire."); return; }
    // TODO : fetch("/api/saes", { method:"POST", body: JSON.stringify(form) })
    alert(`SAE "${form.titre}" créée ! (connecte l'API Symfony ici)`);
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1.5px solid #e0daf5", fontSize: 13, outline: "none",
    fontFamily: "Plus Jakarta Sans", boxSizing: "border-box", color: "#2d2d4e",
  };

  return (
    <>
      {[
        { label: "Titre *",         champ: "titre",    type: "text",     ph: "Ex : SAE 407 – Application mobile" },
        { label: "Semestre",        champ: "semestre", type: "text",     ph: "Ex : BUT2 – S4" },
        { label: "Date d'échéance", champ: "echeance", type: "date",     ph: "" },
        { label: "Description",     champ: "desc",     type: "textarea", ph: "Objectifs et consignes..." },
      ].map(({ label, champ, type, ph }) => (
        <div key={champ} style={{ marginBottom: 14 }}>
          <label style={{
            display: "block", fontSize: 11, fontWeight: 700,
            color: "#7c3aed", marginBottom: 5,
            textTransform: "uppercase", letterSpacing: .5,
          }}>{label}</label>
          {type === "textarea" ? (
            <textarea placeholder={ph} value={form[champ]} rows={3}
              onChange={e => set(champ, e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }} />
          ) : (
            <input type={type} placeholder={ph} value={form[champ]}
              onChange={e => set(champ, e.target.value)}
              style={inputStyle} />
          )}
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <button onClick={onClose} style={{
          flex: 1, padding: 11, borderRadius: 12,
          border: "1.5px solid #e0daf5", background: "none",
          fontSize: 14, cursor: "pointer", color: "#666",
        }}>Annuler</button>
        <button onClick={handleSubmit} style={{
          flex: 1, padding: 11, borderRadius: 12, border: "none",
          background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
          fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 700,
        }}>Créer la SAE</button>
      </div>
    </>
  );
}

// ── Composant principal ──────────────────────────────────────
export default function TeacherDashboard() {
  const [expandedMsg, setExpandedMsg] = useState(null);
  const [showModal,   setShowModal  ] = useState(false);

  const w        = useWindowWidth();
  const isMobile = w < BP.mobile;
  const isTablet = w < BP.tablet;

  return (
    <PageLayout title="Tableau de bord">
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>

        {/* ── Cartes stats ── */}
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
          {/* Planifier une SAE */}
          <div onClick={() => setShowModal(true)} style={{
            background: "#f4f0fb", borderRadius: 18, padding: 22,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 14, cursor: "pointer", minHeight: 155,
            transition: "box-shadow .2s, transform .15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,58,237,.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{
              width: 62, height: 62, borderRadius: "50%",
              border: "2px solid #9d5cf5",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Svg d={IC.plus} size={26} color="#7c3aed" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2d2d4e" }}>Planifier une SAE</span>
          </div>

          {/* Messages */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 2px 18px rgba(0,0,0,.06)" }}>
            <h2 style={{ fontFamily: "'Payton One',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>
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

          {/* Cercle progression */}
          {!isMobile && (
            <div style={{ background: "#f4f0fb", borderRadius: 18, padding: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress value={70} size={isTablet ? 125 : 150} />
            </div>
          )}
        </div>

        {/* ── Grille bas ── */}
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
          {/* Avancée des groupes */}
          <div style={{ background: "#ede9fb", borderRadius: 18, padding: 20 }}>
            <h2 style={{ fontFamily: "'Payton One',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
              Avancée des groupes
            </h2>
            {GROUP_PROGRESS.map((g, i) => <GroupCard key={i} {...g} />)}
          </div>

          {/* Statistiques rapides */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 2px 18px rgba(0,0,0,.06)" }}>
            <h2 style={{ fontFamily: "'Payton One',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
              Statistiques rapides
            </h2>
            {QUICK_STATS.map(s => (
              <div key={s.label} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "11px 0", borderBottom: "1px solid #f0edf8",
              }}>
                <span style={{ fontSize: 14, color: "#555" }}>{s.label}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Payton One',sans-serif" }}>{s.value}</span>
              </div>
            ))}
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
                <CircularProgress value={70} size={130} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modale */}
      {showModal && (
        <Modal title="Planifier une SAE" onClose={() => setShowModal(false)}>
          <PlanifierForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </PageLayout>
  );
}
