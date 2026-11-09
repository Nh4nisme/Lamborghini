import { Eyebrow, FAQAccordion, SectionHeading } from '../../../components/ui'
import { faqs } from '../data'

export function ContactFAQSection() {
  return (
    <section data-node-id="8:48224" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-[120px]">
      <Eyebrow>Before you begin</Eyebrow>
      <SectionHeading className="mt-4">A few useful answers.</SectionHeading>
      <FAQAccordion items={faqs} defaultOpenIndex={0} className="mt-12" />
    </section>
  )
}
