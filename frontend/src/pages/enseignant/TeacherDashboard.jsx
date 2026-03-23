// ============================================================
//  TeacherDashboard.jsx
//  Tableau de bord enseignant – Plateforme SAE MMI
// ============================================================
//
//  💡 POUR APPRENDRE REACT – Lis ces explications avant de commencer :
//
//  → Un "composant" React c'est simplement une fonction JavaScript
//    qui retourne du HTML (qu'on appelle JSX).
//    Exemple :  function MonComposant() { return <div>Bonjour</div>; }
//
//  → "useState" sert à stocker une valeur qui peut changer.
//    Quand elle change, React re-affiche automatiquement le composant.
//    Exemple :  const [ouvert, setOuvert] = useState(false);
//               ouvert = la valeur actuelle
//               setOuvert(true) = pour changer la valeur
//
//  → Les props ce sont les "paramètres" qu'on passe à un composant.
//    Exemple :  <StatCard percent={10} label="Progression SAE 406" />
//               Dans StatCard on reçoit { percent, label } en paramètre.
//
//  → Le style en React s'écrit en objet JS : style={{ color: "red" }}
//    (deux accolades : une pour JSX, une pour l'objet JS)
//
// ============================================================

import { useState, useEffect } from "react";

// ============================================================
//  DONNÉES FICTIVES (mock data)
//  En vrai elles viendront de ton API Symfony via fetch()
// ============================================================

const MESSAGES = [
  { id: 1, name: "Linh Chassang",      unread: true  },
  { id: 2, name: "Sarah Donsoun",      unread: true  },
  { id: 3, name: "Marine Boyer",       unread: true  },
  { id: 4, name: "Alisson Lappp",      unread: false },
  { id: 5, name: "Perrine Blois",      unread: false },
  { id: 6, name: "Clémentine Fraise",  unread: false },
];

const GROUP_PROGRESS = [
  { sae: "SAE 403", group: "Groupe 1", task: "Configurer le projet React" },
  { sae: "SAE 403", group: "Groupe 2", task: "Mettre en place la base de données" },
  { sae: "SAE 406", group: "Groupe 1", task: "Réaliser la charte graphique" },
];

const QUICK_STATS = [
  { label: "SAE actives",        value: 3,  color: "#7c3aed" },
  { label: "Groupes suivis",     value: 12, color: "#9d5cf5" },
  { label: "Rendus en attente",  value: 5,  color: "#f59e0b" },
  { label: "Livrables validés",  value: 28, color: "#22c55e" },
];

// ============================================================
//  HOOK PERSONNALISÉ : useWindowWidth
//  Retourne la largeur de la fenêtre et se met à jour en temps réel.
// ============================================================
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

// Points de rupture responsive
const BP = { mobile: 480, tablet: 768, laptop: 1024 };

