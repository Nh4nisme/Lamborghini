import { ArrowUpRight } from 'lucide-react'
import contactHero from '../../../assets/contact-hero.png'
import { Eyebrow } from '../../../components/ui'

export function ContactHero() {
  return (
    <section data-node-id="8:48172" className="relative h-[560px] overflow-hidden">
      <img src={contactHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-lambo-bold-black via-lambo-bold-black/70 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 pb-14 pt-[168px] lg:px-[120px]">
        <div data-node-id="8:48175" className="max-w-[650px]">
          <Eyebrow>Contact / Sant&apos;Agata Bolognese</Eyebrow>
          <h1
            className="mt-4 text-[56px] font-bold uppercase leading-[56px] tracking-[-0.01em] text-lambo-secondary md:text-[80px] md:leading-[80px]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            The start of
            <br />
            a conversation.
          </h1>
          <div className="mt-8">
            <a
              href="#enquiry"
              className="inline-flex h-12 items-center gap-3 bg-lambo-primary px-8 text-sm font-semibold uppercase tracking-[0.04em] text-black transition-colors hover:bg-lambo-hover"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              Make an enquiry
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex items-end justify-between text-xs font-semibold uppercase tracking-[0.08em] text-lambo-hover">
          <span>01 / 03</span>
          <a href="#contact-introduction" className="hover:text-lambo-secondary">
            Scroll to explore ↓
          </a>
        </div>
      </div>
    </section>
  )
}
