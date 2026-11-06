import { useHome } from '../features/home/hooks'
import { DongXeList } from '../features/home/components/DongXeList'
import { TinTucList } from '../features/home/components/TinTucList'

export default function HomePage() {
    const { data, isLoading, isError, error, refetch } = useHome()

    if (isLoading) return <p>Đang tải...</p>

    if (isError) {
        return (
            <div>
                <p style={{ color: 'red' }}>Lỗi: {error.message}</p>
                <button onClick={() => refetch()}>Thử lại</button>
            </div>
        )
    }

    return (
        <div>
            <DongXeList items={data!.dongXe} />
            <TinTucList items={data!.tinTuc} />
        </div>
    )
}