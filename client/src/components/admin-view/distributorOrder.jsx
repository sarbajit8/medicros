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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import AdminDistributorOrderDetailsView from "./adminDistributorOrderDetailsView";
import { getAllDistributorOrdersForAdmin, getDistributorOrderDetailsForAdmin } from "@/store/admin/distributorOrder-slice";

function AdminDistributorOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const {distributorOrderList, distributorOrderDetails} = useSelector(state=>state.adminDistributorOrder);
  
  const dispatch = useDispatch();

    const [selectedOrderId, setSelectedOrderId] = useState(null);
  

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId); 
    dispatch(getDistributorOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllDistributorOrdersForAdmin());
  }, [dispatch]);

  console.log(distributorOrderDetails, "orderListwwwwwwwwwwwwwwwwwwwwww");

  useEffect(() => {
    if (distributorOrderDetails !== null && distributorOrderDetails._id === selectedOrderId) setOpenDetailsDialog(true);
  }, [distributorOrderDetails]);



  

  const sortedOrders = distributorOrderList
  ?.slice()
  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

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
            {sortedOrders && sortedOrders.length > 0
              ? sortedOrders.map((orderItem) => (
                  <TableRow className="border-b hover:bg-gray-100">
                    <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
                    <TableCell className="px-4 py-2">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="px-4 py-2">
                     
                        {orderItem?.orderStatus}
                     
                    </TableCell >
                    {/* <TableCell className="px-4 py-2">${orderItem?.totalAmount}</TableCell> */}
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
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminDistributorOrderDetailsView orderDetails={distributorOrderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminDistributorOrdersView;
