import { useNavigate } from 'react-router-dom'
import mapLogo from './assets/map.svg'
import './Home.css'
import './index.css'

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div className="start-container">
        <img src={mapLogo} className="logo   map" alt="Map logo" />

        <div className="content">
          <h1>Мій щоденник подорожей</h1>
          <p>
            Зберігай спогади, додавай подорожі, повертайся до них знову
          </p>

          <p>
            Твій персональний паспорт для спогадів
          </p>
          <button onClick={() => navigate('/travel-form')} className='start-button'>
            Розпочати подорож
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
