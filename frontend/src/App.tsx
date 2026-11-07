import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'
import ConfiguratorPage from './pages/ConfiguratorPage'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isConfigurator = location.pathname.startsWith('/configurator')

  // Dedicated full-screen atelier for Configurator (ẩn Navbar & Footer riêng theo mẫu thiết kế)
  if (isConfigurator) {
    return (
      <Routes>
        <Route path="/configurator/:maXe" element={<ConfiguratorPage />} />
        <Route path="/configurator" element={<Navigate to="/configurator/1" replace />} />
      </Routes>
    )
  }

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
