
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { Svg, IC } from "../../components/common/Icons"


export default function SAEDetailStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [tab, setTab] = useState("apercu")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [detail, setDetail] = useState(null)
  const [taches, setTaches] = useState([])
  const [uploads, setUploads] = useState({})

  /////////////////////////////////////////////////////////////
  // 🔥 FETCH BACK
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(`http://localhost:8000/api/student/sae/${id}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        return res.json()
      })
      .then(data => {

        const mapped = {
          code: data.code,
          title: data.title,
          description: data.description,

          statut:
            data.status === "in_progress" ? "En cours" :
            data.status === "completed"   ? "Terminé"  :
            "À venir",

          dateLimite: new Date(data.dateLimite).toLocaleDateString("fr-FR"),

          taches: data.taches,
          livrables: data.livrables,
          ressources: data.ressources,
          annonces: data.annonces,
        }

        setDetail(mapped)
        setTaches(data.taches || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  /////////////////////////////////////////////////////////////
  // 🔥 TOGGLE API
  /////////////////////////////////////////////////////////////
const toggleTache = async (tacheId) => {
  const token = localStorage.getItem("token")

  // 🔥 1. update immédiat (UX fluide)
  setTaches(prev =>
    prev.map(t =>
      t.id === tacheId
        ? { ...t, done: !t.done }
        : t
    )
  )

  try {
    const res = await fetch(`http://localhost:8000/api/student/task/${tacheId}/toggle`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await res.json()

    // 🔥 2. sync avec le backend (sécurité)
    setTaches(prev =>
      prev.map(t =>
        t.id === tacheId
          ? { ...t, done: data.done }
          : t
      )
    )

  } catch (e) {
    console.error(e)
  }
}

