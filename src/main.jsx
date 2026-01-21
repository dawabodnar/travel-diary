import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import TravelForm from './TravelForm.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Analytics from './Analytics.jsx'
import TravelCalendar from './TravelCalendar.jsx'
import TravelGallery from './TravelGallery.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel-form" element={<TravelForm />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/travel-calendar" element={<TravelCalendar />} />
        <Route path="/gallery" element={<TravelGallery />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App