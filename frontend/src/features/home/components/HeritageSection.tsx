import { ArrowRight } from 'lucide-react'

export function HeritageSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-lambo-bold-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
              BORN TO GO<br />
              BEYOND.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Từ năm 1963, Lamborghini đã định nghĩa lại ý nghĩa của siêu xe thể thao. Mỗi mẫu xe là một tác phẩm nghệ thuật, kết hợp giữa công nghệ tiên tiến và thiết kế Ý đột phá.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Di sản 60 năm của chúng tôi được xây dựng trên nền tảng đổi mới không ngừng, từ Miura huyền thoại đến Revuelto hybrid đột phá ngày nay.
            </p>
            <button className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
              <span>Khám phá lịch sử</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                alt="Lamborghini Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
