import { ArrowUpRight, Download } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'
import type { SavedConfigurationDTO } from '../types'

interface SavedConfigurationCardProps {
    configuration: SavedConfigurationDTO
}

const formatSavedDate = (isoDate: string) => isoDate.slice(0, 10).split('-').reverse().join('/')

export function SavedConfigurationCard({ configuration }: SavedConfigurationCardProps) {
    const { maXe, tenDongXe, maCauHinh, mauSac, tuyChon, ngayLuu, congSuatCv, tangToc0100, tocDoToiDa, hinhAnh } =
        configuration

    const specs = [
        { value: String(congSuatCv), label: 'CV / MAX. POWER' },
        { value: tangToc0100, label: '0–100 KM/H' },
        { value: tocDoToiDa, label: 'KM/H / TOP SPEED' },
    ]

    return (
        <article className="flex flex-col">
            <div className="flex flex-1 flex-col border border-lambo-pressed bg-lambo-tertiary">
                <div className="flex h-64 items-center justify-center border-b border-lambo-pressed bg-lambo-bold-black p-6">
                    <img src={hinhAnh} alt={`${tenDongXe} ${maCauHinh}`} className="max-h-full w-auto object-contain" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                    <Eyebrow>Cấu hình chính thức / {maCauHinh}</Eyebrow>
                    <SectionHeading as="h3" className="mt-2">
                        {tenDongXe}
                    </SectionHeading>

                    <div className="mt-4 space-y-1 text-base leading-6 text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
                        <p>{mauSac} · {tuyChon}</p>
                        <p>Lưu ngày {formatSavedDate(ngayLuu)}</p>
                    </div>

                    <div className="my-6 border-t border-lambo-pressed" />

                    <ul className="grid grid-cols-3 gap-4">
                        {specs.map(({ value, label }) => (
                            <li key={label}>
                                <p className="font-barlow text-4xl font-semibold leading-10 text-lambo-secondary">{value}</p>
                                <p className="mt-1 text-xs uppercase leading-4 text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
                                    {label}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-4 text-xs leading-4 text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
                        Bản cấu hình tham khảo · Giá được Dealer xác nhận.
                    </p>

                    <Button
                        as="link"
                        to={`/configurator/${maXe}`}
                        className="mt-6 h-10! w-full justify-center"
                        icon={<ArrowUpRight className="h-4 w-4" />}
                    >
                        Xem cấu hình
                    </Button>
                </div>
            </div>

            <div className="mt-11 flex gap-6">
                <Button
                    variant="light"
                    className="flex-1 justify-center"
                    icon={<Download className="h-4 w-4" />}
                    iconPosition="left"
                >
                    Xuất / Chia sẻ
                </Button>
                <Button variant="light" className="flex-1 justify-center">
                    Tùy chỉnh
                </Button>
            </div>
        </article>
    )
}
