import { Layout } from '@/components/layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <Link href="/settings/profile" passHref>
          <Button variant="outline" className="w-full justify-start">Profile Settings</Button>
        </Link>
        <Link href="/settings/status" passHref>
          <Button variant="outline" className="w-full justify-start">System Status</Button>
        </Link>
      </div>
    </Layout>
  )
}

