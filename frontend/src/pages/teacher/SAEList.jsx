// pages/teacher/SAEList.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"
import { Svg, IC } from "../../components/common/Icons"
import { useWindowWidth, BP } from "../../hooks/useWindowWidth"



const api = async (url, options = {}) => {
  const token = localStorage.getItem("token")

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  })

  return res
}



function EtatBadge({ etat }) {
  const c = {
    en_cours: { label: "En cours", bg: "#e0f2fe", color: "#0369a1" },
    termine:  { label: "Terminé",  bg: "#dcfce7", color: "#166534" },
    a_venir:  { label: "À venir",  bg: "#fef9c3", color: "#854d0e" },
  }[etat] || { label: etat, bg: "#f0edf8", color: "#7c3aed" }

  return (
    <span style={{
      background: c.bg,
      color: c.color,
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600
    }}>
      {c.label}
    </span>
  )
}

function ProgressBar({ value }) {
  return (
    <div style={{ background: "#f0edf8", borderRadius: 4, height: 6 }}>
      <div style={{
        height: "100%",
        width: `${value}%`,
        borderRadius: 4,
        background: value === 100
          ? "#22c55e"
          : "linear-gradient(90deg,#7c3aed,#9d5cf5)"
      }} />
    </div>
  )
}



function CreationModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    saeId: "",
    dateDebut: "",
    dateLimite: ""
  })

  const handleSubmit = async () => {
    if (!form.saeId || !form.dateDebut || !form.dateLimite) {
      alert("Remplis tous les champs")
      return
    }

    try {
      const res = await api("http://localhost:8000/api/prof/sae", {
        method: "POST",
        body: JSON.stringify({
          saeId: form.saeId,
          dateDebut: form.dateDebut,
          dateLimite: form.dateLimite,
          status: "a_venir"
        })
      })

      if (!res.ok) throw new Error()

      onCreated()
      onClose()

    } catch (e) {
      console.error(e)
      alert("Erreur création SAE")
    }
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed",
      inset: 0,
      background: "rgba(26,26,46,.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        width: 320
      }}>
        <h3 style={{ marginBottom: 16 }}>Créer une SAE</h3>

        <input
          placeholder="ID SAE"
          value={form.saeId}
          onChange={e => setForm({ ...form, saeId: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="date"
          value={form.dateDebut}
          onChange={e => setForm({ ...form, dateDebut: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="date"
          value={form.dateLimite}
          onChange={e => setForm({ ...form, dateLimite: e.target.value })}
          style={{ width: "100%", marginBottom: 16 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSubmit}>Créer</button>
        </div>
      </div>
    </div>
  )
}



export default function SAEList() {
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isMobile = width < BP.mobile

  const [filtre, setFiltre] = useState("tous")
  const [showModal, setShowModal] = useState(false)

  const [saes, setSaes] = useState([])
  const [loading, setLoading] = useState(true)



  const fetchSAE = async () => {
    try {
      setLoading(true)

      const res = await api("http://localhost:8000/api/prof/sae")

      if (res.status === 401) {
        console.warn("Non authentifié → redirection login")
        setSaes([])
        return
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        console.error("API ERROR:", data)
        setSaes([])
      } else {
        setSaes(data)
      }

    } catch (err) {
      console.error(err)
      setSaes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSAE()
  }, [])



  const saeFiltrees = Array.isArray(saes)
    ? (filtre === "tous"
        ? saes
        : saes.filter(s => s.etat === filtre))
    : []


  if (loading) {
    return (
      <PageLayout title="Liste des SAE">
        <div style={{ padding: 40 }}>Chargement...</div>
      </PageLayout>
    )
  }



  return (
    <PageLayout title="Liste des SAE">

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 22,
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { val: "tous", label: "Toutes" },
            { val: "en_cours", label: "En cours" },
            { val: "termine", label: "Terminées" },
            { val: "a_venir", label: "À venir" },
          ].map(f => (
            <button
              key={f.val}
              onClick={() => setFiltre(f.val)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                background: filtre === f.val ? "#7c3aed" : "#fff",
                color: filtre === f.val ? "#fff" : "#666",
                border: "1px solid #e0daf5"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          <Svg d={IC.plus} size={16} color="#fff" />
          Nouvelle SAE
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "repeat(auto-fill,minmax(290px,1fr))",
        gap: 18
      }}>
        {saeFiltrees.map(sae => (
          <div
            key={sae.id}
            onClick={() => navigate(`/teacher/saes/${sae.id}`)}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,.06)",
              cursor: "pointer"
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12
            }}>
              <div>
                <div style={{
                  fontSize: 10,
                  color: "#9d5cf5",
                  fontWeight: 700
                }}>
                  {sae.code} · {sae.semestre}
                </div>

                <div style={{ fontWeight: 700 }}>
                  {sae.titre}
                </div>
              </div>

              <EtatBadge etat={sae.etat} />
            </div>

            <ProgressBar value={sae.progression} />

            <div style={{ fontSize: 11, marginTop: 10 }}>
              {sae.groupes} groupes — {new Date(sae.echeance).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {saeFiltrees.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          Aucune SAE
        </div>
      )}

      {showModal && (
        <CreationModal
          onClose={() => setShowModal(false)}
          onCreated={fetchSAE}
        />
      )}

    </PageLayout>
  )
}