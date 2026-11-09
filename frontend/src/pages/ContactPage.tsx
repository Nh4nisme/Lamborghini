import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Leaf, Mail, Minus, Plus, User } from 'lucide-react'
import contactHero from '../assets/contact-hero.png'

const HEADING_FONT = "'Barlow Condensed', sans-serif"
const BODY_FONT = "'Barlow', sans-serif"

const pathways = [
  {
    title: 'Customer Care',
    description: 'Questions about ownership or your experience? Start with a personal enquiry.',
    action: 'Write to us',
    href: '#enquiry',
  },
  {
    title: 'Your Showroom',
    description: 'Discuss models, personalization and local services with a showroom.',
    action: 'Find a showroom',
    to: '/showroom',
  },
  {
    title: 'Privacy & Personal Data',
    description: 'Access privacy information and the personal data request pathway.',
    action: 'Privacy request',
    href: '#enquiry',
  },
]

const cultureResources = [
  {
    title: 'Museum',
    description: 'Discover the collection and plan a visit to the world of heritage.',
    action: 'Explore the museum',
  },
  {
    title: 'Polo Storico',
    description: 'Discover the heritage preservation and historic vehicle pathway.',
    action: 'Discover Polo Storico',
  },
  {
    title: 'Unica',
    description: 'Explore the registration pathway for the connected owner community.',
    action: 'Unica registration',
  },
]

const faqs = [
  {
    question: 'How do I arrange a showroom consultation?',
    answer:
      'Use the dealership experience to choose a location and indicate your interests. In this study, all locator results are placeholders and no appointment is booked.',
  },
  {
    question: 'Where can I confirm local specifications?',
    answer:
      'Local specifications and consumption information must be confirmed with official Lamborghini channels for your market.',
  },
  {
    question: 'How do I make a privacy request?',
    answer:
      'Privacy requests are routed through the Privacy & Personal Data pathway above. This study does not process them.',
  },
]

const controlClass =
  'w-full border border-lambo-primary bg-lambo-tertiary px-4 py-3 text-base text-lambo-secondary placeholder:text-lambo-secondary/60 focus:outline-none focus:ring-1 focus:ring-lambo-hover'

const buttonClass =
  'inline-flex h-12 items-center gap-3 bg-lambo-primary px-8 text-sm font-semibold uppercase tracking-[0.04em] text-black transition-colors hover:bg-lambo-hover'

const outlineButtonClass =
  'inline-flex h-10 items-center gap-3 self-start border border-lambo-primary bg-black px-5 text-sm font-semibold uppercase tracking-[0.04em] text-lambo-secondary transition-colors hover:bg-lambo-primary hover:text-black'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-lambo-primary" style={{ fontFamily: BODY_FONT }}>
      {children}
    </p>
  )
}

