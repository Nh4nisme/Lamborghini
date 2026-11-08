import { ArrowRight, Calendar } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { TinTuc } from '../types'

interface NewsGridProps {
  items: TinTuc[]
}

export function NewsGrid({ items }: NewsGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
  // Filter and sort news by date
  const displayedNews = items
    .filter(tin => tin.trangThai === 'HIEN_THI')
    .sort((a, b) => new Date(b.ngayDang).getTime() - new Date(a.ngayDang).getTime())
    .slice(0, 3)

  if (displayedNews.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getLoaiLabel = (loai: string) => {
    switch (loai) {
      case 'SU_KIEN':
        return 'Sự kiện'
      case 'TIN_TUC':
        return 'Tin tức'
      case 'GIAI_THUONG':
        return 'Giải thưởng'
      default:
        return loai
    }
  }

  const getLoaiColor = (loai: string) => {
    switch (loai) {
      case 'SU_KIEN':
        return 'bg-lambo-primary text-lambo-bold-black'
      case 'TIN_TUC':
        return 'bg-blue-600 text-white'
      case 'GIAI_THUONG':
        return 'bg-green-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-10 bg-black">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className={`mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-4 tracking-tight">
            THE WORLD BEYOND.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Cập nhật những tin tức mới nhất về thế giới Lamborghini, từ ra mắt sản phẩm đến sự kiện độc quyền.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedNews.map((tin, index) => (
            <article
              key={tin.maTinTuc}
              className={`group bg-[#0a0a0a] border border-[#1a1a1a] hover:border-lambo-primary/50 transition-all duration-500 overflow-hidden flex flex-col transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">
                <img
                  src={tin.hinhAnh || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'}
                  alt={tin.tieuDe}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${getLoaiColor(tin.loai)} px-3 py-1 text-xs font-barlow font-bold uppercase tracking-wider`}>
                    {getLoaiLabel(tin.loai)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(tin.ngayDang)}</span>
                </div>

                {/* Title */}
                <h3 className="font-barlow font-bold text-xl text-white mb-3 group-hover:text-lambo-primary transition-colors line-clamp-2 uppercase tracking-wide">
                  {tin.tieuDe}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {tin.noiDung.split('\n')[0]}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-lambo-primary group-hover:gap-3 transition-all uppercase text-xs font-barlow font-bold tracking-wider">
                  <span>Đọc thêm</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover accent line */}
              <div className="w-0 h-1 bg-lambo-primary group-hover:w-full transition-all duration-500" />
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black font-barlow font-bold px-10 py-4 uppercase tracking-wider text-sm transition-all duration-300 inline-flex items-center gap-2">
            <span>Xem tất cả tin tức</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
