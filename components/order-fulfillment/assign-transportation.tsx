import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function AssignTransportation() {
  const [orderId, setOrderId] = useState('')
  const [transportationType, setTransportationType] = useState('')

  const handleAssignTransportation = () => {
    // Assign transportation type
    console.log('Assigning transportation:', transportationType, 'to order:', orderId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Transportation</CardTitle>
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
            <Label htmlFor="transportationType">Type:</Label>
            <Select onValueChange={setTransportationType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="post">پست</SelectItem>
                <SelectItem value="snapp-box">اسنپ باکس</SelectItem>
                <SelectItem value="mahex">ماهکس</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAssignTransportation}>Assign</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

