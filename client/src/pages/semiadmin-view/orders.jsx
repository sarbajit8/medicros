import AdminOrdersView from '@/components/admin-view/orders'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const SemiAdminOrders = () => {
  return (

    <div className='flex flex-col'>
 

    <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
      <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
        <Tabs defaultValue="orders">
          
          <TabsContent value='orders'>
          <AdminOrdersView/>
          </TabsContent>

        </Tabs>

      </div>

    </div>
  </div>




    // <div>
    //   <AdminOrdersView/>
    // </div>
  )
}

export default SemiAdminOrders