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
  getOrdersByDeliveryBoy,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import DeleveryOrderDetailsView from "./deleveryOrderDetails";
import { markDeleveryAlertAsRead } from "@/store/admin/deleveryalert-slice";

function DeleveryOrder() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order
  const dispatch = useDispatch();

  const { employee } = useSelector((state) => state.adminEmployee);
  const { ordersByDeliveryBoy, orderDetails } = useSelector((state) => state.adminOrder);
useEffect(() => {
  if (employee?.id && employee?.name) {
    dispatch(getOrdersByDeliveryBoy(employee.name));
  }
}, [dispatch, employee]);




  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId)).then(() => {
      setSelectedOrder(getId); // Store the selected order ID
      setOpenDetailsDialog(true); // Open the modal
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Price</TableHead>
              <TableHead className="px-4 py-2 text-left">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {ordersByDeliveryBoy && ordersByDeliveryBoy.length > 0 ? (
    ordersByDeliveryBoy
      .slice()
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort newest first
      .map((orderItem) => (
        <TableRow key={orderItem?._id} className="border-b hover:bg-gray-100">
          <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
          <TableCell className="px-4 py-2">
            {orderItem?.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}
          </TableCell>
          <TableCell className="px-4 py-2">{orderItem?.orderStatus}</TableCell>
          <TableCell className="px-4 py-2">₹{orderItem?.totalAmount}</TableCell>
          <TableCell className="px-4 py-2">
            <Button
              className="bg-blue-800 hover:bg-blue-300"
              onClick={() => handleFetchOrderDetails(orderItem?._id)}
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan="5" className="text-center py-4">
        No orders found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </CardContent>

      {/* Dialog outside of map function */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }
        }}
      >
        <DeleveryOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </Card>
  );
}

export default DeleveryOrder;
