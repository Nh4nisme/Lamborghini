import { ArrowRight } from 'lucide-react'

export function ExperienceSection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600"
          alt="Lamborghini Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="max-w-2xl">
          <h2 className="font-barlow font-bold text-5xl sm:text-6xl lg:text-7xl uppercase text-white mb-6 tracking-tight leading-tight">
            CLOSER TO<br />
            EXTRAORDINARY.
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed mb-10">
            Trải nghiệm sức mạnh thuần túy và cảm giác lái không thể sánh được từ những chiếc siêu xe được chế tác thủ công tại Sant'Agata Bolognese.
          </p>
          <button className="group bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold px-10 py-5 uppercase tracking-wider text-base transition-all duration-300 flex items-center gap-3 shadow-2xl">
            <span>Đặt lịch lái thử</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
