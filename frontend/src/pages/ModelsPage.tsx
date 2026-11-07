import { useDongXe } from '../features/model/hooks'
import { FeaturedModelsCarousel } from '../components/FeaturedModelsCarousel'
import NextChapterCTA from '../components/NextChapterCTA'
import { ArrowRight } from 'lucide-react'

// Reusable sections
function UrusSection() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
              alt="Urus Family"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
          
          <div className="animate-fadeInUp">
            <p className="text-sm text-lambo-primary uppercase tracking-wider font-barlow font-semibold mb-4">
              EXPAND YOUR HORIZONS
            </p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white mb-6 tracking-tight">
              EVERY ROAD.<br />
              YOUR WORLD.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              The presence of a super sports car, interpreted for a world of possibilities. Discover the Urus family and a distinctive approach to performance, versatility and everyday emotion.
            </p>
            <button className="group border-2 border-lambo-primary hover:bg-lambo-primary text-lambo-primary hover:text-lambo-bold-black font-barlow font-bold px-8 py-4 uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2">
              <span>Explore the family</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function BeyondTheRangeSection() {
  const cards = [
    {
      icon: '🎨',
      title: 'MASTERPIECES',
      description: 'Every Lamborghini tells a story that shaped a history of going beyond.',
      buttonText: 'Explore history',
      link: '#history'
    },
    {
      icon: '✨',
      title: 'AD PERSONAM',
      description: 'Tailor your next chapter truly yours.',
      buttonText: 'Personalization',
      link: '#personalization'
    },
    {
      icon: '🏢',
      title: 'COMPANY',
      description: 'The people and principles that stand behind the extraordinary.',
      buttonText: 'About the brand',
      link: '#about'
    }
  ]

  return (
    <section className="py-24 px-6 lg:px-10 bg-lambo-bold-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-16 animate-fadeInUp">
          <p className="text-sm text-lambo-primary uppercase tracking-wider font-barlow font-semibold mb-4">
            THE STORY CONTINUES
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white tracking-tight">
            BEYOND THE RANGE.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-lambo-primary/50 p-8 transition-all duration-500 group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-4xl mb-6">{card.icon}</div>
              <h3 className="font-barlow font-bold text-xl uppercase text-white mb-4 tracking-wide">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {card.description}
              </p>
              <a
                href={card.link}
                className="inline-flex items-center gap-2 text-lambo-primary hover:text-lambo-hover uppercase text-xs font-barlow font-bold tracking-wider transition-colors"
              >
                <span>{card.buttonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ModelsPage() {
  const { data: dongXeList, isLoading, isError, error } = useDongXe()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-lambo-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lambo-primary font-barlow text-xl tracking-wider">Loading models...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black p-4">
        <div className="max-w-md w-full bg-lambo-tertiary border border-red-600/30 rounded-lg p-8 text-center">
          <p className="text-red-400 text-lg mb-6 font-barlow">Error: {error.message}</p>
          <button className="bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold py-3 px-8 transition-all duration-300 uppercase tracking-wider">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lambo-bold-black">
      {/* Featured Models Carousel */}
      {dongXeList && dongXeList.length > 0 && (
        <FeaturedModelsCarousel items={dongXeList} showHeader={true} />
      )}

      {/* Urus Section */}
      <UrusSection />

      {/* Beyond The Range */}
      <BeyondTheRangeSection />

      {/* Next Chapter CTA */}
      <NextChapterCTA />
    </div>
  )
}
