// ============================================================
//  Modal.jsx — Fenêtre modale réutilisable
//
//  Props :
//    onClose   (function) → appelée quand on ferme
//    title     (string)   → titre de la modale
//    children  (JSX)      → contenu de la modale
//
//  Utilisation :
//    <Modal title="Créer une SAE" onClose={() => setOpen(false)}>
//      <p>Contenu ici</p>
//    </Modal>
// ============================================================

export default function Modal({ onClose, title, children }) {
  return (
    // Fond semi-transparent — clic dessus = ferme la modale
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(26,26,46,.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
        padding: 16,
      }}
    >
      {/* Carte blanche — stopPropagation = le clic ne traverse pas vers le fond */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: 34,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 30px 80px rgba(0,0,0,.2)",
        }}
      >
        {/* En-tête de la modale */}
        {title && (
          <h2 style={{
            margin: "0 0 22px",
            fontFamily: "'Syne', sans-serif",
            color: "#1a1a2e",
            fontSize: 22,
          }}>
            {title}
          </h2>
        )}
        {/* Contenu passé via children */}
        {children}
      </div>
    </div>
  );
}
