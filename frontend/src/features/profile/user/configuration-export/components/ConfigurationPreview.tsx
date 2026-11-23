import { Check } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'
import type { ExportConfiguration } from '../types'

interface ConfigurationPreviewProps {
    configuration: ExportConfiguration
}

export function ConfigurationPreview({ configuration }: ConfigurationPreviewProps) {
    const { tenDongXe, maCauHinh, ngayLuu, cauHinhTomTat, hinhAnh } = configuration

    return (
        <section className="flex flex-col">
            <div
                data-node-id="226:5827"
                className="flex h-[292px] items-center justify-center border border-lambo-pressed bg-lambo-tertiary p-6"
            >
                <img src={hinhAnh} alt={`${tenDongXe} ${maCauHinh}`} className="max-h-full w-auto object-contain" />
            </div>

            <SectionHeading as="h2" className="mt-8">
                {tenDongXe}
            </SectionHeading>

            <Eyebrow className="mt-4">
                {maCauHinh} / Lưu ngày {ngayLuu}
            </Eyebrow>

            <div className="mt-8 text-lg leading-7 text-lambo-secondary">
                {cauHinhTomTat.map((line) => (
                    <p key={line}>{line}</p>
                ))}
            </div>

            <Button
                variant="light"
                className="mt-14 w-full max-w-[316px] justify-center"
                icon={<Check className="h-4 w-4" />}
                iconPosition="left"
                data-node-id="226:5831"
            >
                Đã lưu chính thức
            </Button>
        </section>
    )
}
