'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Layout } from '@/components/layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingCard } from '@/components/ui/loading-card'

const TopCustomers = dynamic(() => import('@/components/customers/top-customers').then(mod => mod.TopCustomers), {
  loading: () => <LoadingCard title="Top Customers" />,
})

const TopLocations = dynamic(() => import('@/components/customers/top-locations').then(mod => mod.TopLocations), {
  loading: () => <LoadingCard title="Top Locations" />,
})

const RecentOrders = dynamic(() => import('@/components/customers/recent-orders').then(mod => mod.RecentOrders), {
  loading: () => <LoadingCard title="Recent Orders" />,
})

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('top-customers')

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Customer Analytics</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="top-customers">Top Customers</TabsTrigger>
          <TabsTrigger value="top-locations">Top Locations</TabsTrigger>
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
        </TabsList>
        <Suspense fallback={<LoadingCard title="Loading..." />}>
          <TabsContent value="top-customers">
            <TopCustomers />
          </TabsContent>
          <TabsContent value="top-locations">
            <TopLocations />
          </TabsContent>
          <TabsContent value="recent-orders">
            <RecentOrders />
          </TabsContent>
        </Suspense>
      </Tabs>
    </Layout>
  )
}

