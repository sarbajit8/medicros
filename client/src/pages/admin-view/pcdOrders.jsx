import AdminDistributorOrdersView from '@/components/admin-view/distributorOrder'
import AdminPcdOrdersView from '@/components/admin-view/pcdOrder'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import React from 'react'

const AdminPcdOrders = () => {
  return (




    <div className='flex flex-col'>
 

    <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
      <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
        <Tabs defaultValue="orders">
          
          <TabsContent value='orders'>
          <AdminPcdOrdersView/>
          </TabsContent>

        </Tabs>

      </div>

    </div>
  </div>

   
  )
}

export default AdminPcdOrders