import { ArrowLeft, BarChart3, Gamepad2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import GameCard from '../components/GameCard'

const games = [
  {
    id: 'palavritas',
    title: 'Palavritas',
    description: 'descubra a palavra do dia',
    meta: 'Jogue hoje',
    progress: '0/1',
    progressWidth: '0%',
    theme: 'word',
    isNew: true,
    emoji: '🥣',
  },
  {
    id: 'teia',
    title: 'Teia',
    description: 'agrupe palavras por tema',
    meta: 'Melhor: 12',
    progress: '0/5',
    progressWidth: '0%',
    theme: 'web',
    emoji: '🧩',
  },
  {
    id: 'caca-palavras',
    title: 'Caça-palavras',
    description: 'encontre as palavras escondidas',
    meta: 'Melhor: 18',
    progress: '0/3',
    progressWidth: '0%',
    theme: 'search',
    isNew: false,
    emoji: '🔠',
  },
]

export default function GamesScreen({ showToast }) {
  const navigate = useNavigate()

  const navSelect = (item) => {
    if (item === 'games') return
    if (item === 'home') {
      navigate('/')
      return
    }
    showToast('Função indisponível no protótipo')
  }

  return (
    <main className="screen games-screen">
      <header className="games-header">
        <button className="back-button games-back" type="button" onClick={() => navigate(-1)} aria-label="Voltar">
          <ArrowLeft size={21} />
        </button>
        <h1>Jogos</h1>
        <div className="games-header__icon"><Gamepad2 size={22} /></div>
      </header>

      <div className="games-content">
        <section className="games-intro">
          <i className="spark spark--one">✦</i>
          <i className="spark spark--two">✦</i>
          <i className="spark spark--three">✦</i>
          <h2>Um jogo novo todo dia</h2>
          <p>desafie sua cabeça 🧠</p>
        </section>

        <section className="games-list">
          {games.map((game) => (
            <div className="game-card-wrap" key={game.id}>
              {game.id === 'caca-palavras' && <span className="new-game-badge">Novo jogo</span>}
              <GameCard
                game={game}
                onClick={() => showToast('Jogo disponível no app the news')}
              />
            </div>
          ))}
        </section>

        <section className="daily-challenge">
          <div>
            <h3>Desafie-se todos os dias!</h3>
            <p>Complete os jogos diários e<br />mantenha sua mente afiada.</p>
            <button
              type="button"
              onClick={() => showToast('Função indisponível no protótipo')}
            >
              <BarChart3 size={17} /> Ver progresso
            </button>
          </div>
          <div className="trophy-emoji" aria-hidden="true">🏆</div>
        </section>
      </div>

      <BottomNav variant="games" active="games" onSelect={navSelect} />
    </main>
  )
}
