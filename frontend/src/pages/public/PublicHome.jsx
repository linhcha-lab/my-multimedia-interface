// pages/public/PublicHome.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// ── Hook responsive ───────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return { isMobile: w < 600, isTablet: w < 900, width: w }
}

// ── Lecture de la session (localStorage) ─────────────────────
// Login.jsx sauvegarde : localStorage.setItem("userRole", "teacher" | "student")
// PublicHome le lit ici pour afficher le bon bouton dans le header
function useSession() {
  const [role, setRole] = useState(() => localStorage.getItem("userRole") || null)

  const logout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    setRole(null)
  }

  return { role, logout }
}

// ── Styles globaux ────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body, #root { min-height: 100%; }
  body { font-family: 'DM Sans', sans-serif; background: #7c3aed; }
  button { font-family: 'DM Sans', sans-serif; cursor: pointer; }
  textarea:focus, input:focus { outline: none; }
  img { display: block; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.3); border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  .card-enter { animation: fadeUp .5s ease both; }
  .hero-enter { animation: scaleIn .6s ease both; }
  .btn-yellow:hover { transform: scale(1.05) !important; }
  .btn-dark:hover   { opacity: .82 !important; }
  .projet-card:hover { transform: translateY(-8px) !important; box-shadow: 0 20px 50px rgba(0,0,0,.28) !important; }
`

// ── Tokens ────────────────────────────────────────────────────
const C = {
  violet:  "#7c3aed",
  violetD: "#5b21b6",
  navy:    "#221A47",
  jaune:   "#d4ff00",
  blanc:   "#ffffff",
  beige:   "#f0ebe3",
  lilas:   "#d4bbf5",
}

// ── Données projets ───────────────────────────────────────────
const PROJETS = [
  {
    id: 1,
    titre: "FuturProof",
    auteur: "par Bastien Lecarpentier",
    date: "02/04/2026",
    categorie: "Réalité Virtuelle",
    cardBg: C.jaune,
    Illus: () => (
      <div style={{ width:"100%",height:"100%",background:"linear-gradient(160deg,#1e3a8a 0%,#2563eb 55%,#1d4ed8 100%)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"38%",background:"linear-gradient(180deg,#1e40af,#1e3a8a)" }} />
        <div style={{ width:62,height:122,background:"#0f172a",borderRadius:13,border:"2px solid #334155",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"7px 5px",zIndex:2,transform:"rotate(-8deg)",boxShadow:"0 24px 44px rgba(0,0,0,.55)" }}>
          <div style={{ width:24,height:4,background:"#1e293b",borderRadius:2 }} />
          <div style={{ flex:1,width:"100%",background:"linear-gradient(135deg,#c8f000,#7c3aed)",borderRadius:7,margin:"4px 0",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontSize:7,fontWeight:900,color:"#fff",letterSpacing:1 }}>FUTURPROOF</span>
          </div>
          <div style={{ width:16,height:16,borderRadius:"50%",border:"1.5px solid #334155" }} />
        </div>
        <div style={{ position:"absolute",bottom:12,left:"28%",width:20,height:38,background:"rgba(199,210,254,.3)",borderRadius:"50% 50% 0 0" }} />
      </div>
    ),
  },
  {
    id: 2,
    titre: "MANY",
    auteur: "par Elise Vazquez",
    date: "02/04/2026",
    categorie: "Webdesign",
    cardBg: C.jaune,
    Illus: () => (
      <div style={{ width:"100%",height:"100%",background:"#e8e0d4",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ width:"58%",height:"88%",background:"#fff",borderRadius:7,boxShadow:"0 6px 24px rgba(0,0,0,.25)",overflow:"hidden",display:"flex",flexDirection:"column" }}>
          <div style={{ background:"#1a1a2e",padding:"7px 10px" }}>
            <div style={{ fontSize:9,fontWeight:900,color:"#fff",letterSpacing:2 }}>MANY THINGS</div>
          </div>
          <div style={{ flex:1,background:"linear-gradient(180deg,#c4a882 0%,#8b6e52 100%)",display:"flex",alignItems:"flex-end",justifyContent:"center",position:"relative" }}>
            <div style={{ width:30,height:52,background:"#2d1a0e",borderRadius:"40% 40% 0 0" }} />
            <div style={{ position:"absolute",top:16,left:"50%",transform:"translateX(-50%)",width:22,height:22,background:"#d4b08a",borderRadius:"50%",border:"1.5px solid rgba(0,0,0,.2)" }} />
          </div>
        </div>
        <div style={{ position:"absolute",right:"8%",top:"8%",width:34,height:60,background:"#1a1a2e",borderRadius:9,boxShadow:"0 10px 22px rgba(0,0,0,.45)",overflow:"hidden" }}>
          <div style={{ width:"100%",height:"85%",background:"#b8905a",opacity:.7 }} />
        </div>
      </div>
    ),
  },
  {
    id: 3,
    titre: "Premia",
    auteur: "par Dounia Amrani",
    date: "02/04/2026",
    categorie: "Graphisme",
    cardBg: C.beige,
    Illus: () => (
      <div style={{ width:"100%",height:"100%",background:"#1a1a2e",borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ fontSize:72,fontWeight:900,color:"#fff",lineHeight:1,letterSpacing:-4 }}>A</div>
        <div style={{ position:"absolute",bottom:18,left:18,right:18 }}>
          <div style={{ height:1,background:"rgba(255,255,255,.14)",marginBottom:6 }} />
          <div style={{ fontSize:7,color:"rgba(255,255,255,.35)",letterSpacing:2,textTransform:"uppercase" }}>PREMIA DESIGN STUDIO</div>
        </div>
        <div style={{ position:"absolute",top:14,right:14,width:20,height:20,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.2)" }} />
      </div>
    ),
  },
]

const FAQ_QUESTIONS = [
  "Quel est le taux d'insertion professionnelle des diplômés ?",
  "La formation est-elle reconnue par l'État ?",
  "Est-il possible de faire un stage à l'international ?",
]

// ── Carte projet ──────────────────────────────────────────────
function ProjetCard({ projet, delay = 0 }) {
  const navigate = useNavigate()
  const { Illus } = projet
  return (
    <div
      className="projet-card card-enter"
      onClick={() => navigate(`/public/projets/${projet.id}`)}
      style={{
        background: projet.cardBg, borderRadius:18,
        padding:"14px 14px 18px", width:300,
        cursor:"pointer",
        transition:"transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease",
        boxShadow:"0 8px 28px rgba(0,0,0,.18)",
        animationDelay:`${delay}ms`, flexShrink:0,
      }}
    >
      <div style={{ display:"inline-flex",alignItems:"center",background:C.navy,color:"#fff",fontSize:10,fontWeight:700,padding:"5px 12px",borderRadius:20,marginBottom:10,letterSpacing:.4,whiteSpace:"nowrap" }}>
        {projet.categorie}
      </div>
      <div style={{ height:250,borderRadius:10,overflow:"hidden",marginBottom:16 }}>
        <Illus />
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:900,color:C.navy,marginBottom:3,lineHeight:1.2 }}>{projet.titre}</div>
      <div style={{ fontSize:12,color:"#3d3360",marginBottom:2,fontWeight:500 }}>{projet.auteur}</div>
      <div style={{ fontSize:12,color:"#7a6a9a",marginBottom:16 }}>{projet.date}</div>
      <button className="btn-dark" style={{ background:C.navy,color:"#fff",border:"none",borderRadius:30,padding:"9px 24px",fontSize:13,fontWeight:700,transition:"opacity .15s",letterSpacing:.3 }}>
        Voir +
      </button>
    </div>
  )
}

// ── Section MMI ───────────────────────────────────────────────
function SectionMMI({ isMobile, isTablet }) {
  return (
    <section style={{ background:C.violet, padding: isMobile?"60px 20px 56px":isTablet?"64px 36px 60px":"72px 60px 68px" }}>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?22:30,fontWeight:900,color:"#fff",textAlign:"center",marginBottom:isMobile?28:40,lineHeight:1.25 }}>
        Mais MMI, c'est quoi en fait ?
      </h2>

      {/* Grande carte */}
      <div style={{ background:"#fff",borderRadius:20,padding:isMobile?20:32,maxWidth:800,margin:"0 auto 20px",boxShadow:"0 12px 40px rgba(0,0,0,.12)" }}>
        <div style={{ display:"flex",flexDirection:isMobile?"column":"row",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",gap:isMobile?22:24,marginBottom:24,flexWrap:"wrap" }}>

          {/* Logo MMI */}
          <div style={{ minWidth:130 }}>
            {[{ l:"M",w:"étiers" },{ l:"M",w:"ultimedia" },{ l:"I",w:"nternet" }].map(({ l, w }) => (
              <div key={w} style={{ display:"flex",alignItems:"baseline",gap:2,lineHeight:1.5 }}>
                <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:22,color:C.violet }}>{l}</span>
                <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:C.navy }}>{w}</span>
              </div>
            ))}
          </div>

          {/* Badge 3 ans */}
          <div style={{ background:C.jaune,borderRadius:14,padding:"14px 24px",fontFamily:"'Syne',sans-serif",fontWeight:900,color:C.navy,display:"flex",alignItems:"center",gap:10,whiteSpace:"nowrap",boxShadow:"0 4px 14px rgba(212,255,0,.4)" }}>
            <span style={{ fontSize:15 }}>Un diplôme sur</span>
            <span style={{ fontSize:56,lineHeight:1 }}>3</span>
            <span style={{ fontSize:15 }}>ans</span>
          </div>

          {/* Camembert */}
          <svg width={isMobile?110:130} height={isMobile?110:130} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill={C.navy} />
            <path d="M50,50 L50,0 A50,50 0 0,1 100,50 Z" fill={C.jaune} />
            <line x1="50" y1="0" x2="50" y2="50" stroke="#fff" strokeWidth="1.5"/>
            <line x1="50" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="1.5"/>
            <text x="26" y="46" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">60% cours</text>
            <text x="26" y="56" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">pratiques</text>
            <text x="75" y="38" fill={C.navy} fontSize="6.5" fontWeight="bold" textAnchor="middle">40% cours</text>
            <text x="75" y="47" fill={C.navy} fontSize="6.5" fontWeight="bold" textAnchor="middle">théoriques</text>
          </svg>
        </div>

        {/* Spécialités */}
        <div style={{ display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" }}>
          <div style={{ background:C.lilas,borderRadius:12,padding:"13px 20px",fontSize:13,fontWeight:600,color:C.navy,textAlign:"center",lineHeight:1.4,flex:"1 1 140px" }}>Une spécialité<br />Création Numérique</div>
          <span style={{ fontSize:14,color:"#999",fontWeight:600 }}>ou</span>
          <div style={{ background:C.lilas,borderRadius:12,padding:"13px 20px",fontSize:13,fontWeight:600,color:C.navy,textAlign:"center",lineHeight:1.4,flex:"1 1 140px" }}>Une spécialité<br />Développement Web</div>
        </div>
      </div>

      {/* Mini-cartes */}
      <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16,maxWidth:800,margin:"0 auto" }}>
        <div style={{ background:"#fff",borderRadius:18,padding:isMobile?22:30,boxShadow:"0 8px 28px rgba(0,0,0,.1)" }}>
          <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:C.navy,marginBottom:22,lineHeight:1.3,textAlign:"center" }}>
            Une formation<br />professionnalisante
          </div>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <div style={{ background:C.lilas,borderRadius:10,padding:"12px 28px",fontSize:14,fontWeight:800,color:C.violet,letterSpacing:.5 }}>STAGE</div>
            <div style={{ background:C.jaune,borderRadius:10,padding:"12px 20px",fontSize:14,fontWeight:800,color:C.navy,letterSpacing:.5 }}>ALTERNANCE</div>
          </div>
        </div>
        <div style={{ background:"#fff",borderRadius:18,padding:isMobile?22:30,boxShadow:"0 8px 28px rgba(0,0,0,.1)" }}>
          <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:C.navy,marginBottom:22,lineHeight:1.3 }}>
            Des opportunités rêvées
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" }}>
            <div style={{ display:"flex",gap:5,flexShrink:0 }}>
              <img src="https://flagcdn.com/w40/pt.png" alt="Portugal" style={{ width:38,height:26,objectFit:"cover",borderRadius:4 }} onError={e=>e.target.style.display="none"} />
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada"   style={{ width:38,height:26,objectFit:"cover",borderRadius:4 }} onError={e=>e.target.style.display="none"} />
            </div>
            <div style={{ background:C.jaune,borderRadius:30,padding:"11px 20px",fontSize:13,fontWeight:700,color:C.navy,flex:1,textAlign:"center",whiteSpace:"nowrap" }}>
              Semestres à l'étranger
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section FAQ ───────────────────────────────────────────────
function SectionFAQ({ isMobile }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section style={{ background:"#0d0d0d", padding:isMobile?"64px 20px 80px":"90px 60px 100px" }}>
      <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"200px 1fr",gap:isMobile?48:64,maxWidth:920,margin:"0 auto",alignItems:"end" }}>

        <div style={{ display:"flex",alignItems:isMobile?"center":"flex-end",justifyContent:isMobile?"center":"flex-start",paddingBottom:isMobile?0:16,order:isMobile?2:1 }}>
          <span style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?90:140,fontWeight:900,color:"#fff",lineHeight:0.82,letterSpacing:-7,userSelect:"none" }}>FAQ</span>
        </div>

        <div style={{ order:isMobile?1:2 }}>
          <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:18 }}>
            {FAQ_QUESTIONS.map((q, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:openIdx===i?20:50,overflow:"hidden",transition:"border-radius .3s" }}>
                <button onClick={() => setOpenIdx(openIdx===i?null:i)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"none",border:"none",gap:12,padding:"10px 14px 10px 10px" }}>
                  <span style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <span style={{ width:26,height:26,borderRadius:"50%",background:C.violet,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <span style={{ color:"#fff",fontWeight:900,fontFamily:"'Syne',sans-serif",fontSize:11 }}>M</span>
                    </span>
                    <span style={{ fontSize:isMobile?12:13,color:C.navy,fontWeight:500,textAlign:"left",lineHeight:1.4 }}>{q}</span>
                  </span>
                  <span style={{ width:30,height:30,borderRadius:"50%",border:`2px solid ${C.navy}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:C.navy,flexShrink:0,lineHeight:1,transform:openIdx===i?"rotate(45deg)":"none",transition:"transform .25s ease",fontWeight:300 }}>+</span>
                </button>
                <div style={{ maxHeight:openIdx===i?200:0,overflow:"hidden",transition:"max-height .3s ease" }}>
                  <p style={{ fontSize:13,color:"#555",lineHeight:1.75,padding:"4px 20px 18px 46px" }}>
                    Cette information sera bientôt disponible sur la plateforme MMI.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:C.jaune,borderRadius:18,padding:"22px 22px 58px",position:"relative" }}>
            <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:C.navy,marginBottom:14 }}>Une question ? ....</div>
            <textarea placeholder="Écrivez votre question ici..." rows={4} style={{ width:"100%",border:"none",background:"transparent",fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:"none",color:C.navy,outline:"none" }} />
            <button style={{ position:"absolute",bottom:16,right:16,width:34,height:34,borderRadius:9,border:`1.5px solid rgba(34,26,71,.25)`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:C.navy,fontSize:16 }}>↗</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════
