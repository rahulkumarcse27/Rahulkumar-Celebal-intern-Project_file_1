import { PageHeader } from '@/components/dashboard/primitives'
import { DocumentsView } from '@/components/dashboard/documents-view'

export default function DocumentsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Documents"
        description="Your unified library. Upload, organize and let Lumen extract structured intelligence from every file."
      />
      <DocumentsView />
    </div>
  )
}