// ============================================================
//  ICÔNES SVG — composant générique + une fonction par icône
// ============================================================
function Svg({ d, size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const IC = {
  home:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  students: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  announce: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  message:  "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  validate: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell:     "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  plus:     "M12 5v14M5 12h14",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6L6 18M6 6l12 12",
  chevDown: "M6 9l6 6 6-6",
  chevUp:   "M18 15l-6-6-6 6",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Tableau de bord",             icon: "home"     },
  { id: "saes",      label: "Liste des SAE",               icon: "list"     },
  { id: "students",  label: "Étudiants",                   icon: "students" },
  { id: "announce",  label: "Mes annonces",                icon: "announce" },
  { id: "messages",  label: "Messagerie",                  icon: "message"  },
  { id: "validate",  label: "Validation des publications", icon: "validate" },
  { id: "settings",  label: "Paramètres",                  icon: "settings" },
];

// ============================================================
//  COMPOSANT : CircularProgress
//  Cercle de progression SVG avec dégradé violet → jaune.
// ============================================================
function CircularProgress({ value, size = 155, stroke = 12 }) {
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8e4f0" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          stroke="url(#cg)" />
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c8f000" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: size * 0.2, fontWeight: 800, color: "#1a1a2e", lineHeight: 1 }}>{value}%</span>
        <span style={{ fontSize: size * 0.085, color: "#777", marginTop: 4, textAlign: "center" }}>
          Semestre complété
        </span>
      </div>
    </div>
  );
}

// ============================================================
//  COMPOSANT : StatCard
//  Carte colorée en haut du tableau de bord.
// ============================================================
function StatCard({ percent, label, dark, small }) {
  return (
    <div style={{
      background: dark ? "#1a1a2e" : "linear-gradient(135deg,#7c3aed,#9d5cf5)",
      borderRadius: 18,
      padding: small ? "18px 20px" : "24px 28px",
      display: "flex", alignItems: "center", gap: 14,
      flex: 1,
      boxShadow: dark ? "0 8px 30px rgba(26,26,46,.4)" : "0 8px 30px rgba(124,58,237,.3)",
    }}>
      {percent !== undefined ? (
        <>
          <span style={{
            fontSize: small ? 36 : 46, fontWeight: 900, color: "#c8f000",
            lineHeight: 1, fontFamily: "'Syne',sans-serif", flexShrink: 0,
          }}>{percent}%</span>
          <span style={{
            fontSize: small ? 12 : 13, fontWeight: 600,
            color: "rgba(255,255,255,.9)", lineHeight: 1.4, whiteSpace: "pre-line",
          }}>{label}</span>
        </>
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{
            fontSize: small ? 36 : 46, fontWeight: 900,
            color: "#c8f000", fontFamily: "'Syne',sans-serif",
          }}>6</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.9)", marginTop: 4 }}>
            Notifications
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
//  COMPOSANT : MessageRow — une ligne dans la liste des messages
// ============================================================
function MessageRow({ name, unread, expanded, onClick }) {
  return (
    <div>
      <div onClick={onClick} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 0", borderBottom: "1px solid #f0edf8",
        cursor: "pointer",
      }}>
        {/* Pastille couleur selon statut lu/non lu */}
        <span style={{
          width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
          background: unread ? "#22c55e" : "#d1fae5",
        }} />
        <span style={{ flex: 1, fontSize: 13, color: "#2d2d4e", fontWeight: unread ? 600 : 400 }}>
          {name} vous a envoyé un message
        </span>
        {/* Flèche qui se retourne quand la ligne est ouverte */}
        <span style={{
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform .2s", color: "#bbb", flexShrink: 0,
        }}>
          <Svg d={IC.chevDown} size={16} />
        </span>
      </div>
      {/* Contenu déplié — visible seulement si expanded = true */}
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

// ============================================================
//  COMPOSANT : GroupCard — une tâche complétée par un groupe
// ============================================================
function GroupCard({ sae, group, task }) {
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
        }}>{sae}</div>
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
//  COMPOSANT : PlanifierModal — formulaire de création de SAE
// ============================================================
function PlanifierModal({ onClose }) {
  // "form" est un objet qui contient tous les champs du formulaire
  const [form, setForm] = useState({ titre: "", semestre: "", echeance: "", desc: "" });

  // Met à jour un champ précis dans l'objet form
  // Le "spread" (...form) copie tous les anciens champs et on écrase juste [champ]
  const set = (champ, val) => setForm(f => ({ ...f, [champ]: val }));

  const handleSubmit = () => {
    if (!form.titre.trim()) { alert("Le titre est obligatoire."); return; }
    // TODO : remplace l'alert par un fetch vers ton API Symfony :
    // fetch("/api/saes", { method: "POST", headers: {"Content-Type":"application/json"},
    //   body: JSON.stringify(form) })
    alert(`SAE "${form.titre}" créée !\n(Connecte l'API Symfony ici)`);
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1.5px solid #e0daf5", fontSize: 13, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", color: "#2d2d4e",
  };

  return (
    // Fond flou derrière la modale — cliquer dessus ferme la modale
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(26,26,46,.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)", padding: 16,
    }}>
      {/* La modale — stopPropagation empêche le clic de "traverser" vers le fond */}
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 22, padding: 34,
        width: "100%", maxWidth: 440,
        boxShadow: "0 30px 80px rgba(0,0,0,.2)",
      }}>
        <h2 style={{
          margin: "0 0 22px", fontFamily: "'Syne',sans-serif",
          color: "#1a1a2e", fontSize: 22,
        }}>Planifier une SAE</h2>

        {/* Champs du formulaire */}
        {[
          { label: "Titre *",          champ: "titre",    type: "text",     ph: "Ex : SAE 407 – Application mobile" },
          { label: "Semestre",         champ: "semestre", type: "text",     ph: "Ex : BUT2 – S4" },
          { label: "Date d'échéance",  champ: "echeance", type: "date",     ph: "" },
          { label: "Description",      champ: "desc",     type: "textarea", ph: "Objectifs et consignes..." },
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

        {/* Boutons */}
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
      </div>
    </div>
  );
}

// ============================================================
//  COMPOSANT : DashboardView — contenu du tableau de bord
// ============================================================
function DashboardView() {
  const [expandedMsg, setExpandedMsg] = useState(null); // id du message ouvert
  const [showModal,   setShowModal  ] = useState(false);

  const w        = useWindowWidth();
  const isMobile = w < BP.mobile;
  const isTablet = w < BP.tablet;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>

      {/* ── Cartes stats ── */}
      <div style={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        gap: 12,
      }}>
        <StatCard percent={10} label={"Progression moyenne\nsur la SAE 406"} small={isMobile} />
        <StatCard percent={70} label={"Progression moyenne\nsur la SAE 403"} small={isMobile} />
        <StatCard dark small={isMobile} />
      </div>

      {/* ── Grille du milieu ── */}
      <div style={{
        display: "grid",
        gap: 16,
        // 3 colonnes sur desktop, 2 sur tablet, 1 sur mobile
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
          onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 28px rgba(124,58,237,.2)"; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
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
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>
            Messages
          </h2>
          {/* .map() = boucle pour afficher une ligne par message */}
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

        {/* Cercle progression (masqué sur mobile) */}
        {!isMobile && (
          <div style={{ background: "#f4f0fb", borderRadius: 18, padding: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress value={70} size={isTablet ? 125 : 150} />
          </div>
        )}
      </div>

      {/* ── Grille du bas ── */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>

        {/* Avancée des groupes */}
        <div style={{ background: "#ede9fb", borderRadius: 18, padding: 20 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
            Avancée des groupes
          </h2>
          {GROUP_PROGRESS.map((g, i) => <GroupCard key={i} {...g} />)}
        </div>

        {/* Statistiques rapides */}
        <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 2px 18px rgba(0,0,0,.06)" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
            Statistiques rapides
          </h2>
          {QUICK_STATS.map(s => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 0", borderBottom: "1px solid #f0edf8",
            }}>
              <span style={{ fontSize: 14, color: "#555" }}>{s.label}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Syne',sans-serif" }}>{s.value}</span>
            </div>
          ))}
          {/* Cercle uniquement sur mobile ici (il est ailleurs sur les grands écrans) */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
              <CircularProgress value={70} size={130} />
            </div>
          )}
        </div>
      </div>

      {/* Modale conditionnelle — s'affiche seulement si showModal = true */}
      {showModal && <PlanifierModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ============================================================
//  COMPOSANT : PlaceholderView — page temporaire "à développer"
// ============================================================
function PlaceholderView({ title, subtitle }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "55vh", gap: 12, textAlign: "center",
    }}>
      <div style={{ fontSize: 50 }}>🚧</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#2d2d4e", fontFamily: "'Syne',sans-serif" }}>{title}</div>
      <div style={{ fontSize: 13, color: "#999", maxWidth: 280 }}>{subtitle}</div>
      <div style={{
        marginTop: 8, padding: "7px 18px",
        background: "#f4f0fb", borderRadius: 20,
        fontSize: 12, color: "#7c3aed", fontWeight: 600,
      }}>À développer ✏️</div>
    </div>
  );
}

// ============================================================
//  COMPOSANT : Sidebar — navigation latérale
//  Sur mobile : se transforme en "drawer" (panneau glissant)
// ============================================================
function Sidebar({ active, onNav, open, onClose }) {
  const w        = useWindowWidth();
  const isMobile = w < BP.tablet;

  return (
    <>
      {/* Fond semi-transparent derrière la sidebar (mobile uniquement) */}
      {isMobile && open && (
        <div onClick={onClose} style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,.35)", zIndex: 98,
        }} />
      )}

      <aside style={{
        // Sur mobile : position fixed + glissement horizontal
        position:  isMobile ? "fixed" : "sticky",
        top: 0, left: 0,
        transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "none",
        transition: "transform .28s cubic-bezier(.4,0,.2,1)",
        zIndex: 99,
        width: 220, background: "#fff",
        borderRight: "1px solid #f0edf8",
        display: "flex", flexDirection: "column",
        padding: "20px 0", height: "100vh",
        flexShrink: 0, overflowY: "auto",
      }}>

        {/* Logo */}
        <div style={{ padding: "0 18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#7c3aed,#c8f000)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: "#fff", fontFamily: "'Syne',sans-serif" }}>M</span>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", fontFamily: "'Syne',sans-serif" }}>My</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: "#2d2d4e", lineHeight: 1.3 }}>Multimedia<br />Interface</div>
            </div>
          </div>
          {/* Bouton × pour fermer sur mobile */}
          {isMobile && (
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}>
              <Svg d={IC.x} size={20} />
            </button>
          )}
        </div>

        {/* Liens de navigation */}
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id}
                onClick={() => { onNav(item.id); if (isMobile) onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 11,
                  width: "100%", padding: "10px 12px", borderRadius: 12,
                  background: isActive ? "#f0ebff" : "none",
                  border: "none",
                  borderLeft: isActive ? "3px solid #7c3aed" : "3px solid transparent",
                  cursor: "pointer", textAlign: "left",
                  color: isActive ? "#7c3aed" : "#666",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 13, marginBottom: 3,
                  transition: "all .15s",
                }}>
                <Svg d={IC[item.icon]} size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Avatar prof en bas */}
        <div style={{ padding: "16px 18px 0", borderTop: "1px solid #f0edf8", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
            }}>S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2d2d4e" }}>Prof. Sanchez</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>Enseignant MMI</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ============================================================
