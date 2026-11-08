import { ArrowRight } from 'lucide-react'

export function ShowroomCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-lambo-bold-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
                alt="Lamborghini Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
              MORE THAN A<br />
              DESTINATION.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Ghé thăm showroom Lamborghini để trải nghiệm trực tiếp sự hoàn hảo của nghệ thuật chế tạo siêu xe Ý. 
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn tìm hiểu mọi chi tiết về các dòng xe, tùy chọn cá nhân hóa và dịch vụ sau bán hàng.
            </p>
            <button className="group bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
              <span>Tìm showroom gần bạn</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
