import ProductImageUpload from '@/components/admin-view/image-upload';
import AdminOrdersView from '@/components/admin-view/orders';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table,TableBody,TableCell,TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addDistributorProducts, addDistributors, addEmployeeFormElements } from '@/config';
import { toast } from '@/hooks/use-toast';
import { addDistributor, deleteDistributor, editDistributor, fetchAllDistributor } from '@/store/admin/distributor-slice';
import { addDistributorProduct, deleteDistributorProduct, editDistributorProduct, getAllProductsByDistributorId } from '@/store/admin/distributorProduct-slice';
import { addEmployee, deleteEmployee, editEmployee, fetchAllEmployee } from '@/store/admin/employee-slice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const initialFormData = {
    distributorId:"",
    productname:"",
    distributorName:"",
    totalStock:""

  };

const DistributorProducts = () => {


    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    
    
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState("");
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const {distributorProductList} = useSelector(state=>state.DistributorProduct);

    const [searchQuery, setSearchQuery] = useState("");
    const { distributorId,distributorName } = useParams();

   function onSubmit(event){
      event.preventDefault();
  
      if(currentEditedId !== null){ dispatch(editDistributorProduct({
        id:currentEditedId,formData
       
      })).then((data)=>{
        console.log(data,"Edited");
        if(data?.payload?.success){
        dispatch(getAllProductsByDistributorId(distributorId));
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData)
          setCurrentEditedId(null);
          toast({
            title: 'Products edited successfully'
          })
        }
        
      })}else{
        if (!formData.productname) {
            toast({
            title: 'Please fill in all required fields.',
            variant: 'destructive',
           });
            return; // Prevent dispatching if validation fails
         }       
      dispatch(addDistributorProduct({
        ...formData,
        distributorId:distributorId,
        distributorName:distributorName
        
      })).then((data) => {
        console.log(data);
        if(data?.payload?.success){
          dispatch(getAllProductsByDistributorId(distributorId));
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData)
          toast({
            title: 'Employee add successfully'
          })
  
        }else{
          toast({
                 title: data?.payload?.message || 'Failed to add distributor',
                   variant: 'destructive',
                 });
        }
        
      })  
    }
}

      function handleDelete(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(deleteDistributorProduct(getCurrentProductId)).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProductsByDistributorId(distributorId));
            
            
          }
        });
      }
    useEffect(() => {
      dispatch(getAllProductsByDistributorId(distributorId));

    }, [dispatch])
    
  
    
    



  return (


 <Fragment>
  
    
      <div className='mb-5 w-full flex justify-end'>
        <Button className="bg-blue-800 hover:bg-blue-500" onClick={() => setOpenCreateProductsDialog(true) }>Add New Product</Button>
      </div>
<div className='mb-5 w-full flex '>
  <div className="relative">
    <input
      type="text"
      placeholder="Search by name or username"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border border-gray-300 rounded-lg p-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
    />
    <span className="absolute left-3 top-3 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6m-6-6l-6 6"
        />
      </svg>
    </span>
  </div>
</div>
      <div className=''>
      <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">All Distributors</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <Table className="min-w-full ">
        <TableHeader >
          <TableRow className="bg-gray-200">
            <TableHead className="px-4 py-2 text-left">Product ID</TableHead>
            <TableHead className="px-4 py-2 text-left ">product Name</TableHead>

          
          </TableRow>
        </TableHeader>
        <TableBody>
  {distributorProductList && distributorProductList.length > 0 ? (
    distributorProductList.filter(distributor => 
      distributor.productname.toLowerCase().includes(searchQuery.toLowerCase())
    ).map((distributor) => (
      <TableRow key={distributor?._id} className="border-b hover:bg-gray-100">
        <TableCell className="px-4 py-2">{distributor?._id}</TableCell>
        <TableCell className="px-4 py-2 break-words max-w-[300px]">{distributor?.productname}</TableCell>
       


        <TableCell className="px-4 py-2 flex space-x-2">
          <Button
            onClick={() => {              
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(distributor?._id);
              setFormData(distributor);
            }}                
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Edit
          </Button>
          <Button onClick={() => handleDelete(distributor?._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </Button>       
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-4">
        No employees found.
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
              Add New Employee
            </SheetTitle>
          </SheetHeader>              

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText=  {currentEditedId!== null ?"Edit":"Add"}
              formControls={addDistributorProducts}             
            />
          </div>
        </SheetContent>
      </Sheet>
     
    </Fragment>
  )
}

export default DistributorProducts