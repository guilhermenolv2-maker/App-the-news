import {
  BookOpen,
  CalendarDays,
  CircleUserRound,
  Droplets,
  Gamepad2,
  Home,
  Menu,
  Medal,
  Newspaper,
  Repeat2,
  Trophy,
} from 'lucide-react'

const editionItems = [
  { id: 'edition', label: 'edição', Icon: Newspaper },
  { id: 'habits', label: 'hábitos', Icon: Droplets },
  { id: 'cup', label: 'copa', Icon: Trophy },
  { id: 'books', label: 'livros', Icon: BookOpen },
  { id: 'more', label: 'mais', Icon: Menu },
]

const gamesItems = [
  { id: 'home', label: 'Início', Icon: Home },
  { id: 'games', label: 'Jogos', Icon: Gamepad2 },
  { id: 'ranking', label: 'Ranking', Icon: Medal },
  { id: 'profile', label: 'Perfil', Icon: CircleUserRound },
]

export default function BottomNav({
  variant = 'edition',
  active,
  onSelect,
}) {
  const items = variant === 'games' ? gamesItems : editionItems

  return (
    <nav className={`bottom-nav bottom-nav--${variant}`} aria-label="Navegação principal">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={active === id ? 'is-active' : ''}
          type="button"
          onClick={() => onSelect(id)}
          aria-current={active === id ? 'page' : undefined}
        >
          <span className="bottom-nav__icon">
            <Icon size={21} strokeWidth={active === id ? 2.6 : 2} />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
