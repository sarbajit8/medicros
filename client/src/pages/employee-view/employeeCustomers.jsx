import ProductImageUpload from '@/components/admin-view/image-upload';
import AdminOrdersView from '@/components/admin-view/orders';
import CommonForm from '@/components/common/form';
import EmployeeOrderDetailsView from '@/components/employee-view/employee-order-detsils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addEmployeeFormElements, addEmployeeSideOrder } from '@/config';
import { toast } from '@/hooks/use-toast';
import { addEmployee, deleteEmployee, editEmployee, fetchAllEmployee } from '@/store/admin/employee-slice';
import { addNewOrder, fetchAllEmployeeOrders, getAllOrdersByEmployeeId, getOrderDetailsForEmployee, resetEmployeeOrderDetails } from '@/store/employee/employeeOrder-slice';
import { ArrowUpDownIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { addEmployeeCustomer, getAllCustomerByEmployee } from '@/store/employee/employeeCustomer-slice';


const initialFormData = {
    name:"",
    employeeid:"",
    mobile:"",
    email:"",
    shopname:"",
    address:"",
    gst:"",
    dl:"",

};


const EmployeeCustomers = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const dispatch = useDispatch();
  const { employee } = useSelector(state => state.adminEmployee);
  const { orderList, employeeOrderDetails } = useSelector(state => state.employeeOrder);
  const {employeeCustomerList } = useSelector(state => state.employeeCustomer);


  const [visibleProducts, setVisibleProducts] = useState(1); // Initially show only Product 1


  

//   const removeProductField = () => {
//     if (visibleProducts > 1) {
//       setFormData({ ...formData, [`product${visibleProducts}`]: "", [`quantity${visibleProducts}`]: "" }); // Clear removed fields
//       setVisibleProducts(visibleProducts - 1);
//     }
//   };
  const handleSubmit = (event) => {
    event.preventDefault();
  
  
    // Dispatch the order with dynamic product data
    dispatch(
        addEmployeeCustomer({
        ...formData,
        employeeid: employee?.id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllCustomerByEmployee(employee?.id));
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        toast({
          title: "Customer added successfully",
        });
      }
    });
  };
  

 
  useEffect(() => {    
    dispatch(getAllCustomerByEmployee(employee?.id));
  }, [dispatch, employee?.id]);

//   useEffect(() => {
//     if (employeeOrderDetails !== null) setOpenDetailsDialog(true);
//   }, [employeeOrderDetails]);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForEmployee(getId));
//   }

  const filteredOrderList = Array.isArray(employeeCustomerList)
  ? [...employeeCustomerList]
      .filter(order => {
        const lowerCaseQuery = searchQuery.trim().replace(/\s+/g, ' ').toLowerCase(); // ✅ Trim & normalize spaces

        return (
          order?._id?.toLowerCase().includes(lowerCaseQuery) ||  
          order?.name?.toLowerCase().includes(lowerCaseQuery) || 
          order?.gst?.toLowerCase().includes(lowerCaseQuery) ||
          order?.dl?.toLowerCase().includes(lowerCaseQuery) ||
          order?.mobile?.toLowerCase().includes(lowerCaseQuery) ||
          order?.email?.toLowerCase().includes(lowerCaseQuery) ||
          order?.address?.toLowerCase().includes(lowerCaseQuery)



        );
      })
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // 🔥 Sorting newest order first
  : []; 


  return (
    <div className='flex flex-col'>
      <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
          <Tabs defaultValue="orders">
            
            <TabsContent value='orders'>
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button className=" bg-blue-800 hover:bg-blue-400" onClick={() => setOpenCreateProductsDialog(true)}>Add New Customers</Button>
      </div>

      <div className='mb-5 w-[70%] flex'>
        <div className='w-[70%] '>
          <input
            type="text"
            placeholder="Search Orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="border rounded p-2 w-full"
          />
        </div>
        <div className='justify-end'>
       
        </div>
      </div>

      <div className=''>
        <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <Table className="max-w-full ">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="px-4 py-2 text-left">Customer ID</TableHead>
                    <TableHead className="px-4 py-2 text-left">Name</TableHead>
                    <TableHead className="px-4 py-2 text-left">Mobile</TableHead>
                    <TableHead className="px-4 py-2 text-left">Email</TableHead>
                    <TableHead className="px-4 py-2 text-left">Shop Name</TableHead>
                    <TableHead className="px-4 py-2 text-left">Address</TableHead>
                    <TableHead className="px-4 py-2 text-left">GST/PAN</TableHead>
                    <TableHead className="px-4 py-2 text-left">DL/MRD</TableHead>


                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrderList && filteredOrderList.length > 0 ? (
                    filteredOrderList.map(employeeOrder => (
                      <TableRow key={employeeOrder._id} className="border-b hover:bg-gray-100">
                        <TableCell className="px-4 py-2  break-words max-w-[200px]">{employeeOrder?._id}</TableCell>
                        <TableCell className="break-words max-w-[200px] break-all p-2">{employeeOrder?.name}</TableCell>
                        <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.mobile}</TableCell>
                        <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.email}</TableCell>
                        <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.shopname}</TableCell>
                        <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.address}</TableCell>
                         <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.gst}</TableCell>
                         <TableCell className="px-4 py-2 break-words max-w-[200px]">{employeeOrder?.dl}</TableCell>

                        
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
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

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              Add New Order
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
           

         
              {/* Other Fields (Always Visible) */}
              <div>
                <label className="block font-semibold">Customer Name</label>
                <input type="text" name="name" placeholder="Enter customer name" value={formData.name} onChange={(e) => setFormData({ ...formData,name: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              <div>
                <label className="block font-semibold">Customer Mobile No.</label>
                <input type="tel" name="mobile" placeholder="Enter mobile number" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              <div>
                <label className="block font-semibold">Customer Email</label>
                <input type="email" name="email" placeholder="Enter customer email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              <div>
                <label className="block font-semibold">Shop Name</label>
                <input type="text" name="shopname" placeholder="Enter shop name" value={formData.shopname} onChange={(e) => setFormData({ ...formData, shopname: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              <div>
                <label className="block font-semibold">Address</label>
                <textarea name="address" placeholder="Enter shipping address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="border rounded p-2 w-full" rows="3" />
              </div>

              <div>
                <label className="block font-semibold">PAN/GST No.</label>
                <input type="text" name="gst" placeholder="Enter PAN/GST number" value={formData.gst} onChange={(e) => setFormData({ ...formData, gst: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              <div>
                <label className="block font-semibold">Drug License</label>
                <input type="text" name="dl" placeholder="Enter DL / MRD No." value={formData.dl} onChange={(e) => setFormData({ ...formData, dl: e.target.value })} className="border rounded p-2 w-full" />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 w-full">
                Submit 
              </Button>
            </form>

          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
    </TabsContent>

          </Tabs>

        </div>

      </div>
    </div>
  );
}


export default EmployeeCustomers