// ============================================================
//  pages/teacher/Settings.jsx — Paramètres du compte
// ============================================================

import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";

export default function Settings() {
  const [form, setForm] = useState({
    prenom: "Sophie", nom: "Sanchez",
    email: "s.sanchez@mmi.fr", tel: "06 12 34 56 78",
    mdpActuel: "", mdpNouveau: "", mdpConfirm: "",
    notifEmail: true, notifRendus: true, notifMessages: true,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const Section = ({ title, children }) => (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.06)", marginBottom: 16 }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginBottom: 18 }}>{title}</h2>
      {children}
    </div>
  );

  const Field = ({ label, champ, type = "text", placeholder }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 5, textTransform: "uppercase", letterSpacing: .5 }}>{label}</label>
      <input type={type} value={form[champ]} placeholder={placeholder}
        onChange={e => set(champ, e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #e0daf5", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: "#2d2d4e" }} />
    </div>
  );

  const Toggle = ({ label, champ }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0edf8" }}>
      <span style={{ fontSize: 13, color: "#555" }}>{label}</span>
      <div onClick={() => set(champ, !form[champ])} style={{
        width: 44, height: 24, borderRadius: 12,
        background: form[champ] ? "#7c3aed" : "#ddd",
        position: "relative", cursor: "pointer", transition: "background .2s",
      }}>
        <div style={{
          position: "absolute", top: 3, left: form[champ] ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left .2s",
        }} />
      </div>
    </div>
  );

  return (
    <PageLayout title="Paramètres">
      <div style={{ maxWidth: 600 }}>

        {/* Avatar */}
        <Section title="Informations personnelles">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 24,
            }}>S</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>Prof. Sanchez</div>
              <button style={{ fontSize: 12, color: "#7c3aed", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 4, fontFamily: "inherit" }}>
                Changer la photo
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            <Field label="Prénom" champ="prenom" />
            <div style={{ width: 16 }} />
            <Field label="Nom"    champ="nom"    />
          </div>
          <Field label="Email"     champ="email" type="email" />
          <Field label="Téléphone" champ="tel"   type="tel"   />
          <button onClick={() => alert("Profil sauvegardé ! (connecte Symfony)")} style={{
            padding: "10px 22px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", marginTop: 4,
          }}>
            Sauvegarder
          </button>
        </Section>

        {/* Mot de passe */}
        <Section title="Mot de passe">
          <Field label="Mot de passe actuel"      champ="mdpActuel"  type="password" placeholder="••••••••" />
          <Field label="Nouveau mot de passe"     champ="mdpNouveau" type="password" placeholder="••••••••" />
          <Field label="Confirmer le mot de passe" champ="mdpConfirm" type="password" placeholder="••••••••" />
          <button onClick={() => alert("Mot de passe modifié ! (connecte Symfony)")} style={{
            padding: "10px 22px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg,#7c3aed,#9d5cf5)",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", marginTop: 4,
          }}>
            Modifier
          </button>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Toggle label="Recevoir les notifications par email"   champ="notifEmail"    />
          <Toggle label="Alertes pour les nouveaux rendus"       champ="notifRendus"   />
          <Toggle label="Alertes pour les nouveaux messages"     champ="notifMessages" />
        </Section>

      </div>
    </PageLayout>
  );
}
