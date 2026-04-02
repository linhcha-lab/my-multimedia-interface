// pages/auth/Login.jsx
// Branché sur POST /api/login → App\Controller\LoginController::login
//
// Ce que fait Symfony en retour :
// ✅ { success: true, user: { id, email, roles } }
// ❌ { error: "..." } avec status 400 / 401 / 404
//
// On stocke le rôle + email dans localStorage pour router l'étudiant/prof

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const [role,     setRole    ] = useState("student")
  const [email,    setEmail   ] = useState("")
  const [mdp,      setMdp     ] = useState("")
  const [error,    setError   ] = useState("")
  const [loading,  setLoading ] = useState(false)

  // ── Connexion ──────────────────────────────────────────────
  const handleSubmit = async () => {
    setError("")

    // Validation front minimale
    if (!email.trim() || !mdp.trim()) {
      setError("Remplis tous les champs.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":       "application/json",
        },
        body: JSON.stringify({
          email:    email.trim(),
          password: mdp,
        }),
      })

      const data = await res.json()

      // ── Erreur renvoyée par Symfony ───────────────────────
      if (!res.ok) {
        // Symfony renvoie { error: "..." }
        setError(data.error ?? `Erreur serveur (${res.status})`)
        return
      }

      // ── Succès : { success: true, user: { id, email, roles } }
      const token = data.token

// Stockage du token
localStorage.setItem("token", token)

// Optionnel : décoder le token pour récupérer les infos user
const payload = JSON.parse(atob(token.split('.')[1]))

localStorage.setItem("userEmail", payload.username)
localStorage.setItem("userRole", payload.roles?.[0] || "ROLE_STUDENT")

const isTeacher =
  payload.roles?.includes("ROLE_TEACHER") ||
  payload.roles?.includes("ROLE_ADMIN")

if (isTeacher) {
  navigate("/teacher/dashboard")
} else {
  navigate("/student/dashboard")
}


    } catch (err) {
      // Erreur réseau (Symfony pas lancé, CORS, etc.)
      setError("Impossible de joindre le serveur. Vérifie que Symfony est lancé.")
      console.error("[Login] Erreur fetch :", err)
    } finally {
      setLoading(false)
    }
  }

  // ── Styles ────────────────────────────────────────────────
  const input = {
    width: "100%", padding: "12px 14px",
    borderRadius: 10, border: "1.5px solid rgba(255,255,255,.3)",
    background: "rgba(255,255,255,.1)",
    fontSize: 14, outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    color: "#fff", boxSizing: "border-box",
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: rgba(255,255,255,.45); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#7c3aed",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 20,
      }}>

        {/* Retour accueil */}
        <button onClick={() => navigate("/")} style={{
          position: "absolute", top: 20, left: 20,
          background: "none", border: "none",
          color: "rgba(255,255,255,.6)", fontSize: 13,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          ← Retour à l'accueil
        </button>

        {/* Logo */}
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          color: "#fff", textAlign: "center", marginBottom: 36, lineHeight: 1.15,
        }}>
          <span style={{ fontSize: 38, color: "#d4ff00" }}>M</span>
          <span style={{ fontSize: 24 }}>y</span><br />
          <span style={{ fontSize: 18 }}>Multimedia Interface</span>
        </div>

        {/* Carte */}
        <div style={{
          background: "rgba(255,255,255,.1)",
          backdropFilter: "blur(12px)",
          borderRadius: 22, padding: 36,
          width: "100%", maxWidth: 420,
          border: "1px solid rgba(255,255,255,.2)",
        }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
            Se connecter
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginBottom: 28 }}>
            Accède à ton espace personnel
          </p>

          {/* Sélecteur rôle */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[
              { val: "student", label: "Étudiant"   },
              { val: "teacher", label: "Enseignant" },
            ].map(r => (
              <button key={r.val} onClick={() => setRole(r.val)} style={{
                flex: 1, padding: 10, borderRadius: 10,
                border: role === r.val ? "none" : "1.5px solid rgba(255,255,255,.3)",
                background: role === r.val ? "#d4ff00" : "transparent",
                color:  role === r.val ? "#221A47" : "rgba(255,255,255,.7)",
                fontWeight: role === r.val ? 700 : 400,
                fontSize: 13, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .15s",
              }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#d4ff00", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="ton@email.fr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={input}
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#d4ff00", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={mdp}
              onChange={e => setMdp(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={input}
            />
          </div>

          {/* Message d'erreur */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,.2)", color: "#fca5a5",
              borderRadius: 8, padding: "10px 14px",
              fontSize: 12, marginBottom: 16, lineHeight: 1.5,
              border: "1px solid rgba(239,68,68,.3)",
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Bouton connexion */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: 13, borderRadius: 12, border: "none",
              background: loading ? "rgba(212,255,0,.5)" : "#d4ff00",
              color: "#221A47",
              fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Syne', sans-serif",
              transition: "transform .15s, background .15s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.02)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none" }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: "2px solid #221A47", borderTopColor: "transparent",
                  animation: "spin .7s linear infinite",
                }} />
                Connexion…
              </>
            ) : (
              "Se connecter"
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 20 }}>
            Accès réservé aux membres du département MMI
          </p>
        </div>

        {/* Aide debug en dev */}
        {import.meta.env.DEV && (
          <div style={{ marginTop: 24, fontSize: 11, color: "rgba(255,255,255,.3)", textAlign: "center" }}>
            Dev · POST /api/login · Symfony doit tourner sur le même domaine
          </div>
        )}
      </div>
    </>
  )
}

