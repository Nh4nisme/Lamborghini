import { NHOM } from '../constants'
import type { Selected, TuyChon } from '../types'

interface Props {
    nhomIds: number[]
    byNhom: Record<number, TuyChon[]>
    selected: Selected
    onChoose: (o: TuyChon) => void
}

export function OptionPanel({ nhomIds, byNhom, selected, onChoose }: Props) {
    return (
        <div className="space-y-6">
            {nhomIds.map((id) => {
                const meta = NHOM[id]
                const list = byNhom[id] ?? []
                if (!meta || list.length === 0) return null
                return (
                    <section key={id}>
                        <h3 className="mb-2 text-xs uppercase tracking-widest text-neutral-400">{meta.label}</h3>
                        {meta.kind === 'swatch' ? (
                            <div className="grid grid-cols-4 gap-2">
                                {list.map((o) => (
                                    <button key={o.maTuyChon} title={o.tenTuyChon} onClick={() => onChoose(o)}
                                            style={{ background: o.thuocTinhPhu ?? '#444' }}
                                            className={`h-12 border-2 ${selected[id]?.maTuyChon === o.maTuyChon ? 'border-yellow-400' : 'border-transparent'}`} />
                                ))}
                            </div>
                        ) : (
                            <select value={selected[id]?.maTuyChon}
                                    onChange={(e) => onChoose(list.find((o) => o.maTuyChon === Number(e.target.value))!)}
                                    className="w-full border border-neutral-700 bg-neutral-900 p-2">
                                {list.map((o) => <option key={o.maTuyChon} value={o.maTuyChon}>{o.tenTuyChon}</option>)}
                            </select>
                        )}
                    </section>
                )
            })}
        </div>
    )
}