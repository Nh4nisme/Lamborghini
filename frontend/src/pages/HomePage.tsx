import { useHome } from '../features/home/hooks'
import { DongXeList } from '../features/home/components/DongXeList'
import { TinTucList } from '../features/home/components/TinTucList'

export default function HomePage() {
    const { data, isLoading, isError, error, refetch } = useHome()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-lambo-dark">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-lambo-gold border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lambo-gold font-barlow text-xl tracking-wider">Đang tải...</p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-lambo-dark p-4">
                <div className="max-w-md w-full bg-lambo-dark-light border border-red-600/30 rounded-lg p-8 text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-red-400 text-lg mb-6 font-barlow">Lỗi: {error.message}</p>
                    <button 
                        onClick={() => refetch()}
                        className="bg-lambo-gold hover:bg-lambo-gold-light text-lambo-dark font-barlow font-bold py-3 px-8 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-lambo-dark">
            <DongXeList items={data!.dongXe} />
            <TinTucList items={data!.tinTuc} />
        </div>
    )
}