import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StudioScene } from '../features/configurator/3d/StudioScene'
import { FigmaHeader } from '../features/configurator/components/FigmaHeader'
import type { ConfigStep } from '../features/configurator/components/FigmaHeader'
import { FigmaCanvasOverlays } from '../features/configurator/components/FigmaCanvasOverlays'
import { FigmaCameraBar } from '../features/configurator/components/FigmaCameraBar'
import type { FigmaCameraAngle } from '../features/configurator/components/FigmaCameraBar'
import { FigmaRightPanel } from '../features/configurator/components/FigmaRightPanel'
import { FigmaBottomBar } from '../features/configurator/components/FigmaBottomBar'
import { SummaryModal } from '../features/configurator/components/SummaryModal'
import type {
    CarConfiguration,
    CameraPreset,
    PaintColor,
    RimOption,
    CaliperOption,
    InteriorTrim,
    CarbonPackage,
    ExhaustOption,
} from '../features/configurator/types'
import {
    PAINT_COLORS,
    RIMS,
    CALIPERS,
    INTERIOR_TRIMS,
} from '../features/configurator/data/lamborghiniData'
import {
    setAudioMuted,
    playUiClick,
    startV12Engine,
    stopV12Engine,
} from '../features/configurator/audio/engineAudio'
import { useXeConfigurator, useTuyChonTheoNhom } from '../features/configurator/hooks'
import {
    mapTuyChonToPaintColors,
    mapTuyChonToRims,
    mapTuyChonToInteriorTrims,
    mapTuyChonToCalipers,
} from '../features/configurator/utils/apiMappers'
import { X, ShieldAlert } from 'lucide-react'

// ---------------------------------------------------------------------------
// EX08 - Cấu hình tạm theo phiên (sessionStorage)
// Key: lambo_config_v1_<carId> để mỗi dòng xe có một cấu hình riêng.
// ---------------------------------------------------------------------------
const CONFIG_STORAGE_PREFIX = 'lambo_config_v1_'

type StoredConfigKey =
    | 'exteriorColor'
    | 'rim'
    | 'caliper'
    | 'interiorTrim'
    | 'carbonLower'
    | 'carbonUpper'
    | 'carbonInterior'
    | 'exhaust'

type StoredConfig = Pick<CarConfiguration, StoredConfigKey>

const getConfigStorageKey = (carId: number) => `${CONFIG_STORAGE_PREFIX}${carId}`

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null

const isPaintColor = (value: unknown): value is PaintColor =>
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.hex === 'string' &&
    typeof value.finish === 'string' &&
    typeof value.category === 'string' &&
    typeof value.description === 'string' &&
    typeof value.roughness === 'number' &&
    typeof value.metalness === 'number' &&
    typeof value.clearcoat === 'number' &&
    typeof value.priceUSD === 'number' &&
    typeof value.priceVND === 'number'

const isRimOption = (value: unknown): value is RimOption =>
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.size === 'string' &&
    typeof value.finish === 'string' &&
    typeof value.hex === 'string' &&
    typeof value.spokeColor === 'string' &&
    typeof value.priceUSD === 'number' &&
    typeof value.priceVND === 'number'

const isCaliperOption = (value: unknown): value is CaliperOption =>
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.hex === 'string' &&
    typeof value.priceUSD === 'number' &&
    typeof value.priceVND === 'number'

const isInteriorTrim = (value: unknown): value is InteriorTrim =>
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.primaryLeatherHex === 'string' &&
    typeof value.secondaryLeatherHex === 'string' &&
    typeof value.stitchingHex === 'string' &&
    typeof value.priceUSD === 'number' &&
    typeof value.priceVND === 'number'

const isCarbonPackage = (value: unknown): value is CarbonPackage =>
    value === 'body' || value === 'matt_carbon' || value === 'shiny_carbon'

const isExhaustOption = (value: unknown): value is ExhaustOption =>
    value === 'matt_black' || value === 'titanium' || value === 'chrome'

