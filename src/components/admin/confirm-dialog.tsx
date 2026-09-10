'use client'

import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'default'
}

export function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative bg-surface border border-border-base rounded-sm p-6 max-w-md w-full mx-4 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-sm bg-surface border border-border-base flex items-center justify-center shrink-0">
            <AlertTriangle
              size={20}
              className={variant === 'danger' ? 'text-error' : 'text-warning'}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-text-primary mb-1">{title}</h3>
            <p className="text-xs text-text-secondary">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-text-muted border border-border-base rounded-sm hover:text-text-primary hover:border-border-hover transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors ${
              variant === 'danger'
                ? 'bg-error text-white hover:bg-error/80'
                : 'bg-primary text-background hover:bg-primary-hover'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
