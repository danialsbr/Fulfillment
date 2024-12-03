import { Layout } from '@/components/layout'
import { ProfileSettings } from '@/components/profile-settings'

export default function ProfileSettingsPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <ProfileSettings />
    </Layout>
  )
}

