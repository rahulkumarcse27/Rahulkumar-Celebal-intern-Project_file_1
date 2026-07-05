import { PageHeader } from '@/components/dashboard/primitives'
import { AssistantChat } from '@/components/dashboard/assistant-chat'

export default function AssistantPage() {
  return (
    <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-6">
      <PageHeader
        title="AI Assistant"
        description="Chat with your entire document library. Every answer is grounded in your files and cited back to the source."
      />
      <AssistantChat />
    </div>
  )
}