/** Đọc cấu hình tạm đã lưu của phiên; trả về null nếu không có hoặc dữ liệu lỗi. */
const loadStoredConfig = (carId: number): Partial<StoredConfig> | null => {
    try {
        if (typeof window === 'undefined') return null
        const raw = window.sessionStorage.getItem(getConfigStorageKey(carId))
        if (!raw) return null

        const parsed: unknown = JSON.parse(raw)
        if (!isRecord(parsed)) return null

        const stored: Partial<StoredConfig> = {}
        if (isPaintColor(parsed.exteriorColor)) stored.exteriorColor = parsed.exteriorColor
        if (isRimOption(parsed.rim)) stored.rim = parsed.rim
        if (isCaliperOption(parsed.caliper)) stored.caliper = parsed.caliper
        if (isInteriorTrim(parsed.interiorTrim)) stored.interiorTrim = parsed.interiorTrim
        if (isCarbonPackage(parsed.carbonLower)) stored.carbonLower = parsed.carbonLower
        if (isCarbonPackage(parsed.carbonUpper)) stored.carbonUpper = parsed.carbonUpper
        if (typeof parsed.carbonInterior === 'boolean') stored.carbonInterior = parsed.carbonInterior
        if (isExhaustOption(parsed.exhaust)) stored.exhaust = parsed.exhaust

        return Object.keys(stored).length > 0 ? stored : null
    } catch {
        // JSON hỏng hoặc sessionStorage bị chặn -> bỏ qua, dùng cấu hình mặc định.
        return null
    }
}

/** Ghi cấu hình tạm của phiên; bỏ qua lỗi quota / private mode. */
const saveStoredConfig = (carId: number, config: CarConfiguration) => {
    try {
        if (typeof window === 'undefined') return
        const payload: StoredConfig = {
            exteriorColor: config.exteriorColor,
            rim: config.rim,
            caliper: config.caliper,
            interiorTrim: config.interiorTrim,
            carbonLower: config.carbonLower,
            carbonUpper: config.carbonUpper,
            carbonInterior: config.carbonInterior,
            exhaust: config.exhaust,
        }
        window.sessionStorage.setItem(getConfigStorageKey(carId), JSON.stringify(payload))
    } catch {
        // Không ghi được thì không ảnh hưởng tới luồng cấu hình.
    }
}

/** Xoá cấu hình tạm của dòng xe khỏi sessionStorage. */
const clearStoredConfig = (carId: number) => {
    try {
        if (typeof window === 'undefined') return
        window.sessionStorage.removeItem(getConfigStorageKey(carId))
    } catch {
        // Bỏ qua lỗi khi xoá.
    }
}

// Map carId to correct GLB model
const getModelForCarId = (id: number): { url: string; name: string } => {
    switch (id) {
        case 1: // Revuelto
            return {
                url: '/models/revuelto_30tm-v8.glb',
                name: 'Lamborghini Revuelto (3D Studio)',
            }
        case 2: // Temerario
            return {
                url: '/models/lamborghini_sc18_draco.glb',
                name: 'Lamborghini Temerario (3D Studio)',
            }
        case 3: // Huracan
            return {
                url: '/models/huracan_eagletm-v1.glb',
                name: 'Lamborghini Huracan (3D Studio)',
            }
        case 4: // Urus
            return {
                url: '/models/urus_absoluttm-v5.glb',
                name: 'Lamborghini Urus (3D Studio)',
            }
        default:
            return {
                url: '/models/revuelto_30tm-v8.glb',
                name: 'Lamborghini Revuelto (3D Studio)',
            }
    }
}

/** Cấu hình mặc định của dòng xe (dùng khi chưa có hoặc vừa xoá cấu hình tạm). */
const createDefaultConfig = (carId: number): CarConfiguration => {
    const modelData = getModelForCarId(carId)
    return {
        model: 'Revuelto HPEV',
        exteriorColor: PAINT_COLORS[0],
        rim: RIMS[0],
        caliper: CALIPERS[0],
        carbonLower: 'body',
        carbonUpper: 'body',
        exhaust: 'matt_black',
        spoilerPosition: 'retracted',
        doorsOpen: false,
        lightsOn: true,
        engineStarted: false,
        interiorTrim: INTERIOR_TRIMS[0],
        contrastStitchingHex: '#ffcc00',
        carbonInterior: false,
        environment: 'envstudionewnight',
        currency: 'VND',
        language: 'VIE',
        loungeMode: false,
        activeTab: 'colors',
        viewMode: 'exterior',
        customModelUrl: modelData.url,
        customModelName: modelData.name,
    }
}

