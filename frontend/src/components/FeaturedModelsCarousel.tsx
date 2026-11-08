import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// Type definition
interface DongXe {
  maDongXe: number
  tenDongXe: string
  danhMuc: string
  moTa: string
  trangThai: string
  noiBat: boolean
  hinhAnh?: string
}

interface FeaturedModelsCarouselProps {
  items: DongXe[]
  showHeader?: boolean
}

// Helper function to get local image path
const getCarImage = (tenDongXe: string): string => {
  // Normalize car name for matching
  const normalizedName = tenDongXe.toLowerCase().trim()

  // Map car names to image files
  const imageMap: { [key: string]: string } = {
    'revuelto': '/Images/models/Revuelto.png',
    'temerario': '/Images/models/Temerario.png',
    'urus': '/Images/models/Urus.png',
    'urus se': '/Images/models/Urus.png',
    'huracán': '/Images/models/Huracan.png',
    'huracan': '/Images/models/Huracan.png',
  }

  // Try to find matching image
  for (const [key, path] of Object.entries(imageMap)) {
    if (normalizedName.includes(key)) {
      return path
    }
  }

  // Fallback to placeholder
  return 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
}

// Map car data to specs
const getCarSpecs = (dongXe: DongXe) => {
  const name = dongXe.tenDongXe.toLowerCase()

  if (name.includes('revuelto')) {
    return [
      { value: 'V12', label: 'PLUG-IN HYBRID' },
      { value: '1,015 CV', label: 'COMBINED POWER' },
      { value: '2.5 S', label: '0-100 KM/H' },
      { value: '>350 KM/H', label: 'TOP SPEED' }
    ]
  } else if (name.includes('temerario')) {
    return [
      { value: 'V8', label: 'TWIN-TURBO HYBRID' },
      { value: '920 CV', label: 'COMBINED POWER' },
      { value: '2.7 S', label: '0-100 KM/H' },
      { value: '>340 KM/H', label: 'TOP SPEED' }
    ]
  } else if (name.includes('urus')) {
    return [
      { value: 'V8', label: 'PLUG-IN HYBRID' },
      { value: '800 CV', label: 'COMBINED POWER' },
      { value: '3.4 S', label: '0-100 KM/H' },
      { value: '312 KM/H', label: 'TOP SPEED' }
    ]
  } else if (name.includes('hurac')) {
    return [
      { value: 'V10', label: 'NATURALLY ASPIRATED' },
      { value: '640 CV', label: 'MAX POWER' },
      { value: '2.9 S', label: '0-100 KM/H' },
      { value: '325 KM/H', label: 'TOP SPEED' }
    ]
  }

  // Default specs
  return [
    { value: 'V12', label: 'ENGINE' },
    { value: '700+ CV', label: 'POWER' },
    { value: '<3 S', label: '0-100 KM/H' },
    { value: '>300 KM/H', label: 'TOP SPEED' }
  ]
}