//  COMPOSANT RACINE : App
//  C'est le point d'entrée de toute l'application.
//  Dans un vrai projet avec React Router tu mettras tes routes ici.
// ============================================================
export default function TeacherDashboard() {
  const [activePage,      setActivePage     ] = useState("dashboard");
  const [sidebarOpen,     setSidebarOpen    ] = useState(false);

  const w        = useWindowWidth();
  const isMobile = w < BP.tablet;

  // Association page → composant
  // Remplace PlaceholderView par tes vrais composants au fur et à mesure
  const VIEWS = {
    dashboard: <DashboardView />,
    saes:      <PlaceholderView title="Liste des SAE"               subtitle="Vue globale de toutes les SAE par semestre" />,
    students:  <PlaceholderView title="Étudiants"                   subtitle="Gestion des étudiants et groupes" />,
    announce:  <PlaceholderView title="Mes annonces"                subtitle="Publier et gérer vos annonces" />,
    messages:  <PlaceholderView title="Messagerie"                  subtitle="Lire et répondre aux messages étudiants" />,
    validate:  <PlaceholderView title="Validation des publications" subtitle="Valider les rendus et livrables" />,
    settings:  <PlaceholderView title="Paramètres"                  subtitle="Gérer votre compte et préférences" />,
  };

  const activeLabel = NAV_ITEMS.find(n => n.id === activePage)?.label ?? "";

  return (
    <>
      {/* Styles globaux — injectés dans le <head> du document */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html,body,#root { height:100%; }
        body { font-family:'DM Sans',sans-serif; background:#f8f6fc; }
        button,input,textarea { font-family:'DM Sans',sans-serif; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#d1c4f5; border-radius:3px; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Sidebar */}
        <Sidebar
          active={activePage}
          onNav={setActivePage}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Zone de contenu principale */}
        <main style={{
          flex: 1, overflowY: "auto", minWidth: 0,
          padding: isMobile ? "18px 14px" : "28px 30px",
        }}>

          {/* En-tête de page */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isMobile ? 20 : 28, gap: 10,
          }}>

            {/* Bouton burger — visible sur mobile uniquement */}
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} style={{
                background: "#fff", border: "none", borderRadius: 12,
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,.08)",
                color: "#7c3aed", flexShrink: 0,
              }}>
                <Svg d={IC.menu} size={20} />
              </button>
            )}

            {/* Titre + sous-titre */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: isMobile ? 18 : 24,
                fontWeight: 900, color: "#1a1a2e",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {activeLabel}
              </h1>
              <p style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>
                Semestre 4 — BUT2 MMI · 2024–2025
              </p>
            </div>

            {/* Cloche de notifications */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#7c3aed",
              }}>
                <Svg d={IC.bell} size={18} />
              </div>
              <span style={{
                position: "absolute", top: -5, right: -5,
                background: "#c8f000", color: "#1a1a2e", borderRadius: "50%",
                width: 18, height: 18, fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>6</span>
            </div>
          </div>

          {/* Vue active */}
          {VIEWS[activePage]}
        </main>
      </div>
    </>
  );
}