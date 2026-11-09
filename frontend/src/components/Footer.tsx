import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <footer className="bg-black text-white border-t border-lambo-primary/30">
      {/* Top Section with Newsletter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-barlow font-bold uppercase tracking-wide text-lambo-primary mb-4">
              Lamborghini
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              A study in extraordinary performance, design and possibility.
            </p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-sm font-barlow font-bold uppercase tracking-wider text-lambo-primary mb-4">
              STAY IN THE KNOW
            </h3>
            <p className="text-gray-400 text-sm mb-4">Newsletter / Email address</p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border border-lambo-primary/50 focus:border-lambo-primary px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lambo-primary" />
              </div>
              
              <p className="text-xs text-gray-600">
                Design-only signup. No information is collected.
              </p>
              
              <button
                type="submit"
                className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-black font-barlow font-bold px-8 py-3 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Models */}
            <div>
              <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">
                Models
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/models/1" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Temerario
                  </Link>
                </li>
                <li>
                  <Link to="/models/2" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Revuelto
                  </Link>
                </li>
                <li>
                  <Link to="/models/3" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Urus
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    History
                  </a>
                </li>
              </ul>
            </div>

            {/* Ownership */}
            <div>
              <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">
                Ownership
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/showroom" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Dealership
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Beyond */}
            <div>
              <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">
                Beyond
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Motorsport
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Museum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-lambo-primary transition-colors">
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 mb-6">
            <a href="#" className="hover:text-lambo-primary transition-colors">Company</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Financials</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Sitemap</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Careers</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Recall Campaign</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Privacy & Legal</a>
            <a href="#" className="hover:text-lambo-primary transition-colors">Newsletter</a>
            <Link to="/contact" className="hover:text-lambo-primary transition-colors">Contact</Link>
            <a href="#" className="hover:text-lambo-primary transition-colors">Accessibility</a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 mb-6">
            <a href="https://instagram.com/lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              Instagram
            </a>
            <a href="https://threads.net/@lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              Threads
            </a>
            <a href="https://facebook.com/lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              Facebook
            </a>
            <a href="https://youtube.com/lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              YouTube
            </a>
            <a href="https://x.com/lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              X
            </a>
            <a href="https://tiktok.com/@lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              TikTok
            </a>
            <a href="https://linkedin.com/company/lamborghini" target="_blank" rel="noopener noreferrer" className="hover:text-lambo-primary transition-colors">
              LinkedIn
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-600 leading-relaxed">
            Lamborghini — Independent illustrative design study. Not an official Lamborghini website. 
            Model names are used for reference. Original concept imagery is illustrative, not an exact 
            representation of the vehicles. Figures are manufacturer references; local specifications 
            and consumption information must be confirmed before publication. Static interface only: 
            no navigation, configuration, locator or enquiry is connected.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-900">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <p className="text-xs text-gray-700 text-center">
            © {new Date().getFullYear()} Automobili Lamborghini S.p.A. All rights reserved. Design study.
          </p>
        </div>
      </div>
    </footer>
  )
}
