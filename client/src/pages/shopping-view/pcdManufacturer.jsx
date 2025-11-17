import { fetchAllPcd } from '@/store/admin/pcd-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShopPcdManufacturer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { adminPcdList } = useSelector(state => state.adminPcd);

  useEffect(() => {
    dispatch(fetchAllPcd());
  }, [dispatch]);

  const normalizeText = (text) => text?.toLowerCase().trim().replace(/\s+/g, ' ') || "";

  const filteredPcdList = adminPcdList.filter(pcd =>
    normalizeText(pcd.name).includes(normalizeText(searchTerm)) ||
    normalizeText(pcd.username).includes(normalizeText(searchTerm))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <header className="bg-white shadow-md flex items-center py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">PCD Manufacturers</h1>
          <p className="mt-2 text-gray-600">Explore verified PCD manufacturers</p>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-5 py-3 w-full text-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPcdList.length > 0 ? (
            filteredPcdList.map((pcd) => (
            <Link key={pcd._id} to={`/shop/shoppingpcdproductbyid/${pcd._id}`} className="h-full">
  <div className="h-full bg-white border border-purple-100 shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 relative group">
    
    {/* Image */}
    {pcd.image ? (
      <img
        src={pcd.image}
        alt={pcd.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-white shadow mb-4"
      />
    ) : (
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 mb-4">
        No Image
      </div>
    )}

    {/* Info */}
    <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition">{pcd.name}</h3>
    <p className="text-sm text-gray-500 group-hover:text-purple-500">@{pcd.username}</p>

    <div className="mt-3 text-sm text-gray-600 space-y-1">
      <p><span className="font-medium">Email:</span> {pcd.email}</p>
      <p><span className="font-medium">Address:</span> {pcd.address}</p>
      <p><span className="font-medium">Pin:</span> {pcd.pin}</p>
    </div>

  </div>
</Link>

            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No PCD manufacturers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPcdManufacturer;
