import type { DongXe } from '../types'

export function DongXeList({ items }: { items: DongXe[] }) {
    return (
        <section>
            <h2>Dòng xe</h2>
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {items.map(xe => (
                    <div key={xe.maDongXe} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
                        <h3>
                            {xe.tenDongXe} {xe.noiBat}
                        </h3>
                        <p><b>{xe.danhMuc}</b></p>
                        <p>{xe.moTa}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}