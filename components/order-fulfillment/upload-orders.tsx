import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useApi } from '@/hooks/useApi'
import { useToast } from '@/components/ui/use-toast'

export function UploadOrders() {
  const [file, setFile] = useState<File | null>(null)
  const { uploadFile, isLoading } = useApi()
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleProcessFile = async () => {
    if (!file) return
    try {
      const result = await uploadFile(file)
      toast({
        title: "Success",
        description: result.message,
      })
      setFile(null)
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Order File</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
          <Button onClick={handleProcessFile} disabled={!file || isLoading}>
            {isLoading ? 'Uploading...' : 'Process File'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

