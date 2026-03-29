// ============================================================
//  pages/teacher/SAEDetail.jsx — Détail d'une SAE (enseignant)
//  URL : /teacher/saes/:id
// ============================================================

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"
import { Svg, IC } from "../../components/common/Icons"
import { SAES } from "../../data/mockData"

// ── Données enrichies par SAE ─────────────────────────────────
const SAE_DETAILS = {
  1: {
    description: "Concevoir et développer une application web complète avec des frameworks modernes. L'application devra répondre aux exigences ergonomiques et techniques vues en cours.",
    consignes: "Utiliser React pour le front-end et Symfony pour le back-end. Versionner avec Git. Rendre un rapport de 20 pages minimum.",
    statut: "En cours",
    dateDebut: "2025-01-15",
    dateLimite: "2025-04-01",
    parcours: "Développement Web",
    progressionGlobale: 65,
    groupes: [
      {
        id: 1, nom: "Groupe 1",
        etudiants: ["Linh Chassang", "Sarah Donsoun", "Marine Boyer"],
        rendusEffectues: 2, rendusAttendus: 3,
        retard: false,
        taches: [
          { id: 1, label: "Analyse des besoins",        done: true  },
          { id: 2, label: "Maquettes Figma",             done: true  },
          { id: 3, label: "Configurer le projet React",  done: true  },
          { id: 4, label: "Intégration des composants",  done: false },
          { id: 5, label: "Mise en place de l'API",      done: false },
          { id: 6, label: "Tests et recettage",          done: false },
        ],
      },
      {
        id: 2, nom: "Groupe 2",
        etudiants: ["Alisson Lappp", "Perrine Blois"],
        rendusEffectues: 1, rendusAttendus: 3,
        retard: true,
        taches: [
          { id: 1, label: "Analyse des besoins",        done: true  },
          { id: 2, label: "Maquettes Figma",             done: false },
          { id: 3, label: "Configurer le projet React",  done: false },
          { id: 4, label: "Intégration des composants",  done: false },
          { id: 5, label: "Mise en place de l'API",      done: false },
          { id: 6, label: "Tests et recettage",          done: false },
        ],
      },
      {
        id: 3, nom: "Groupe 3",
        etudiants: ["Clémentine Fraise", "Tom Durand", "Lucie Martin"],
        rendusEffectues: 3, rendusAttendus: 3,
        retard: false,
        taches: [
          { id: 1, label: "Analyse des besoins",        done: true  },
          { id: 2, label: "Maquettes Figma",             done: true  },
          { id: 3, label: "Configurer le projet React",  done: true  },
          { id: 4, label: "Intégration des composants",  done: true  },
          { id: 5, label: "Mise en place de l'API",      done: true  },
          { id: 6, label: "Tests et recettage",          done: true  },
        ],
      },
    ],
    ressources: [
      { id: 1, nom: "Brief_SAE401.pdf",      taille: "1.2 Mo", date: "2025-01-16" },
      { id: 2, nom: "Consignes_React.pdf",   taille: "0.8 Mo", date: "2025-01-20" },
      { id: 3, nom: "Grille_evaluation.pdf", taille: "0.5 Mo", date: "2025-01-22" },
    ],
    depots: [
      { id: 1, groupe: "Groupe 1", etudiant: "Linh Chassang",  fichier: "rendu_v1.zip",   date: "2025-03-10", statut: "valide"     },
      { id: 2, groupe: "Groupe 2", etudiant: "Alisson Lappp",  fichier: "rapport.pdf",    date: "2025-03-15", statut: "en_attente" },
      { id: 3, groupe: "Groupe 3", etudiant: "Clémentine F.", fichier: "projet_v3.zip",  date: "2025-03-08", statut: "valide"     },
    ],
    annonces: [
      { id: 1, titre: "Report de l'échéance", date: "2025-03-08", contenu: "L'échéance est repoussée d'une semaine suite à vos retours." },
      { id: 2, titre: "Nouvelle ressource disponible", date: "2025-03-05", contenu: "Un template de rapport a été ajouté dans les ressources." },
    ],
  },
}

