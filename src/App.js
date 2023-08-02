import { GithubOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Puff } from 'react-loader-spinner'
import './App.css'
import Randomizer from './Randomizer'

function App() {
  const [loading, setLoading] = useState(true)
  const [maps, setMaps] = useState([])

  useEffect(() => {
    const loadMaps = async () => {
      setLoading(true)
      const { data } = await axios.get('/maps.json')
      setMaps(data.map)
      setLoading(false)
    }

    loadMaps()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">OSU! Randomizer</h1>
        {loading ? (
          <Puff color="#00BFFF" height={100} width={100} />
        ) : (
          <Randomizer maps={maps} />
        )}

        <div className="footer">
          <div>
            <a
              href="https://github.com/Revitate/osu_randomizer"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined style={{ fontSize: '38px' }} />
            </a>
          </div>
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
