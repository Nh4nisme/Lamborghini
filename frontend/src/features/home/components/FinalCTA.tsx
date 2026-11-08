import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
          alt="Your Next Chapter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto text-center">
        <h2 className="font-barlow font-bold text-5xl sm:text-6xl lg:text-7xl uppercase text-white mb-8 tracking-tight leading-tight">
          YOUR NEXT CHAPTER.
        </h2>
        <p className="text-gray-300 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
          Bắt đầu hành trình của bạn với Lamborghini. Đặt lịch tư vấn hoặc lái thử ngay hôm nay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold px-10 py-5 uppercase tracking-wider text-base transition-all duration-300 inline-flex items-center justify-center gap-3">
            <span>Đặt lịch ngay</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group border-2 border-white hover:bg-white hover:text-lambo-bold-black text-white font-barlow font-bold px-10 py-5 uppercase tracking-wider text-base transition-all duration-300 inline-flex items-center justify-center gap-3">
            <span>Liên hệ chúng tôi</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
