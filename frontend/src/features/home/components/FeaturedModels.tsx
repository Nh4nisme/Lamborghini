import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { DongXe } from '../types'

interface FeaturedModelsProps {
  items: DongXe[]
}

// Static car data with images
const carModels = [
  {
    name: 'REVUELTO',
    slug: 'revuelto',
    title: 'FROM NOW ON',
    subtitle: 'THE QUANTUM OF DRIVING',
    image: '/Images/homepage/Revuelto.png',
    specs: [
      { value: 'V12', label: 'PLUG-IN HYBRID' },
      { value: '1,015 CV', label: 'COMBINED POWER' },
      { value: '2.5 S', label: '0-100 KM/H' },
      { value: '>350 KM/H', label: 'TOP SPEED' }
    ],
    tagline: 'HIGH PERFORMANCE ELECTRIFIED VEHICLE'
  },
  {
    name: 'TEMERARIO',
    slug: 'temerario',
    title: 'BEYOND LIMITS',
    subtitle: 'THE NEW V8 HYBRID ERA',
    image: '/Images/homepage/Temerario.png',
    specs: [
      { value: 'V8', label: 'TWIN-TURBO HYBRID' },
      { value: '920 CV', label: 'COMBINED POWER' },
      { value: '2.7 S', label: '0-100 KM/H' },
      { value: '>340 KM/H', label: 'TOP SPEED' }
    ],
    tagline: 'THE BOLD ESSENCE OF LAMBORGHINI'
  },
  {
    name: 'URUS SE',
    slug: 'urus-se',
    title: 'POWER UNLEASHED',
    subtitle: 'THE SUPER SUV',
    image: '/Images/homepage/Urus se.png',
    specs: [
      { value: 'V8', label: 'PLUG-IN HYBRID' },
      { value: '800 CV', label: 'COMBINED POWER' },
      { value: '3.4 S', label: '0-100 KM/H' },
      { value: '312 KM/H', label: 'TOP SPEED' }
    ],
    tagline: 'THE ULTIMATE PERFORMANCE SUV'
  }
]

export function FeaturedModels(_props: FeaturedModelsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % carModels.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev - 1 + carModels.length) % carModels.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const activeModel = carModels[activeIndex]
  const prevIndex = (activeIndex - 1 + carModels.length) % carModels.length
  const nextIndex = (activeIndex + 1) % carModels.length

  return (
    <section className="relative py-24 px-6 lg:px-10 bg-lambo-bold-black overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-0 mb-16">
          {carModels.map((model, index) => (
            <button
              key={model.slug}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsTransitioning(false), 500)
                }
              }}
              className={`relative px-12 py-4 text-sm font-barlow font-bold uppercase tracking-wider transition-all duration-300 ${
                index === activeIndex
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {model.name}
              {index === activeIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-lambo-primary animate-slideIn" />
              )}
            </button>
          ))}
        </div>

        {/* Main Carousel Container */}
        <div className="relative h-[600px] lg:h-[700px]">
          {/* Side Preview - Previous */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 lg:w-48 opacity-30 hover:opacity-50 transition-opacity duration-300 z-10">
            <img
              src={carModels[prevIndex].image}
              alt={carModels[prevIndex].name}
              className="w-full h-auto transform scale-75"
            />
            <p className="text-xs text-gray-600 uppercase font-barlow font-bold mt-4 text-center">
              {carModels[prevIndex].name}
            </p>
          </div>

          {/* Center Active Model */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl z-20">
            {/* Model Name & Title */}
            <div className="text-center mb-8 animate-fadeInUp">
              <h2 className="text-5xl lg:text-7xl font-barlow font-bold uppercase tracking-tight text-white mb-3">
                {activeModel.title}
              </h2>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-barlow">
                {activeModel.subtitle}
              </p>
            </div>

            {/* Car Image */}
            <div className="relative mb-12 px-8 animate-zoomIn" style={{ animationDelay: '0.2s' }}>
              <img
                src={activeModel.image}
                alt={activeModel.name}
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(216, 160, 22, 0.3))'
                }}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link
                to={`/models/${activeIndex + 1}`}
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
              {activeModel.specs.map((spec, index) => (
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

            {/* Tagline */}
            <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs text-gray-600 uppercase tracking-widest font-barlow">
                {activeModel.tagline}
              </p>
            </div>
          </div>

          {/* Side Preview - Next */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 lg:w-48 opacity-30 hover:opacity-50 transition-opacity duration-300 z-10">
            <img
              src={carModels[nextIndex].image}
              alt={carModels[nextIndex].name}
              className="w-full h-auto transform scale-75"
            />
            <p className="text-xs text-gray-600 uppercase font-barlow font-bold mt-4 text-center">
              {carModels[nextIndex].name}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Previous model"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next model"
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Manufacturer Note */}
        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <p className="text-xs text-gray-600 italic">
            Manufacturer performance figures. Specifications may vary by market.
          </p>
        </div>
      </div>
    </section>
  )
}
