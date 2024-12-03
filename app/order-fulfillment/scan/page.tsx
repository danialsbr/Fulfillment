'use client'

import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'

interface SKU {
  id: string;
  name: string;
  scanned: boolean;
  image: string;
}

interface Order {
  id: string;
  skus: SKU[];
}

export default function ScanSKUsPage() {
  const [orderId, setOrderId] = useState('')
  const [sku, setSku] = useState('')
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [scannedSKU, setScannedSKU] = useState<SKU | null>(null)

  // Mock function to fetch order details
  const fetchOrder = (id: string): Order | null => {
    // This is a mock implementation. In a real app, you'd fetch this data from your backend.
    const mockOrder: Order = {
      id: id,
      skus: [
        { id: 'SKU001', name: 'Product 1', scanned: false, image: '/placeholder.svg?height=200&width=200' },
        { id: 'SKU002', name: 'Product 2', scanned: false, image: '/placeholder.svg?height=200&width=200' },
        { id: 'SKU003', name: 'Product 3', scanned: false, image: '/placeholder.svg?height=200&width=200' },
      ]
    }
    return mockOrder
  }

  const handleScanOrder = () => {
    const order = fetchOrder(orderId)
    if (order) {
      setCurrentOrder(order)
      setSku('')
      setScannedSKU(null)
    } else {
      alert('Order not found')
    }
  }

  const handleScanSku = () => {
    if (!currentOrder) {
      alert('Please scan an order first')
      return
    }

    const scannedItem = currentOrder.skus.find(item => item.id === sku)
    if (scannedItem) {
      setScannedSKU(scannedItem)
      setCurrentOrder(prevOrder => {
        if (!prevOrder) return null
        return {
          ...prevOrder,
          skus: prevOrder.skus.map(item => 
            item.id === sku ? { ...item, scanned: true } : item
          )
        }
      })
    } else {
      alert('SKU not found in this order')
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Scan SKUs</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scan Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="orderId">Order ID:</Label>
              <Input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
              />
              <Button onClick={handleScanOrder}>Scan Order</Button>
            </div>
          </CardContent>
        </Card>

        {currentOrder && (
          <Card>
            <CardHeader>
              <CardTitle>Scan SKUs for Order {currentOrder.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="sku">SKU:</Label>
                  <Input
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Scan SKU"
                  />
                  <Button onClick={handleScanSku}>Scan SKU</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.skus.map((item) => (
                        <TableRow key={item.id} className={item.scanned ? 'bg-green-100' : ''}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.scanned ? 'Scanned' : 'Pending'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {scannedSKU && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Scanned Product</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <Image
                            src={scannedSKU.image}
                            alt={scannedSKU.name}
                            width={200}
                            height={200}
                            className="mb-4"
                          />
                          <p className="text-lg font-semibold">{scannedSKU.name}</p>
                          <p className="text-sm text-gray-500">{scannedSKU.id}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}

