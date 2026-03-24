import { useState } from "react"
import PageLayoutStudent from "../../components/layout/PageLayoutStudent"

export default function StudentContact() {
  const [form, setForm] = useState({
    destinataire: "",
    sujet: "",
    sae: "",
    message: ""
  })

  return (
    <PageLayoutStudent title="Contact">
      <input
        placeholder="Destinataire"
        value={form.destinataire}
        onChange={e => setForm({ ...form, destinataire: e.target.value })}
      />
    </PageLayoutStudent>
  )
}