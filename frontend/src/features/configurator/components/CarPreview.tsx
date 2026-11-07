import { useState, type FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TuyChon, XeConfigurator } from '../types'

interface CarPreviewProps {
    car: XeConfigurator | null | undefined
    selectedColor: TuyChon | null
}

const ANGLES = ['FRONT', 'SIDE', 'REAR', 'DETAIL'] as const
type Angle = (typeof ANGLES)[number]

export const CarPreview: FC<CarPreviewProps> = ({ car, selectedColor }) => {
    const [selectedAngle, setSelectedAngle] = useState<Angle>('SIDE')

    const carName = car?.tenPhienBan || 'REVUELTO'
    const carEngine = car?.dongCo || 'V12 HPEV'
    const colorName = selectedColor?.tenTuyChon || 'ARANCIO BOREALIS'
    const finish = selectedColor?.thuocTinhPhu || 'Metallic'

    // Prefer selectedColor image, then car image, fallback to homepage Revuelto
    const imageSource = selectedColor?.hinhAnh || car?.hinhAnh || '/Images/homepage/Revuelto.png'

    const handlePrev = () => {
        const idx = ANGLES.indexOf(selectedAngle)
        const nextIdx = (idx - 1 + ANGLES.length) % ANGLES.length
        setSelectedAngle(ANGLES[nextIdx])
    }

    const handleNext = () => {
        const idx = ANGLES.indexOf(selectedAngle)
        const nextIdx = (idx + 1) % ANGLES.length
        setSelectedAngle(ANGLES[nextIdx])
    }

    return (
        <section className="relative flex-1 bg-[#edeae4] flex flex-col justify-between p-8 lg:p-12 overflow-hidden select-none">
            {/* Top Bar inside Canvas */}
            <div className="flex items-start justify-between z-10">
                {/* Left: Model Name & Tagline */}
                <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                        Lamborghini / {carEngine}
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 font-barlow mt-1">
                        {carName}
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1 font-normal">
                        Your vision. Every detail.
                    </p>
                </div>

                {/* Right: Exterior View & Current Color */}
                <div className="text-right">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                        Exterior View
                    </span>
                    <div className="flex justify-end my-1">
                        <div className="w-8 h-[3px] bg-[#eab308]" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                        {colorName}
                    </p>
                    <p className="text-xs text-neutral-500 capitalize">
                        Gloss / {finish.toLowerCase()}
                    </p>
                </div>
            </div>

            {/* Center: Car Rendering */}
            <div className="relative flex items-center justify-center my-auto py-10">
                {/* Car Shadow */}
                <div className="absolute bottom-6 w-[80%] max-w-[700px] h-10 bg-black/25 blur-xl rounded-full pointer-events-none" />

                <img
                    src={imageSource}
                    alt={`${carName} - ${colorName}`}
                    onError={(e) => {
                        const target = e.currentTarget
                        if (!target.src.includes('homepage/Revuelto.png')) {
                            target.src = '/Images/homepage/Revuelto.png'
                        }
                    }}
                    className="relative max-h-[360px] lg:max-h-[460px] w-auto max-w-[95%] object-contain drop-shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.01]"
                />
            </div>

            {/* Bottom: View Angle Selector */}
            <div className="flex items-center justify-center gap-6 z-10">
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous view angle"
                    className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em]">
                    {ANGLES.map((angle) => {
                        const isActive = selectedAngle === angle
                        return (
                            <button
                                key={angle}
                                type="button"
                                onClick={() => setSelectedAngle(angle)}
                                className={`pb-1 transition-colors cursor-pointer uppercase ${
                                    isActive
                                        ? 'text-neutral-900 border-b-2 border-[#eab308]'
                                        : 'text-neutral-400 hover:text-neutral-700'
                                }`}
                            >
                                {angle}
                            </button>
                        )
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next view angle"
                    className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    )
}
