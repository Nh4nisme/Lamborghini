import { HeroSection, TeamSection } from '../features/about-us'

export default function AboutUsPage() {
  return (
    <>
      <HeroSection
        eyebrow="ABOUT US / THE WEB DEVELOPMENT TEAM"
        subtitle="We are 8Threads, the team behind this web experience. We bring design, code and a shared attention to detail into one connected vision."
        disclaimer="An independent website design study, inspired by the world of Lamborghini."
        backgroundImage="/Images/about-us/design-atelier.png"
      />

      <TeamSection />
    </>
  )
}
