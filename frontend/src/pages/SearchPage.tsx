import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search,
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    RotateCcw,
    SlidersHorizontal,
    Sparkles,
    Check,
    Car,
} from 'lucide-react'
import { LoadingScreen } from '../components/LoadingScreen'

/* -------------------------------------------------------------------------- */
/*  Types & Data Structures                                                   */
/* -------------------------------------------------------------------------- */

interface CarSearchResult {
    id: number
    slug: string
    name: string
    tag: string
    description: string
    powerCV: string
    acceleration: string
    topSpeed: string
    priceUSD: number
    engineType: 'V12 PHEV' | 'V8 PHEV' | 'V10 NA'
    category: 'Supercar' | 'Super SUV'
    image: string
    modelDetailId: number
}

const CAR_CATALOG: CarSearchResult[] = [
    {
        id: 1,
        slug: 'revuelto',
        name: 'REVUELTO',
        tag: 'V12 / PLUG-IN HYBRID',
        description: 'The first HPEV. A new paradigm in performance and driving emotion.',
        powerCV: '1015',
        acceleration: '2.5 s',
        topSpeed: '>350',
        priceUSD: 608000,
        engineType: 'V12 PHEV',
        category: 'Supercar',
        image: '/Images/model-detail/revuelto/exterior.webp',
        modelDetailId: 1,
    },
    {
        id: 2,
        slug: 'urus-se',
        name: 'URUS SE',
        tag: 'V8 / PLUG-IN HYBRID',
        description: 'A super SUV that balances everyday usability with uncompromising performance.',
        powerCV: '800',
        acceleration: '3.4 s',
        topSpeed: '312',
        priceUSD: 258000,
        engineType: 'V8 PHEV',
        category: 'Super SUV',
        image: '/Images/model-detail/urus/exterior.jpg',
        modelDetailId: 3,
    },
    {
        id: 3,
        slug: 'temerario',
        name: 'TEMERARIO',
        tag: 'V8 / TWIN-TURBO HPEV',
        description: 'Authentic feel, unmatched V8 twin-turbo performance reaching 10,000 rpm.',
        powerCV: '920',
        acceleration: '2.7 s',
        topSpeed: '343',
        priceUSD: 357000,
        engineType: 'V8 PHEV',
        category: 'Supercar',
        image: '/Images/model-detail/temerario/exterior.webp',
        modelDetailId: 2,
    },
    {
        id: 4,
        slug: 'huracan-tecnica',
        name: 'HURACÁN TECNICA',
        tag: 'V10 / NATURALLY ASPIRATED',
        description: 'Flawless bridge between past legacy and the future of pure atmospheric performance.',
        powerCV: '640',
        acceleration: '3.2 s',
        topSpeed: '325',
        priceUSD: 249000,
        engineType: 'V10 NA',
        category: 'Supercar',
        image: '/Images/model-detail/huracan/exterior.webp',
        modelDetailId: 1,
    },
]

const EXPLORE_CATEGORIES = [
    {
        title: 'MODELS',
        links: [
            { label: 'Temerario', value: 'Temerario' },
            { label: 'Revuelto', value: 'Revuelto' },
            { label: 'Urus SE', value: 'Urus SE' },
            { label: 'Urus S', value: 'Urus' },
            { label: 'Huracán Tecnica', value: 'Huracán' },
        ],
    },
    {
        title: 'OWNERSHIP',
        links: [
            { label: 'Connectivity', value: 'Connectivity' },
            { label: 'Customer app', value: 'Customer app' },
            { label: 'Mobility program', value: 'Mobility program' },
            { label: 'Service & Maintenance', value: 'Service' },
            { label: 'Recall campaign', value: 'Recall' },
        ],
    },
    {
        title: 'CUSTOM SOLUTIONS',
        links: [
            { label: 'Customization (Ad Personam)', value: 'Customization' },
            { label: 'Accessories', value: 'Accessories' },
            { label: 'Financial services', value: 'Financial' },
        ],
    },
]

/* -------------------------------------------------------------------------- */
/*  3D Tilt Car Card Component                                                */
/* -------------------------------------------------------------------------- */

interface TiltCardProps {
    car: CarSearchResult
    onConfigure: (id: number) => void
    onRequestQuote: (car: CarSearchResult) => void
}

