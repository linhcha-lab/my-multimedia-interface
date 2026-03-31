// pages/teacher/SAEList.jsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"
import { Svg, IC } from "../../components/common/Icons"
import { SAES } from "../../data/mockData"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

// ── Liste des SAE disponibles ─────────────────────────────────
// En prod : importe directement depuis mockData ou fetch /api/saes-referentiel
// Structure : { id, code, titre, semestre }
const SAES_DISPONIBLES = [
  { id: 1,  code: "SAE 1.01", titre: "Implémenter un besoin client",             semestre: "S1" },
  { id: 2,  code: "SAE 1.02", titre: "Comparer des approches algorithmiques",    semestre: "S1" },
  { id: 3,  code: "SAE 1.03", titre: "Découvrir un dispositif de transmission",  semestre: "S1" },
  { id: 4,  code: "SAE 1.04", titre: "Se présenter sur Internet",                semestre: "S1" },
  { id: 5,  code: "SAE 1.05", titre: "Traiter des données",                      semestre: "S1" },
  { id: 6,  code: "SAE 1.06", titre: "Organiser son développement professionnel",semestre: "S1" },
  { id: 7,  code: "SAE 2.01", titre: "Développer une application",               semestre: "S2" },
  { id: 8,  code: "SAE 2.02", titre: "Mesurer et caractériser un signal",        semestre: "S2" },
  { id: 9,  code: "SAE 2.03", titre: "Installer un poste pour le développement", semestre: "S2" },
  { id: 10, code: "SAE 2.04", titre: "Participer à un projet collectif",         semestre: "S2" },
  { id: 11, code: "SAE 2.05", titre: "Gérer un système de base de données",      semestre: "S2" },
  { id: 12, code: "SAE 2.06", titre: "Organiser son développement professionnel",semestre: "S2" },
  { id: 13, code: "SAE 3.01", titre: "Développer une application complexe",      semestre: "S3" },
  { id: 14, code: "SAE 3.02", titre: "Optimiser une application",                semestre: "S3" },
  { id: 15, code: "SAE 3.03", titre: "Concevoir un réseau informatique",         semestre: "S3" },
  { id: 16, code: "SAE 3.04", titre: "Conduire un projet",                       semestre: "S3" },
  { id: 17, code: "SAE 4.01", titre: "Développer pour différents supports",      semestre: "S4" },
  { id: 18, code: "SAE 4.02", titre: "Optimiser pour une organisation",          semestre: "S4" },
  { id: 19, code: "SAE 4.03", titre: "Administrer des systèmes informatiques",   semestre: "S4" },
  { id: 20, code: "SAE 5.01", titre: "Développement avancé",                     semestre: "S5" },
  { id: 21, code: "SAE 5.02", titre: "Projet professionnel",                     semestre: "S5" },
  { id: 22, code: "SAE 5.03", titre: "Portfolio professionnel",                  semestre: "S5" },
  { id: 23, code: "SAE 6.01", titre: "Projet de fin de formation",               semestre: "S6" },
  { id: 24, code: "SAE 6.02", titre: "Stage",                                    semestre: "S6" },
]

// Groupées par semestre pour les <optgroup>
const SAE_PAR_SEMESTRE = SAES_DISPONIBLES.reduce((acc, sae) => {
  if (!acc[sae.semestre]) acc[sae.semestre] = []
  acc[sae.semestre].push(sae)
  return acc
}, {})

// ── Composants ────────────────────────────────────────────────
function EtatBadge({ etat }) {
  const c = {
    en_cours: { label: "En cours", bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",  bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",  bg: "#fef9c3", color: "#854d0e" },
  }[etat] || { label: etat, bg: "#f0edf8", color: "#7c3aed" }
  return <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{c.label}</span>
}

