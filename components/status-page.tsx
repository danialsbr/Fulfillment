import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useApi } from '@/hooks/useApi'

interface StatusData {
  frontend: string
  backend: string
  database: string
  lastChecked: string
}

export function StatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null)
  const { getStatus, isLoading } = useApi()

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  const fetchStatus = async () => {
    try {
      const data = await getStatus()
      setStatus(data)
    } catch (error) {
      console.error('Error fetching status:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>
      case 'issue':
        return <Badge className="bg-yellow-500">Issue</Badge>
      case 'down':
        return <Badge className="bg-red-500">Down</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  if (isLoading) {
    return <div>Loading status...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">System Status</h1>
      {status ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              {getStatusBadge(status.frontend)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Backend</CardTitle>
            </CardHeader>
            <CardContent>
              {getStatusBadge(status.backend)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
            </CardHeader>
            <CardContent>
              {getStatusBadge(status.database)}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>Unable to fetch status information</div>
      )}
      {status && (
        <p className="mt-4 text-sm text-gray-500">
          Last checked: {status.lastChecked}
        </p>
      )}
    </div>
  )
}

