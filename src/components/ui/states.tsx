export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="loading-state">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  )
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="error-state">
      <p className="text-text-secondary mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary text-sm">
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({
  message = 'No content available',
  action,
}: {
  message?: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="empty-state">
      <p className="text-text-secondary mb-4">{message}</p>
      {action && (
        <a href={action.href} className="btn-secondary text-sm">
          {action.label}
        </a>
      )}
    </div>
  )
}
