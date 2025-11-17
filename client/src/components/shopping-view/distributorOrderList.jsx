import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import ShoppingOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { getAllDistributorOrdersByUserId, getDistributorOrderDetails } from '@/store/shop/distributorOrder-slice'
import DistributorOrderDetailsView from './distributorOrderDetails'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'


const DistributorOrderList = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();
  const {distributorOrderList, distributorOrderDetails} = useSelector(state=>state.distributorOrder);



  function handleFetchOrderDetails(getId){
    dispatch(getDistributorOrderDetails(getId))
  }

 console.log(distributorOrderList,user?.id,"ggggggggggggggggggggggggggggg");
 

  useEffect(()=>{

    dispatch(getAllDistributorOrdersByUserId(user?.id))

  },[dispatch])


  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  useEffect(() => {
    if (distributorOrderDetails !== null && distributorOrderDetails._id === selectedOrderId) {
      setOpenDetailsDialog(true);
    }
  }, [distributorOrderDetails, selectedOrderId]);
  
  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId); // Store selected order ID
    dispatch(getDistributorOrderDetails(getId));
  }

  const sortedOrders = distributorOrderList
  ?.slice()
  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  

  return <Card>
  <CardHeader>
    <CardTitle>Order History</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Order Price</TableHead>
          <TableHead>
            <span className="sr-only">Details</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          sortedOrders && sortedOrders.length > 0 ?
          sortedOrders.map(orderItem=>


            <TableRow>
            <TableCell>{orderItem?._id}</TableCell>
            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
            <TableCell>
            <Badge
                        className={`py-1 px-3 bg-blue-800`}


                        // ${
                        //   orderItem?.orderStatus === "confirmed"
                        //     ? "bg-green-500"
                        //     : orderItem?.orderStatus === "rejected"
                        //     ? "bg-red-600"
                        //     : "bg-black"
                        // }
                      >
                        {orderItem?.orderStatus}
                      </Badge>
              </TableCell>
            <TableCell>{orderItem?.totalAmount}</TableCell>
            <TableCell>
             
              <Dialog open={openDetailsDialog} onOpenChange={()=>{
                setOpenDetailsDialog(false)
                dispatch(resetOrderDetails())
              }} >
                <Button className="bg-blue-800 hover:bg-blue-300" onClick={()=>handleFetchOrderDetails(orderItem?._id)}>
                  View Details
                </Button>
                <DistributorOrderDetailsView distributorOrderDetails={distributorOrderDetails} />
              </Dialog>
            </TableCell>
          </TableRow>




            )
          : null
        }
       
        
           
      </TableBody>
    </Table>
  </CardContent>
</Card>
}

export default DistributorOrderList