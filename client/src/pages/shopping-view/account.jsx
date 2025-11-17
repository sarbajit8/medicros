import React from 'react'
import accImg from '../../assets/rm5.jpg'
import accImg1 from '../../assets/acountm.jpg'

import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/orders'
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orders'
import DistributorOrderList from '@/components/shopping-view/distributorOrderList'
import PcdOrderList from '@/components/shopping-view/pcdOrderList'


const ShoppingAccount = () => {

  
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img
        width={"1600"}
        height={"300"}
           src={accImg1}
           className='h-full w-full object-cover object-center '
         /> 
      </div>

      <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
        <Tabs defaultValue="orders">
  <div className="overflow-x-auto">
    <TabsList className="flex w-max min-w-full space-x-2 sm:justify-start">
      <TabsTrigger value="orders">Orders</TabsTrigger>
      <TabsTrigger value="distributorsorders">Distributor Orders</TabsTrigger>
      <TabsTrigger value="pcdorders">Pcd Orders</TabsTrigger>
      <TabsTrigger value="address">Address</TabsTrigger>
    </TabsList>
  </div>

  <TabsContent value='orders'>
    <ShoppingOrders/>
  </TabsContent>
  <TabsContent value='distributorsorders'>
    <DistributorOrderList/>
  </TabsContent>
  <TabsContent value='pcdorders'>
    <PcdOrderList/>
  </TabsContent>
  <TabsContent value='address'>
    <Address/>
  </TabsContent>
</Tabs>


        </div>

      </div>
    </div>
  )
}

export default ShoppingAccount