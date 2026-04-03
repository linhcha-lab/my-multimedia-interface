import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"

const API = "http://localhost:8000/api"

export default function PublierSAE() {
  const navigate = useNavigate()

  // ================= STATE =================
  const [saes, setSaes] = useState([])
  const [semestre, setSemestre] = useState(null)
  const [sae, setSae] = useState(null)

  const [titre, setTitre] = useState("")
  const [description, setDescription] = useState("")
  const [categorie, setCategorie] = useState(null)

  const [bgHue, setBgHue] = useState(180)
  const [textHue, setTextHue] = useState(0)

  const [photoMain, setPhotoMain] = useState(null)
  const [photos, setPhotos] = useState([null, null, null, null])

  const [pdfs, setPdfs] = useState([])
  const pdfRef = useRef()

  // ================= FETCH =================
  useEffect(() => {
    const fetchSaes = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${API}/student/sae`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json()

        console.log("✅ SAE API :", data)

        setSaes(Array.isArray(data) ? data : [])

      } catch (err) {
        console.error(err)
        setSaes([])
      }
    }

    fetchSaes()
  }, [])

  // ⚠️ TON BACK N'A PAS semester → on enlève filtre sinon ça casse tout
  const saesFiltrees = semestre
    ? saes // 🔥 temporaire (sinon vide)
    : saes

  // ================= HELPERS =================
  const hsl = (h) => `hsl(${h},85%,52%)`

  // ================= IMAGES =================
  const handleMain = (f) => setPhotoMain(f)

  const handleSecond = (i, f) => {
    const copy = [...photos]
    copy[i] = f
    setPhotos(copy)
  }

  // ================= PDF =================
  const handlePdf = (e) => {
    const files = Array.from(e.target.files)
    setPdfs(prev => [...prev, ...files])
  }

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token")

      const formData = new FormData()

      formData.append("title", titre)
      formData.append("description", description)
      formData.append("backgroundColor", hsl(bgHue))
      formData.append("textColor", hsl(textHue))
      formData.append("sae_id", sae)

      // 🔥 IMAGES
      if (photoMain) formData.append("images[]", photoMain)
      photos.forEach(p => {
        if (p) formData.append("images[]", p)
      })

      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!res.ok) {
        throw new Error("Erreur publication")
      }

      const data = await res.json()
      console.log("✅ Projet créé :", data)

      alert("✅ Projet envoyé pour validation !")

      navigate("/etudiant/mes-projets")

    } catch (err) {
      console.error("❌ erreur :", err)
    }
  }

  // ================= UI =================
  return (
    <PageLayoutStudent title="Publier une SAE">

      <div style={{ maxWidth: 720, margin: "auto", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* CARD */}
        <div style={card}>
          <h3 style={title}>Semestre de la SAE *</h3>
          <div style={row}>
            {[1,2,3,4,5,6].map(s => (
              <Chip key={s} active={semestre === s} onClick={() => setSemestre(s)}>
                Semestre {s}
              </Chip>
            ))}
          </div>

          {semestre && (
            <>
              <h4 style={{ marginTop: 15 }}>SAE *</h4>
              <div style={row}>
                {saesFiltrees.map(s => (
                  <Chip key={s.id} active={sae === s.id} onClick={() => setSae(s.id)}>
                    {s.title || `SAE ${s.id}`}
                  </Chip>
                ))}
              </div>
            </>
          )}
        </div>

        {/* TITRE */}
        <div style={card}>
          <h3 style={title}>Titre *</h3>
          <input style={input} value={titre} onChange={e => setTitre(e.target.value)} />
        </div>

        {/* COULEURS */}
        <div style={card}>
          <h3 style={title}>Couleurs de la page *</h3>

          <Slider label="Fond" value={bgHue} set={setBgHue} />
          <Slider label="Texte" value={textHue} set={setTextHue} />

          <div style={{
            marginTop: 15,
            background: hsl(bgHue),
            color: hsl(textHue),
            padding: 15,
            borderRadius: 30,
            textAlign: "center",
            fontWeight: 700
          }}>
            {titre || "My Multimedia"}
          </div>
        </div>

        {/* PHOTOS */}
        <div style={card}>
          <h3 style={title}>Photos *</h3>

          <PhotoSlot big onChange={handleMain} file={photoMain} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {photos.map((p,i) => (
              <PhotoSlot key={i} onChange={f => handleSecond(i,f)} file={p} />
            ))}
          </div>
        </div>

        {/* CATEGORIE */}
        <div style={card}>
          <h3 style={title}>Catégorie *</h3>
          <div style={row}>
            {["Graphisme","Développement Web","UX/UI","Audiovisuel"].map(c => (
              <Chip key={c} active={categorie === c} onClick={() => setCategorie(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={card}>
          <h3 style={title}>Description *</h3>
          <textarea style={textarea} value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        {/* PDF */}
        <div style={card}>
          <h3 style={title}>Livrable PDF</h3>

          <button style={btnSmall} onClick={() => pdfRef.current.click()}>
            + Ajouter un fichier
          </button>

          <input ref={pdfRef} type="file" hidden multiple onChange={handlePdf} />

          {pdfs.map((p,i) => (
            <div key={i} style={{ marginTop: 5 }}>{p.name}</div>
          ))}
        </div>

        {/* SUBMIT */}
        <div style={{ textAlign: "center" }}>
          <button style={submit} onClick={handleSubmit}>
            Faire vérifier sa publication
          </button>
        </div>

      </div>
    </PageLayoutStudent>
  )
}

// ================= COMPONENTS =================
const Chip = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "8px 16px",
    borderRadius: 20,
    border: "1px solid #ddd",
    background: active ? "#7c3aed" : "#fff",
    color: active ? "#fff" : "#333",
    fontWeight: 600,
    cursor: "pointer"
  }}>
    {children}
  </button>
)

const Slider = ({ label, value, set }) => (
  <div style={{ marginTop: 10 }}>
    <span>{label}</span>
    <input
      type="range"
      min="0"
      max="360"
      value={value}
      onChange={e => set(Number(e.target.value))}
      style={{ width: "100%" }}
    />
  </div>
)

const PhotoSlot = ({ big, file, onChange }) => (
  <div style={{
    height: big ? 200 : 100,
    border: "2px dashed #ccc",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }}
    onClick={() => {
      const input = document.createElement("input")
      input.type = "file"
      input.onchange = e => onChange(e.target.files[0])
      input.click()
    }}
  >
    {file ? file.name : "Ajouter"}
  </div>
)

// ================= STYLES =================
const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 20,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
}

const title = {
  fontWeight: 800,
  marginBottom: 10
}

const row = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap"
}

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#f5f4f8"
}

const textarea = {
  width: "100%",
  height: 120,
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#f5f4f8"
}

const submit = {
  background: "#7c3aed",
  color: "#fff",
  padding: "15px 40px",
  borderRadius: 30,
  fontWeight: 700,
  border: "none",
  cursor: "pointer"
}

const btnSmall = {
  background: "#7c3aed",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer"
}