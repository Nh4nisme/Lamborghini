import { ArrowRight } from 'lucide-react'

export function PersonalSection() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
              EXCEPTIONAL<br />
              IS PERSONAL.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Dịch vụ khách hàng của Lamborghini không chỉ là sự hỗ trợ kỹ thuật. Đó là mối quan hệ lâu dài, sự tận tâm và cam kết mang đến trải nghiệm sở hữu đẳng cấp.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Từ bảo dưỡng định kỳ đến chương trình lái xe đặc biệt, chúng tôi đồng hành cùng bạn trong suốt hành trình với siêu xe Lamborghini.
            </p>
            <button className="group border-2 border-white hover:bg-white hover:text-lambo-bold-black text-white font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
              <span>Dịch vụ khách hàng</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                alt="Lamborghini Personal Service"
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
