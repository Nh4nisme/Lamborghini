import { SectionHeader } from './SectionHeader'
import { TeamMemberCard } from './TeamMemberCard'
import { InfoBanner } from '../../../components/InfoBanner'

const coreContributors = [
  { number: '01', caption: 'Creative direction' },
  { number: '02', caption: 'Experience design', detail: 'Shapes the experience,\nflow and hierarchy.' },
  { number: '03', caption: 'Visual design', detail: 'Refines the interface\nand visual system.' },
]

const shoutoutMembers = ['04', '05', '06', '07', '08', '09']

export function TeamSection() {
  return (
    <section aria-label="Meet the team" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 pt-16">
      <SectionHeader
        eyebrow="01 / THE PEOPLE BEHIND THE PIXELS"
        title="MEET THE TEAM."
        badge="8THREADS / 09 MEMBERS"
      />

      <div className="mb-16">
        <div className="mb-10">
          <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-2 font-[Barlow,sans-serif]">
            CORE CONTRIBUTORS
          </div>
          <p className="text-[28px] leading-8 font-semibold uppercase text-lambo-secondary font-barlow">
            The three team members currently leading the active build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreContributors.map((member) => (
            <TeamMemberCard
              key={member.number}
              number={member.number}
              caption={member.caption}
              detail={member.detail}
              variant="core"
            />
          ))}
        </div>
      </div>

      <div className="mb-14">
        <div className="mb-10">
          <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-2 font-[Barlow,sans-serif]">
            SHOUTOUT / THE WHOLE CREW
          </div>
          <p className="text-[28px] leading-8 font-semibold uppercase text-lambo-secondary font-barlow">
            Nine members. One shared chapter. A shoutout to the rest of the crew.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {shoutoutMembers.map((number) => (
            <TeamMemberCard
              key={number}
              number={number}
              caption=""
              variant="shoutout"
            />
          ))}
        </div>
      </div>

      <InfoBanner
        primaryText="Illustrative portraits and sample roles. Member labels are placeholders for the final team."
        secondaryText="INDIVIDUAL CRAFT. SHARED AMBITION."
      />
    </section>
  )
}
