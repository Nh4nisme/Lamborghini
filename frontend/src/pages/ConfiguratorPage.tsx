import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CarPreview } from '../features/configurator/components/CarPreview'
import { OptionPanel } from '../features/configurator/components/OptionPanel'
import { StepTabs } from '../features/configurator/components/StepTabs'
import { SummaryBar } from '../features/configurator/components/SummaryBar'
import {
    useXeConfigurator,
    useMauCuaXeTheoLoai,
    useTuyChonTheoNhom,
} from '../features/configurator/hooks'
import type { TuyChon, PaintType } from '../features/configurator/types'
import { STEPS } from '../features/configurator/constants'

export default function ConfiguratorPage() {
    const { maXe } = useParams<{ maXe?: string }>()
    const navigate = useNavigate()
    const carId = Number(maXe) || 1

    // Step state
    const [stepIndex, setStepIndex] = useState(0)

    // Paint category state (loaiMau parameter for API @GetMapping("/{maXe}/color"))
    const [activeLoaiMau, setActiveLoaiMau] = useState<PaintType>('Metallic')

    // Selections state
    const [selectedColor, setSelectedColor] = useState<TuyChon | null>(null)
    const [selectedWheel, setSelectedWheel] = useState<TuyChon | null>(null)
    const [selectedTire, setSelectedTire] = useState<TuyChon | null>(null)

    // Toast alert state
    const [showSaveToast, setShowSaveToast] = useState(false)

    // 1. Fetch car information (@GetMapping("/{maXe}"))
    const { data: carData } = useXeConfigurator(carId)

    // 2. Fetch colors according to current paint type (@GetMapping("/{maXe}/color?loaiMau=..."))
    const { data: colors = [] } = useMauCuaXeTheoLoai(carId, activeLoaiMau)

    // 3. Fetch wheels (@GetMapping("/{maXe}/options?maNhomTuyChon=2"))
    const { data: wheels = [] } = useTuyChonTheoNhom(carId, 2)

    // 4. Fetch tires/exterior trim (@GetMapping("/{maXe}/options?maNhomTuyChon=6"))
    const { data: tires = [] } = useTuyChonTheoNhom(carId, 6)

    // Auto-select initial color when colors are loaded
    useEffect(() => {
        if (colors.length > 0 && !selectedColor) {
            // Prefer Arancio Borealis if available, otherwise first color
            const preferred =
                colors.find((c) => c.tenTuyChon.toLowerCase().includes('arancio')) || colors[0]
            setSelectedColor(preferred)
        }
    }, [colors, selectedColor])

    // Auto-select initial wheel (group 2)
    useEffect(() => {
        if (wheels.length > 0 && !selectedWheel) {
            setSelectedWheel(wheels[0])
        }
    }, [wheels, selectedWheel])

    // Auto-select initial tire (group 6)
    useEffect(() => {
        if (tires.length > 0 && !selectedTire) {
            setSelectedTire(tires[0])
        }
    }, [tires, selectedTire])

    // Handle reset
    const handleReset = () => {
        if (colors.length > 0) setSelectedColor(colors[0])
        if (wheels.length > 0) setSelectedWheel(wheels[0])
        if (tires.length > 0) setSelectedTire(tires[0])
        setStepIndex(0)
    }

    // Handle exit
    const handleExit = () => {
        navigate(`/models/${carId}`)
    }

    // Handle save
    const handleSave = () => {
        setShowSaveToast(true)
        setTimeout(() => setShowSaveToast(false), 3000)
    }

    // Handle continue to next step
    const handleNext = () => {
        setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1))
    }

    const carName = carData?.tenPhienBan || 'REVUELTO'

    return (
        <div className="flex h-screen w-screen flex-col bg-[#edeae4] text-[#111111] overflow-hidden select-none font-sans">
            {/* Top Navigation Bar */}
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:px-10 z-20">
                {/* Brand / Model / Configurator Title */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-neutral-900 font-barlow">
                        {carName} / CONFIGURATOR
                    </span>
                </div>

                {/* Steps Tabs */}
                <StepTabs currentIndex={stepIndex} onSelectStep={setStepIndex} />

                {/* Exit Button */}
                <button
                    type="button"
                    onClick={handleExit}
                    className="border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-800 transition-colors cursor-pointer"
                >
                    Exit Configurator
                </button>
            </header>

            {/* Main Atelier Workspace */}
            <main className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
                {/* Center / Left: Interactive Car Display */}
                <CarPreview car={carData} selectedColor={selectedColor} />

                {/* Right: Customization Panel */}
                <OptionPanel
                    colors={colors}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                    activeLoaiMau={activeLoaiMau}
                    onChangeLoaiMau={setActiveLoaiMau}
                    wheels={wheels}
                    selectedWheel={selectedWheel}
                    onSelectWheel={setSelectedWheel}
                    tires={tires}
                    selectedTire={selectedTire}
                    onSelectTire={setSelectedTire}
                />
            </main>

            {/* Bottom Summary Bar */}
            <SummaryBar
                car={carData}
                selectedColor={selectedColor}
                selectedWheel={selectedWheel}
                selectedTire={selectedTire}
                onReset={handleReset}
                onNext={handleNext}
                onSave={handleSave}
            />

            {/* Toast notification */}
            {showSaveToast && (
                <div className="fixed bottom-24 right-8 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xs shadow-xl text-xs font-semibold tracking-wider uppercase flex items-center gap-3 border border-neutral-700 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                    Configuration saved successfully!
                </div>
            )}
        </div>
    )
}
