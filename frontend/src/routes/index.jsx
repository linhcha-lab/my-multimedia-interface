// ============================================================
//  routes/index.jsx — Configuration de toutes les routes
//  React Router gère la navigation entre les pages.
//
//  Chaque <Route> associe une URL à un composant.
//  "Navigate" redirige automatiquement vers une autre URL.
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom";

// Import de toutes les pages enseignant
import TeacherDashboard from "../pages/teacher/Dashboard";
import SAEList          from "../pages/teacher/SAEList";
import Students         from "../pages/teacher/Students";
import Announcements    from "../pages/teacher/Announcements";
import Messaging        from "../pages/teacher/Messaging";
import Validation       from "../pages/teacher/Validation";
import Settings         from "../pages/teacher/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirige "/" vers le dashboard enseignant */}
      <Route path="/"                          element={<Navigate to="/teacher/dashboard" replace />} />

      {/* ── Routes enseignant ── */}
      <Route path="/teacher/dashboard"         element={<TeacherDashboard />} />
      <Route path="/teacher/saes"              element={<SAEList />} />
      <Route path="/teacher/students"          element={<Students />} />
      <Route path="/teacher/announce"          element={<Announcements />} />
      <Route path="/teacher/messages"          element={<Messaging />} />
      <Route path="/teacher/validate"          element={<Validation />} />
      <Route path="/teacher/settings"          element={<Settings />} />

      {/* 404 — page non trouvée */}
      <Route path="*" element={
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          height: "100vh", gap: 12, fontFamily: "sans-serif",
        }}>
          <div style={{ fontSize: 60 }}>🔍</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#2d2d4e" }}>Page introuvable</div>
          <a href="/" style={{ color: "#7c3aed", fontSize: 14 }}>Retour au tableau de bord</a>
        </div>
      } />
    </Routes>
  );
}
