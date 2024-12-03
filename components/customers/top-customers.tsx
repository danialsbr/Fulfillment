import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function TopCustomers() {
  // Sample data - replace with actual data fetching logic
  const topCustomers = [
    { id: 1, name: 'John Doe', totalOrders: 50, totalSpent: 5000 },
    { id: 2, name: 'Jane Smith', totalOrders: 45, totalSpent: 4500 },
    { id: 3, name: 'Bob Johnson', totalOrders: 40, totalSpent: 4000 },
    { id: 4, name: 'Alice Brown', totalOrders: 35, totalSpent: 3500 },
    { id: 5, name: 'Charlie Davis', totalOrders: 30, totalSpent: 3000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

