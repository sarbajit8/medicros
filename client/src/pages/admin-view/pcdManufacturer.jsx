import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { addPcd, deletePcd, editPcd, fetchAllPcd } from '@/store/admin/pcd-slice';
import ProductImageUpload from '@/components/admin-view/image-upload';

const initialFormData = {
  image: '',
  name: '',
  company: '',
  username: '',
  address: '',
  pin: '',
  gst: '',
  dl: '',
  email: '',
  mobile: ''
};

const PcdManufacturer = () => {
  const dispatch = useDispatch();
  const { adminPcdList } = useSelector((state) => state.adminPcd);

  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPcd());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, image: uploadedImageUrl };

    const requiredFields = ['name', 'company', 'username', 'address', 'pin', 'gst', 'dl', 'email', 'mobile'];
    const missingFields = requiredFields.filter(field => !payload[field]);

    if (missingFields.length > 0 || !uploadedImageUrl) {
      return toast({ title: 'Please fill all fields', variant: 'destructive' });
    }

    if (currentEditedId) {
      dispatch(editPcd({ id: currentEditedId, formData: payload })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllPcd());
          toast({ title: 'PCD updated successfully' });
          setFormData(initialFormData);
          setUploadedImageUrl('');
          setImageFile(null);
          setCurrentEditedId(null);
          setOpenCreateDialog(false);
        }
      });
    } else {
      dispatch(addPcd(payload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllPcd());
          toast({ title: 'PCD added successfully' });
          setFormData(initialFormData);
          setUploadedImageUrl('');
          setImageFile(null);
          setOpenCreateDialog(false);
        } else {
          toast({ title: data?.payload?.message || 'Failed to add PCD', variant: 'destructive' });
        }
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePcd(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllPcd());
        toast({ title: 'PCD deleted' });
      }
    });
  };

  return (
    <div className='flex flex-col'>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue="orders">
            <TabsContent value='orders'>
              <div className="container mx-auto py-6">
                <Card className="p-6">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 w-full">
                      <CardTitle className="text-lg md:text-xl">PCD Manufacturers</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center flex-col md:flex-row gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Search by name or username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:max-w-md border p-2 rounded"
                      />
                      <div className="w-full md:w-auto flex justify-end">
                        <Button
                          className="bg-blue-800 hover:bg-blue-600 w-full md:w-auto"
                          onClick={() => setOpenCreateDialog(true)}
                        >
                          Add New
                        </Button>
                      </div>
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                      <Table className="min-w-[1000px]">
                        <TableHeader>
                          <TableRow className="bg-gray-100">
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Username</TableHead>
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
                          {adminPcdList?.filter(pcd =>
                            pcd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pcd.username.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map((pcd) => (
                            <TableRow key={pcd._id}>
                              <TableCell>
                                {pcd.image ? (
                                  <img
                                    src={pcd.image}
                                    alt="PCD"
                                    className="w-12 h-12 rounded object-cover border"
                                  />
                                ) : (
                                  <span className="text-xs text-gray-400">No Image</span>
                                )}
                              </TableCell>
                              <TableCell>{pcd.name}</TableCell>
                              <TableCell>{pcd.company}</TableCell>
                              <TableCell>{pcd.username}</TableCell>
                              <TableCell>{pcd.address}</TableCell>
                              <TableCell>{pcd.pin}</TableCell>
                              <TableCell>{pcd.mobile}</TableCell>
                              <TableCell>{pcd.gst}</TableCell>
                              <TableCell>{pcd.dl}</TableCell>
                              <TableCell>{pcd.email}</TableCell>
                              <TableCell className="flex flex-col md:flex-row gap-2">
                                <Button className="bg-yellow-500 hover:bg-yellow-300" onClick={() => {
                                  setFormData(pcd);
                                  setCurrentEditedId(pcd._id);
                                  setUploadedImageUrl(pcd.image);
                                  setOpenCreateDialog(true);
                                }}>Edit</Button>
                                <Button className="bg-red-600 hover:bg-red-300" onClick={() => handleDelete(pcd._id)}>Delete</Button>
                                <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                  <Link to={`/admin/PcdProducts/${pcd?._id}/${pcd?.username}`}>Add Products</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                <Sheet open={openCreateDialog} onOpenChange={() => {
                  setOpenCreateDialog(false);
                  setFormData(initialFormData);
                  setUploadedImageUrl('');
                  setImageFile(null);
                  setCurrentEditedId(null);
                }}>
                  <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                      <SheetTitle>{currentEditedId ? "Edit PCD" : "Add New PCD"}</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
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
                        {Object.entries(initialFormData).filter(([k]) => k !== 'image').map(([field]) => (
                          <div key={field}>
                            <label className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                              type="text"
                              name={field}
                              value={formData[field]}
                              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                              className="w-full border rounded p-2"
                            />
                          </div>
                        ))}
                        <Button type="submit" className="bg-blue-800 text-white w-full">
                          {currentEditedId ? "Update" : "Create"}
                        </Button>
                      </form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PcdManufacturer;
