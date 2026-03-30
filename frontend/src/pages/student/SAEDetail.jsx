// ============================================================
//  pages/student/SAEDetail.jsx
//
//  ✅ L'étudiant coche ses tâches → progression calculée ici
//  ✅ Le prof voit la progression en LECTURE SEULE (pas de toggle)
//  ✅ La progression dans le header se met à jour en temps réel
// ============================================================

import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { Svg, IC }       from "../../components/common/Icons"
import { SAES_STUDENT }  from "../../data/mockData"

// ── Source de vérité partagée ─────────────────────────────────
export const SAE_DETAILS = {
  1: {
    description: "Concevoir une application web responsive en utilisant React et Node.js. L'application devra répondre aux exigences ergonomiques vues en cours.",
    statut:     "En cours",
    dateLimite: "12/08/2025",
    groupe:     "Groupe 1",
    membres:    ["Sarah Donsoun", "Linh Chassang", "Marine Boyer"],
    taches: [
      { id: 1, label: "Analyse des besoins",        done: true  },
      { id: 2, label: "Maquettes Figma",             done: true  },
      { id: 3, label: "Configurer le projet React",  done: true  },
      { id: 4, label: "Intégration des composants",  done: false },
      { id: 5, label: "Mise en place de l'API",      done: false },
      { id: 6, label: "Tests et recettage",          done: false },
    ],
    livrables: [
      { id: 1, label: "Rapport d'analyse (PDF)", deadline: "2025-03-20" },
      { id: 2, label: "Maquettes Figma (lien)",  deadline: "2025-04-01" },
      { id: 3, label: "Code source final (ZIP)", deadline: "2025-04-15" },
    ],
    ressources: [
      { id: 1, nom: "Brief_SAE403.pdf",      taille: "1.2 Mo", date: "2025-02-01" },
      { id: 2, nom: "Consignes_React.pdf",   taille: "0.8 Mo", date: "2025-02-05" },
      { id: 3, nom: "Grille_evaluation.pdf", taille: "0.5 Mo", date: "2025-02-10" },
    ],
    annonces: [
      { id: 1, titre: "Rappel échéance",     date: "2025-03-08", contenu: "N'oubliez pas de rendre avant vendredi 17h." },
      { id: 2, titre: "Nouvelles consignes", date: "2025-03-05", contenu: "Les maquettes doivent inclure la version mobile." },
    ],
  },
}
for (let i = 2; i <= 6; i++) {
  SAE_DETAILS[i] = {
    ...SAE_DETAILS[1],
    statut:     i <= 4 ? "En cours" : i === 5 ? "Terminé" : "À venir",
    dateLimite: ["12/08/2025","10/05/2025","04/09/2025","29/08/2025","15/03/2025","15/12/2024"][i - 1],
    livrables: [
      { id: 1, label: "Rapport d'analyse (PDF)", deadline: "2025-03-20" },
      { id: 2, label: "Rendu final (ZIP)",        deadline: "2025-04-15" },
    ],
  }
}

