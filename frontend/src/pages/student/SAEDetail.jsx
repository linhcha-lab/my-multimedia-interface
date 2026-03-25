// ============================================================
//  pages/student/SAEDetail.jsx — Détail d'une SAE (vue étudiant)
//  URL : /student/saes/:id
//
//  Structure fidèle à la maquette :
//  ┌─────────────────────────────────────────────────────┐
//  │  Bandeau violet — titre SAE en jaune (gros)         │
//  ├─────────────────────────────────────────────────────┤
//  │  ┌─────────────────────────────────────────────┐    │
//  │  │ Tabs : Aperçu | Tâches | Ressources | …     │    │
//  │  │ ─────────────────────────────────────────── │    │
//  │  │ Aperçu du projet     [Voir les membres]     │    │
//  │  │ ┌─────────────────────────────────────────┐ │    │
//  │  │ │ Description                             │ │    │
//  │  │ │ Concevoir une application web…          │ │    │
//  │  │ └─────────────────────────────────────────┘ │    │
//  │  │ ┌─────────────────────────────────────────┐ │    │
//  │  │ │ Informations clés                       │ │    │
//  │  │ │ Statut :                                │ │    │
//  │  │ │ Date limite :                           │ │    │
//  │  │ │ Progression :                           │ │    │
//  │  │ └─────────────────────────────────────────┘ │    │
//  │  │ ════════════════════════════════════        │    │
//  │  └─────────────────────────────────────────────┘    │
//  └─────────────────────────────────────────────────────┘
// ============================================================

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { Svg, IC }       from "../../components/common/Icons"
import { SAES_STUDENT }  from "../../data/mockData"

// ── Données fictives ──────────────────────────────────────────
const SAE_DETAILS = {
  1: {
    description: "Concevoir une application web responsive en utilisant React et Node.js. L'application devra répondre aux exigences ergonomiques vues en cours.",
    statut: "En cours",
    dateLimite: "12/08/2025",
    maProgression: 70,
    groupe: "Groupe 1",
    membres: ["Sarah Donsoun", "Linh Chassang", "Marine Boyer"],
    taches: [
      { id: 1, label: "Analyse des besoins",        done: true  },
      { id: 2, label: "Maquettes Figma",             done: true  },
      { id: 3, label: "Configurer le projet React",  done: true  },
      { id: 4, label: "Intégration des composants",  done: false },
      { id: 5, label: "Mise en place de l'API",      done: false },
      { id: 6, label: "Tests et recettage",          done: false },
    ],
    ressources: [
      { id: 1, nom: "Brief_SAE403.pdf",      taille: "1.2 Mo", date: "2025-02-01" },
      { id: 2, nom: "Consignes_React.pdf",   taille: "0.8 Mo", date: "2025-02-05" },
      { id: 3, nom: "Grille_evaluation.pdf", taille: "0.5 Mo", date: "2025-02-10" },
    ],
    mesDepots: [
      { id: 1, fichier: "rendu_v1.zip",   date: "2025-03-10", statut: "valide"     },
      { id: 2, fichier: "rapport_v2.pdf", date: "2025-03-11", statut: "en_attente" },
    ],
    annonces: [
      { id: 1, titre: "Rappel échéance",     date: "2025-03-08", contenu: "N'oubliez pas de rendre avant vendredi 17h." },
      { id: 2, titre: "Nouvelles consignes", date: "2025-03-05", contenu: "Les maquettes doivent inclure la version mobile." },
    ],
  },
}
// Copie pour les autres SAE
for (let i = 2; i <= 6; i++) {
  SAE_DETAILS[i] = {
    ...SAE_DETAILS[1],
    statut:        i <= 4 ? "En cours" : i === 5 ? "Terminé" : "À venir",
    maProgression: [70, 10, 45, 30, 90, 100][i - 1] || 0,
    dateLimite:    ["12/08/2025","10/05/2025","04/09/2025","29/08/2025","15/03/2025","15/12/2024"][i - 1],
  }
}