// Copie pour les autres SAE
for (let i = 2; i <= 6; i++) {
  SAE_DETAILS[i] = {
    ...SAE_DETAILS[1],
    statut: i <= 3 ? "En cours" : i <= 5 ? "Terminé" : "À venir",
    progressionGlobale: [65, 70, 10, 100, 100, 0][i - 1] || 0,
    dateLimite: ["2025-04-01","2025-05-10","2025-06-01","2024-12-20","2024-12-15","2025-09-01"][i - 1],
    dateDebut: "2025-01-15",
  }
}

// ── Helpers ────────────────────────────────────────────────────
const jj = (dateStr) => new Date(dateStr).toLocaleDateString("fr-FR")

function EtatBadge({ statut }) {
  const c = {
    "En cours": { bg: "#e0f2fe", color: "#0369a1" },
    "Terminé":  { bg: "#dcfce7", color: "#166534" },
    "À venir":  { bg: "#fef9c3", color: "#854d0e" },
  }[statut] || { bg: "#f0edf8", color: "#7c3aed" }
  return (
    <span style={{ background: c.bg, color: c.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      {statut}
    </span>
  )
}

function StatBox({ label, value, color = "#7c3aed" }) {
  return (
    <div style={{
      background: "#f8f6fc", borderRadius: 14,
      padding: "16px 20px", flex: 1, minWidth: 120,
      border: "1px solid #f0edf8",
    }}>
      <div style={{ fontSize: 11, color: "#999", marginBottom: 6, textTransform: "uppercase", letterSpacing: .4 }}>{label}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color }}>{value}</div>
    </div>
  )
}

function ProgressBar({ value, color = "#7c3aed", height = 8 }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 4,
        width: `${value}%`,
        background: value === 100
          ? "#22c55e"
          : `linear-gradient(90deg, ${color}, #9d5cf5)`,
        transition: "width .5s ease",
      }} />
    </div>
  )
}

