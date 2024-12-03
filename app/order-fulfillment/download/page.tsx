'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DownloadReportsPage() {
  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading updated Excel report')
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Download Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Download Updated Excel Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDownload}>Download Updated File</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

