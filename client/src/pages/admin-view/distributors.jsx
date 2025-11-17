import React, { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminOrdersView from "@/components/admin-view/orders";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { addDistributor, deleteDistributor, editDistributor, fetchAllDistributor } from "@/store/admin/distributor-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const initialFormData = {
  image: "",
  name: "",
  companyname: "",
  username: "",
  address: "",
  pin: "",
  gst: "",
  dl: "",
  email: "",
  mobile: "",
};

const AdminDistributors = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { adminDistributorList } = useSelector(state => state.adminDistributor);
  const [searchQuery, setSearchQuery] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const productData = { ...formData, image: uploadedImageUrl };

    if (currentEditedId !== null) {
      dispatch(editDistributor({ id: currentEditedId, formData: productData })).then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllDistributor());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
          setUploadedImageUrl("");
          setImageFile(null);
          toast({ title: "Distributor edited successfully" });
        }
      });
    } else {
      if (!productData.name || !productData.username || !productData.address || !productData.pin || !productData.mobile || !productData.companyname || !productData.gst || !productData.dl || !productData.email) {
        toast({ title: "Please fill in all required fields.", variant: "destructive" });
        return;
      }
      dispatch(addDistributor(productData)).then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllDistributor());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          toast({ title: "Distributor added successfully" });
        } else {
          toast({ title: data?.payload?.message || "Failed to add distributor", variant: "destructive" });
        }
      });
    }
  }

  function handleDelete(id) {
    dispatch(deleteDistributor(id)).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllDistributor());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllDistributor());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsContent value="orders">
              <Fragment>
                <div className="mb-5 w-full flex justify-end">
                  <Button className="bg-blue-800 hover:bg-blue-500" onClick={() => setOpenCreateProductsDialog(true)}>Add New Distributor</Button>
                </div>
                <div className="mb-5 w-full flex">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name or username"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>
                <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">All Distributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                   <Table className="min-w-full">
  <TableHeader>
    <TableRow className="bg-gray-200">
      <TableHead>Image</TableHead>
      {/* <TableHead>Distributor ID</TableHead> */}
      <TableHead>Name</TableHead>
      <TableHead>Username</TableHead>
      <TableHead>Owner/Prop./Director</TableHead>
      <TableHead>Address</TableHead>
      <TableHead>Pin</TableHead>
      <TableHead>Mobile</TableHead>
      <TableHead>GST</TableHead>
      <TableHead>DL</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {adminDistributorList && adminDistributorList.length > 0 ? (
      adminDistributorList
        .filter(
          (distributor) =>
            distributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            distributor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            distributor._id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((distributor) => (
          <TableRow key={distributor._id} className="border-b hover:bg-gray-100">
            <TableCell>
              {distributor.image ? (
                <img
                  src={distributor.image}
                  alt="Distributor"
                  className="w-12 h-12 rounded object-cover border"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </TableCell>
            {/* <TableCell>{distributor._id}</TableCell> */}
            <TableCell>{distributor.name}</TableCell>
            <TableCell>{distributor.username}</TableCell>
            <TableCell>{distributor.companyname}</TableCell>
            <TableCell>{distributor.address}</TableCell>
            <TableCell>{distributor.pin}</TableCell>
            <TableCell>{distributor.mobile}</TableCell>
            <TableCell>{distributor.gst}</TableCell>
            <TableCell>{distributor.dl}</TableCell>
            <TableCell>{distributor.email}</TableCell>
            <TableCell className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setOpenCreateProductsDialog(true);
                  setCurrentEditedId(distributor._id);
                  setFormData(distributor);
                }}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(distributor._id)}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </Button>
              <Button className="bg-blue-800 text-white hover:bg-blue-300">
                <Link to={`/admin/DistributorProducts/${distributor._id}/${distributor.username}`}>
                  Add Products
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell colSpan={12} className="text-center py-4">
          No distributors found.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

                    </div>
                  </CardContent>
                </Card>
                <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                  setOpenCreateProductsDialog(false);
                  setFormData(initialFormData);
                  setUploadedImageUrl("");
                  setImageFile(null);
                }}>
                  <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                      <SheetTitle>{currentEditedId ? "Edit Distributor" : "Add New Distributor"}</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      <form onSubmit={onSubmit} className="space-y-4">
                        <ProductImageUpload
                          imageFile={imageFile}
                          setImageFile={setImageFile}
                          uploadedImageUrl={uploadedImageUrl}
                          setUploadedImageUrl={setUploadedImageUrl}
                          setImageLoadingState={setImageLoadingState}
                          imageLoadingState={imageLoadingState}
                          isCustomStyling={false}
                        />
                        {Object.entries(initialFormData).filter(([key]) => key !== "image").map(([field, _]) => (
                          <div key={field}>
                            <label className="block font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                              type="text"
                              value={formData[field]}
                              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                              className="w-full border p-2 rounded"
                              required
                            />
                          </div>
                        ))}
                        <Button type="submit" className="bg-blue-800 text-white hover:bg-blue-600">
                          {currentEditedId ? "Edit" : "Add"} Distributor
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
};

export default AdminDistributors;
