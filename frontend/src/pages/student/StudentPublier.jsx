// ============================================================
//  pages/etudiant/PublierSAE.jsx
//  Formulaire de publication d'une SAE
//  Dépendances : react-router-dom + PageLayoutStudent
// ============================================================

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"

// ── Styles globaux ────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ''Plus Jakarta Sans', sans-serif; background: #f5f4f8; color: #221A47; }
  button { font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; border: none; }
  input, textarea, select { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(124,58,237,.35); }
    50%      { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
  }
  @keyframes checkPop {
    0%   { transform: scale(0); }
    70%  { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .section-card { animation: fadeSlideUp .45s ease both; }
  .section-card:nth-child(1) { animation-delay: .05s; }
  .section-card:nth-child(2) { animation-delay: .12s; }
  .section-card:nth-child(3) { animation-delay: .19s; }
  .section-card:nth-child(4) { animation-delay: .26s; }
  .section-card:nth-child(5) { animation-delay: .33s; }
  .section-card:nth-child(6) { animation-delay: .40s; }
  .section-card:nth-child(7) { animation-delay: .47s; }
  .section-card:nth-child(8) { animation-delay: .54s; }

  .chip-semestre input[type=checkbox],
  .chip-sae input[type=radio],
  .chip-pdf input[type=checkbox] { display: none; }

  .chip-semestre label,
  .chip-sae label {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 18px; border-radius: 30px;
    border: 1.5px solid #ddd; background: #fff;
    font-size: 13px; font-weight: 500; color: #555;
    cursor: pointer; transition: all .18s ease;
    user-select: none; white-space: nowrap;
  }
  .chip-semestre input:checked + label,
  .chip-sae input:checked + label {
    background: #7c3aed; border-color: #7c3aed;
    color: #fff; font-weight: 700;
    box-shadow: 0 4px 14px rgba(124,58,237,.3);
  }
  .chip-semestre label:hover,
  .chip-sae label:hover { border-color: #7c3aed; color: #7c3aed; }
  .chip-semestre input:checked + label:hover,
  .chip-sae input:checked + label:hover { color: #fff; }

  .chip-check {
    width: 16px; height: 16px; border-radius: 4px;
    border: 2px solid rgba(255,255,255,.5);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 10px; transition: all .15s;
  }
  .chip-semestre input:checked + label .chip-check,
  .chip-sae input:checked + label .chip-check {
    background: rgba(255,255,255,.25); border-color: transparent;
    animation: checkPop .2s ease;
  }

  .etudiant-choice { transition: all .2s ease; }
  .etudiant-choice:hover { transform: translateY(-2px); }

  .photo-slot {
    border: 2px dashed #d0c8e8; border-radius: 12px;
    background: #faf8ff; cursor: pointer;
    transition: all .2s ease; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .photo-slot:hover { border-color: #7c3aed; background: #f0ebff; }
  .photo-slot.filled { border-style: solid; border-color: #7c3aed; }

  .pdf-item label {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 16px; border-radius: 10px;
    border: 1.5px solid #e0daf0; background: #faf8ff;
    font-size: 13px; color: #444; cursor: pointer;
    transition: all .18s;
  }
  .pdf-item input:checked + label {
    border-color: #7c3aed; background: #f0ebff; color: #5b21b6; font-weight: 600;
  }
  .pdf-item label:hover { border-color: #a78bfa; }

  input[type=range] { -webkit-appearance: none; height: 6px; border-radius: 3px; outline: none; cursor: pointer; }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 18px; height: 18px;
    border-radius: 50%; background: #fff;
    border: 2px solid #7c3aed; box-shadow: 0 2px 8px rgba(124,58,237,.4);
    cursor: pointer; transition: transform .15s;
  }
  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }

  .submit-btn {
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    color: #fff; border: none; border-radius: 40px;
    padding: 16px 52px; font-size: 16px; font-weight: 700;
    font-family: 'Syne', sans-serif; letter-spacing: .3px;
    box-shadow: 0 8px 28px rgba(124,58,237,.35);
    transition: all .2s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
  }
  .submit-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 36px rgba(124,58,237,.45); }
  .submit-btn:active { transform: scale(.98); }

  .add-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px;
    background: #7c3aed; color: #fff;
    font-size: 13px; font-weight: 600; border: none;
    cursor: pointer; transition: all .18s;
  }
  .add-btn:hover { background: #5b21b6; transform: translateY(-1px); }

  .description-textarea:focus { outline: 2px solid #7c3aed !important; }

  .error-msg { color: #ef4444; font-size: 12px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
  .required-star { color: #ef4444; font-size: 14px; }
`

// ── Constantes ────────────────────────────────────────────────
const SEMESTRES = [1, 2, 3, 4, 5, 6]

const CATEGORIES_SAE = [
  "Graphisme",
  "Développement Web",
  "UX/UI",
  "Audiovisuel",
  "Réalité Virtuelle",
  "Développement de jeu",
  "Communication",
  "Webdesign",
]

const SAE_PAR_SEMESTRE = {
  1: ["SAE 1.01", "SAE 1.02", "SAE 1.03", "SAE 1.04", "SAE 1.05", "SAE 1.06"],
  2: ["SAE 2.01", "SAE 2.02", "SAE 2.03", "SAE 2.04", "SAE 2.05", "SAE 2.06"],
  3: ["SAE 3.01", "SAE 3.02", "SAE 3.03", "SAE 3.04"],
  4: ["SAE 4.01", "SAE 4.02", "SAE 4.03"],
  5: ["SAE 5.01", "SAE 5.02", "SAE 5.03"],
  6: ["SAE 6.01", "SAE 6.02"],
}

const GROUPES = [
  { id: 1, nom: "Groupe 1", membres: ["Sarah DONSOUN", "Linh CHASSANG"] },
  { id: 2, nom: "Groupe 2", membres: ["Tom BERGER", "Alice MARTIN", "Rémi LEROUX"] },
  { id: 3, nom: "Groupe 3", membres: ["Jade MOREL", "Karim BENSAID"] },
]

const MOI = { initiale: "S", nom: "Sarah DONSOUN", prenom: "Sarah" }

// ── Helpers ───────────────────────────────────────────────────
function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function sliderToColor(val) {
  const h = Math.round(val * 3.6)
  return hslToHex(h, 85, 52)
}

// ── Composants UI ─────────────────────────────────────────────
function SectionLabel({ children, required }) {
  return (
    <div style={{
      fontFamily: "'Payton One', sans-serif",
      fontWeight: 800, fontSize: 17, color: "#221A47",
      marginBottom: 18, display: "flex", alignItems: "center", gap: 6,
    }}>
      {children}
      {required && <span className="required-star">*</span>}
    </div>
  )
}

function SectionCard({ children, style = {} }) {
  return (
    <div className="section-card" style={{
      background: "#fff", borderRadius: 20,
      padding: "28px 32px",
      boxShadow: "0 2px 16px rgba(34,26,71,.07)",
      border: "1px solid rgba(34,26,71,.06)",
      ...style,
    }}>
      {children}
    </div>
  )
}

function PhotoSlot({ label, large = false, image, onChange, required, error }) {
  const inputRef = useRef()
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <span style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: .8 }}>
          {label}{required && " *"}
        </span>
      )}
      <div
        className={`photo-slot ${image ? "filled" : ""}`}
        style={{ width: "100%", height: large ? 220 : 120, position: "relative" }}
        onClick={() => inputRef.current?.click()}
      >
        {image ? (
          <>
            <img src={image.preview} alt={image.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0, background: "rgba(34,26,71,.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
            >
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Changer</span>
            </div>
            <button onClick={e => { e.stopPropagation(); onChange(null) }} style={{
              position: "absolute", top: 6, right: 6,
              width: 24, height: 24, borderRadius: "50%",
              background: "rgba(0,0,0,.6)", color: "#fff",
              border: "none", fontSize: 14, lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>×</button>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#a89eca" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{large ? "Photo principale" : "Ajouter"}</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) onChange({ file, name: file.name, preview: URL.createObjectURL(file) })
          e.target.value = ""
        }}
      />
      {error && <span className="error-msg">⚠ {error}</span>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function PublierSAE() {
  const navigate = useNavigate()

  const [semestre, setSemestre]         = useState(null)
  const [saeSelectionnee, setSae]       = useState(null)
  const [titre, setTitre]               = useState("")
  const [choixAuteur, setChoixAuteur]   = useState("moi")
  const [groupeId, setGroupeId]         = useState(1)
  const [couleurFond, setCouleurFond]   = useState(50)
  const [couleurTexte, setCouleurTexte] = useState(0)
  const [photoMain, setPhotoMain]       = useState(null)
  const [photosSecond, setPhotosSecond] = useState([null, null, null, null])
  const [categorie, setCategorie]       = useState(null)   // ← nouveau
  const [description, setDescription]  = useState("")   // ← nouveau
  const [pdfFiles, setPdfFiles]         = useState([])
  const [errors, setErrors]             = useState({})
  const [submitted, setSubmitted]       = useState(false)

  const pdfInputRef = useRef()

  const bgColor   = sliderToColor(couleurFond)
  const textColor = sliderToColor(couleurTexte)
  const monGroupe = GROUPES.find(g => g.id === groupeId)

  const updatePhotoSecond = (index, val) => {
    setPhotosSecond(prev => { const next = [...prev]; next[index] = val; return next })
  }

  const handleAddPdf = (e) => {
    const files = Array.from(e.target.files || [])
    setPdfFiles(prev => [...prev, ...files.map(f => ({ file: f, name: f.name, selected: false }))])
    e.target.value = ""
  }

  const togglePdf = (idx) => {
    setPdfFiles(prev => prev.map((p, i) => i === idx ? { ...p, selected: !p.selected } : p))
  }

  const validate = () => {
    const e = {}
    if (!semestre)                  e.semestre     = "Veuillez sélectionner un semestre"
    if (!saeSelectionnee)           e.sae          = "Sélectionnez une SAE"
    if (!titre.trim())              e.titre        = "Le titre est obligatoire"
    if (titre.length > 60)          e.titre        = "Titre trop long (60 caractères max)"
    if (!photoMain)                 e.photoMain    = "La photo principale est obligatoire"
    const photosRemplies = photosSecond.filter(Boolean).length
    if (photosRemplies < 4)         e.photosSecond = `Encore ${4 - photosRemplies} photo(s) obligatoire(s)`
    if (!categorie)                 e.categorie    = "Sélectionnez une catégorie"
    if (!description.trim())        e.description  = "La description est obligatoire"
    if (description.length > 1200)  e.description  = "Description trop longue (1200 caractères max)"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => navigate("/etudiant/mes-projets"), 2000)
    } else {
      document.querySelector(".error-msg")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  if (submitted) {
    return (
      <PageLayoutStudent title="Publier une SAE">
        <style>{GLOBAL_STYLE}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "80px 20px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#d4ff00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, boxShadow: "0 12px 36px rgba(124,58,237,.35)",
            animation: "pulse 1.5s infinite",
          }}>✓</div>
          <h2 style={{ fontFamily: "'Payton One',sans-serif", fontWeight: 900, fontSize: 24, color: "#221A47" }}>
            SAE soumise pour vérification !
          </h2>
          <p style={{ color: "#888", fontSize: 14 }}>Redirection en cours…</p>
        </div>
      </PageLayoutStudent>
    )
  }

  return (
    <PageLayoutStudent title="Publier une SAE">
      <style>{GLOBAL_STYLE}</style>

      <div style={{ width: "100%", maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ════════════════════════════════
            1. SEMESTRE
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Semestre de la SAE</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SEMESTRES.map(s => (
              <div key={s} className="chip-semestre">
                <input type="checkbox" id={`sem-${s}`}
                  checked={semestre === s}
                  onChange={() => { setSemestre(semestre === s ? null : s); setSae(null) }}
                />
                <label htmlFor={`sem-${s}`}>
                  <span className="chip-check">{semestre === s && "✓"}</span>
                  Semestre {s}
                </label>
              </div>
            ))}
          </div>
          {errors.semestre && <p className="error-msg">⚠ {errors.semestre}</p>}

          {semestre && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontFamily: "'Payton One',sans-serif", fontWeight: 700, fontSize: 14, color: "#221A47", marginBottom: 12 }}>SAE</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SAE_PAR_SEMESTRE[semestre].map(sae => (
                  <div key={sae} className="chip-sae">
                    <input type="radio" id={`sae-${sae}`} name="sae"
                      checked={saeSelectionnee === sae}
                      onChange={() => setSae(sae)}
                    />
                    <label htmlFor={`sae-${sae}`}>
                      <span className="chip-check">{saeSelectionnee === sae && "✓"}</span>
                      {sae}
                    </label>
                  </div>
                ))}
              </div>
              {errors.sae && <p className="error-msg">⚠ {errors.sae}</p>}
            </div>
          )}
        </SectionCard>

        {/* ════════════════════════════════
            2. TITRE
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Titre de la SAE</SectionLabel>
          <div style={{ position: "relative" }}>
            <input type="text" value={titre}
              onChange={e => setTitre(e.target.value.slice(0, 60))}
              placeholder="Écrire le titre…" maxLength={60}
              style={{
                width: "100%", border: "none", background: "#f5f4f8", borderRadius: 12,
                padding: "14px 52px 14px 18px", fontSize: 15, color: "#221A47",
                outline: errors.titre ? "2px solid #ef4444" : "2px solid transparent", transition: "outline .15s",
              }}
              onFocus={e => { if (!errors.titre) e.target.style.outline = "2px solid #7c3aed" }}
              onBlur={e => { if (!errors.titre) e.target.style.outline = "2px solid transparent" }}
            />
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: titre.length > 50 ? "#ef4444" : "#bbb", fontWeight: 600 }}>
              {titre.length}/60
            </span>
          </div>
          {errors.titre && <p className="error-msg">⚠ {errors.titre}</p>}
          {titre.length > 0 && titre.length < 5 && (
            <p style={{ fontSize: 12, color: "#f59e0b", marginTop: 6 }}>💡 Titre un peu court, sois plus descriptif</p>
          )}
        </SectionCard>

        {/* ════════════════════════════════
            3. ÉTUDIANTS
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel>Étudiants</SectionLabel>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>

            <div className="etudiant-choice" onClick={() => setChoixAuteur("moi")} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 14,
              border: `2px solid ${choixAuteur === "moi" ? "#7c3aed" : "#e0daf0"}`,
              background: choixAuteur === "moi" ? "#f0ebff" : "#fff",
              cursor: "pointer", minWidth: 180,
              boxShadow: choixAuteur === "moi" ? "0 4px 16px rgba(124,58,237,.15)" : "none",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Payton One',sans-serif", fontWeight: 900, color: "#fff", fontSize: 16, flexShrink: 0,
              }}>{MOI.initiale}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#221A47" }}>{MOI.nom}</div>
                <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600 }}>Moi seul(e)</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", fontFamily: "'Payton One',sans-serif", fontWeight: 700, fontSize: 15, color: "#aaa", paddingTop: 14 }}>ou</div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="etudiant-choice" onClick={() => setChoixAuteur("groupe")} style={{
                padding: "14px 20px", borderRadius: 14,
                border: `2px solid ${choixAuteur === "groupe" ? "#7c3aed" : "#e0daf0"}`,
                background: choixAuteur === "groupe" ? "#f0ebff" : "#fff",
                cursor: "pointer", marginBottom: 10,
                boxShadow: choixAuteur === "groupe" ? "0 4px 16px rgba(124,58,237,.15)" : "none",
              }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#221A47", marginBottom: 6 }}>{monGroupe?.nom}</div>
                {monGroupe?.membres.map(m => (
                  <div key={m} style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{m}</div>
                ))}
              </div>
              <div style={{ position: "relative" }}>
                <select value={groupeId}
                  onChange={e => { setGroupeId(Number(e.target.value)); setChoixAuteur("groupe") }}
                  style={{
                    width: "100%", padding: "11px 40px 11px 16px",
                    borderRadius: 30, border: "2px solid #7c3aed",
                    background: "#7c3aed", color: "#fff",
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                    appearance: "none", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}>
                  {GROUPES.map(g => <option key={g.id} value={g.id}>{g.nom}</option>)}
                </select>
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#fff", fontSize: 12, pointerEvents: "none" }}>▾</span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ════════════════════════════════
            4. COULEURS
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Couleurs de la page</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Fond de la page :", val: couleurFond, set: setCouleurFond, color: bgColor },
              { label: "Couleur du texte :", val: couleurTexte, set: setCouleurTexte, color: textColor },
            ].map(({ label, val, set, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 14, color: "#555", minWidth: 130 }}>{label}</span>
                <div style={{ flex: 1 }}>
                  <input type="range" min={0} max={100} value={val} onChange={e => set(Number(e.target.value))}
                    style={{ width: "100%", background: `linear-gradient(to right,hsl(0,85%,52%),hsl(60,85%,52%),hsl(120,85%,52%),hsl(180,85%,52%),hsl(240,85%,52%),hsl(300,85%,52%),hsl(360,85%,52%))` }}
                  />
                </div>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: color, boxShadow: `0 4px 16px ${color}88`, flexShrink: 0, transition: "background .1s", border: "3px solid #fff" }} />
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 14, color: "#555", minWidth: 130 }}>Résultat :</span>
              <div style={{
                padding: "12px 28px", borderRadius: 30,
                background: bgColor, color: textColor,
                fontSize: 15, fontWeight: 700, fontFamily: "'Payton One',sans-serif",
                boxShadow: `0 6px 20px ${bgColor}66`, transition: "background .1s, color .1s",
                letterSpacing: .3, border: "2px solid rgba(255,255,255,.3)",
              }}>
                {titre || "My Multimedia"}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ════════════════════════════════
            5. PHOTOS
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Photos</SectionLabel>

          {/* Photo principale */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed", marginBottom: 10 }}>
              📸 Photo principale (format 29:60 portrait)
            </div>
            <PhotoSlot large image={photoMain} onChange={setPhotoMain} error={errors.photoMain} />
          </div>

          {/* 4 photos secondaires */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>🖼 4 photos secondaires (format 1:1 carré)</span>
              <span style={{ fontSize: 11, background: "#f0ebff", color: "#7c3aed", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>
                {photosSecond.filter(Boolean).length}/4
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {photosSecond.map((ph, i) => (
                <PhotoSlot key={i} label={`Photo ${i + 1}`} image={ph}
                  onChange={val => updatePhotoSecond(i, val)} required />
              ))}
            </div>
            {errors.photosSecond && <p className="error-msg" style={{ marginTop: 10 }}>⚠ {errors.photosSecond}</p>}
          </div>

          <div style={{ marginTop: 16, padding: "10px 16px", borderRadius: 10, background: "#fff9ec", border: "1px solid #fcd34d", fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            ✳ Pour poster votre SAE il faut <strong>4 images au format 1:1 carré</strong> et une image au format <strong>29:60</strong>
          </div>
        </SectionCard>

        {/* ════════════════════════════════
            6. CATÉGORIE
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Catégorie du projet</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CATEGORIES_SAE.map(cat => (
              <button
                key={cat}
                onClick={() => setCategorie(cat)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 30,
                  border: `1.5px solid ${categorie === cat ? "#7c3aed" : "#ddd"}`,
                  background: categorie === cat ? "#7c3aed" : "#fff",
                  color: categorie === cat ? "#fff" : "#555",
                  fontSize: 13, fontWeight: categorie === cat ? 700 : 500,
                  cursor: "pointer",
                  transition: "all .18s ease",
                  boxShadow: categorie === cat ? "0 4px 14px rgba(124,58,237,.3)" : "none",
                  display: "flex", alignItems: "center", gap: 7,
                }}
              >
                {categorie === cat && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
                {cat}
              </button>
            ))}
          </div>
          {errors.categorie && <p className="error-msg">⚠ {errors.categorie}</p>}
        </SectionCard>

        {/* ════════════════════════════════
            7. DESCRIPTION
        ════════════════════════════════ */}
        <SectionCard>
          <SectionLabel required>Description du projet</SectionLabel>
          <div style={{ position: "relative" }}>
            <textarea
              className="description-textarea"
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 1200))}
              placeholder="Décrivez votre projet : contexte, démarche créative, outils utilisés, résultats obtenus…"
              rows={7}
              style={{
                width: "100%",
                border: "none",
                background: "#f5f4f8",
                borderRadius: 12,
                padding: "14px 18px 36px",
                fontSize: 14,
                color: "#221A47",
                lineHeight: 1.75,
                resize: "vertical",
                outline: errors.description ? "2px solid #ef4444" : "2px solid transparent",
                transition: "outline .15s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            />
            <span style={{
              position: "absolute", right: 14, bottom: 10,
              fontSize: 11, fontWeight: 600,
              color: description.length > 1100 ? "#ef4444" : "#bbb",
              pointerEvents: "none",
            }}>
              {description.length}/1200
            </span>
          </div>
          {errors.description && <p className="error-msg">⚠ {errors.description}</p>}
        </SectionCard>

        {/* ════════════════════════════════
            8. PDF (facultatif)
        ════════════════════════════════ */}
        <SectionCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ fontFamily: "'Payton One',sans-serif", fontWeight: 800, fontSize: 17, color: "#221A47", display: "flex", alignItems: "center", gap: 8 }}>
              Livrable PDF
              <span style={{ fontSize: 12, fontWeight: 600, color: "#888", background: "#f5f4f8", padding: "3px 10px", borderRadius: 20 }}>facultatif</span>
            </div>
            <button className="add-btn" onClick={() => pdfInputRef.current?.click()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Ajouter un fichier
            </button>
            <input ref={pdfInputRef} type="file" accept=".pdf" multiple style={{ display: "none" }} onChange={handleAddPdf} />
          </div>

          {pdfFiles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 20px", color: "#bbb", fontSize: 13, border: "2px dashed #e0daf0", borderRadius: 12 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
              Aucun fichier PDF ajouté
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {pdfFiles.map((pdf, i) => (
                <div key={i} className="pdf-item" style={{ position: "relative" }}>
                  <input type="checkbox" id={`pdf-${i}`} checked={pdf.selected} onChange={() => togglePdf(i)} style={{ display: "none" }} />
                  <label htmlFor={`pdf-${i}`}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 5,
                      border: `2px solid ${pdf.selected ? "#7c3aed" : "#ccc"}`,
                      background: pdf.selected ? "#7c3aed" : "transparent",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 12, flexShrink: 0, transition: "all .15s",
                    }}>{pdf.selected && "✓"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    {pdf.name}
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#aaa" }}>PDF</span>
                  </label>
                  <button onClick={() => setPdfFiles(prev => prev.filter((_, idx) => idx !== i))} style={{
                    position: "absolute", right: -8, top: -8,
                    width: 22, height: 22, borderRadius: "50%",
                    background: "#ef4444", color: "#fff",
                    border: "none", fontSize: 13, lineHeight: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>×</button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* ── Récap erreurs ── */}
        {Object.keys(errors).length > 0 && (
          <div style={{ padding: "16px 20px", borderRadius: 14, background: "#fef2f2", border: "1px solid #fecaca" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#ef4444", marginBottom: 8 }}>
              ⚠ Complétez les champs obligatoires avant de publier :
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 12, color: "#dc2626", lineHeight: 2 }}>
              {Object.values(errors).map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        {/* ── Bouton soumettre ── */}
        <div style={{ textAlign: "center", marginTop: 12, paddingBottom: 40 }}>
          <button className="submit-btn" onClick={handleSubmit}>
            Faire vérifier sa publication
          </button>
        </div>

      </div>
    </PageLayoutStudent>
  )
}