import ProductImageUpload from "@/components/admin-view/image-upload";
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
import { toast } from "@/hooks/use-toast";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchAllEmployee,
} from "@/store/admin/employee-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { QRCodeCanvas } from "qrcode.react";
import { Label } from "@/components/ui/label";

const initialFormData = {
  image: null,
  name: "",
  username: "",
  usertype: "",
  usersubtype: "",
  password: "",
  designation: "",
  dateofbirth: "",
  dateofjoining: "",
  personalcontact: "",
  officialcontact: "",
  address: "",
  adharorvoter: "",
  pan: "",
  cheque: "",
};

const ManageEmployee = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { EmployeeList } = useSelector((state) => state.adminEmployee);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    const finalImage = uploadedImageUrl || formData.image;
    const updatedData = {
      ...formData,
      image: finalImage,
    };

    if (currentEditedId !== null) {
      dispatch(
        editEmployee({ id: currentEditedId, formData: updatedData })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllEmployee());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
          setUploadedImageUrl("");  // Reset image URL
          setImageFile("");       // Reset image file
          toast({ title: "Employee edited successfully" });
        }
      });
    } else {
      dispatch(addEmployee(updatedData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllEmployee());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setUploadedImageUrl("");  // Reset image URL
          setImageFile("");       // Reset image file
          toast({ title: "Employee added successfully" });
        }
      });
    }
  }

  function handleDeleteConfirmation(employeeId) {
    setEmployeeToDelete(employeeId);
    setConfirmDelete(true);
  }

  function handleDeleteConfirmed() {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllEmployee());
          setConfirmDelete(false);
          setEmployeeToDelete(null);
        }
      });
    }
  }

  useEffect(() => {
    dispatch(fetchAllEmployee());
  }, [dispatch]);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsContent value="orders">
            <Fragment>
              <div className="mb-5 w-full flex justify-end">
                <Button 
                onClick={() => setOpenCreateProductsDialog(true)}>
                  Add New Employee
                </Button>
              </div>

              <div className="mb-5 w-full flex">
                <div className="relative flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                  <input
                    type="text"
                    placeholder="Search by name or username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 w-full"
                  />
                  <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    <option value="">All</option>
                    <option value="sales">Sales</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
              </div>

              <Card className="w-full mx-auto my-4 p-4 bg-white shadow-md rounded-lg ">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    All Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="min-w-full ">
                      <TableHeader>
                        <TableRow className="bg-gray-200">
                          <TableHead className="px-4 py-2 text-left">
                            Employee ID
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            Employee Image
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            Employee Name
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            Employee Type
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            Employee Username
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            Employee Password
                          </TableHead>
                          <TableHead className="px-4 py-2 text-left">
                            QR
                          </TableHead>

                          <TableHead className="px-4 py-2 text-left">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {EmployeeList && EmployeeList.length > 0 ? (
                          EmployeeList.filter(
                            (employee) =>
                              (employee.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                                employee.username
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())) &&
                              (filterOption === "" ||
                                employee.usertype === filterOption)
                          ).map((employee) => (
                            <TableRow
                              key={employee?._id}
                              className="border-b hover:bg-gray-100"
                            >
                              <TableCell className="px-4 py-2 uppercase">
                                MR{employee?.pan}
                              </TableCell>
                              <TableCell className="px-4 py-2 w-4">
                                <img src={employee?.image} alt="" />
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee?.name}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee?.usertype}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee?.username}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee?.password}
                              </TableCell>

                              {/* ✅ QR Code */}
                              <TableCell className="px-4 py-2">
                                <QRCodeCanvas
                                  value={JSON.stringify({
                                    id: `MR${employee?.pan}`,
                                    name: employee?.name,
                                    username: employee?.username,
                                    pan: employee?.pan,
                                    voter_aadhar: employee?.adharorvoter,
                                    usertype: employee?.usertype,
                                  })}
                                  size={200}
                                />
                              </TableCell>

                              <TableCell className="px-4 py-2 flex flex-wrap gap-2">
                                {/* Action buttons */}
                                <Button
                                  onClick={() => {
                                    setOpenCreateProductsDialog(true);
                                    setCurrentEditedId(employee?._id);
                                    setFormData(employee);
                                  }}
                                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteConfirmation(employee?._id)
                                  }
                                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                  Delete
                                </Button>
                                <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                  <Link
                                    to={`/admin/salaryslipbyemployee/${employee?._id}`}
                                  >
                                    Pay Slip
                                  </Link>
                                </Button>
                                <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                  <Link
                                    to={`/admin/warningemployee/${employee?._id}`}
                                  >
                                    Give Warning
                                  </Link>
                                </Button>
                                <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                  <Link to={`/admin/legal/${employee?._id}`}>
                                    Add Legal Notice
                                  </Link>
                                </Button>
                                {employee?.usersubtype?.toLowerCase() ===
                                "bsa" ? (
                                  <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                    <Link
                                      to={`/admin/bsalist/${employee?._id}`}
                                    >
                                      Add List
                                    </Link>
                                  </Button>
                                ) : employee?.usersubtype?.toLowerCase() ===
                                  "manager" ? (
                                  <Button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-300">
                                    <Link
                                      to={`/admin/managerlist/${employee?._id}`}
                                    >
                                      Add List
                                    </Link>
                                  </Button>
                                ) : null}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              No employees found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>

                      <Dialog
                        open={confirmDelete}
                        onOpenChange={setConfirmDelete}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure you want to delete this employee?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              onClick={() => setConfirmDelete(false)}
                              className="bg-gray-500 text-white hover:bg-gray-600"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDeleteConfirmed}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                  setOpenCreateProductsDialog(false);
                  setCurrentEditedId(null);
                  setFormData(initialFormData);
                  setUploadedImageUrl("");  // Reset image URL
                  setImageFile("");       // Reset image file
              }}
              >
                <SheetContent side="right" className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Add New Employee</SheetTitle>
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
                    <form onSubmit={onSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full border p-2 rounded"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <input
                        type="email"
                        placeholder="Username"
                        className="w-full border p-2 rounded"
                        name="username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        required
                      />
                      <select
                        className="w-full border p-2 rounded"
                        value={formData.usertype}
                        onChange={(e) =>
                          setFormData({ ...formData, usertype: e.target.value })
                        }
                        required
                      >
                        <option value="">Select Usertype</option>
                        <option value="sales">Sales</option>
                        <option value="delivery">Delivery</option>
                        <option value="admin">Accounts & Admin</option>
                        <option value="floor">Floor & Dispatch</option>
                        <option value="marketing">Marketing</option>
                      </select>
                      {formData.usertype === "sales" && (
                        <div>
                          <label className="block font-semibold">
                            User Subtype
                          </label>
                          <select
                            value={formData.usersubtype}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                usersubtype: e.target.value,
                              })
                            }
                            className="border rounded p-2 w-full"
                            required
                          >
                            <option value=""> Select Subtype </option>
                            <option value="BSA">BSA</option>
                            <option value="MANAGER">MANAGER</option>
                          </select>
                        </div>
                      )}

                      <input
                        type="text"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Designation"
                        className="w-full border p-2 rounded mb-4"
                        value={formData.designation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            designation: e.target.value,
                          })
                        }
                      />
                      <Label className="pt-4">Date of Birth</Label>
                      <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.dateofbirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateofbirth: e.target.value,
                          })
                        }
                      />
             <Label className="pt-4">Date of Joining</Label>

                      <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.dateofjoining}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dateofjoining: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Personal Contact"
                        className="w-full border p-2 rounded"
                        value={formData.personalcontact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalcontact: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Official Contact"
                        className="w-full border p-2 rounded"
                        value={formData.officialcontact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            officialcontact: e.target.value,
                          })
                        }
                      />
                      <textarea
                        placeholder="Address"
                        className="w-full border p-2 rounded"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      ></textarea>
                      <input
                        type="text"
                        placeholder="Aadhar/Voter ID"
                        className="w-full border p-2 rounded"
                        value={formData.adharorvoter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            adharorvoter: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="PAN No"
                        className="w-full border p-2 rounded"
                        value={formData.pan}
                        onChange={(e) =>
                          setFormData({ ...formData, pan: e.target.value })
                        }
                      />
                      <textarea
                        placeholder="Cheque Details"
                        className="w-full border p-2 rounded"
                        value={formData.cheque}
                        onChange={(e) =>
                          setFormData({ ...formData, cheque: e.target.value })
                        }
                      ></textarea>
                      <Button
                        type="submit"
                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {currentEditedId ? "Update" : "Add"}
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
  );
};

export default ManageEmployee;
