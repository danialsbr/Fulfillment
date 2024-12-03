import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useApi } from '@/hooks/useApi'

export default function StatusPage() {
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected'>('disconnected')
  const [databaseStatus, setDatabaseStatus] = useState<'connected' | 'disconnected'>('disconnected')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { checkStatus, isLoading } = useApi()

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkStatus()
        setBackendStatus('connected')
        setDatabaseStatus(status.database_connected ? 'connected' : 'disconnected')
        setErrorMessage(null)
      } catch (error) {
        setBackendStatus('disconnected')
        setDatabaseStatus('disconnected')
        setErrorMessage('Failed to connect to the backend')
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [checkStatus])

  return (
    <div