/////////////////////////////////////////////////////////////
// 🔥 UPLOAD FILE
/////////////////////////////////////////////////////////////
const uploadFile = async (submissionId) => {
  const token = localStorage.getItem("token")
  const file = uploads[submissionId]?.file

  if (!file) return

  const formData = new FormData()
  formData.append("file", file)

  try {
    const res = await fetch(`http://localhost:8000/api/submissions/${submissionId}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error)

    setUploads(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        uploaded: true,
        filename: data.file
      }
    }))

  } catch (e) {
    console.error(e)
  }
}


  /////////////////////////////////////////////////////////////
  // 🔥 PROGRESSION
  /////////////////////////////////////////////////////////////
  const progression = taches.length > 0
    ? Math.round((taches.filter(t => t.done).length / taches.length) * 100)
    : 0

  /////////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////////
  if (loading) {
    return (
      <PageLayoutStudent>
        <div style={{ padding:40 }}>Chargement...</div>
      </PageLayoutStudent>
    )
  }

  if (error || !detail) {
    return (
      <PageLayoutStudent>
        <div style={{ padding:40, color:"red" }}>{error}</div>
      </PageLayoutStudent>
    )
  }

  /////////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////////
  return (
    <PageLayoutStudent title="">

      {/* HEADER */}
      <div style={{ background:"#7c3aed", borderRadius:"16px 16px 0 0", padding:"14px 28px 0" }}>
        <button
          onClick={() => navigate("/student/saes")}
          style={{
            display:"flex",
            alignItems:"center",
            gap:6,
            background:"none",
            border:"none",
            cursor:"pointer",
            color:"rgba(255,255,255,.4)",
            fontSize:12
          }}
        >
          <Svg d={IC.arrow} size={14} color="rgba(255,255,255,.4)" />
          Retour à mes SAE
        </button>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <h1 style={{
            fontFamily:"'Paytone One',sans-serif",
            fontSize:28,
            color:"#E5FF3C"
          }}>
            {detail.code} — {detail.title}
          </h1>

          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:60, height:5, background:"rgba(255,255,255,.2)", borderRadius:3 }}>
              <div style={{
                height:"100%",
                width:`${progression}%`,
                background:"#c8f000"
              }} />
            </div>
            <span style={{ color:"#c8f000", fontWeight:700 }}>
              {progression}%
            </span>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display:"flex", gap:20 }}>
          {["apercu","taches","ressources","depots","annonces"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background:"none",
                border:"none",
                color: tab===t ? "#fff" : "rgba(255,255,255,.5)",
                borderBottom: tab===t ? "3px solid #221A47" : "none",
                padding:"12px 0",
                cursor:"pointer"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ background:"#fff", padding:28 }}>

        {/* APERCU */}
        {tab === "apercu" && (
          <>
            <h2>Aperçu du projet</h2>

            <div style={{ background:"#F5F4F1", padding:20, marginBottom:20 }}>
              <strong>Description</strong>
              <p>{detail.description}</p>
            </div>

            <div style={{ background:"#F5F4F1", padding:20 }}>
              <p>Statut : {detail.statut}</p>
              <p>Date limite : {detail.dateLimite}</p>
              <p>Progression : {progression}%</p>
            </div>
          </>
        )}

        {/* TACHES */}
        {tab === "taches" && (
          <>
            {taches.map(t => (
              <div
                key={t.id}
                onClick={() => toggleTache(t.id)}
                style={{
                  padding:12,
                  marginBottom:10,
                  background: t.done ? "#dcfce7" : "#F5F4F1",
                  cursor:"pointer",
                  display:"flex",
                  alignItems:"center",
                  gap:12
                }}
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTache(t.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width:18, height:18 }}
                />

                <span style={{
                  textDecoration: t.done ? "line-through" : "none",
                  opacity: t.done ? 0.6 : 1
                }}>
                  {t.label}
                </span>

                <span style={{
                  marginLeft:"auto",
                  fontSize:12,
                  fontWeight:600,
                  color: t.done ? "#16a34a" : "#aaa"
                }}>
                  {t.done ? "Terminé ✓" : "À faire"}
                </span>
              </div>
            ))}
          </>
        )}

        {/* RESSOURCES */}
        {tab === "ressources" && (
          detail.ressources.map(r => (
            <div key={r.id}>{r.nom}</div>
          ))
        )}

        {/* DEPOTS */}
{tab === "depots" && (
  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
    
    {detail.livrables.map(l => {
      const current = uploads[l.id]

      return (
        <div
          key={l.id}
          style={{
            background:"#F5F4F1",
            padding:20,
            borderRadius:16
          }}
        >
          {/* TITLE */}
          <div style={{ fontWeight:700, marginBottom:10 }}>
            {l.label}
          </div>

          {/* DROP ZONE */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (!file) return

              setUploads(prev => ({
                ...prev,
                [l.id]: { file, uploaded:false }
              }))
            }}
            style={{
              border:"2px dashed #ccc",
              borderRadius:12,
              padding:30,
              textAlign:"center",
              background:"#fff"
            }}
          >
            {!current?.file && "📂 Glisse un fichier ou sélectionne"}

            {/* FILE INPUT */}
            <input
              type="file"
              style={{ marginTop:10 }}
              onChange={(e) => {
                const file = e.target.files[0]
                if (!file) return

                setUploads(prev => ({
                  ...prev,
                  [l.id]: { file, uploaded:false }
                }))
              }}
            />

            {/* FILE PREVIEW */}
            {current?.file && (
              <div style={{
                marginTop:15,
                padding:10,
                background:"#eee",
                borderRadius:8
              }}>
                📄 {current.file.name}
              </div>
            )}

            {/* UPLOADED SUCCESS */}
            {current?.uploaded && (
              <div style={{
                marginTop:10,
                color:"green",
                fontWeight:600
              }}>
                ✔ Fichier envoyé
              </div>
            )}

            {/* BUTTON */}
            {current?.file && !current?.uploaded && (
              <button
                onClick={() => uploadFile(l.id)}
                style={{
                  marginTop:15,
                  padding:"8px 16px",
                  background:"#7c3aed",
                  color:"#fff",
                  border:"none",
                  borderRadius:8,
                  cursor:"pointer"
                }}
              >
                Envoyer
              </button>
            )}

          </div>
        </div>
      )
    })}

  </div>
)}

        {/* ANNONCES */}
        {tab === "annonces" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {detail.annonces.map(a => (
              <div
                key={a.id}
                style={{
                  display:"flex",
                  background:"#F5F4F1",
                  borderRadius:16,
                  boxShadow:"0 2px 10px rgba(0,0,0,.06)",
                  overflow:"hidden"
                }}
              >
                <div style={{ width:6, background:"#7c3aed" }} />

                <div style={{
                  flex:1,
                  padding:"18px 20px",
                  display:"flex",
                  justifyContent:"space-between",
                  gap:20,
                  flexWrap:"wrap"
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{
                      fontSize:11,
                      color:"#7c3aed",
                      fontWeight:700,
                      marginBottom:4
                    }}>
                      {detail.code} · {new Date(a.date).toLocaleDateString("fr-FR")}
                    </div>

                    <div style={{
                      fontSize:15,
                      fontWeight:700,
                      color:"#221A47",
                      marginBottom:6
                    }}>
                      {a.titre}
                    </div>

                    <div style={{
                      fontSize:13,
                      color:"#444",
                      lineHeight:1.6
                    }}>
                      {a.contenu}
                    </div>

                    {a.prof && (
                      <div style={{
                        marginTop:8,
                        fontSize:11,
                        color:"#999"
                      }}>
                        Par {a.prof}
                      </div>
                    )}
                  </div>

                   
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </PageLayoutStudent>
  )
}
