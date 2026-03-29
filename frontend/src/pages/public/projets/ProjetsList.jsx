// ============================================================
//  pages/public/ProjetsList.jsx
//  Grille masonry de tous les projets — Route : /public/projets
//
//  DEUX MODES :
//  - Vue publique (defaut) : affiche tous les projets visibles
//  - Mode prof (isProf=true) : affiche des checkboxes pour
//    masquer/supprimer des projets de la vue publique
//
//  Pour simuler le mode prof, passe la prop isProf={true}
//  depuis ta route enseignant, ex:
//    <Route path="/prof/projets" element={<ProjetsList isProf />} />
//
//  Sans context, sans Redux : on gère la visibilité localement
//  avec useState sur une copie du tableau PROJETS.
//  Quand tu auras une API : appelle DELETE /api/projets/:id
// ============================================================

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { PROJETS, CATEGORIES } from "../../../data/mockData.js";

import { PROJETS, CATEGORIES } from "../../../data/mockData";

// ── Styles ───────────────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #221A47; }
  button { font-family: 'DM Sans', sans-serif; cursor: pointer; border: none; background: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Masonry CSS natif */
  .masonry {
    columns: 3;
    column-gap: 10px;
  }
  @media (max-width: 700px) { .masonry { columns: 2; } }
  @media (max-width: 420px) { .masonry { columns: 1; } }

  /* Carte */
  .projet-card {
    break-inside: avoid;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 10px;
    position: relative;
    animation: fadeUp .4s ease both;
    cursor: pointer;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
  }
  .projet-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,.16); }
  .projet-card img { width: 100%; display: block; transition: transform .4s ease; }
  .projet-card:hover img { transform: scale(1.04); }

  /* Overlay hover */
  .card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 55%);
    opacity: 0; transition: opacity .22s;
    display: flex; align-items: flex-end; padding: 16px;
  }
  .projet-card:hover .card-overlay { opacity: 1; }

  /* Mode prof : overlay masqué */
  .card-masked { opacity: .35; filter: grayscale(1); }

  /* Checkbox prof */
  .prof-checkbox {
    position: absolute; top: 10px; left: 10px; z-index: 10;
    width: 22px; height: 22px; border-radius: 6px;
    border: 2px solid #fff;
    background: rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .15s;
    backdrop-filter: blur(4px);
  }
  .prof-checkbox.checked {
    background: #ef4444; border-color: #ef4444;
  }

  /* Chips filtres */
  .chip input { display: none; }
  .chip label {
    display: inline-block; padding: 7px 15px; border-radius: 30px;
    border: 1.5px solid #ddd; font-size: 12px; font-weight: 500;
    color: #555; cursor: pointer; transition: all .15s; white-space: nowrap;
    user-select: none;
  }
  .chip label:hover { border-color: #7c3aed; color: #7c3aed; }
  .chip input:checked + label { background: #221A47; border-color: #221A47; color: #fff; font-weight: 600; }
`

// ── Header ────────────────────────────────────────────────────
function Header({ isProf }) {
  const navigate = useNavigate()
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,.07)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 24px",
    }}>
      <div onClick={() => navigate("/public")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 30, color: "#7c3aed", lineHeight: 1 }}>M</span>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, color: "#221A47", lineHeight: 1.3 }}>
          <em>y</em><br/>Multimedia<br/>Interface
        </div>
      </div>

      {/* Badge mode prof */}
      {isProf && (
        <span style={{
          background: "#7c3aed", color: "#fff",
          fontSize: 11, fontWeight: 700, padding: "4px 12px",
          borderRadius: 20, letterSpacing: .3,
        }}>
          Mode enseignant
        </span>
      )}

      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: isProf
          ? "linear-gradient(135deg,#5b21b6,#7c3aed)"
          : "linear-gradient(135deg,#7c3aed,#a78bfa)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Syne',sans-serif", fontWeight: 900, color: "#fff", fontSize: 15,
        boxShadow: "0 4px 12px rgba(124,58,237,.3)",
      }}>
        {isProf ? "P" : "S"}
      </div>
    </header>
  )
}

// ══════════════════════════════════════════════════════════════
//  PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════
export default function ProjetsList({ isProf = false }) {
  const navigate = useNavigate()

  // Copie locale des projets avec leur visibilité
  // En prod : fetch("/api/projets") dans useEffect
  const [projets, setProjets] = useState(PROJETS)

  const [categorieActive, setCategorieActive] = useState(null)
  const [tri, setTri]                         = useState("recent")
  const [showTri, setShowTri]                 = useState(false)
  // Ids cochés pour suppression (mode prof)
  const [cochés, setCochés]                   = useState(new Set())
  const [confirmVisible, setConfirmVisible]   = useState(false)

  // ── Filtrage + tri ─────────────────────────────────────────
  const projetsFiltres = projets
    .filter(p => p.visible)
    .filter(p => !categorieActive || p.categorie === categorieActive)
    .sort((a, b) => tri === "alpha" ? a.titre.localeCompare(b.titre) : 0)

  // En mode prof, on inclut aussi les masqués (avec style grisé)
  const projetsProf = projets
    .filter(p => !categorieActive || p.categorie === categorieActive)
    .sort((a, b) => tri === "alpha" ? a.titre.localeCompare(b.titre) : 0)

  const liste = isProf ? projetsProf : projetsFiltres

  // ── Handlers mode prof ────────────────────────────────────
  const toggleCoche = (id, e) => {
    e.stopPropagation()
    setCochés(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const masquerSelection = () => {
    setProjets(prev => prev.map(p =>
      cochés.has(p.id) ? { ...p, visible: false } : p
    ))
    setCochés(new Set())
    setConfirmVisible(false)
    // En prod : cochés.forEach(id => fetch(`/api/projets/${id}`, { method: "DELETE" }))
  }

  const restaurerProjet = (id, e) => {
    e.stopPropagation()
    setProjets(prev => prev.map(p => p.id === id ? { ...p, visible: true } : p))
  }

  return (
    <>
      <style>{STYLE}</style>
      <Header isProf={isProf} />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 16px 80px" }}>

        {/* Titre */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(20px, 4vw, 30px)", color: "#221A47",
          textAlign: "center", marginBottom: 28, letterSpacing: -.5,
        }}>
          Les projets des étudiants MMI
        </h1>

        {/* ── Bandeau mode prof ── */}
        {isProf && (
          <div style={{
            background: cochés.size > 0 ? "#fef2f2" : "#f4f0fb",
            border: `1.5px solid ${cochés.size > 0 ? "#fecaca" : "#e0d5f5"}`,
            borderRadius: 14, padding: "14px 20px",
            marginBottom: 24,
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ fontSize: 13, color: cochés.size > 0 ? "#dc2626" : "#7c3aed", fontWeight: 600 }}>
              {cochés.size > 0
                ? `${cochés.size} projet(s) sélectionné(s) — cochez pour masquer de la vue publique`
                : "✏️ Mode enseignant — cochez les projets à masquer de la vue publique"
              }
            </div>
            {cochés.size > 0 && (
              <button
                onClick={() => setConfirmVisible(true)}
                style={{
                  background: "#ef4444", color: "#fff",
                  border: "none", borderRadius: 10,
                  padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}
              >
                Masquer {cochés.size} projet(s)
              </button>
            )}
          </div>
        )}

        {/* ── Modal confirmation ── */}
        {confirmVisible && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}>
            <div style={{
              background: "#fff", borderRadius: 20,
              padding: "32px 36px", maxWidth: 400, width: "100%",
              boxShadow: "0 24px 60px rgba(0,0,0,.25)",
            }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "#221A47", marginBottom: 12 }}>
                Masquer {cochés.size} projet(s) ?
              </h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 24 }}>
                Ces projets ne seront plus visibles par le public. Tu pourras les restaurer en cliquant sur "Restaurer" depuis la vue enseignant.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button onClick={() => setConfirmVisible(false)} style={{
                  padding: "10px 20px", borderRadius: 10,
                  border: "1.5px solid #ddd", fontSize: 13, fontWeight: 600, color: "#555",
                  background: "none", cursor: "pointer",
                }}>Annuler</button>
                <button onClick={masquerSelection} style={{
                  padding: "10px 20px", borderRadius: 10,
                  background: "#ef4444", color: "#fff",
                  border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>Confirmer</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Filtres + tri ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
            {/* Chip Tous */}
            <div className="chip">
              <input type="radio" name="cat" id="cat-tous" checked={categorieActive === null} onChange={() => setCategorieActive(null)} />
              <label htmlFor="cat-tous">Tous</label>
            </div>
            {CATEGORIES.map(cat => (
              <div key={cat} className="chip">
                <input type="radio" name="cat" id={`cat-${cat}`} checked={categorieActive === cat} onChange={() => setCategorieActive(cat)} />
                <label htmlFor={`cat-${cat}`}>{cat}</label>
              </div>
            ))}
          </div>

          {/* Tri */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={() => setShowTri(v => !v)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", fontSize: 12, fontWeight: 700, color: "#221A47",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/>
              </svg>
              FILTRER ET TRIER
            </button>
            {showTri && (
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 6px)",
                background: "#fff", borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,.13)",
                border: "1px solid rgba(0,0,0,.07)",
                padding: "6px 0", zIndex: 50, minWidth: 190,
              }}>
                {[
                  { key: "recent", label: "Plus récents d'abord" },
                  { key: "alpha",  label: "Ordre alphabétique" },
                ].map(opt => (
                  <button key={opt.key} onClick={() => { setTri(opt.key); setShowTri(false) }} style={{
                    width: "100%", padding: "10px 18px", textAlign: "left",
                    fontSize: 13, fontWeight: tri === opt.key ? 700 : 400,
                    color: tri === opt.key ? "#7c3aed" : "#333",
                    background: tri === opt.key ? "#f4f0fb" : "none",
                    border: "none", cursor: "pointer",
                  }}>
                    {tri === opt.key && "✓ "}{opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Compteur */}
        <div style={{ fontSize: 12, color: "#aaa", marginBottom: 14, fontWeight: 500 }}>
          {isProf
            ? `${projets.filter(p => !p.visible).length} projet(s) masqué(s) · ${projetsFiltres.length} visible(s)`
            : `${projetsFiltres.length} projet(s)${categorieActive ? ` en ${categorieActive}` : ""}`
          }
        </div>

        {/* ── Grille masonry ── */}
        {liste.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 20px", color: "#bbb", fontSize: 14 }}>
            Aucun projet dans cette catégorie.
          </div>
        ) : (
          <div className="masonry">
            {liste.map((projet, i) => (
              <div
                key={projet.id}
                className={`projet-card ${isProf && !projet.visible ? "card-masked" : ""}`}
                style={{ animationDelay: `${i * 35}ms` }}
                onClick={() => !isProf && navigate(`/public/projets/${projet.id}`)}
              >
                <img src={projet.photoMain} alt={projet.titre} loading="lazy" />

                {/* Overlay titre (vue publique) */}
                {!isProf && (
                  <div className="card-overlay">
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 14, color: "#fff", marginBottom: 2 }}>
                        {projet.titre}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)" }}>{projet.auteur}</div>
                    </div>
                  </div>
                )}

                {/* Mode prof : checkbox de sélection */}
                {isProf && projet.visible && (
                  <div
                    className={`prof-checkbox ${cochés.has(projet.id) ? "checked" : ""}`}
                    onClick={e => toggleCoche(projet.id, e)}
                  >
                    {cochés.has(projet.id) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                )}

                {/* Mode prof : badge "masqué" + bouton restaurer */}
                {isProf && !projet.visible && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 10,
                  }}>
                    <span style={{
                      background: "rgba(0,0,0,.65)", color: "#fff",
                      fontSize: 11, fontWeight: 700, padding: "4px 12px",
                      borderRadius: 20, letterSpacing: .5,
                    }}>MASQUÉ</span>
                    <button
                      onClick={e => restaurerProjet(projet.id, e)}
                      style={{
                        background: "#fff", color: "#221A47",
                        border: "none", borderRadius: 10,
                        padding: "7px 16px", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                      }}
                    >
                      Restaurer
                    </button>
                  </div>
                )}

                {/* Mode prof : overlay titre toujours visible */}
                {isProf && projet.visible && (
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,.7), transparent)",
                    padding: "20px 12px 10px",
                  }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff" }}>
                      {projet.titre}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)" }}>{projet.auteur}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}