// ── Onglet Aperçu ─────────────────────────────────────────────
function TabApercu({ sae, detail, progression }) {
  const [showMembres, setShowMembres] = useState(false)
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <h2 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:20, fontWeight:800, color:"#221A47" }}>Aperçu du projet</h2>
        <button onClick={() => setShowMembres(!showMembres)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 18px", borderRadius:10, border:"none", background:"#7c3aed", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          <Svg d={IC.students} size={16} color="#fff" />
          Voir les membres du groupe
        </button>
      </div>

      {showMembres && (
        <div style={{ background:"#f0ebff", borderRadius:12, padding:16, marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#7c3aed", marginBottom:10, textTransform:"uppercase", letterSpacing:.4 }}>{detail.groupe}</div>
          {detail.membres.map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom: i < detail.membres.length-1 ? "1px solid #e0d5f5" : "none" }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#9d5cf5)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, flexShrink:0 }}>{m.charAt(0)}</div>
              <span style={{ fontSize:13, color:"#2d2d4e" }}>{m}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ background:"#F5F4F1", borderRadius:12, padding:"20px 22px", marginBottom:18, boxShadow:"-2px 4px 14px rgba(0,0,0,.12)" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#221A47", marginBottom:10 }}>Description</div>
        <div style={{ fontSize:13, color:"#221A47", lineHeight:1.7 }}>{detail.description}</div>
      </div>

      <div style={{ background:"#F5F4F1", borderRadius:12, padding:"20px 22px", marginBottom:24, boxShadow:"-2px 4px 14px rgba(0,0,0,.12)" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#221A47", marginBottom:14 }}>Informations clés</div>
        {[
          { label:"Statut :",      value: detail.statut },
          { label:"Date limite :", value: detail.dateLimite },
          { label:"Progression :", value: `${progression}%` },
        ].map(({ label, value }) => (
          <div key={label} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13 }}>
            <span style={{ fontWeight:700, color:"#373057", minWidth:110 }}>{label}</span>
            <span style={{ color:"#555" }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ background:"#e0d5f5", borderRadius:6, height:9, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${progression}%`, background: progression===100 ? "#22c55e" : "#7c3aed", borderRadius:6, transition:"width .4s ease" }} />
      </div>
      <div style={{ fontSize:11, color:"#aaa", marginTop:6, textAlign:"right" }}>{progression}% complété</div>
    </div>
  )
}

// ── Onglet Tâches — COCHABLE par l'étudiant uniquement ────────
function TabTaches({ taches, onToggle }) {
  const done  = taches.filter(t => t.done).length
  const total = taches.length
  const prog  = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
        <h2 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:20, fontWeight:800, color:"#221A47" }}>Tâches</h2>
        <span style={{ fontSize:13, color:"#7c3aed", fontWeight:700 }}>{done}/{total} complétées</span>
      </div>

      <p style={{ fontSize:12, color:"#aaa", marginBottom:16, fontStyle:"italic" }}>
        Coche une tâche une fois terminée — la progression se met à jour automatiquement.
      </p>

      <div style={{ background:"#e8e4f0", borderRadius:6, height:8, marginBottom:24, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:6, width:`${prog}%`, background: prog===100 ? "#22c55e" : "#7c3aed", transition:"width .4s ease" }} />
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {taches.map(t => (
          <div
            key={t.id}
            onClick={() => onToggle(t.id)}
            style={{
              background: t.done ? "#f0fdf4" : "#F5F4F1",
              borderRadius:12, padding:"14px 16px",
              display:"flex", alignItems:"center", gap:14,
              boxShadow:"-2px 4px 14px rgba(0,0,0,.08)",
              border: t.done ? "1.5px solid #86efac" : "1.5px solid transparent",
              cursor:"pointer", transition:"all .2s ease", userSelect:"none",
            }}
            onMouseEnter={e => { if (!t.done) e.currentTarget.style.background="#ede9f5" }}
            onMouseLeave={e => { if (!t.done) e.currentTarget.style.background="#F5F4F1" }}
          >
            {/* Checkbox visuelle */}
            <div style={{
              width:24, height:24, borderRadius:6, flexShrink:0,
              background: t.done ? "#c8f000" : "#fff",
              border: t.done ? "none" : "2px solid #d4c5f5",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .2s ease",
            }}>
              {t.done && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>

            <span style={{ flex:1, fontSize:13, color:"#221A47", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? .55 : 1, transition:"all .2s" }}>
              {t.label}
            </span>

            <span style={{ fontSize:11, fontWeight:600, color: t.done ? "#16a34a" : "#aaa" }}>
              {t.done ? "Terminé ✓" : "À faire"}
            </span>
          </div>
        ))}
      </div>

      {done === total && total > 0 && (
        <div style={{ marginTop:20, padding:"14px 18px", borderRadius:12, background:"#f0fdf4", border:"1.5px solid #86efac", display:"flex", alignItems:"center", gap:10, fontSize:13, fontWeight:600, color:"#16a34a" }}>
          <span style={{ fontSize:20 }}>🎉</span>
          Toutes les tâches sont complétées !
        </div>
      )}
    </div>
  )
}

// ── Onglet Ressources ─────────────────────────────────────────
function TabRessources({ detail }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:20, fontWeight:800, color:"#221A47", marginBottom:20 }}>Ressources</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {detail.ressources.map(r => (
          <div key={r.id} style={{ background:"#F5F4F1", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, boxShadow:"-2px 4px 14px rgba(0,0,0,.08)" }}>
            <div style={{ width:38, height:38, borderRadius:10, background:"#e8e4f0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Svg d={IC.file} size={18} color="#7c3aed" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#221A47" }}>{r.nom}</div>
              <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>{r.taille} · {new Date(r.date).toLocaleDateString("fr-FR")}</div>
            </div>
            <button style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #d4c5f5", background:"none", fontSize:12, color:"#7c3aed", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Télécharger</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Onglet Dépôts ─────────────────────────────────────────────
function TabDepots({ detail }) {
  const [depots, setDepots] = useState({})
  const inputRefs = useRef({})

  const StatutBadge = ({ statut }) => {
    const c = {
      en_attente: { label:"En attente de validation", bg:"#fef9c3", color:"#854d0e" },
      valide:     { label:"Validé",                   bg:"#dcfce7", color:"#166534" },
      refuse:     { label:"Refusé",                   bg:"#fce7e7", color:"#991b1b" },
    }[statut]
    return <span style={{ background:c.bg, color:c.color, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>{c.label}</span>
  }

  const handleFileChange = (livrableId, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDepots(prev => ({ ...prev, [livrableId]: { fichier:file.name, statut:"en_attente" } }))
    e.target.value = ""
  }

  const handleRetirer = (id) => setDepots(prev => { const n={...prev}; delete n[id]; return n })
  const isRetard = (d) => new Date(d) < new Date()

  return (
    <div>
      <h2 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:20, fontWeight:800, color:"#221A47", marginBottom:6 }}>Mes dépôts</h2>
      <p style={{ fontSize:13, color:"#888", marginBottom:24, lineHeight:1.6 }}>Dépose un fichier pour chaque livrable demandé par ton enseignant.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {detail.livrables.map(livrable => {
          const depot = depots[livrable.id]
          const retard = isRetard(livrable.deadline)
          return (
            <div key={livrable.id} style={{ background:"#F5F4F1", borderRadius:14, padding:"18px 20px", boxShadow:"-2px 4px 14px rgba(0,0,0,.08)", border: retard&&!depot ? "1.5px solid #fca5a5" : depot ? "1.5px solid #a78bfa" : "1.5px solid transparent" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:14, flexWrap:"wrap" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ width:22, height:22, borderRadius:6, background:"#7c3aed", color:"#fff", fontSize:11, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{livrable.id}</span>
                    <span style={{ fontSize:14, fontWeight:700, color:"#221A47" }}>{livrable.label}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, paddingLeft:30 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={retard?"#ef4444":"#aaa"} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span style={{ fontSize:12, color:retard?"#ef4444":"#aaa", fontWeight:retard?700:400 }}>
                      {retard ? "Délai dépassé — " : "À rendre avant le "}
                      {new Date(livrable.deadline).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}
                    </span>
                  </div>
                </div>
                {depot && <StatutBadge statut={depot.statut} />}
              </div>
              {!depot ? (
                <div>
                  <div onClick={() => inputRefs.current[livrable.id]?.click()} style={{ border:"2px dashed #d4c5f5", borderRadius:10, padding:"18px 16px", textAlign:"center", background:"#faf8ff", cursor:"pointer", transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#7c3aed";e.currentTarget.style.background="#f0ebff"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#d4c5f5";e.currentTarget.style.background="#faf8ff"}}
                  >
                    <div style={{ fontSize:22, marginBottom:6 }}>📁</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#7c3aed", marginBottom:3 }}>Cliquer pour déposer</div>
                    <div style={{ fontSize:11, color:"#bbb" }}>PDF, ZIP, Figma… max 50 Mo</div>
                  </div>
                  <input ref={el=>inputRefs.current[livrable.id]=el} type="file" style={{ display:"none" }} onChange={e=>handleFileChange(livrable.id,e)} />
                </div>
              ) : (
                <div style={{ display:"flex", alignItems:"center", gap:12, background:"#fff", borderRadius:10, padding:"12px 14px", flexWrap:"wrap" }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:"#f0ebff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Svg d={IC.file} size={16} color="#7c3aed" />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"#221A47" }}>{depot.fichier}</div>
                    <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>Déposé le {new Date().toLocaleDateString("fr-FR")}</div>
                  </div>
                  {depot.statut === "en_attente" && (
                    <button onClick={()=>handleRetirer(livrable.id)} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #fca5a5", background:"none", color:"#ef4444", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"Plus Jakarta Sans" }}>Retirer</button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop:20, padding:"12px 16px", borderRadius:10, background:"#f0ebff", fontSize:12, color:"#7c3aed", fontWeight:600, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:16 }}>📊</span>
        {Object.keys(depots).length} / {detail.livrables.length} livrable(s) déposé(s)
      </div>
    </div>
  )
}

function TabAnnonces({ detail }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:20, fontWeight:800, color:"#221A47", marginBottom:20 }}>Annonces</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {detail.annonces.map(a => (
          <div key={a.id} style={{ background:"#F5F4F1", borderRadius:12, padding:20, boxShadow:"-2px 4px 14px rgba(0,0,0,.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#221A47" }}>{a.titre}</span>
              <span style={{ fontSize:11, color:"#aaa" }}>{new Date(a.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{a.contenu}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────
export default function SAEDetailStudent() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState("apercu")

  const sae        = SAES_STUDENT.find(s => s.id === parseInt(id))
  const detailBase = SAE_DETAILS[parseInt(id)]

  // ── État des tâches — géré ICI, pas dans le mock ──────────
  // C'est l'étudiant qui coche, la progression dérive de ça.
  // Plus tard : PATCH /api/saes/:id/taches/:tacheId { done: true }
  const [taches, setTaches] = useState(() => detailBase?.taches ?? [])

  const toggleTache = (tacheId) => {
    setTaches(prev => prev.map(t => t.id === tacheId ? { ...t, done: !t.done } : t))
  }

  // Progression = calculée depuis les tâches (source unique)
  const progression = taches.length > 0
    ? Math.round((taches.filter(t => t.done).length / taches.length) * 100)
    : 0

  if (!sae || !detailBase) {
    return (
      <PageLayoutStudent title="SAE introuvable">
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
          <p style={{ color:"#666" }}>Cette SAE n'existe pas.</p>
          <button onClick={() => navigate("/student/saes")} style={{ marginTop:16, padding:"10px 20px", borderRadius:10, border:"none", background:"#7c3aed", color:"#fff", cursor:"pointer", fontFamily:"inherit" }}>
            Retour à mes SAE
          </button>
        </div>
      </PageLayoutStudent>
    )
  }

  const detail = { ...detailBase, taches }

  const TABS = [
    { id:"apercu",     label:"Aperçu"    },
    { id:"taches",     label:"Tâches"    },
    { id:"ressources", label:"Ressources"},
    { id:"depots",     label:"Dépôts"    },
    { id:"annonces",   label:"Annonces"  },
  ]

  return (
    <PageLayoutStudent title="">

      <div style={{ background:"#7c3aed", borderRadius:"16px 16px 0 0", padding:"14px 28px 0" }}>
        <button onClick={() => navigate("/student/saes")} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.4)", fontSize:12, fontFamily:"inherit", marginBottom:10, padding:0 }}>
          <Svg d={IC.arrow} size={14} color="rgba(255,255,255,.4)" />
          Retour à mes SAE
        </button>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap", gap:12 }}>
          <h1 style={{ fontFamily:"'Paytone One',sans-serif", fontSize:28, fontWeight:900, color:"#E5FF3C", lineHeight:1.15 }}>
            {sae.code} — {sae.titre}
          </h1>
          {/* Mini barre de progression dans le header */}
          <div style={{ background:"rgba(255,255,255,.1)", borderRadius:30, padding:"6px 14px", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:60, height:5, background:"rgba(255,255,255,.2)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${progression}%`, background: progression===100 ? "#22c55e" : "#c8f000", borderRadius:3, transition:"width .4s ease" }} />
            </div>
            <span style={{ fontSize:12, fontWeight:700, color:"#c8f000" }}>{progression}%</span>
          </div>
        </div>

        <div style={{ display:"flex", gap:0, overflowX:"auto" }}>
          {TABS.map(t => {
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"12px 22px", background:"none", border:"none", borderBottom: active ? "3px solid #221A47" : "3px solid transparent", color: active ? "#fff" : "rgba(255,255,255,.45)", fontWeight: active?700:400, fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap", transition:"all .15s" }}>
                {t.label}
                {t.id==="taches" && (
                  <span style={{ marginLeft:6, background:"rgba(255,255,255,.1)", color:"#fff", borderRadius:20, padding:"1px 7px", fontSize:10, fontWeight:700 }}>
                    {taches.filter(x=>x.done).length}/{taches.length}
                  </span>
                )}
                {t.id==="depots" && (
                  <span style={{ marginLeft:6, background:"rgba(255,255,255,.1)", color:"#fff", borderRadius:20, padding:"1px 7px", fontSize:10, fontWeight:700 }}>
                    {detail.livrables.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ background:"#fff", borderRadius:"0 0 16px 16px", padding:28, boxShadow:"0 4px 24px rgba(0,0,0,.08)", marginBottom:20 }}>
        {tab==="apercu"     && <TabApercu     sae={sae} detail={detail} progression={progression} />}
        {tab==="taches"     && <TabTaches     taches={taches} onToggle={toggleTache} />}
        {tab==="ressources" && <TabRessources detail={detail} />}
        {tab==="depots"     && <TabDepots     detail={detail} />}
        {tab==="annonces"   && <TabAnnonces   detail={detail} />}
      </div>

    </PageLayoutStudent>
  )
}