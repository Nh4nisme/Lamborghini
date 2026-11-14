import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    Share2,
    Calendar,
    Tag,
    Check,
    Send,
    Hexagon,
    Compass,
    Shield,
    Sparkles,
} from 'lucide-react'
import { LoadingScreen } from '../components/LoadingScreen'

/* -------------------------------------------------------------------------- */
/*  Data Structures & Catalog                                                 */
/* -------------------------------------------------------------------------- */

export interface NewsArticle {
    id: string
    slug: string
    category: 'MODELS' | 'MOTORSPORT' | 'HERITAGE' | 'CORPORATE' | 'DESIGN'
    date: string
    title: string
    subtitle: string
    excerpt: string
    heroImage: string
    cockpitImage?: string
    galleryImages?: string[]
    tags: string[]
    readTime?: string
    content: {
        introLead: string
        sections: {
            heading: string
            paragraphs: string[]
            image?: string
            caption?: string
        }[]
    }
}

const NEWS_ARTICLES: NewsArticle[] = [
    {
        id: '1',
        slug: 'temerario-tettonero-capsule',
        category: 'MODELS',
        date: '24 OCTOBER 2024',
        title: 'LAMBORGHINI TEMERARIO "TETTONERO" CAPSULE: BOLD BY CONTRAST',
        subtitle: 'A dual-soul design narrative where shadow and vivid color redefine supercar presence.',
        excerpt: 'Spazio Privato brings a new two-tone expression to Temerario, shaping sculpted lines with the tension of contrast.',
        heroImage: '/Images/model-detail/temerario/exterior.webp',
        cockpitImage: '/Images/model-detail/temerario/interior.webp',
        galleryImages: [
            '/Images/model-detail/temerario/exterior.webp',
            '/about-brand/design-stage.jpg',
            '/Images/model-detail/revuelto/exterior.webp',
        ],
        tags: ['TEMERARIO', 'DESIGN', 'AD PERSONAM'],
        readTime: '4 MIN READ',
        content: {
            introLead:
                'The Temerario "Tettonero" Capsule introduces a bold dialogue between color and shadow. Developed by Centro Stile, this exclusive two-tone interpretation gives the super sports car a distinct visual character. Reflecting the core soul of the V8 Twin-Turbo HPEV, the black roof accentuates sculpted proportions and the tension within its contours.',
            sections: [
                {
                    heading: 'FIVE COLORS. ONE CLEAR ATTITUDE.',
                    paragraphs: [
                        'The palette includes Giallo Inti, Arancio Xanto, Blu Eleos, Verde Scandal and Viola Pasifae. Each of these different expressions of the especially painted Nero Noctis roof creates a dramatic contrast with the black upper surfaces. The aerodynamic proportions of Temerario are shaped by a sharp, cohesive design vision.',
                        'Every line has been engineered not merely for striking aesthetics, but to optimize air channel flow directly into the twin turbochargers while generating optimal downforce across both axles.',
                    ],
                },
                {
                    heading: 'COLOR AND SHADOW BECOME TWO SIDES OF THE SAME CHARACTER.',
                    paragraphs: [
                        'Contrast is not simply a decorative treatment; it is a structural architectural philosophy. By visually lowering the profile of the cabin, the Tettonero treatment gives the vehicle a predator-like stance, poised for relentless forward motion even while at a complete standstill.',
                    ],
                },
                {
                    heading: 'CONTRAST, CARRIED INSIDE.',
                    paragraphs: [
                        'The cabin continues the dialogue through fine craftsmanship and tailoring. Dark Nero Ade leather is paired with Grigio Octans Alcantara, while tailored stitching mirrors the chosen exterior body hue. Contrast piping and bespoke embroidery complete the cockpit atmosphere.',
                    ],
                    image: '/Images/model-detail/temerario/interior.webp',
                    caption: 'HIGH-TECH COCKPIT WITH EXCLUSIVE BICOLOR FINISH',
                },
                {
                    heading: 'THE ENERGY WITHIN.',
                    paragraphs: [
                        'Beneath the new aesthetic exterior is Automobili Lamborghini’s high-performance electrified powertrain: a 4.0-liter twin-turbo V8 engine paired with three electric motors. Maximum combined output reaches 920 CV, with the engine designed to rev to an astounding 10,000 rpm.',
                        'This capsule adds a new design perspective to that emotional foundation. Temerario is an expression of identity shaping the road: a space for contrast, expression and deep connection between driver and bespoke machine.',
                    ],
                },
            ],
        },
    },
    {
        id: '2',
        slug: 'super-trofeo-stories-chloe-chambers',
        category: 'MOTORSPORT',
        date: '8 NOVEMBER 2024',
        title: 'SUPER TROFEO STORIES: CHLOE CHAMBERS AND IAN PORTER',
        subtitle: 'Two perspectives from the world of Super Trofeo racing.',
        excerpt: 'Two perspectives from the world of Super Trofeo. Precision, telemetry and the relentless pursuit of lap times.',
        heroImage: '/about-brand/closing-campaign.jpg',
        tags: ['MOTORSPORT', 'SUPER TROFEO', 'SQUADRA CORSE'],
        readTime: '3 MIN READ',
        content: {
            introLead:
                'On circuits worldwide, Lamborghini Super Trofeo pits identical Huracán Super Trofeo EVO2 machines in wheel-to-wheel combat. Drivers Chloe Chambers and Ian Porter reflect on what it takes to master aerodynamic balance and high-speed telemetry.',
            sections: [
                {
                    heading: 'PRECISION AT THE LIMIT.',
                    paragraphs: [
                        'Every millisecond counts. In Super Trofeo, victory is earned through relentless consistency and understanding how tire degradation impacts high-speed cornering stability.',
                    ],
                },
            ],
        },
    },
    {
        id: '3',
        slug: 'accademia-lamborghini-unveils-mach-iii',
        category: 'CORPORATE',
        date: '5 NOVEMBER 2024',
        title: 'ACCADEMIA LAMBORGHINI UNVEILS MACH III: FIRST COURSE BEHIND THE WHEEL OF A RACE CAR',
        subtitle: 'A new chapter in experiencing the language of the circuit.',
        excerpt: 'A new chapter in experiencing the language of the circuit. Professional coaching meets championship machinery.',
        heroImage: '/about-brand/innovation.jpg',
        tags: ['ACCADEMIA', 'EXPERIENCE', 'CORSA'],
        readTime: '5 MIN READ',
        content: {
            introLead:
                'Accademia Lamborghini announces Mach III, an intensive track program bridging amateur enthusiasm with professional GT3 motorsport telemetry and coaching.',
            sections: [
                {
                    heading: 'BORN ON THE PROVING GROUND.',
                    paragraphs: [
                        'Drivers master slip angles, brake threshold modulation, and dynamic weight transfer under the direct supervision of Lamborghini Squadra Corse champions.',
                    ],
                },
            ],
        },
    },
    {
        id: '4',
        slug: '1976-the-year-of-the-open',
        category: 'HERITAGE',
        date: '1 NOVEMBER 2024',
        title: '1976: THE YEAR OF THE OPEN',
        subtitle: 'Looking back at a moment of open-air possibility.',
        excerpt: 'Looking back at a moment of open-air possibility. How early open-top roadsters defined the brand ethos.',
        heroImage: '/about-brand/heritage.jpg',
        tags: ['HERITAGE', 'HISTORIC', 'MIURA'],
        readTime: '4 MIN READ',
        content: {
            introLead:
                'In 1976, open-air motoring at Sant’Agata Bolognese was redefined through experimental prototypes that bridged Grand Touring elegance with mid-engine architecture.',
            sections: [
                {
                    heading: 'FREEDOM IN FORM.',
                    paragraphs: [
                        'Without the constraint of a fixed roof, engineers rethought chassis torsional stiffness, creating lightweight tubular structures that inspired generations to come.',
                    ],
                },
            ],
        },
    },
    {
        id: '5',
        slug: 'monza-world-finals-celebration',
        category: 'MOTORSPORT',
        date: '20 OCTOBER 2024',
        title: 'LAMBORGHINI WORLD FINALS: MONZA CELEBRATES PAST AND FUTURE IN FRONT OF 35,000 SPECTATORS',
        subtitle: 'Past and future meet at Monza in the World Finals.',
        excerpt: 'Past and future meet at Monza in the World Finals, showcasing historic legends and the future of hybrid racing.',
        heroImage: '/about-brand/concept-story.jpg',
        tags: ['WORLD FINALS', 'MONZA', 'SQUADRA CORSE'],
        readTime: '4 MIN READ',
        content: {
            introLead:
                'The Autodromo Nazionale Monza echoed with the roar of naturally aspirated V10 and hybrid V8 powerplants as over 35,000 fans gathered for the climax of the racing season.',
            sections: [
                {
                    heading: 'THE TEMPLE OF SPEED.',
                    paragraphs: [
                        'Monza’s long straights and historic banking served as the ultimate backdrop for crowning the 2024 Super Trofeo world champions.',
                    ],
                },
            ],
        },
    },
    {
        id: '6',
        slug: 'lamborghini-400-gt-60-years-evolution',
        category: 'HERITAGE',
        date: '15 OCTOBER 2024',
        title: 'LAMBORGHINI 400 GT: 60 YEARS OF GRAND TOURING EVOLUTION',
        subtitle: 'Six decades of an enduring grand touring idea.',
        excerpt: 'Six decades of an enduring grand touring idea, from Ferruccio’s original aspiration to contemporary HPEVs.',
        heroImage: '/about-brand/hero-campaign.jpg',
        tags: ['HERITAGE', '400 GT', 'CLASSIC'],
        readTime: '6 MIN READ',
        content: {
            introLead:
                'Sixty years ago, the Lamborghini 400 GT solidified the marque as a premier builder of luxurious, high-speed 2+2 grand tourers powered by Bizzarrini’s legendary quad-cam V12.',
            sections: [
                {
                    heading: 'THE FOUNDATIONAL STATEMENT.',
                    paragraphs: [
                        'Smooth, quiet at cruising speeds yet devastatingly swift when opened up, the 400 GT laid down the foundational DNA that lives on in the Urus SE and Revuelto today.',
                    ],
                },
            ],
        },
    },
]

