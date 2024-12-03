'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function UploadOrdersPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleProcessFile = () => {
    // Process the uploaded file
    console.log('Processing file:', file?.name)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Upload Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload Order File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
            <Button onClick={handleProcessFile} disabled={!file}>Process File</Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

