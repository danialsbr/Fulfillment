import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/useApi'

export function DownloadUpdatedFile() {
  const { downloadFile, isLoading } = useApi()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download Updated File</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={downloadFile} disabled={isLoading}>
          {isLoading ? 'Downloading...' : 'Download Updated File'}
        </Button>
      </CardContent>
    </Card>
  )
}