export default function ConfiguratorPage() {
    const { maXe } = useParams<{ maXe?: string }>()
    const navigate = useNavigate()
    const carId = Number(maXe) || 1

    // Theme state (Dark luxury by default)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [currentStep, setCurrentStep] = useState<ConfigStep>('01 EXTERIOR')
    const [activeCameraAngle, setActiveCameraAngle] = useState<FigmaCameraAngle>('SIDE')
    const [isSummaryOpen, setIsSummaryOpen] = useState(false)
    const [isExitModalOpen, setIsExitModalOpen] = useState(false)
    const [isAudioMutedState, setIsAudioMutedState] = useState(false)

    const { data: carData } = useXeConfigurator(carId)
    const { data: rawPaintOptions = [] } = useTuyChonTheoNhom(carId, 1)
    const { data: rawRimOptions = [] } = useTuyChonTheoNhom(carId, 2)
    const { data: rawInteriorOptions = [] } = useTuyChonTheoNhom(carId, 3)
    const { data: rawCaliperOptions = [] } = useTuyChonTheoNhom(carId, 4)

    // Memoised so the "pick the first API option" effects below only run when the data changes.
    const apiPaintColors = useMemo(() => mapTuyChonToPaintColors(rawPaintOptions), [rawPaintOptions])
    const apiRims = useMemo(() => mapTuyChonToRims(rawRimOptions), [rawRimOptions])
    const apiInteriorTrims = useMemo(() => mapTuyChonToInteriorTrims(rawInteriorOptions), [rawInteriorOptions])
    const apiCalipers = useMemo(() => mapTuyChonToCalipers(rawCaliperOptions), [rawCaliperOptions])

    // EX08: khôi phục cấu hình tạm của phiên (nếu có) ngay từ lần render đầu.
    const [config, setConfig] = useState<CarConfiguration>(() => {
        const base = createDefaultConfig(carId)
        const stored = loadStoredConfig(carId)
        return stored ? { ...base, ...stored } : base
    })

    // Khi đổi dòng xe: nạp lại cấu hình tạm tương ứng với carId mới.
    const [activeCarId, setActiveCarId] = useState(carId)
    if (activeCarId !== carId) {
        setActiveCarId(carId)
        const base = createDefaultConfig(carId)
        const stored = loadStoredConfig(carId)
        setConfig(stored ? { ...base, ...stored } : base)
    }

    // Bỏ qua lần ghi kế tiếp sau khi người dùng bấm Reset (để xoá entry trong sessionStorage).
    const skipNextPersistRef = useRef(false)

    useEffect(() => {
        if (carData?.tenPhienBan) {
            const modelData = getModelForCarId(carId)
            setConfig((prev) => ({
                ...prev,
                model: carData.tenPhienBan,
                customModelUrl: modelData.url,
                customModelName: modelData.name,
            }))
        }
    }, [carData, carId])

    useEffect(() => {
        if (apiPaintColors.length > 0 && config.exteriorColor === PAINT_COLORS[0]) {
            setConfig((prev) => ({ ...prev, exteriorColor: apiPaintColors[0] }))
        }
    }, [apiPaintColors])

    useEffect(() => {
        if (apiRims.length > 0 && config.rim === RIMS[0]) {
            setConfig((prev) => ({ ...prev, rim: apiRims[0] }))
        }
    }, [apiRims])

    useEffect(() => {
        if (apiInteriorTrims.length > 0 && config.interiorTrim === INTERIOR_TRIMS[0]) {
            setConfig((prev) => ({ ...prev, interiorTrim: apiInteriorTrims[0] }))
        }
    }, [apiInteriorTrims])

    useEffect(() => {
        if (apiCalipers.length > 0 && config.caliper === CALIPERS[0]) {
            setConfig((prev) => ({ ...prev, caliper: apiCalipers[0] }))
        }
    }, [apiCalipers])

    // EX08: lưu cấu hình tạm của phiên theo carId để reload vẫn giữ lựa chọn.
    useEffect(() => {
        if (skipNextPersistRef.current) {
            skipNextPersistRef.current = false
            return
        }
        saveStoredConfig(carId, config)
    }, [config, carId])

    // Map active angle to Camera Preset for 3D Viewport
    const getCameraPreset = (): CameraPreset => {
        if (currentStep === '02 INTERIOR') {
            return 'cockpit'
        }
        switch (activeCameraAngle) {
            case 'FRONT':
                return 'front_fascia'
            case 'SIDE':
                return 'side_profile'
            case 'REAR':
                return 'rear_three_quarter'
            case 'DETAIL':
                return 'wheel_closeup'
            default:
                return 'side_profile'
        }
    }

    const handleUpdateConfig = (partial: Partial<CarConfiguration>) => {
        setConfig((prev) => ({ ...prev, ...partial }))
    }

    const handleSelectColor = (color: PaintColor) => {
        playUiClick()
        setConfig((prev) => ({ ...prev, exteriorColor: color }))
    }

    const handleToggleAudio = () => {
        const nextMuted = !isAudioMutedState
        setIsAudioMutedState(nextMuted)
        setAudioMuted(nextMuted)
        if (nextMuted) {
            stopV12Engine()
        }
    }

    const handleToggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const handleNextStep = () => {
        playUiClick()
        if (currentStep === '01 EXTERIOR') {
            setCurrentStep('02 INTERIOR')
        } else if (currentStep === '02 INTERIOR') {
            setCurrentStep('03 OPTIONS')
        } else if (currentStep === '03 OPTIONS') {
            setCurrentStep('04 SUMMARY')
        } else if (currentStep === '04 SUMMARY') {
            setIsSummaryOpen(true)
        }
    }

    const handleResetConfig = () => {
        playUiClick()
        // EX08: xoá cấu hình tạm của phiên cho dòng xe này.
        clearStoredConfig(carId)
        skipNextPersistRef.current = true
        // Reset to the first API option, falling back to the static catalogue.
        setConfig((prev) => ({
            ...prev,
            exteriorColor: apiPaintColors[0] ?? PAINT_COLORS[0],
            rim: apiRims[0] ?? RIMS[0],
            caliper: apiCalipers[0] ?? CALIPERS[0],
            carbonLower: 'body',
            carbonUpper: 'body',
            carbonInterior: false,
            exhaust: 'matt_black',
            doorsOpen: false,
            interiorTrim: apiInteriorTrims[0] ?? INTERIOR_TRIMS[0],
        }))
        setActiveCameraAngle('SIDE')
        setCurrentStep('01 EXTERIOR')
    }

    const isLight = theme === 'light'
    const carSlug = carData?.tenPhienBan?.toLowerCase().includes('huracan')
        ? 'huracan'
        : carData?.tenPhienBan?.toLowerCase().includes('temerario')
        ? 'temerario'
        : carData?.tenPhienBan?.toLowerCase().includes('urus')
        ? 'urus'
        : 'revuelto'

    // Keyboard shortcuts for studio controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            if (e.key === 't' || e.key === 'T') {
                handleToggleTheme()
            } else if (e.key === 'd' || e.key === 'D') {
                setConfig((prev) => ({ ...prev, doorsOpen: !prev.doorsOpen }))
            } else if (e.key === 'l' || e.key === 'L') {
                setConfig((prev) => ({ ...prev, lightsOn: !prev.lightsOn }))
            } else if (e.key === 'e' || e.key === 'E') {
                setConfig((prev) => {
                    const next = !prev.engineStarted
                    if (next) {
                        startV12Engine(undefined, carSlug)
                    } else {
                        stopV12Engine()
                    }
                    return { ...prev, engineStarted: next }
                })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [carSlug])

    const modelTitle = (carData?.tenPhienBan || carSlug).toUpperCase()

    return (
        <div
            className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-200 select-none print:w-full print:h-auto print:overflow-visible print:bg-white print:text-black ${
                isLight ? 'bg-[#f4f4f6] text-[#111111]' : 'bg-[#101110] text-[#f5f5f1]'
            }`}
        >
            {/* 1. Top Header Bar */}
            <div className="print:hidden">
                <FigmaHeader
                    modelTitle={modelTitle}
                    currentStep={currentStep}
                    onSelectStep={(step) => {
                        playUiClick()
                        setCurrentStep(step)
                    }}
                    theme={theme}
                    onToggleTheme={handleToggleTheme}
                    isAudioMuted={isAudioMutedState}
                    onToggleAudio={handleToggleAudio}
                    onExit={() => setIsExitModalOpen(true)}
                />
            </div>

            {/* 2. Main Middle Section: Left 3D Canvas + Right Configuration Panel */}
            <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden w-full print:hidden">
                {/* 2A. Left 3D Viewport Area */}
                <div className="relative flex-1 h-full min-h-[350px] overflow-hidden">
                    {/* Three.js 3D Studio Scene */}
                    <StudioScene
                        config={config}
                        activeCameraPreset={getCameraPreset()}
                        theme={theme}
                        onControlsInteracted={() => {}}
                        onModelLoaded={(name, url) => {
                            setConfig((prev) => ({
                                ...prev,
                                customModelUrl: url,
                                customModelName: name,
                                model: name,
                            }))
                        }}
                    />

                    {/* Canvas HUD Overlays (Top-left branding & Top-right color info) */}
                    <FigmaCanvasOverlays
                        theme={theme}
                        exteriorColor={config.exteriorColor}
                        modelTitle={modelTitle}
                        viewModeLabel={
                            currentStep === '02 INTERIOR'
                                ? 'INTERIOR COCKPIT VIEW'
                                : currentStep === '03 OPTIONS'
                                ? 'AERODYNAMICS & OPTIONS'
                                : currentStep === '04 SUMMARY'
                                ? 'SPECIFICATION OVERVIEW'
                                : 'EXTERIOR VIEW'
                        }
                    />

                    {/* Bottom Camera Angle Pills (< FRONT SIDE REAR DETAIL >) */}
                    <FigmaCameraBar
                        activeAngle={activeCameraAngle}
                        onSelectAngle={(angle) => {
                            playUiClick()
                            setActiveCameraAngle(angle)
                        }}
                        theme={theme}
                    />

                    {/* Model Switcher Pill (Top left under title) */}
                </div>

                <FigmaRightPanel
                    currentStep={currentStep}
                    config={config}
                    onUpdateConfig={handleUpdateConfig}
                    onSelectColor={handleSelectColor}
                    theme={theme}
                    paintColors={apiPaintColors.length > 0 ? apiPaintColors : undefined}
                    rims={apiRims.length > 0 ? apiRims : undefined}
                    interiorTrims={apiInteriorTrims.length > 0 ? apiInteriorTrims : undefined}
                    calipers={apiCalipers.length > 0 ? apiCalipers : undefined}
                />
            </div>

            {/* 3. Bottom Sticky Action Bar */}
            <div className="print:hidden">
                <FigmaBottomBar
                    modelTitle={modelTitle}
                    config={config}
                    currentStep={currentStep}
                    onNextStep={handleNextStep}
                    onSave={() => setIsSummaryOpen(true)}
                    onReset={handleResetConfig}
                    theme={theme}
                />
            </div>

            {/* 4. Specification Sheet Modal */}
            <SummaryModal
                config={config}
                isOpen={isSummaryOpen}
                onClose={() => setIsSummaryOpen(false)}
            />

            {/* 5. Exit Confirmation Modal */}
            {isExitModalOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 select-none"
                    onClick={() => setIsExitModalOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full max-w-md p-6 border relative ${
                            isLight
                                ? 'bg-white border-[#d9ddd4] text-[#171817]'
                                : 'bg-[#101110] border-[#343831] text-[#f5f5f1]'
                        }`}
                    >
                        <button
                            onClick={() => setIsExitModalOpen(false)}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3 mb-3">
                            <ShieldAlert className="w-6 h-6 text-lambo-primary" />
                            <h3
                                className="text-xl font-bold uppercase tracking-wider font-barlow"
                            >
                                THOÁT KHỎI BỘ CẤU HÌNH
                            </h3>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                            Bạn có muốn lưu lại cấu hình độc bản của mình hoặc quay trở lại trang chi tiết dòng xe?
                        </p>

                        <div className="flex items-center gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setIsExitModalOpen(false)
                                    navigate(`/models/${carId}`)
                                }}
                                className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-neutral-600 hover:border-neutral-400 cursor-pointer font-barlow"
                            >
                                VỀ TRANG XE
                            </button>
                            <button
                                onClick={() => {
                                    setIsExitModalOpen(false)
                                    setIsSummaryOpen(true)
                                }}
                                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-lambo-primary text-lambo-bold-black hover:bg-lambo-hover active:bg-lambo-pressed cursor-pointer font-barlow"
                            >
                                XUẤT BẢNG BÁO GIÁ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
