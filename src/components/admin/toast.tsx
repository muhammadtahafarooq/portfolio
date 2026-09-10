'use client'

import { useState, useCallback, useRef, createContext, useContext } from 'react'
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextIdRef = useRef(0)

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++nextIdRef.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const icons = {
    success: <CheckCircle size={16} className="text-success" />,
    error: <AlertCircle size={16} className="text-error" />,
    info: <Info size={16} className="text-primary" />,
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 bg-surface border rounded-sm shadow-lg min-w-[280px] animate-slide-up',
              t.type === 'error'
                ? 'border-error'
                : t.type === 'success'
                  ? 'border-success'
                  : 'border-primary'
            )}
          >
            {icons[t.type]}
            <span className="text-sm text-text-primary flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="text-text-muted hover:text-text-primary"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
