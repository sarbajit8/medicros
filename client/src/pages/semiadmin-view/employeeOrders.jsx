import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAllEmployeeOrders, getOrderDetailsForEmployee, resetEmployeeOrderDetails } from '@/store/employee/employeeOrder-slice';
import { Search } from 'lucide-react';
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import EmployeeOrderDetails from '@/components/admin-view/employeeOrderDetails';

const SemiEmployeeOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { employeeOrderList, employeeOrderDetails } = useSelector(state => state.employeeOrder);

  // Fetch orders when component mounts
  useEffect(() => {
    dispatch(fetchAllEmployeeOrders());
  }, [dispatch]);

  // Open dialog when order details are available
  useEffect(() => {
    if (employeeOrderDetails) setOpenDetailsDialog(true);
  }, [employeeOrderDetails]);

  // Fetch order details
  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetailsForEmployee(orderId));
  };

  // 🟢 Sorting & Filtering Logic: Newest Orders First
  const sortedAndFilteredOrders = useMemo(() => {
    return employeeOrderList
      .filter(order => {
        const lowerQuery = searchQuery.trim().toLowerCase();
        return (
          order?._id?.toLowerCase().includes(lowerQuery) ||
          order?.username?.toLowerCase().includes(lowerQuery) ||
          order?.orderstatus?.toLowerCase().includes(lowerQuery)
        );
      })
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sorting newest first
  }, [employeeOrderList, searchQuery]);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsContent value="orders">
            <Fragment>
              {/* 🔍 Search Bar */}
              <div className="mb-5 w-full flex items-center gap-3">
                <div className="relative w-[70%]">
                  <input
                    type="text"
                    placeholder="Search Orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded p-2 w-full pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* 📌 Orders Table */}
              <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">All Employee Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Table className="max-w-full">
                      <TableHeader>
                        <TableRow className="bg-gray-200">
                          <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
                          <TableHead className="px-4 py-2 text-left">Employee Username</TableHead>
                          <TableHead className="px-4 py-2 text-left">Quantity</TableHead>
                          <TableHead className="px-4 py-2 text-left">Status</TableHead>
                          <TableHead className="px-4 py-2 text-left">Date</TableHead>
                          <TableHead className="px-4 py-2 text-left">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedAndFilteredOrders.length > 0 ? (
                          sortedAndFilteredOrders.map(order => (
                            <TableRow key={order?._id} className="border-b hover:bg-gray-100">
                              <TableCell className="px-4 py-2">{order?._id}</TableCell>
                              <TableCell className="px-4 py-2">{order?.username}</TableCell>
                              <TableCell className="px-4 py-2">{order?.quantity}</TableCell>
                              <TableCell className="px-4 py-2">{order?.orderstatus}</TableCell>
                              <TableCell className="px-4 py-2">
                                {order?.orderDate ? order.orderDate.split("T")[0] : 'N/A'}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                <Dialog
                                  open={openDetailsDialog}
                                  onOpenChange={() => {
                                    setOpenDetailsDialog(false);
                                    dispatch(resetEmployeeOrderDetails());
                                  }}
                                >
                                  <Button
                                    onClick={() => handleFetchOrderDetails(order?._id)}
                                    className="bg-blue-800 hover:bg-blue-500"
                                  >
                                    Order Details
                                  </Button>
                                  <EmployeeOrderDetails employeeOrderDetails={employeeOrderDetails} />
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                              No matching orders found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </Fragment>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SemiEmployeeOrders;
