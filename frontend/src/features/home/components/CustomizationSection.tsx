import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function CustomizationSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-10 bg-lambo-bold-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side with 3D Tilt */}
          <div 
            ref={imageRef}
            className={`relative order-2 lg:order-1 perspective-1000 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="relative aspect-[4/3] overflow-hidden transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
                alt="Lamborghini Customization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-lambo-primary hidden lg:block animate-pulse" />
          </div>

          {/* Content Side */}
          <div className={`order-1 lg:order-2 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
              YOU CAN'T HIDE WHO YOU ARE.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Lamborghini Ad Personam là chương trình cá nhân hóa cao cấp, cho phép bạn tạo ra một chiếc siêu xe độc nhất vô nhị phản ánh cá tính và phong cách riêng của mình.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Từ màu sơn đặc biệt, nội thất da thủ công, đến các chi tiết carbon fiber và caliper phanh, mọi yếu tố đều có thể được tùy chỉnh theo ý muốn của bạn.
            </p>
            <button className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
              <span>Khám phá Ad Personam</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
