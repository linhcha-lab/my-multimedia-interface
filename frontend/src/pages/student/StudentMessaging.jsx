import { useState, useRef, useEffect } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

function Avatar({ name, role, size = 36 }) {
return (
<div style={{
width: size,
height: size,
borderRadius: "50%",
background: role === "prof"
? "linear-gradient(135deg,#0369a1,#0ea5e9)"
: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
display: "flex",
alignItems: "center",
justifyContent: "center",
color: "#fff",
fontWeight: 700,
fontSize: size * 0.4
}}>
{name?.charAt(0)} </div>
)
}

export default function StudentMessaging() {
const w = useWindowWidth()
const isMobile = w < BP.tablet

const [conversations, setConversations] = useState([])
const [selected, setSelected] = useState(null)
const [reply, setReply] = useState("")
const [search, setSearch] = useState("")

const messagesEndRef = useRef()


const fetchMessages = () => {
const token = localStorage.getItem("token")


fetch("http://localhost:8000/api/messages", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) {
      throw new Error("Erreur API")
    }
    return res.json()
  })
  .then(data => {
    if (!Array.isArray(data)) {
      console.error("Réponse invalide :", data)
      return
    }

    const grouped = {}

    data.forEach(msg => {
  const other = msg.fromMe ? msg.receiver : msg.sender

  // 🔥 nom propre
  const fullName = `${other.firstname} ${other.lastname}`

  if (!grouped[other.id]) {
    grouped[other.id] = {
      id: other.id,
      name: fullName,
      role: "etudiant",
      messages: []
    }
  }

  grouped[other.id].messages.push({
    id: msg.id,
    from: msg.fromMe ? "me" : "them",
    text: msg.content,
    time: msg.createdAt
  })
})

    const convs = Object.values(grouped)
    setConversations(convs)

    if (convs.length > 0 && !selected) {
      setSelected(convs[0])
    }
  })
  .catch(err => console.error("Erreur fetch:", err))


}

useEffect(() => {
fetchMessages()
}, [])

useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}, [selected?.messages?.length])


const handleSend = async () => {
if (!reply.trim() || !selected) return


const token = localStorage.getItem("token")

await fetch("http://localhost:8000/api/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({
    receiver_id: selected.id,
    content: reply
  })
})

setReply("")
fetchMessages()


}

const convFiltrees = conversations.filter(c =>
c.name.toLowerCase().includes(search.toLowerCase())
)

return ( <PageLayoutStudent title="Messagerie">
<div style={{ display: "flex", gap: 16, height: "calc(100vh - 160px)" }}>

    {/* LEFT */}
    <div style={{
      width: isMobile ? "100%" : 300,
      background: "#fff",
      borderRadius: 16,
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 700 }}>Conversations</div>

        <input
          placeholder="Rechercher…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", marginTop: 10 }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {convFiltrees.map(c => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            style={{
              padding: 12,
              cursor: "pointer",
              background: selected?.id === c.id ? "#f4f0fb" : ""
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <Avatar name={c.name} role={c.role} />
              <div>
                <div>{c.name}</div>
                <div style={{ fontSize: 11, color: "#888" }}>
                  {c.messages.at(-1)?.text || "..."}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT */}
    {selected && (
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: 16
      }}>
        <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Avatar name={selected.name} role={selected.role} />
            <div>{selected.name}</div>
          </div>
        </div>

        <div style={{
          flex: 1,
          padding: 20,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>
          {selected.messages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.from === "me" ? "flex-end" : "flex-start",
                background: msg.from === "me" ? "#7c3aed" : "#f4f0fb",
                color: msg.from === "me" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: 12
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: 12, display: "flex", gap: 10 }}>
          <input
            value={reply}
            onChange={e => setReply(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            style={{ flex: 1 }}
          />
          <button onClick={handleSend}>Envoyer</button>
        </div>
      </div>
    )}
  </div>
</PageLayoutStudent>

)
}
