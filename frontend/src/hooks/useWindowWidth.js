// ============================================================
//  useWindowWidth.js — Hook personnalisé
//  Retourne la largeur de la fenêtre et se met à jour en temps réel.
//  Utilisé pour rendre les composants responsive.
//
//  Utilisation :
//    const width = useWindowWidth()
//    const isMobile = width < 768
// ============================================================

import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    // Nettoyage quand le composant est détruit
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

// Points de rupture responsive — importables partout
export const BP = {
  mobile: 480,   // Téléphone
  tablet: 768,   // Tablette / petit laptop
  laptop: 1024,  // Laptop standard
};
