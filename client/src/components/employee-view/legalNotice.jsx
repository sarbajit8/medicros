import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleX, Download } from "lucide-react";
import { getAllLegalByEmployeeId } from "@/store/admin/legal-slice";
import { useToast } from "@/hooks/use-toast";

const LegalNotice = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { employee } = useSelector((state) => state.adminEmployee);
  const { legalList } = useSelector((state) => state.employeeLegal);

  useEffect(() => {
    if (employee?.id) {
      dispatch(getAllLegalByEmployeeId(employee.id));
    }
  }, [dispatch, employee?.id]);

  const filteredLegalList = legalList.filter((doc) => {
    const date = new Date(doc.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const matchesTitle = doc.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesYear = searchYear ? year.toString() === searchYear : true;
    const matchesMonth = searchMonth ? month.toString() === searchMonth : true;

    return matchesTitle && matchesYear && matchesMonth;
  });

  const handleDownload = async (fileUrl, fallbackName = "file") => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const urlParts = fileUrl.split(".");
      const extFromUrl = urlParts.length > 1 ? urlParts.pop().split(/\#|\?/)[0] : "";
      const extension = extFromUrl || blob.type.split("/")[1] || "pdf";

      const fileName = `${fallbackName}.${extension}`;
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      a.click();

      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      toast({ title: "Download failed", variant: "destructive" });
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
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredLegalList.length > 0 ? (
          filteredLegalList.map((doc) => (
            <Card key={doc._id} className="w-full max-w-sm mx-auto">
              <div>
                {/* PDF Download Icon */}
                <div className="flex justify-center items-center h-48 bg-gray-100 rounded-t-lg">
                  <button
                    onClick={() =>
                      handleDownload(
                        `${import.meta.env.VITE_API_URL}/uploads/${doc.image?.split("/").pop()}`,
                        doc.title
                      )
                    }
                    className="text-blue-600 hover:text-blue-800 text-center"
                    title="Download PDF"
                  >
                    <Download className="h-12 w-12 mx-auto" />
                    <span className="text-sm block mt-2">Download PDF</span>
                  </button>
                </div>

                <CardContent>
                  <h2 className="text-xl font-bold mb-2 break-words max-w-[200px]">{doc?.title}</h2>
                  <p>{doc?.date ? doc.date.split("T")[0] : "N/A"}</p>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <p>No legal notices found.</p>
        )}
      </div>

      {/* Optional popup (if you want to preview something later) */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white p-4 rounded">
            <CircleX className="absolute top-0 right-0 cursor-pointer" onClick={handleClosePopup} />
            <img
              src={selectedImage}
              alt="Selected Legal Document"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LegalNotice;
