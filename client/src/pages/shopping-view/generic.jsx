import { fetchAllProducts } from "@/store/admin/product-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const genericMedicines = [
  "Paracetamol",
  "Paracetamol + Phenylephrine + Chlorpheniramine + Tazobactam",
  "Phenytoin",
  "Phenytoin + Diazepam",
  "Propofol",
  "Propranolol + Clonidine",
  "Propafenone",
  "Prostaglandin",
  "Rabeprazole",
  "Rabeprazole + Domperidone",
  "Rabeprazole + Levosulpiride",
];

const pharmaCompanies = [
  "Abbott (Generic Division)",
  "Ajanta Pharma",
  "Alkem Laboratories (Elder Division)",
  "Alkem Pharma (Generic Division)",
  "Biochem (Generic Division)",
  "Cipla",
  "Cadila (Biopharm Ltd Generic Division)",
  "Cadila (Generic Division)",
];

const Generic = () => {
  const [searchGeneric, setSearchGeneric] = useState("");
  const [searchPharma, setSearchPharma] = useState("");
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Normalize text: Convert to lowercase & remove spaces
  const normalizeText = (text) => text?.toLowerCase().replace(/\s+/g, "");

  // Filter generic category products
  const genericProducts = productList.filter(
    (product) => product.slider?.toLowerCase() === "generic"
  );

  // Get unique compositions
  const uniqueCompositions = [
    ...new Map(
      genericProducts.map((product) => [normalizeText(product.composition), product])
    ).values(),
  ];

  // Get unique brands
  const uniqueBrands = [
    ...new Map(
      genericProducts.map((product) => [normalizeText(product.brand), product])
    ).values(),
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 🎨 Upper Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-500 text-white py-10 px-6 rounded-b-2xl">
        <h1 className="text-4xl font-extrabold text-center">
          💊 Generic Medicine Price List
        </h1>

        {/* 🔍 Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Search by Generic Name */}
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md transition hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-teal-300">
              🔍 Search by Generic Name
            </h2>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchGeneric}
              onChange={(e) => setSearchGeneric(e.target.value)}
              className="w-full p-3 border border-teal-300 rounded-lg bg-white text-gray-800 focus:ring focus:ring-teal-400 focus:border-teal-500 transition"
            />
          </div>

          {/* Search by Pharma Company */}
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md transition hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-teal-300">
              🏭 Search by Pharma Company
            </h2>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchPharma}
              onChange={(e) => setSearchPharma(e.target.value)}
              className="w-full p-3 border border-teal-300 rounded-lg bg-white text-gray-800 focus:ring focus:ring-teal-400 focus:border-teal-500 transition"
            />
          </div>
        </div>
      </div>

      {/* 📋 List Section with Different Background Colors for Each Card */}
      <div className="container mx-auto px-6 py-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Generic Medicines List - Blue Background */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              💊 Generic / Composition
            </h3>
            <div className="h-72 overflow-y-auto overflow-x-hidden border-t border-blue-300 pt-3">
              {uniqueCompositions.length > 0 ? (
                uniqueCompositions
                  .filter((medicine) =>
                    normalizeText(medicine?.composition).includes(
                      normalizeText(searchGeneric)
                    )
                  )
                  .map((medicine, index) => (
                    <Link
                      key={index}
                      to={`/shop/genericbycomposition/${medicine.composition}`}
                      className="block py-2 px-6 bg-blue-50 text-blue-900 hover:bg-blue-400 hover:text-white rounded-md transition transform hover:scale-105"
                    >
                      {medicine?.composition}
                    </Link>
                  ))
              ) : (
                <p className="text-gray-500">No results found.</p>
              )}
            </div>
          </div>

          {/* Pharma Companies List - Green Background */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              🏢 Manufacturing / Marketing Companies
            </h3>
            <div className="h-72 overflow-y-auto overflow-x-hidden border-t border-green-300 pt-3">
              {uniqueBrands.length > 0 ? (
                uniqueBrands
                  .filter((company) =>
                    normalizeText(company?.brand).includes(
                      normalizeText(searchPharma)
                    )
                  )
                  .map((company, index) => (
                    <Link
                      key={index}
                      to={`/shop/genericbycompany/${company?.brand}`}
                      className=" flex  py-2 px-3 bg-green-50 text-green-900 hover:bg-green-400 hover:text-white rounded-md transition transform hover:scale-105"
                    >
                      <div className="bg-green-200 mx-2 p-1 rounded-3xl">
                      {company?.brand?.slice(0, 6)}.... {/* Display only first 6 letters */}
                      </div>
                         {company?.brand} (Generic Divison)
                    </Link>
                  ))
              ) : (
                <p className="text-gray-500">No results found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generic;



