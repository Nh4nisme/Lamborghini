import { Link, useLocation } from 'react-router-dom'
import { Search, Globe, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useDongXe } from '../features/model/hooks'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { data: dongXeList } = useDongXe()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModelsDropdownOpen(false)
        setAboutDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
              className={`hover:text-lambo-primary transition-colors ${location.pathname === '/' ? 'text-lambo-primary' : ''
                }`}
            >
              TRANG CHỦ
            </Link>

            {/* Models Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setModelsDropdownOpen(!modelsDropdownOpen)}
                className={`hover:text-lambo-primary transition-colors flex items-center gap-1 ${location.pathname.startsWith('/models') ? 'text-lambo-primary' : ''
                  }`}
              >
                <span>MODELS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${modelsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {modelsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#0a0a0a] border border-[#2a2a2a] shadow-2xl animate-fadeIn">
                  <div className="p-2">
                    {dongXeList && dongXeList.length > 0 ? (
                      dongXeList
                        .filter(dx => dx.trangThai === 'HIEN_THI')
                        .map((dongXe) => (
                          <Link
                            key={dongXe.maDongXe}
                            to={`/models/${dongXe.maDongXe}`}
                            onClick={() => setModelsDropdownOpen(false)}
                            className="block px-4 py-3 hover:bg-lambo-primary/10 transition-colors group"
                          >
                            <div className="text-sm font-bold text-white group-hover:text-lambo-primary uppercase tracking-wide">
                              {dongXe.tenDongXe}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {dongXe.danhMuc}
                            </div>
                          </Link>
                        ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-gray-600">
                        Loading models...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dealership Link - Direct navigation */}
            <Link
              to="/showroom"
              className={`hover:text-white transition-colors py-2 ${location.pathname === '/showroom' ? 'text-white' : ''
                }`}
            >
              DEALERSHIP
            </Link>

            {/* About Dropdown */}
            <div className="relative group">
              <button
                onClick={() => {
                  setAboutDropdownOpen(!aboutDropdownOpen)
                  setModelsDropdownOpen(false)
                }}
                className="hover:text-white transition-colors flex items-center gap-1 py-2"
              >
                <span>ABOUT</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-[#2a2a2a] shadow-2xl animate-fadeIn">
                  <div className="p-2">
                    <a
                      href="#company"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-lambo-primary/10 hover:text-lambo-primary transition-colors uppercase tracking-wide"
                    >
                      Company
                    </a>
                    <a
                      href="#design"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-lambo-primary/10 hover:text-lambo-primary transition-colors uppercase tracking-wide"
                    >
                      Developer
                    </a>
                    <a
                      href="#history"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-lambo-primary/10 hover:text-lambo-primary transition-colors uppercase tracking-wide"
                    >
                      History
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* News Link */}
            <a
              href="#news"
              className="hover:text-white transition-colors py-2"
            >
              NEWS
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-lambo-primary hover:text-lambo-hover transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-lambo-primary hover:text-lambo-hover transition-colors" aria-label="Language">
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-lambo-primary hover:text-lambo-hover transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d0d] border-t border-[#2a2a2a] px-6 py-6 animate-fadeInDown">
            <nav className="flex flex-col gap-4 text-sm uppercase tracking-wider font-semibold text-white/80">
              <Link
                to="/"
                className="hover:text-lambo-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>

              <div>
                <button
                  onClick={() => setModelsDropdownOpen(!modelsDropdownOpen)}
                  className="text-left hover:text-lambo-primary py-2 flex items-center justify-between w-full"
                >
                  <span>Models</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${modelsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {modelsDropdownOpen && dongXeList && (
                  <div className="ml-4 mt-2 space-y-2">
                    {dongXeList
                      .filter(dx => dx.trangThai === 'HIEN_THI')
                      .map((dongXe) => (
                        <Link
                          key={dongXe.maDongXe}
                          to={`/models/${dongXe.maDongXe}`}
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setModelsDropdownOpen(false)
                          }}
                          className="block text-sm text-gray-400 hover:text-lambo-primary py-1"
                        >
                          {dongXe.tenDongXe}
                        </Link>
                      ))}
                  </div>
                )}
              </div>

              <Link
                to="/showroom"
                className="hover:text-lambo-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dealership
              </Link>

              <div>
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="text-left hover:text-lambo-primary py-2 flex items-center justify-between w-full"
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {aboutDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <a
                      href="#company"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setAboutDropdownOpen(false)
                      }}
                      className="block text-sm text-gray-400 hover:text-lambo-primary py-1"
                    >
                      Company
                    </a>
                    <a
                      href="#design"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setAboutDropdownOpen(false)
                      }}
                      className="block text-sm text-gray-400 hover:text-lambo-primary py-1"
                    >
                      Design
                    </a>
                    <a
                      href="#history"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setAboutDropdownOpen(false)
                      }}
                      className="block text-sm text-gray-400 hover:text-lambo-primary py-1"
                    >
                      History
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#news"
                className="hover:text-lambo-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
