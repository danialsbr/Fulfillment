'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  status: 'In Stock' | 'Out of Stock' | 'Issue';
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  transportation: string;
  items: OrderItem[];
}

const getStatusColor = (status: OrderItem['status']) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-500 hover:bg-green-600';
    case 'Out of Stock':
      return 'bg-red-500 hover:bg-red-600';
    case 'Issue':
      return 'bg-orange-500 hover:bg-orange-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export default function ViewOrderStatusPage() {
  // Sample data - replace with actual data fetching logic
  const orders: Order[] = [
    {
      id: '12345',
      customerName: 'John Doe',
      date: '2023-05-01',
      status: 'Processing',
      transportation: 'پست',
      items: [
        { id: 'SKU-001', name: 'Product A', quantity: 2, status: 'In Stock', image: '/placeholder.svg?height=50&width=50' },
        { id: 'SKU-002', name: 'Product B', quantity: 1, status: 'Out of Stock', image: '/placeholder.svg?height=50&width=50' },
      ]
    },
    {
      id: '12346',
      customerName: 'Jane Smith',
      date: '2023-05-02',
      status: 'Shipped',
      transportation: 'اسنپ باکس',
      items: [
        { id: 'SKU-003', name: 'Product C', quantity: 3, status: 'In Stock', image: '/placeholder.svg?height=50&width=50' },
        { id: 'SKU-004', name: 'Product D', quantity: 1, status: 'Issue', image: '/placeholder.svg?height=50&width=50' },
      ]
    },
    {
      id: '12347',
      customerName: 'Bob Johnson',
      date: '2023-05-03',
      status: 'Delivered',
      transportation: 'ماهکس',
      items: [
        { id: 'SKU-005', name: 'Product E', quantity: 1, status: 'In Stock', image: '/placeholder.svg?height=50&width=50' },
      ]
    },
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">View Order Status</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Transportation:</strong> {order.transportation}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}

