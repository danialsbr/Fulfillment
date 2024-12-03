import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useApi } from '@/hooks/useApi'
import { useToast } from '@/components/ui/use-toast'

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  scanned: number;
}

interface Order {
  id: string;
  SKUs: Record<string, OrderItem>;
}

const getStatusColor = (scanned: number, quantity: number) => {
  if (scanned >= quantity) return 'bg-green-500 hover:bg-green-600';
  if (scanned > 0) return 'bg-orange-500 hover:bg-orange-600';
  return 'bg-red-500 hover:bg-red-600';
};

export function OrderStatus() {
  const [orders, setOrders] = useState<Record<string, Order>>({})
  const { getOrders, isLoading } = useApi()
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  return (
    <div className="space-y-6">
      {Object.entries(orders).map(([orderId, order]) => (
        <Card key={orderId}>
          <CardHeader>
            <CardTitle>Order #{orderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Scanned</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(order.SKUs).map(([sku, item]) => (
                  <TableRow key={sku}>
                    <TableCell>{sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.scanned}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.scanned, item.quantity)}>
                        {item.scanned >= item.quantity ? 'Fulfilled' : item.scanned > 0 ? 'Partial' : 'Pending'}
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
  )
}

