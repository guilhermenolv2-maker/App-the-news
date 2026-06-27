import { CalendarDays, ChevronRight, Crown, Star } from 'lucide-react'

export default function GameCard({
  game,
  onClick,
}) {
  return (
    <button className={`game-card game-card--${game.theme}`} type="button" onClick={onClick}>
      <div className="game-card__art" aria-hidden="true">
        <span>{game.emoji}</span>
      </div>
      <div className="game-card__body">
        <div className="game-card__title">
          <h3>{game.title}</h3>
          {game.isNew && <span>Novo</span>}
        </div>
        <p>{game.description}</p>
        <div className="game-card__meta">
          <span>
            {game.theme === 'word' && <CalendarDays size={15} />}
            {game.theme === 'web' && <Star size={15} fill="currentColor" />}
            {game.theme === 'search' && <Crown size={15} fill="currentColor" />}
            {game.meta}
          </span>
          <strong>{game.progress}</strong>
        </div>
        <ChevronRight className="game-card__arrow" size={26} />
      </div>
    </button>
  )
}
