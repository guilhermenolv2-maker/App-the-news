import { Copy, Flag, LockKeyhole, MessageCircle, MoreVertical, ThumbsUp, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function MessageCard({
  message,
  onLike,
  onReply,
  onDelete,
  showToast,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.text)
      showToast('Mensagem copiada')
    } catch {
      showToast('Não foi possível copiar a mensagem')
    }
    setMenuOpen(false)
  }

  return (
    <article className="message-card">
      <div
        className="message-card__avatar"
        aria-hidden="true"
      >
        {message.initials}
      </div>
      <div className="message-card__content">
        <header>
          <div>
            <strong>{message.name}</strong>
            {message.isAuthor && <span className="author-badge">você</span>}
          </div>
          <div className="message-menu-wrap">
            <button
              className="message-more"
              type="button"
              aria-label="Mais opções"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <MoreVertical size={19} />
            </button>
            {menuOpen && (
              <div className="message-menu">
                <button type="button" onClick={copyMessage}><Copy size={15} />Copiar</button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Denúncia registrada')
                    setMenuOpen(false)
                  }}
                >
                  <Flag size={15} />Denunciar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(message.id)
                    setMenuOpen(false)
                  }}
                >
                  <Trash2 size={15} />Excluir
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Conversa privada indisponível no protótipo')
                    setMenuOpen(false)
                  }}
                >
                  <LockKeyhole size={15} />Responder em privado
                </button>
              </div>
            )}
          </div>
        </header>
        <time>{message.time}</time>
        <p>{message.text}</p>
        <footer>
          <button
            className={message.liked ? 'is-liked' : ''}
            type="button"
            onClick={() => onLike(message.id)}
          >
            <ThumbsUp size={16} fill={message.liked ? 'currentColor' : 'none'} />
            Curtir {message.likes > 0 && <span>{message.likes}</span>}
          </button>
          <button type="button" onClick={() => onReply(message.name)}>
            <MessageCircle size={16} />
            Responder
          </button>
        </footer>
      </div>
    </article>
  )
}
