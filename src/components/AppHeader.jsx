import { Heart, MessageCircle, Moon, Settings, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from './BrandLogo'

export default function AppHeader({ showToast, theme, onToggleTheme }) {
  const navigate = useNavigate()

  return (
    <header className="main-header">
      <BrandLogo />
      <div className="main-header__actions">
        <button
          className="icon-button"
          type="button"
          aria-label="Favoritos"
          onClick={() => showToast('Função indisponível no protótipo')}
        >
          <Heart size={22} />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Comunidade"
          onClick={() => navigate('/community')}
        >
          <MessageCircle size={23} />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Configurações"
          onClick={() => showToast('Função indisponível no protótipo')}
        >
          <Settings size={23} />
        </button>
        <button
          className="dark-pill"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
          {theme === 'dark' ? <Moon size={18} fill="currentColor" /> : <Sun size={18} />}
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  )
}
