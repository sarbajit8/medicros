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
// import AdminPcdOrderDetailsView from "./adminPcdOrderDetailsView";
import { getAllPcdOrdersForAdmin, getPcdOrderDetailsForAdmin, resetPcdOrderDetails } from "@/store/admin/pcdOrder-slice";
import AdminPcdOrderDetailsView from "./adminPcdOrderDetails";
// import { getAllPcdOrdersForAdmin,
//      getPcdOrderDetailsForAdmin, resetPcdOrderDetails } from "@/store/admin/pcdOrder-slice";
// import {
//   getAllPcdOrdersForAdmin,
//   getPcdOrderDetailsForAdmin,
//   resetPcdOrderDetails,
// } from "@/store/admin/pcdOrder-slice";

function AdminPcdOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { pcdOrderList, pcdOrderDetails } = useSelector(
    (state) => state.adminPcdOrder
  );
  const dispatch = useDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId);
    dispatch(getPcdOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllPcdOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (pcdOrderDetails !== null && pcdOrderDetails._id === selectedOrderId) {
      setOpenDetailsDialog(true);
    }
  }, [pcdOrderDetails]);

  const sortedOrders = pcdOrderList
    ?.slice()
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <Card>
      <CardHeader>
        <CardTitle>PCD Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
              <TableHead className="px-4 py-2 text-left">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders && sortedOrders.length > 0
              ? sortedOrders.map((orderItem) => (
                  <TableRow className="border-b hover:bg-gray-100" key={orderItem?._id}>
                    <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
                    <TableCell className="px-4 py-2">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="px-4 py-2">{orderItem?.orderStatus}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetPcdOrderDetails());
                        }}
                      >
                        <Button
                          className="bg-blue-800 hover:bg-blue-300"
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          View Details
                        </Button>
                        <AdminPcdOrderDetailsView orderDetails={pcdOrderDetails} />
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

export default AdminPcdOrdersView;
