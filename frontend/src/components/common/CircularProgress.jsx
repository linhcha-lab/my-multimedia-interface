// ============================================================
//  CircularProgress.jsx
//  Cercle de progression SVG avec dégradé violet → jaune.
//
//  Props :
//    value  (number) → pourcentage 0-100
//    size   (number) → taille en px (défaut 155)
//    stroke (number) → épaisseur du trait (défaut 12)
// ============================================================

export default function CircularProgress({ value, size = 155, stroke = 12 }) {
  const r      = (size - stroke) / 2;   // rayon
  const circ   = 2 * Math.PI * r;       // circonférence totale
  const offset = circ - (value / 100) * circ; // portion à masquer

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Cercle de fond gris */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke="#e8e4f0" strokeWidth={stroke} />
        {/* Cercle coloré (progression) */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          stroke="url(#circGradient)" />
        {/* Dégradé violet → jaune */}
        <defs>
          <linearGradient id="circGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c8f000" />
          </linearGradient>
        </defs>
      </svg>
      {/* Texte centré */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: size * 0.2, fontWeight: 800,
          color: "#1a1a2e", lineHeight: 1,
          fontFamily: "'Syne', sans-serif",
        }}>
          {value}%
        </span>
        <span style={{ fontSize: size * 0.085, color: "#777", marginTop: 4, textAlign: "center" }}>
          Semestre complété
        </span>
      </div>
    </div>
  );
}
