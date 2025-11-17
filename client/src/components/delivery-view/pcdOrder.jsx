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
import { Badge } from "../ui/badge";
import {
  getPcdOrdersByDeliveryBoy,
  getPcdOrderDetailsForAdmin,
  resetPcdOrderDetails,
} from "@/store/admin/pcdOrder-slice";
import DeleveryPcdOrderDetailsView from "./deleveryPcdOrderDetails";

function DeleveryPcdOrder() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { employee } = useSelector((state) => state.adminEmployee);
  const {
    pcdOrdersByDeliveryBoy,
    pcdOrderDetails,
  } = useSelector((state) => state.adminPcdOrder);
  const dispatch = useDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId);
    dispatch(getPcdOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    if (employee?.name) {
      dispatch(getPcdOrdersByDeliveryBoy(employee.name));
    }
  }, [dispatch, employee]);

  useEffect(() => {
    if (
      pcdOrderDetails !== null &&
      pcdOrderDetails._id === selectedOrderId
    ) {
      setOpenDetailsDialog(true);
    }
  }, [pcdOrderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>PCD Orders for Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {pcdOrdersByDeliveryBoy && pcdOrdersByDeliveryBoy.length > 0 ? (
    [...pcdOrdersByDeliveryBoy]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .map((orderItem) => (
        <TableRow key={orderItem._id} className="hover:bg-gray-100">
          <TableCell>{orderItem._id}</TableCell>
          <TableCell>
            {orderItem.orderDate
              ? orderItem.orderDate.split("T")[0]
              : "N/A"}
          </TableCell>
          <TableCell>{orderItem.orderStatus}</TableCell>
          <TableCell>
            <Dialog
              open={openDetailsDialog}
              onOpenChange={() => {
                setOpenDetailsDialog(false);
                dispatch(resetPcdOrderDetails());
              }}
            >
              <Button
                className="bg-blue-800 hover:bg-blue-300"
                onClick={() => handleFetchOrderDetails(orderItem._id)}
              >
                View Details
              </Button>
              <DeleveryPcdOrderDetailsView orderDetails={pcdOrderDetails} />
            </Dialog>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} className="text-center text-muted-foreground">
        No PCD orders assigned.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}

export default DeleveryPcdOrder;
