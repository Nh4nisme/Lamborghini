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
    AlertCircle,
} from 'lucide-react'
import { LoadingScreen } from '../components/feedback'
import { http } from '../api/http'

/* -------------------------------------------------------------------------- */
/*  Types & Data Structures                                                   */
/* -------------------------------------------------------------------------- */

interface DongXe {
    maDongXe: number
    tenDongXe: string
    danhMuc: string
    moTa: string
    trangThai: string
    noiBat: boolean
    hinhAnh: string
}

interface Xe {
    maXe: number
    tenPhienBan: string
    giaKhoiDiem: number
    dongCo: string
    congSuat: number
    tocDoToiDa: number
    hinhAnh: string
    moTa: string
    trangThai: string
    giaToc: number
}

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

function mapXeToCarSearchResult(xe: Xe): CarSearchResult {
    const dongCoLower = xe.dongCo?.toLowerCase() || ''
    let engineType: 'V12 PHEV' | 'V8 PHEV' | 'V10 NA' = 'V10 NA'
    if (dongCoLower.includes('v12')) engineType = 'V12 PHEV'
    else if (dongCoLower.includes('v8')) engineType = 'V8 PHEV'

    return {
        id: xe.maXe,
        slug: xe.tenPhienBan.toLowerCase().replace(/\s+/g, '-'),
        name: xe.tenPhienBan,
        tag: xe.dongCo || 'N/A',
        description: xe.moTa || '',
        powerCV: xe.congSuat?.toString() || '0',
        acceleration: xe.giaToc ? `${(xe.giaToc / 10).toFixed(1)} s` : 'N/A',
        topSpeed: xe.tocDoToiDa?.toString() || '0',
        priceUSD: xe.giaKhoiDiem || 0,
        engineType,
        category: 'Supercar',
        image: xe.hinhAnh || '/placeholder.jpg',
        modelDetailId: xe.maXe,
    }
}

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
            className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-white/10 bg-[#0e0f13] transition-all duration-300 hover:border-lambo-primary/50 hover:shadow-2xl hover:shadow-lambo-primary/10"
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
                    <div className="absolute top-3 right-3 rounded-xs bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold text-lambo-primary border border-white/10">
                        ${car.priceUSD.toLocaleString()} USD
                    </div>
                </div>

                {/* 2. Body Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                        <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] text-lambo-primary font-mono">
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
                            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xs border border-white/20 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white hover:border-lambo-primary hover:text-lambo-primary transition-colors cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>CONFIG 3D</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onRequestQuote(car)}
                            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xs bg-lambo-primary hover:bg-lambo-hover text-black text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-lg active:scale-[0.98]"
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

    // Data states
    const [seriesList, setSeriesList] = useState<DongXe[]>([])
    const [searchResults, setSearchResults] = useState<CarSearchResult[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState<string | null>(null)

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

    // Initial load: fetch series list
    useEffect(() => {
        const fetchSeries = async () => {
            setIsLoading(true)
            try {
                const data = await http<DongXe[]>('/model/getAllDongXe')
                setSeriesList(data)
            } catch (error) {
                console.error('Failed to fetch series:', error)
                setSearchError('Không thể tải danh sách dòng xe')
            } finally {
                setIsLoading(false)
            }
        }
        fetchSeries()
    }, [])

    // Trigger search when filters change
    useEffect(() => {
        if (!isLoading && hasActiveSearch) {
            performSearch()
        }
    }, [selectedModelFilter, priceRange, selectedEngine, keyword])

    const performSearch = async () => {
        setIsSearching(true)
        setSearchError(null)
        
        try {
            let allResults: CarSearchResult[] = []

            if (selectedModelFilter === 'ALL') {
                const promises = seriesList.map(async (series) => {
                    try {
                        const data = await http<Xe[]>(
                            `/home/search?maDongXe=${series.maDongXe}` +
                            (keyword ? `&keyword=${encodeURIComponent(keyword)}` : '') +
                            (priceRange[0] > 200000 ? `&minPrice=${priceRange[0]}` : '') +
                            (priceRange[1] < 800000 ? `&maxPrice=${priceRange[1]}` : '')
                        )
                        return data.map(mapXeToCarSearchResult)
                    } catch {
                        return []
                    }
                })
                const results = await Promise.all(promises)
                allResults = results.flat()
            } else {
                const selectedSeries = seriesList.find(
                    (s) => s.tenDongXe.toLowerCase() === selectedModelFilter.toLowerCase()
                )
                if (selectedSeries) {
                    const data = await http<Xe[]>(
                        `/home/search?maDongXe=${selectedSeries.maDongXe}` +
                        (keyword ? `&keyword=${encodeURIComponent(keyword)}` : '') +
                        (priceRange[0] > 200000 ? `&minPrice=${priceRange[0]}` : '') +
                        (priceRange[1] < 800000 ? `&maxPrice=${priceRange[1]}` : '')
                    )
                    allResults = data.map(mapXeToCarSearchResult)
                }
            }

            // Client-side engine filter
            if (selectedEngine !== 'ALL') {
                allResults = allResults.filter((car) => car.engineType === selectedEngine)
            }

            setSearchResults(allResults)
        } catch (error) {
            console.error('Search failed:', error)
            setSearchError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tìm kiếm')
        } finally {
            setIsSearching(false)
        }
    }

    const filteredResults = searchResults

    // Whether search/filter mode is active
    const hasActiveSearch =
        keyword.trim().length > 0 ||
        selectedModelFilter !== 'ALL' ||
        selectedEngine !== 'ALL' ||
        priceRange[0] > 200000 ||
        priceRange[1] < 800000

    // Reset Handler: Trigger LoadingScreen for 600ms, then reset all filters
    const handleResetAll = () => {
        setKeyword('')
        setSelectedModelFilter('ALL')
        setPriceRange([200000, 800000])
        setSelectedEngine('ALL')
        setIsModelDropdownOpen(false)
        setIsPriceDropdownOpen(false)
        setIsMoreFiltersOpen(false)
        setSearchResults([])
        setSearchError(null)
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
        <div className="min-h-screen bg-lambo-dark text-[#e5e5e5] select-none">
            {/* Main Center Container */}
            <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
                {/* 1. Header Hero Title */}
                <header className="mb-10">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.05em] text-lambo-primary leading-[1.05] font-barlow"
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
                        className="block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2 font-barlow"
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
                                className="w-full h-12 md:h-14 bg-lambo-dark-light border border-neutral-800 text-white placeholder-neutral-500 px-5 pr-12 text-sm font-medium tracking-wide focus:border-lambo-primary focus:outline-none transition-colors"
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
                            className="h-12 md:h-14 px-8 md:px-10 bg-lambo-primary hover:bg-lambo-hover text-black text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shrink-0 active:scale-[0.98] font-barlow"
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
                            className="w-full text-left p-4 md:p-5 bg-lambo-dark-light border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
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
                                    isModelDropdownOpen ? 'rotate-180 text-lambo-primary' : ''
                                }`}
                            />
                        </button>

                        {/* Model Dropdown Menu */}
                        {isModelDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#16171c] border border-neutral-700 shadow-2xl p-2 animate-fade-in">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedModelFilter('ALL')
                                        setIsModelDropdownOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                                        selectedModelFilter === 'ALL'
                                            ? 'bg-lambo-primary text-black'
                                            : 'text-neutral-300 hover:bg-white/5'
                                    }`}
                                >
                                    <span>All Models</span>
                                    {selectedModelFilter === 'ALL' && <Check className="w-3.5 h-3.5" />}
                                </button>
                                {seriesList.map((series) => (
                                    <button
                                        key={series.maDongXe}
                                        type="button"
                                        onClick={() => {
                                            setSelectedModelFilter(series.tenDongXe)
                                            setIsModelDropdownOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                                            selectedModelFilter === series.tenDongXe
                                                ? 'bg-lambo-primary text-black'
                                                : 'text-neutral-300 hover:bg-white/5'
                                        }`}
                                    >
                                        <span>{series.tenDongXe}</span>
                                        {selectedModelFilter === series.tenDongXe && <Check className="w-3.5 h-3.5" />}
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
                            className="w-full text-left p-4 md:p-5 bg-lambo-dark-light border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
                        >
                            <div>
                                <span className="block text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                                    PRICE RANGE
                                </span>
                                <span className="block text-[11px] text-lambo-primary font-mono mt-1">
                                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} USD
                                </span>
                            </div>
                            {isPriceDropdownOpen ? (
                                <ChevronUp className="w-4 h-4 text-lambo-primary" />
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
                                    className="w-full accent-lambo-primary cursor-pointer"
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
                                        className="text-[10px] uppercase font-bold bg-lambo-primary text-black px-3 py-1 rounded-xs"
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
                            className="w-full text-left p-4 md:p-5 bg-lambo-dark-light border border-neutral-800 hover:border-neutral-700 transition-colors flex items-start justify-between cursor-pointer"
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
                                    isMoreFiltersOpen ? 'text-lambo-primary' : ''
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
                                                    ? 'bg-lambo-primary text-black font-bold'
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
                            <span className="w-2 h-2 rounded-full bg-lambo-primary animate-pulse" />
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
                                className="text-3xl md:text-4xl font-black uppercase tracking-[0.06em] text-white font-barlow"
                            >
                                SEARCH RESULTS
                            </h2>
                            <p className="mt-2 text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                                Results are illustrative and reflect the current search scope. Final availability, pricing and specifications should be confirmed with your local retailer.
                            </p>
                        </div>

                        {isSearching ? (
                            <div className="flex items-center justify-center p-12">
                                <div className="w-12 h-12 border-4 border-lambo-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : searchError ? (
                            <div className="p-12 text-center rounded-xs border border-red-900/50 bg-red-950/20">
                                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                                <h3 className="text-lg font-bold uppercase text-red-300 mb-1">
                                    Lỗi tìm kiếm
                                </h3>
                                <p className="text-xs text-red-400 mb-6">
                                    {searchError}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResetAll}
                                    className="px-6 py-2.5 bg-lambo-primary text-black font-extrabold uppercase text-xs tracking-wider cursor-pointer"
                                >
                                    RESET SEARCH
                                </button>
                            </div>
                        ) : filteredResults.length > 0 ? (
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
                            <div className="p-12 text-center rounded-xs border border-white/10 bg-lambo-dark-light">
                                <Car className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                                <h3 className="text-lg font-bold uppercase text-white mb-1">
                                    Không tìm thấy xe
                                </h3>
                                <p className="text-xs text-neutral-400 mb-6">
                                    Hãy thử điều chỉnh từ khóa hoặc bộ lọc của bạn.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResetAll}
                                    className="px-6 py-2.5 bg-lambo-primary text-black font-extrabold uppercase text-xs tracking-wider cursor-pointer"
                                >
                                    RESET SEARCH
                                </button>
                            </div>
                        )}
                    </section>
                ) : (
                    /* 5. Default State: Explore By Category */
                    <section className="mb-16 animate-fade-in">
                        <div className="mb-8 pb-3 border-b border-lambo-primary/40">
                            <span
                                className="text-xs font-bold uppercase tracking-[0.24em] text-lambo-primary block mb-1 font-barlow"
                            >
                                MAIN TOPICS
                            </span>
                            <h2
                                className="text-2xl md:text-3xl font-black uppercase tracking-[0.08em] text-white font-barlow"
                            >
                                EXPLORE BY CATEGORY
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {EXPLORE_CATEGORIES.map((cat) => (
                                <div key={cat.title} className="flex flex-col">
                                    <h3
                                        className="text-base font-extrabold uppercase tracking-[0.16em] text-neutral-300 pb-3 border-b border-white/10 mb-4 font-barlow"
                                    >
                                        {cat.title}
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {cat.links.map((link) => (
                                            <li key={link.label}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCategoryClick(link.value)}
                                                    className="group w-full flex items-center justify-between text-left text-xs md:text-sm font-medium text-neutral-400 hover:text-lambo-primary transition-colors py-1 cursor-pointer"
                                                >
                                                    <span className="tracking-wide">{link.label}</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-lambo-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
