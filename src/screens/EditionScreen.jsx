import { Bookmark, ChevronRight, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'
import MoreMenu from '../components/MoreMenu'

export default function EditionScreen({ showToast, theme, toggleTheme }) {
  const navigate = useNavigate()
  const [fontScale, setFontScale] = useState(1)
  const [saved, setSaved] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const selectNav = (item) => {
    if (item === 'edition') return
    if (item === 'more') {
      setMoreOpen(true)
      return
    }
    showToast('Função indisponível no protótipo')
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'the news — edição night',
          text: 'Dá uma olhada na edição night do the news.',
        })
        return
      } catch {
        return
      }
    }
    showToast('Link da edição copiado')
  }

  return (
    <main className="screen edition-screen">
      <div className="edition-screen__top">
        <AppHeader
          showToast={showToast}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div className="edition-tabs" role="tablist" aria-label="Edições">
          <button type="button"><span className="dot dot--orange" />the news</button>
          <button type="button" className="is-active"><span className="tab-moon">●</span>night</button>
          <button type="button"><span className="dot dot--green" />tempo de copa</button>
          <button type="button"><span className="dot dot--cyan" />mercado</button>
        </div>
      </div>

      <div className="edition-content">
        <button
          type="button"
          className="read-online"
          onClick={() => showToast('Função indisponível no protótipo')}
        >
          Leia Online <ChevronRight size={17} />
        </button>
        <section className="night-hero">
          <div className="night-hero__copy">
            <h1><span>-</span> the news</h1>
            <strong>NIGHT</strong>
          </div>
        </section>

        <div className="edition-sponsor">
          <small>POWERED BY</small>
          <strong>WESTWING</strong>
        </div>

        <article
          className="news-article"
          style={{ '--article-scale': fontScale }}
        >
          <div className="article-heading-row">
            <div>
              <span className="news-article__section">BOA NOITE</span>
              <h2>O Rei Charles resolveu<br />abrir a carteira.</h2>
            </div>
            <div className="article-actions">
              <button
                type="button"
                aria-label="Alterar tamanho da fonte"
                onClick={() => setFontScale((value) => (value >= 1.2 ? 0.9 : value + 0.1))}
              >
                Aa
              </button>
              <button
                type="button"
                className={saved ? 'is-saved' : ''}
                aria-label="Salvar"
                onClick={() => {
                  setSaved((value) => !value)
                  showToast(saved ? 'Edição removida dos salvos' : 'Edição salva')
                }}
              >
                <Bookmark size={21} fill={saved ? 'currentColor' : 'none'} />
              </button>
              <button type="button" aria-label="Compartilhar" onClick={share}>
                <Share2 size={21} />
              </button>
            </div>
          </div>
          <p className="news-article__lead">
            Pela primeira vez na história da monarquia britânica, um rei revelou
            quanto paga de imposto: <strong>£12,9 milhões</strong> só em 2024-2025,
            colocando Charles entre os 100 maiores contribuintes do Reino Unido.
          </p>
          <div className="reading-progress-row">
            <span>▣</span>
            <small>Progresso da leitura</small>
            <div className="reading-progress"><i /></div>
            <strong>32%</strong>
          </div>
          <div className="article-separator" />
          <p>
            Tal pai, tal filho... O príncipe William declarou <b>£7,76 milhões</b> no
            mesmo período.
          </p>
        </article>
      </div>

      <BottomNav active="edition" onSelect={selectNav} />
      <MoreMenu
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        onGames={() => navigate('/games')}
        showToast={showToast}
      />
    </main>
  )
}
