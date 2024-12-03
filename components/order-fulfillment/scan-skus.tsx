import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function ScanSKUs() {
  const [orderId, setOrderId] = useState('')
  const [sku, setSku] = useState('')

  const handleScanSku = () => {
    // Process the scanned SKU
    console.log('Scanning SKU:', sku, 'for Order:', orderId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan SKUs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="orderId">Order ID:</Label>
            <Input
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="sku">SKU:</Label>
            <Input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Scan SKU"
            />
            <Button onClick={handleScanSku}>Scan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

