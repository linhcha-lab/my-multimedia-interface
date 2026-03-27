// ============================================================
//  PageLayout.jsx — Wrapper commun à toutes les pages enseignant
//  Assemble : Sidebar + Header + contenu de la page
//
//  Props :
//    title    (string) → titre affiché dans le header
//    children (JSX)    → contenu de la page
//
//  Utilisation dans une page :
//    <PageLayout title="Tableau de bord">
//      <div>Contenu ici</div>
//    </PageLayout>
// ============================================================

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header  from "./Header";
import { useWindowWidth, BP } from "../../hooks/useWindowWidth";

export default function PageLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const width    = useWindowWidth();
  const isMobile = width < BP.tablet;

  return (
    <>
      {/* Styles globaux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html,body,#root { height:100%; }
        body { font-family:'Payton One',sans-serif; background:#f8f6fc; }
        button,input,textarea,select { font-family:'Payton One',sans-serif; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#d1c4f5; border-radius:3px; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Contenu principal */}
        <main style={{
          flex: 1, overflowY: "auto", minWidth: 0,
          padding: isMobile ? "18px 14px" : "28px 30px",
        }}>
          <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
          {children}
        </main>
      </div>
    </>
  );
}
