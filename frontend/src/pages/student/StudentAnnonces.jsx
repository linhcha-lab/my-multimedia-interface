import { useState, useEffect } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"

export default function StudentAnnonces() {
  const [annonces, setAnnonces] = useState([])

  
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:8000/api/announcements", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) throw new Error("Erreur API")

        const data = await res.json()

        
        const formatted = data.map(a => ({
          id: a.id,
          titre: a.title,
          contenu: a.content,
          sae: "SAE " + a.sae,
          date: a.createdAt,
          lue: false // par défaut
        }))

        setAnnonces(formatted)

      } catch (err) {
        console.error("Erreur chargement annonces :", err)
      }
    }

    fetchAnnonces()
  }, [])

  const marquerLue = (id) => {
    setAnnonces(prev =>
      prev.map(a => a.id === id ? { ...a, lue: true } : a)
    )
  }

  const nonLues = annonces.filter(a => !a.lue).length

  return (
    <PageLayoutStudent title="Annonces">
      {nonLues > 0 && (
        <div style={{
          background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
          borderRadius: 14,
          padding: "14px 20px",
          marginBottom: 20,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#c8f000" }}>
            {nonLues}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
            nouvelle{nonLues > 1 ? "s" : ""} annonce{nonLues > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {annonces.map(a => (
          <div key={a.id} style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,.06)",
            borderLeft: !a.lue ? "4px solid #7c3aed" : "transparent",
            opacity: a.lue ? 0.7 : 1,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 10, color: "#9d5cf5", fontWeight: 700 }}>
                  {a.sae}
                </span>
                <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8 }}>
                  {new Date(a.date).toLocaleDateString("fr-FR")}
                </span>
              </div>

              {!a.lue && (
                <button onClick={() => marquerLue(a.id)}>
                  Marquer comme lue
                </button>
              )}
            </div>

            <div style={{ fontWeight: 700 }}>{a.titre}</div>
            <div>{a.contenu}</div>
          </div>
        ))}
      </div>
    </PageLayoutStudent>
  )
}