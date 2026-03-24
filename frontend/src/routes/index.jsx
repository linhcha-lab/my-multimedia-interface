// ============================================================
//  routes/index.jsx — Routes COMPLÈTES (enseignant + étudiant)
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom"

// ── Pages enseignant ─────────────────────────────────────────
import TeacherDashboard from "../pages/teacher/Dashboard"
import SAEList          from "../pages/teacher/SAEList"
import Students         from "../pages/teacher/Students"
import Announcements    from "../pages/teacher/Announcements"
import Messaging        from "../pages/teacher/Messaging"
import Validation       from "../pages/teacher/Validation"
import Settings         from "../pages/teacher/Settings"

// ── Pages étudiant ───────────────────────────────────────────
import StudentDashboard from "../pages/student/StudentDashboard"
import StudentSAEList   from "../pages/student/StudentSAEList"

// ✅ CORRECTION ICI (plus de { })
import StudentAnnonces  from "../pages/student/StudentAnnonces"
import StudentDocuments from "../pages/student/StudentDocuments"
import StudentContact   from "../pages/student/StudentContact"

import StudentMessaging from "../pages/student/StudentMessaging"
import StudentSettings  from "../pages/student/StudentSettings"

// ── Page 404 ─────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: 12,
      fontFamily: "sans-serif"
    }}>
      <div style={{ fontSize: 60 }}>🔍</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#2d2d4e" }}>
        Page introuvable
      </div>
      <a href="/" style={{ color: "#7c3aed", fontSize: 14 }}>
        Retour à l'accueil
      </a>
    </div>
  )
}

// ── Routes ───────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>

      {/* Redirection */}
      <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />

      {/* ── Enseignant ── */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/saes"      element={<SAEList />} />
      <Route path="/teacher/students"  element={<Students />} />
      <Route path="/teacher/announce"  element={<Announcements />} />
      <Route path="/teacher/messages"  element={<Messaging />} />
      <Route path="/teacher/validate"  element={<Validation />} />
      <Route path="/teacher/settings"  element={<Settings />} />

      {/* ── Étudiant ── */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/saes"      element={<StudentSAEList />} />
      <Route path="/student/annonces"  element={<StudentAnnonces />} />
      <Route path="/student/documents" element={<StudentDocuments />} />
      <Route path="/student/publier"   element={<StudentDocuments />} />
      <Route path="/student/messages"  element={<StudentMessaging />} />
      <Route path="/student/contact"   element={<StudentContact />} />
      <Route path="/student/settings"  element={<StudentSettings />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}