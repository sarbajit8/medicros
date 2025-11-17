import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PopupCard from "@/components/shopping-view/popupCard";

const productList = [
  { id: 1, title: "Luxury Watch", price: 4999, image: "https://via.placeholder.com/300" },
  { id: 2, title: "Elegant Shoes", price: 2599, image: "https://via.placeholder.com/300" },
  { id: 3, title: "Stylish Jacket", price: 3999, image: "https://via.placeholder.com/300" },
  { id: 4, title: "Modern Sunglasses", price: 1599, image: "https://via.placeholder.com/300" },
  { id: 5, title: "Leather Wallet", price: 899, image: "https://via.placeholder.com/300" },
  { id: 6, title: "Smartphone", price: 20999, image: "https://via.placeholder.com/300" },
  { id: 7, title: "Gaming Laptop", price: 69999, image: "https://via.placeholder.com/300" },
];

const Sliderleft = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollLeftFunc = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRightFunc = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-3/5 p-6 rounded-xl relative">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left mb-6">
            ✨ Featured Products ✨
          </h2>
          
          <button onClick={scrollLeftFunc} className="absolute left-0 inset-y-0 my-auto flex items-center justify-center z-50">
            <ChevronLeft className="w-8 h-8 text-gray-600 transition-all duration-300 hover:scale-110" />
          </button>

          <div 
            ref={sliderRef} 
            className="flex gap-6 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-700 transition-all duration-300 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {productList.map((product) => (
              <Card 
                key={product.id} 
                className="min-w-[280px] max-w-[280px] shadow-xl border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-700">{product.title}</h3>
                  <p className="text-blue-700 font-bold text-lg">₹{product.price}</p>
                  <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg text-lg">
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <button onClick={scrollRightFunc} className="absolute right-0 inset-y-0 my-auto flex items-center justify-center z-50">
            <ChevronRight className="w-8 h-8 text-gray-600 transition-all duration-300 hover:scale-110" />
          </button>
        </div>

        <div className="w-full md:w-2/5 bg-white p-8 rounded-lg shadow-md">
          {/* <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">📩 Contact Us</h2>
          <form className="space-y-6">
            <Input className="border-gray-300 rounded-lg p-4 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-md text-lg" placeholder="Your Name" required />
            <Input className="border-gray-300 rounded-lg p-4 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-md text-lg" placeholder="Your Email" required />
            <Input className="border-gray-300 rounded-lg p-4 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-md text-lg" placeholder="Your Mobile" required />
            <textarea className="border-gray-300 rounded-lg p-4 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-md text-lg" placeholder="Your Message" rows="5" required></textarea>
            <Button className="w-full bg-blue-500 text-white font-semibold rounded-lg py-4 hover:bg-blue-600 shadow-lg text-lg transition-transform transform hover:-translate-y-1">
              Submit
            </Button>
          </form> */}
          <PopupCard/>
        </div>
      </div>
    </div>
  );
};

export default Sliderleft;
