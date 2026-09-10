import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 rounded-sm bg-surface border border-border-base flex items-center justify-center mb-4">
        <Inbox size={24} className="text-text-muted" />
      </div>
      <h3 className="text-sm font-medium text-text-primary mb-1">{title}</h3>
      {description && <p className="text-xs text-text-muted mb-4">{description}</p>}
      {action}
    </div>
  )
}