// ── Modale détail groupe ──────────────────────────────────────
function GroupeDetailModal({ groupe, onClose }) {
  const [taches, setTaches] = useState(groupe.taches.map(t => ({ ...t })))
  const done  = taches.filter(t => t.done).length
  const total = taches.length
  const prog  = Math.round((done / total) * 100)

  const toggleTache = (id) => {
    setTaches(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(26,26,46,.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)", padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 22, padding: 32,
        width: "100%", maxWidth: 520,
        boxShadow: "0 30px 80px rgba(0,0,0,.2)",
        maxHeight: "85vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
            {groupe.nom} — Détail
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}>
            <Svg d={IC.x} size={20} />
          </button>
        </div>

        {/* Membres */}
        <div style={{ background: "#f8f6fc", borderRadius: 12, padding: 14, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 10, textTransform: "uppercase", letterSpacing: .4 }}>Étudiants</div>
          {groupe.etudiants.map(e => (
            <div key={e} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11 }}>
                {e.charAt(0)}
              </div>
              <span style={{ fontSize: 13, color: "#2d2d4e" }}>{e}</span>
            </div>
          ))}
        </div>

        {/* Progression */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>Progression globale</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed" }}>{prog}%</span>
          </div>
          <ProgressBar value={prog} height={10} />
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>{done}/{total} tâches complétées</div>
        </div>

        {/* Tâches cochables — mise à jour dynamique */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 12, textTransform: "uppercase", letterSpacing: .4 }}>Tâches du projet</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {taches.map(t => (
              <div key={t.id} onClick={() => toggleTache(t.id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: t.done ? "#f0fdf4" : "#f8f6fc",
                borderRadius: 10, padding: "11px 14px",
                cursor: "pointer", border: `1px solid ${t.done ? "#86efac" : "#f0edf8"}`,
                transition: "all .15s",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: t.done ? "#c8f000" : "#fff",
                  border: t.done ? "none" : "2px solid #d4c5f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {t.done && <Svg d={IC.check} size={13} color="#1a1a2e" />}
                </div>
                <span style={{ fontSize: 13, color: "#2d2d4e", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? .6 : 1 }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button onClick={onClose} style={{
            padding: "10px 24px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
            color: "#fff", fontWeight: 700, fontSize: 13,
            cursor: "pointer", fontFamily: "inherit",
          }}>Fermer</button>
        </div>
      </div>
    </div>
  )
}

// ── Onglet Informations ───────────────────────────────────────
function TabInfos({ sae, detail }) {
  const debut  = new Date(detail.dateDebut)
  const limite = new Date(detail.dateLimite)
  const today  = new Date()
  const totalJours   = Math.max(1, Math.round((limite - debut) / 86400000))
  const joursEcoules = Math.max(0, Math.min(totalJours, Math.round((today - debut) / 86400000)))
  const progTemps    = Math.round((joursEcoules / totalJours) * 100)
  const totalEtudiants = detail.groupes.reduce((acc, g) => acc + g.etudiants.length, 0)

  return (
    <div>
      {/* Stats rapides */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <StatBox label="Progression" value={`${detail.progressionGlobale}%`} />
        <StatBox label="Groupes"     value={detail.groupes.length} color="#9d5cf5" />
        <StatBox label="Étudiants"   value={totalEtudiants}        color="#0ea5e9" />
        <StatBox label="Rendus en attente" value={detail.depots.filter(d=>d.statut==="en_attente").length} color="#f59e0b" />
      </div>

      {/* Progression SAE */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 2px 16px rgba(0,0,0,.06)", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
          Progression globale
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "#888" }}>
          <span>Avancement du projet</span>
          <span style={{ fontWeight: 700, color: "#7c3aed" }}>{detail.progressionGlobale}%</span>
        </div>
        <ProgressBar value={detail.progressionGlobale} height={10} />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, marginBottom: 8, fontSize: 12, color: "#888" }}>
          <span>Temps écoulé</span>
          <span style={{ fontWeight: 700, color: progTemps > 80 ? "#ef4444" : "#7c3aed" }}>{progTemps}%</span>
        </div>
        <ProgressBar value={progTemps} color={progTemps > 80 ? "#ef4444" : "#7c3aed"} height={8} />
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
          Du {jj(detail.dateDebut)} au {jj(detail.dateLimite)}
        </div>
      </div>

      {/* Infos détaillées */}
      <div style={{ background: "#f8f6fc", borderRadius: 16, padding: 22, marginBottom: 16, border: "1px solid #f0edf8" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e", marginBottom: 14 }}>
          Informations clés
        </div>
        {[
          { label: "Statut",       value: <EtatBadge statut={detail.statut} /> },
          { label: "Parcours",     value: <span style={{ fontSize: 13, color: "#555" }}>{detail.parcours}</span> },
          { label: "Date de début", value: <span style={{ fontSize: 13, color: "#555" }}>{jj(detail.dateDebut)}</span> },
          { label: "Date limite",   value: <span style={{ fontSize: 13, color: "#555" }}>{jj(detail.dateLimite)}</span> },
          { label: "Groupes",       value: <span style={{ fontSize: 13, color: "#555" }}>{detail.groupes.length} groupes</span> },
          { label: "Étudiants",     value: <span style={{ fontSize: 13, color: "#555" }}>{totalEtudiants} étudiants au total</span> },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0edf8" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", minWidth: 120, textTransform: "uppercase", letterSpacing: .4 }}>{label}</span>
            {value}
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 2px 16px rgba(0,0,0,.06)", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>Description</div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{detail.description}</p>
      </div>

      {/* Consignes */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 2px 16px rgba(0,0,0,.06)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>Consignes</div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{detail.consignes}</p>
      </div>
    </div>
  )
}

// ── Onglet Groupes ────────────────────────────────────────────
function TabGroupes({ detail }) {
  const [groupeDetail, setGroupeDetail] = useState(null)

  return (
    <div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 20 }}>
        Groupes participants
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {detail.groupes.map(g => {
          const done = g.taches.filter(t => t.done).length
          const prog = Math.round((done / g.taches.length) * 100)

          return (
            <div key={g.id} style={{
              background: "#fff", borderRadius: 16, padding: 22,
              boxShadow: "0 2px 16px rgba(0,0,0,.06)",
              border: g.retard ? "2px solid #fca5a5" : "1px solid #f0edf8",
            }}>
              {/* En-tête groupe */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16 }}>
                    {g.id}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#1a1a2e" }}>{g.nom}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{g.etudiants.length} étudiant{g.etudiants.length > 1 ? "s" : ""}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Badge retard */}
                  {g.retard && (
                    <span style={{ background: "#fce7e7", color: "#991b1b", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      ⚠ En retard
                    </span>
                  )}
                  {/* Rendus */}
                  <span style={{
                    background: g.rendusEffectues === g.rendusAttendus ? "#dcfce7" : "#fef9c3",
                    color: g.rendusEffectues === g.rendusAttendus ? "#166534" : "#854d0e",
                    padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  }}>
                    {g.rendusEffectues}/{g.rendusAttendus} rendus
                  </span>
                  {/* Bouton voir détail */}
                  <button onClick={() => setGroupeDetail(g)} style={{
                    padding: "7px 16px", borderRadius: 10,
                    border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                    color: "#fff", fontSize: 12, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Svg d={IC.list} size={13} color="#fff" />
                    Voir détail
                  </button>
                </div>
              </div>

              {/* Liste des étudiants */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                {g.etudiants.map(e => (
                  <div key={e} style={{ display: "flex", alignItems: "center", gap: 7, background: "#f8f6fc", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#2d2d4e" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 9 }}>
                      {e.charAt(0)}
                    </div>
                    {e}
                  </div>
                ))}
              </div>

              {/* Barre de progression tâches */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: "#888" }}>Tâches complétées</span>
                  <span style={{ fontWeight: 700, color: prog === 100 ? "#22c55e" : "#7c3aed" }}>{done}/{g.taches.length} — {prog}%</span>
                </div>
                <ProgressBar value={prog} height={7} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Modale détail groupe */}
      {groupeDetail && (
        <GroupeDetailModal groupe={groupeDetail} onClose={() => setGroupeDetail(null)} />
      )}
    </div>
  )
}

// ── Onglet Ressources ─────────────────────────────────────────
function TabRessources({ detail }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>Ressources</div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Svg d={IC.plus} size={14} color="#fff" />
          Ajouter
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {detail.ressources.map(r => (
          <div key={r.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 10px rgba(0,0,0,.05)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0ebff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg d={IC.file} size={18} color="#7c3aed" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{r.nom}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{r.taille} · {jj(r.date)}</div>
            </div>
            <button style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #e0daf5", background: "none", fontSize: 12, color: "#7c3aed", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Onglet Dépôts ─────────────────────────────────────────────
function TabDepots({ detail }) {
  const [items, setItems] = useState(detail.depots)

  const StatutBadge = ({ statut }) => {
    const c = {
      en_attente: { label: "En attente", bg: "#fef9c3", color: "#854d0e" },
      valide:     { label: "Validé",     bg: "#dcfce7", color: "#166534" },
      refuse:     { label: "Refusé",     bg: "#fce7e7", color: "#991b1b" },
    }[statut]
    return <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{c.label}</span>
  }

  return (
    <div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 20 }}>Dépôts</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(d => (
          <div key={d.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 10px rgba(0,0,0,.05)", flexWrap: "wrap" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0ebff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg d={IC.file} size={18} color="#7c3aed" />
            </div>
            <div style={{ flex: 1, minWidth: 100 }}>
              <div style={{ fontSize: 12, color: "#9d5cf5", fontWeight: 700, marginBottom: 2 }}>{d.groupe}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{d.etudiant}</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>{d.fichier} · {jj(d.date)}</div>
            </div>
            <StatutBadge statut={d.statut} />
            {d.statut === "en_attente" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setItems(p => p.map(v => v.id === d.id ? { ...v, statut: "refuse" } : v))} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #fca5a5", background: "none", fontSize: 11, color: "#ef4444", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Refuser</button>
                <button onClick={() => setItems(p => p.map(v => v.id === d.id ? { ...v, statut: "valide" } : v))} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#22c55e", fontSize: 11, color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Valider</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Onglet Annonces ───────────────────────────────────────────
function TabAnnonces({ detail }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>Annonces</div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#9d5cf5)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Svg d={IC.plus} size={14} color="#fff" />
          Nouvelle annonce
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {detail.annonces.map(a => (
          <div key={a.id} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{a.titre}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{jj(a.date)}</span>
            </div>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{a.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function SAEDetail() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const [tab, setTab] = useState("infos")

  const sae    = SAES.find(s => s.id === parseInt(id))
  const detail = SAE_DETAILS[parseInt(id)]

  if (!sae || !detail) {
    return (
      <PageLayout title="SAE introuvable">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ color: "#666" }}>Cette SAE n'existe pas.</p>
          <button onClick={() => navigate("/teacher/saes")} style={{ marginTop: 16, padding: "10px 20px", borderRadius: 10, border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
            Retour à la liste
          </button>
        </div>
      </PageLayout>
    )
  }

  const TABS = [
    { id: "infos",      label: "Aperçu"      },
    { id: "groupes",    label: `Groupes (${detail.groupes.length})` },
    { id: "ressources", label: "Ressources"  },
    { id: "depots",     label: "Dépôts"      },
    { id: "annonces",   label: "Annonces"    },
  ]

  return (
    <PageLayout title="">

      {/* ── Bandeau titre ── */}
      <div style={{ background: "#1a1a2e", borderRadius: 16, overflow: "hidden", marginBottom: 0 }}>
        <button onClick={() => navigate("/teacher/saes")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.4)", fontSize: 12, padding: "14px 20px 0", fontFamily: "inherit" }}>
          <Svg d={IC.arrow} size={14} color="rgba(255,255,255,.4)" />
          Retour à la liste
        </button>

        <div style={{ padding: "10px 24px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: .5 }}>{sae.semestre}</div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 900, color: "#c8f000", lineHeight: 1.2 }}>
              {sae.code} — {sae.titre}
            </h1>
          </div>
          <EtatBadge statut={detail.statut} />
        </div>

        {/* Onglets */}
        <div style={{ display: "flex", padding: "0 20px", overflowX: "auto", marginTop: 14 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "13px 20px", background: "none", border: "none",
              borderBottom: tab === t.id ? "2px solid #7c3aed" : "2px solid transparent",
              color: tab === t.id ? "#fff" : "rgba(255,255,255,.45)",
              fontWeight: tab === t.id ? 700 : 400,
              fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              whiteSpace: "nowrap", transition: "all .15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Contenu ── */}
      <div style={{ background: "#fff", borderRadius: "0 0 16px 16px", padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,.06)", marginBottom: 20 }}>
        {tab === "infos"      && <TabInfos     sae={sae} detail={detail} />}
        {tab === "groupes"    && <TabGroupes   detail={detail} />}
        {tab === "ressources" && <TabRessources detail={detail} />}
        {tab === "depots"     && <TabDepots    detail={detail} />}
        {tab === "annonces"   && <TabAnnonces  detail={detail} />}
      </div>
    </PageLayout>
  )
}