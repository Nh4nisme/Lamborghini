import { useState } from 'react'
import { ScrollToTop } from '../../../../components/feedback'
import { DealerInformationForm } from '../../../../features/profile/dealer/information/components/DealerInformationForm'
import { DealerInformationHeader } from '../../../../features/profile/dealer/information/components/DealerInformationHeader'
import { DealerInformationTabs } from '../../../../features/profile/dealer/information/components/DealerInformationTabs'
import { DealerSecurityForm } from '../../../../features/profile/dealer/information/components/DealerSecurityForm'
import { useChangeDealerPassword, useDealerProfile } from '../../../../features/profile/dealer/information/hooks'
import type { DealerInformationTab } from '../../../../features/profile/dealer/information/types'

export default function DealerInformationPage() {
    const { data, isLoading, isError } = useDealerProfile()
    const [activeTab, setActiveTab] = useState<DealerInformationTab>('PERSONAL')
    const changePasswordMutation = useChangeDealerPassword()

    const profile = data
    const hasError = isError

    return (
        <div data-node-id="2022:5444" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <DealerInformationHeader />
                <DealerInformationTabs activeTab={activeTab} onChange={setActiveTab} />

                <div className="mt-10">
                    {isLoading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                        </div>
                    )}

                    {!isLoading && hasError && (
                        <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                            Không thể tải hồ sơ dealer. Vui lòng thử lại sau.
                        </div>
                    )}

                    {!isLoading && profile && activeTab === 'PERSONAL' && (
                        <DealerInformationForm key={profile.maDealer} initialValues={profile} />
                    )}

                    {!isLoading && activeTab === 'SECURITY' && (
                        <DealerSecurityForm
                            onSubmit={(payload) => changePasswordMutation.mutate(payload)}
                            isSubmitting={changePasswordMutation.isPending}
                        />
                    )}

                    {!isLoading && activeTab === 'SHOWROOM' && (
                        <div className="border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                            Nội dung đang được cập nhật.
                        </div>
                    )}
                </div>
            </div>

            <ScrollToTop />
        </div>
    )
}
