import { Link, useLocation } from 'react-router-dom'
import { Search, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="w-full border-b border-[#262016]/80 bg-[#090909]/95 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-white tracking-[0.22em] text-lg sm:text-xl font-bold uppercase transition-opacity hover:opacity-80 font-barlow"
          >
            Lamborghini
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-[0.18em] font-medium text-[#c4c4c4]">
            <Link
              to="/"
              className={`hover:text-[#d4af37] transition-colors ${
                location.pathname === '/' ? 'text-[#d4af37]' : ''
              }`}
            >
              TRANG CHỦ
            </Link>
            <Link
              to="/models"
              className={`hover:text-[#d4af37] transition-colors ${
                location.pathname === '/models' ? 'text-[#d4af37]' : ''
              }`}
            >
              MODELS
            </Link>
            <Link
              to="/showroom"
              className={`hover:text-[#d4af37] transition-colors ${
                location.pathname === '/showroom' ? 'text-[#d4af37]' : ''
              }`}
            >
              SHOWROOM
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-1.5 text-[#a3a3a3] hover:text-[#d4af37] transition-colors" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-[#a3a3a3] hover:text-[#d4af37] transition-colors" aria-label="Language">
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#a3a3a3] hover:text-white transition-colors lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d0d] border-t border-[#2b2417] px-6 py-6 flex flex-col gap-4 text-sm uppercase tracking-[0.18em] font-medium text-[#ccc]">
            <Link to="/" className="text-left hover:text-[#d4af37] py-1" onClick={() => setMobileMenuOpen(false)}>
              Trang chủ
            </Link>
            <Link to="/models" className="text-left hover:text-[#d4af37] py-1" onClick={() => setMobileMenuOpen(false)}>
              Models
            </Link>
            <Link to="/showroom" className="text-left hover:text-[#d4af37] py-1" onClick={() => setMobileMenuOpen(false)}>
              Showroom
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
