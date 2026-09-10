interface StatCardProps {
  label: string
  value: string | number
  detail?: string
  accent?: string
}

export function StatCard({ label, value, detail, accent }: StatCardProps) {
  return (
    <div className="bg-surface border border-border-base p-6 flex flex-col gap-3">
      <p className="text-[11px] font-mono uppercase tracking-widest text-text-muted">{label}</p>
      <p className="text-3xl font-bold text-text-primary" style={{ lineHeight: '1.2' }}>
        {value}
      </p>
      {detail && <p className="text-sm text-text-secondary">{detail}</p>}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-border-base">
        <span className="text-[11px] font-mono text-text-muted">{accent || '—'}</span>
      </div>
    </div>
  )
}
