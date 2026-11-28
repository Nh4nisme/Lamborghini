import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { CarConfiguration } from '../types'
import { calculatePriceBreakdown, formatCurrency } from '../utils/pricing'
import { playUiClick } from '../audio/engineAudio'
import { X, Printer, MapPin, Phone } from 'lucide-react'

interface SummaryModalProps {
    config: CarConfiguration
    isOpen: boolean
    onClose: () => void
}

interface SpecRow {
    label: string
    detail: string
    price: number
    zeroLabel: string
    swatchHex?: string
}

// ─── Dedicated Print Document (rendered via portal, shown only @media print) ───
const PrintArea: React.FC<{
    config: CarConfiguration
    specRows: SpecRow[]
    breakdown: ReturnType<typeof calculatePriceBreakdown>
    optionsTotal: number
    issueDate: string
    isVN: boolean
}> = ({ config, specRows, breakdown, optionsTotal, issueDate, isVN }) => {
    const left = specRows.filter((_, i) => i % 2 === 0)
    const right = specRows.filter((_, i) => i % 2 !== 0)

    return createPortal(
        <div
            id="lambo-print-area"
            style={{
                display: 'none',
                fontFamily: "Barlow, Arial, sans-serif",
                color: '#111',
                background: '#fff',
                width: '100%',
            }}
        >
            {/* Force Barlow font available for print */}
            <style>{`
                #lambo-print-area { font-family: Barlow, Arial, sans-serif !important; }
                #lambo-print-area .pc { font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif !important; }
            `}</style>
            {/* ── Header ── */}
            <div style={{ borderBottom: '2px solid #D8A016', paddingBottom: 10, marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 4 }}>
                        AUTOMOBILI LAMBORGHINI S.P.A.
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', fontFamily: "Barlow Condensed, 'Arial Narrow', Arial, sans-serif", lineHeight: 1.1 }}>
                        {isVN ? `BẢNG ĐẶC TẢ CẤU HÌNH · ${config.model.toUpperCase()}` : `CONFIGURATION SPECIFICATION · ${config.model.toUpperCase()}`}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6b7280' }}>
                        {isVN ? 'NGÀY LẬP PHIẾU' : 'ISSUE DATE'}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'monospace', marginTop: 2 }}>{issueDate}</div>
                </div>
            </div>

            {/* ── Performance Strip ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 20px', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #d1d5db' }}>
                {[
                    { label: isVN ? 'CÔNG SUẤT TỐI ĐA' : 'MAX. POWER', value: '1015 CV', sub: '6.5L V12 + 3 e-Motors' },
                    { label: isVN ? 'TĂNG TỐC 0–100 KM/H' : 'ACCELERATION 0–100', value: '2.5 s', sub: 'Launch Control Corsa' },
                    { label: isVN ? 'TỐC ĐỘ TỐI ĐA' : 'TOP SPEED', value: '> 350 km/h', sub: '217 mph aero mode' },
                    { label: isVN ? 'HỘP SỐ TRUYỀN ĐỘNG' : 'TRANSMISSION', value: '8-Speed DCT', sub: isVN ? 'Ly hợp kép 8 cấp' : 'Dual-clutch transverse' },
                ].map((m) => (
                    <div key={m.label}>
                        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "Barlow Condensed, 'Arial Narrow', Arial, sans-serif", lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>{m.sub}</div>
                    </div>
                ))}
            </div>

            {/* ── Spec Table Header ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6, marginBottom: 2, borderBottom: '1px solid #111' }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {isVN ? 'CHI TIẾT TRANG BỊ & TÙY CHỌN' : 'SELECTED SPECIFICATIONS & OPTIONS'}
                </div>
                <div style={{ fontSize: 9, fontFamily: 'monospace', color: '#6b7280', textTransform: 'uppercase' }}>
                    {isVN ? `${specRows.length} HẠNG MỤC` : `${specRows.length} ITEMS`}
                </div>
            </div>

            {/* ── Spec Rows: 2-col table ── */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
                <tbody>
                    {Array.from({ length: Math.max(left.length, right.length) }).map((_, i) => {
                        const l = left[i]
                        const r = right[i]
                        return (
                            <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {/* left cell */}
                                <td style={{ width: '50%', padding: '7px 10px 7px 0', verticalAlign: 'middle', borderRight: '1px solid #e5e7eb' }}>
                                    {l && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                                {l.swatchHex && (
                                                    <span style={{ width: 11, height: 11, flexShrink: 0, backgroundColor: l.swatchHex, border: '1px solid #9ca3af', display: 'inline-block' }} />
                                                )}
                                                <div>
                                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l.label}</div>
                                                    <div style={{ fontSize: 8.5, color: '#6b7280', marginTop: 1 }}>{l.detail}</div>
                                                </div>
                                            </div>
                                            <div style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: l.price > 0 ? 700 : 400, color: l.price > 0 ? '#111' : '#6b7280', whiteSpace: 'nowrap', paddingLeft: 8 }}>
                                                {l.price === 0 ? l.zeroLabel : `+${formatCurrency(l.price, config.currency, config.language)}`}
                                            </div>
                                        </div>
                                    )}
                                </td>
                                {/* right cell */}
                                <td style={{ width: '50%', padding: '7px 0 7px 12px', verticalAlign: 'middle' }}>
                                    {r && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                                {r.swatchHex && (
                                                    <span style={{ width: 11, height: 11, flexShrink: 0, backgroundColor: r.swatchHex, border: '1px solid #9ca3af', display: 'inline-block' }} />
                                                )}
                                                <div>
                                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{r.label}</div>
                                                    <div style={{ fontSize: 8.5, color: '#6b7280', marginTop: 1 }}>{r.detail}</div>
                                                </div>
                                            </div>
                                            <div style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: r.price > 0 ? 700 : 400, color: r.price > 0 ? '#111' : '#6b7280', whiteSpace: 'nowrap', paddingLeft: 8 }}>
                                                {r.price === 0 ? r.zeroLabel : `+${formatCurrency(r.price, config.currency, config.language)}`}
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* ── Price Summary ── */}
            <div style={{ borderTop: '1px solid #d1d5db', paddingTop: 10, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6b7280', marginBottom: 5 }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isVN ? 'Giá tiêu chuẩn xe (Base MSRP)' : 'Base Vehicle MSRP'}</span>
                    <span style={{ fontFamily: 'monospace' }}>{formatCurrency(breakdown.basePrice, config.currency, config.language)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6b7280', marginBottom: 10 }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isVN ? 'Tổng trang bị tùy chọn (Options Total)' : 'Options Total'}</span>
                    <span style={{ fontFamily: 'monospace' }}>+{formatCurrency(optionsTotal, config.currency, config.language)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '2px solid #111', paddingTop: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "Barlow Condensed, 'Arial Narrow', Arial, sans-serif" }}>
                        {isVN ? 'TỔNG GIÁ TRỊ DỰ KIẾN' : 'TOTAL ESTIMATED PRICE'}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 800 }}>
                        {formatCurrency(breakdown.totalPrice, config.currency, config.language)}
                    </span>
                </div>
            </div>

            {/* ── Footer / Dealership ── */}
            <div style={{ borderTop: '1px solid #d1d5db', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {isVN ? '⊕ ĐẠI LÝ ỦY QUYỀN CHÍNH THỨC LAMBORGHINI VIỆT NAM' : '⊕ OFFICIAL LAMBORGHINI AUTHORIZED DEALERSHIP'}
                    </div>
                    <div style={{ fontSize: 8.5, color: '#6b7280' }}>
                        {isVN
                            ? 'Showroom TP. Hồ Chí Minh · Quận 7  /  Showroom Hà Nội · Quận Hoàn Kiếm'
                            : 'Via Modena 12, Sant\'Agata Bolognese (BO), Italy'}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 8, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {isVN ? 'Giá tham khảo, chưa bao gồm thuế và phí' : 'Estimated price, taxes & fees not included'}
                    </div>
                    <div style={{ fontSize: 8, color: '#9ca3af', marginTop: 2 }}>
                        automobili-lamborghini.com
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
    config,
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate()

    if (!isOpen) return null

    const breakdown = calculatePriceBreakdown(config)
    const isVN = config.currency === 'VND' || config.language === 'VIE'

    const printSpecSheet = () => {
        window.print()
    }

    const specRows: SpecRow[] = [
        {
            label: isVN ? 'Màu sơn ngoại thất' : 'Exterior Paint',
            detail: `${config.exteriorColor.name} · ${config.exteriorColor.finish.toUpperCase()}`,
            price: breakdown.exteriorColorPrice,
            zeroLabel: isVN ? 'Tiêu chuẩn' : 'Standard',
            swatchHex: config.exteriorColor.hex,
        },
        {
            label: isVN ? 'Mâm xe' : 'Wheels',
            detail: `${config.rim.name} · ${config.rim.size}`,
            price: breakdown.rimPrice,
            zeroLabel: isVN ? 'Tiêu chuẩn' : 'Standard',
        },
        {
            label: isVN ? 'Chất liệu & đường chỉ nội thất' : 'Cockpit Leather & Stitching',
            detail: config.interiorTrim.name,
            price: breakdown.interiorTrimPrice,
            zeroLabel: isVN ? 'Tiêu chuẩn' : 'Standard',
        },
        {
            label: isVN ? 'Kẹp phanh' : 'Brake Calipers',
            detail: config.caliper.name,
            price: breakdown.caliperPrice,
            zeroLabel: isVN ? 'Tiêu chuẩn' : 'Standard',
            swatchHex: config.caliper.hex,
        },
        ...(config.tire
            ? [
                  {
                      label: isVN ? 'Lốp xe' : 'Tires',
                      detail: config.tire.name,
                      price: breakdown.tirePrice,
                      zeroLabel: isVN ? 'Tiêu chuẩn' : 'Standard',
                  },
              ]
            : []),
    ]

    const optionsTotal = breakdown.totalPrice - breakdown.basePrice
    const issueDate = new Date().toLocaleDateString(isVN ? 'vi-VN' : 'en-GB')

    return (
        <>
            {/* ── Dedicated print-only layout (portal → document.body) ── */}
            <PrintArea
                config={config}
                specRows={specRows}
                breakdown={breakdown}
                optionsTotal={optionsTotal}
                issueDate={issueDate}
                isVN={isVN}
            />

            {/* ── On-screen modal (unchanged dark UI) ── */}
            <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 select-none overflow-y-auto"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-4xl bg-[#101110] border border-[#2d302b] overflow-hidden my-auto text-[#f5f5f1]"
                >
                    {/* 1. Header */}
                    <div className="flex items-start justify-between px-6 sm:px-8 py-6 border-b border-[#242623]">
                        <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ea39b]">
                                AUTOMOBILI LAMBORGHINI S.P.A.
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.04em] text-[#f5f5f1] font-barlow leading-tight mt-1">
                                {isVN
                                    ? `BẢNG ĐẶC TẢ CẤU HÌNH · ${config.model.toUpperCase()}`
                                    : `CONFIGURATION SPECIFICATION · ${config.model.toUpperCase()}`}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                onClose()
                                playUiClick()
                            }}
                            className="p-2 text-[#9ea39b] hover:text-white transition-colors cursor-pointer"
                            aria-label={isVN ? 'Đóng' : 'Close'}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 2. Body */}
                    <div className="px-6 sm:px-8 py-6 flex flex-col gap-7 max-h-[80vh] overflow-y-auto">
                        {/* Performance Metrics Strip */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-b border-[#242623]">
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ea39b]">
                                    {isVN ? 'CÔNG SUẤT TỐI ĐA' : 'MAX. POWER'}
                                </div>
                                <div className="text-2xl font-bold text-[#f5f5f1] font-barlow mt-1">1015 CV</div>
                                <div className="text-xs text-[#737770] mt-0.5">6.5L V12 + 3 e-Motors</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ea39b]">
                                    {isVN ? 'TĂNG TỐC 0–100 KM/H' : 'ACCELERATION 0–100'}
                                </div>
                                <div className="text-2xl font-bold text-[#f5f5f1] font-barlow mt-1">2.5 s</div>
                                <div className="text-xs text-[#737770] mt-0.5">Launch Control Corsa</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ea39b]">
                                    {isVN ? 'TỐC ĐỘ TỐI ĐA' : 'TOP SPEED'}
                                </div>
                                <div className="text-2xl font-bold text-[#f5f5f1] font-barlow mt-1">&gt; 350 km/h</div>
                                <div className="text-xs text-[#737770] mt-0.5">217 mph aero mode</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ea39b]">
                                    {isVN ? 'HỘP SỐ' : 'TRANSMISSION'}
                                </div>
                                <div className="text-2xl font-bold text-[#f5f5f1] font-barlow mt-1">8-Speed DCT</div>
                                <div className="text-xs text-[#737770] mt-0.5">
                                    {isVN ? 'Ly hợp kép 8 cấp' : 'Dual-clutch transverse'}
                                </div>
                            </div>
                        </div>

                        {/* Print Action */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={printSpecSheet}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#343831] hover:border-[#6b7068] text-xs font-semibold uppercase tracking-[0.12em] text-[#f5f5f1] transition-colors cursor-pointer"
                            >
                                <Printer className="w-3.5 h-3.5" />
                                <span>{isVN ? 'IN BẢNG BÁO GIÁ' : 'PRINT SHEET'}</span>
                            </button>
                        </div>

                        {/* Specification Table */}
                        <div>
                            <div className="flex items-center justify-between pb-3 border-b border-[#2d302b]">
                                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5f5f1]">
                                    {isVN ? 'CHI TIẾT TRANG BỊ & TÙY CHỌN' : 'SELECTED SPECIFICATIONS & OPTIONS'}
                                </h3>
                                <span className="text-[11px] font-mono text-[#9ea39b] uppercase">
                                    {isVN ? `${specRows.length} HẠNG MỤC` : `${specRows.length} ITEMS`}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                {specRows.map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex items-center justify-between py-3.5 border-b border-[#1f211e]"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 pr-3">
                                            {row.swatchHex && (
                                                <span
                                                    className="w-3.5 h-3.5 shrink-0 border border-white/30"
                                                    style={{ backgroundColor: row.swatchHex }}
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold text-[#f5f5f1] uppercase tracking-[0.06em] truncate">
                                                    {row.label}
                                                </div>
                                                <div className="text-[11px] text-[#9ea39b] truncate mt-0.5">
                                                    {row.detail}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`font-mono text-xs whitespace-nowrap shrink-0 ${
                                                row.price > 0
                                                    ? 'font-semibold text-[#f5f5f1]'
                                                    : 'text-[#737770]'
                                            }`}
                                        >
                                            {row.price === 0
                                                ? row.zeroLabel
                                                : `+${formatCurrency(row.price, config.currency, config.language)}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="pt-2 flex flex-col gap-2.5">
                            <div className="flex items-center justify-between text-xs text-[#9ea39b]">
                                <span className="uppercase tracking-[0.12em]">
                                    {isVN ? 'Giá tiêu chuẩn xe' : 'Base Vehicle MSRP'}
                                </span>
                                <span className="font-mono">
                                    {formatCurrency(breakdown.basePrice, config.currency, config.language)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#9ea39b]">
                                <span className="uppercase tracking-[0.12em]">
                                    {isVN ? 'Tổng trang bị tùy chọn' : 'Options Total'}
                                </span>
                                <span className="font-mono">
                                    +{formatCurrency(optionsTotal, config.currency, config.language)}
                                </span>
                            </div>

                            <div className="flex items-baseline justify-between pt-4 mt-1 border-t border-[#2d302b]">
                                <span className="text-sm font-bold text-[#f5f5f1] uppercase tracking-[0.16em] font-barlow">
                                    {isVN ? 'TỔNG GIÁ TRỊ DỰ KIẾN' : 'TOTAL ESTIMATED PRICE'}
                                </span>
                                <span className="font-mono text-lambo-primary text-2xl font-bold">
                                    {formatCurrency(breakdown.totalPrice, config.currency, config.language)}
                                </span>
                            </div>
                        </div>

                        {/* Retailer Info & CTA */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-5 border-t border-[#242623]">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#9ea39b] shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-[#f5f5f1] uppercase tracking-[0.08em] text-xs">
                                        {isVN
                                            ? 'ĐẠI LÝ ỦY QUYỀN CHÍNH THỨC LAMBORGHINI VIỆT NAM'
                                            : 'OFFICIAL LAMBORGHINI AUTHORIZED DEALERSHIP'}
                                    </div>
                                    <div className="text-[11px] text-[#9ea39b] mt-0.5">
                                        {isVN
                                            ? 'Showroom TP. Hồ Chí Minh · Quận 7 / Showroom Hà Nội · Quận Hoàn Kiếm'
                                            : 'Via Modena 12, Sant\'Agata Bolognese (BO), Italy'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose()
                                        navigate('/showroom')
                                    }}
                                    className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 border border-[#343831] hover:border-lambo-primary text-[#f5f5f1] hover:text-lambo-primary text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                                >
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{isVN ? 'XEM SHOWROOM' : 'FIND SHOWROOM'}</span>
                                </button>

                                <a
                                    href="tel:+842838221888"
                                    className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-lambo-primary hover:bg-lambo-hover text-[#101110] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>{isVN ? 'LIÊN HỆ ĐẶT XE' : 'CONTACT DEALER'}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
