import { useState } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { Svg, IC } from "../../components/common/Icons"
import { MESSAGES } from "../../data/mockData"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

export default function StudentMessaging() {
  const [selected, setSelected] = useState(MESSAGES[0])
  const [reply, setReply] = useState("")
  const w = useWindowWidth()
  const isMobile = w < BP.tablet

  return (
    <PageLayoutStudent title="Messagerie">
      <div style={{ display: "flex", gap: 16, height: "calc(100vh - 160px)" }}>

        {/* ── Liste des conversations ── */}
        {(!isMobile || !selected) && (
          <div style={{
            width: isMobile ? "100%" : 280,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,.06)",
            overflowY: "auto",
          }}>
            <div style={{
              padding: "16px",
              fontWeight: 800
            }}>
              Conversations
            </div>

            {MESSAGES.map(m => (
              <div
                key={m.id}
                onClick={() => setSelected(m)}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  background: selected?.id === m.id ? "#f4f0fb" : "none",
                  borderLeft: selected?.id === m.id ? "3px solid #7c3aed" : "transparent",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#7c3aed",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}>
                    {m.name.charAt(0)}
                  </div>

                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{m.date}</div>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                  {m.preview}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Conversation ── */}
        {selected && (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,.06)"
          }}>

            {/* Header */}
            <div style={{
              padding: 16,
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              {isMobile && (
                <button onClick={() => setSelected(null)}>
                  ←
                </button>
              )}

              <div style={{ fontWeight: 700 }}>
                {selected.name}
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}>

              {/* Message reçu */}
              <div style={{
                background: "#f4f0fb",
                padding: 10,
                borderRadius: 10,
                maxWidth: "70%"
              }}>
                {selected.preview}
              </div>

              {/* Message envoyé */}
              <div style={{
                background: "#7c3aed",
                color: "#fff",
                padding: 10,
                borderRadius: 10,
                maxWidth: "70%",
                alignSelf: "flex-end"
              }}>
                Réponse envoyée
              </div>

            </div>

            {/* Input */}
            <div style={{
              padding: 12,
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 10
            }}>
              <input
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Écrire un message..."
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd"
                }}
              />

              <button
                onClick={() => {
                  alert("Message envoyé !")
                  setReply("")
                }}
                style={{
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "0 16px",
                  cursor: "pointer"
                }}
              >
                Envoyer
              </button>
            </div>

          </div>
        )}
      </div>
    </PageLayoutStudent>
  )
}