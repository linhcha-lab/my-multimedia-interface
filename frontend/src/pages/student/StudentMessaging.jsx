// ============================================================
//  pages/student/StudentMessaging.jsx — Messagerie étudiant
//  Même fonctionnalités que la vue prof :
//  + Recherche contacts
//  + Bouton nouvelle conversation
//  + Filtre Tous / Étudiants / Professeurs
// ============================================================

import { useState, useRef, useEffect } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { Svg, IC } from "../../components/common/Icons"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Mock conversations de l'étudiant ─────────────────────────
const CONVERSATIONS_INITIALES = [
  { id: 1, name: "Prof. Lemaire",      role: "prof",     date: "Aujourd'hui",  unread: true,  preview: "Votre rendu a bien été reçu, je vous fais un retour vendredi." },
  { id: 2, name: "Prof. Beaumont",     role: "prof",     date: "Hier",         unread: true,  preview: "Pensez à vérifier les consignes de la SAE 403 avant de rendre." },
  { id: 3, name: "Linh Chassang",      role: "etudiant", date: "Lun. 24 mars", unread: false, preview: "T'as avancé sur la partie API toi ?" },
  { id: 4, name: "Marine Boyer",       role: "etudiant", date: "Ven. 21 mars", unread: false, preview: "On se retrouve en salle 204 demain à 9h ?" },
  { id: 5, name: "Prof. Garnier",      role: "prof",     date: "Mer. 19 mars", unread: false, preview: "Très bon travail sur la maquette, continuez comme ça." },
  { id: 6, name: "Tom Durand",         role: "etudiant", date: "Mar. 18 mars", unread: false, preview: "J'ai partagé le repo Git, tu peux y accéder maintenant." },
  { id: 7, name: "Clémentine Fraise",  role: "etudiant", date: "Lun. 17 mars", unread: false, preview: "On a fini les maquettes, je les envoie au prof ce soir." },
]

// Contacts disponibles pour une nouvelle conversation
const CONTACTS = [
  { id: 101, name: "Prof. Villeneuve", role: "prof"     },
  { id: 102, name: "Prof. Dupont",     role: "prof"     },
  { id: 103, name: "Alisson Lappp",    role: "etudiant" },
  { id: 104, name: "Perrine Blois",    role: "etudiant" },
  { id: 105, name: "Jade Morel",       role: "etudiant" },
  { id: 106, name: "Karim Bensaid",    role: "etudiant" },
]

// ── Helpers ───────────────────────────────────────────────────
const roleLabel = (role) => role === "prof" ? "Professeur" : "Étudiant MMI"
const roleColor = (role) => role === "prof" ? "#0369a1"    : "#7c3aed"
const roleBg    = (role) => role === "prof" ? "#e0f2fe"    : "#f0ebff"

function Avatar({ name, role, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: role === "prof"
        ? "linear-gradient(135deg,#0369a1,#0ea5e9)"
        : "linear-gradient(135deg,#7c3aed,#9d5cf5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36,
    }}>
      {name.charAt(0)}
    </div>
  )
}

