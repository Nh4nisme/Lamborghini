import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Globe, KeyRound, X, Copy, Check, Bookmark, Share2, MessageSquare } from 'lucide-react'
import { StudioScene } from '../features/configurator/3d/StudioScene'
import SaveConfigDrawer from '../features/configurator/components/SaveConfigDrawer'
import {
    useXeConfigurator,
    useTuyChonTheoNhom,
    useSharedConfiguration,
} from '../features/configurator/hooks'
import { getConfigurationByShareCode, saveConfiguration, sendShareEmail } from '../features/configurator/api'
import {
    mapTuyChonToPaintColors,
    mapTuyChonToRims,
    mapTuyChonToInteriorTrims,
    mapTuyChonToCalipers,
    mapTuyChonToTires,
} from '../features/configurator/utils/apiMappers'
import {
    getModelForCarId,
    createDefaultConfig,
    applySharedOptionsToConfig,
} from '../features/configurator/utils/configHelpers'
import { formatCurrency } from '../features/configurator/utils/pricing'
import type { CarConfiguration, TuyChon } from '../features/configurator/types'

type ReviewTab = 'EXTERIOR' | 'INTERIOR' | 'EQUIPMENT'
const EMPTY_OPTIONS: TuyChon[] = []

export default function ConfiguratorIntroPage() {
    const { maXe } = useParams<{ maXe?: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const carId = Number(maXe) || 1
    const shareCodeFromUrl = searchParams.get('code')?.trim().toUpperCase() || null

    const [langBadge, setLangBadge] = useState<'VIE' | 'ENG'>('VIE')
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
    const [codeInput, setCodeInput] = useState('')
    const [codeError, setCodeError] = useState<string | null>(null)
    const [isVerifyingCode, setIsVerifyingCode] = useState(false)

    const [reviewTab, setReviewTab] = useState<ReviewTab>('EXTERIOR')
    const [copiedCode, setCopiedCode] = useState(false)
    const [copiedShareLink, setCopiedShareLink] = useState(false)
    const [isSaveDrawerOpen, setIsSaveDrawerOpen] = useState(false)

    const isLoggedIn = !!localStorage.getItem('accessToken')

    // Fetch car details & all option pools for this carId
    const { data: carData } = useXeConfigurator(carId)
    const { data: rawPaintOptions = EMPTY_OPTIONS } = useTuyChonTheoNhom(carId, 1)
    const { data: rawRimOptions = EMPTY_OPTIONS } = useTuyChonTheoNhom(carId, 2)
    const { data: rawInteriorOptions = EMPTY_OPTIONS } = useTuyChonTheoNhom(carId, 3)
    const { data: rawCaliperOptions = EMPTY_OPTIONS } = useTuyChonTheoNhom(carId, 4)
    const { data: rawTireOptions = EMPTY_OPTIONS } = useTuyChonTheoNhom(carId, 6)

    const apiPaintColors = useMemo(() => mapTuyChonToPaintColors(rawPaintOptions), [rawPaintOptions])
    const apiRims = useMemo(() => mapTuyChonToRims(rawRimOptions), [rawRimOptions])
    const apiInteriorTrims = useMemo(() => mapTuyChonToInteriorTrims(rawInteriorOptions), [rawInteriorOptions])
    const apiCalipers = useMemo(() => mapTuyChonToCalipers(rawCaliperOptions), [rawCaliperOptions])
    const apiTires = useMemo(() => mapTuyChonToTires(rawTireOptions), [rawTireOptions])

    const {
        data: sharedData,
        isLoading: isSharedLoading,
        isError: isSharedError,
    } = useSharedConfiguration(shareCodeFromUrl)

    const [config, setConfig] = useState<CarConfiguration>(() => createDefaultConfig(carId))

    // Reset base config when carId changes
    useEffect(() => {
        const modelData = getModelForCarId(carId)
        const nextModelName = carData?.tenPhienBan ?? 'Lamborghini'
        setConfig((prev) => {
            if (prev.customModelUrl === modelData.url && prev.model === nextModelName) {
                return prev
            }
            return {
                ...createDefaultConfig(carId),
                model: nextModelName,
                customModelUrl: modelData.url,
                customModelName: modelData.name,
            }
        })
    }, [carId, carData?.tenPhienBan])

    // If URL code resolves to a different carId, reload into that carId's URL
    useEffect(() => {
        if (sharedData && sharedData.maXe && sharedData.maXe !== carId) {
            window.location.replace(`/configurator/${sharedData.maXe}?code=${encodeURIComponent(sharedData.maChiaSe)}`)
        }
    }, [sharedData, carId])

    // Apply default first API options, then overlay imported share-code options if present
    useEffect(() => {
        const pools = {
            paints: apiPaintColors,
            rims: apiRims,
            interiors: apiInteriorTrims,
            calipers: apiCalipers,
            tires: apiTires,
        }

        setConfig((prev) => {
            let changed = false
            let next = { ...prev }

            if (apiPaintColors.length > 0 && !shareCodeFromUrl) {
                if (!apiPaintColors.some((p) => p.id === next.exteriorColor.id)) {
                    next.exteriorColor = apiPaintColors[0]
                    changed = true
                }
            }
            if (apiRims.length > 0 && !shareCodeFromUrl) {
                if (!apiRims.some((r) => r.id === next.rim.id)) {
                    next.rim = apiRims[0]
                    changed = true
                }
            }
            if (apiCalipers.length > 0 && !shareCodeFromUrl) {
                if (!apiCalipers.some((c) => c.id === next.caliper.id)) {
                    next.caliper = apiCalipers[0]
                    changed = true
                }
            }
            if (apiInteriorTrims.length > 0 && !shareCodeFromUrl) {
                if (!apiInteriorTrims.some((t) => t.id === next.interiorTrim.id)) {
                    next.interiorTrim = apiInteriorTrims[0]
                    changed = true
                }
            }

            if (sharedData && sharedData.maXe === carId) {
                const imported = applySharedOptionsToConfig(next, sharedData.danhSachMaTuyChon, pools)
                if (
                    imported.exteriorColor.id !== next.exteriorColor.id ||
                    imported.rim.id !== next.rim.id ||
                    imported.caliper.id !== next.caliper.id ||
                    imported.interiorTrim.id !== next.interiorTrim.id ||
                    imported.tire?.id !== next.tire?.id
                ) {
                    next = imported
                    changed = true
                }
            }

            return changed ? next : prev
        })
    }, [
        carId,
        shareCodeFromUrl,
        sharedData,
        apiPaintColors,
        apiRims,
        apiInteriorTrims,
        apiCalipers,
        apiTires,
    ])

    const handleImportSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const normalized = codeInput.trim().toUpperCase()
        if (!normalized) {
            setCodeError('Vui lòng nhập mã chia sẻ.')
            return
        }

        setCodeError(null)
        setIsVerifyingCode(true)
        try {
            const detail = await getConfigurationByShareCode(normalized)
            setIsCodeModalOpen(false)
            // Full page reload to load the target model and all its options cleanly
            window.location.assign(`/configurator/${detail.maXe}?code=${encodeURIComponent(detail.maChiaSe)}`)
        } catch {
            setCodeError('Không tìm thấy cấu hình với mã này. Vui lòng kiểm tra lại.')
        } finally {
            setIsVerifyingCode(false)
        }
    }

    const handleCopyCode = () => {
        if (!sharedData?.maChiaSe) return
        navigator.clipboard.writeText(sharedData.maChiaSe)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
    }

    const handleShareClick = () => {
        if (!sharedData?.maChiaSe) return
        const shareUrl = `${window.location.origin}/configurator/${carId}?code=${encodeURIComponent(sharedData.maChiaSe)}`
        navigator.clipboard.writeText(shareUrl)
        setCopiedShareLink(true)
        setTimeout(() => setCopiedShareLink(false), 2500)
    }

    const modelTitle = (carData?.tenPhienBan ?? `Model ${carId}`).toUpperCase()
    const quickSwatches = (apiPaintColors.length > 0 ? apiPaintColors : [config.exteriorColor]).slice(0, 4)
    const powerDisplay = `${carData?.congSuat ?? 1015} CV`
    const speedDisplay = `${carData?.tocDoToiDa ?? 350} KM/H`
    const accelValue = carData?.giaToc
        ? (carData.giaToc > 10 ? (carData.giaToc / 10).toFixed(1) : String(carData.giaToc))
        : '2.5'

    const defaultConfigName = `${modelTitle} - ${config.exteriorColor.name}`
    const totalPriceVND =
        sharedData?.tongGia ??
        (carData?.giaKhoiDiem ?? 0) +
            (config.exteriorColor.priceVND ?? 0) +
            (config.rim.priceVND ?? 0) +
            (config.caliper?.priceVND ?? 0) +
            (config.interiorTrim?.priceVND ?? 0) +
            (config.tire?.priceVND ?? 0)

    const collectSelectedIds = () =>
        [
            config.exteriorColor.id,
            config.rim.id,
            config.caliper?.id,
            config.interiorTrim?.id,
            config.tire?.id,
        ]
            .filter(Boolean)
            .map((id) => parseInt(id as string, 10))
            .filter((n) => !Number.isNaN(n))

    const handleSaveAccount = async (tenCauHinh: string) =>
        saveConfiguration({
            maXe: carId,
            tenCauHinh,
            tongGia: totalPriceVND,
            danhSachMaTuyChon: collectSelectedIds(),
        })

    const handleGuestSaveAndSendEmail = async (payload: { email: string; ho: string; ten: string }) => {
        const saveRes = await saveConfiguration({
            maXe: carId,
            tenCauHinh: defaultConfigName,
            tongGia: totalPriceVND,
            danhSachMaTuyChon: collectSelectedIds(),
        })
        await sendShareEmail({
            email: payload.email,
            ho: payload.ho,
            ten: payload.ten,
            maChiaSe: saveRes.maChiaSe,
        })
        return { message: saveRes.message, maChiaSe: saveRes.maChiaSe }
    }

    const isCodePreviewMode = !!shareCodeFromUrl && !!sharedData

    // =========================================================================
    // VIEW 2: IMPORTED CONFIGURATION OVERVIEW (MATCHING IMAGE 2)
    // =========================================================================
    if (isCodePreviewMode) {
        return (
            <div className="min-h-screen w-full bg-[#101110] text-[#f5f5f1] flex flex-col select-none">
                {/* Upper 3D Viewport */}
                <div className="relative w-full h-[58vh] min-h-[380px] bg-[#101110] overflow-hidden">
                    <StudioScene config={config} activeCameraPreset="three_quarter_front" theme="dark" />

                    {/* Top-right Close (exit imported code mode) */}
                    <button
                        type="button"
                        onClick={() => setSearchParams({})}
                        aria-label="Đóng chế độ xem mã"
                        title="Quay lại màn hình bắt đầu"
                        className="absolute top-6 right-6 z-20 w-10 h-10 bg-[#f5f5f1] text-[#101110] hover:bg-[#eac500] transition-colors flex items-center justify-center cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Floating Right Action Card (SAVE, SHARE, ENQUIRE, START CONFIGURATION) */}
                    <div className="hidden lg:block absolute bottom-6 right-8 z-20 w-[340px] bg-[#f5f5f1] text-[#101110] p-5 border border-[#343831]">
                        <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-300">
                            <div>
                                <p className="text-xs text-neutral-600">Your configuration code is:</p>
                                <p className="font-mono text-2xl font-bold tracking-wider text-[#101110] mt-0.5">
                                    {sharedData.maChiaSe}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyCode}
                                title="Sao chép mã"
                                className="w-9 h-9 border border-neutral-300 hover:border-[#101110] flex items-center justify-center cursor-pointer transition-colors"
                            >
                                {copiedCode ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col gap-2.5">
                            <button
                                type="button"
                                onClick={() => setIsSaveDrawerOpen(true)}
                                className="w-full py-2.5 px-4 border border-[#101110] text-xs font-bold uppercase tracking-wider hover:bg-[#101110] hover:text-[#f5f5f1] transition-colors flex items-center justify-center gap-2 cursor-pointer font-barlow"
                            >
                                <Bookmark className="w-3.5 h-3.5" />
                                SAVE
                            </button>

                            <button
                                type="button"
                                onClick={handleShareClick}
                                className="w-full py-2.5 px-4 border border-[#101110] text-xs font-bold uppercase tracking-wider hover:bg-[#101110] hover:text-[#f5f5f1] transition-colors flex items-center justify-center gap-2 cursor-pointer font-barlow"
                            >
                                <Share2 className="w-3.5 h-3.5" />
                                {copiedShareLink ? 'LINK COPIED' : 'SHARE'}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/showroom')}
                                className="w-full py-2.5 px-4 bg-[#191b19] text-[#f5f5f1] text-xs font-bold uppercase tracking-wider hover:bg-[#343831] transition-colors flex items-center justify-center gap-2 cursor-pointer font-barlow"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                ENQUIRE
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/configurator/${carId}/edit?code=${encodeURIComponent(sharedData.maChiaSe)}`)
                                }
                                className="w-full py-3 px-4 bg-[#eac500] hover:bg-[#f7de9f] text-[#101110] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-barlow"
                            >
                                START CONFIGURATION
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lower Specification Summary Section */}
                <div className="flex-1 bg-[#191b19] border-t border-[#343831] px-6 sm:px-10 py-8">
                    <div className="max-w-5xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#9ea39b]">Your Lamborghini</p>
                        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-4">
                            <h1 className="font-barlow text-3xl sm:text-4xl font-bold uppercase tracking-wide">
                                {carData?.tenPhienBan ?? modelTitle}
                            </h1>
                            <span className="font-barlow text-xl font-semibold text-[#eac500]">
                                {formatCurrency(totalPriceVND, 'VND', 'VIE')}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-[#9ea39b]">
                            Cấu hình: <span className="text-[#f5f5f1] font-medium">{sharedData.tenCauHinh}</span>
                        </p>

                        {/* Mobile action buttons */}
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:hidden">
                            <button
                                type="button"
                                onClick={() => setIsSaveDrawerOpen(true)}
                                className="py-2.5 px-3 border border-[#343831] text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                                SAVE
                            </button>
                            <button
                                type="button"
                                onClick={handleShareClick}
                                className="py-2.5 px-3 border border-[#343831] text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                                {copiedShareLink ? 'COPIED' : 'SHARE'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/showroom')}
                                className="py-2.5 px-3 bg-[#343831] text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                                ENQUIRE
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/configurator/${carId}/edit?code=${encodeURIComponent(sharedData.maChiaSe)}`)
                                }
                                className="py-2.5 px-3 bg-[#eac500] text-[#101110] text-xs font-bold uppercase tracking-wider cursor-pointer"
                            >
                                START CONFIGURATION
                            </button>
                        </div>

                        {/* Tabs: EXTERIOR | INTERIOR | EQUIPMENT */}
                        <div className="mt-8 flex items-center gap-2 border-b border-[#343831] pb-4">
                            {(['EXTERIOR', 'INTERIOR', 'EQUIPMENT'] as ReviewTab[]).map((tab) => {
                                const active = reviewTab === tab
                                return (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setReviewTab(tab)}
                                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer font-barlow ${
                                            active
                                                ? 'bg-[#f5f5f1] text-[#101110] border-[#f5f5f1]'
                                                : 'bg-transparent text-[#9ea39b] border-[#343831] hover:text-[#f5f5f1]'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviewTab === 'EXTERIOR' && (
                                <>
                                    <div className="p-4 border border-[#343831] bg-[#101110]">
                                        <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">Exterior Paint</p>
                                        <div className="mt-2 flex items-center gap-3">
                                            <span
                                                className="w-6 h-6 border border-[#343831] shrink-0"
                                                style={{ backgroundColor: config.exteriorColor.hex }}
                                            />
                                            <span className="font-semibold text-sm">{config.exteriorColor.name}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 border border-[#343831] bg-[#101110]">
                                        <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">Wheels</p>
                                        <p className="mt-2 font-semibold text-sm">{config.rim.name}</p>
                                    </div>
                                    <div className="p-4 border border-[#343831] bg-[#101110]">
                                        <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">Brake Calipers</p>
                                        <div className="mt-2 flex items-center gap-3">
                                            <span
                                                className="w-5 h-5 border border-[#343831] shrink-0"
                                                style={{ backgroundColor: config.caliper.hex }}
                                            />
                                            <span className="font-semibold text-sm">{config.caliper.name}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {reviewTab === 'INTERIOR' && (
                                <div className="p-4 border border-[#343831] bg-[#101110]">
                                    <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">
                                        Cockpit Leather &amp; Trim
                                    </p>
                                    <p className="mt-2 font-semibold text-sm">{config.interiorTrim.name}</p>
                                </div>
                            )}

                            {reviewTab === 'EQUIPMENT' && (
                                <>
                                    <div className="p-4 border border-[#343831] bg-[#101110]">
                                        <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">Tires</p>
                                        <p className="mt-2 font-semibold text-sm">
                                            {config.tire ? config.tire.name : 'Standard Factory Tires'}
                                        </p>
                                    </div>
                                    <div className="p-4 border border-[#343831] bg-[#101110]">
                                        <p className="text-[11px] uppercase tracking-widest text-[#9ea39b]">Powertrain</p>
                                        <p className="mt-2 font-semibold text-sm">
                                            {carData?.dongCo ?? 'V12 HPEV'} · {powerDisplay}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <SaveConfigDrawer
                    isOpen={isSaveDrawerOpen}
                    onClose={() => setIsSaveDrawerOpen(false)}
                    theme="dark"
                    isLoggedIn={isLoggedIn}
                    modelTitle={modelTitle}
                    defaultConfigName={defaultConfigName}
                    totalPriceVND={totalPriceVND}
                    onSaveAccount={handleSaveAccount}
                    onGuestSaveAndSendEmail={handleGuestSaveAndSendEmail}
                    onRequestLogin={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                />
            </div>
        )
    }

    // =========================================================================
    // VIEW 1: INTERMEDIATE LANDING / INTRO VIEW (MATCHING IMAGE 1)
    // =========================================================================
    return (
        <div className="relative w-screen h-screen bg-[#101110] text-[#f5f5f1] overflow-hidden select-none">
            {/* Fullscreen 3D Canvas */}
            <StudioScene config={config} activeCameraPreset="three_quarter_front" theme="dark" />

            {/* Top-Left: Back button + Car Title + 3 Specs */}
            <div className="absolute top-6 left-6 sm:left-8 z-20 pointer-events-auto">
                <div className="flex items-start gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/models/${carId}`)}
                        aria-label="Quay lại"
                        className="w-10 h-10 bg-[#f5f5f1] text-[#101110] hover:bg-[#eac500] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="font-barlow text-3xl sm:text-5xl font-bold uppercase tracking-wide leading-none">
                            {modelTitle}
                        </h1>
                        <div className="mt-4 flex items-center gap-6 text-xs">
                            <div className="border-l border-[#343831] pl-3">
                                <span className="block text-[10px] uppercase tracking-widest text-[#9ea39b]">POWER</span>
                                <span className="font-barlow text-lg font-bold text-[#f5f5f1]">{powerDisplay}</span>
                            </div>
                            <div className="border-l border-[#343831] pl-3">
                                <span className="block text-[10px] uppercase tracking-widest text-[#9ea39b]">
                                    MAX SPEED
                                </span>
                                <span className="font-barlow text-lg font-bold text-[#f5f5f1]">{speedDisplay}</span>
                            </div>
                            <div className="border-l border-[#343831] pl-3">
                                <span className="block text-[10px] uppercase tracking-widest text-[#9ea39b]">
                                    0-100 KM/H
                                </span>
                                <span className="font-barlow text-lg font-bold text-[#f5f5f1]">{accelValue} S</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top-Right: 2 Action Buttons (Language symbolic + Import Share Code) */}
            <div className="absolute top-6 right-6 sm:right-8 z-20 flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => setLangBadge((prev) => (prev === 'VIE' ? 'ENG' : 'VIE'))}
                    title={`Ngôn ngữ: ${langBadge} (Tượng trưng)`}
                    className="w-10 h-10 bg-[#f5f5f1] text-[#101110] hover:bg-[#eac500] transition-colors flex items-center justify-center cursor-pointer relative"
                >
                    <Globe className="w-4 h-4" />
                    <span className="absolute -bottom-1 -right-1 bg-[#101110] text-[#eac500] text-[8px] font-bold px-1 border border-[#343831]">
                        {langBadge}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setCodeError(null)
                        setIsCodeModalOpen(true)
                    }}
                    title="Nhập mã cấu hình (Import Code)"
                    className="w-10 h-10 bg-[#f5f5f1] text-[#101110] hover:bg-[#eac500] transition-colors flex items-center justify-center cursor-pointer"
                >
                    <KeyRound className="w-4 h-4" />
                </button>
            </div>

            {/* Error banner if URL had an invalid ?code=... */}
            {shareCodeFromUrl && !isSharedLoading && isSharedError && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-[#191b19] border border-red-500/70 px-5 py-3 flex items-center gap-4 text-xs">
                    <span className="text-red-400">
                        Mã cấu hình <strong>{shareCodeFromUrl}</strong> không tồn tại trong hệ thống.
                    </span>
                    <button
                        type="button"
                        onClick={() => setSearchParams({})}
                        className="text-[#f5f5f1] underline cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            )}

            {/* Bottom-Left: Quick Standard Color Swatches */}
            <div className="absolute bottom-6 left-6 sm:left-8 z-20 bg-[#191b19]/90 border border-[#343831] px-4 py-3">
                <div className="flex items-center gap-3">
                    {quickSwatches.map((paint) => {
                        const active = config.exteriorColor.id === paint.id
                        return (
                            <button
                                key={paint.id}
                                type="button"
                                onClick={() => setConfig((prev) => ({ ...prev, exteriorColor: paint }))}
                                title={paint.name}
                                className={`w-12 h-6 border transition-all cursor-pointer ${
                                    active ? 'border-[#eac500] ring-1 ring-[#eac500]' : 'border-[#343831] opacity-80 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: paint.hex }}
                            />
                        )
                    })}
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-[#9ea39b]">
                    STANDARD: <span className="text-[#f5f5f1]">{config.exteriorColor.name.toUpperCase()}</span>
                </p>
            </div>

            {/* Bottom-Right: START CONFIGURATION CTA */}
            <div className="absolute bottom-6 right-6 sm:right-8 z-20">
                <button
                    type="button"
                    onClick={() => navigate(`/configurator/${carId}/edit`)}
                    className="px-7 py-4 bg-[#eac500] hover:bg-[#f7de9f] text-[#101110] font-barlow font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                    START CONFIGURATION
                </button>
            </div>

            {/* Import Configuration Code Modal */}
            {isCodeModalOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                    onClick={() => setIsCodeModalOpen(false)}
                >
                    <form
                        onSubmit={handleImportSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-[#191b19] border border-[#343831] p-6 relative text-[#f5f5f1]"
                    >
                        <button
                            type="button"
                            onClick={() => setIsCodeModalOpen(false)}
                            className="absolute top-4 right-4 text-[#9ea39b] hover:text-[#f5f5f1] cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#9ea39b]">LOAD CONFIGURATION</p>
                        <h2 className="mt-1 font-barlow text-2xl font-bold uppercase tracking-wide">
                            NHẬP MÃ CẤU HÌNH
                        </h2>
                        <p className="mt-2 text-xs text-[#9ea39b]">
                            Nhập mã chia sẻ (ví dụ: <span className="font-mono text-[#eac500]">LMDXTM</span>) để tải lại đúng
                            dòng xe và toàn bộ tùy chọn đã lưu.
                        </p>

                        <div className="mt-5">
                            <input
                                type="text"
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                                placeholder="Nhập mã chia sẻ..."
                                autoFocus
                                className="w-full bg-[#101110] border border-[#343831] focus:border-[#eac500] px-4 py-3 text-sm font-mono uppercase tracking-widest text-[#f5f5f1] outline-none"
                            />
                        </div>

                        {codeError && (
                            <p className="mt-3 text-xs text-red-400" role="alert">
                                {codeError}
                            </p>
                        )}

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsCodeModalOpen(false)}
                                className="px-4 py-2.5 border border-[#343831] text-xs font-bold uppercase tracking-wider text-[#9ea39b] hover:text-[#f5f5f1] cursor-pointer font-barlow"
                            >
                                HỦY
                            </button>
                            <button
                                type="submit"
                                disabled={isVerifyingCode}
                                className="px-6 py-2.5 bg-[#eac500] hover:bg-[#f7de9f] disabled:opacity-50 text-[#101110] text-xs font-bold uppercase tracking-wider cursor-pointer font-barlow"
                            >
                                {isVerifyingCode ? 'ĐANG KIỂM TRA...' : 'TẢI CẤU HÌNH'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
