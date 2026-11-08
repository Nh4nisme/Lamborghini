interface InfoBannerProps {
  primaryText: string
  secondaryText: string
  className?: string
}

export function InfoBanner({ primaryText, secondaryText, className = '' }: InfoBannerProps) {
  return (
    <div className={`border border-lambo-pressed px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}>
      <p className="text-xs leading-4 text-lambo-hover font-[Barlow,sans-serif]">
        {primaryText}
      </p>
      <p className="text-xs font-semibold leading-4 tracking-[0.08em] text-lambo-primary uppercase font-[Barlow,sans-serif]">
        {secondaryText}
      </p>
    </div>
  )
}
