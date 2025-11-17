import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  addNewLegal,
  deleteLegal,
  editEmployeeLegal,
  getAllLegalByEmployeeId,
} from "@/store/admin/legal-slice";
import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addPaySleepElements } from "@/config";
import { addOrUpdateAlertByAdmin } from "@/store/admin/alert-slice";

const initialFormData = {
  image: null,
  title: "",
};

const LegalNotice = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchMonth, setSearchMonth] = useState("");

  const { legalList } = useSelector((state) => state.employeeLegal);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(getAllLegalByEmployeeId(employeeId));
  }, [dispatch, employeeId]);

  const filteredLegalList = legalList.filter((doc) => {
    const dateObj = new Date(doc.date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;

    return (
      doc.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      (searchYear ? year.toString() === searchYear : true) &&
      (searchMonth ? month.toString() === searchMonth : true)
    );
  });

 const onSubmit = (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("employeeId", employeeId);
  formDataToSend.append("date", new Date().toISOString());

  if (imageFile) {
    formDataToSend.append("image", imageFile);
  } else if (uploadedImageUrl) {
    formDataToSend.append("image", uploadedImageUrl);
  }

  if (currentEditedId) {
    dispatch(editEmployeeLegal({ id: currentEditedId, formData: formDataToSend })).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllLegalByEmployeeId(employeeId));
        toast({ title: "Legal document updated successfully" });

        // 🔔 Send alert
        dispatch(addOrUpdateAlertByAdmin({
          username: res.payload?.username || "Employee",
          userid: employeeId,
          type: `Legal notice updated: ${formData.title}`,
        }));

        resetFormState();
      }
    });
  } else {
    dispatch(addNewLegal(formDataToSend)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllLegalByEmployeeId(employeeId));
        toast({ title: "Legal document added successfully" });

        // 🔔 Send alert
        dispatch(addOrUpdateAlertByAdmin({
          username: res.payload?.username || "Employee",
          userid: employeeId,
          type: `New legal notice: ${formData.title}`,
        }));

        resetFormState();
      }
    });
  }
};


  const resetFormState = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData(initialFormData);
    setCurrentEditedId(null);
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteLegal(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllLegalByEmployeeId(employeeId));
        toast({ title: "Deleted successfully" });
      }
    });
  };

  return (
    <Fragment>
      <div className="mb-5 flex justify-between">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Search by year"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          />
          <select
            value={searchMonth}
            onChange={(e) => setSearchMonth(e.target.value)}
            className="border rounded p-2 w-full md:w-auto"
          >
            <option value="">Search by month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => setOpenDialog(true)}>Add Legal Doc</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredLegalList.length > 0 ? (
          filteredLegalList.map((doc) => (
            <Card key={doc._id} className="w-full max-w-sm mx-auto">
              <div>
                <div className="flex justify-center items-center h-48 bg-gray-100 rounded-t-lg">
                  <a
                    href={`${import.meta.env.VITE_API_URL}/uploads/${doc.image?.split("/").pop()}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download PDF
                  </a>
                </div>
                <CardContent>
                  <h2 className="text-xl font-bold mb-2 break-words max-w-[200px]">
                    {doc.title}
                  </h2>
                  <p>{doc.date?.split("T")[0] || "N/A"}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    onClick={() => {
                      setOpenDialog(true);
                      setCurrentEditedId(doc._id);
                      setFormData(doc);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(doc._id)}>
                    Delete
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))
        ) : (
          <p>No legal documents found.</p>
        )}
      </div>

      {/* Drawer/Sheet for Add/Edit */}
      <Sheet
        open={openDialog}
        onOpenChange={() => {
          resetFormState();
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId ? "Edit Legal Document" : "Add Legal Document"}</SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4">
            <label className="block font-medium text-sm">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setImageFile(file);
              }}
              className="w-full border p-2 rounded"
            />
            {/* {(uploadedImageUrl || formData?.image) && (
              <a
                href={formData.image || uploadedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Existing PDF
              </a>
            )} */}

            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              onSubmit={onSubmit}
              formControls={addPaySleepElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};



export default LegalNotice