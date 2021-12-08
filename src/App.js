import { useEffect, useState } from 'react'
import './App.css'
import { loadMapList } from './service'
import Loader from 'react-loader-spinner'
import Randomizer from './Randomizer'

function App() {
  const [loading, setLoading] = useState(true)
  const [maps, setMaps] = useState([])

  useEffect(() => {
    const loadMaps = async () => {
      setLoading(true)
      const m = await loadMapList()
      setMaps(m)
      setLoading(false)
    }

    loadMaps()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">OSU! Randomizer</h1>
        {loading ? (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          <Randomizer maps={maps} />
        )}

        <div className="footer">
          <div>
            Made by{' '}
            <a
              href="https://github.com/Revitate"
              target="_blank"
              rel="noreferrer"
            >
              Revitate
            </a>
          </div>
          <div>
            And Thank to{' '}
            <a
              href="https://github.com/kiwec/osu-ranked-lobbies"
              target="_blank"
              rel="noreferrer"
            >
              kiwec
            </a>{' '}
            for beatmap sets
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
