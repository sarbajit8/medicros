import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const Excel = () => {
  const [file, setFile] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/excel/getUsers`);
      if (response.data.success) {
        setExcelData(response.data.data);
        const brands = [...new Set(response.data.data.map((item) => item.brand))];
        setAvailableBrands(brands);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseMsg("Failed to fetch data.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileCancel = () => {
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/excel/importUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({ title: response.data.msg });
      setFile(null);
      document.getElementById("fileInput").value = "";
      fetchData();
    } catch (error) {
      if (error.response) {
        toast({ title: error.response.data.msg, variant: "destructive" });
      } else {
        toast({ title: "Error uploading file", variant: "destructive" });
      }
    }
  };

  const handleUpdateOpen = (item) => {
    setSelectedItem(item);
    setNewTitle(item.title);
    setNewBrand(item.brand);
    setShowUpdatePopup(true);
  };

  const handleUpdateClose = () => {
    setShowUpdatePopup(false);
    setSelectedItem(null);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/excel/updateUser/${selectedItem._id}`,
        { title: newTitle, brand: newBrand }
      );
      setResponseMsg(response.data.msg);
      fetchData();
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setResponseMsg("Error updating user.");
    }
  };

  const handleDeleteOpen = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const handleDeleteClose = () => {
    setShowDeletePopup(false);
    setSelectedItem(null);
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/excel/deleteUser/${selectedItem._id}`);
      setResponseMsg(response.data.msg);
      fetchData();
      handleDeleteClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      setResponseMsg("Error deleting user.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-8 bg-white">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Upload CSV File</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              id="fileInput"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {file && (
              <button
                type="button"
                onClick={handleFileCancel}
                className="absolute top-1 right-1 text-red-500"
                aria-label="Cancel file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload
          </button>
        </form>
        {responseMsg && <p className="mt-4 text-center text-sm text-gray-700">{responseMsg}</p>}
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full max-w-4xl px-6">
        <input
          type="text"
          placeholder="Search by Title or Brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full sm:w-1/3 mt-2 sm:mt-0 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          {availableBrands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-xl font-bold text-center mb-4">Uploaded Data</h3>
        <div className="max-h-[400px] overflow-y-auto">
          {excelData.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b">
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Brand</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {excelData
                  .filter(
                    (item) =>
                      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
                      (selectedBrand === "" || item.brand === selectedBrand)
                  )
                  .map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-2 break-words max-w-[100px]">{item.title}</td>
                      <td className="p-2 break-words max-w-[100px]">{item.brand}</td>
                      <td className="p-2 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                          onClick={() => handleUpdateOpen(item)}
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                          onClick={() => handleDeleteOpen(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No data available.</p>
          )}
        </div>
      </div>

      {/* Update Popup */}
      {showUpdatePopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update User</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleUpdateClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Delete User</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleDeleteClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Excel;
