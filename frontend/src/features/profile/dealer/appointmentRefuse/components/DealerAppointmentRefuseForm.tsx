import { Field, Input, Textarea } from '../../../../../components/ui/FormField'

interface DealerAppointmentRefuseFormProps {
    value: string
    onChange: (value: string) => void
}

export function DealerAppointmentRefuseForm({ value, onChange }: DealerAppointmentRefuseFormProps) {
    return (
        <div className="flex flex-col gap-8">
            <Field id="lyDoTuChoi" label="Lý do từ chối" required>
                <Textarea
                    id="lyDoTuChoi"
                    rows={5}
                    placeholder="Nhập lý do từ chối lịch hẹn"
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </Field>

            <Field id="deXuatThoiGian" label="Đề xuất thời gian khác (không bắt buộc)">
                <Input id="deXuatThoiGian" placeholder="dd/mm/yyyy · hh:mm – hh:mm" />
            </Field>
        </div>
    )
}
