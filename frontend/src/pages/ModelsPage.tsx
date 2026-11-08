import { useDongXe } from '../features/model/hooks'
import { FeaturedModelsCarousel } from '../components/FeaturedModelsCarousel'
import NextChapterCTA from '../components/NextChapterCTA'
import { UrusSection } from '../features/model/components/UrusSection.tsx'
import BeyondTheRangeSection from "../features/model/components/BeyondTheRangeSection.tsx";
import BeyondTheLimitHeader from "../features/model/components/BeyondTheLimitHeader.tsx";
import {useNavigate} from "react-router-dom";
import { LoadingScreen } from '../components/LoadingScreen'

export default function ModelsPage() {
    const navigate = useNavigate()
    const { data: dongXeList, isLoading, isError, error } = useDongXe()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isError) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black p-4">
          <div className="max-w-md w-full bg-lambo-tertiary border border-red-600/30 rounded-lg p-8 text-center">
            <p className="text-red-400 text-lg mb-6 font-barlow">Error: {error.message}</p>
            <button className="bg-lambo-primary hover:bg-lambo-hover text-lambo-bold-black font-barlow font-bold py-3 px-8 transition-all duration-300 uppercase tracking-wider">
              Retry
            </button>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-lambo-bold-black">
        <BeyondTheLimitHeader />
        {dongXeList && dongXeList.length > 0 && (
            <FeaturedModelsCarousel items={dongXeList} showHeader={true} />
        )}
        <UrusSection />
        <BeyondTheRangeSection />
        <NextChapterCTA
            onOpenConfigurator={() => navigate('/configurator/1')}
            onOpenEnquiry={() => navigate('/showroom')}
        />
      </div>
  )
}