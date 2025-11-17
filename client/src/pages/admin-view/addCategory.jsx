import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { addBrandsFormElements, addEmployeeFormElements } from '@/config';
import { toast } from '@/hooks/use-toast';
import { addNewBrand, deleteBrand, fetchAllBrands } from '@/store/admin/brand-slice';
import { addNewCategory, deleteCategory, fetchAllCategorys } from '@/store/admin/category-slice';
import { addEmployee, deleteEmployee, editEmployee, fetchAllEmployee } from '@/store/admin/employee-slice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const initialFormData = {
    image: null,
    name: "",
   
};

const AddCategoty = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const { categoryList } = useSelector(state => state.adminCategory);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState(""); // State for filter option

    function onSubmit(event) {
        event.preventDefault();
      
            dispatch(addNewCategory({
                ...formData,
                image: uploadedImageUrl,
            })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllCategorys());
                    setOpenCreateProductsDialog(false);
                    setImageFile("");
                    setFormData(initialFormData);
                    toast({
                        title: 'Category added successfully'
                    });
                }
            });
    }

    function handleDelete(getCurrentProductId) {
        dispatch(deleteCategory(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllCategorys());
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAllCategorys());
    }, [dispatch]);

    return (
        <div className='flex flex-col'>
   
        <div className="container  mx-auto grid grid-cols-1 gap-8 py-8">
          <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm '>
            <Tabs defaultValue="orders">
             
    <TabsContent value='orders'>
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Category</Button>
            </div>
            <div className='mb-5 w-full flex'>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search by name or username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                    {/* <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="ml-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    >
                        <option value="">All</option>
                        <option value="sales">Sales</option>
                        <option value="delivery">Delivery</option>
                    </select> */}
                </div>
            </div>
            <div className=''>
                <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">All Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="min-w-full ">
                                <TableHeader>
                                    <TableRow className="bg-gray-200">
                                        <TableHead className="px-4 py-2 text-left">Brand ID</TableHead>
                                        <TableHead className="px-4 py-2 text-left">Brand Image</TableHead>
                                        <TableHead className="px-4 py-2 text-left">Brand Name</TableHead>
                                        <TableHead className="px-4 py-2 text-left">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categoryList && categoryList.length > 0 ? (
                                        categoryList.filter(brand => 
                                            (brand.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by usertype
                                        ).map((brand) => (
                                            <TableRow key={brand?._id} className="border-b hover:bg-gray-100">
                                                <TableCell className="px-4 py-2">{brand?._id}</TableCell>
                                                <TableCell className="px-4 py-2 w-4"><img src={brand?.image} alt=""/></TableCell>
                                                <TableCell className="px-4 py-2">{brand?.name}</TableCell>
                                             
                                                <TableCell className="px-4 py-2 flex space-x-2">
                                                   
                                                    <Button onClick={() => handleDelete(brand?._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                                        Delete
                                                    </Button>
                                                   
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-4">
                                                No category found.
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
                            Add New Category
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                            formControls={addBrandsFormElements}
                        />
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

export default AddCategoty