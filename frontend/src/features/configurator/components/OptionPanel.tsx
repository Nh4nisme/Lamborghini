import type { FC } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { TuyChon, PaintType } from '../types'
import { PAINT_CATEGORIES, getColorHex, formatVND } from '../constants'

interface OptionPanelProps {
    colors: TuyChon[]
    selectedColor: TuyChon | null
    onSelectColor: (color: TuyChon) => void
    activeLoaiMau: PaintType
    onChangeLoaiMau: (loai: PaintType) => void
    wheels: TuyChon[]
    selectedWheel: TuyChon | null
    onSelectWheel: (wheel: TuyChon) => void
    tires: TuyChon[]
    selectedTire: TuyChon | null
    onSelectTire: (tire: TuyChon) => void
}

export const OptionPanel: FC<OptionPanelProps> = ({
    colors,
    selectedColor,
    onSelectColor,
    activeLoaiMau,
    onChangeLoaiMau,
    wheels,
    selectedWheel,
    onSelectWheel,
    tires,
    selectedTire,
    onSelectTire,
}) => {
    return (
        <aside className="w-full lg:w-[420px] bg-white text-[#111111] p-6 lg:p-8 flex flex-col justify-between border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-8">
                {/* Header Section */}
                <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-2">
                        <span>01 / Exterior</span>
                        <span>1 of 4</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight uppercase text-neutral-900 font-barlow">
                        Make it yours.
                    </h2>
                </div>

                {/* Section: Exterior Paint */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold tracking-[0.15em] text-neutral-800 uppercase">
                            Exterior Paint
                        </span>
                        <span className="text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
                            {String(colors.length).padStart(2, '0')} Colors
                        </span>
                    </div>

                    {/* Paint Category Tabs (loaiMau) */}
                    <div className="flex items-center gap-6 border-b border-neutral-150 pb-2 text-xs font-semibold tracking-wider">
                        {PAINT_CATEGORIES.map((cat) => {
                            const isActive = activeLoaiMau === cat.key
                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => onChangeLoaiMau(cat.key as PaintType)}
                                    className={`relative pb-1 uppercase transition-colors cursor-pointer ${
                                        isActive
                                            ? 'text-neutral-900 font-bold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#eab308]'
                                            : 'text-neutral-400 hover:text-neutral-700'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Color Swatches Grid */}
                    <div className="grid grid-cols-4 gap-2.5 pt-1">
                        {colors.map((c) => {
                            const isSelected = selectedColor?.maTuyChon === c.maTuyChon
                            const hex = getColorHex(c.tenTuyChon, c.thuocTinhPhu)
                            return (
                                <button
                                    key={c.maTuyChon}
                                    type="button"
                                    title={c.tenTuyChon}
                                    onClick={() => onSelectColor(c)}
                                    style={{ backgroundColor: hex }}
                                    className={`group relative h-12 w-full rounded-sm transition-all shadow-xs cursor-pointer flex items-center justify-center ${
                                        isSelected
                                            ? 'ring-2 ring-neutral-900 ring-offset-2 ring-offset-white'
                                            : 'hover:scale-[1.03] hover:shadow-md'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="bg-black/30 p-1 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Selected Color Info */}
                    {selectedColor && (
                        <div className="pt-2">
                            <h4 className="text-base font-bold uppercase tracking-wider text-neutral-900">
                                {selectedColor.tenTuyChon}
                            </h4>
                            <p className="text-xs text-neutral-500 capitalize">
                                {selectedColor.thuocTinhPhu?.toLowerCase() || 'metallic'} paint / gloss finish
                                {selectedColor.giaCongThem > 0 && (
                                    <span className="ml-2 font-medium text-amber-700">
                                        (+{formatVND(selectedColor.giaCongThem)})
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>

                {/* Section: Wheels (maNhomTuyChon = 2) */}
                <div className="space-y-2">
                    <label className="block text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase">
                        Wheels
                    </label>
                    <div className="relative">
                        <select
                            value={selectedWheel?.maTuyChon ?? ''}
                            onChange={(e) => {
                                const found = wheels.find((w) => w.maTuyChon === Number(e.target.value))
                                if (found) onSelectWheel(found)
                            }}
                            className="w-full appearance-none bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-900 text-sm font-medium py-3 px-4 pr-10 focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
                        >
                            {wheels.map((w) => (
                                <option key={w.maTuyChon} value={w.maTuyChon}>
                                    {w.tenTuyChon} {w.thuocTinhPhu ? `/ ${w.thuocTinhPhu}` : ''}
                                    {w.giaCongThem > 0 ? ` (+${formatVND(w.giaCongThem)})` : ''}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                    </div>
                </div>

                {/* Section: Exterior Trim / Tires (maNhomTuyChon = 6) */}
                <div className="space-y-2">
                    <label className="block text-[11px] font-bold tracking-[0.18em] text-neutral-500 uppercase">
                        Exterior Trim
                    </label>
                    <div className="relative">
                        <select
                            value={selectedTire?.maTuyChon ?? ''}
                            onChange={(e) => {
                                const found = tires.find((t) => t.maTuyChon === Number(e.target.value))
                                if (found) onSelectTire(found)
                            }}
                            className="w-full appearance-none bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-900 text-sm font-medium py-3 px-4 pr-10 focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
                        >
                            {tires.map((t) => (
                                <option key={t.maTuyChon} value={t.maTuyChon}>
                                    {t.tenTuyChon} {t.thuocTinhPhu ? `/ ${t.thuocTinhPhu}` : ''}
                                    {t.giaCongThem > 0 ? ` (+${formatVND(t.giaCongThem)})` : ''}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                    </div>
                </div>

                {/* Callout Message */}
                <div className="border-l-2 border-[#eab308] pl-3 py-1">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        Continue to the interior to choose materials, colors and stitching.
                    </p>
                </div>
            </div>
        </aside>
    )
}
