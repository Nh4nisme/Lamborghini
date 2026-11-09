import { Eyebrow, SectionHeading } from '../../../components/ui'

export function ContactIntroduction() {
  return (
    <section
      id="contact-introduction"
      data-node-id="8:48184"
      className="mx-auto max-w-[1440px] px-6 py-24 lg:px-[120px]"
    >
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
  )
}
