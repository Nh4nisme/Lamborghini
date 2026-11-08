interface HeroSectionProps {
  eyebrow: string
  subtitle: string
  disclaimer: string
  backgroundImage: string
}

export function HeroSection({ eyebrow, subtitle, disclaimer, backgroundImage }: HeroSectionProps) {
  return (
    <section aria-label="About us introduction" className="relative overflow-hidden">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div className="lg:w-[650px]">
            <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-9 font-[Barlow,sans-serif]">
              {eyebrow}
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase text-lambo-secondary tracking-[-0.01em] leading-[0.95] font-barlow">
              NINE MINDS.
              <br />
              ONE DIGITAL VISION.
            </h1>
          </div>

          <div className="lg:w-[470px] lg:mt-[76px]">
            <p className="text-lg leading-7 text-lambo-secondary font-[Barlow,sans-serif]">
              {subtitle}
            </p>
            <p className="mt-5 text-xs leading-4 text-lambo-hover font-[Barlow,sans-serif]">
              {disclaimer}
            </p>
          </div>
        </div>

        <div className="mt-14 border border-lambo-pressed px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="text-[28px] leading-8 font-semibold uppercase text-lambo-secondary font-barlow">
              LAMBORGHINI
            </span>
            <span className="text-[28px] leading-[34px] text-lambo-primary font-[Barlow,sans-serif]">
              ×
            </span>
            <div className="flex items-center gap-3">
              <img
                src="/Images/about-us/8threads-white.png"
                alt="8Threads logo"
                className="h-[50px] w-auto"
              />
              <span className="text-[32px] leading-[38px] font-semibold tracking-[-0.03em] text-white font-[Barlow,sans-serif]">
                8Threads
              </span>
            </div>
          </div>
          <div className="text-xs font-semibold leading-4 tracking-[0.08em] text-lambo-hover uppercase sm:text-right font-[Barlow,sans-serif]">
            DESIGN × DEVELOPMENT
            <br />
            BUILT WITH INTENT
          </div>
        </div>
      </div>
    </section>
  )
}
