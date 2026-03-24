// ============================================================
//  pages/teacher/Messaging.jsx — Messagerie
// ============================================================

import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { Svg, IC } from "../../components/common/Icons";
import { MESSAGES } from "../../data/mockData";
import { useWindowWidth, BP } from "../../hooks/useWindowWidth";

export default function Messaging() {
  const [selected, setSelected] = useState(MESSAGES[0]);
  const [reply,    setReply   ] = useState("");
  const w        = useWindowWidth();
  const isMobile = w < BP.tablet;

  return (
    <PageLayout title="Messagerie">
      <div style={{ display: "flex", gap: 16, height: "calc(100vh - 160px)" }}>

        {/* ── Liste des conversations ── */}
        {(!isMobile || !selected) && (
          <div style={{
            width: isMobile ? "100%" : 280, flexShrink: 0,
            background: "#fff", borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,.06)",
            overflowY: "auto",
          }}>
            <div style={{ padding: "16px 16px 8px", fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>
              Conversations
            </div>
            {MESSAGES.map(m => (
              <div key={m.id} onClick={() => setSelected(m)} style={{
                padding: "12px 16px", cursor: "pointer",
                background: selected?.id === m.id ? "#f4f0fb" : "none",
                borderLeft: selected?.id === m.id ? "3px solid #7c3aed" : "3px solid transparent",
                transition: "all .15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 13,
                  }}>
                    {m.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{m.date}</div>
                  </div>
                  {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: 46 }}>
                  {m.preview}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Fil de conversation ── */}
        {selected && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,.06)", overflow: "hidden" }}>
            {/* En-tête conversation */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0edf8", display: "flex", alignItems: "center", gap: 12 }}>
              {isMobile && (
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed" }}>
                  <Svg d={IC.arrow} size={20} />
                </button>
              )}
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
                {selected.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Étudiant MMI – S4</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Message de l'étudiant */}
              <div style={{ display: "flex", gap: 10, maxWidth: "80%" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0ebff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>
                  {selected.name.charAt(0)}
                </div>
                <div style={{ background: "#f4f0fb", padding: "10px 14px", borderRadius: "4px 14px 14px 14px", fontSize: 13, color: "#2d2d4e", lineHeight: 1.5 }}>
                  {selected.preview}
                </div>
              </div>
              {/* Réponse fictive du prof */}
              <div style={{ display: "flex", gap: 10, maxWidth: "80%", alignSelf: "flex-end", flexDirection: "row-reverse" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  S
                </div>
                <div style={{ background: "#7c3aed", padding: "10px 14px", borderRadius: "14px 4px 14px 14px", fontSize: 13, color: "#fff", lineHeight: 1.5 }}>
                  Bonjour, je regarde ça et je reviens vers vous rapidement.
                </div>
              </div>
            </div>

            {/* Zone de réponse */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0edf8", display: "flex", gap: 10 }}>
              <input
                type="text"
                placeholder="Écrire une réponse…"
                value={reply}
                onChange={e => setReply(e.target.value)}
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 12,
                  border: "1.5px solid #e0daf5", fontSize: 13,
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <button onClick={() => { alert("Message envoyé ! (connecte Symfony)"); setReply(""); }} style={{
                width: 42, height: 42, borderRadius: 12, border: "none",
                background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}>
                <Svg d={IC.send} size={18} color="#fff" />
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
