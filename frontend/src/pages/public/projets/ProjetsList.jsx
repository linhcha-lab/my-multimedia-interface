import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// ── STYLE ───────────────────────────────────────────────────
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: #fff;
  color: #221A47;
}

.masonry {
  columns: 3;
  column-gap: 10px;
}
@media (max-width: 700px) { .masonry { columns: 2; } }
@media (max-width: 420px) { .masonry { columns: 1; } }

.projet-card {
  break-inside: avoid;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  transition: transform .25s ease, box-shadow .25s ease;
}

.projet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(0,0,0,.16);
}

.projet-card img {
  width: 100%;
  display: block;
  transition: transform .4s ease;
}

.projet-card:hover img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.75), transparent);
  opacity: 0;
  transition: opacity .25s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.projet-card:hover .card-overlay {
  opacity: 1;
}

.card-overlay h3 {
  font-family: 'Syne', sans-serif;
  font-weight: 900;
  font-size: 14px;
  color: #fff;
}

.card-overlay p {
  font-size: 11px;
  color: rgba(255,255,255,.7);
}

/* CHIPS */
.chip input { display: none; }

.chip label {
  display: inline-block;
  padding: 7px 15px;
  border-radius: 30px;
  border: 1.5px solid #ddd;
  font-size: 12px;
  color: #555;
  cursor: pointer;
  transition: .2s;
}

.chip label:hover {
  border-color: #7c3aed;
  color: #7c3aed;
}

.chip input:checked + label {
  background: #221A47;
  color: #fff;
  border-color: #221A47;
}
`

// ── HEADER ───────────────────────────────────────────────────
function Header() {
  const navigate = useNavigate()

  return (
    <header style={{
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee"
    }}>
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <strong>MMI</strong>
      </div>
    </header>
  )
}

// ══════════════════════════════════════════════════════════════
export default function ProjetsList() {
  const navigate = useNavigate()

  const [projets, setProjets] = useState([])
  const [categories, setCategories] = useState([])
  const [categorieActive, setCategorieActive] = useState(null)

  // ── FETCH PROJECTS ─────────────────────────────────────────
 useEffect(() => {
  fetch("http://localhost:8000/api/projects")
    .then(res => res.json())
    .then(data => {
      const formatted = data.map(p => ({
        id: p.id,
        titre: p.title,
        auteur: "Étudiant MMI",
        categories: p.tags.map(t => t.name),

        // ✅ FIX ICI
        photoMain: p.images?.[0]
          ? "http://localhost:8000" + p.images[0]
          : "/placeholder.png"
      }))

      setProjets(formatted)
    })
}, [])

  // ── FETCH TAGS ─────────────────────────────────────────────
  useEffect(() => {
    fetch("http://localhost:8000/api/tags")
      .then(res => res.json())
      .then(data => {
        setCategories(data.map(t => t.name))
      })
  }, [])

  // ── FILTRE ────────────────────────────────────────────────
  const projetsFiltres = projets.filter(p =>
    !categorieActive || p.categories.includes(categorieActive)
  )

  return (
    <>
      <style>{STYLE}</style>
      <Header />

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>

        <h1 style={{
          textAlign: "center",
          marginBottom: 30,
          fontFamily: "'Syne', sans-serif"
        }}>
          Les projets MMI
        </h1>

        {/* ── FILTRES ───────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>

          {/* TOUS */}
          <div className="chip">
            <input
              type="radio"
              name="cat"
              id="cat-tous"
              checked={categorieActive === null}
              onChange={() => setCategorieActive(null)}
            />
            <label htmlFor="cat-tous">Tous</label>
          </div>

          {/* TAGS */}
          {categories.map(cat => {
            const id = `cat-${cat.replace(/\s+/g, "-")}`

            return (
              <div key={cat} className="chip">
                <input
                  type="radio"
                  name="cat"
                  id={id}
                  checked={categorieActive === cat}
                  onChange={() => setCategorieActive(cat)}
                />
                <label htmlFor={id}>{cat}</label>
              </div>
            )
          })}
        </div>

        {/* ── GRID ───────────────────────── */}
        <div className="masonry">
          {projetsFiltres.map(projet => (
            <div
              key={projet.id}
              className="projet-card"
              onClick={() => navigate(`/public/projets/${projet.id}`)}
            >
              <img src={projet.photoMain} alt={projet.titre} />

              <div className="card-overlay">
                <div>
                  <h3>{projet.titre}</h3>
                  <p>{projet.auteur}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </>
  )
}