const TiltCard: React.FC<TiltCardProps> = ({ car, onConfigure, onRequestQuote }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Rotate angles: max ±8 degrees
        const rotX = ((y - centerY) / centerY) * -8
        const rotY = ((x - centerX) / centerX) * 8

        setRotateX(rotX)
        setRotateY(rotY)
        setGlarePosition({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
        })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-white/10 bg-[#0e0f13] transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/10"
        >
            <div
                style={{
                    transform: isHovered
                        ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                }}
                className="flex flex-col h-full justify-between"
            >
                {/* 1. Header Image Banner */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-950">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-transparent to-black/30" />

                    {/* Specular Glare Effect on Hover */}
                    {isHovered && (
                        <div
                            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                            }}
                        />
                    )}

                    {/* Top Right Price Tag */}
                    <div className="absolute top-3 right-3 rounded-xs bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-amber-400 border border-white/10">
                        ${car.priceUSD.toLocaleString()} USD
                    </div>
                </div>

                {/* 2. Body Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                        <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-400 font-mono">
                            {car.tag}
                        </span>

                        <h3 className="mt-1 text-3xl md:text-4xl font-black uppercase tracking-[0.06em] text-white font-barlow">
                            {car.name}
                        </h3>

                        <p className="mt-2 text-xs md:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                            {car.description}
                        </p>
                    </div>

                    {/* 3. Specs Tri-Column */}
                    <div className="my-6 border-y border-white/10 py-4 grid grid-cols-3 gap-2 text-center">
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black tracking-tight text-white font-barlow">
                                {car.powerCV}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                                CV / MAX. POWER
                            </span>
                        </div>

                        <div className="flex flex-col border-x border-white/10">
                            <span className="text-xl md:text-2xl font-black tracking-tight text-white font-barlow">
                                {car.acceleration}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                                0-100 KM/H
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black tracking-tight text-white font-barlow">
                                {car.topSpeed}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mt-0.5">
                                KM/H / TOP SPEED
                            </span>
                        </div>
                    </div>

                    <p className="text-[10px] text-neutral-500 italic mb-4">
                        Illustrative availability | consult your local retailer.
                    </p>

                    {/* 4. Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => onConfigure(car.modelDetailId)}
                            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xs border border-white/20 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white hover:border-amber-400 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>CONFIG 3D</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onRequestQuote(car)}
                            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xs bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                        >
                            <span>REQUEST QUOTE</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*  Main Search Page                                                          */
/* -------------------------------------------------------------------------- */

export default function SearchPage() {
    const navigate = useNavigate()

    // Loading Screen state (for initial load and reset actions)
    const [isLoading, setIsLoading] = useState(true)

    // Search and Filter states
    const [keyword, setKeyword] = useState('')
    const [selectedModelFilter, setSelectedModelFilter] = useState('ALL')
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)

    // Price range filter
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([200000, 800000])

    // More filters
    const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false)
    const [selectedEngine, setSelectedEngine] = useState<string>('ALL')

    // Initial load timer: 650ms showing LoadingScreen
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 650)
        return () => clearTimeout(timer)
    }, [])

    // Filter computation
    const filteredResults = CAR_CATALOG.filter((car) => {
        // Keyword search
        if (keyword.trim()) {
            const query = keyword.toLowerCase().trim()
            const matchesName = car.name.toLowerCase().includes(query)
            const matchesTag = car.tag.toLowerCase().includes(query)
            const matchesDesc = car.description.toLowerCase().includes(query)
            const matchesCategory = car.category.toLowerCase().includes(query)
            if (!matchesName && !matchesTag && !matchesDesc && !matchesCategory) return false
        }

        // Model filter
        if (selectedModelFilter !== 'ALL') {
            if (!car.name.toLowerCase().includes(selectedModelFilter.toLowerCase())) return false
        }

        // Price range filter
        if (car.priceUSD < priceRange[0] || car.priceUSD > priceRange[1]) {
            return false
        }

        // Engine filter
        if (selectedEngine !== 'ALL' && car.engineType !== selectedEngine) {
            return false
        }

        return true
    })

    // Whether search/filter mode is active
    const hasActiveSearch =
        keyword.trim().length > 0 ||
        selectedModelFilter !== 'ALL' ||
        selectedEngine !== 'ALL' ||
        priceRange[0] > 200000 ||
        priceRange[1] < 800000

    // Reset Handler: Trigger LoadingScreen for 600ms, then reset all filters
    const handleResetAll = () => {
        setIsLoading(true)
        setTimeout(() => {
            setKeyword('')
            setSelectedModelFilter('ALL')
            setPriceRange([200000, 800000])
            setSelectedEngine('ALL')
            setIsModelDropdownOpen(false)
            setIsPriceDropdownOpen(false)
            setIsMoreFiltersOpen(false)
            setIsLoading(false)
        }, 550)
    }

    const handleCategoryClick = (val: string) => {
        setKeyword(val)
        window.scrollTo({ top: 320, behavior: 'smooth' })
    }

    const handleConfigure = (modelId: number) => {
        navigate(`/configurator/${modelId}`)
    }

    const handleRequestQuote = (car: CarSearchResult) => {
        navigate(`/showroom?inquiry=${encodeURIComponent(car.name)}`)
    }

    // If loading screen is active
    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-screen bg-[#070707] text-[#e5e5e5] select-none">
            {/* Main Center Container */}
            <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
                {/* 1. Header Hero Title */}
                <header className="mb-10">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.05em] text-[#d4af37] leading-[1.05]"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        WHAT ARE YOU LOOKING FOR?
                    </h1>
                    <p className="mt-3 text-sm md:text-base text-neutral-400 font-light tracking-wide">
                        Explore models, ownership and the world of Lamborghini.
                    </p>
                </header>

                {/* 2. Main Search Input Box */}
                <div className="relative mb-6">
                    <label
                        htmlFor="site-search-input"
                        className="block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Search on the website
                    </label>

                    <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
                        <div className="relative flex-1">
                            <input
                                id="site-search-input"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search by keyword"
                                className="w-full h-12 md:h-14 bg-[#111215] border border-neutral-800 text-white placeholder-neutral-500 px-5 pr-12 text-sm font-medium tracking-wide focus:border-amber-400 focus:outline-none transition-colors"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                <Search className="w-5 h-5" />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                // Trigger search focus
                            }}
                            className="h-12 md:h-14 px-8 md:px-10 bg-amber-400 hover:bg-amber-300 text-black text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shrink-0 active:scale-[0.98]"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            <span>SEARCH</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="mt-2 text-[11px] text-neutral-500 tracking-wide">
                        Enter a model, service or topic to begin.
                    </p>
                </div>

                {/* 3. Filter Boxes Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-12">
                    {/* Box 1: Choose a Model */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModelDropdownOpen(!isModelDropdownOpen)
                                setIsPriceDropdownOpen(false)
                                setIsMoreFiltersOpen(false)
                            }}
                            className="w-full text-left p-4 md:p-5 bg-[#111215] border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
                        >
                            <div>
                                <span className="block text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                                    {selectedModelFilter === 'ALL'
                                        ? 'Choose a model'
                                        : `Model: ${selectedModelFilter}`}
                                </span>
                                <span className="block text-[11px] text-neutral-500 mt-1">
                                    Select a model family to narrow your results.
                                </span>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-neutral-400 transition-transform ${
                                    isModelDropdownOpen ? 'rotate-180 text-amber-400' : ''
                                }`}
                            />
                        </button>

                        {/* Model Dropdown Menu */}
                        {isModelDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#16171c] border border-neutral-700 shadow-2xl p-2 animate-fade-in">
                                {['ALL', 'Revuelto', 'Urus', 'Temerario', 'Huracán'].map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => {
                                            setSelectedModelFilter(m)
                                            setIsModelDropdownOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                                            selectedModelFilter === m
                                                ? 'bg-amber-400 text-black'
                                                : 'text-neutral-300 hover:bg-white/5'
                                        }`}
                                    >
                                        <span>{m === 'ALL' ? 'All Models' : m}</span>
                                        {selectedModelFilter === m && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Box 2: Price Range */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setIsPriceDropdownOpen(!isPriceDropdownOpen)
                                setIsModelDropdownOpen(false)
                                setIsMoreFiltersOpen(false)
                            }}
                            className="w-full text-left p-4 md:p-5 bg-[#111215] border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
                        >
                            <div>
                                <span className="block text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                                    PRICE RANGE
                                </span>
                                <span className="block text-[11px] text-amber-400 font-mono mt-1">
                                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} USD
                                </span>
                            </div>
                            {isPriceDropdownOpen ? (
                                <ChevronUp className="w-4 h-4 text-amber-400" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-neutral-400" />
                            )}
                        </button>

                        {/* Price Range Slider Popup */}
                        {isPriceDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#16171c] border border-neutral-700 shadow-2xl p-4 animate-fade-in space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                                    <span>Min: ${priceRange[0].toLocaleString()}</span>
                                    <span>Max: ${priceRange[1].toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min={200000}
                                    max={800000}
                                    step={25000}
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([priceRange[0], Number(e.target.value)])
                                    }
                                    className="w-full accent-amber-400 cursor-pointer"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPriceRange([200000, 800000])
                                            setIsPriceDropdownOpen(false)
                                        }}
                                        className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white px-2 py-1"
                                    >
                                        Reset Price
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsPriceDropdownOpen(false)}
                                        className="text-[10px] uppercase font-bold bg-amber-400 text-black px-3 py-1 rounded-xs"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Box 3: More Filters */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setIsMoreFiltersOpen(!isMoreFiltersOpen)
                                setIsModelDropdownOpen(false)
                                setIsPriceDropdownOpen(false)
                            }}
                            className="w-full text-left p-4 md:p-5 bg-[#111215] border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
                        >
                            <div>
                                <span className="block text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                                    MORE FILTERS
                                </span>
                                <span className="block text-[11px] text-neutral-500 mt-1">
                                    {selectedEngine === 'ALL'
                                        ? 'Engine powertrain & aerodynamics'
                                        : `Engine: ${selectedEngine}`}
                                </span>
                            </div>
                            <SlidersHorizontal
                                className={`w-4 h-4 text-neutral-400 transition-colors ${
                                    isMoreFiltersOpen ? 'text-amber-400' : ''
                                }`}
                            />
                        </button>

                        {/* More Filters Dropdown */}
                        {isMoreFiltersOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#16171c] border border-neutral-700 shadow-2xl p-4 animate-fade-in space-y-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                                    POWERTRAIN TYPE
                                </span>
                                <div className="grid grid-cols-2 gap-1.5">
                                    {['ALL', 'V12 PHEV', 'V8 PHEV', 'V10 NA'].map((eng) => (
                                        <button
                                            key={eng}
                                            type="button"
                                            onClick={() => {
                                                setSelectedEngine(eng)
                                                setIsMoreFiltersOpen(false)
                                            }}
                                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer text-left ${
                                                selectedEngine === eng
                                                    ? 'bg-amber-400 text-black font-bold'
                                                    : 'text-neutral-300 hover:bg-white/5'
                                            }`}
                                        >
                                            {eng}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reset All Filters Indicator */}
                {hasActiveSearch && (
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 animate-fade-in">
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span>Filters active ({filteredResults.length} models matched)</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleResetAll}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-xs transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>RESET ALL FILTERS</span>
                        </button>
                    </div>
                )}

                {/* 4. Results Section: If filteredResults > 0 or has active search */}
                {hasActiveSearch ? (
                    <section className="mb-16 animate-fade-in">
                        <div className="mb-8">
                            <h2
                                className="text-3xl md:text-4xl font-black uppercase tracking-[0.06em] text-white"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                SEARCH RESULTS
                            </h2>
                            <p className="mt-2 text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                                Results are illustrative and reflect the current search scope. Final availability, pricing and specifications should be confirmed with your local retailer.
                            </p>
                        </div>

                        {filteredResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {filteredResults.map((car) => (
                                    <TiltCard
                                        key={car.id}
                                        car={car}
                                        onConfigure={handleConfigure}
                                        onRequestQuote={handleRequestQuote}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center rounded-xs border border-white/10 bg-[#101115]">
                                <Car className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                                <h3 className="text-lg font-bold uppercase text-white mb-1">
                                    No models found
                                </h3>
                                <p className="text-xs text-neutral-400 mb-6">
                                    Try adjusting your keyword or resetting your filter criteria.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResetAll}
                                    className="px-6 py-2.5 bg-amber-400 text-black font-extrabold uppercase text-xs tracking-wider cursor-pointer"
                                >
                                    RESET SEARCH
                                </button>
                            </div>
                        )}
                    </section>
                ) : (
                    /* 5. Default State: Explore By Category */
                    <section className="mb-16 animate-fade-in">
                        <div className="mb-8 pb-3 border-b border-amber-400/40">
                            <span
                                className="text-xs font-bold uppercase tracking-[0.24em] text-amber-400 block mb-1"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                MAIN TOPICS
                            </span>
                            <h2
                                className="text-2xl md:text-3xl font-black uppercase tracking-[0.08em] text-white"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                EXPLORE BY CATEGORY
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {EXPLORE_CATEGORIES.map((cat) => (
                                <div key={cat.title} className="flex flex-col">
                                    <h3
                                        className="text-base font-extrabold uppercase tracking-[0.16em] text-neutral-300 pb-3 border-b border-white/10 mb-4"
                                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                    >
                                        {cat.title}
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {cat.links.map((link) => (
                                            <li key={link.label}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCategoryClick(link.value)}
                                                    className="group w-full flex items-center justify-between text-left text-xs md:text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors py-1 cursor-pointer"
                                                >
                                                    <span className="tracking-wide">{link.label}</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