export function FeaturedModelsCarousel({ items }: FeaturedModelsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  // Filter displayed models
  const displayedModels = items.filter(xe => xe.trangThai === 'HIEN_THI' && xe.noiBat)

  if (displayedModels.length === 0) {
    return null
  }

  const handleNext = () => {
    if (isTransitioning) return
    setDirection('right')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % displayedModels.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setDirection('left')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev - 1 + displayedModels.length) % displayedModels.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const activeModel = displayedModels[activeIndex]
  const prevIndex = (activeIndex - 1 + displayedModels.length) % displayedModels.length
  const nextIndex = (activeIndex + 1) % displayedModels.length

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-10 bg-lambo-bold-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Tab Navigation */}
        <div className="flex justify-center gap-0 mb-16">
          {displayedModels.map((model, index) => (
            <button
              key={model.maDongXe}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsTransitioning(false), 500)
                }
              }}
              className={`relative px-12 py-4 text-sm font-barlow font-bold uppercase tracking-wider transition-all duration-300 ${index === activeIndex
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              {model.tenDongXe.toUpperCase()}
              {index === activeIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-lambo-primary animate-slideIn" />
              )}
            </button>
          ))}
        </div>

        {/* Main Carousel Container */}
        <div className="relative h-[600px] lg:h-[700px]">
          {/* Side Preview - Previous */}
          {displayedModels.length > 1 && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 lg:w-48 opacity-30 hover:opacity-50 transition-opacity duration-300 z-10 cursor-pointer" onClick={handlePrev}>
              <div className="w-full h-20 lg:h-32">
                <img
                  src={getCarImage(displayedModels[prevIndex].tenDongXe)}
                  alt={displayedModels[prevIndex].tenDongXe}
                  className="w-full h-full object-contain transform scale-75"
                />
              </div>
              <p className="text-xs text-gray-600 uppercase font-barlow font-bold mt-4 text-center">
                {displayedModels[prevIndex].tenDongXe}
              </p>
            </div>
          )}

          {/* Center Active Model */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl z-20">
            {/* Model Name & Title */}
            <div className="text-center mb-8 animate-fadeInUp">

              <h2 className="text-5xl lg:text-7xl font-barlow font-bold uppercase tracking-tight text-white mb-3">
                FROM NOW ON
              </h2>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-barlow">
                {activeModel.danhMuc}
              </p>
            </div>

            {/* Car Image - Fixed dimensions with transition */}
            <div className="relative mb-12 px-8 overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full h-[300px] lg:h-[400px]">
                <img
                  key={activeModel.maDongXe}
                  src={getCarImage(activeModel.tenDongXe)}
                  alt={activeModel.tenDongXe}
                  className={`absolute inset-0 w-full h-full object-contain transform hover:scale-105 transition-all duration-700 ${isTransitioning
                      ? direction === 'right'
                        ? 'animate-slideInFromRight'
                        : 'animate-slideInFromLeft'
                      : 'opacity-100'
                    }`}
                  style={{
                    filter: 'drop-shadow(0 20px 60px rgba(216, 160, 22, 0.3))'
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link
                to={`/models/${activeModel.maDongXe}`}
                className="group bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black font-barlow font-bold px-10 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Model</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group border-2 border-white hover:bg-white hover:text-lambo-bold-black text-white font-barlow font-bold px-10 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
                <span>Configure Yours</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              {getCarSpecs(activeModel).map((spec, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="text-3xl lg:text-4xl font-barlow font-bold text-white mb-1 group-hover:text-lambo-primary transition-colors">
                    {spec.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-barlow font-semibold">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
                {activeModel.moTa}
              </p>
            </div>
          </div>

          {/* Side Preview - Next */}
          {displayedModels.length > 1 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 lg:w-48 opacity-30 hover:opacity-50 transition-opacity duration-300 z-10 cursor-pointer" onClick={handleNext}>
              <div className="w-full h-20 lg:h-32">
                <img
                  src={getCarImage(displayedModels[nextIndex].tenDongXe)}
                  alt={displayedModels[nextIndex].tenDongXe}
                  className="w-full h-full object-contain transform scale-75"
                />
              </div>
              <p className="text-xs text-gray-600 uppercase font-barlow font-bold mt-4 text-center">
                {displayedModels[nextIndex].tenDongXe}
              </p>
            </div>
          )}

          {/* Navigation Arrows - Hexagon Style */}
          {displayedModels.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="group absolute left-8 lg:left-16 top-[30%] -translate-y-1/2 w-16 aspect-[1.1547/1] flex items-center justify-center text-white transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed hover:drop-shadow-[0_0_12px_rgba(216,160,22,0.6)]"
                aria-label="Previous model"
              >
                <svg viewBox="0 0 100 86.6" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
                  <polygon
                    points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="fill-black/50 stroke-white/30 group-hover:fill-lambo-primary/20 group-hover:stroke-lambo-primary transition-all duration-300"
                  />
                </svg>
                <ArrowLeft className="w-6 h-6 relative z-10 group-hover:-translate-x-1 group-hover:text-lambo-primary transition-all duration-300" />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="group absolute right-8 lg:right-16 top-[30%] -translate-y-1/2 w-16 aspect-[1.1547/1] flex items-center justify-center text-white transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed hover:drop-shadow-[0_0_12px_rgba(216,160,22,0.6)]"
                aria-label="Next model"
              >
                <svg viewBox="0 0 100 86.6" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
                  <polygon
                    points="25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="fill-black/50 stroke-white/30 group-hover:fill-lambo-primary/20 group-hover:stroke-lambo-primary transition-all duration-300"
                  />
                </svg>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:text-lambo-primary transition-all duration-300" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}