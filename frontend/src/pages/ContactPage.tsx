import {
  ContactFAQSection,
  ContactHero,
  ContactIntroduction,
  ContactPathwaysSection,
  CultureResourcesSection,
  EnquiryFormSection,
  HeadquartersSection,
} from '../features/contact'

export default function ContactPage() {
  return (
    <div className="font-sans" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <ContactHero />
      <ContactIntroduction />
      <HeadquartersSection />
      <ContactPathwaysSection />
      <EnquiryFormSection />
      <CultureResourcesSection />
      <ContactFAQSection />
    </div>
  )
}
