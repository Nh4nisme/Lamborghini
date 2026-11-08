import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'
import ConfiguratorPage from './pages/ConfiguratorPage'
import ModelsPage from './pages/ModelsPage'

function App() {
    const location = useLocation()
    const isConfigurator = location.pathname.startsWith('/configurator')

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
            <main className="pt-14">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/models/:id" element={<ModelShowcasePage />} />
                    <Route path="/models" element={<ModelsPage />} />
                    <Route path="/showroom" element={<ShowroomPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
