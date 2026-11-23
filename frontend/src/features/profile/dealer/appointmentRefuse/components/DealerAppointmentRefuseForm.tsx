import { Field, Input, Textarea } from '../../../../../components/ui/FormField'

export function DealerAppointmentRefuseForm() {
    return (
        <div className="flex flex-col gap-8">
            <Field id="lyDoTuChoi" label="Lý do từ chối" required>
                <Textarea
                    id="lyDoTuChoi"
                    rows={5}
                    placeholder="Nhập lý do từ chối lịch hẹn"
                    required
                />
            </Field>

            <Field id="deXuatThoiGian" label="Đề xuất thời gian khác (không bắt buộc)">
                <Input id="deXuatThoiGian" placeholder="dd/mm/yyyy · hh:mm – hh:mm" />
            </Field>
        </div>
    )
}
