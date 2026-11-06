import type { TinTuc } from '../types'

export function TinTucList({ items }: { items: TinTuc[] }) {
    return (
        <section>
            <h2>Tin tức</h2>
            {items.map(tin => (
                <article key={tin.maTinTuc} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                    <img
                        src={tin.hinhAnh}
                        alt={tin.tieuDe}
                        style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                    />
                    <h3>{tin.tieuDe}</h3>
                    <small>
                        {tin.loai} · {new Date(tin.ngayDang).toLocaleDateString('vi-VN')}
                    </small>
                    {/* pre-line để các ký tự xuống dòng \n trong noiDung hiển thị đúng */}
                    <p style={{ whiteSpace: 'pre-line' }}>{tin.noiDung}</p>
                </article>
            ))}
        </section>
    )
}