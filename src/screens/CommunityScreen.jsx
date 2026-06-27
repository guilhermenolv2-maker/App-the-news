import { ArrowLeft, BellOff, Plus, Search, SendHorizontal, SlidersHorizontal, Smile, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import MessageCard from '../components/MessageCard'

const initialMessages = [
  {
    id: 1,
    name: 'Jose Oliveira',
    initials: 'JO',
    time: '2h',
    text: 'Boa noite',
    likes: 1,
    liked: true,
  },
  {
    id: 2,
    name: 'Gabriel Lacerda',
    initials: 'GL',
    time: '1h',
    text: 'Boa noite',
    likes: 0,
    liked: false,
  },
  {
    id: 3,
    name: 'Milton Rodrigues',
    initials: '👨🏾‍💼',
    time: '1h',
    text: 'Boa noite',
    likes: 0,
    liked: false,
  },
  {
    id: 4,
    name: 'Luciana S.D',
    initials: '👩🏻',
    time: '1h',
    text: 'Oi . Ja amei aqui 💜',
    likes: 2,
    liked: true,
  },
  {
    id: 5,
    name: 'Rafaela Amorim',
    initials: '👩🏼',
    time: '13m',
    text: 'Boa noite!! ✨',
    likes: 0,
    liked: false,
  },
]

export default function CommunityScreen({ showToast }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [messages, setMessages] = useState(initialMessages)
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')
  const [muted, setMuted] = useState(false)
  const [replyingTo, setReplyingTo] = useState('')

  const visibleMessages = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR')
    let result = messages.filter(
      (message) =>
        message.name.toLocaleLowerCase('pt-BR').includes(term) ||
        message.text.toLocaleLowerCase('pt-BR').includes(term),
    )
    if (filter === 'recent') result = [...result].reverse()
    return result
  }, [messages, search, filter])

  const sendMessage = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        name: 'Você',
        initials: 'VC',
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        text: replyingTo ? `@${replyingTo} ${text}` : text,
        likes: 0,
        liked: false,
        isAuthor: true,
        avatarColor: 'linear-gradient(145deg, #d8bd5c, #8d7424)',
      },
    ])
    setDraft('')
    setReplyingTo('')
    showToast('Mensagem enviada')
  }

  const reply = (name) => {
    setReplyingTo(name)
    inputRef.current?.focus()
  }

  return (
    <main className="screen community-screen">
      <header className="community-header">
        <button className="back-button" type="button" onClick={() => navigate(-1)} aria-label="Voltar">
          <ArrowLeft size={21} />
        </button>
        <div className="community-identity">
          <BrandLogo compact />
          <div>
            <h1>night</h1>
            <p>8 participantes <i /> <span>online</span></p>
          </div>
        </div>
        <div className="community-header__actions">
          <button type="button" aria-label="Pesquisar" onClick={() => document.querySelector('.search-box input')?.focus()}>
            <Search size={23} />
          </button>
          <button
            type="button"
            onClick={() => showToast('Função indisponível no protótipo')}
            aria-label="Opções da comunidade"
          >
            <span className="vertical-dots">•••</span>
          </button>
        </div>
      </header>

      <div className="community-controls">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar mensagens..."
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} aria-label="Limpar pesquisa">
              <X size={16} />
            </button>
          )}
        </label>
        <div className="quick-filters">
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            Todas <span>8</span>
          </button>
          <button
            type="button"
            className={filter === 'recent' ? 'is-active' : ''}
            onClick={() => setFilter('recent')}
          >
            Mais recentes
            <SlidersHorizontal size={14} />
          </button>
          <button
            type="button"
            className={muted ? 'is-active' : ''}
            onClick={() => {
              setMuted((value) => !value)
              showToast(muted ? 'Notificações ativadas' : 'Comunidade silenciada')
            }}
          >
            <BellOff size={14} /> Silenciar
          </button>
        </div>
      </div>

      <section className="messages-list" aria-live="polite">
        {visibleMessages.length > 0 ? (
          visibleMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              showToast={showToast}
              onLike={(id) =>
                setMessages((current) =>
                  current.map((item) =>
                    item.id === id
                      ? {
                          ...item,
                          liked: !item.liked,
                          likes: item.likes + (item.liked ? -1 : 1),
                        }
                      : item,
                  ),
                )
              }
              onReply={reply}
              onDelete={(id) => {
                setMessages((current) => current.filter((item) => item.id !== id))
                showToast('Mensagem excluída')
              }}
            />
          ))
        ) : (
          <div className="empty-messages">
            <Search size={24} />
            <strong>Nenhuma conversa encontrada</strong>
            <span>Tente buscar por outro termo.</span>
          </div>
        )}
      </section>

      <form className="message-composer" onSubmit={sendMessage}>
        {replyingTo && (
          <div className="replying">
            Respondendo a <strong>{replyingTo}</strong>
            <button type="button" onClick={() => setReplyingTo('')} aria-label="Cancelar resposta">
              <X size={14} />
            </button>
          </div>
        )}
        <div className="message-composer__row">
          <button type="button" className="composer-plus" onClick={() => showToast('Função indisponível no protótipo')} aria-label="Adicionar anexo">
            <Plus size={24} />
          </button>
          <label>
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Mensagem..."
              aria-label="Nova mensagem"
            />
            <Smile size={20} />
          </label>
          <button type="submit" disabled={!draft.trim()} aria-label="Enviar mensagem">
            <SendHorizontal size={19} />
          </button>
        </div>
      </form>
    </main>
  )
}
