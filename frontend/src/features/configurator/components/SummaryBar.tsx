import type { FC } from 'react'
import { Download, ArrowRight, RotateCcw } from 'lucide-react'
import type { TuyChon, XeConfigurator } from '../types'
import { formatVND } from '../constants'

interface SummaryBarProps {
    car: XeConfigurator | null | undefined
    selectedColor: TuyChon | null
    selectedWheel: TuyChon | null
    selectedTire: TuyChon | null
    onReset: () => void
    onNext: () => void
    onSave?: () => void
}

export const SummaryBar: FC<SummaryBarProps> = ({
    car,
    selectedColor,
    selectedWheel,
    selectedTire,
    onReset,
    onNext,
    onSave,
}) => {
    const basePrice = Number(car?.giaKhoiDiem || 0)
    const colorPrice = Number(selectedColor?.giaCongThem || 0)
    const wheelPrice = Number(selectedWheel?.giaCongThem || 0)
    const tirePrice = Number(selectedTire?.giaCongThem || 0)
    const totalPrice = basePrice + colorPrice + wheelPrice + tirePrice

    const carName = car?.tenPhienBan || 'REVUELTO'

    return (
        <footer className="bg-white border-t border-neutral-200 px-6 lg:px-10 py-4 select-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left Info Columns */}
                <div>
                    <div className="flex flex-wrap items-start gap-8 lg:gap-14 text-xs">
                        {/* Car Model */}
                        <div>
                            <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                                Your Configuration
                            </span>
                            <span className="block text-sm font-extrabold uppercase text-neutral-900 font-barlow mt-0.5">
                                {carName}
                            </span>
                        </div>

                        {/* Paint */}
                        <div>
                            <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                                Paint
                            </span>
                            <span className="block text-sm font-semibold text-neutral-800 mt-0.5">
                                {selectedColor?.tenTuyChon || '—'}
                            </span>
                        </div>

                        {/* Wheels */}
                        <div>
                            <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                                Wheels
                            </span>
                            <span className="block text-sm font-semibold text-neutral-800 mt-0.5">
                                {selectedWheel?.tenTuyChon || '—'}
                            </span>
                        </div>

                        {/* Trim / Tires */}
                        <div>
                            <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                                Trim
                            </span>
                            <span className="block text-sm font-semibold text-neutral-800 mt-0.5">
                                {selectedTire?.tenTuyChon || '—'}
                            </span>
                        </div>

                        {/* Estimated Price */}
                        {totalPrice > 0 && (
                            <div>
                                <span className="block text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                                    Total Price
                                </span>
                                <span className="block text-sm font-extrabold text-amber-700 mt-0.5">
                                    {formatVND(totalPrice)}
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="text-[11px] text-neutral-400 mt-2 font-light">
                        Illustrative vehicle preview. Colors and equipment may vary by market.
                    </p>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onSave}
                            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save</span>
                        </button>

                        <button
                            type="button"
                            onClick={onNext}
                            className="inline-flex items-center gap-2 bg-[#eab308] hover:bg-[#d9a307] text-black px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors shadow-xs cursor-pointer font-barlow"
                        >
                            <span>Continue to interior</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-neutral-400 hover:text-neutral-800 uppercase transition-colors cursor-pointer mt-0.5"
                    >
                        <span>Reset configuration</span>
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
