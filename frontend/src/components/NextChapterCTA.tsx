import { ArrowRight } from 'lucide-react'

interface NextChapterCTAProps {
  onOpenConfigurator?: () => void
  onOpenEnquiry?: () => void
}

export const NextChapterCTA: React.FC<NextChapterCTAProps> = ({
  onOpenConfigurator,
  onOpenEnquiry,
}) => {
  const handleConfigurator = () => {
    if (onOpenConfigurator) {
      onOpenConfigurator()
    } else {
      console.log('Open configurator')
    }
  }

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry()
    } else {
      // Default: navigate to showroom
      window.location.href = '/showroom'
    }
  }

  return (
      <section className="relative w-full bg-lambo-disabled py-24 border-t border-gray-900">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-left">
          <div className="max-w-3xl animate-fadeInUp">
            {/* Eyebrow */}
            <div className="text-xs font-barlow font-semibold tracking-wider text-lambo-primary uppercase mb-4">
              BEYOND THE EXPECTED
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-barlow font-bold uppercase text-white tracking-tight leading-tight mb-6">
              YOUR NEXT CHAPTER.
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10">
              Explore your configuration, or start a conversation with a showroom.
            </p>

            {/* Two Action Buttons */}
            <div
                className="flex flex-col sm:flex-row items-start justify-start gap-4 animate-fadeInUp"
                style={{ animationDelay: '0.2s' }}
            >
              <button
                  onClick={handleConfigurator}
                  className="group bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black font-barlow font-bold px-10 py-5 uppercase tracking-wider text-base transition-all duration-300 flex items-center gap-3 shadow-lg"
              >
                <span>START CONFIGURATION</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                  onClick={handleEnquiry}
                  className="group border-2 border-white hover:bg-white hover:text-lambo-bold-black text-white font-barlow font-bold px-10 py-5 uppercase tracking-wider text-base transition-all duration-300 flex items-center gap-3"
              >
                <span>FIND A SHOWROOM</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default NextChapterCTA

