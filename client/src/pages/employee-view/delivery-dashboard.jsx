import React from 'react'
import accImg from '../../assets/m1.png'

import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import DeleveryOrder from '@/components/delivery-view/order'
import DeleveryDistributorOrder from '@/components/delivery-view/distributorOrder'
import DeleveryEmployeeOrder from '@/components/delivery-view/DeleveryEmployeeOrder'
import DeleveryPcdOrder from '@/components/delivery-view/pcdOrder'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAlertByUserId, markAlertAsReadByEmployee } from '@/store/admin/alert-slice'
import { toast } from '@/hooks/use-toast';
import { useState } from 'react'
import { getDeleveryAlertByUserAndType, markDeleveryAlertAsRead } from '@/store/admin/deleveryalert-slice'

const DeliveryDashboard = () => {
    const { employee } = useSelector(state => state.adminEmployee);
  const dispatch = useDispatch();
  const { alerts } = useSelector(state => state.alert); // Pull from Redux

// useEffect(() => {
//   if (employee?.id) {
//     dispatch(getAlertByUserId(employee.id)).then((res) => {
//       const unreadAlert = res?.payload?.find((a) => a.status === "unread");

//       if (unreadAlert) {
//         toast({
//           title: "Admin Alert",
//           description: unreadAlert.type,
//           variant: "default",
//         });

//         dispatch(markAlertAsReadByEmployee(employee.id));
//       }
//     });
//   }
// }, [dispatch, employee?.id]);


const [alertStatuses, setAlertStatuses] = useState({
  order: false,
  employeeorders: false,
  distributororders: false,
  pcdorders: false,
});

useEffect(() => {
  if (employee?.id) {
    const types = ["order", "employeeorders", "distributororders", "pcdorders"];

    types.forEach(async (type) => {
      const res = await dispatch(getDeleveryAlertByUserAndType({ userid: employee.id, type }));

      if (res?.payload && res.payload.status === "unread") {
        setAlertStatuses((prev) => ({ ...prev, [type]: true }));
      }
    });
  }
}, [dispatch, employee?.id]);

 





  
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img
        width={"1600"}
        height={"300"}
           src={accImg}
           className='h-full w-full object-cover object-center '
         /> 
      </div>

      <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
         <Tabs
  // defaultValue="orders"
  onValueChange={(tabKey) => {
    if (employee?.id) {
      dispatch(markDeleveryAlertAsRead({ userid: employee.id, type: tabKey }));
      setAlertStatuses((prev) => ({ ...prev, [tabKey]: false }));
    }
  }}
>
  <TabsList>
    <div className="overflow-x-auto">
      <TabsTrigger
        value="order"
        className={alertStatuses["order"] ? "bg-green-100 text-green-700" : ""}
      >
        Orders
      </TabsTrigger>

      <TabsTrigger
        value="employeeorders"
        className={alertStatuses["employeeorders"] ? "bg-green-100 text-green-700" : ""}
      >
        Employee Orders
      </TabsTrigger>

      <TabsTrigger
        value="distributororders"
        className={alertStatuses["distributororders"] ? "bg-green-100 text-green-700" : ""}
      >
        Distributor Orders
      </TabsTrigger>

      <TabsTrigger
        value="pcdorders"
        className={alertStatuses["pcdorders"] ? "bg-green-100 text-green-700" : ""}
      >
        PCD Orders
      </TabsTrigger>
    </div>
  </TabsList>

            <TabsContent value='order'>
              <DeleveryOrder/>
            </TabsContent>
            <TabsContent value='employeeorders'>
              <DeleveryEmployeeOrder/>
            </TabsContent>
            <TabsContent value='distributororders'>
              <DeleveryDistributorOrder/>
            </TabsContent>
            <TabsContent value='pcdorders'>
              <DeleveryPcdOrder/>
            </TabsContent>

          </Tabs>

        </div>

      </div>
    </div>
  )
}



export default DeliveryDashboard