const STORY_CATEGORIES = [
    { title: 'MODELS', desc: 'Discover the latest expression of performance.', icon: Compass },
    { title: 'CORPORATE', desc: 'People, progress and company perspectives.', icon: Shield },
    { title: 'MOTORSPORT', desc: 'Stories from the circuit and championships.', icon: Hexagon },
    { title: 'BRAND EXTENSION', desc: 'A wider world of extraordinary ideas.', icon: Sparkles },
    { title: 'HERITAGE', desc: 'The milestones that continue to inspire.', icon: Calendar },
    { title: 'DESIGN', desc: 'The thinking behind automotive form.', icon: Tag },
]

/* -------------------------------------------------------------------------- */
/*  3D Tilt Article Card Component                                            */
/* -------------------------------------------------------------------------- */

interface ArticleTiltCardProps {
    article: NewsArticle
    onSelect: (article: NewsArticle) => void
}

const ArticleTiltCard: React.FC<ArticleTiltCardProps> = ({ article, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotX = ((y - centerY) / centerY) * -6
        const rotY = ((x - centerX) / centerX) * 6

        setRotateX(rotX)
        setRotateY(rotY)
    }

    return (
        <article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
                setRotateX(0)
                setRotateY(0)
            }}
            onClick={() => onSelect(article)}
            style={{ perspective: '1000px' }}
            className="group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-lambo-dark-light transition-all duration-300 hover:border-lambo-primary/50 hover:shadow-2xl hover:shadow-lambo-primary/10 cursor-pointer"
        >
            <div
                style={{
                    transform: isHovered
                        ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                }}
                className="flex flex-col h-full justify-between"
            >
                {/* Image Banner */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-lambo-bold-black">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lambo-dark-light via-transparent to-black/30" />
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
                    <div>
                        <div className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.18em] text-neutral-400 uppercase mb-2">
                            {article.date} · {article.category}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.04em] text-white group-hover:text-lambo-primary transition-colors line-clamp-2 leading-tight font-barlow">
                            {article.title}
                        </h3>

                        <p className="mt-2.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                        </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                            type="button"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lambo-primary group-hover:text-lambo-hover transition-colors cursor-pointer font-barlow"
                        >
                            <span>READ THE STORY</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <span className="text-[10px] font-mono text-neutral-500">
                            {article.readTime || '3 MIN'}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}

