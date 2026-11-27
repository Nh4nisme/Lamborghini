import { useState } from 'react'
import { Calendar, Clock, FileText, Mail, MapPin, Phone, User, X } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { useAppointmentDetail, useCancelAppointment } from '../hooks'
import type { Appointment } from '../types'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'

interface AppointmentDetailModalProps {
    appointment: Appointment | null
    onClose: () => void
}

export function AppointmentDetailModal({ appointment, onClose }: AppointmentDetailModalProps) {
    const [showConfirmCancel, setShowConfirmCancel] = useState(false)
    const cancelMutation = useCancelAppointment()
    const { data: detail, isLoading, isError } = useAppointmentDetail(appointment?.id ?? null)

    if (!appointment) return null

    const canCancel = appointment.tab === 'UPCOMING'

    const handleConfirmCancel = () => {
        cancelMutation.mutate(appointment.id, {
            onSuccess: () => {
                setShowConfirmCancel(false)
                onClose()
            },
        })
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Chi tiết lịch hẹn"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg border border-lambo-primary bg-lambo-tertiary p-6 sm:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-lambo-pressed pb-4">
                    <div>
                        <Eyebrow>Chi tiết lịch hẹn · {appointment.code}</Eyebrow>
                        <h2 className="mt-1 font-barlow text-xl sm:text-2xl font-bold uppercase text-lambo-secondary">
                            {appointment.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Đóng chi tiết lịch hẹn"
                        className="p-1 text-lambo-hover transition-colors hover:text-lambo-secondary cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between border-b border-lambo-pressed/60 pb-3">
                        <span className="text-lambo-hover">Trạng thái</span>
                        <AppointmentStatusBadge status={appointment.status} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-lambo-primary" aria-hidden="true" />
                            <div>
                                <div className="text-xs uppercase tracking-[0.08em] text-lambo-hover">Ngày hẹn</div>
                                <div className="mt-0.5 font-medium text-lambo-secondary">{appointment.dateLabel}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lambo-primary" aria-hidden="true" />
                            <div>
                                <div className="text-xs uppercase tracking-[0.08em] text-lambo-hover">Khung giờ</div>
                                <div className="mt-0.5 font-medium text-lambo-secondary">{detail?.khungGio || appointment.timeLabel}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lambo-primary" aria-hidden="true" />
                        <div>
                            <div className="text-xs uppercase tracking-[0.08em] text-lambo-hover">Showroom & Tư vấn viên</div>
                            <div className="mt-0.5 font-medium text-lambo-secondary">
                                {detail ? `${detail.showroom} / ${detail.tenDealer || 'Đang phân công'}` : appointment.venue}
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="border-t border-lambo-pressed/60 pt-3 text-xs text-lambo-hover">
                            Đang tải thêm thông tin liên hệ và ghi chú...
                        </div>
                    )}

                    {isError && (
                        <div className="border-t border-lambo-pressed/60 pt-3 text-xs text-red-400">
                            Không tải được chi tiết ghi chú từ máy chủ.
                        </div>
                    )}

                    {detail && (
                        <div className="space-y-3 border-t border-lambo-pressed/60 pt-4">
                            {(detail.tenKhachHang || detail.soDienThoai || detail.email) && (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {detail.tenKhachHang && (
                                        <div className="flex items-center gap-2 text-lambo-secondary">
                                            <User className="h-3.5 w-3.5 shrink-0 text-lambo-primary" aria-hidden="true" />
                                            <span>{detail.tenKhachHang}</span>
                                        </div>
                                    )}
                                    {detail.soDienThoai && (
                                        <div className="flex items-center gap-2 text-lambo-secondary">
                                            <Phone className="h-3.5 w-3.5 shrink-0 text-lambo-primary" aria-hidden="true" />
                                            <span>{detail.soDienThoai}</span>
                                        </div>
                                    )}
                                    {detail.email && (
                                        <div className="flex items-center gap-2 text-lambo-secondary sm:col-span-2">
                                            <Mail className="h-3.5 w-3.5 shrink-0 text-lambo-primary" aria-hidden="true" />
                                            <span>{detail.email}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-lambo-primary" aria-hidden="true" />
                                <div>
                                    <div className="text-xs uppercase tracking-[0.08em] text-lambo-hover">Ghi chú / Lời nhắn</div>
                                    <div className="mt-0.5 text-lambo-secondary">
                                        {detail.loiNhanKhachHang?.trim() || 'Không có ghi chú'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {cancelMutation.isError && (
                        <p className="text-sm text-red-400">Không thể hủy lịch hẹn. Vui lòng thử lại sau.</p>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-lambo-pressed pt-4">
                    {canCancel && !showConfirmCancel && (
                        <Button type="button" variant="light" onClick={() => setShowConfirmCancel(true)}>
                            Hủy lịch
                        </Button>
                    )}

                    {canCancel && showConfirmCancel && (
                        <>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleConfirmCancel}
                                disabled={cancelMutation.isPending}
                            >
                                {cancelMutation.isPending ? 'Đang hủy...' : 'Xác nhận hủy'}
                            </Button>
                            <Button
                                type="button"
                                variant="light"
                                onClick={() => setShowConfirmCancel(false)}
                                disabled={cancelMutation.isPending}
                            >
                                Giữ lịch
                            </Button>
                        </>
                    )}

                    <Button type="button" variant="primary" onClick={onClose}>
                        Đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}
