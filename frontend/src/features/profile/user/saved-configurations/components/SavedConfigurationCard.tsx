import { Copy } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'
import type { SavedConfigurationDTO } from '../types'

interface SavedConfigurationCardProps {
    configuration: SavedConfigurationDTO
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

const formatDate = (isoDate: string) =>
    isoDate ? isoDate.slice(0, 10).split('-').reverse().join('/') : '—'

export function SavedConfigurationCard({ configuration }: SavedConfigurationCardProps) {
    const { maCauHinh, tenCauHinh, tongGia, ngayTao, maChiaSe } = configuration

    const handleCopyShare = () => {
        if (maChiaSe) {
            navigator.clipboard.writeText(maChiaSe)
        }
    }

    return (
        <article className="flex flex-col border border-lambo-pressed bg-lambo-tertiary">
            {/* Header */}
            <div className="p-6 border-b border-lambo-pressed">
                <Eyebrow>Cấu hình #{maCauHinh}</Eyebrow>
                <SectionHeading as="h3" className="mt-2 break-words">
                    {tenCauHinh}
                </SectionHeading>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                {/* Price */}
                <div>
                    <p className="text-xs uppercase tracking-widest text-lambo-hover font-barlow">Tổng giá trị</p>
                    <p className="mt-1 font-barlow text-2xl font-semibold text-lambo-primary">
                        {formatPrice(tongGia)}
                    </p>
                </div>

                {/* Date */}
                <div>
                    <p className="text-xs uppercase tracking-widest text-lambo-hover font-barlow">Ngày lưu</p>
                    <p className="mt-1 text-sm text-lambo-secondary">{formatDate(ngayTao)}</p>
                </div>

                {/* Share code */}
                {maChiaSe && (
                    <div>
                        <p className="text-xs uppercase tracking-widest text-lambo-hover font-barlow">Mã chia sẻ</p>
                        <div className="mt-1 flex items-center gap-2">
                            <code className="flex-1 truncate rounded border border-lambo-pressed bg-lambo-bold-black px-3 py-1 text-xs text-lambo-primary font-mono">
                                {maChiaSe}
                            </code>
                            <button
                                type="button"
                                onClick={handleCopyShare}
                                className="shrink-0 p-1 text-lambo-hover hover:text-lambo-primary transition-colors cursor-pointer"
                                title="Sao chép mã chia sẻ"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="border-t border-lambo-pressed" />

                <Button
                    variant="light"
                    className="w-full justify-center"
                >
                    Tùy chỉnh lại
                </Button>
            </div>
        </article>
    )
}
