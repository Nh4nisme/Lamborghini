import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'

function App() {
  return (
    <div className="min-h-screen bg-lambo-bold-black text-[#e5e5e5]">
      <Navbar />
      
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models/:id" element={<ModelShowcasePage />} />
          <Route path="/models" element={<Navigate to="/models/1" replace />} />
          <Route path="/showroom" element={<ShowroomPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
