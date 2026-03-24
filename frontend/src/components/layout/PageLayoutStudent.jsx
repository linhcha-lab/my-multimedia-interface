// ============================================================
//  components/layout/PageLayoutStudent.jsx
//  Même principe que PageLayout mais utilise SidebarStudent
// ============================================================

import { useState } from "react"
import SidebarStudent from "./SidebarStudent"
import Header         from "./Header"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"

export default function PageLayoutStudent({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const width    = useWindowWidth()
  const isMobile = width < BP.tablet

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #f8f6fc; }
        button, input, textarea, select { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #d1c4f5; border-radius: 3px; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SidebarStudent open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main style={{ flex: 1, overflowY: "auto", minWidth: 0, padding: isMobile ? "18px 14px" : "28px 30px" }}>
          <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
          {children}
        </main>
      </div>
    </>
  )
}