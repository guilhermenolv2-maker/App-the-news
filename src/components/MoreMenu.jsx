import { Gamepad2, HelpCircle, Newspaper, X } from 'lucide-react'

export default function MoreMenu({ open, onClose, onGames, showToast }) {
  if (!open) return null

  return (
    <div className="menu-overlay" onMouseDown={onClose}>
      <section
        className="more-menu"
        onMouseDown={(event) => event.stopPropagation()}
        aria-label="Menu mais"
      >
        <div className="more-menu__handle" />
        <div className="more-menu__header">
          <div>
            <span>explorar</span>
            <h2>Mais no the news</h2>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <button className="more-menu__item is-featured" type="button" onClick={onGames}>
          <span><Gamepad2 size={22} /></span>
          <div>
            <strong>Jogos</strong>
            <small>Um desafio novo todo dia</small>
          </div>
        </button>
        <button
          className="more-menu__item"
          type="button"
          onClick={() => showToast('Função indisponível no protótipo')}
        >
          <span><Newspaper size={21} /></span>
          <div>
            <strong>Sobre o the news</strong>
            <small>Conheça a nossa história</small>
          </div>
        </button>
        <button
          className="more-menu__item"
          type="button"
          onClick={() => showToast('Função indisponível no protótipo')}
        >
          <span><HelpCircle size={21} /></span>
          <div>
            <strong>Ajuda</strong>
            <small>Dúvidas frequentes</small>
          </div>
        </button>
      </section>
    </div>
  )
}
