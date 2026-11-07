import { ArrowRight } from 'lucide-react'

export function VisionSection() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
              YOUR VISION.<br />
              WITHOUT COMPROMISE.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Trải nghiệm cabin được thiết kế hoàn hảo với sự kết hợp giữa công nghệ tiên tiến và thủ công truyền thống Ý. Mọi chi tiết đều hướng đến người lái.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-lambo-primary flex-shrink-0" />
                <div>
                  <h3 className="text-white font-barlow font-bold text-lg mb-1 uppercase tracking-wide">
                    Thiết kế lấy người lái làm trung tâm
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Mọi điều khiển và thông tin đều được bố trí tối ưu trong tầm tay và tầm mắt.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-lambo-primary flex-shrink-0" />
                <div>
                  <h3 className="text-white font-barlow font-bold text-lg mb-1 uppercase tracking-wide">
                    Chất liệu cao cấp
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Da thủ công, carbon fiber và nhôm anodized tạo nên không gian sang trọng.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2">
                <span>Xem nội thất</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-white hover:bg-white hover:text-lambo-bold-black text-white font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2">
                <span>Đặt lịch tham quan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
                alt="Lamborghini Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-lambo-primary hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
