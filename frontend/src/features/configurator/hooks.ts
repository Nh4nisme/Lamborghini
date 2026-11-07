import { useMemo, useState, useEffect } from 'react'
import { getTuyChonTheoXe } from './api'
import type { Selected, TuyChon } from './types'


export function useConfigurator(options: TuyChon[]) {
    const [choices, setChoices] = useState<Selected>({})
    const [stepIndex, setStepIndex] = useState(0)

    const byNhom = useMemo(() => {
        const m: Record<number, TuyChon[]> = {}
        for (const o of options) (m[o.maNhomTuyChon] ??= []).push(o)
        return m
    }, [options])

    const selected = useMemo<Selected>(() => {
        const d: Selected = {}
        for (const [nhom, list] of Object.entries(byNhom)) d[Number(nhom)] = list[0]
        return { ...d, ...choices }
    }, [byNhom, choices])

    // const tongGia = giaXe + Object.values(selected).reduce((s, o) => s + o.giaCongThem, 0)
    const choose = (o: TuyChon) => setChoices((c) => ({ ...c, [o.maNhomTuyChon]: o }))
    const reset = () => { setChoices({}); setStepIndex(0) }

    return { byNhom, selected, choose, reset, stepIndex, setStepIndex }
}
export function useTuyChon(maXe: number) {
    const [state, setState] = useState<{ data: TuyChon[]; loading: boolean; error: string | null }>(
        { data: [], loading: true, error: null })

    useEffect(() => {
        let alive = true
        getTuyChonTheoXe(maXe)
            .then((data) => { if (alive) setState({ data, loading: false, error: null }) })
            .catch((e) => { if (alive) setState({ data: [], loading: false, error: String(e?.message ?? e) }) })
        return () => { alive = false }
    }, [maXe])

    return state
}