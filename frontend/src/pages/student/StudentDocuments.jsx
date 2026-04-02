import PageLayoutStudent from "../../components/layout/PageLayoutStudent"
import { DOCUMENTS_STUDENT } from "../../data/mockData"

export default function StudentDocuments() {
  return (
    <PageLayoutStudent title="Documents">
      <div>
        {DOCUMENTS_STUDENT.map(doc => (
          <div key={doc.id}>
            {doc.nom}
          </div>
        ))}
      </div>
    </PageLayoutStudent>
  )
}