import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BeyondTheLimitHeaderProps {
    title?: string
    description?: string
}

const carImages = [
    '/Images/revuelto-animated/000°.png',
    '/Images/revuelto-animated/045°.png',
    '/Images/revuelto-animated/090°.png',
    '/Images/revuelto-animated/135°.png',
    '/Images/revuelto-animated/180°.png',
    '/Images/revuelto-animated/225°.png',
    '/Images/revuelto-animated/270°.png',
    '/Images/revuelto-animated/315°.png',
]

export default function BeyondTheLimitHeader({
                                                 title = 'BEYOND THE LIMIT.',
                                                 description = 'Three families. Distinct characters. Discover a range where sculpted design, electrified performance and unmistakable emotion meet.',
                                             }: BeyondTheLimitHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const carContainerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        if (!carContainerRef.current || !titleRef.current || !subtitleRef.current) return

        const ctx = gsap.context(() => {
            // Initial state
            gsap.set(carContainerRef.current, {
                scale: 0.8,
                opacity: 0,
                x: 100
            })

            gsap.set([titleRef.current, subtitleRef.current], {
                opacity: 0,
                x: -50
            })

            // Create main timeline
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            })

            // Text appears first
            tl.to(titleRef.current, {
                opacity: 1,
                x: 0,
                duration: 1
            })

            tl.to(subtitleRef.current, {
                opacity: 1,
                x: 0,
                duration: 1
            }, '-=0.7')

            // Car entrance
            tl.to(carContainerRef.current, {
                scale: 1,
                opacity: 1,
                x: 0,
                duration: 1.5,
                ease: 'power4.out'
            }, '-=0.5')

            // Continuous subtle float
            gsap.to(carContainerRef.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2
            })

            // Parallax effect on scroll
            if (containerRef.current) {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    onUpdate: (self) => {
                        if (carContainerRef.current) {
                            gsap.to(carContainerRef.current, {
                                y: self.progress * 80,
                                duration: 0.1
                            })
                        }
                    }
                })
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // 360° rotation animation using image sequence - slower and smoother
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length)
        }, 2800) // Change image every 400ms for slower, smoother rotation

        return () => clearInterval(interval)
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative h-dvh px-6 lg:px-10 bg-lambo-bold-black overflow-hidden flex items-center pb-16"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-lambo-bold-black via-lambo-dark to-lambo-bold-black" />

            {/* Grid overlay for depth */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(216, 160, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216, 160, 22, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Animated Car Layer (Background) - Positioned absolute */}
            <div
                ref={carContainerRef}
                className="absolute right-1/12 top-1/2 -translate-y-1/2 w-[70%] lg:w-[55%] z-0"
            >
                <div className="relative w-full aspect-[4/3]">
                    {/* Glow effect behind car */}
                    <div className="absolute inset-0 bg-lambo-primary opacity-20 blur-3xl scale-75 animate-pulse" />

                    {/* Car image with rotation animation - 1.8x scale */}
                    <img
                        src={carImages[currentImageIndex]}
                        alt="Lamborghini Revuelto 360°"
                        className="relative z-10 w-full h-full object-contain transition-opacity duration-300 scale-[1.5] origin-center"
                        style={{
                            filter: 'drop-shadow(0 20px 60px rgba(216, 160, 22, 0.4))'
                        }}
                    />
                </div>
            </div>

            {/* Text Content Layer (Foreground) - Bottom-Left */}
            <div className="relative z-10 max-w-[1920px] mx-auto w-full">
                <div className="max-w-2xl">
                    <h1
                        ref={titleRef}
                        className="font-barlow font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase text-white tracking-tight leading-[0.95] mb-6"
                    >
                        {title}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-xl"
                    >
                        {description}
                    </p>
                </div>
            </div>
            {/* Scroll indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-20">
                <div className="w-6 h-10 border-2 border-lambo-primary/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-lambo-primary rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    )
}
