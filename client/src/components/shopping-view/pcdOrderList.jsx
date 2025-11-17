import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPcdOrdersByUserId, getPcdOrderDetails, resetPcdOrderDetails } from '@/store/shop/pcdOrders-slice';
import { useUser } from '@clerk/clerk-react';
import PcdOrderDetailsView from './pcdOrderDetails';

const PcdOrderList = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();
  const { pcdOrderList, pcdOrderDetails } = useSelector(state => state.shopPcdOrder);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllPcdOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (pcdOrderDetails !== null && pcdOrderDetails._id === selectedOrderId) {
      setOpenDetailsDialog(true);
    }
  }, [pcdOrderDetails, selectedOrderId]);

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId);
    dispatch(getPcdOrderDetails(getId));
  }

  const sortedOrders = pcdOrderList
    ?.slice()
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  return (
    <Card>
      <CardHeader>
        <CardTitle>PCD Order History</CardTitle>
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
            {sortedOrders && sortedOrders.length > 0 ? (
              sortedOrders.map(orderItem => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge className="py-1 px-3 bg-blue-800">
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{orderItem?.totalAmount}</TableCell>
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
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                      <PcdOrderDetailsView pcdOrderDetails={pcdOrderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PcdOrderList;
