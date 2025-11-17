// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrdersByDeliveryBoy } from '@/store/admin/order-slice';
// import { getDistributorOrdersByDeliveryBoy } from '@/store/admin/distributorOrder-slice';

// const DeleveryDistributorOrder = () => {
//   const dispatch = useDispatch();
//   const { employee } = useSelector((state) => state.adminEmployee);
//   const { distributorsOrdersByDeliveryBoy, isLoading } = useSelector((state) => state.adminDistributorOrder); // ✅ Ensure correct state slice

//   useEffect(() => {
//     if (employee?.name) {
//       dispatch(getDistributorOrdersByDeliveryBoy(employee.name));
//     }
//   }, [dispatch, employee]);
//   console.log(distributorsOrdersByDeliveryBoy,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { getAllDistributorOrdersForAdmin, getDistributorOrderDetailsForAdmin, getDistributorOrdersByDeliveryBoy } from "@/store/admin/distributorOrder-slice";
import AdminDistributorOrderDetailsView from "../admin-view/adminDistributorOrderDetailsView";
import DeleveryDistributorOrderDetailsView from "./deleveryDistributorOrderDetails";

function DeleveryDistributorOrder() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const {distributorOrderList, distributorOrderDetails} = useSelector(state=>state.adminDistributorOrder);
    const { employee } = useSelector((state) => state.adminEmployee);
    const { distributorsOrdersByDeliveryBoy, isLoading } = useSelector((state) => state.adminDistributorOrder); // ✅ Ensure correct state slice
  
  const dispatch = useDispatch();

    const [selectedOrderId, setSelectedOrderId] = useState(null);
  

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId); 
    dispatch(getDistributorOrderDetailsForAdmin(getId));
  }
 

   
  
    useEffect(() => {
      if (employee?.name) {
        dispatch(getDistributorOrdersByDeliveryBoy(employee.name));
      }
    }, [dispatch, employee]);
    console.log(distributorsOrdersByDeliveryBoy,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  useEffect(() => {
    dispatch(getAllDistributorOrdersForAdmin());
  }, [dispatch]);

  console.log(distributorOrderDetails, "orderListwwwwwwwwwwwwwwwwwwwwww");

  useEffect(() => {
    if (distributorOrderDetails !== null && distributorOrderDetails._id === selectedOrderId) setOpenDetailsDialog(true);
  }, [distributorOrderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distributors Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
              {/* <TableHead className="px-4 py-2 text-left">Order Price</TableHead> */}
              <TableHead className="px-4 py-2 text-left">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {distributorsOrdersByDeliveryBoy && distributorsOrdersByDeliveryBoy.length > 0 ? (
    [...distributorsOrdersByDeliveryBoy]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // sort by latest date first
      .map((orderItem) => (
        <TableRow key={orderItem?._id} className="border-b hover:bg-gray-100">
          <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
          <TableCell className="px-4 py-2">
            {orderItem?.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}
          </TableCell>
          <TableCell className="px-4 py-2">
            {orderItem?.orderStatus}
          </TableCell>
          <TableCell className="px-4 py-2">
            <Dialog
              open={openDetailsDialog}
              onOpenChange={() => {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}
            >
              <Button
                className="bg-blue-800 hover:bg-blue-300"
                onClick={() => handleFetchOrderDetails(orderItem?._id)}
              >
                View Details
              </Button>
              <DeleveryDistributorOrderDetailsView orderDetails={distributorOrderDetails} />
            </Dialog>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} className="text-center py-4">
        No distributor orders found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}


export default DeleveryDistributorOrder