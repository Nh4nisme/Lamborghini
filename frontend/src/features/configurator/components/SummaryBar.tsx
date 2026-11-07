import { NHOM } from '../constants'
import type { Selected } from '../types'

const vnd = (n: number) => n.toLocaleString('vi-VN') + ' ₫'

interface Props { selected: Selected; tongGia: number; onReset: () => void; onNext: () => void }

export function SummaryBar({ selected, tongGia, onReset, onNext }: Props) {
    return (
        <footer className="flex items-center justify-between border-t border-neutral-800 p-4">
            <div className="flex gap-8 text-sm">
                {Object.values(selected).map((o) => (
                    <div key={o.maTuyChon}>
                        <p className="text-xs uppercase text-neutral-400">{NHOM[o.maNhomTuyChon]?.label}</p>
                        <p>{o.tenTuyChon}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <span className="font-bold">{vnd(tongGia)}</span>
                <button onClick={onReset} className="text-xs uppercase text-neutral-400">Reset</button>
                <button className="border border-neutral-600 px-4 py-2 text-sm">Save</button>
                <button onClick={onNext} className="bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">Continue</button>
            </div>
        </footer>
    )
}