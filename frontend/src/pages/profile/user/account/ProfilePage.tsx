import { useState } from 'react'
import { ScrollToTop } from '../../../../components/feedback'
import { SAMPLE_PROFILE } from '../../../../features/profile/user/account/data'
import { useProfile } from '../../../../features/profile/user/account/hooks'
import { ProfileHeader } from '../../../../features/profile/user/account/components/ProfileHeader'
import { ProfileTabs } from '../../../../features/profile/user/account/components/ProfileTabs'
import { ProfileForm } from '../../../../features/profile/user/account/components/ProfileForm'
import type { ProfileTab } from '../../../../features/profile/user/account/types'

export default function ProfilePage() {
    const { data, isLoading, isError } = useProfile()
    const [activeTab, setActiveTab] = useState<ProfileTab>('PERSONAL')

    const profile = data ?? (import.meta.env.DEV && isError ? SAMPLE_PROFILE : undefined)
    const hasError = isError && !profile

    return (
        <div className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <ProfileHeader />
                <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

                <div className="mt-10">
                    {isLoading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                        </div>
                    )}

                    {!isLoading && hasError && (
                        <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                            Không thể tải thông tin cá nhân. Vui lòng thử lại sau.
                        </div>
                    )}

                    {!isLoading && profile && activeTab === 'PERSONAL' && (
                        <ProfileForm key={profile.maKhachHang} initialValues={profile} />
                    )}

                    {!isLoading && activeTab !== 'PERSONAL' && (
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
