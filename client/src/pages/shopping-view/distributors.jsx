import { fetchAllDistributor } from '@/store/admin/distributor-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Distributors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { adminDistributorList } = useSelector(state => state.adminDistributor);
    
    useEffect(() => {
        dispatch(fetchAllDistributor());
    }, [dispatch]);

    // ✅ Function to normalize text (removes extra spaces & makes lowercase)
    const normalizeText = (text) => text?.toLowerCase().trim().replace(/\s+/g, ' ') || "";

    // ✅ Filter distributors based on normalized search term
    const filteredDistributor = adminDistributorList.filter(distributor => 
        normalizeText(distributor.name).includes(normalizeText(searchTerm)) ||
        normalizeText(distributor.username).includes(normalizeText(searchTerm))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            
            {/* 🔹 Page Header */}
            <header className="bg-white shadow-md flex items-center py-6 px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800">Distributors</h1>
                    <p className="mt-2 text-gray-600">Find and explore trusted distributors</p>
                </div>
            </header>

            {/* 🔹 Content Section */}
            <div className="container mx-auto p-6">
                
                {/* ✅ Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded px-5 py-3 w-full text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                </div>

                {/* ✅ Distributor Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredDistributor.length > 0 ? (
                        filteredDistributor.map((distributor) => (
<Link
  key={distributor._id}
  to={`/shop/ShoppingDistributorProducts/${distributor._id}`}
>
  <div className="h-[360px] w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 group relative">
    {/* Hover Glow Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-50 to-transparent opacity-0 group-hover:opacity-60 transition-all duration-300 rounded-xl z-0" />

    <div className="flex flex-col justify-between items-center text-center h-full p-6 z-10 relative">
      {/* Distributor Image */}
      {distributor.image ? (
        <img
          src={distributor.image}
          alt={distributor.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-sm text-gray-500">
          No Image
        </div>
      )}

      {/* Distributor Name + Username */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition">
          {distributor.name}
        </h3>
        <p className="text-sm text-gray-500 group-hover:text-blue-500 transition">
          @{distributor.username}
        </p>
      </div>

      {/* Address Info */}
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Email:</span> {distributor.email}</p>
        <p><span className="font-medium">Address:</span> {distributor.address}</p>
        <p><span className="font-medium">Pin:</span> {distributor.pin}</p>
      </div>
    </div>
  </div>
</Link>




                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No distributors found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Distributors;
