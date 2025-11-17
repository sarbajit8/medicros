import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGalleryItems } from "@/store/gallery-slice";
import logo from "../../assets/mlogo.png"; // Brand logo

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const dispatch = useDispatch();
  const { galleryItemsList } = useSelector((state) => state.galleryItems);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    dispatch(getGalleryItems());
  }, [dispatch]);

  // Filter images based on search input

  const filteredGallery = galleryItemsList
  .filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )
  .filter((item) =>
    filterType === "All"
      ? true
      : item.type?.toLowerCase().trim() === filterType.toLowerCase().trim()
  );



  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") {
      handleClose();
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredGallery.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredGallery.length - 1 ? 0 : prevIndex + 1
    );
  };




  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex flex-col md:flex-row items-center justify-between p-6 relative z-10">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-white animate-fade-in">
            📸 Gallery
          </h1>
          <p className="text-white mt-1">A collection of beautiful images</p>
        </div>


        <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
  {["All", "Products", "Employees", "Events", "Others"].map((type) => (
    <button
      key={type}
      onClick={() => setFilterType(type)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        filterType === type
          ? "bg-white text-indigo-600 shadow"
          : "bg-indigo-400 text-white hover:bg-indigo-500"
      }`}
    >
      {type}
    </button>
  ))}
</div>



        {/* Search Bar - Centered in Header */}
        <div className="relative w-full md:w-1/3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          />
          <span className="absolute right-4 top-2 text-gray-500">🔍</span>
        </div>
      </header>

      {/* Gallery Grid */}
   <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
    {filteredGallery.length > 0 ? (
      filteredGallery.map((data, index) => (
        <div
          key={index}
          className="group overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={() => handleImageClick(index)}
        >
          <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-110"
            />
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-b-lg">
            <h2 className="text-lg font-semibold truncate">{data.title}</h2>
            <h3 className="text-sm font-medium truncate">{data.designation}</h3>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600 text-xl col-span-full">
        No images found for "{searchQuery}"
      </p>
    )}
  </div>
</main>


      {/* Lightbox Modal - Higher z-index to be on top */}
      {isOpen && (
        <div
          id="modal"
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white rounded-lg p-6 shadow-lg transition-transform transform scale-100 animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-700 transition"
              onClick={handleClose}
            >
              ✖
            </button>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition"
              onClick={handlePrevious}
            >
              ◀
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition"
              onClick={handleNext}
            >
              ▶
            </button>

            {/* Modal Content */}
            <img
              src={filteredGallery[currentIndex].image}
              alt={filteredGallery[currentIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <h2 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              {filteredGallery[currentIndex].title}
            </h2>
            <h4 className="text-lg font-semibold text-gray-800 mt-4 text-center">
              {filteredGallery[currentIndex].designation}
            </h4>
          </div>
        </div>
      )}


    </div>
  );
};

export default Gallery;
