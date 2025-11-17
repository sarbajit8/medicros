import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { addBrandsFormElements } from "@/config";
import { toast } from "@/hooks/use-toast";
import {
  addNewBrand,
  deleteBrand,
  fetchAllBrands,
  updateBrand,
} from "@/store/admin/brand-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  name: "",
  type: "",
  type2: "",
};

const AddBrand = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const { brandList } = useSelector((state) => state.adminBrand);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  function resetForm() {
    setOpenCreateProductsDialog(false);
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData(initialFormData);
    setCurrentEditedId(null);
  }

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      image: uploadedImageUrl,
    };

    if (currentEditedId) {
      dispatch(updateBrand({ id: currentEditedId, updatedData: payload })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllBrands());
          toast({ title: "Brand updated successfully" });
          resetForm();
        }
      });
    } else {
      dispatch(addNewBrand(payload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllBrands());
          toast({ title: "Brand added successfully" });
          resetForm();
        }
      });
    }
  }

  function handleDelete(id) {
    dispatch(deleteBrand(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllBrands());
        toast({ title: "Brand deleted successfully" });
      }
    });
  }

  function handleEdit(brand) {
    setFormData({
      name: brand.name,
      type: brand.type,
      type2: brand.type2,
      image: brand.image,
    });
    setUploadedImageUrl(brand.image);
    setCurrentEditedId(brand._id);
    setOpenCreateProductsDialog(true);
  }

  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsContent value="orders">
              <Fragment>
                <div className="mb-5 w-full flex justify-end">
                  <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Add New Brand
                  </Button>
                </div>

                <div className="mb-5 w-full flex">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">All Brands</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div  className="overflow-x-auto max-h-[500px] overflow-y-auto">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-200">
                            <TableHead className="px-4 py-2 text-left">Brand ID</TableHead>
                            <TableHead className="px-4 py-2 text-left">Image</TableHead>
                            <TableHead className="px-4 py-2 text-left">Name</TableHead>
                            <TableHead className="px-4 py-2 text-left">Popular</TableHead>
                            <TableHead className="px-4 py-2 text-left">Most Selling</TableHead>
                            <TableHead className="px-4 py-2 text-left">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {brandList?.length > 0 ? (
                            brandList
                              .slice()
                              .reverse()
                              .filter((brand) =>
                                brand.name.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((brand) => (
                                <TableRow key={brand._id} className="hover:bg-gray-100">
                                  <TableCell className="px-4 py-2">{brand._id}</TableCell>
                                  <TableCell className="px-4 py-2 w-4">
                                    <img src={brand.image} alt="brand" className="w-10 h-10 object-cover" />
                                  </TableCell>
                                  <TableCell className="px-4 py-2">{brand.name}</TableCell>
                                  <TableCell className="px-4 py-2">{brand.type}</TableCell>
                                  <TableCell className="px-4 py-2">{brand.type2}</TableCell>
                                  <TableCell className="px-4 py-2 flex space-x-2">
                                    <Button
                                      onClick={() => handleEdit(brand)}
                                      className="bg-yellow-500 text-white hover:bg-yellow-600"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      onClick={() => handleDelete(brand._id)}
                                      className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4">
                                No brands found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Sheet
                  open={openCreateProductsDialog}
                  onOpenChange={() => resetForm()}
                >
                  <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                      <SheetTitle>
                        {currentEditedId ? "Update Brand" : "Add New Brand"}
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
                        buttonText={currentEditedId ? "Update" : "Add"}
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
};

export default AddBrand;
