// ============================================================
//  StatCard.jsx — Carte de statistique (violet ou sombre)
//
//  Props :
//    percent (number) → le % à afficher
//    label   (string) → texte sous le %
//    dark    (bool)   → fond sombre (pour notifications)
//    small   (bool)   → version compacte (mobile)
// ============================================================

export function StatCard({ percent, label, dark, small }) {
  return (
    <div style={{
      background: dark ? "#1a1a2e" : "linear-gradient(135deg,#7c3aed,#9d5cf5)",
      borderRadius: 18,
      padding: small ? "18px 20px" : "24px 28px",
      display: "flex", alignItems: "center", gap: 14,
      flex: 1,
      boxShadow: dark
        ? "0 8px 30px rgba(26,26,46,.4)"
        : "0 8px 30px rgba(124,58,237,.3)",
    }}>
      {percent !== undefined ? (
        <>
          <span style={{
            fontSize: small ? 36 : 46, fontWeight: 900, color: "#c8f000",
            lineHeight: 1, fontFamily: "'Syne',sans-serif", flexShrink: 0,
          }}>
            {percent}%
          </span>
          <span style={{
            fontSize: small ? 12 : 13, fontWeight: 600,
            color: "rgba(255,255,255,.9)", lineHeight: 1.4,
            whiteSpace: "pre-line",
          }}>
            {label}
          </span>
        </>
      ) : (
        // Version notifications (pas de %)
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{
            fontSize: small ? 36 : 46, fontWeight: 900,
            color: "#c8f000", fontFamily: "'Syne',sans-serif",
          }}>
            6
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.9)", marginTop: 4 }}>
            Notifications
          </div>
        </div>
      )}
    </div>
  );
}


// ============================================================
//  GroupCard.jsx — Carte "Groupe X a complété une tâche"
//
//  Props :
//    sae   (string) → ex : "SAE 403"
//    group (string) → ex : "Groupe 1"
//    task  (string) → description de la tâche
// ============================================================

import { Svg } from "../common/Icons";

export function GroupCard({ sae, group, task }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "12px 14px",
      marginBottom: 10, display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 2px 10px rgba(124,58,237,.08)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 10, color: "#9d5cf5", fontWeight: 700,
          marginBottom: 4, letterSpacing: .5, textTransform: "uppercase",
        }}>
          {sae}
        </div>
        <div style={{ fontSize: 13, color: "#2d2d4e", lineHeight: 1.5 }}>
          <strong>{group}</strong> a complété la tâche<br />
          <span style={{ color: "#666" }}>"{task}"</span>
        </div>
      </div>
      {/* Coche jaune */}
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: "#c8f000",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Svg d="M20 6L9 17l-5-5" size={16} color="#1a1a2e" />
      </div>
    </div>
  );
}


// ============================================================
//  MessageRow.jsx — Une ligne dans la liste des messages
//
//  Props :
//    name     (string)   → nom de l'expéditeur
//    unread   (bool)     → message non lu ?
//    expanded (bool)     → ligne dépliée ?
//    onClick  (function) → clic sur la ligne
// ============================================================

import { IC } from "../common/Icons";

export function MessageRow({ name, unread, expanded, onClick }) {
  return (
    <div>
      <div onClick={onClick} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 0", borderBottom: "1px solid #f0edf8",
        cursor: "pointer",
      }}>
        {/* Pastille verte = non lu */}
        <span style={{
          width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
          background: unread ? "#22c55e" : "#d1fae5",
        }} />
        <span style={{ flex: 1, fontSize: 13, color: "#2d2d4e", fontWeight: unread ? 600 : 400 }}>
          {name} vous a envoyé un message
        </span>
        {/* Flèche qui tourne quand expanded = true */}
        <span style={{
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform .2s", color: "#bbb", flexShrink: 0,
        }}>
          <Svg d={IC.chevDown} size={16} />
        </span>
      </div>
      {/* Contenu déplié */}
      {expanded && (
        <div style={{
          background: "#f9f6ff", padding: "10px 12px",
          borderRadius: 8, margin: "4px 0 6px",
          fontSize: 13, color: "#666",
        }}>
          💬 Ouvrir la messagerie complète pour lire et répondre →
        </div>
      )}
    </div>
  );
}
