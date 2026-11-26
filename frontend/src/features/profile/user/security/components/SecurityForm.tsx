import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Field, Input } from '../../../../../components/ui/FormField'
import { useChangePassword } from '../hooks'

export function SecurityForm() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const changePasswordMutation = useChangePassword()

    const newPasswordError = newPassword && newPassword.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự' : ''
    const confirmPasswordError =
        confirmPassword && newPassword !== confirmPassword ? 'Mật khẩu xác nhận không khớp' : ''

    const isValid = currentPassword && newPassword.length >= 6 && newPassword === confirmPassword

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isValid) {
            changePasswordMutation.mutate(
                {
                    matKhauHienTai: currentPassword,
                    matKhauMoi: newPassword,
                    xacNhanMatKhauMoi: confirmPassword,
                },
                {
                    onSuccess: () => {
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                    },
                }
            )
        }
    }

    const handleReset = () => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setShowCurrent(false)
        setShowNew(false)
        setShowConfirm(false)
    }

    const errorMessage = changePasswordMutation.error
        ? (changePasswordMutation.error as { status?: number }).status === 401
            ? 'Mật khẩu hiện tại không đúng. Vui lòng thử lại.'
            : 'Không thể đổi mật khẩu. Vui lòng thử lại sau.'
        : ''

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-6">
                <Field id="currentPassword" label="Mật khẩu hiện tại" required>
                    <div className="relative">
                        <Input
                            id="currentPassword"
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-lambo-primary transition-opacity hover:opacity-70"
                            aria-label={showCurrent ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </Field>

                <div />

                <Field id="newPassword" label="Mật khẩu mới" required error={newPasswordError}>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-lambo-primary transition-opacity hover:opacity-70"
                            aria-label={showNew ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </Field>

                <Field id="confirmPassword" label="Xác nhận mật khẩu mới" required error={confirmPasswordError}>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-lambo-primary transition-opacity hover:opacity-70"
                            aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </Field>
            </div>

            <div className="flex flex-wrap gap-4">
                <Button variant="primary" type="submit" disabled={!isValid || changePasswordMutation.isPending}>
                    Đổi mật khẩu
                </Button>
                <Button variant="light" type="button" onClick={handleReset}>
                    Hủy
                </Button>
            </div>

            {changePasswordMutation.isError && <p className="text-sm text-red-400">{errorMessage}</p>}
            {changePasswordMutation.isSuccess && (
                <p className="text-sm text-lambo-hover">Đã đổi mật khẩu thành công.</p>
            )}
        </form>
    )
}
