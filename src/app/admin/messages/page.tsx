'use client'

import { useState, useEffect } from 'react'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { useToast } from '@/components/admin/toast'

interface Message {
  id: number
  name: string
  email: string
  subject: string | null
  message: string
  isRead: boolean
  createdAt: string
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (!res.ok) throw new Error()
      const json = await res.json()
      setMessages(json.data)
    } catch {
      toast('Failed to load messages', 'error')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (msg: Message) => {
    if (msg.isRead) {
      setSelectedMessage(msg)
      return
    }
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`)
      if (!res.ok) throw new Error()
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m)))
      setSelectedMessage({ ...msg, isRead: true })
    } catch {
      toast('Failed to mark as read', 'error')
    }
  }

  const deleteMessage = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/admin/messages/${deleteTarget}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setMessages(messages.filter((m) => m.id !== deleteTarget))
      if (selectedMessage?.id === deleteTarget) setSelectedMessage(null)
      toast('Message deleted')
    } catch {
      toast('Failed to delete message', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  if (loading)
    return (
      <div className="text-text-muted font-mono text-xs animate-pulse">Loading messages...</div>
    )

  return (
    <div>
      <PageHeader
        title="Messages"
        description={`${messages.length} messages, ${unreadCount} unread`}
      />

      {messages.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Messages from the contact form will appear here"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markAsRead(msg)}
                className={`w-full text-left p-3 border rounded-sm transition-colors ${
                  selectedMessage?.id === msg.id
                    ? 'bg-surface border-primary'
                    : 'bg-surface border-border-base hover:border-border-hover'
                } ${!msg.isRead ? 'border-l-2 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-text-primary truncate">{msg.name}</p>
                  {!msg.isRead ? (
                    <MailOpen size={14} className="text-primary shrink-0" />
                  ) : (
                    <Mail size={14} className="text-text-muted shrink-0" />
                  )}
                </div>
                <p className="text-[11px] font-mono text-text-muted truncate">{msg.email}</p>
                {msg.subject && (
                  <p className="text-xs text-text-secondary mt-1 truncate">{msg.subject}</p>
                )}
                <p className="text-[11px] font-mono text-text-muted mt-1">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-surface border border-border-base p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">
                      {selectedMessage.name}
                    </h3>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedMessage.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary hover:text-primary-hover transition-colors"
                    >
                      {selectedMessage.email}
                    </a>
                    {selectedMessage.subject && (
                      <p className="text-xs text-text-secondary mt-1">{selectedMessage.subject}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setDeleteTarget(selectedMessage.id)}
                    className="text-text-muted hover:text-error transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="border-t border-border-base pt-4">
                  <p className="text-sm text-text-secondary whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="mt-4 text-[11px] font-mono text-text-muted">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-border-base flex items-center justify-center py-16">
                <p className="text-sm text-text-muted">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Message"
        message="This action cannot be undone."
        onConfirm={deleteMessage}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  )
}
