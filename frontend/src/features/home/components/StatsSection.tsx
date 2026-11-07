import { useEffect, useRef, useState } from 'react'

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const stats = [
    {
      value: '820',
      unit: 'cv',
      label: 'Công suất tối đa',
      description: 'Động cơ V10 hút khí tự nhiên'
    },
    {
      value: '2.9',
      unit: 's',
      label: '0-100 km/h',
      description: 'Tăng tốc đáng kinh ngạc'
    },
    {
      value: '325',
      unit: 'km/h',
      label: 'Tốc độ tối đa',
      description: 'Hiệu suất đỉnh cao'
    },
    {
      value: '10,000',
      unit: 'rpm',
      label: 'Vòng quay động cơ',
      description: 'Âm thanh siêu xe thuần túy'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-10 bg-black">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center border border-[#262016] bg-[#0a0a0a] p-8 hover:border-lambo-primary/50 transition-all duration-500 hover:bg-[#0d0d0d] transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-3 relative">
                <span className="font-barlow font-bold text-5xl lg:text-6xl text-lambo-primary tracking-tight transition-all duration-300 group-hover:scale-110 inline-block">
                  {stat.value}
                </span>
                <span className="font-barlow font-medium text-2xl text-lambo-primary/70 ml-2">
                  {stat.unit}
                </span>
              </div>
              <h3 className="font-barlow font-bold text-white text-sm uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-lambo-hover">
                {stat.label}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {stat.description}
              </p>
              
              {/* Animated underline */}
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-lambo-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