/* -------------------------------------------------------------------------- */
/*  Main News Page Component                                                  */
/* -------------------------------------------------------------------------- */

export default function NewsPage() {
    const { slug } = useParams<{ slug?: string }>()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'MODELS' | 'MOTORSPORT'>('ALL')
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [newsletterSuccess, setNewsletterSuccess] = useState(false)
    const [copiedShare, setCopiedShare] = useState(false)

    // Initial load: 600ms LoadingScreen
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    // Sync URL slug to selected article
    useEffect(() => {
        if (slug) {
            const found = NEWS_ARTICLES.find((a) => a.slug === slug)
            if (found) {
                setSelectedArticle(found)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } else {
            setSelectedArticle(null)
        }
    }, [slug])

    const handleSelectArticle = (article: NewsArticle) => {
        setIsLoading(true)
        setTimeout(() => {
            setSelectedArticle(article)
            setIsLoading(false)
            navigate(`/news/${article.slug}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 450)
    }

    const handleBackToNewsroom = () => {
        setIsLoading(true)
        setTimeout(() => {
            setSelectedArticle(null)
            setIsLoading(false)
            navigate('/news')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 450)
    }

    const handleFilterChange = (filter: 'ALL' | 'MODELS' | 'MOTORSPORT') => {
        setActiveFilter(filter)
    }

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (newsletterEmail.trim()) {
            setNewsletterSuccess(true)
            setTimeout(() => {
                setNewsletterSuccess(false)
                setNewsletterEmail('')
            }, 3000)
        }
    }

    const handleCopyShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopiedShare(true)
        setTimeout(() => setCopiedShare(false), 2000)
    }

    // Filter articles
    const filteredArticles = NEWS_ARTICLES.filter((article) => {
        if (activeFilter === 'ALL') return true
        return article.category === activeFilter
    })

    const heroArticle = NEWS_ARTICLES[0]

    if (isLoading) {
        return <LoadingScreen />
    }

    /* ---------------------------------------------------------------------- */
    /*  VIEW 1: ARTICLE DETAIL VIEW                                           */
    /* ---------------------------------------------------------------------- */
    if (selectedArticle) {
        const related = NEWS_ARTICLES.filter((a) => a.id !== selectedArticle.id).slice(0, 3)

        return (
            <div className="min-h-screen bg-lambo-bold-black text-[#e5e5e5] select-none font-sans">
                <main className="max-w-[1240px] mx-auto px-5 sm:px-8 py-8 md:py-12 animate-fade-in">
                    {/* Article Header */}
                    <div className="max-w-4xl mb-8">
                        <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-lambo-primary mb-3">
                            NEWS | {selectedArticle.date}
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[0.04em] text-white leading-[1.05] font-barlow">
                            {selectedArticle.title}
                        </h1>

                        {/* Tags & Action Buttons */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                {selectedArticle.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-neutral-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCopyShare}
                                    className="flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-lambo-primary hover:text-lambo-primary text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-barlow"
                                >
                                    {copiedShare ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            <span>COPIED LINK</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span>SHARE STORY</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBackToNewsroom}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer font-barlow"
                                >
                                    <span>OTHER TOPICS</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cinematic Hero Image */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-lambo-bold-black mb-4 border border-white/10">
                        <img
                            src={selectedArticle.heroImage}
                            alt={selectedArticle.title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-12 text-center md:text-left">
                        TEMERARIO TETTONERO CAPSULE: DESIGN STUDY WITH CONTRAST ROOF
                    </div>

                    {/* Article Content Layout */}
                    <div className="max-w-3xl mx-auto space-y-10">
                        {/* Intro Lead */}
                        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                            {selectedArticle.content.introLead}
                        </p>

                        {/* Iterated Sections */}
                        {selectedArticle.content.sections.map((sec, idx) => (
                            <div key={idx} className="space-y-4 pt-4">
                                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.06em] text-lambo-primary font-barlow">
                                    {sec.heading}
                                </h2>

                                {sec.paragraphs.map((para, pIdx) => (
                                    <p
                                        key={pIdx}
                                        className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light"
                                    >
                                        {para}
                                    </p>
                                ))}

                                {sec.image && (
                                    <div className="my-8 space-y-2">
                                        <div className="aspect-16/9 overflow-hidden border border-white/10 bg-lambo-bold-black">
                                            <img
                                                src={sec.image}
                                                alt={sec.caption || 'Cockpit detail'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {sec.caption && (
                                            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider text-center">
                                                {sec.caption}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Action CTA: Explore Model */}
                        <div className="pt-6 pb-10 border-t border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-wider text-white font-barlow">
                                    READY TO EXPERIENCE THE REVOLUTION?
                                </span>
                                <span className="block text-xs text-neutral-400 mt-1">
                                    Configure your dream vehicle in 3D or contact an authorized retailer.
                                </span>
                            </div>

                            <Link
                                to="/models/2"
                                className="px-6 py-3 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black text-xs font-black uppercase tracking-[0.16em] flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.98] font-barlow"
                            >
                                <span>EXPLORE / TEMERARIO</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* 3-Column Image Gallery */}
                        {selectedArticle.galleryImages && (
                            <div className="space-y-4 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {selectedArticle.galleryImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className="aspect-4/3 overflow-hidden border border-white/10 bg-lambo-bold-black"
                                        >
                                            <img
                                                src={img}
                                                alt={`Gallery ${i}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="button"
                                        onClick={handleCopyShare}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer font-barlow"
                                    >
                                        <span>SHARE THIS STORY</span>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Related Stories Section */}
                    <div className="mt-20 pt-10 border-t border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.06em] text-white font-barlow">
                                RELATED STORIES.
                            </h2>

                            <button
                                type="button"
                                onClick={handleBackToNewsroom}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lambo-primary hover:text-lambo-hover transition-colors cursor-pointer font-barlow"
                            >
                                <span>BACK TO NEWSROOM</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((item) => (
                                <ArticleTiltCard
                                    key={item.id}
                                    article={item}
                                    onSelect={handleSelectArticle}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    /* ---------------------------------------------------------------------- */
    /*  VIEW 2: NEWSROOM OVERVIEW VIEW                                        */
    /* ---------------------------------------------------------------------- */
    return (
        <div className="min-h-screen bg-lambo-bold-black text-[#e5e5e5] select-none font-sans">
            <main className="max-w-[1320px] mx-auto px-5 sm:px-8 py-10 md:py-14 animate-fade-in">
                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-lambo-primary block mb-2 font-barlow">
                        NEWSROOM
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[0.04em] text-lambo-primary leading-none font-barlow">
                        STORIES FROM BEYOND.
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-2xl font-light leading-relaxed">
                        The latest from the world of models, design, heritage and motorsport. Discover the ideas and people moving the story forward.
                    </p>
                </div>

                {/* 2. Featured Hero Story Card */}
                <div
                    onClick={() => handleSelectArticle(heroArticle)}
                    className="group relative w-full aspect-21/9 min-h-[360px] md:min-h-[460px] overflow-hidden border border-white/15 bg-lambo-bold-black mb-16 cursor-pointer"
                >
                    <img
                        src={heroArticle.heroImage}
                        alt={heroArticle.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Floating Info on Hero */}
                    <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end max-w-2xl">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-lambo-primary mb-2">
                            FEATURED STORY · {heroArticle.category}
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.04em] text-white leading-tight mb-4 group-hover:text-lambo-hover transition-colors font-barlow">
                            {heroArticle.title}
                        </h2>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                className="px-6 py-3 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black text-xs font-black uppercase tracking-[0.16em] flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.98] font-barlow"
                            >
                                <span>READ THE FULL ARTICLE</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                                01 / 03 · SCROLL TO EXPLORE
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. IN FOCUS Section (Filter Tabs & 6-Article Grid) */}
                <section className="mb-20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-white/10 mb-8">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                                LATEST NEWS / EDITORIAL FEED
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[0.06em] text-white font-barlow">
                                IN FOCUS.
                            </h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 bg-lambo-dark-light p-1 border border-white/10">
                            {(['ALL', 'MODELS', 'MOTORSPORT'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => handleFilterChange(tab)}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-barlow ${
                                        activeFilter === tab
                                            ? 'bg-lambo-primary text-lambo-bold-black active:bg-lambo-pressed'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    {tab === 'ALL' ? 'ALL NEWS' : tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 6-Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredArticles.map((article) => (
                            <ArticleTiltCard
                                key={article.id}
                                article={article}
                                onSelect={handleSelectArticle}
                            />
                        ))}
                    </div>

                    {/* Pagination Bar */}
                    <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                        <button
                            type="button"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lambo-primary hover:text-lambo-hover transition-colors cursor-pointer font-barlow"
                        >
                            <span>DISCOVER MORE</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1 font-mono text-xs">
                            <span className="px-3 py-1.5 bg-lambo-primary text-lambo-bold-black font-bold">1</span>
                            <span className="px-3 py-1.5 text-neutral-400 hover:text-white cursor-pointer">2</span>
                            <span className="px-3 py-1.5 text-neutral-400 hover:text-white cursor-pointer">3</span>
                            <span className="px-2 py-1.5 text-neutral-500">&gt;</span>
                        </div>
                    </div>
                </section>

                {/* 4. EVERY SIDE OF THE STORY (6 Categories) */}
                <section className="mb-20">
                    <div className="mb-8 pb-3 border-b border-lambo-primary/30">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                            EXPLORE FROM EVERY ANGLE
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.06em] text-white font-barlow">
                            EVERY SIDE OF THE STORY.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {STORY_CATEGORIES.map((cat) => {
                            const IconComponent = cat.icon
                            return (
                                <div
                                    key={cat.title}
                                    className="group p-6 bg-lambo-dark-light border border-white/10 hover:border-lambo-primary/40 transition-all flex flex-col justify-between min-h-[170px]"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <IconComponent className="w-5 h-5 text-lambo-primary group-hover:scale-110 transition-transform" />
                                            <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-lambo-primary transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-lambo-hover transition-colors font-barlow">
                                            {cat.title}
                                        </h3>
                                        <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveFilter('ALL')
                                            window.scrollTo({ top: 600, behavior: 'smooth' })
                                        }}
                                        className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 group-hover:text-lambo-hover transition-colors flex items-center gap-1 text-left cursor-pointer font-barlow"
                                    >
                                        <span>EXPLORE CATEGORY</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* 5. NEWSLETTER Section */}
                <section className="p-8 sm:p-12 bg-lambo-dark-light border border-white/15">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lambo-primary block mb-2">
                            NEWSLETTER
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[0.06em] text-white mb-2 font-barlow">
                            THE NEXT CHAPTER. STRAIGHT TO YOU.
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-light">
                            Stay close to the latest model news, design stories and experiences. Curated in the newsletter below.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 h-12 bg-lambo-bold-black border border-neutral-700 px-4 text-xs font-medium text-white placeholder-neutral-500 focus:outline-none focus:border-lambo-primary transition-colors"
                            />
                            <button
                                type="submit"
                                className="h-12 px-8 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black text-xs font-black uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 active:scale-[0.98] font-barlow"
                            >
                                {newsletterSuccess ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>SUBSCRIBED</span>
                                    </>
                                ) : (
                                    <>
                                        <span>SUBSCRIBE</span>
                                        <Send className="w-3.5 h-3.5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}
