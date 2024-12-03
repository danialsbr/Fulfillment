import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart2, Box, ChevronDown, ChevronRight, DollarSign, Home, Layers, Package, Settings, ShoppingCart, Users, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Sidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Determine which dropdown should be open based on the current path
    const shouldOpenOrderFulfillment = pathname.startsWith('/order-fulfillment')
    const shouldOpenReports = pathname.startsWith('/reports')
    const shouldOpenSettings = pathname.startsWith('/settings')

    const newOpenDropdowns = []
    if (shouldOpenOrderFulfillment) newOpenDropdowns.push('order-fulfillment')
    if (shouldOpenReports) newOpenDropdowns.push('reports')
    if (shouldOpenSettings) newOpenDropdowns.push('settings')

    setOpenDropdowns(newOpenDropdowns)
    setSelectedItem(pathname)
  }, [pathname])

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isItemSelected = (path: string) => selectedItem === path

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  return (
    <aside className="bg-gray-800 text-white w-64 space-y-2 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4 mb-6">
        <Layers className="h-8 w-8" />
        <span className="text-2xl font-extrabold">WEBIIX</span>
      </div>
      <nav className="space-y-1">
        <Link href="/" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/') ? 'bg-gray-700' : ''}`}>
          <Home className="w-5 h-5 mr-2" /> Dashboard
        </Link>
        <Link href="/sales" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/sales') ? 'bg-gray-700' : ''}`}>
          <DollarSign className="w-5 h-5 mr-2" /> Sales
        </Link>
        <Link href="/inventory" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/inventory') ? 'bg-gray-700' : ''}`}>
          <Box className="w-5 h-5 mr-2" /> Inventory
        </Link>
        <Link href="/customers" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/customers') ? 'bg-gray-700' : ''}`}>
          <Users className="w-5 h-5 mr-2" /> Customers
        </Link>
        <Link href="/orders" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/orders') ? 'bg-gray-700' : ''}`}>
          <ShoppingCart className="w-5 h-5 mr-2" /> Orders
        </Link>
        <Collapsible open={openDropdowns.includes('order-fulfillment')} onOpenChange={() => toggleDropdown('order-fulfillment')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <div className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              <span>Order Fulfillment</span>
            </div>
            {openDropdowns.includes('order-fulfillment') ? (
              <ChevronDown className="w-4 h-4 ml-2" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 space-y-1 mt-1">
            <Link href="/order-fulfillment/upload" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/upload') ? 'bg-gray-700' : ''}`}>
              Upload Orders
            </Link>
            <Link href="/order-fulfillment/scan" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/scan') ? 'bg-gray-700' : ''}`}>
              Scan SKUs
            </Link>
            <Link href="/order-fulfillment/transportation" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/transportation') ? 'bg-gray-700' : ''}`}>
              Assign Transportation
            </Link>
            <Link href="/order-fulfillment/status" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/status') ? 'bg-gray-700' : ''}`}>
              View Order Status
            </Link>
            <Link href="/order-fulfillment/download" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/download') ? 'bg-gray-700' : ''}`}>
              Download Reports
            </Link>
            <Link href="/order-fulfillment/reset" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/order-fulfillment/reset') ? 'bg-gray-700' : ''}`}>
              Reset Data
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={openDropdowns.includes('settings')} onOpenChange={() => toggleDropdown('settings')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              <span>Settings</span>
            </div>
            {openDropdowns.includes('settings') ? (
              <ChevronDown className="w-4 h-4 ml-2" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 space-y-1 mt-1">
            <Link href="/settings/profile" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/settings/profile') ? 'bg-gray-700' : ''}`}>
              Profile Settings
            </Link>
            <Link href="/settings/notifications" className={`block py-2 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isItemSelected('/settings/notifications') ? 'bg-gray-700' : ''}`}>
              Notification Settings
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <Link href="#" onClick={handleLogout} className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </Link>
      </nav>
    </aside>
  )
}

