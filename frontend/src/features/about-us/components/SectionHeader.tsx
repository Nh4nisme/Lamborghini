interface SectionHeaderProps {
  eyebrow: string
  title: string
  badge?: string
}

export function SectionHeader({ eyebrow, title, badge }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
      <div>
        <div className="text-xs font-semibold tracking-[0.08em] text-lambo-primary uppercase mb-2 font-[Barlow,sans-serif]">
          {eyebrow}
        </div>
        <h2 className="text-5xl font-bold uppercase leading-[52px] text-lambo-secondary font-barlow">
          {title}
        </h2>
      </div>
      {badge && (
        <div className="text-xs font-semibold tracking-[0.08em] text-lambo-hover uppercase font-[Barlow,sans-serif]">
          {badge}
        </div>
      )}
    </div>
  )
}
