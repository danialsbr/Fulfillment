'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Layout } from '@/components/layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingCard } from '@/components/ui/loading-card'

const UploadOrders = dynamic(() => import('@/components/order-fulfillment/upload-orders').then(mod => mod.UploadOrders), {
  loading: () => <LoadingCard title="Upload Orders" />,
})

const ScanSKUs = dynamic(() => import('@/components/order-fulfillment/scan-skus').then(mod => mod.ScanSKUs), {
  loading: () => <LoadingCard title="Scan SKUs" />,
})

const AssignTransportation = dynamic(() => import('@/components/order-fulfillment/assign-transportation').then(mod => mod.AssignTransportation), {
  loading: () => <LoadingCard title="Assign Transportation" />,
})

const OrderStatus = dynamic(() => import('@/components/order-fulfillment/order-status').then(mod => mod.OrderStatus), {
  loading: () => <LoadingCard title="Order Status" />,
})

const DownloadUpdatedFile = dynamic(() => import('@/components/order-fulfillment/download-updated-file').then(mod => mod.DownloadUpdatedFile), {
  loading: () => <LoadingCard title="Download Updated File" />,
})

export default function OrderFulfillmentPage() {
  const [activeTab, setActiveTab] = useState('upload')

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Order Fulfillment</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Orders</TabsTrigger>
          <TabsTrigger value="scan">Scan SKUs</TabsTrigger>
          <TabsTrigger value="assign">Assign Transportation</TabsTrigger>
          <TabsTrigger value="status">Order Status</TabsTrigger>
          <TabsTrigger value="download">Download Updated File</TabsTrigger>
        </TabsList>
        <Suspense fallback={<LoadingCard title="Loading..." />}>
          <TabsContent value="upload">
            <UploadOrders />
          </TabsContent>
          <TabsContent value="scan">
            <ScanSKUs />
          </TabsContent>
          <TabsContent value="assign">
            <AssignTransportation />
          </TabsContent>
          <TabsContent value="status">
            <OrderStatus />
          </TabsContent>
          <TabsContent value="download">
            <DownloadUpdatedFile />
          </TabsContent>
        </Suspense>
      </Tabs>
    </Layout>
  )
}

