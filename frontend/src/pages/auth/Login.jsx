// pages/auth/Login.jsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [role,  setRole ] = useState("student")
  const [email, setEmail] = useState("")
  const [mdp,   setMdp  ] = useState("")
  const [error, setError ] = useState("")

  const handleSubmit = () => {
    if (!email.trim() || !mdp.trim()) {
      setError("Remplis tous les champs.")
      return
    }

    // ✅ Sauvegarde le rôle dans localStorage → lu par PublicHome
    localStorage.setItem("userRole", role)
    localStorage.setItem("userEmail", email)

    // TODO Symfony : remplacer par fetch("/api/login", ...)
    if (role === "teacher") {
      navigate("/teacher/dashboard")
    } else {
      navigate("/student/dashboard")
    }
  }

  const input = {
    width: "100%", padding: "12px 14px",
    borderRadius: 10, border: "1.5px solid rgba(255,255,255,.3)",
    background: "rgba(255,255,255,.1)",
    fontSize: 14, outline: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    color: "#fff", boxSizing: "border-box",
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: rgba(255,255,255,.45); }
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
          cursor: "pointer", fontFamily: "Plus Jakarta Sans",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          ← Retour à l'accueil
        </button>

        {/* Logo */}
        <div style={{
          fontFamily: "'Payton One',sans-serif", fontWeight: 900,
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
          <h1 style={{ fontFamily: "'Payton One',sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
            Se connecter
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginBottom: 28 }}>
            Accède à ton espace personnel
          </p>

          {/* Rôle */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[
              { val: "student", label: "Étudiant" },
              { val: "teacher", label: "Enseignant" },
            ].map(r => (
              <button key={r.val} onClick={() => setRole(r.val)} style={{
                flex: 1, padding: 10, borderRadius: 10,
                border: role === r.val ? "none" : "1.5px solid rgba(255,255,255,.3)",
                background: role === r.val ? "#d4ff00" : "transparent",
                color: role === r.val ? "#221A47" : "rgba(255,255,255,.7)",
                fontWeight: role === r.val ? 700 : 400,
                fontSize: 13, cursor: "pointer", fontFamily: "Plus Jakarta Sans",
                transition: "all .15s",
              }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#d4ff00", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>Email</label>
            <input type="email" placeholder="ton@email.fr" value={email}
              onChange={e => setEmail(e.target.value)} style={input} />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#d4ff00", marginBottom: 6, textTransform: "uppercase", letterSpacing: .5 }}>Mot de passe</label>
            <input type="password" placeholder="••••••••" value={mdp}
              onChange={e => setMdp(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={input} />
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,.2)", color: "#fca5a5", borderRadius: 8, padding: "8px 12px", fontSize: 12, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} style={{
            width: "100%", padding: 13, borderRadius: 12, border: "none",
            background: "#d4ff00", color: "#221A47",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
            fontFamily: "'Payton One',sans-serif", transition: "transform .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            Se connecter
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 20 }}>
            Accès réservé aux membres du département MMI
          </p>
        </div>
      </div>
    </>
  )
}