import { ChevronDown, ChevronUp, Check } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategorys } from "@/store/admin/category-slice";
import { fetchAllBrands } from "@/store/admin/brand-slice";

const ProductFilter = ({ filters, handleFilter }) => {
  const dispatch = useDispatch();
  const { categoryList = [] } = useSelector((state) => state.adminCategory);
  const { brandList = [] } = useSelector((state) => state.adminBrand);

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  
  const categoryDropdownRef = useRef(null);
  const [categoryDropdownHeight, setCategoryDropdownHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCategorys());
    dispatch(fetchAllBrands());
  }, [dispatch]);

  // Measure category dropdown height when it opens
  useEffect(() => {
    if (isCategoryDropdownOpen) {
      setCategoryDropdownHeight(categoryDropdownRef.current?.offsetHeight || 0);
    } else {
      setCategoryDropdownHeight(0);
    }
  }, [isCategoryDropdownOpen]);

  return (
    <div className="bg-background rounded-lg shadow-sm p-4 relative">
      {/* Filter Title */}
      <h2 className="text-lg font-extrabold border-b pb-2">Filters</h2>

      {/* CATEGORY FILTER */}
      <div className="relative">
  <button
    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
    className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg flex justify-between items-center gap-2 shadow-sm"
  >
    {filters.category?.length > 0
      ? filters.category.join(", ")
      : "Select Categories"}
    {isCategoryDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>

  {/* Category Dropdown */}
  {isCategoryDropdownOpen && (
    <div
      ref={categoryDropdownRef}
      className="absolute left-0 top-full mt-2 w-full p-4 bg-white border border-gray-300 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto"
    >
      {categoryList.length > 0 ? (
        categoryList.map((category, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => handleFilter("category", category.name)}
          >
            {/* Square Checkbox */}
            <div className="w-5 h-5 min-w-[20px] min-h-[20px] border border-gray-400 flex items-center justify-center mr-2 rounded-sm">
              {filters.category?.includes(category.name) && (
                <Check size={14} className="text-blue-600" />
              )}
            </div>
            <span className="text-sm">{category.name}</span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No categories available.</p>
      )}
    </div>
  )}
</div>


      {/* BRAND FILTER (Shifts Down Dynamically with Gap) */}
      <div className="relative transition-all duration-300" style={{ marginTop: categoryDropdownHeight + 16 }}>
        <button
          onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
          className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg flex justify-between items-center gap-2 shadow-sm mt-4"
        >
          {filters.brand?.length > 0
            ? filters.brand.join(", ") // Show selected brands
            : "Select Brands"}
          {isBrandDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Brand Dropdown */}
        {isBrandDropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-full p-4 bg-white border border-gray-300 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
            {brandList.length > 0 ? (
              brandList.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleFilter("brand", brand.name)}
                >
                  {/* Checkbox Indicator */}
                  <div className="w-5 h-5 border border-gray-400 flex items-center justify-center mr-2 rounded">
                    {filters.brand?.includes(brand.name) && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </div>
                  {brand.name}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No brands available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