//  PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════
export default function PublicHome() {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()
  const { role, logout } = useSession()

  // Chemin dashboard selon le rôle
  const dashboardPath = role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"
  const roleLabel     = role === "teacher" ? "Espace enseignant" : "Mon espace"

  return (
    <>
      <style>{GLOBAL_STYLE}</style>

      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header style={{
        background:C.violet,
        padding: isMobile ? "16px 20px 18px" : "18px 44px 20px",
        display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        position:"relative", overflow:"hidden",
        minHeight: isMobile ? 96 : 126,
      }}>

        {/* ── Bouton gauche : Se connecter OU Mon espace ── */}
        <div style={{ display:"flex", alignItems:"center", gap:10, zIndex:3, flexShrink:0 }}>
          {role ? (
            // Connecté → bouton "Mon espace" + déconnexion
            <>
              <button
                className="btn-yellow"
                onClick={() => navigate(dashboardPath)}
                style={{
                  background:C.jaune, color:C.navy,
                  border:"none", borderRadius:9,
                  padding: isMobile ? "9px 14px" : "11px 20px",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight:700,
                  transition:"transform .15s",
                  boxShadow:"0 2px 10px rgba(212,255,0,.35)",
                  display:"flex", alignItems:"center", gap:6,
                }}
              >
                <span>→</span> {roleLabel}
              </button>

              {/* Petit bouton discret se déconnecter */}
              <button
                onClick={logout}
                style={{
                  background:"rgba(255,255,255,.12)",
                  color:"rgba(255,255,255,.7)",
                  border:"1px solid rgba(255,255,255,.2)",
                  borderRadius:8,
                  padding: isMobile ? "8px 10px" : "10px 14px",
                  fontSize:11, fontWeight:600,
                  transition:"background .15s",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.2)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
              >
                Déconnexion
              </button>
            </>
          ) : (
            // Non connecté → bouton "Se connecter"
            <button
              className="btn-yellow"
              onClick={() => navigate("/login")}
              style={{
                background:C.jaune, color:C.navy,
                border:"none", borderRadius:9,
                padding: isMobile ? "9px 16px" : "11px 22px",
                fontSize: isMobile ? 12 : 13,
                fontWeight:700,
                transition:"transform .15s",
                boxShadow:"0 2px 10px rgba(212,255,0,.35)",
              }}
            >
              Se connecter
            </button>
          )}
        </div>

        {/* Logo centré */}
        <div style={{ position:"absolute",left:"50%",transform:"translateX(-50%)",textAlign:"center",zIndex:2,top:isMobile?12:16 }}>
          <img
            src="src/assets/logo.png"
            alt="My Multimedia Interface"
            style={{ height:isMobile?90:180,width:"auto",objectFit:"contain",display:"block" }}
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex" }}
          />
          {/* Fallback texte */}
          <div style={{ display:"none",alignItems:"center",justifyContent:"center",gap:8 }}>
            <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:isMobile?46:60,color:"#fff",lineHeight:1 }}>M</div>
            <div style={{ fontFamily:"'Syne',sans-serif",color:"#fff",lineHeight:1.28,textAlign:"left",paddingTop:4 }}>
              <div style={{ fontSize:isMobile?11:14,fontWeight:700,fontStyle:"italic" }}>y</div>
              <div style={{ fontSize:isMobile?11:14,fontWeight:700 }}>Multimedia<br/>Interface</div>
            </div>
          </div>
        </div>

        {/* Déco droite */}
        {!isMobile && (
          <div style={{ position:"relative",width:140,height:120,zIndex:1,flexShrink:0 }}>
            <div style={{ position:"absolute",right:-42,top:-42,width:152,height:152,borderRadius:"50%",background:C.navy }} />
            <div style={{ position:"absolute",right:52,top:-22,width:60,height:90,background:C.jaune,borderRadius:"0 0 54px 54px" }} />
            <div style={{ position:"absolute",right:18,top:82,width:14,height:14,borderRadius:"50%",background:C.jaune }} />
          </div>
        )}
      </header>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ background:C.violet, padding:isMobile?"32px 24px 52px":"36px 80px 64px", textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?22:isTablet?28:36,fontWeight:900,color:"#fff",lineHeight:1.35,maxWidth:580,margin:"0 auto" }}>
          <span style={{ color:C.jaune,fontSize:isMobile?38:54,lineHeight:0.7,display:"inline-block",verticalAlign:"middle",marginRight:4 }}>"</span>
          {" "}Découvrez les projets des étudiants en BUT Métiers du Multimédia et de l'Internet.
        </h1>
      </section>

      {/* ════════════════════════════════════
          PROJETS RÉCENTS
      ════════════════════════════════════ */}
      <section style={{ background:C.violet, padding:isMobile?"0 20px 72px":"0 44px 90px" }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:isMobile?18:22,fontWeight:800,color:"#fff",marginBottom:isMobile?22:30 }}>
          Les projets récents
        </h2>

        {isMobile ? (
          <div style={{ display:"flex",flexDirection:"row",gap:16,overflowX:"auto",paddingBottom:16,paddingLeft:4,paddingRight:20,scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch",msOverflowStyle:"none",scrollbarWidth:"none" }}>
            {PROJETS.map((p, i) => (
              <div key={p.id} style={{ scrollSnapAlign:"start",flexShrink:0 }}>
                <ProjetCard projet={p} delay={i*100} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex",gap:isTablet?16:22,alignItems:"flex-start",justifyContent:isTablet?"center":"flex-start" }}>
            {PROJETS.map((p, i) => (
              <div key={p.id} className="card-enter" style={{ marginTop:i===0?0:i===1?38:72,flex:isTablet?"0 0 270px":"0 0 300px",animationDelay:`${i*120}ms` }}>
                <ProjetCard projet={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section style={{ background:"#5b21b6",padding:isMobile?"72px 20px":"90px 44px",textAlign:"center",position:"relative",overflow:"hidden",minHeight:isMobile?220:290,display:"flex",alignItems:"center",justifyContent:"center" }}>
        {!isTablet && [
          {l:"2%",t:"2%",  w:78,h:108,deg:"-14deg"},{l:"9%",t:"44%", w:62,h:88, deg:"9deg"},
          {l:"17%",t:"-8%",w:70,h:98, deg:"-5deg"},{l:"26%",t:"30%", w:56,h:76, deg:"5deg"},
          {r:"2%",t:"4%",  w:78,h:108,deg:"13deg"}, {r:"10%",t:"46%",w:62,h:88, deg:"-8deg"},
          {r:"18%",t:"-9%",w:70,h:98, deg:"4deg"},  {r:"27%",t:"28%",w:56,h:76, deg:"-5deg"},
        ].map((s,i) => (
          <div key={i} style={{ position:"absolute",left:s.l,right:s.r,top:s.t,width:s.w,height:s.h,background:"rgba(255,255,255,.07)",borderRadius:10,transform:`rotate(${s.deg})` }}>
            <div style={{ width:"100%",height:"56%",background:"rgba(255,255,255,.05)",borderRadius:"8px 8px 0 0" }} />
          </div>
        ))}
        <button className="btn-yellow" onClick={() => navigate("/public/projets")} style={{ position:"relative",zIndex:2,background:C.jaune,color:C.navy,border:"none",borderRadius:40,padding:isMobile?"15px 42px":"18px 58px",fontSize:isMobile?15:18,fontWeight:800,fontFamily:"'Syne',sans-serif",boxShadow:"0 6px 24px rgba(0,0,0,.22)",transition:"transform .18s cubic-bezier(.34,1.56,.64,1)",letterSpacing:.3 }}>
          Voir tous les projets
        </button>
      </section>

      <SectionMMI isMobile={isMobile} isTablet={isTablet} />
      <SectionFAQ isMobile={isMobile} />
    </>
  )
}