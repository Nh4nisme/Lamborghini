import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Field, Input, Select } from '../../../../../components/ui/FormField'
import { useUpdateDealerProfile } from '../hooks'
import type { DealerProfileDTO } from '../types'

interface DealerInformationFormProps {
    initialValues: DealerProfileDTO
}

export function DealerInformationForm({ initialValues }: DealerInformationFormProps) {
    const [form, setForm] = useState(initialValues)
    const updateMutation = useUpdateDealerProfile()

    const setField = <K extends keyof DealerProfileDTO>(key: K, value: DealerProfileDTO[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateMutation.mutate(form)
    }

    return (
        <form data-node-id="226:6024" onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-6">
                <Field id="hoTen" label="Họ và tên" required>
                    <Input id="hoTen" value={form.hoTen} onChange={(e) => setField('hoTen', e.target.value)} required />
                </Field>

                <Field id="maDealer" label="Mã Dealer">
                    <Input id="maDealer" value={form.maDealer} readOnly />
                </Field>

                <Field id="email" label="Email công việc" required>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setField('email', e.target.value)}
                            className="pr-12"
                            required
                        />
                        <Mail className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-lambo-primary" aria-hidden="true" />
                    </div>
                </Field>

                <Field id="soDienThoai" label="Số điện thoại" required>
                    <Input
                        id="soDienThoai"
                        type="tel"
                        value={form.soDienThoai}
                        onChange={(e) => setField('soDienThoai', e.target.value)}
                        required
                    />
                </Field>

                <Field id="chucDanh" label="Chức danh">
                    <Input id="chucDanh" value={form.chucDanh} onChange={(e) => setField('chucDanh', e.target.value)} />
                </Field>

                <div>
                    <Field id="showroom" label="Showroom được phân công">
                        <Select id="showroom" value={form.showroom} disabled className="opacity-60">
                            <option value={form.showroom}>{form.showroom}</option>
                        </Select>
                    </Field>
                    <p className="mt-2 text-sm text-lambo-primary">
                        Liên hệ Admin để thay đổi showroom hoặc quyền truy cập.
                    </p>
                </div>

                <div className="md:col-span-2">
                    <Field id="gioiThieuNgan" label="Giới thiệu ngắn">
                        <Input
                            id="gioiThieuNgan"
                            value={form.gioiThieuNgan}
                            onChange={(e) => setField('gioiThieuNgan', e.target.value)}
                        />
                    </Field>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Button variant="primary" type="submit" disabled={updateMutation.isPending}>
                    Lưu thay đổi
                </Button>
                <Button variant="light" onClick={() => setForm(initialValues)}>
                    Hủy
                </Button>
            </div>
        </form>
    )
}
