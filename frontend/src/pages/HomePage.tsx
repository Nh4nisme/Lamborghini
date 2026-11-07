import { useHome } from '../features/home/hooks'
import { HeroSection } from '../features/home/components/HeroSection'
import { FeaturedModels } from '../features/home/components/FeaturedModels'
import { CustomizationSection } from '../features/home/components/CustomizationSection'
import { VisionSection } from '../features/home/components/VisionSection'
import { ExperienceSection } from '../features/home/components/ExperienceSection'
import { HeritageSection } from '../features/home/components/HeritageSection'
import { NewsGrid } from '../features/home/components/NewsGrid'
import { PersonalSection } from '../features/home/components/PersonalSection'
import { ShowroomCTA } from '../features/home/components/ShowroomCTA'
import NextChapterCTA from "../components/NextChapterCTA.tsx";

export default function HomePage() {
    const { data, isLoading, isError, error, refetch } = useHome()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-lambo-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lambo-primary font-barlow text-xl tracking-wider">Đang tải...</p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-lambo-bold-black p-4">
                <div className="max-w-md w-full bg-lambo-tertiary border border-red-600/30 rounded-lg p-8 text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-red-400 text-lg mb-6 font-barlow">Lỗi: {error.message}</p>
                    <button 
                        onClick={() => refetch()}
                        className="bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black font-barlow font-bold py-3 px-8 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-lambo-bold-black">
            <HeroSection />
            <FeaturedModels items={data!.dongXe} />
            <CustomizationSection />
            <VisionSection />
            <ExperienceSection />
            <HeritageSection />
            <NewsGrid items={data!.tinTuc} />
            <PersonalSection />
            <ShowroomCTA />
            <NextChapterCTA onOpenConfigurator={function(): void {
                throw new Error("Function not implemented.")
            } } onOpenEnquiry={function(): void {
                throw new Error("Function not implemented.")
            } }/>
        </div>
    )
}