function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[36px] font-bold uppercase leading-[40px] text-lambo-secondary md:text-[48px] md:leading-[52px] ${className}`}
      style={{ fontFamily: HEADING_FONT }}
    >
      {children}
    </h2>
  )
}

function PathwayCard({
  title,
  description,
  action,
  to,
  href,
}: {
  title: string
  description: string
  action: string
  to?: string
  href?: string
}) {
  const actionContent = (
    <>
      {action}
      <ArrowUpRight className="h-4 w-4" />
    </>
  )

  return (
    <article className="flex flex-col border border-lambo-pressed bg-lambo-tertiary p-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lambo-pressed">
        <Leaf className="h-4 w-4 text-lambo-primary" />
      </span>
      <h3 className="mt-6 text-[36px] font-semibold uppercase leading-[40px] text-lambo-secondary" style={{ fontFamily: HEADING_FONT }}>
        {title}
      </h3>
      <p className="mt-4 text-base leading-6 text-lambo-secondary" style={{ fontFamily: BODY_FONT }}>
        {description}
      </p>
      <div className="mt-auto pt-8">
        <div className="mb-6 border-t border-lambo-pressed" />
        {to ? (
          <Link to={to} className={outlineButtonClass} style={{ fontFamily: BODY_FONT }}>
            {actionContent}
          </Link>
        ) : href ? (
          <a href={href} className={outlineButtonClass} style={{ fontFamily: BODY_FONT }}>
            {actionContent}
          </a>
        ) : (
          <button type="button" className={outlineButtonClass} style={{ fontFamily: BODY_FONT }}>
            {actionContent}
          </button>
        )}
      </div>
    </article>
  )
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium tracking-[0.01em] text-lambo-primary" style={{ fontFamily: BODY_FONT }}>
        {label}
        {required && ' *'}
      </label>
      {children}
      {hint && (
        <p className="mt-2 text-xs text-lambo-primary/70" style={{ fontFamily: BODY_FONT }}>
          {hint}
        </p>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="font-sans" style={{ fontFamily: BODY_FONT }}>
      <section data-node-id="8:48172" className="relative h-[560px] overflow-hidden">
        <img src={contactHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lambo-bold-black via-lambo-bold-black/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 pb-14 pt-[168px] lg:px-[120px]">
          <div data-node-id="8:48175" className="max-w-[650px]">
            <Eyebrow>Contact / Sant’Agata Bolognese</Eyebrow>
            <h1
              className="mt-4 text-[56px] font-bold uppercase leading-[56px] tracking-[-0.01em] text-lambo-secondary md:text-[80px] md:leading-[80px]"
              style={{ fontFamily: HEADING_FONT }}
            >
              The start of
              <br />
              a conversation.
            </h1>
            <div className="mt-8">
              <a href="#enquiry" className={buttonClass} style={{ fontFamily: BODY_FONT }}>
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

      <section id="contact-introduction" data-node-id="8:48184" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-[120px]">
        <Eyebrow>Contact</Eyebrow>
        <SectionHeading className="mt-4 text-[48px] leading-[52px] md:text-[80px] md:leading-[80px]">
          Here to help
          <br />
          you go beyond.
        </SectionHeading>
        <p className="mt-8 max-w-[680px] text-lg leading-7 text-lambo-secondary">
          From your first question to the next chapter of ownership, find the right place to begin. Contact
          headquarters, explore customer care or make a personal enquiry.
        </p>
      </section>

      <section data-node-id="8:48190" className="bg-lambo-tertiary py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
          <Eyebrow>Automobili Lamborghini / Headquarters reference</Eyebrow>
          <SectionHeading className="mt-4">Sant’Agata Bolognese.</SectionHeading>
          <p className="mt-6 text-lg leading-7 text-lambo-secondary">
            Via Modena 12
            <br />
            40019 Sant’Agata Bolognese (BO), Italy
            <br />
            +39 051 9597611
          </p>
          <p className="mt-6 text-sm leading-5 text-lambo-secondary/80">
            Headquarters information reproduced as reference content for this independent design study.
          </p>
        </div>
      </section>

      <section data-node-id="8:48195" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
        <Eyebrow>How can we help?</Eyebrow>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((pathway) => (
            <PathwayCard key={pathway.title} {...pathway} />
          ))}
        </div>
      </section>

      <section id="enquiry" data-node-id="8:48201" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
        <Eyebrow>Your enquiry / Hybrid design extension</Eyebrow>
        <SectionHeading className="mt-4">Tell us what’s next.</SectionHeading>
        <p className="mt-6 text-lg leading-7 text-lambo-secondary">
          Select your topic and tell us how we can help. This design demonstrates the intended enquiry experience; it
          is not connected to customer care.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Field id="inquiry-category" label="Inquiry category" required hint="Sales, ownership, company or other enquiry.">
              <div className="relative">
                <select id="inquiry-category" required defaultValue="" className={`${controlClass} appearance-none pr-10`}>
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="sales">Sales</option>
                  <option value="ownership">Ownership</option>
                  <option value="company">Company</option>
                  <option value="other">Other enquiry</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
              </div>
            </Field>
            <Field id="model-of-interest" label="Model of interest" hint="Optional. Choose the model you wish to explore.">
              <div className="relative">
                <select id="model-of-interest" defaultValue="Temerario" className={`${controlClass} appearance-none pr-10`}>
                  <option value="Temerario">Temerario</option>
                  <option value="Revuelto">Revuelto</option>
                  <option value="Urus">Urus</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Field id="full-name" label="Full name" required hint="Tell us how you would like to be addressed.">
              <div className="relative">
                <input id="full-name" type="text" required placeholder="Your full name" className={`${controlClass} pr-10`} />
                <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
              </div>
            </Field>
            <Field id="email" label="Email address" required hint="We will use this address to respond to your enquiry.">
              <div className="relative">
                <input id="email" type="email" required placeholder="you@example.com" className={`${controlClass} pr-10`} />
                <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
              </div>
            </Field>
          </div>

          <Field id="country" label="Country / Region" required hint="This helps identify the appropriate contact.">
            <div className="relative">
              <select id="country" required defaultValue="" className={`${controlClass} appearance-none pr-10`}>
                <option value="" disabled>
                  Choose your country
                </option>
                <option value="Italy">Italy</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Switzerland">Switzerland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Monaco">Monaco</option>
                <option value="Vietnam">Vietnam</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" />
            </div>
          </Field>

          <Field id="message" label="Your message" required hint="Please do not include sensitive personal information.">
            <textarea
              id="message"
              required
              placeholder="Tell us what you would like to explore."
              className={`${controlClass} h-[180px] resize-none`}
            />
          </Field>

          <div className="flex flex-col gap-6">
            <div>
              <label className="flex items-start gap-3 text-base text-lambo-primary">
                <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-lambo-primary" />
                <span>I have read the privacy notice and consent to this enquiry. *</span>
              </label>
              <p className="mt-2 pl-8 text-xs text-lambo-primary/70">Required to continue in the proposed production experience.</p>
            </div>
            <div>
              <label className="flex items-start gap-3 text-base text-lambo-primary">
                <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-lambo-primary" />
                <span>Send me model news and experiences (optional).</span>
              </label>
              <p className="mt-2 pl-8 text-xs text-lambo-primary/70">You can update this preference at any time.</p>
            </div>
          </div>

          <div>
            <button type="submit" className={buttonClass} style={{ fontFamily: BODY_FONT }}>
              Send enquiry
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-xs text-lambo-hover">
              * Required fields. Illustrative form only: no enquiry is submitted and no personal information is
              collected.
            </p>
          </div>
        </form>
      </section>

      <section data-node-id="8:48218" className="bg-lambo-tertiary py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
          <SectionHeading>Explore a wider world.</SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cultureResources.map((resource) => (
              <PathwayCard key={resource.title} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <section data-node-id="8:48224" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
        <Eyebrow>Before you begin</Eyebrow>
        <SectionHeading className="mt-4">A few useful answers.</SectionHeading>
        <div className="mt-12 border border-lambo-pressed bg-lambo-tertiary">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div key={faq.question} className={index < faqs.length - 1 ? 'border-b border-lambo-pressed' : ''}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left"
                >
                  <span className="text-[22px] font-semibold leading-7 text-lambo-secondary" style={{ fontFamily: BODY_FONT }}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-lambo-primary" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-lambo-primary" />
                  )}
                </button>
                {isOpen && (
                  <p className="px-8 pb-6 text-base leading-6 text-lambo-secondary/80">{faq.answer}</p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
