import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function TopLocations() {
  // Sample data - replace with actual data fetching logic
  const topCities = [
    { id: 1, name: 'New York', totalCustomers: 1000, totalOrders: 5000 },
    { id: 2, name: 'Los Angeles', totalCustomers: 800, totalOrders: 4000 },
    { id: 3, name: 'Chicago', totalCustomers: 600, totalOrders: 3000 },
    { id: 4, name: 'Houston', totalCustomers: 500, totalOrders: 2500 },
    { id: 5, name: 'Phoenix', totalCustomers: 400, totalOrders: 2000 },
  ]

  const topStates = [
    { id: 1, name: 'California', totalCustomers: 5000, totalOrders: 25000 },
    { id: 2, name: 'Texas', totalCustomers: 4000, totalOrders: 20000 },
    { id: 3, name: 'Florida', totalCustomers: 3500, totalOrders: 17500 },
    { id: 4, name: 'New York', totalCustomers: 3000, totalOrders: 15000 },
    { id: 5, name: 'Pennsylvania', totalCustomers: 2500, totalOrders: 12500 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cities">Top Cities</TabsTrigger>
            <TabsTrigger value="states">Top States</TabsTrigger>
          </TabsList>
          <TabsContent value="cities">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>Total Customers</TableHead>
                  <TableHead>Total Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCities.map((city) => (
                  <TableRow key={city.id}>
                    <TableCell>{city.name}</TableCell>
                    <TableCell>{city.totalCustomers}</TableCell>
                    <TableCell>{city.totalOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="states">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>Total Customers</TableHead>
                  <TableHead>Total Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topStates.map((state) => (
                  <TableRow key={state.id}>
                    <TableCell>{state.name}</TableCell>
                    <TableCell>{state.totalCustomers}</TableCell>
                    <TableCell>{state.totalOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

