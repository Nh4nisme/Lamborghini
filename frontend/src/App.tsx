import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import ModelsPage from './pages/ModelsPage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'

function App() {
  return (
    <div className="min-h-screen bg-lambo-bold-black text-[#e5e5e5]">
      <Navbar />

      <main className={isHomePage ? 'pt-14' : 'pt-14'}>
        {isHomePage ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        ) : (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <Routes>
              <Route path="/models/:id" element={<ModelShowcasePage />} />
              <Route path="/models" element={<Navigate to="/models/1" replace />} />
              <Route path="/showroom" element={<ShowroomPage />} />
            </Routes>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
