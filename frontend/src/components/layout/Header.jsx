// ============================================================
//  Header.jsx — En-tête de chaque page
//
//  Props :
//    title       (string)   → titre de la page
//    subtitle    (string)   → sous-titre optionnel
//    onMenuClick (function) → ouvre la sidebar sur mobile
// ============================================================

import { Svg, IC } from "../common/Icons";
import { useWindowWidth, BP } from "../../hooks/useWindowWidth";

export default function Header({ title, subtitle = "Semestre 4 — BUT2 MMI · 2024–2025", onMenuClick }) {
  const width    = useWindowWidth();
  const isMobile = width < BP.tablet;

  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      marginBottom: isMobile ? 20 : 28,
      gap: 10,
    }}>
      {/* Bouton burger — visible sur mobile uniquement */}
      {isMobile && (
        <button onClick={onMenuClick} style={{
          background: "#fff", border: "none", borderRadius: 12,
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          color: "#7c3aed", flexShrink: 0,
        }}>
          <Svg d={IC.menu} size={20} />
        </button>
      )}

      {/* Titre + sous-titre */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: isMobile ? 18 : 24,
          fontWeight: 900, color: "#1a1a2e",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {title}
        </h1>
        <p style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>{subtitle}</p>
      </div>

      {/* Cloche de notifications */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#7c3aed",
        }}>
          <Svg d={IC.bell} size={18} />
        </div>
        <span style={{
          position: "absolute", top: -5, right: -5,
          background: "#c8f000", color: "#1a1a2e",
          borderRadius: "50%", width: 18, height: 18,
          fontSize: 10, fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>6</span>
      </div>
    </div>
  );
}
