import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import user from "../../assets/blankuser.png";

const testimonials = [
  {
    id: 1,
    name: "Anita Sharma",
    role: "Patient",
    photo: `${user}`,
    text: "This medicine brand has transformed my health. Reliable and effective treatments with noticeable improvements within weeks!",
  },
  {
    id: 2,
    name: "Dr. Raj Patel",
    role: "General Physician",
    photo: `${user}`,
    text: "I trust this brand for my patients. Their products meet the highest standards and show excellent results.",
  },
  {
    id: 3,
    name: "Sunil Mehta",  
    role: "Customer",
    photo: `${user}`,
    text: "The medicine is very effective and the customer support is excellent. Highly recommended for chronic conditions.",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">What Our Customers Say</h2>

      <div className="relative">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`transition-opacity duration-700 ease-in-out absolute inset-0 p-6 ${
              index === currentIndex ? "opacity-100 relative" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src={testimonial.photo}
                alt={`${testimonial.name} photo`}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
              <p className="text-lg italic text-gray-700 max-w-xl">"{testimonial.text}"</p>
              <h3 className="text-xl font-semibold text-blue-800">{testimonial.name}</h3>
              <p className="text-sm font-medium text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous testimonial"
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-100 hover:bg-blue-200 rounded-full p-2 shadow-md transition"
        >
          <ChevronLeft className="w-6 h-6 text-blue-700" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-100 hover:bg-blue-200 rounded-full p-2 shadow-md transition"
        >
          <ChevronRight className="w-6 h-6 text-blue-700" />
        </button>
      </div>
    </section>
  );
}
