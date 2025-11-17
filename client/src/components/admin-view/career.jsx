import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCareer } from "@/store/shop/career-slice";
import { Button } from "@/components/ui/button";

const CareerList = () => {
  const dispatch = useDispatch();
  const { careerList } = useSelector((state) => state.career);

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
      // Add your toast or alert here
    }
  };

  useEffect(() => {
    dispatch(fetchAllCareer());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Career Applications
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="min-w-[900px] w-full border border-gray-300 bg-white rounded shadow-md text-sm sm:text-base">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Duration</th>
              <th className="p-3 border">Amount (INR)</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">PDF</th>
            </tr>
          </thead>
          <tbody>
            {careerList.map((career) => (
              <tr key={career._id} className="text-center">
                <td className="p-3 border break-words max-w-[180px]">{career.name}</td>
                <td className="p-3 border break-words max-w-[200px]">{career.email}</td>
                <td className="p-3 border break-words max-w-[160px]">{career.phone}</td>
                <td className="p-3 border capitalize">{career.type}</td>
                <td className="p-3 border">{career.duration || "-"}</td>
                <td className="p-3 border">{career.amount ? `${career.amount}` : "-"}</td>
                <td className="p-3 border capitalize">{career.paymentStatus || "-"}</td>
                <td className="p-3 border break-words max-w-[220px]">{career.address}</td>
                <td className="p-3 border">{new Date(career.date).toLocaleDateString()}</td>
                <td className="p-3 border">
                  <Button
                    onClick={() =>
                      handleDownload(
                        `${import.meta.env.VITE_API_URL}/uploads/${career.image?.split("/").pop()}`,
                        career.name
                      )
                    }
                    variant="outline"
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {careerList.map((career) => (
          <div key={career._id} className="border rounded-lg shadow-sm p-4 bg-white">
            <p className="break-words max-w-[200px]"><span className="font-semibold">Name:</span> {career.name}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Email:</span> {career.email}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Phone:</span> {career.phone}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Type:</span> {career.type}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Duration:</span> {career.duration || "-"}</p>
            <p><span className="font-semibold">Amount (INR):</span> {career.amount ? `${career.amount}` : "-"}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Payment Status:</span> {career.paymentStatus || "-"}</p>
            <p className="break-words max-w-[200px]"><span className="font-semibold">Address:</span> {career.address}</p>
            <p><span className="font-semibold">Date:</span> {new Date(career.date).toLocaleDateString()}</p>
            <div className="flex justify-center items-center rounded-t-lg">
              <Button
                onClick={() =>
                  handleDownload(
                    `${import.meta.env.VITE_API_URL}/uploads/${career.image?.split("/").pop()}`,
                    career.name
                  )
                }
                variant="outline"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerList;