// ── Onglet Aperçu — fidèle à la maquette ─────────────────────
function TabApercu({ sae, detail }) {
  const [showMembres, setShowMembres] = useState(false)

  return (
    <div>

      {/* Ligne "Aperçu du projet" + bouton */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24, flexWrap: "wrap", gap: 12,
      }}>
        <h2 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: 20, fontWeight: 800, color: "#221A47",
        }}>
          Aperçu du projet
        </h2>
        <button onClick={() => setShowMembres(!showMembres)} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 18px", borderRadius: 10,
          border: "none", background: "#7c3aed",
          color: "#fff", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          <Svg d={IC.students} size={16} color="#fff" />
          Voir les membres du groupe
        </button>
      </div>

      {/* Membres (déroulant) */}
      {showMembres && (
        <div style={{
          background: "#f0ebff", borderRadius: 12,
          padding: 16, marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 10, textTransform: "uppercase", letterSpacing: .4 }}>
            {detail.groupe}
          </div>
          {detail.membres.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "7px 0",
              borderBottom: i < detail.membres.length - 1 ? "1px solid #e0d5f5" : "none",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0,
              }}>
                {m.charAt(0)}
              </div>
              <span style={{ fontSize: 13, color: "#2d2d4e" }}>{m}</span>
            </div>
          ))}
        </div>
      )}

      {/* Carte Description — fond gris clair + ombre portée */}
      <div style={{
        background: "#F5F4F1",
        borderRadius: 12,
        padding: "20px 22px",
        marginBottom: 18,
        boxShadow: "-2px 4px 14px rgba(0,0,0,.12)",
      }}>
        <div style={{
          fontSize: 14, fontWeight: 700,
          color: "#221A47", marginBottom: 10,
        }}>
          Description
        </div>
        <div style={{ fontSize: 13, color: "#221A47", lineHeight: 1.7 }}>
          {detail.description}
        </div>
      </div>

      {/* Carte Informations clés — fond gris clair + ombre portée */}
      <div style={{
        background: "#F5F4F1",
        borderRadius: 12,
        padding: "20px 22px",
        marginBottom: 24,
        boxShadow: "-2px 4px 14px rgba(0,0,0,.12)",
      }}>
        <div style={{
          fontSize: 14, fontWeight: 700,
          color: "#221A47", marginBottom: 14,
        }}>
          Informations clés
        </div>
        {[
          { label: "Statut :",      value: detail.statut       },
          { label: "Date limite :", value: detail.dateLimite   },
          { label: "Progression :", value: `${detail.maProgression}%` },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", gap: 8,
            marginBottom: 8, fontSize: 13,
          }}>
            <span style={{ fontWeight: 700, color: "#373057", minWidth: 110 }}>
              {label}
            </span>
            <span style={{ color: "#555" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Barre de progression — pleine largeur */}
      <div style={{
        background: "#888",
        borderRadius: 6, height: 9, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${detail.maProgression}%`,
          background: "#7c3aed",
          borderRadius: 6,
          transition: "width .6s ease",
        }} />
      </div>
    </div>
  )
}

// ── Onglet Tâches ─────────────────────────────────────────────
function TabTaches({ detail }) {
  const done  = detail.taches.filter(t => t.done).length
  const total = detail.taches.length

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#221A47" }}>Tâches</h2>
        <span style={{ fontSize: 13, color: "#7c3aed", fontWeight: 700 }}>{done}/{total} complétées</span>
      </div>
      <div style={{ background: "#e8e4f0", borderRadius: 6, height: 8, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 6, width: `${(done / total) * 100}%`, background: "#7c3aed" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {detail.taches.map(t => (
          <div key={t.id} style={{
            background: "#F5F4F1", borderRadius: 12, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 14,
            boxShadow: "-2px 4px 14px rgba(0,0,0,.08)",
            opacity: t.done ? 0.7 : 1,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
              background: t.done ? "#c8f000" : "#fff",
              border: t.done ? "none" : "2px solid #d4c5f5",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {t.done && <Svg d={IC.check} size={14} color="#1a1a2e" />}
            </div>
            <span style={{
              flex: 1, fontSize: 13, color: "#221A47",
              textDecoration: t.done ? "line-through" : "none",
            }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Onglet Ressources ─────────────────────────────────────────
function TabRessources({ detail }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#221A47", marginBottom: 20 }}>
        Ressources
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {detail.ressources.map(r => (
          <div key={r.id} style={{
            background: "#F5F4F1", borderRadius: 12, padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 14,
            boxShadow: "-2px 4px 14px rgba(0,0,0,.08)",
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#e8e4f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg d={IC.file} size={18} color="#7c3aed" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#221A47" }}>{r.nom}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{r.taille} · {new Date(r.date).toLocaleDateString("fr-FR")}</div>
            </div>
            <button style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #d4c5f5", background: "none", fontSize: 12, color: "#7c3aed", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#221A47" }}>Mes dépôts</h2>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10, border: "none", background: "#7c3aed", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Svg d={IC.plus} size={14} color="#fff" /> Déposer un fichier
        </button>
      </div>
      <div style={{ border: "2px dashed #d4c5f5", borderRadius: 12, padding: "24px 20px", textAlign: "center", marginBottom: 20, background: "#faf8ff" }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>📁</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed", marginBottom: 4 }}>Glisse-dépose ton fichier ici</div>
        <div style={{ fontSize: 11, color: "#aaa" }}>PDF, ZIP, Figma… max 50 Mo</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {detail.mesDepots.map(d => (
          <div key={d.id} style={{ background: "#F5F4F1", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "-2px 4px 14px rgba(0,0,0,.08)", flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#e8e4f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Svg d={IC.file} size={18} color="#7c3aed" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#221A47" }}>{d.fichier}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{new Date(d.date).toLocaleDateString("fr-FR")}</div>
            </div>
            <StatutBadge statut={d.statut} />
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
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#221A47", marginBottom: 20 }}>Annonces</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {detail.annonces.map(a => (
          <div key={a.id} style={{ background: "#F5F4F1", borderRadius: 12, padding: 20, boxShadow: "-2px 4px 14px rgba(0,0,0,.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#221A47" }}>{a.titre}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{new Date(a.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{a.contenu}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────
export default function SAEDetailStudent() {
  const { id }        = useParams()
  const navigate      = useNavigate()
  const [tab, setTab] = useState("apercu")

  const sae    = SAES_STUDENT.find(s => s.id === parseInt(id))
  const detail = SAE_DETAILS[parseInt(id)]

  if (!sae || !detail) {
    return (
      <PageLayoutStudent title="SAE introuvable">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ color: "#666" }}>Cette SAE n'existe pas.</p>
          <button onClick={() => navigate("/student/saes")} style={{ marginTop: 16, padding: "10px 20px", borderRadius: 10, border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
            Retour à mes SAE
          </button>
        </div>
      </PageLayoutStudent>
    )
  }

  const TABS = [
    { id: "apercu",     label: "Aperçu"     },
    { id: "taches",     label: "Tâches"     },
    { id: "ressources", label: "Ressources" },
    { id: "depots",     label: "Dépôts"     },
    { id: "annonces",   label: "Annonces"   },
  ]

  return (
    // PageLayoutStudent sans titre (on gère l'en-tête nous-mêmes)
    <PageLayoutStudent title="">

      {/* ── Bandeau violet + titre jaune ── */}
      <div style={{
        background: "#221A47",
        borderRadius: "16px 16px 0 0",
        padding: "14px 28px 0",
        // Le bandeau ne ferme pas en bas : il est fusionné avec le bloc blanc
      }}>

        {/* Bouton retour */}
        <button onClick={() => navigate("/student/saes")} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,.4)", fontSize: 12,
          fontFamily: "inherit", marginBottom: 10, padding: 0,
        }}>
          <Svg d={IC.arrow} size={14} color="rgba(255,255,255,.4)" />
          Retour à mes SAE
        </button>

        {/* Titre en jaune — grosse typo comme sur la maquette */}
        <h1 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: 28, fontWeight: 900,
          color: "#E5FF3C",         // jaune citron de la maquette
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          {sae.code} — {sae.titre}
        </h1>

        {/* ── Onglets dans le bandeau ── */}
        <div style={{
          display: "flex", gap: 0,
          overflowX: "auto",
          // Pas de border-bottom global : chaque tab gère sa ligne
        }}>
          {TABS.map(t => {
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "12px 22px",
                background: "none", border: "none",
                // Soulignement violet pour l'onglet actif, transparent sinon
                borderBottom: active
                  ? "3px solid #854AFF"
                  : "3px solid transparent",
                color: active ? "#fff" : "rgba(255,255,255,.45)",
                fontWeight: active ? 700 : 400,
                fontSize: 14, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
                transition: "all .15s",
              }}>
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Zone de contenu blanche ── */}
      <div style={{
        background: "#fff",
        borderRadius: "0 0 16px 16px",
        padding: 28,
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
        marginBottom: 20,
      }}>
        {tab === "apercu"     && <TabApercu     sae={sae} detail={detail} />}
        {tab === "taches"     && <TabTaches     detail={detail} />}
        {tab === "ressources" && <TabRessources detail={detail} />}
        {tab === "depots"     && <TabDepots     detail={detail} />}
        {tab === "annonces"   && <TabAnnonces   detail={detail} />}
      </div>

    </PageLayoutStudent>
  )
}