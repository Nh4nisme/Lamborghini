import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'

function App() {
  return (
    <div className="min-h-screen bg-[#070707] text-[#e5e5e5]">
      <Navbar />
      
      <main className="pt-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/models" element={<ModelShowcasePage />} />
            <Route path="/showroom" element={<ShowroomPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App