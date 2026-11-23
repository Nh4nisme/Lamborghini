import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar, Footer, Breadcrumb } from './components/layout'
import { Chatbot } from './components/feedback'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ModelShowcasePage from './pages/ModelShowcasePage'
import ConfiguratorPage from './pages/ConfiguratorPage'
import ModelsPage from './pages/ModelsPage'
import AboutUsPage from "./pages/AboutUsPage.tsx";
import AboutBrandPage from "./pages/AboutBrandPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import {
    AppointmentPage,
    ProfilePage,
    SavedConfigurationsPage,
    ConfigurationExportPage,
    DealerAppointmentsPage,
    DealerAppointmentDetailPage,
} from './pages/profile'

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
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/:slug" element={<NewsPage />} />
                    <Route path="/newsroom" element={<NewsPage />} />
                    <Route path="/profile/user/appointments" element={<AppointmentPage />} />
                    <Route path="/profile/user/information" element={<ProfilePage />} />
                    <Route path="/profile/user/saved-configurations" element={<SavedConfigurationsPage />} />
                    <Route path="/profile/user/configuration-export" element={<ConfigurationExportPage />} />
                    <Route path="/profile/dealer/appointment" element={<DealerAppointmentsPage />} />
                    <Route path="/profile/dealer/appointment/:id" element={<DealerAppointmentDetailPage />} />
                </Routes>
            </main>
            <Footer />
            <Chatbot />
        </div>
    )
}

export default App
