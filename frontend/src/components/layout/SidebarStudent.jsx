// ============================================================
//  components/layout/SidebarStudent.jsx
// ============================================================

import { useNavigate, useLocation } from "react-router-dom"
import { Svg, IC } from "../common/Icons"
import { NAV_ITEMS_STUDENT } from "../../data/mockData"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"
import Logo from "../../assets/logodark.png";

export default function SidebarStudent({ open, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const width    = useWindowWidth()
  const isMobile = width < BP.tablet

  const isActive = (id) => location.pathname.includes(id)

  const handleNav = (id) => {
    navigate(`/student/${id}`)
    if (isMobile) onClose()
  }

  // ─────────────────────────────────────────────
  // 🔥 USER DYNAMIQUE (depuis localStorage)
  // ─────────────────────────────────────────────
  const email = localStorage.getItem("userEmail") || ""

  const formatNameFromEmail = (email) => {
    if (!email) return "Utilisateur"

    const namePart = email.split("@")[0]

    return namePart
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const fullName = formatNameFromEmail(email)
  const initial = fullName.charAt(0).toUpperCase()

  const role = localStorage.getItem("userRole")

  const subtitle =
    role === "ROLE_TEACHER"
      ? "Enseignant MMI"
      : "Étudiant MMI – S4"

  return (
    <>
      {/* Overlay mobile */}
      {isMobile && open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.35)",
            zIndex: 98
          }}
        />
      )}

      <aside style={{
        position:  isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "none",
        transition: "transform .28s cubic-bezier(.4,0,.2,1)",
        zIndex: 99,
        width: 220,
        background: "#fff",
        borderRight: "1px solid #f0edf8",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        height: "100vh",
        flexShrink: 0,
        overflowY: "auto",
      }}>

        {/* ── Logo ── */}
        <div style={{
          padding: "0 18px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <img
            src={Logo}
            alt="My Multimedia Interface"
            style={{
              height: isMobile ? 90 : 60,
              maxHeight: 100,
              width: "auto",
              objectFit: "contain",
              display: "block",
              cursor: "pointer"
            }}
            onClick={() => navigate("/student/dashboard")}
          />

          {/* Bouton fermeture mobile */}
          {isMobile && (
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#aaa"
              }}
            >
              <Svg d={IC.x} size={20} />
            </button>
          )}
        </div>

        {/* ── Navigation ── */}
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {NAV_ITEMS_STUDENT.map(item => {
            const active = isActive(item.id)

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: active ? "#f0ebff" : "none",
                  border: "none",
                  borderLeft: active ? "3px solid #7c3aed" : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  color: active ? "#7c3aed" : "#666",
                  fontWeight: active ? 700 : 400,
                  fontSize: 13,
                  marginBottom: 3,
                  transition: "all .15s",
                }}
              >
                <Svg d={IC[item.icon]} size={16} />
                <span style={{ flex: 1 }}>{item.label}</span>

                {item.badge && (
                  <span style={{
                    background: "#7c3aed",
                    color: "#fff",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 7px",
                    flexShrink: 0,
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* ── Avatar utilisateur ── */}
        <div style={{
          padding: "16px 18px 0",
          borderTop: "1px solid #f0edf8",
          marginTop: 8
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

            {/* Initiale */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 14,
              flexShrink: 0,
            }}>
              {initial}
            </div>

            {/* Infos */}
            <div>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2d2d4e"
              }}>
                {fullName}
              </div>
              <div style={{
                fontSize: 11,
                color: "#aaa"
              }}>
                {subtitle}
              </div>
            </div>

          </div>
        </div>

      </aside>
    </>
  )
}