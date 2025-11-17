// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Dialog } from "../ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import AdminOrderDetailsView from "./order-details";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
// import { Badge } from "../ui/badge";

// function SemiAdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
//   const dispatch = useDispatch();

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForAdmin(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   console.log(orderDetails, "orderList");

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);


//   const sortedOrders = orderList
//   ?.slice()
//   .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));


//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-200">
//               <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
//               <TableHead className="px-4 py-2 text-left">Order Title</TableHead>
//               <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
//               <TableHead className="px-4 py-2 text-left">Order Price</TableHead>
//               <TableHead className="px-4 py-2 text-left">
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedOrders && sortedOrders.length > 0
//               ? sortedOrders.map((orderItem) => (
//                   <TableRow className="border-b hover:bg-gray-100">
//                     <TableCell className="px-4 py-2">{orderItem?._id}</TableCell>
//                     <TableCell className="px-4 py-2">{orderItem?.title}</TableCell>
//                     <TableCell className="px-4 py-2">
                     
//                         {orderItem?.orderStatus}
                     
//                     </TableCell >
//                     <TableCell className="px-4 py-2">₹{orderItem?.totalAmount}</TableCell>
//                     <TableCell className="px-4 py-2">
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                          className="bg-blue-800 hover:bg-blue-300"
//                           onClick={() =>
//                             handleFetchOrderDetails(orderItem?._id)
//                           }
//                         >
//                           View Details
//                         </Button>
//                         <AdminOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default SemiAdminOrdersView;
