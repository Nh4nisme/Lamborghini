import { ExternalLink, Car, Newspaper, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ThongTinLienQuan } from '../types'

interface RelatedInfoCardProps {
    info: ThongTinLienQuan
}

export function RelatedInfoCard({ info }: RelatedInfoCardProps) {
    const getIcon = () => {
        switch (info.type) {
            case 'dongxe':
            case 'xe':
                return <Car className="w-4 h-4" />
            case 'tintuc':
                return <Newspaper className="w-4 h-4" />
            case 'showroom':
                return <MapPin className="w-4 h-4" />
            default:
                return <ExternalLink className="w-4 h-4" />
        }
    }

    const getLink = () => {
        switch (info.type) {
            case 'dongxe':
                return `/models/${info.id}`
            case 'xe':
                return `/configurator/${info.id}`
            case 'tintuc':
                return `/news/${info.id}`
            case 'showroom':
                return '/showroom'
            default:
                return '#'
        }
    }

    const link = getLink()

    if (link === '#') {
        return (
            <div className="bg-lambo-dark-light border border-lambo-primary/20 rounded-lg p-3 hover:border-lambo-primary/50 transition-all">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-lambo-primary/10 rounded flex items-center justify-center flex-shrink-0 text-lambo-primary">
                        {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                            {info.title}
                        </h4>
                        {info.description && info.description !== 'null' && (
                            <p className="text-xs text-gray-400 line-clamp-2">
                                {info.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link
            to={link}
            className="block bg-lambo-dark-light border border-lambo-primary/20 rounded-lg p-3 hover:border-lambo-primary/50 hover:bg-lambo-dark transition-all group"
        >
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-lambo-primary/10 rounded flex items-center justify-center flex-shrink-0 text-lambo-primary group-hover:bg-lambo-primary group-hover:text-lambo-bold-black transition-all">
                    {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1 group-hover:text-lambo-primary transition-colors">
                        {info.title}
                    </h4>
                    {info.description && info.description !== 'null' && (
                        <p className="text-xs text-gray-400 line-clamp-2">
                            {info.description}
                        </p>
                    )}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-lambo-primary transition-colors flex-shrink-0" />
            </div>
        </Link>
    )
}
