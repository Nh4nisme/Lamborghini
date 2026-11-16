import { ScrollToTop } from '../components/feedback'
import { Eyebrow } from '../components/ui/Eyebrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SavedConfigurationCard } from '../features/saved-configurations/components/SavedConfigurationCard'
import { SAMPLE_SAVED_CONFIGURATIONS } from '../features/saved-configurations/data'
import { useSavedConfigurations } from '../features/saved-configurations/hooks'

export default function SavedConfigurationsPage() {
    const { data, isLoading, isError } = useSavedConfigurations()

    const configurations = data ?? (import.meta.env.DEV && isError ? SAMPLE_SAVED_CONFIGURATIONS : undefined)
    const hasError = isError && !configurations

    return (
        <div className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <header className="pt-10 pb-8">
                    <Eyebrow className="mb-2">Customer / Private Area</Eyebrow>
                    <SectionHeading as="h1">Cấu hình đã lưu</SectionHeading>
                    <p className="mt-3 text-base leading-6 text-lambo-hover">
                        Những lựa chọn mang dấu ấn riêng. Sẵn sàng cho bước tiếp theo.
                    </p>
                </header>

                <Eyebrow className="mt-10">02 Bản cấu hình / Được lưu vào tài khoản</Eyebrow>

                <div className="mt-8">
                    {isLoading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                        </div>
                    )}

                    {!isLoading && hasError && (
                        <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                            Không thể tải cấu hình đã lưu. Vui lòng thử lại sau.
                        </div>
                    )}

                    {!isLoading && configurations?.length === 0 && (
                        <div className="border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                            Bạn chưa lưu cấu hình nào.
                        </div>
                    )}

                    {!isLoading && configurations && configurations.length > 0 && (
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            {configurations.map((configuration) => (
                                <SavedConfigurationCard key={configuration.maLuuCauHinh} configuration={configuration} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ScrollToTop />
        </div>
    )
}
