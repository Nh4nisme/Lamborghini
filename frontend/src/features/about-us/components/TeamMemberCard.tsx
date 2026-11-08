interface TeamMemberCardProps {
  number: string
  caption: string
  detail?: string
  variant: 'core' | 'shoutout'
}

export function TeamMemberCard({ number, caption, detail, variant }: TeamMemberCardProps) {
  if (variant === 'shoutout') {
    return (
      <article className="bg-lambo-tertiary flex flex-col min-h-[276px]">
        <div className="h-48" aria-hidden="true" />
        <div className="px-3.5 pt-3.5 pb-4">
          <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-6 font-[Barlow,sans-serif]">
            TEAM / {number}
          </div>
          <h3 className="text-[22px] leading-8 font-semibold uppercase text-lambo-secondary font-barlow">
            MEMBER {number}
          </h3>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-lambo-tertiary flex flex-col min-h-[672px]">
      <div className="h-[440px]" aria-hidden="true" />
      <div className="flex-1 border-t border-lambo-pressed px-6 pt-6 pb-8">
        <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-[14px] font-[Barlow,sans-serif]">
          {number} / CORE CONTRIBUTOR
        </div>
        <h3 className="text-[32px] leading-8 font-semibold uppercase text-lambo-secondary font-barlow">
          MEMBER {number}
        </h3>
        <p className="mt-6 text-sm leading-5 text-lambo-hover font-[Barlow,sans-serif]">
          {caption}
        </p>
        {detail && (
          <p className="mt-8 text-sm leading-5 text-lambo-hover whitespace-pre-line font-[Barlow,sans-serif]">
            {detail}
          </p>
        )}
      </div>
    </article>
  )
}
