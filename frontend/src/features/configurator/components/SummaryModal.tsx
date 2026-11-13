import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CarConfiguration } from '../types'
import { calculatePriceBreakdown, formatCurrency, generateConfigCode } from '../utils/pricing'
import { playUiClick } from '../audio/engineAudio'
import { X, Check, Copy, Printer, MapPin, Gauge, Zap, Award, Phone, Shield } from 'lucide-react'

interface SummaryModalProps {
    config: CarConfiguration
    isOpen: boolean
    onClose: () => void
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
    config,
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate()
    const [copied, setCopied] = useState(false)

    if (!isOpen) return null

    const breakdown = calculatePriceBreakdown(config)
    const configCode = generateConfigCode(config)

    const copyConfigCode = () => {
        navigator.clipboard.writeText(configCode)
        setCopied(true)
        playUiClick()
        setTimeout(() => setCopied(false), 2000)
    }

    const printSpecSheet = () => {
        window.print()
    }

    const isVN = config.currency === 'VND' || config.language === 'VIE'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md select-none overflow-y-auto">
            {/* Modal Container: Angular, Sharp, Dark Luxury */}
            <div className="relative w-full max-w-4xl bg-[#090a0d] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto text-white rounded-none">
                {/* 1. Header Bar: Official Lamborghini Title */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0d0e12]">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 border border-amber-400/40 bg-amber-400/10 text-amber-400">
                            <Shield className="w-4 h-4 fill-amber-400/20" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-extrabold uppercase tracking-[0.25em] text-neutral-400 font-barlow">
                                AUTOMOBILI LAMBORGHINI S.P.A.
                            </span>
                            <h2
                                className="text-xl md:text-2xl font-black uppercase tracking-[0.06em] text-white font-barlow leading-none mt-0.5"
                            >
                                {isVN
                                    ? `BẢNG ĐẶC TẢ CẤU HÌNH · ${config.model.toUpperCase()}`
                                    : `OFFICIAL CONFIGURATION SHEET · ${config.model.toUpperCase()}`}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            onClose()
                            playUiClick()
                        }}
                        className="p-2 border border-white/10 text-neutral-400 hover:text-white hover:border-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 2. Modal Body */}
                <div className="p-6 md:p-8 flex flex-col gap-6 max-h-[78vh] overflow-y-auto">
                    {/* Performance Metrics Matrix (Cockpit Corsa Grid) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 bg-[#0d0f14]">
                        <div className="p-4 border-b lg:border-b-0 border-r border-white/10 flex flex-col">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-barlow">
                                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isVN ? 'CÔNG SUẤT TỐI ĐA' : 'MAX. POWER'}</span>
                            </div>
                            <div className="text-2xl font-black text-white font-barlow mt-1.5 tracking-tight">
                                1015 CV
                            </div>
                            <div className="text-[10px] text-neutral-400 font-light mt-0.5">
                                6.5L V12 + 3 e-Motors (HPEV)
                            </div>
                        </div>

                        <div className="p-4 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-barlow">
                                <Zap className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isVN ? 'TĂNG TỐC 0-100 KM/H' : 'ACCELERATION'}</span>
                            </div>
                            <div className="text-2xl font-black text-amber-400 font-barlow mt-1.5 tracking-tight">
                                2.5 s
                            </div>
                            <div className="text-[10px] text-neutral-400 font-light mt-0.5">
                                Launch Control Corsa
                            </div>
                        </div>

                        <div className="p-4 border-r border-white/10 flex flex-col">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-barlow">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isVN ? 'TỐC ĐỘ TỐI ĐA' : 'TOP SPEED'}</span>
                            </div>
                            <div className="text-2xl font-black text-white font-barlow mt-1.5 tracking-tight">
                                &gt; 350 km/h
                            </div>
                            <div className="text-[10px] text-neutral-400 font-light mt-0.5">
                                217 mph aero mode
                            </div>
                        </div>

                        <div className="p-4 flex flex-col">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-barlow">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isVN ? 'HỘP SỐ TRUYỀN ĐỘNG' : 'TRANSMISSION'}</span>
                            </div>
                            <div className="text-xl font-black text-white font-barlow mt-1.5 tracking-tight">
                                8-Speed DCT
                            </div>
                            <div className="text-[10px] text-neutral-400 font-light mt-0.5">
                                Ly hợp kép 8 cấp ngang
                            </div>
                        </div>
                    </div>

                    {/* Lamborghini Code Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#111217] border border-white/10">
                        <div>
                            <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 font-barlow">
                                {isVN ? 'MÃ CẤU HÌNH ĐẶC TẢ (LAMBORGHINI CODE)' : 'BESPOKE CONFIGURATION CODE'}
                            </span>
                            <span className="font-mono text-base md:text-lg font-bold text-amber-400 tracking-wider">
                                {configCode}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={copyConfigCode}
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 border border-white/20 hover:border-amber-400 hover:bg-white/5 text-xs font-bold uppercase tracking-wider text-neutral-200 transition-colors cursor-pointer"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copied ? (isVN ? 'ĐÃ SAO CHÉP' : 'COPIED') : (isVN ? 'SAO CHÉP MÃ' : 'COPY CODE')}</span>
                            </button>

                            <button
                                type="button"
                                onClick={printSpecSheet}
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 border border-white/20 hover:border-white text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors cursor-pointer"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                <Printer className="w-3.5 h-3.5" />
                                <span>{isVN ? 'IN BẢNG BÁO GIÁ' : 'PRINT SHEET'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Detailed Options Table */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-amber-400/30">
                            <h3
                                className="text-xs md:text-sm font-extrabold uppercase tracking-[0.16em] text-white"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                {isVN ? 'CHI TIẾT TRANG BỊ VÀ TÙY CHỌN BỔ SUNG' : 'SELECTED SPECIFICATIONS & OPTIONS'}
                            </h3>
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">
                                8 SELECTED ITEMS
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {/* Exterior Color */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full border border-white/50 shrink-0"
                                        style={{ backgroundColor: config.exteriorColor.hex }}
                                    />
                                    <div>
                                        <div className="font-bold text-white uppercase tracking-wider">
                                            {config.exteriorColor.name}
                                        </div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                            {config.exteriorColor.finish} · {config.exteriorColor.category}
                                        </div>
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.exteriorColorPrice === 0
                                        ? (isVN ? 'Tiêu chuẩn' : 'Standard')
                                        : formatCurrency(breakdown.exteriorColorPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Rims */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        {config.rim.name}
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.rim.size} · {config.rim.finish}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {formatCurrency(breakdown.rimPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Calipers */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3.5 h-3.5 border border-white/40 shrink-0"
                                        style={{ backgroundColor: config.caliper.hex }}
                                    />
                                    <div>
                                        <div className="font-bold text-white uppercase tracking-wider">
                                            Carbon Ceramic Calipers
                                        </div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                            {config.caliper.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.caliperPrice === 0
                                        ? (isVN ? 'Tiêu chuẩn' : 'Standard')
                                        : formatCurrency(breakdown.caliperPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Lower Carbon */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        Lower Aerodynamic Package
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.carbonLower.replace('_', ' ').toUpperCase()}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.carbonLowerPrice === 0
                                        ? (isVN ? 'Đã bao gồm' : 'Included')
                                        : formatCurrency(breakdown.carbonLowerPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Upper Carbon */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        Upper Carbon Roof & Mirrors
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.carbonUpper.replace('_', ' ').toUpperCase()}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.carbonUpperPrice === 0
                                        ? (isVN ? 'Đã bao gồm' : 'Included')
                                        : formatCurrency(breakdown.carbonUpperPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Exhaust */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        Exhaust Tailpipes
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.exhaust.replace('_', ' ').toUpperCase()}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.exhaustPrice === 0
                                        ? (isVN ? 'Tiêu chuẩn' : 'Standard')
                                        : formatCurrency(breakdown.exhaustPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Interior Trim */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        Cockpit Leather & Stitching
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.interiorTrim.name}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.interiorTrimPrice === 0
                                        ? (isVN ? 'Tiêu chuẩn' : 'Standard')
                                        : formatCurrency(breakdown.interiorTrimPrice, config.currency, config.language)}
                                </div>
                            </div>

                            {/* Carbon Interior */}
                            <div className="flex items-center justify-between p-3 bg-[#111216] border border-white/10 hover:border-white/20 transition-colors">
                                <div>
                                    <div className="font-bold text-white uppercase tracking-wider">
                                        Carbon Steering & Corsa Dash
                                    </div>
                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wide">
                                        {config.carbonInterior ? 'F1 Shift LEDs Equipped' : (isVN ? 'Tiêu chuẩn' : 'Standard')}
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-amber-400 whitespace-nowrap ml-2">
                                    {breakdown.carbonInteriorPrice === 0
                                        ? (isVN ? 'Không' : 'No')
                                        : formatCurrency(breakdown.carbonInteriorPrice, config.currency, config.language)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Breakdown Summary */}
                    <div className="p-5 bg-[#0f1015] border border-white/10 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span className="uppercase tracking-wider">
                                {isVN ? 'Giá Tiêu Chuẩn Xe (Base MSRP)' : 'Base Vehicle MSRP'}
                            </span>
                            <span className="font-mono text-neutral-200 font-semibold">
                                {formatCurrency(breakdown.basePrice, config.currency, config.language)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-neutral-400">
                            <span className="uppercase tracking-wider">
                                {isVN ? 'Tổng Trang Bị Tùy Chọn (Options Total)' : 'Custom Equipment & Options'}
                            </span>
                            <span className="font-mono text-amber-400 font-semibold">
                                +{formatCurrency(breakdown.totalPrice - breakdown.basePrice, config.currency, config.language)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/15">
                            <span
                                className="text-sm md:text-base font-black text-white uppercase tracking-[0.14em]"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                {isVN ? 'TỔNG GIÁ TRỊ DỰ KIẾN (TOTAL MSRP)' : 'TOTAL ESTIMATED PRICE'}
                            </span>
                            <span className="font-mono text-amber-400 text-xl md:text-2xl font-black">
                                {formatCurrency(breakdown.totalPrice, config.currency, config.language)}
                            </span>
                        </div>
                    </div>

                    {/* Authorized Retailer Banner & Action Buttons */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 bg-[#111216] border border-amber-400/30">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-white uppercase tracking-wider text-xs">
                                    {isVN
                                        ? 'ĐẠI LÝ ỦY QUYỀN CHÍNH THỨC LAMBORGHINI VIỆT NAM'
                                        : 'OFFICIAL LAMBORGHINI AUTHORIZED DEALERSHIP'}
                                </div>
                                <div className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                                    {isVN
                                        ? 'Showroom TP. Hồ Chí Minh · Quận 7 / Showroom Hà Nội · Quận Hoàn Kiếm'
                                        : 'Via Modena 12, Sant\'Agata Bolognese (BO), Italy / Global Concierge Network'}
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
                                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-5 py-3 border border-amber-400/50 hover:border-amber-400 text-amber-400 hover:bg-amber-400/10 text-xs font-extrabold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{isVN ? 'XEM SHOWROOM' : 'FIND SHOWROOM'}</span>
                            </button>

                            <a
                                href="tel:+842838221888"
                                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-[0.16em] transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{isVN ? 'LIÊN HỆ ĐẶT XE' : 'CONTACT DEALER'}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
