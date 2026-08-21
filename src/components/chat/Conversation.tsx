import { Bot, Sparkles, UserRound } from 'lucide-react'
import type { ChatMessage } from '../../types/chat'

interface ConversationProps { messages: ChatMessage[]; isReplying: boolean }

export function Conversation({ messages, isReplying }: ConversationProps) {
  return (
    <section className="conversation" aria-label="Nội dung cuộc trò chuyện">
      <div className="conversation-intro"><span><Sparkles size={15} /> Tư vấn cùng UniGuide</span><h1>Cùng tìm lựa chọn phù hợp với bạn</h1></div>
      <div className="message-list">
        {messages.map((message) => (
          <article className={`message ${message.role}`} key={message.id}>
            <div className="message-avatar">{message.role === 'assistant' ? <Bot size={18} /> : <UserRound size={18} />}</div>
            <div>
              <strong>{message.role === 'assistant' ? 'UniGuide' : 'Bạn'}</strong>
              <p>{message.content}</p>
              <time>{message.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</time>
            </div>
          </article>
        ))}
        {isReplying && (
          <article className="message assistant typing-message">
            <div className="message-avatar"><Bot size={18} /></div>
            <div><strong>UniGuide</strong><div className="typing-dots" aria-label="Trợ lý đang trả lời"><i /><i /><i /></div></div>
          </article>
        )}
      </div>
    </section>
  )
}
