'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`)
      if (res.ok) {
        const updated = await res.json()
        setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)))
        setSelectedMessage(updated)
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return

    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id))
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  if (loading) {
    return <div className="text-text-muted">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-h3">Messages</h1>
        <p className="text-text-secondary">
          {messages.length} messages, {unreadCount} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-muted">No messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markAsRead(msg.id)}
                className={`card w-full text-left ${selectedMessage?.id === msg.id ? 'border-primary' : ''} ${!msg.isRead ? 'border-l-2 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">{msg.name}</p>
                  {!msg.isRead && <span className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                <p className="text-xs text-text-muted truncate">{msg.email}</p>
                {msg.subject && (
                  <p className="text-xs text-text-muted mt-1 truncate">{msg.subject}</p>
                )}
                <p className="text-xs text-text-muted mt-1">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="card">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="heading-h4">{selectedMessage.name}</h3>
                    <p className="text-text-secondary">{selectedMessage.email}</p>
                    {selectedMessage.subject && (
                      <p className="text-text-muted mt-1">{selectedMessage.subject}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-error text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="mt-4 text-xs text-text-muted">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-text-muted">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
