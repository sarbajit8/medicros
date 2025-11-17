import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addNewSalary, deleteSalarySlip, editEmployeeSalary, getAllSalarySlipByEmployeeId } from '@/store/employee/employeeSalary-slice';
import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { useToast } from '@/hooks/use-toast';
import { addPaySleepElements } from '@/config'; // Ensure this import is correct
import { Card, CardContent, CardFooter } from '@/components/ui/card';
 // Import close icon
import { CircleX, Cross, CrossIcon, Download } from 'lucide-react';

const initialFormData = {
    image: null,
    title: "",  
};

const SalarySlip = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const [openCreateGalleryDialog, setOpenCreateGalleryDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchMonth, setSearchMonth] = useState(""); // State for month search
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
    const { salaryList } = useSelector(state => state.employeeSalary);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { employee } = useSelector(state => state.adminEmployee);
    
    useEffect(() => {
        dispatch(getAllSalarySlipByEmployeeId(employee?.id));
    }, [dispatch, employee?.id]);

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

    const handleDownload = async (fileUrl, fallbackName = "file") => {
        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
      
          // Extract file extension from the URL or Content-Type
          const urlParts = fileUrl.split(".");
          const extFromUrl = urlParts.length > 1 ? urlParts[urlParts.length - 1].split(/\#|\?/)[0] : "";
          const extension = extFromUrl || blob.type.split("/")[1] || "file";
      
          const fileName = `${fallbackName}.${extension}`;
          const downloadUrl = URL.createObjectURL(blob);
      
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = fileName;
          a.click();
      
          URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          console.error("Download failed:", error);
        }
      };
      
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedImage(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClosePopup();
        }
    };

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
            </div>
 
<div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
  {filteredSalaryList && filteredSalaryList.length > 0 ? (
    filteredSalaryList.map((salary) => (
      <Card key={salary._id} className="w-full max-w-sm mx-auto">
      <div>
        {/* PDF Download Icon */}
        <div className="flex justify-center items-center h-48 bg-gray-100 rounded-t-lg">
          <a
            href={`${import.meta.env.VITE_API_URL}/uploads/${salary.image?.split("/").pop()}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-center"
            title="Download PDF"
          >
            <Download className="h-12 w-12 mx-auto" />
            <span className="text-sm block mt-2">Download PDF</span>
          </a>
        </div>
    
        {/* Info Section */}
        <CardContent>
          <h2 className="text-xl font-bold mb-2 break-words max-w-[200px]">
            {salary?.title}
          </h2>
          <p>{salary?.date ? salary.date.split("T")[0] : 'N/A'}</p>
        </CardContent>
      </div>
    </Card>
    
    ))
  ) : (
    <p>No salary slips found.</p>
  )}
</div>
            {/* Popup for displaying the image */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
                    <div className="relative bg-white p-4 rounded">
                        <CircleX className="absolute top-0 right-0 cursor-pointer" onClick={handleClosePopup} />
                        <img src={selectedImage} alt="Selected Salary Slip" className="max-w-full max-h-[80vh] object-contain" />
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default SalarySlip;