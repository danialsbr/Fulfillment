import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function RecentOrders() {
  // Sample data - replace with actual data fetching logic
  const recentOrders = [
    { id: 1, customerName: 'John Doe', orderDate: '2023-05-01', total: 150.00, status: 'Completed' },
    { id: 2, customerName: 'Jane Smith', orderDate: '2023-04-30', total: 200.00, status: 'Processing' },
    { id: 3, customerName: 'Bob Johnson', orderDate: '2023-04-29', total: 100.00, status: 'Shipped' },
    { id: 4, customerName: 'Alice Brown', orderDate: '2023-04-28', total: 300.00, status: 'Completed' },
    { id: 5, customerName: 'Charlie Davis', orderDate: '2023-04-27', total: 175.00, status: 'Processing' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

