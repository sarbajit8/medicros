import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PopupCard = ({ setPopupCard }) => {
  const [excelData, setExcelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/excel/getUsers`);
        if (response.data.success) {
          setExcelData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery === "") {
      setFilteredProducts(excelData);
      setIsSearching(false);
    } else {
      const filtered = excelData.filter((product) =>
        product.title.toLowerCase().includes(trimmedQuery)
      );
      setFilteredProducts(filtered);
      setIsSearching(true);
    }
  }, [searchQuery, excelData]);

  return (
    <>
      {/* Custom CSS to hide scrollbar */}
      <style>{`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative w-full h-full rounded-lg border bg-cyan-400 text-center p-4">
        {/* Search Bar */}
        <div className="sticky top-0 pb-2 z-10">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-sm px-2 py-2 w-full"
            />
            <button className="ml-2 p-2 rounded-full bg-blue-500 text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.5 2a8.5 8.5 0 1 0 6.36 14.36l4.64 4.64a1 1 0 0 0 1.41-1.41l-4.64-4.64A8.5 8.5 0 0 0 10.5 2zm0 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-2 max-h-[300px] overflow-y-auto border-t border-gray-200 pr-2 scroll-hide">
          <ul className={`list-none text-left ${isSearching ? '' : 'animate-loop-scroll'}`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all m-1"
                >
                  <Link
                    to='#'
                    className="text-blue-50 hover:underline uppercase break-words block"
                  >
                    {product.title}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-700 text-center py-2">No products found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PopupCard;
