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
import { getAllCustomerByEmployee } from '@/store/employee/employeeCustomer-slice';
import axios from "axios";
import { getAlertByUserId, markAlertAsReadByEmployee } from '@/store/admin/alert-slice';


const initialFormData = {
  username: "",
  employeeId: "",
  product1: "",
  product2: "",
  product3: "",
  product4: "",
  product5: "",
  product6: "",
  product7: "",
  product8: "",
  product9: "",
  product10: "",
  product11: "",
  product12: "",
  product13: "",
  product14: "",
  product15: "",
  product16: "",
  product17: "",
  product18: "",
  product19: "",
  product20: "",
  product21: "",
  product22: "",
  product23: "",
  product24: "",
  product25: "",
  product26: "",
  product27: "",
  product28: "",
  product29: "",
  product30: "",
  quantity1: "",
  quantity2: "",
  quantity3: "",
  quantity4: "",
  quantity5: "",
  quantity6: "",
  quantity7: "",
  quantity8: "",
  quantity9: "",
  quantity10: "",
  quantity11: "",
  quantity12: "",
  quantity13: "",
  quantity14: "",
  quantity15: "",
  quantity16: "",
  quantity17: "",
  quantity18: "",
  quantity19: "",
  quantity20: "",
  quantity21: "",
  quantity22: "",
  quantity23: "",
  quantity24: "",
  quantity25: "",
  quantity26: "",
  quantity27: "",
  quantity28: "",
  quantity29: "",
  quantity30: "",
  address: "",
  pangst: "",
  draglicence: "",
  orderstatus: "",
  mrp: "",
  orderDate: "",
  orderUpdateDate: "",
  paymentstatus:"pending",
  paymentmethod:"cod",
  customername: "",
  customermobile: "",
  customeremail: "",
  shopname:"",

};


const EmployeeDashboard = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const dispatch = useDispatch();
  const { employee } = useSelector(state => state.adminEmployee);
  const { orderList, employeeOrderDetails } = useSelector(state => state.employeeOrder);
  const {employeeCustomerList } = useSelector(state => state.employeeCustomer);
  

  const [visibleProducts, setVisibleProducts] = useState(0); // Initially show only Product 1


  
  const [excelData, setExcelData] = useState([]);

  const { alerts } = useSelector(state => state.alert); // Pull from Redux
console.log(alerts,"aLERTS");

// useEffect(() => {
//   if (employee?.id) {
//     dispatch(getAlertByUserId(employee.id)).then((res) => {
//       const unreadAlert = res?.payload?.find((a) => a.status === "unread");

//       if (unreadAlert) {
//         toast({
//           title: "Admin Alert",
//           description: unreadAlert.type,
//           variant: "default",
//         });

