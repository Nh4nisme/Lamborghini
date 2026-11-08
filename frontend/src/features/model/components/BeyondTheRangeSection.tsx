import { ArrowRight } from 'lucide-react'

interface BeyondCard {
    icon: string
    title: string
    description: string
    buttonText: string
    link: string
}

const CARDS: BeyondCard[] = [
    {
        icon: '🎨',
        title: 'MASTERPIECES',
        description: 'Every Lamborghini tells a story that shaped a history of going beyond.',
        buttonText: 'Explore history',
        link: '#history',
    },
    {
        icon: '✨',
        title: 'AD PERSONAM',
        description: 'Tailor your next chapter truly yours.',
        buttonText: 'Personalization',
        link: '#personalization',
    },
    {
        icon: '🏢',
        title: 'COMPANY',
        description: 'The people and principles that stand behind the extraordinary.',
        buttonText: 'About the brand',
        link: '#about',
    },
]

interface BeyondTheRangeSectionProps {
    cards?: BeyondCard[]
    eyebrow?: string
    title?: string
}

export default function BeyondTheRangeSection({
    cards = CARDS,
    eyebrow = 'THE STORY CONTINUES',
    title = 'BEYOND THE RANGE.',
}: BeyondTheRangeSectionProps) {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-10 bg-lambo-bold-black">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-16 animate-fadeInUp">
                    <p className="text-sm text-lambo-primary uppercase tracking-wider font-barlow font-semibold mb-4">
                        {eyebrow}
                    </p>
                    <h2 className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl uppercase text-white tracking-tight">
                        {title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={card.title}
                            className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-lambo-primary/50 p-8 transition-all duration-500 group animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="text-4xl mb-6">{card.icon}</div>
                            <h3 className="font-barlow font-bold text-xl uppercase text-white mb-4 tracking-wide">
                                {card.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {card.description}
                            </p>
                            <a
                                href={card.link}
                                className="inline-flex items-center gap-2 text-lambo-primary hover:text-lambo-hover uppercase text-xs font-barlow font-bold tracking-wider transition-colors"
                            >
                                <span>{card.buttonText}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}