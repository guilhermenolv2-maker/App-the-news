import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CommunityScreen from './screens/CommunityScreen'
import EditionScreen from './screens/EditionScreen'
import GamesScreen from './screens/GamesScreen'
import Toast from './components/Toast'

function App() {
  const [toast, setToast] = useState(null)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('the-news-theme') || 'dark',
  )

  useEffect(() => {
    localStorage.setItem('the-news-theme', theme)
  }, [theme])

  const showToast = useCallback((message) => {
    const id = Date.now()
    setToast({ id, message })
  }, [])

  return (
    <div className={`app-stage app-stage--${theme}`}>
      <div className="phone-shell" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <EditionScreen
                showToast={showToast}
                theme={theme}
                toggleTheme={() =>
                  setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
                }
              />
            }
          />
          <Route
            path="/community"
            element={<CommunityScreen showToast={showToast} />}
          />
          <Route path="/games" element={<GamesScreen showToast={showToast} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  )
}

export default App
