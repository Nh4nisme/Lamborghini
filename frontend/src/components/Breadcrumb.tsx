import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { http } from '../api/http'

interface BreadcrumbItem {
    label: string
    path: string
    isActive: boolean
}

// Route mapping cho các static routes
const routeLabels: Record<string, string> = {
    '/': 'Home',
    '/models': 'Models',
    '/configurator': 'Configurator',
    '/showroom': 'Showrooms',
    '/news': 'News',
    '/about': 'About Us',
    '/contact': 'Contact',
    '/ownership': 'Ownership',
    '/motorsport': 'Motorsport',
    '/service': 'Service',
    '/heritage': 'Heritage',
    '/events': 'Events',
}

// Hook to fetch model name by ID
const useModelName = (id: string | undefined) => {
    return useQuery({
        queryKey: ['model-name', id],
        queryFn: async () => {
            if (!id) return null
            try {
                const response = await http<{ tenDongXe: string }>(`/model/${id}/modeldetail`)
                return response.tenDongXe
            } catch {
                return null
            }
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    })
}

// Hook to fetch news title by ID
const useNewsTitle = (id: string | undefined) => {
    return useQuery({
        queryKey: ['news-title', id],
        queryFn: async () => {
            if (!id) return null
            try {
                const response = await http<{ tieuDe: string }>(`/news/${id}`)
                return response.tieuDe
            } catch {
                return null
            }
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    })
}

// Fallback labels khi không có API data
const getFallbackLabel = (segment: string, id: string): string => {
    const modelNames: Record<string, string> = {
        '1': 'Revuelto',
        '2': 'Temerario',
        '3': 'Huracán',
        '4': 'Urus',
    }

    if (segment === 'models' || segment === 'configurator') {
        return modelNames[id] || `Model ${id}`
    }

    if (segment === 'news') {
        return `Article ${id}`
    }

    return id
}

export default function Breadcrumb() {
    const location = useLocation()

    // Detect dynamic IDs from path
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const modelId = pathSegments[0] === 'models' && pathSegments[1] ? pathSegments[1] : 
                    pathSegments[0] === 'configurator' && pathSegments[1] ? pathSegments[1] : 
                    undefined
    const newsId = pathSegments[0] === 'news' && pathSegments[1] ? pathSegments[1] : undefined

    // Fetch dynamic data
    const { data: modelName, isLoading: isLoadingModel } = useModelName(modelId)
    const { data: newsTitle, isLoading: isLoadingNews } = useNewsTitle(newsId)

    const breadcrumbs = useMemo(() => {
        const items: BreadcrumbItem[] = []

        // Always add home
        items.push({
            label: 'Home',
            path: '/',
            isActive: pathSegments.length === 0,
        })

        // Build breadcrumb items from path segments
        let currentPath = ''
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`
            const isLast = index === pathSegments.length - 1

            // Check if segment is a dynamic ID
            const isDynamic = /^\d+$/.test(segment)

            if (isDynamic) {
                // Get previous segment to determine context
                const previousSegment = pathSegments[index - 1]
                
                // Use fetched data or fallback
                let label = getFallbackLabel(previousSegment, segment)
                
                // Only use API data if it's loaded and available
                if (previousSegment === 'models' || previousSegment === 'configurator') {
                    // Use modelName if loaded, otherwise keep fallback
                    if (modelName) {
                        label = modelName
                    }
                } else if (previousSegment === 'news') {
                    if (newsTitle) {
                        label = newsTitle
                    }
                }

                items.push({
                    label,
                    path: currentPath,
                    isActive: isLast,
                })
            } else {
                // Static route
                const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

                items.push({
                    label,
                    path: currentPath,
                    isActive: isLast,
                })
            }
        })

        return items
    }, [location.pathname, pathSegments, modelName, newsTitle])

    // Don't show breadcrumb on home page
    if (breadcrumbs.length <= 1) {
        return null
    }

    // Show loading skeleton while fetching model/news names
    const isLoading = isLoadingModel || isLoadingNews

    return (
        <nav
            className="bg-lambo-bold-black border-b border-lambo-tertiary/30 py-3 animate-fadeIn"
            aria-label="Breadcrumb"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-4 bg-gray-800 animate-pulse rounded"></div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <div className="w-16 h-4 bg-gray-800 animate-pulse rounded"></div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
                    </div>
                ) : (
                    <ol className="flex items-center gap-2 flex-wrap">
                        {breadcrumbs.map((item, index) => (
                            <li key={item.path} className="flex items-center gap-2">
                                {index > 0 && (
                                    <ChevronRight className="w-4 h-4 text-gray-600" aria-hidden="true" />
                                )}

                                {item.isActive ? (
                                    <span 
                                        className="flex items-center gap-2 font-barlow text-sm font-semibold text-lambo-primary uppercase tracking-wider"
                                        aria-current="page"
                                    >
                                        {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                                        <span className="truncate max-w-xs lg:max-w-md">{item.label}</span>
                                    </span>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-2 font-barlow text-sm font-medium text-gray-400 hover:text-white uppercase tracking-wider transition-colors duration-200 group"
                                        aria-label={`Navigate to ${item.label}`}
                                    >
                                        {index === 0 && (
                                            <Home className="w-4 h-4 group-hover:text-lambo-primary transition-colors" aria-hidden="true" />
                                        )}
                                        <span className="group-hover:text-lambo-primary transition-colors truncate max-w-xs lg:max-w-md">
                                            {item.label}
                                        </span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </nav>
    )
}
