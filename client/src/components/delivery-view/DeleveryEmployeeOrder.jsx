
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Table,TableBody,TableCell,TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { fetchAllEmployeeOrders, getOrderDetailsForEmployee, getOrdersByDeliveryBoy, resetEmployeeOrderDetails } from '@/store/employee/employeeOrder-slice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleveryEmployeeOrderDetailsView from './employeeOrderDetails';

const initialFormData = {
  username:"",
  employeeId:"",
  product:"",
  quantity:"",
  address:"",
  pangst:"",
  draglicence:"",
  orderstatus:"",
  mrp:"",
  orderDate : "",
  orderUpdateDate : "",
  };

const DeleveryEmployeeOrder = () => {


    
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
        
    const {employee} = useSelector(state=> state.adminEmployee);
    const {orderList,deliveryBoyOrders,employeeOrderDetails,employeeOrderList} = useSelector(state=>state.employeeOrder);
        // console.log(employeeOrderDetails?.id,"opppppppopopooopopopopopopopopo");
        
    
    
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState("");
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    // const {EmployeeList} = useSelector(state=>state.adminEmployee);




  useEffect(() => {
   
      dispatch(getOrdersByDeliveryBoy(employee.name));
 
  }, [dispatch]);

  // console.log(employeeOrdersByDeliveryBoy,"ererererererererererererererererererererererere");
  



    useEffect(() => {
      if(employeeOrderDetails!==null)setOpenDetailsDialog(true);
    
    }, [employeeOrderDetails])
    

    useEffect(() => {
      dispatch(fetchAllEmployeeOrders()); 
         
    }, [dispatch])
    
function handleFetchOrderDetails(getId) {
 dispatch(getOrderDetailsForEmployee(getId));
 }
// console.log(employee?.username,"employee ddddddddddddddddddddd");

  return (


 <Fragment >
    
      {/* <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true) }>Add New Employee</Button>
      </div> */}

     
      <div className=''>
        
      <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">All Employee Orders</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="">
    <Table className="max-w-full">
  <TableHeader>
    <TableRow className="bg-gray-200">
      <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
      <TableHead className="px-4 py-2 text-left">Employee UserName</TableHead>
      {/* <TableHead className="px-4 py-2 text-left">Quantity</TableHead> */}
      <TableHead className="px-4 py-2 text-left">Status</TableHead>
      <TableHead className="px-4 py-2 text-left">Date</TableHead>
      <TableHead className="px-4 py-2 text-left">Details</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {deliveryBoyOrders && deliveryBoyOrders.length > 0 ? (
      deliveryBoyOrders
        .slice()
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort by latest
        .map((employeeOrder) => (
          <TableRow key={employeeOrder?._id} className="border-b hover:bg-gray-100">
            <TableCell className="px-4 py-2">{employeeOrder?._id}</TableCell>
            <TableCell className="px-4 py-2 uppercase">
              {employeeOrder?.username}
            </TableCell>
            <TableCell className="px-4 py-2">{employeeOrder?.orderstatus}</TableCell>
            <TableCell className="px-4 py-2">
              {employeeOrder?.orderDate
                ? employeeOrder.orderDate.split("T")[0]
                : "N/A"}
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
                  onClick={() => handleFetchOrderDetails(employeeOrder?._id)}
                  className="bg-blue-800 hover:bg-blue-500"
                >
                  Order Details
                </Button>
                <DeleveryEmployeeOrderDetailsView orderDetails={employeeOrderDetails} />
              </Dialog>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-4">
          No orders found.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

    </div>
   
  </CardContent>
</Card>

      </div>
   
    </Fragment>
  )
}

export default DeleveryEmployeeOrder;




