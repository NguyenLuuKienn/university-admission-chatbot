import { useRef, useState } from 'react'
import { ChatComposer } from './components/chat/ChatComposer'
import { Conversation } from './components/chat/Conversation'
import { WelcomeView } from './components/chat/WelcomeView'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { getAdmissionReply } from './services/chatService'
import type { ChatMessage } from './types/chat'
import './styles/app.css'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isReplying, setIsReplying] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const conversationVersion = useRef(0)

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim()
    if (!trimmedContent || isReplying) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', content: trimmedContent, createdAt: new Date() },
    ])
    setIsReplying(true)

    const currentVersion = conversationVersion.current
    const reply = await getAdmissionReply(trimmedContent)
    if (currentVersion !== conversationVersion.current) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'assistant', content: reply, createdAt: new Date() },
    ])
    setIsReplying(false)
  }

  const startNewConversation = () => {
    conversationVersion.current += 1
    setMessages([])
    setIsReplying(false)
    setIsSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewConversation={startNewConversation}
      />
      <main className="main-panel">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} />
        <div className="chat-workspace">
          <div className="chat-scroll-region" aria-live="polite">
            {messages.length === 0 ? (
              <WelcomeView onSelectPrompt={sendMessage} />
            ) : (
              <Conversation messages={messages} isReplying={isReplying} />
            )}
          </div>
          <ChatComposer onSend={sendMessage} disabled={isReplying} />
        </div>
      </main>
    </div>
  )
}

export default App
