import { useDongXe } from '../features/model/hooks'
import { FeaturedModelsCarousel } from '../components/FeaturedModelsCarousel'
import NextChapterCTA from '../components/NextChapterCTA'
import { UrusSection } from '../features/model/components/UrusSection.tsx'
import BeyondTheRangeSection from "../features/model/components/BeyondTheRangeSection.tsx";
import BeyondTheLimitHeader from "../features/model/components/BeyondTheLimitHeader.tsx";

export default function ModelsPage() {
  const { data: dongXeList, isLoading, isError, error } = useDongXe()

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-lambo-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lambo-primary font-barlow text-xl tracking-wider">Loading models...</p>
          </div>
        </div>
    )
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
        <NextChapterCTA />
      </div>
  )
}