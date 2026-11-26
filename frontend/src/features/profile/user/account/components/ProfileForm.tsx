import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Field, Input } from '../../../../../components/ui/FormField'
import { useUpdateProfile } from '../hooks'
import type { CustomerProfileDTO } from '../types'

interface ProfileFormProps {
    initialValues: CustomerProfileDTO
}

export function ProfileForm({ initialValues }: ProfileFormProps) {
    const [form, setForm] = useState(initialValues)
    const updateMutation = useUpdateProfile()

    const setField = <K extends keyof CustomerProfileDTO>(key: K, value: CustomerProfileDTO[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateMutation.mutate(form)
    }

    return (
        <form data-node-id="226:5790" onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-6">
                <Field id="ho" label="Họ" required>
                    <Input id="ho" value={form.ho} onChange={(e) => setField('ho', e.target.value)} required />
                </Field>

                <Field id="ten" label="Tên" required>
                    <Input id="ten" value={form.ten} onChange={(e) => setField('ten', e.target.value)} required />
                </Field>

                <Field id="email" label="Email" required>
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
            </div>

            <label className="flex items-center gap-3 text-sm text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
                <input
                    type="checkbox"
                    checked={form.nhanThongTinTiepThi}
                    onChange={(e) => setField('nhanThongTinTiepThi', e.target.checked)}
                    className="h-5 w-5 accent-lambo-primary"
                />
                Nhận thông tin về mẫu xe và sự kiện độc quyền.
            </label>

            <div className="flex flex-wrap items-center gap-3" data-node-id="226:5798">
                <Button type="submit" variant="primary" disabled={updateMutation.isPending}>
                    Lưu thay đổi
                </Button>
                <Button variant="light" onClick={() => setForm(initialValues)}>
                    Hủy
                </Button>
            </div>

            {updateMutation.isError && (
                <p className="text-sm text-red-400">Không thể lưu thay đổi. Vui lòng thử lại sau.</p>
            )}
            {updateMutation.isSuccess && (
                <p className="text-sm text-lambo-hover">Đã lưu thay đổi.</p>
            )}
        </form>
    )
}
