// ============================================================
//  context/ValidationContext.jsx
//  Contexte partagé entre la vue étudiant et la vue enseignant
// ============================================================

import { createContext, useContext, useState } from "react"

// Données initiales (celles qui étaient dans mockData.js)
const VALIDATIONS_INITIALES = [
  {
    id: 1,
    etudiant: "Sarah DONSOUN",
    sae: "SAE 1.03",
    titre: "FuturProof",
    fichier: "futurproof.zip",
    date: "2026-03-10",
    statut: "en_attente",
  },
  {
    id: 2,
    etudiant: "Elise Vazquez",
    sae: "SAE 2.01",
    titre: "MANY",
    fichier: "many.zip",
    date: "2026-03-12",
    statut: "valide",
  },
]

const ValidationContext = createContext(null)

export function ValidationProvider({ children }) {
  const [validations, setValidations] = useState(VALIDATIONS_INITIALES)

  // Appelé par l'étudiant quand il soumet son formulaire
  const soumettreSAE = (data) => {
    const nouvelle = {
      id: Date.now(),
      etudiant: data.etudiant,
      sae: data.sae,
      titre: data.titre,
      fichier: data.fichier || `${data.titre.toLowerCase().replace(/\s+/g, "-")}.zip`,
      date: new Date().toISOString(),
      statut: "en_attente",
    }
    setValidations(prev => [nouvelle, ...prev])
    return nouvelle.id
  }

  // Appelé par le prof
  const valider = (id) =>
    setValidations(prev => prev.map(v => v.id === id ? { ...v, statut: "valide" } : v))

  const refuser = (id) =>
    setValidations(prev => prev.map(v => v.id === id ? { ...v, statut: "refuse" } : v))

  return (
    <ValidationContext.Provider value={{ validations, soumettreSAE, valider, refuser }}>
      {children}
    </ValidationContext.Provider>
  )
}

export function useValidation() {
  const ctx = useContext(ValidationContext)
  if (!ctx) throw new Error("useValidation doit être utilisé dans un ValidationProvider")
  return ctx
}