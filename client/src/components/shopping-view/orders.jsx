import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import ShoppingOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { useClerk,UserButton, useUser} from '@clerk/clerk-react'


const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();
  const {orderList, orderDetails} = useSelector(state=>state.shopOrder);



  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetails(getId))
  }



  useEffect(()=>{

    dispatch(getAllOrdersByUserId(user?.id))

  },[dispatch])


  useEffect(()=>{
    if(orderDetails !== null)setOpenDetailsDialog(true)
  },[orderDetails])

  console.log(orderDetails,"orderDetails");
  const sortedOrders = orderList
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
              <TableCell>{orderItem?.totalAmount?.toFixed(2)}</TableCell>
              <TableCell>
             
              <Dialog open={openDetailsDialog} onOpenChange={()=>{
                setOpenDetailsDialog(false)
                dispatch(resetOrderDetails())
              }} >
                <Button className="bg-blue-800 hover:bg-blue-300" onClick={()=>handleFetchOrderDetails(orderItem?._id)}>
                  View Details
                </Button>
                <ShoppingOrderDetailsView orderDetails={orderDetails} />
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

export default ShoppingOrders