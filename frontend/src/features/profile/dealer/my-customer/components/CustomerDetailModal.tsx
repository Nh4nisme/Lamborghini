import { useEffect, useState } from 'react'
import { X, User, Phone, Mail, Car, Calendar, ShieldCheck } from 'lucide-react'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { http } from '../../../../../api/http'
import type { CustomerProfileDTO } from '../../../user/account/types'

interface CustomerDetailModalProps {
    isOpen: boolean
    onClose: () => void
    customerId: number | null
    dongXeQuanTam?: string
    maHoSo?: string
}

interface TaiKhoanResponse {
    maTaiKhoan: number
    hoTen: string
    email: string
    sdt: string
    vaiTro: string
    trangThai: string
    ngayTao: string
}

export function CustomerDetailModal({
    isOpen,
    onClose,
    customerId,
    dongXeQuanTam,
    maHoSo,
}: CustomerDetailModalProps) {
    const [data, setData] = useState<CustomerProfileDTO | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isOpen || !customerId) {
            setData(null)
            setError(null)
            return
        }

        let isMounted = true
        setIsLoading(true)
        setError(null)

        http<TaiKhoanResponse>(`/taikhoan/${customerId}`)
            .then((res) => {
                if (!isMounted) return
                const [ho, ...tenParts] = (res.hoTen || '').split(' ')
                setData({
                    maKhachHang: res.maTaiKhoan,
                    ho: ho || '',
                    ten: tenParts.join(' ') || '',
                    email: res.email,
                    soDienThoai: res.sdt,
                    quocGia: 'Việt Nam',
                    tinhThanhPho: 'Hồ Chí Minh',
                    diaChi: 'Hồ Chí Minh, Việt Nam',
                    nhanThongTinTiepThi: false,
                })
            })
            .catch((err) => {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : 'Không lấy được dữ liệu khách hàng')
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [isOpen, customerId])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg border border-lambo-primary bg-lambo-tertiary p-6 sm:p-8 shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-lambo-pressed pb-4">
                    <div>
                        <Eyebrow>Hồ sơ khách hàng</Eyebrow>
                        <h2 className="mt-1 font-barlow text-xl sm:text-2xl font-bold uppercase text-lambo-secondary">
                            {data ? `${data.ho} ${data.ten}` : 'Chi tiết khách hàng'}
                        </h2>
                        {maHoSo && (
                            <span className="font-barlow text-xs font-semibold uppercase tracking-[0.08em] text-lambo-primary">
                                {maHoSo}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Đóng"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center border border-lambo-pressed text-lambo-hover hover:border-lambo-primary hover:text-lambo-primary transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="mt-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="border border-red-800 bg-red-950/40 p-4 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {!isLoading && !error && !data && (
                        <div className="border border-lambo-pressed bg-lambo-bold-black p-4 text-sm text-lambo-hover text-center">
                            Không có data
                        </div>
                    )}

                    {!isLoading && !error && data && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                    <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                        <User className="h-3.5 w-3.5 text-lambo-primary" />
                                        <span>Họ và tên</span>
                                    </div>
                                    <p className="mt-1 font-barlow text-base font-semibold text-lambo-secondary">
                                        {data.ho} {data.ten}
                                    </p>
                                </div>

                                <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                    <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                        <Phone className="h-3.5 w-3.5 text-lambo-primary" />
                                        <span>Số điện thoại</span>
                                    </div>
                                    <p className="mt-1 font-barlow text-base font-semibold text-lambo-secondary">
                                        {data.soDienThoai || 'Chưa cập nhật'}
                                    </p>
                                </div>
                            </div>

                            <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                    <Mail className="h-3.5 w-3.5 text-lambo-primary" />
                                    <span>Email</span>
                                </div>
                                <p className="mt-1 font-barlow text-base font-semibold text-lambo-secondary">
                                    {data.email}
                                </p>
                            </div>

                            {dongXeQuanTam && (
                                <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                    <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                        <Car className="h-3.5 w-3.5 text-lambo-primary" />
                                        <span>Dòng xe quan tâm</span>
                                    </div>
                                    <p className="mt-1 font-barlow text-base font-semibold text-lambo-primary">
                                        {dongXeQuanTam}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                    <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                        <Calendar className="h-3.5 w-3.5 text-lambo-primary" />
                                        <span>Khu vực</span>
                                    </div>
                                    <p className="mt-1 font-barlow text-sm text-lambo-secondary">
                                        {data.tinhThanhPho}, {data.quocGia}
                                    </p>
                                </div>

                                <div className="border border-lambo-pressed bg-lambo-bold-black p-4">
                                    <div className="flex items-center gap-2 text-xs text-lambo-hover">
                                        <ShieldCheck className="h-3.5 w-3.5 text-lambo-primary" />
                                        <span>Trạng thái tài khoản</span>
                                    </div>
                                    <p className="mt-1 font-barlow text-sm text-emerald-400">
                                        Đang hoạt động
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
