import { formatDetailSchedule, type DealerAppointmentDetailDTO } from '../types'

interface DealerAppointmentInfoPanelProps {
    detail: DealerAppointmentDetailDTO
}

export function DealerAppointmentInfoPanel({ detail }: DealerAppointmentInfoPanelProps) {
    const rows = [
        { label: 'Khách hàng', value: detail.tenKhachHang },
        { label: 'Liên hệ', value: `${detail.soDienThoai} · ${detail.email}` },
        { label: 'Thời gian', value: formatDetailSchedule(detail) },
        { label: 'Showroom', value: detail.showroom },
        { label: 'Cấu hình đính kèm', value: detail.cauHinh },
    ]

    return (
        <section className="border border-lambo-pressed bg-lambo-tertiary p-6">
            <h2 className="font-barlow-condensed text-4xl font-semibold uppercase leading-10 text-lambo-secondary">
                {detail.tieuDe}
            </h2>

            <dl className="mt-8 flex flex-col gap-5">
                {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[176px_minmax(0,1fr)] sm:gap-6">
                        <dt className="font-barlow text-xs font-semibold uppercase tracking-[0.12em] text-lambo-primary">
                            {row.label}
                        </dt>
                        <dd className="font-barlow text-base leading-6 text-lambo-secondary">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