function ProgressBar({ value }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height: 6, overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 4, width: `${value}%`, background: value === 100 ? "#22c55e" : "linear-gradient(90deg,#7c3aed,#9d5cf5)" }} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
//  FORMULAIRE DE CRÉATION — 2 phases
// ════════════════════════════════════════════════════════════════
export function CreationModal({ onClose, onCreated }) {
  const [phase, setPhase] = useState(1)
  const [form1, setForm1] = useState({
    saeId:      "",   // ← id de la SAE choisie dans le select
    description:"",
    consignes:  "",
    parcours:   "Développement Web",
    dateDebut:  "",
    dateLimite: "",
  })
  const [groupes,    setGroupes   ] = useState([{ id: 1, nom: "Groupe 1", etudiants: "" }])
  const [taches,     setTaches    ] = useState([{ id: 1, label: "" }])
  const [depots,     setDepots    ] = useState([{ id: 1, label: "", deadline: "" }])
  const [ressources, setRessources] = useState([{ id: 1, label: "" }])

  const addItem    = (setter, items) => setter([...items, { id: Date.now(), label: "", deadline: "", etudiants: "", nom: `Groupe ${items.length + 1}` }])
  const removeItem = (setter, items, id) => setter(items.filter(i => i.id !== id))
  const updateItem = (setter, items, id, key, val) => setter(items.map(i => i.id === id ? { ...i, [key]: val } : i))

  // SAE sélectionnée (objet complet)
  const saeChoisie = SAES_DISPONIBLES.find(s => s.id === Number(form1.saeId))

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1.5px solid #e0daf5", fontSize: 13, outline: "none",
    fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box", color: "#2d2d4e",
  }
  const labelStyle = {
    display: "block", fontSize: 11, fontWeight: 700, color: "#7c3aed",
    marginBottom: 6, textTransform: "uppercase", letterSpacing: .5,
  }

  const handleSubmit = () => {
    if (!form1.saeId) { alert("Sélectionne une SAE."); return }
    alert(`SAE "${saeChoisie.code} — ${saeChoisie.titre}" créée avec succès !`)
    onCreated && onCreated()
    onClose()
  }

  const phase1Valid = form1.saeId && form1.dateDebut && form1.dateLimite

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(26,26,46,.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)", padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 22, width: "100%", maxWidth: 620,
        maxHeight: "90vh", overflowY: "auto", boxShadow: "0 30px 80px rgba(0,0,0,.2)",
      }}>

        {/* En-tête */}
        <div style={{ background: "#1a1a2e", borderRadius: "22px 22px 0 0", padding: "20px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 900, color: "#c8f000", margin: 0 }}>
              {phase === 1 ? "Créer une SAE — Informations" : "Créer une SAE — Paramétrage pédagogique"}
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", fontSize: 22, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2].map(p => (
              <div key={p} style={{ flex: 1, height: 4, borderRadius: 2, background: phase >= p ? "#7c3aed" : "rgba(255,255,255,.15)", transition: "background .3s" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 10, color: phase === 1 ? "#c8f000" : "rgba(255,255,255,.4)", fontWeight: phase === 1 ? 700 : 400 }}>Phase 1 — Général & Groupes</span>
            <span style={{ fontSize: 10, color: phase === 2 ? "#c8f000" : "rgba(255,255,255,.4)", fontWeight: phase === 2 ? 700 : 400 }}>Phase 2 — Tâches & Ressources</span>
          </div>
        </div>

        <div style={{ padding: 28 }}>

          {/* ════ PHASE 1 ════ */}
          {phase === 1 && (
            <div>

              {/* ── Sélecteur SAE — LISTE DÉROULANTE ── */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>SAE *</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={form1.saeId}
                    onChange={e => setForm1(f => ({ ...f, saeId: e.target.value }))}
                    style={{
                      ...inputStyle,
                      background: "#fff",
                      appearance: "none",
                      paddingRight: 36,
                      color: form1.saeId ? "#2d2d4e" : "#aaa",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>— Choisir une SAE —</option>
                    {Object.entries(SAE_PAR_SEMESTRE).map(([sem, saes]) => (
                      <optgroup key={sem} label={`Semestre ${sem}`}>
                        {saes.map(sae => (
                          <option key={sae.id} value={sae.id}>
                            {sae.code} — {sae.titre}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {/* Chevron custom */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={form1.saeId ? "#7c3aed" : "#bbb"} strokeWidth="2.5"
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>

                {/* Aperçu de la SAE choisie */}
                {saeChoisie && (
                  <div style={{
                    marginTop: 8, padding: "10px 14px", borderRadius: 10,
                    background: "#f0ebff", border: "1px solid #d4bbf5",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{
                      background: "#7c3aed", color: "#fff",
                      fontSize: 10, fontWeight: 700,
                      padding: "3px 9px", borderRadius: 20, flexShrink: 0,
                    }}>
                      {saeChoisie.semestre}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6" }}>
                      {saeChoisie.code} — {saeChoisie.titre}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Description</label>
                <textarea placeholder="Objectifs pédagogiques et contexte du projet…" value={form1.description}
                  onChange={e => setForm1(f => ({ ...f, description: e.target.value }))}
                  rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Consignes</label>
                <textarea placeholder="Instructions spécifiques, outils à utiliser, critères d'évaluation…" value={form1.consignes}
                  onChange={e => setForm1(f => ({ ...f, consignes: e.target.value }))}
                  rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Parcours</label>
                  <select value={form1.parcours} onChange={e => setForm1(f => ({ ...f, parcours: e.target.value }))}
                    style={{ ...inputStyle, background: "#fff" }}>
                    <option>Développement Web</option>
                    <option>Création Numérique</option>
                    <option>Les deux</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date de début *</label>
                  <input type="date" value={form1.dateDebut}
                    onChange={e => setForm1(f => ({ ...f, dateDebut: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Date limite *</label>
                <input type="date" value={form1.dateLimite}
                  onChange={e => setForm1(f => ({ ...f, dateLimite: e.target.value }))} style={inputStyle} />
              </div>

              {/* Groupes */}
              <div style={{ background: "#f8f6fc", borderRadius: 14, padding: 18, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Groupes & étudiants</label>
                  <button onClick={() => addItem(setGroupes, groupes)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    <Svg d={IC.plus} size={12} color="#fff" /> Ajouter un groupe
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {groupes.map((g, i) => (
                    <div key={g.id} style={{ background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #f0edf8" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <input type="text" placeholder={`Nom du groupe ${i + 1}`} value={g.nom}
                          onChange={e => updateItem(setGroupes, groupes, g.id, "nom", e.target.value)}
                          style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                        {groupes.length > 1 && (
                          <button onClick={() => removeItem(setGroupes, groupes, g.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", flexShrink: 0, fontSize: 18 }}>×</button>
                        )}
                      </div>
                      <input type="text" placeholder="Étudiants (séparés par des virgules) : Linh, Sarah, Marine…"
                        value={g.etudiants}
                        onChange={e => updateItem(setGroupes, groupes, g.id, "etudiants", e.target.value)}
                        style={{ ...inputStyle, fontSize: 12 }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={onClose} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1.5px solid #e0daf5", background: "none", fontSize: 14, cursor: "pointer", color: "#666", fontFamily: "inherit" }}>
                  Annuler
                </button>
                <button
                  onClick={() => phase1Valid ? setPhase(2) : alert("Sélectionne une SAE, la date de début et la date limite.")}
                  style={{
                    flex: 2, padding: 11, borderRadius: 12, border: "none",
                    background: phase1Valid ? "linear-gradient(135deg,#7c3aed,#9d5cf5)" : "#d1d5db",
                    fontSize: 14, cursor: phase1Valid ? "pointer" : "not-allowed",
                    color: "#fff", fontWeight: 700, fontFamily: "inherit",
                  }}
                >
                  Étape suivante →
                </button>
              </div>
            </div>
          )}

          {/* ════ PHASE 2 ════ */}
          {phase === 2 && (
            <div>

              {/* Tâches */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Tâches du projet (étapes)</label>
                  <button onClick={() => setTaches(t => [...t, { id: Date.now(), label: "" }])} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    <Svg d={IC.plus} size={12} color="#fff" /> Ajouter
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {taches.map((t, i) => (
                    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: "#f0edf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>{i + 1}</div>
                      <input type="text" placeholder={`Tâche ${i + 1} (ex : Maquettes Figma)`} value={t.label}
                        onChange={e => setTaches(p => p.map(x => x.id === t.id ? { ...x, label: e.target.value } : x))}
                        style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                      {taches.length > 1 && (
                        <button onClick={() => setTaches(p => p.filter(x => x.id !== t.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", fontSize: 18 }}>×</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Livrables */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Livrables attendus</label>
                  <button onClick={() => setDepots(d => [...d, { id: Date.now(), label: "", deadline: "" }])} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    <Svg d={IC.plus} size={12} color="#fff" /> Ajouter
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {depots.map((d, i) => (
                    <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <input type="text" placeholder={`Livrable ${i + 1} (ex : Rapport final PDF)`} value={d.label}
                        onChange={e => setDepots(p => p.map(x => x.id === d.id ? { ...x, label: e.target.value } : x))}
                        style={{ ...inputStyle, marginBottom: 0, flex: 2 }} />
                      <input type="date" value={d.deadline}
                        onChange={e => setDepots(p => p.map(x => x.id === d.id ? { ...x, deadline: e.target.value } : x))}
                        style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                      {depots.length > 1 && (
                        <button onClick={() => setDepots(p => p.filter(x => x.id !== d.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", fontSize: 18 }}>×</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ressources */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Ressources & documents</label>
                  <button onClick={() => setRessources(r => [...r, { id: Date.now(), label: "" }])} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    <Svg d={IC.plus} size={12} color="#fff" /> Ajouter
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ressources.map((r, i) => (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: "#f0ebff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Svg d={IC.file} size={14} color="#7c3aed" />
                      </div>
                      <input type="text" placeholder={`Ressource ${i + 1} (ex : Brief SAE, Grille d'évaluation…)`} value={r.label}
                        onChange={e => setRessources(p => p.map(x => x.id === r.id ? { ...x, label: e.target.value } : x))}
                        style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                      {ressources.length > 1 && (
                        <button onClick={() => setRessources(p => p.filter(x => x.id !== r.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", fontSize: 18 }}>×</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Récap phase 1 */}
              <div style={{ background: "#f8f6fc", borderRadius: 12, padding: 14, marginBottom: 24, fontSize: 12, color: "#666", lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, color: "#7c3aed", marginBottom: 4 }}>Récapitulatif phase 1</div>
                {saeChoisie && <div><strong>SAE :</strong> {saeChoisie.code} — {saeChoisie.titre} ({saeChoisie.semestre})</div>}
                <div><strong>Parcours :</strong> {form1.parcours}</div>
                <div><strong>Période :</strong> {form1.dateDebut} → {form1.dateLimite}</div>
                <div><strong>Groupes :</strong> {groupes.length} groupe{groupes.length > 1 ? "s" : ""}</div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setPhase(1)} style={{ flex: 1, padding: 11, borderRadius: 12, border: "1.5px solid #e0daf5", background: "none", fontSize: 14, cursor: "pointer", color: "#666", fontFamily: "inherit" }}>
                  ← Retour
                </button>
                <button onClick={handleSubmit} style={{ flex: 2, padding: 11, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 700, fontFamily: "inherit" }}>
                  Créer la SAE ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page liste SAE ────────────────────────────────────────────
export default function SAEList() {
  const navigate   = useNavigate()
  const width      = useWindowWidth()
  const isMobile   = width < BP.mobile
  const [filtre,    setFiltre   ] = useState("tous")
  const [showModal, setShowModal] = useState(false)

  const saeFiltrees = filtre === "tous" ? SAES : SAES.filter(s => s.etat === filtre)

  return (
    <PageLayout title="Liste des SAE">

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { val: "tous",     label: "Toutes"    },
            { val: "en_cours", label: "En cours"  },
            { val: "termine",  label: "Terminées" },
            { val: "a_venir",  label: "À venir"   },
          ].map(f => (
            <button key={f.val} onClick={() => setFiltre(f.val)} style={{
              padding: "7px 16px", borderRadius: 20, fontSize: 12,
              cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
              background: filtre === f.val ? "#7c3aed" : "#fff",
              color:      filtre === f.val ? "#fff"    : "#666",
              border:     filtre === f.val ? "none"    : "1px solid #e0daf5",
              transition: "all .15s",
            }}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Svg d={IC.plus} size={16} color="#fff" />
          Nouvelle SAE
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
        {saeFiltrees.map(sae => (
          <div key={sae.id}
            onClick={() => navigate(`/teacher/saes/${sae.id}`)}
            style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,.06)", cursor: "pointer", transition: "transform .15s, box-shadow .15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(124,58,237,.14)" }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,.06)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: "#9d5cf5", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>{sae.code} · {sae.semestre}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>{sae.titre}</div>
              </div>
              <EtatBadge etat={sae.etat} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "#888" }}>Progression</span>
                <span style={{ fontWeight: 700, color: "#7c3aed" }}>{sae.progression}%</span>
              </div>
              <ProgressBar value={sae.progression} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa" }}>
              <span>{sae.groupes} groupe{sae.groupes > 1 ? "s" : ""}</span>
              <span>Échéance : {new Date(sae.echeance).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
        ))}
      </div>

      {saeFiltrees.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#666" }}>Aucune SAE dans cette catégorie</div>
        </div>
      )}

      {showModal && <CreationModal onClose={() => setShowModal(false)} />}
    </PageLayout>
  )
}