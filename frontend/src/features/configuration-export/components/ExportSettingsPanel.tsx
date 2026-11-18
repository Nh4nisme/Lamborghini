import { Download } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { Field, Input, Select } from '../../../components/ui/FormField'
import { EXPORT_FORMAT_OPTIONS } from '../data'

interface ExportSettingsPanelProps {
    format: string
    onFormatChange: (value: string) => void
    includeOptions: boolean
    onIncludeOptionsChange: (checked: boolean) => void
    shareLink: string
    onCopyLink: () => void
}

export function ExportSettingsPanel({
    format,
    onFormatChange,
    includeOptions,
    onIncludeOptionsChange,
    shareLink,
    onCopyLink,
}: ExportSettingsPanelProps) {
    return (
        <aside data-node-id="226:5832" className="border border-lambo-pressed bg-lambo-tertiary p-6">
            <h2
                data-node-id="226:5833"
                className="font-barlow text-[28px] font-semibold uppercase leading-8 text-lambo-secondary"
            >
                Mang dấu ấn của bạn
            </h2>

            <div className="mt-11">
                <Field id="dinhDangXuat" label="Định dạng xuất">
                    <Select
                        id="dinhDangXuat"
                        data-node-id="226:5834"
                        value={format}
                        onChange={(e) => onFormatChange(e.target.value)}
                    >
                        {EXPORT_FORMAT_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </Select>
                </Field>
            </div>

            <label className="mt-11 flex items-center gap-3 text-sm text-lambo-secondary">
                <input
                    type="checkbox"
                    data-node-id="226:5835"
                    checked={includeOptions}
                    onChange={(e) => onIncludeOptionsChange(e.target.checked)}
                    className="h-5 w-5 accent-lambo-primary"
                />
                Bao gồm danh sách tùy chọn
            </label>

            <Button
                variant="primary"
                className="mt-12 h-10! w-full justify-center"
                icon={<Download className="h-4 w-4" />}
                iconPosition="left"
                data-node-id="226:5836"
            >
                Tải bản cấu hình
            </Button>

            <div className="mt-10">
                <Eyebrow>Chia sẻ cấu hình</Eyebrow>
            </div>

            <div className="mt-6">
                <Field id="lienKetChiXem" label="Liên kết chỉ xem">
                    <Input id="lienKetChiXem" data-node-id="226:5838" value={shareLink} readOnly />
                </Field>
            </div>

            <Button
                variant="light"
                className="mt-8 w-full justify-center"
                onClick={onCopyLink}
                data-node-id="226:5839"
            >
                Sao chép liên kết
            </Button>

            <p className="mt-7 text-xs text-lambo-hover" data-node-id="226:5840">
                Không chia sẻ thông tin cá nhân của bạn.
            </p>
        </aside>
    )
}
