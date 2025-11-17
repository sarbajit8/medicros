import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from '@/hooks/use-toast';

const ExcelProdicts = () => {
  const [file, setFile] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to track search term

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/excel/getUsers`);
      if (response.data.success) {
        setExcelData(response.data.data);
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
      toast({
        title: response.data.msg
      });
      setFile(null);
      document.getElementById("fileInput").value = "";
      fetchData();
    } catch (error) {
      toast({
        title: "Error uploading file",
        variant: 'destructive',
      });
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
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/excel/updateUser/${selectedItem._id}`, {
        title: newTitle,
        brand: newBrand,
      });
      setResponseMsg(response.data.msg);
      fetchData();
      handleUpdateClose();
    } catch (error) {
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
      setResponseMsg("Error deleting user.");
    }
  };

  // Group the data by brand
  const groupedData = excelData.reduce((acc, item) => {
    if (!acc[item.brand]) {
      acc[item.brand] = [];
    }
    acc[item.brand].push(item);
    return acc;
  }, {});

  // Filter the grouped data based on the search term
  const filteredData = Object.keys(groupedData).reduce((acc, brand) => {
    const filteredItems = groupedData[brand].filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[brand] = filteredItems;
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center pt-8 bg-white">
      {/* Search Bar */}
      <div className="bg-white p-4 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search by brand or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display grouped data in card format */}
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
        <h3 className="text-4xl font-bold text-center mb-4">Available Products</h3>
        {Object.keys(filteredData).length > 0 ? (
          Object.keys(filteredData).map((brand) => (
            <div key={brand} className="mb-6">
              <h4 className="text-lg font-semibold mb-4">{brand}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData[brand].map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h5 className="text-md font-semibold mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 mb-4">{item.brand}</p>
                    <div className="flex justify-between">
                      {/* <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => handleUpdateOpen(item)}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDeleteOpen(item)}
                      >
                        Delete
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
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
              {/* <button
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
              </button> */}
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
              {/* <button
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
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelProdicts;
