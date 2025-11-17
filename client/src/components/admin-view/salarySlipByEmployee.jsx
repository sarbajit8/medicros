import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addNewSalary, deleteSalarySlip, editEmployeeSalary, getAllSalarySlipByEmployeeId } from '@/store/employee/employeeSalary-slice';
import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import EmployeeSalaryTile from '../employee-view/salaryslip-tile';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter } from '../ui/card';
import { addPaySleepElements } from '@/config'; // Ensure this import is correct
import { addOrUpdateAlertByAdmin } from '@/store/admin/alert-slice';

const initialFormData = {
    image: null,
    title: "",  
};

const SalarySlipByEmployee = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [openCreateGalleryDialog, setOpenCreateGalleryDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchMonth, setSearchMonth] = useState(""); // State for month search
    const { salaryList } = useSelector(state => state.employeeSalary);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { employeeId } = useParams();

    useEffect(() => {
        dispatch(getAllSalarySlipByEmployeeId(employeeId));
    }, [dispatch, employeeId]);

    // Filter salaryList based on search criteria
    const filteredSalaryList = salaryList.filter(salary => {
        const salaryDate = new Date(salary.date);
        const year = salaryDate.getFullYear();
        const month = salaryDate.getMonth() + 1; // Months are zero-indexed

        const matchesTitle = salary.title.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesYear = searchYear ? year.toString() === searchYear : true;
        const matchesMonth = searchMonth ? month.toString() === searchMonth : true;

        return matchesTitle && matchesYear && matchesMonth;
    });

   function onSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("employeeId", employeeId);
  formDataToSend.append("date", new Date().toISOString());

  if (imageFile) {
    formDataToSend.append("image", imageFile);
  } else if (uploadedImageUrl) {
    formDataToSend.append("image", uploadedImageUrl);
  }

  if (currentEditedId !== null) {
    dispatch(editEmployeeSalary({ id: currentEditedId, formData: formDataToSend })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllSalarySlipByEmployeeId(employeeId));
        resetFormState();
        toast({ title: "Salary slip updated successfully" });

        // 🔔 Add or update alert
        dispatch(
          addOrUpdateAlertByAdmin({
            username: data.payload.username || "Employee",
            userid: employeeId,
            type: `Pay slip updated: ${formData.title}`,
          })
        );
      }
    });
  } else {
    dispatch(addNewSalary(formDataToSend)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllSalarySlipByEmployeeId(employeeId));
        resetFormState();
        toast({ title: "Salary slip added successfully" });

        // 🔔 Add or update alert
        dispatch(
          addOrUpdateAlertByAdmin({
            username: data.payload.username || "Employee",
            userid: employeeId,
            type: `New pay slip added: ${formData.title}`,
          })
        );
      }
    });
  }
}

      
      function resetFormState() {
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialFormData);
        setOpenCreateGalleryDialog(false);
        setCurrentEditedId(null);
      }
      

    function handleDelete(getCurrentProductId) {
        dispatch(deleteSalarySlip(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllSalarySlipByEmployeeId(employeeId));
            }
        });
    }

    return (
        <Fragment>
            <div className='mb-5 flex justify-between'>
            <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
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
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    </select>
</div>
                <Button onClick={() => setOpenCreateGalleryDialog(true)}>
                    Add Pay Slip
                </Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {
                    filteredSalaryList && filteredSalaryList.length > 0 ?
                        filteredSalaryList.map(salary => (
                            <Card key={salary._id} className="w-full max-w-sm mx-auto">
  <div>
    {/* PDF Download Section */}
    <div className="flex justify-center items-center h-48 bg-gray-100 rounded-t-lg">
    <a
  href={`${import.meta.env.VITE_API_URL}/uploads/${salary.image?.split("/").pop()}`}
  download
  target="_blank"
  rel="noopener noreferrer"
>
  Download PDF
</a>


    </div>

    {/* Info Section */}
    <CardContent>
      <h2 className="text-xl font-bold mb-2 break-words max-w-[200px]">{salary?.title}</h2>
      <p>{salary?.date ? salary.date.split("T")[0] : 'N/A'}</p>
    </CardContent>

    {/* Actions */}
    <CardFooter className="flex justify-between items-center">
      <Button
        onClick={() => {
          setOpenCreateGalleryDialog(true);
          setCurrentEditedId(salary?._id);
          setFormData(salary);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(salary?._id)}
        variant="destructive"
      >
        Delete
      </Button>
    </CardFooter>
  </div>
</Card>

                        )) : (
                            <p>No salary slips found.</p>
                        )
                }
            </div>
            <Sheet open={openCreateGalleryDialog} onOpenChange={() => {
                setOpenCreateGalleryDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }}>
              <SheetContent side="right" className="overflow-auto">
  <SheetHeader>
    <SheetTitle>{currentEditedId !== null ? "Edit Pay Slip" : "Add New Pay Slip"}</SheetTitle>
  </SheetHeader>

  <div className="py-4 space-y-4">

    <label className="block font-medium text-sm">Upload PDF</label>
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
        }
      }}
      className="w-full border p-2 rounded"
    />

 

    <CommonForm
      formData={formData}
      setFormData={setFormData}
      buttonText={currentEditedId !== null ? "Edit" : "Add"}
      onSubmit={onSubmit}
      formControls={addPaySleepElements}
    />
  </div>
</SheetContent>

            </Sheet>
        </Fragment>
    );
}

export default SalarySlipByEmployee;