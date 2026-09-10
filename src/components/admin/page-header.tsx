interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-8 border-b border-border-base pb-4">
      <div>
        <h2
          className="text-text-primary font-bold tracking-tight"
          style={{ fontSize: '32px', lineHeight: '1.2' }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-xs font-mono uppercase tracking-wider text-text-muted mt-2">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
