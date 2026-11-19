import { useState } from 'react'
import { ScrollToTop } from '../components/feedback/ScrollToTop'
import { ConfigurationPreview } from '../features/configuration-export/components/ConfigurationPreview'
import { ExportHeader } from '../features/configuration-export/components/ExportHeader'
import { ExportSettingsPanel } from '../features/configuration-export/components/ExportSettingsPanel'
import { EXPORT_FORMAT_OPTIONS, SAMPLE_EXPORT_CONFIGURATION } from '../features/configuration-export/data'

export default function ConfigurationExportPage() {
    const [format, setFormat] = useState(EXPORT_FORMAT_OPTIONS[0].value)
    const [includeOptions, setIncludeOptions] = useState(true)
    const configuration = SAMPLE_EXPORT_CONFIGURATION

    const handleCopyLink = () => {
        void navigator.clipboard.writeText(`https://${configuration.linkChiaSe}`)
    }

    return (
        <div data-node-id="2009:5894" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <ExportHeader />

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_416px]">
                    <ConfigurationPreview configuration={configuration} />

                    <ExportSettingsPanel
                        format={format}
                        onFormatChange={setFormat}
                        includeOptions={includeOptions}
                        onIncludeOptionsChange={setIncludeOptions}
                        shareLink={configuration.linkChiaSe}
                        onCopyLink={handleCopyLink}
                    />
                </div>
            </div>

            <ScrollToTop />
        </div>
    )
}
