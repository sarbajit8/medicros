import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addPcdProduct, deletePcdProduct, editPcdProduct, getAllPcdProductsByPcdId } from '@/store/admin/pcdProduct-slice';
import CommonForm from '@/components/common/form';
import { addDistributorProducts } from '@/config';
import { toast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const initialFormData = {
  PcdId: '',
  productname: '',
  distributorName: '',
  totalStock: ''
};

const PcdProducts = () => {
  const dispatch = useDispatch();
  const { pcdProductList } = useSelector(state => state.adminPcdProduct);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pcdId, pcdName } = useParams();

  useEffect(() => {
    dispatch(getAllPcdProductsByPcdId(pcdId));
  }, [dispatch, pcdId]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.productname) {
      return toast({ title: 'Please fill in product name', variant: 'destructive' });
    }

    const dataToSubmit = {
      ...formData,
      PcdId: pcdId,
      distributorName: pcdName,
    };

    if (currentEditedId) {
      dispatch(editPcdProduct({ id: currentEditedId, formData: dataToSubmit })).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAllPcdProductsByPcdId(pcdId));
          resetForm();
          toast({ title: 'Product updated successfully' });
        }
      });
    } else {
      dispatch(addPcdProduct(dataToSubmit)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAllPcdProductsByPcdId(pcdId));
          resetForm();
          toast({ title: 'Product added successfully' });
        } else {
          toast({ title: data?.payload?.message || 'Error adding product', variant: 'destructive' });
        }
      });
    }
  };

  const resetForm = () => {
    setOpenCreateDialog(false);
    setFormData(initialFormData);
    setCurrentEditedId(null);
  };

  const handleDelete = (id) => {
    dispatch(deletePcdProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllPcdProductsByPcdId(pcdId));
        toast({ title: 'Product deleted successfully' });
      }
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">PCD Product List</h2>
        <Button onClick={() => setOpenCreateDialog(true)} className="bg-blue-800 hover:bg-blue-600">Add Product</Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pcdProductList?.filter(p =>
                p.productname.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(product => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.productname}</TableCell>
                  <TableCell>{product.totalStock}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" className="bg-yellow-500" onClick={() => {
                      setFormData(product);
                      setCurrentEditedId(product._id);
                      setOpenCreateDialog(true);
                    }}>Edit</Button>
                    <Button size="sm" className="bg-red-600" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={openCreateDialog} onOpenChange={resetForm}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId ? "Edit Product" : "Add New Product"}</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addDistributorProducts}
              buttonText={currentEditedId ? "Update" : "Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PcdProducts;
