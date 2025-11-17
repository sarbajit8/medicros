import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuickOrders } from "@/store/shop/quickorder-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Quickorder = () => {
  const dispatch = useDispatch();
  const { quickOrderList } = useSelector((state) => state.quickOrder);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllQuickOrders());
  }, [dispatch]);

  // ✅ Function to filter orders based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredOrders(quickOrderList);
      return;
    }
  
    const query = searchQuery.trim().toLowerCase().replace(/\s+/g, ""); // Remove spaces
  
    const filtered = quickOrderList?.filter((order) => {
      return (
        String(order?._id)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.name)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.shopname)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.gst)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.dl)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.phone)?.replace(/\s+/g, "").toLowerCase().includes(query) || // ✅ Converts number to string
        String(order?.address)?.replace(/\s+/g, "").toLowerCase().includes(query) ||
        String(order?.requirement)?.replace(/\s+/g, "").toLowerCase().includes(query)
      );
    });
  
    setFilteredOrders(filtered);
  }, [searchQuery, quickOrderList]);
  
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        {/* Search Input Field */}
        <div className="mb-5 w-full flex justify-center">
          <input
            type="text"
            placeholder="Search Orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded p-2 w-full sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Orders Table */}
        <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All Employee Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="max-w-full">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
                  <TableHead className="px-4 py-2 text-left">Name</TableHead>
                  <TableHead className="px-4 py-2 text-left">Shop Name</TableHead>
                  <TableHead className="px-4 py-2 text-left">GST / PAN NO.</TableHead>
                  <TableHead className="px-4 py-2 text-left">DL/MRD NO.</TableHead>
                  <TableHead className="px-4 py-2 text-left">Phone</TableHead>
                  <TableHead className="px-4 py-2 text-left">Address</TableHead>
                  <TableHead className="px-4 py-2 text-left">Requirement</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order?._id} className="border-b hover:bg-gray-100">
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?._id}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?.name}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?.shopname}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?.gst}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?.dl}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[200px]">{order?.phone}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[300px]">{order?.address}</TableCell>
                      <TableCell className="px-4 py-2 break-words max-w-[300px]">{order?.requirement}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="8" className="text-center py-4">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quickorder;