//         dispatch(markAlertAsReadByEmployee(employee.id));
//       }
//     });
//   }
// }, [dispatch, employee?.id]);






  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/excel/getUsers`);
        if (response.data.success) {
          setExcelData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching Excel data:", error);
      }
    };
  
    fetchExcelData();
  }, []);
  
  const handleProductChange = (index, field, value) => {
    setFormData({ ...formData, [`${field}${index}`]: value });
  };

  const addProductField = () => {
    if (visibleProducts < 30) {
      setVisibleProducts(visibleProducts + 1);
    }
  };

  const removeProductField = () => {
    if (visibleProducts > 1) {
      setFormData({ ...formData, [`product${visibleProducts}`]: "", [`quantity${visibleProducts}`]: "" }); // Clear removed fields
      setVisibleProducts(visibleProducts - 1);
    }
  };


   // 🟢 Function to handle customer name selection
   const handleCustomerChange = (e) => {
    const selectedCustomerName = e.target.value;
    setFormData((prev) => ({ ...prev, customername: selectedCustomerName }));

    // Find the customer data from the list
    const foundCustomer = employeeCustomerList.find(
      (customer) => customer.name.toLowerCase() === selectedCustomerName.toLowerCase()
    );

    if (foundCustomer) {
      // Populate other fields automatically if customer exists
      setFormData({
        customername: foundCustomer.name || "",
        customermobile: foundCustomer.mobile || "",
        customeremail: foundCustomer.email || "",
        shopname: foundCustomer.shopname || "",
        address: foundCustomer.address || "",
        pangst: foundCustomer.gst || "",
        draglicence: foundCustomer.dl || "",
      });
      setVisibleProducts(1)
    } else {
      // Reset other fields if customer is not found
      setFormData(initialFormData);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Convert quantity to number
    // const firstQuantity = parseInt(formData.quantity1, 10);
  
    // Check if at least one valid product & quantity are filled
    if (!formData.product1 || !formData.quantity1) {
      toast({
        title: "At least one valid product and quantity are required.",
        variant: "destructive",
      });
      return;
    }
  
    // Validate required fields
    if (!formData.pangst || !formData.address || !formData.customername || 
        !formData.customermobile || !formData.customeremail || !formData.shopname) {
      toast({
        title: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
  
    // Create an object containing only the filled products & quantities
    const orderProducts = {};
    for (let i = 1; i <= visibleProducts; i++) {
      let product = formData[`product${i}`];
      let quantity = formData[`quantity${i}`];
  
      if (product && !isNaN(quantity) && quantity > 0) {
        orderProducts[`product${i}`] = product;
        orderProducts[`quantity${i}`] = quantity;
      }
    }
  
    // if (Object.keys(orderProducts).length === 0) {
    //   toast({
    //     title: "Please add valid products with quantities.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
  
    // Dispatch the order with dynamic product data
    dispatch(
      addNewOrder({
        ...formData,
        ...orderProducts, // Merge dynamic product fields
        username: employee?.username,
        employeeId: employee?.id,
        orderstatus: "confirmed",
        mrp: "billing",
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllOrdersByEmployeeId(employee?.id));
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        setVisibleProducts(1); // Reset to 1 product field
        toast({
          title: "Order added successfully",
        });
      }
    });
  };
  
  


    useEffect(() => {    
      dispatch(getAllCustomerByEmployee(employee?.id));
    }, [dispatch, employee?.id]);

  useEffect(() => {    
    dispatch(getAllOrdersByEmployeeId(employee?.id));
  }, [dispatch, employee?.id]);

  useEffect(() => {
    if (employeeOrderDetails !== null) setOpenDetailsDialog(true);
  }, [employeeOrderDetails]);

  function onSubmit(event) {
    event.preventDefault();

    // Validate required fields
    if (!formData.pangst ||
      !formData.product1 ||
      !formData.quantity1 ||
      !formData.address||
      !formData.customername||
      !formData.customermobile||
      !formData.customeremail||
      !formData.shopname
      
    ) {
      toast({
        title: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return; // Prevent dispatching if validation fails
    }

    // Check if quantity is a number
    if (isNaN(formData.quantity1) || formData.quantity1 <= 0) {
      toast({
        title: 'Quantity must be a valid number greater than zero.',
        variant: 'destructive',
      });
      return; // Prevent dispatching if quantity is not valid
    }

    dispatch(addNewOrder({
      ...formData,
      username: employee?.username,
      employeeId: employee?.id,
      orderstatus: "confirmed",
      mrp: "billing",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllOrdersByEmployeeId(employee?.id));
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        toast({
          title: 'Order added successfully',
        });
      }
    });
  }

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForEmployee(getId));
  }

  const filteredOrderList = Array.isArray(orderList)
  ? [...orderList]
      .filter(order => {
        const lowerCaseQuery = searchQuery.trim().replace(/\s+/g, ' ').toLowerCase(); // ✅ Trim & normalize spaces

        return (
          order?._id?.toLowerCase().includes(lowerCaseQuery) ||  
          order?.product1?.toLowerCase().includes(lowerCaseQuery) || 
          order?.orderstatus?.toLowerCase().includes(lowerCaseQuery) 
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
        <Button className=" bg-blue-800 hover:bg-blue-400" onClick={() => setOpenCreateProductsDialog(true)}>Add New Order</Button>
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
          {/* <select
            value={""}
            className="border rounded p-2 ml-2"
          >
            <ArrowUpDownIcon />
            <option value="#"> :--:--:</option>
            <option value="name"> Sort by Name</option>
            <option value="username">Sort by Username</option>
            <option value="id">Sort by ID</option>
          </select> */}
        </div>
      </div>

      <div className=''>
        <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <Table className="max-w-full ">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="px-4 py-2 text-left">Order ID</TableHead>
                    <TableHead className="px-4 py-2 text-left">Products Names</TableHead>
                    <TableHead className="px-4 py-2 text-left">Quantity</TableHead>
                    <TableHead className="px-4 py-2 text-left">Status</TableHead>
                    <TableHead className="px-4 py-2 text-left">Date</TableHead>
                    <TableHead className="px-4 py-2 text-left">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrderList && filteredOrderList.length > 0 ? (
                    filteredOrderList.map(employeeOrder => (
                      <TableRow key={employeeOrder._id} className="border-b hover:bg-gray-100">
                        <TableCell className="px-4 py-2">{employeeOrder?._id}</TableCell>
                        <TableCell className="break-words max-w-[200px] break-all p-2">{employeeOrder?.product1}</TableCell>
                        <TableCell className="px-4 py-2">{employeeOrder?.quantity1}</TableCell>
                        <TableCell className="px-4 py-2">{employeeOrder?.orderstatus}</TableCell>
                        <TableCell className="px-4 py-2">{employeeOrder?.orderDate ? employeeOrder.orderDate.split("T")[0] : 'N/A'}</TableCell>
                        <TableCell className="px-4 py-2 flex space-x-2">
                          <Dialog open={openDetailsDialog} onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetEmployeeOrderDetails());
                          }}>
                            <Button
                              onClick={() => {
                                handleFetchOrderDetails(employeeOrder?._id);
                              }}
                              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500">
                              Order Details
                            </Button>
                            <EmployeeOrderDetailsView employeeOrderDetails={employeeOrderDetails} />
                          </Dialog>
                        </TableCell>
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
             {/* Customer Name Field with Auto-Populate */}
             <div>
              <label className="block font-semibold">Customer Name</label>
              <input
                type="text"
                list="customerList"
                value={formData.customername}
                onChange={handleCustomerChange}
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                placeholder="Select or Type Customer Name"
                required
              />
              <datalist id="customerList">
                {employeeCustomerList.map((customer) => (
                  <option key={customer.name} value={customer.name} />
                ))}
              </datalist>
            </div>

            {/* Auto-Filled Fields */}
           {/* Editable Auto-Filled Fields */}
<div>
  <label className="block font-semibold">Customer Mobile No.</label>
  <input
    type="tel"
    value={formData.customermobile}
    onChange={(e) => setFormData({ ...formData, customermobile: e.target.value })}
    className="border rounded p-2 w-full"
  />
</div>

<div>
  <label className="block font-semibold">Customer Email</label>
  <input
    type="email"
    value={formData.customeremail}
    onChange={(e) => setFormData({ ...formData, customeremail: e.target.value })}
    className="border rounded p-2 w-full"
  />
</div>

<div>
  <label className="block font-semibold">Shop Name</label>
  <input
    type="text"
    value={formData.shopname}
    onChange={(e) => setFormData({ ...formData, shopname: e.target.value })}
    className="border rounded p-2 w-full"
  />
</div>

<div>
  <label className="block font-semibold">Address</label>
  <textarea
    value={formData.address}
    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    className="border rounded p-2 w-full"
    rows="3"
  />
</div>

<div>
  <label className="block font-semibold">PAN/GST No.</label>
  <input
    type="text"
    value={formData.pangst}
    onChange={(e) => setFormData({ ...formData, pangst: e.target.value })}
    className="border rounded p-2 w-full"
  />
</div>

<div>
  <label className="block font-semibold">Drug License</label>
  <input
    type="text"
    value={formData.draglicence}
    onChange={(e) => setFormData({ ...formData, draglicence: e.target.value })}
    className="border rounded p-2 w-full"
  />
</div>




               {/* Product Fields with + and - Buttons */}
               {visibleProducts>=1?(
               <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Products(max-30)</span>
                <div className="flex space-x-3">
                  <button type="button" onClick={addProductField} disabled={visibleProducts >= 30}>
                    <PlusCircleIcon className="w-6 h-6 text-green-600" />
                  </button>
                  <button type="button" onClick={removeProductField} disabled={visibleProducts <= 1}>
                    <MinusCircleIcon className="w-6 h-6 text-red-600" />
                  </button>
                </div>
              </div>):""
}

              {/* Product Inputs */}
              {[...Array(visibleProducts)].map((_, index) => {
  const productField = `product${index + 1}`;
  const quantityField = `quantity${index + 1}`;

  return (
    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
     <div>
  <label className="block font-semibold">Select Product {index + 1}</label>
  <input
    list={`product-options-${index}`}
    value={formData[productField]}
    onChange={(e) => handleProductChange(index + 1, "product", e.target.value)}
    placeholder="Type to search product"
    className="border rounded p-2 w-full"
    required
  />

  <datalist id={`product-options-${index}`}>
    {excelData.map((product) => (
      <option key={product._id} value={product.title}>
        {product.title} ({product.brand})
      </option>
    ))}
  </datalist>
</div>


      <div>
        <label className="block font-semibold">Quantity {index + 1}</label>
        <input
          type="text"          
          placeholder={`Quantity ${index + 1}`}
          value={formData[quantityField]}
          onChange={(e) => handleProductChange(index + 1, "quantity", e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
    </div>
  );
})}


            {/* Submit Button */}
            <Button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 w-full">
              Submit Order
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

export default EmployeeDashboard;