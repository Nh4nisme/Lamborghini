import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Breadcrumb from './components/Breadcrumb'
import { Chatbot } from './components/Chatbot'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'
import ConfiguratorPage from './pages/ConfiguratorPage'
import ModelsPage from './pages/ModelsPage'
import AboutUsPage from "./pages/AboutUsPage.tsx";
import AboutBrandPage from "./pages/AboutBrandPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

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
                <Breadcrumb />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/models/:id" element={<ModelShowcasePage />} />
                    <Route path="/models" element={<ModelsPage />} />
                    <Route path="/showroom" element={<ShowroomPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/about-brand" element={<AboutBrandPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </main>
            <Footer />
            <Chatbot />
        </div>
    )
}

export default App
