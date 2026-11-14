import { useState, useEffect } from 'react'
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
import { useXeConfigurator } from '../features/configurator/hooks'
import { Check, X, ShieldAlert } from 'lucide-react'

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

    // 1. Fetch car data from backend API
    const { data: carData } = useXeConfigurator(carId)

    // Car configuration state
    const [config, setConfig] = useState<CarConfiguration>(() => ({
        model: 'Revuelto HPEV',
        exteriorColor: PAINT_COLORS[0], // Arancio Borealis default
        rim: RIMS[0], // Multi-spoke / gloss black
        caliper: CALIPERS[0], // Giallo
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
        customModelUrl: '/models/lamborghini_sc18_draco.glb',
        customModelName: 'Lamborghini SC18 Alston (Draco 3MB)',
    }))

    // Sync car model name from backend API if loaded
    useEffect(() => {
        if (carData?.tenPhienBan) {
            setConfig((prev) => ({
                ...prev,
                model: carData.tenPhienBan,
            }))
        }
    }, [carData])

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
        setConfig((prev) => ({
            ...prev,
            exteriorColor: PAINT_COLORS[0],
            rim: RIMS[0],
            carbonLower: 'body',
            doorsOpen: false,
            interiorTrim: INTERIOR_TRIMS[0],
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

    return (
        <div
            className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-200 select-none ${
                isLight ? 'bg-[#f4f4f6] text-[#111111]' : 'bg-lambo-bold-black text-[#ffffff]'
            }`}
        >
            {/* 1. Top Header Bar */}
            <FigmaHeader
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

            {/* 2. Main Middle Section: Left 3D Canvas + Right Configuration Panel */}
            <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden w-full">
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
                    <div className="absolute top-24 left-6 md:left-8 z-20 hidden sm:flex items-center gap-1.5 p-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                        <button
                            onClick={() => {
                                setConfig((prev) => ({
                                    ...prev,
                                    customModelUrl: '/models/lamborghini_sc18_draco.glb',
                                    customModelName: 'Lamborghini SC18 Alston (Draco 3MB)',
                                }))
                            }}
                            className={`px-2.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1 font-semibold ${
                                config.customModelUrl
                                    ? 'bg-lambo-primary text-lambo-bold-black shadow-sm'
                                    : 'text-neutral-300 hover:text-white'
                            }`}
                        >
                            {config.customModelUrl && <Check className="w-3 h-3" />}
                            <span>SC18 GLB</span>
                        </button>
                        <button
                            onClick={() => {
                                setConfig((prev) => ({
                                    ...prev,
                                    customModelUrl: null,
                                    customModelName: null,
                                }))
                            }}
                            className={`px-2.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1 font-semibold ${
                                !config.customModelUrl
                                    ? 'bg-lambo-primary text-lambo-bold-black shadow-sm'
                                    : 'text-neutral-300 hover:text-white'
                            }`}
                        >
                            {!config.customModelUrl && <Check className="w-3 h-3" />}
                            <span>Revuelto 3D</span>
                        </button>
                    </div>
                </div>

                {/* 2B. Right Configuration Sidebar Panel */}
                <FigmaRightPanel
                    currentStep={currentStep}
                    config={config}
                    onUpdateConfig={handleUpdateConfig}
                    onSelectColor={handleSelectColor}
                    theme={theme}
                />
            </div>

            {/* 3. Bottom Sticky Action Bar */}
            <FigmaBottomBar
                config={config}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onSave={() => setIsSummaryOpen(true)}
                onReset={handleResetConfig}
                theme={theme}
            />

            {/* 4. Specification Sheet Modal */}
            <SummaryModal
                config={config}
                isOpen={isSummaryOpen}
                onClose={() => setIsSummaryOpen(false)}
            />

            {/* 5. Exit Confirmation Modal */}
            {isExitModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
                    <div
                        className={`w-full max-w-md p-6 border shadow-2xl relative ${
                            isLight
                                ? 'bg-white border-neutral-300 text-black'
                                : 'bg-lambo-dark-light border-neutral-800 text-white'
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
