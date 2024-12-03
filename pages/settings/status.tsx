import { Layout } from '@/components/layout'
import { StatusPage } from '@/components/status-page'

export default function SettingsStatusPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">System Status</h1>
      <StatusPage />
    </Layout>
  )
}

