import { CarPreview } from '../features/configurator/components/CarPreview'
import { OptionPanel } from '../features/configurator/components/OptionPanel'
import { StepTabs } from '../features/configurator/components/StepTabs'
import { STEPS } from '../features/configurator/constants'
import { useConfigurator } from '../features/configurator/hooks'
import { useParams } from "react-router-dom";
import { useTuyChon } from '../features/configurator/hooks'



export default function ConfiguratorPage() {
    const { maXe } = useParams()                       // route đổi thành /configurator/:maXe
    const { data: options, loading, error } = useTuyChon(Number(maXe))
    const cfg = useConfigurator(options)        // giaXe lấy từ API modeldetail có sẵn
// Đặt return sớm SAU các lệnh gọi hook, không đặt trước (quy tắc của React):
    const step = STEPS[cfg.stepIndex]              // 2. rồi mới lấy step
    const son = cfg.selected[1]                    // 3. và son (1 = maNhomTuyChon của nhóm sơn)
    if (loading) return <p className="p-8 text-white">Đang tải…</p>
    if (error) return <p className="p-8 text-red-400">Lỗi: {error}</p>

    return (
        <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
            <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-3">
                <span className="font-bold uppercase">Revuelto / Configurator</span>
                <StepTabs index={cfg.stepIndex} onChange={cfg.setStepIndex} />
                <button className="border border-yellow-400 px-3 py-1 text-xs uppercase">Exit configurator</button>
            </header>

            <main className="flex flex-1">
                <CarPreview ten="Revuelto" image={son?.hinhAnh || undefined} tenMau={son?.tenTuyChon} />
                <aside className="w-[380px] border-l border-neutral-800 p-6">
                    <h2 className="mb-6 text-3xl font-bold uppercase">Make it yours.</h2>
                    <OptionPanel nhomIds={step.nhom} byNhom={cfg.byNhom} selected={cfg.selected} onChoose={cfg.choose} />
                </aside>
            </main>

            {/*<SummaryBar selected={cfg.selected} tongGia={cfg.tongGia} onReset={cfg.reset}*/}
            {/*            onNext={() => cfg.setStepIndex(Math.min(cfg.stepIndex + 1, STEPS.length - 1))} />*/}
        </div>
    )
}