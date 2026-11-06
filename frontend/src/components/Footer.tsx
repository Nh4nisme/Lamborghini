import { Mail, ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes('@')) {
      setSubscribed(true)
    }
  }

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-12 border-t border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1f1a12]">
          {/* Brand */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] mb-3 text-white font-barlow">
              Lamborghini
            </h3>
            <p className="text-xs sm:text-sm text-[#888888] font-normal tracking-wide max-w-md">
              Một nghiên cứu về hiệu suất, thiết kế và khả năng phi thường.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-6">
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-[#8e826b] uppercase mb-2">
              ĐĂNG KÝ NHẬN TIN
            </div>
            <label htmlFor="newsletter-email" className="block text-xs text-[#a0a0a0] mb-2 font-medium">
              Email của bạn
            </label>

            {subscribed ? (
              <div className="p-3 bg-[#16140e] border border-[#d4af37] text-xs text-[#d4af37] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Đăng ký thành công. Cảm ơn bạn!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative max-w-md">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#121212] border border-[#383020] text-sm text-white px-4 py-3 pr-10 focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-[#555]"
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white border border-[#4d3f23] hover:border-[#d4af37] bg-black/60 hover:bg-[#d4af37]/10 transition-colors font-barlow"
                >
                  <span>ĐĂNG KÝ</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 text-[10px] text-[#555] leading-relaxed max-w-5xl">
          © 2026 Lamborghini Project. Dự án học tập và nghiên cứu thiết kế.
        </div>
      </div>
    </footer>
  )
}
