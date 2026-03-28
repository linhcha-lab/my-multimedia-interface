// ============================================================
//  App.jsx — Composant racine de l'application
//  C'est ici que React Router est initialisé.
// ============================================================

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";


export default function App() {
  return (
    // BrowserRouter active React Router dans toute l'app
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