// ── Modale nouvelle conversation ──────────────────────────────
function NouvelleConvModal({ onClose, onStart, existingNames }) {
  const [search, setSearch] = useState("")
  const inputRef = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])

  const tous = [...CONVERSATIONS_INITIALES, ...CONTACTS]
    .filter(c => !existingNames.has(c.name))
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(26,26,46,.5)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, width: "100%", maxWidth: 420,
          boxShadow: "0 24px 60px rgba(0,0,0,.2)", overflow: "hidden",
        }}
      >
        {/* Header modale */}
        <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #f0edf8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "'Payton One',sans-serif", fontWeight: 800, fontSize: 16, color: "#1a1a2e", margin: 0 }}>
            Nouvelle conversation
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 22, lineHeight: 1 }}>×</button>
        </div>

        {/* Recherche dans la modale */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0edf8" }}>
          <div style={{ position: "relative" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Rechercher un contact…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10,
                border: "1.5px solid #e0daf5", fontSize: 13, outline: "none",
                fontFamily: "Plus Jakarta Sans", boxSizing: "border-box", color: "#2d2d4e",
              }}
            />
          </div>
        </div>

        {/* Liste contacts */}
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {tous.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 20px", color: "#bbb", fontSize: 13 }}>
              Aucun contact trouvé
            </div>
          ) : (
            tous.map(c => (
              <div
                key={c.id ?? c.name}
                onClick={() => onStart(c)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", transition: "background .12s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8f6fc"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <Avatar name={c.name} role={c.role} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{c.name}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: roleBg(c.role), color: roleColor(c.role) }}>
                    {roleLabel(c.role)}
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function StudentMessaging() {
  const w        = useWindowWidth()
  const isMobile = w < BP.tablet

  const [conversations, setConversations] = useState(
    CONVERSATIONS_INITIALES.map(c => ({
      ...c,
      messages: [
        { id: 1, from: "them", text: c.preview, time: c.date },
        { id: 2, from: "me",   text: "OK merci pour l'info !", time: "10:32" },
      ],
    }))
  )

  const [selected,  setSelected ] = useState(conversations[0])
  const [reply,     setReply    ] = useState("")
  const [search,    setSearch   ] = useState("")
  const [filtre,    setFiltre   ] = useState("tous")
  const [showModal, setShowModal] = useState(false)

  const messagesEndRef = useRef()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selected?.messages?.length])

  // ── Conversations filtrées + recherche ────────────────────
  const convFiltrees = conversations
    .filter(c => filtre === "tous" || c.role === filtre)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  // ── Envoyer un message ────────────────────────────────────
  const handleSend = () => {
    if (!reply.trim() || !selected) return
    const newMsg = { id: Date.now(), from: "me", text: reply.trim(), time: "maintenant" }
    setConversations(prev => prev.map(c =>
      c.id === selected.id
        ? { ...c, messages: [...c.messages, newMsg], preview: reply.trim(), unread: false }
        : c
    ))
    setSelected(prev => ({ ...prev, messages: [...prev.messages, newMsg] }))
    setReply("")
  }

  // ── Sélectionner une conversation ────────────────────────
  const handleSelect = (conv) => {
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: false } : c))
    setSelected({ ...conv, unread: false })
  }

  // ── Nouvelle conversation ─────────────────────────────────
  const handleNouvelleConv = (contact) => {
    const existante = conversations.find(c => c.name === contact.name)
    if (existante) {
      handleSelect(existante)
    } else {
      const nouvelle = {
        id: Date.now(), name: contact.name, role: contact.role,
        date: "maintenant", unread: false, preview: "", messages: [],
      }
      setConversations(prev => [nouvelle, ...prev])
      setSelected(nouvelle)
    }
    setShowModal(false)
  }

  const existingNames = new Set(conversations.map(c => c.name))
  const nbUnread = conversations.filter(c => c.unread).length

  return (
    <PageLayoutStudent title="Messagerie">
      <div style={{ display: "flex", gap: 16, height: "calc(100vh - 160px)" }}>

        {/* ════════════════════════════════
            COLONNE GAUCHE
        ════════════════════════════════ */}
        {(!isMobile || !selected) && (
          <div style={{
            width: isMobile ? "100%" : 300, flexShrink: 0,
            background: "#fff", borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,.06)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>

            {/* En-tête */}
            <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0edf8" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Payton One',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>
                    Conversations
                  </span>
                  {nbUnread > 0 && (
                    <span style={{ background: "#7c3aed", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>
                      {nbUnread}
                    </span>
                  )}
                </div>

                {/* Bouton nouvelle conversation */}
                <button
                  onClick={() => setShowModal(true)}
                  title="Nouvelle conversation"
                  style={{
                    width: 32, height: 32, borderRadius: 9,
                    border: "none", background: "#7c3aed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "background .15s", flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#5b21b6"}
                  onMouseLeave={e => e.currentTarget.style.background = "#7c3aed"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>

              {/* Barre de recherche */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 10px 8px 30px", borderRadius: 9,
                    border: "1.5px solid #e0daf5", fontSize: 12, outline: "none",
                    fontFamily: "Plus Jakarta Sans", color: "#2d2d4e", boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#7c3aed"}
                  onBlur={e => e.target.style.borderColor = "#e0daf5"}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 16, lineHeight: 1 }}>×</button>
                )}
              </div>

              {/* Filtres */}
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { key: "tous",     label: "Tous"      },
                  { key: "prof",     label: "Profs"     },
                  { key: "etudiant", label: "Étudiants" },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFiltre(f.key)}
                    style={{
                      flex: 1, padding: "6px 4px", borderRadius: 8,
                      border: "none", fontSize: 11, fontWeight: 600,
                      cursor: "pointer", transition: "all .15s", fontFamily: "Plus Jakarta Sans",
                      background: filtre === f.key ? "#7c3aed" : "#f4f0fb",
                      color:      filtre === f.key ? "#fff"    : "#7c3aed",
                    }}
                  >
                    {f.label}
                    {f.key !== "tous" && (
                      <span style={{
                        marginLeft: 4, fontSize: 9, fontWeight: 700,
                        background: filtre === f.key ? "rgba(255,255,255,.25)" : "rgba(124,58,237,.12)",
                        padding: "1px 5px", borderRadius: 10,
                      }}>
                        {conversations.filter(c => c.role === f.key).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste conversations */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {convFiltrees.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 16px", color: "#bbb", fontSize: 12 }}>
                  {search ? `Aucun résultat pour "${search}"` : "Aucune conversation"}
                </div>
              ) : (
                convFiltrees.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    style={{
                      padding: "12px 14px", cursor: "pointer",
                      background: selected?.id === c.id ? "#f4f0fb" : "none",
                      borderLeft: selected?.id === c.id ? "3px solid #7c3aed" : "3px solid transparent",
                      transition: "all .15s",
                    }}
                    onMouseEnter={e => { if (selected?.id !== c.id) e.currentTarget.style.background = "#faf8ff" }}
                    onMouseLeave={e => { if (selected?.id !== c.id) e.currentTarget.style.background = "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <Avatar name={c.name} role={c.role} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: c.unread ? 700 : 500, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {c.name}
                          </span>
                          <span style={{ fontSize: 10, color: "#bbb", flexShrink: 0 }}>{c.date}</span>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 20, background: roleBg(c.role), color: roleColor(c.role) }}>
                          {roleLabel(c.role)}
                        </span>
                      </div>
                      {c.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: 46 }}>
                      {c.preview || "Démarrer la conversation…"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            COLONNE DROITE — messages
        ════════════════════════════════ */}
        {selected ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,.06)", overflow: "hidden", minWidth: 0 }}>

            {/* En-tête conversation */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0edf8", display: "flex", alignItems: "center", gap: 12 }}>
              {isMobile && (
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", flexShrink: 0 }}>
                  <Svg d={IC.arrow} size={20} />
                </button>
              )}
              <Avatar name={selected.name} role={selected.role} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{selected.name}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: roleBg(selected.role), color: roleColor(selected.role) }}>
                  {roleLabel(selected.role)}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "20px 20px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {selected.messages.length === 0 ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#bbb", gap: 10 }}>
                  <div style={{ fontSize: 36 }}>💬</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Démarrez la conversation avec {selected.name}</div>
                </div>
              ) : (
                selected.messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex", gap: 8,
                      maxWidth: "76%",
                      alignSelf: msg.from === "me" ? "flex-end" : "flex-start",
                      flexDirection: msg.from === "me" ? "row-reverse" : "row",
                    }}
                  >
                    <Avatar
                      name={msg.from === "me" ? "S" : selected.name}
                      role={msg.from === "me" ? "etudiant" : selected.role}
                      size={30}
                    />
                    <div>
                      <div style={{
                        background: msg.from === "me" ? "#7c3aed" : "#f4f0fb",
                        color:      msg.from === "me" ? "#fff"    : "#2d2d4e",
                        padding: "10px 14px",
                        borderRadius: msg.from === "me" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                        fontSize: 13, lineHeight: 1.55,
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: "#bbb", marginTop: 4, textAlign: msg.from === "me" ? "right" : "left" }}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone saisie */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0edf8", display: "flex", gap: 10, alignItems: "flex-end" }}>
              <input
                type="text"
                placeholder={`Écrire à ${selected.name}…`}
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 12,
                  border: "1.5px solid #e0daf5", fontSize: 13,
                  outline: "none", fontFamily: "Plus Jakarta Sans", color: "#2d2d4e",
                  transition: "border-color .15s",
                }}
                onFocus={e => e.target.style.borderColor = "#7c3aed"}
                onBlur={e => e.target.style.borderColor = "#e0daf5"}
              />
              <button
                onClick={handleSend}
                disabled={!reply.trim()}
                style={{
                  width: 42, height: 42, borderRadius: 12, border: "none",
                  background: reply.trim() ? "linear-gradient(135deg,#7c3aed,#9d5cf5)" : "#e0daf5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: reply.trim() ? "pointer" : "not-allowed",
                  flexShrink: 0, transition: "background .15s",
                }}
              >
                <Svg d={IC.send} size={18} color={reply.trim() ? "#fff" : "#bbb"} />
              </button>
            </div>
          </div>
        ) : (
          !isMobile && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,.06)", color: "#bbb", gap: 14 }}>
              <div style={{ fontSize: 48 }}>💬</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>Sélectionne une conversation</div>
              <div style={{ fontSize: 13, color: "#bbb" }}>ou crée-en une nouvelle</div>
              <button onClick={() => setShowModal(true)} style={{ marginTop: 8, padding: "10px 22px", borderRadius: 10, border: "none", background: "#7c3aed", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Plus Jakarta Sans" }}>
                + Nouvelle conversation
              </button>
            </div>
          )
        )}
      </div>

      {/* Modale nouvelle conversation */}
      {showModal && (
        <NouvelleConvModal
          onClose={() => setShowModal(false)}
          onStart={handleNouvelleConv}
          existingNames={existingNames}
        />
      )}
    </PageLayoutStudent>
  )
}