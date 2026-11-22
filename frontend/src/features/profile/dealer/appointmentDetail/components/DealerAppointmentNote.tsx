import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { Field, Textarea } from '../../../../../components/ui/FormField'

interface DealerAppointmentNoteProps {
    customerMessage: string
    note: string
    onNoteChange: (value: string) => void
}

export function DealerAppointmentNote({ customerMessage, note, onNoteChange }: DealerAppointmentNoteProps) {
    return (
        <section className="mt-12">
            <Eyebrow>Lời nhắn từ khách hàng</Eyebrow>
            <p className="mt-4 font-barlow text-lg leading-7 text-lambo-secondary">“{customerMessage}”</p>

            <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end">
                <div className="min-w-0 flex-1">
                    <Field id="dealer-appointment-note" label="Ghi chú nội bộ">
                        <Textarea
                            id="dealer-appointment-note"
                            value={note}
                            onChange={(event) => onNoteChange(event.target.value)}
                            rows={2}
                            className="resize-none py-3"
                        />
                    </Field>
                </div>
                <Button variant="light" className="h-10 w-full justify-center md:w-[228px]">
                    Lưu ghi chú
                </Button>
            </div>
        </section>
    )
}
