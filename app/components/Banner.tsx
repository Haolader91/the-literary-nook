"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const Hero = () => {
  const slides: SlideItem[] = [
    {
      id: 1,
      title: "Discover Your Next Great Read",
      subtitle:
        "Explore thousands of books from world-renowned authors at The Literary Nook. Your gateway to infinite worlds starts here.",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop", // বুক কভার ১
    },
    {
      id: 2,
      title: "Empower Your Reading Journey",
      subtitle:
        "Join our community of book lovers. Buy your favorite genres or become a certified seller and share your collection today.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop", // বুক কভার ২
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[65vh] min-h-60% max-h-70% w-full bg-[#f5f3e6] overflow-hidden flex items-center border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full pt-4">
        <div className="flex flex-col justify-center space-y-5 z-10 text-left">
          <div className="space-y-3 transition-all duration-700 ease-in-out">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 w-fit">
              Welcome to the Nook
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight uppercase">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm md:text-base text-stone-600 max-w-md font-medium leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/sale"
              className="group flex items-center gap-2 px-6 py-3 bg-[#2ec458] hover:bg-[#27b04e] text-white font-bold text-sm rounded-xl shadow-md active:scale-[0.98] transition-all duration-300"
            >
              Shop Now
              <FiArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Link>

            <Link
              href="/signUp"
              className="px-5 py-3 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-sm rounded-xl shadow-sm active:scale-[0.98] transition-all"
            >
              Become A Seller
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center relative h-[80%] w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-95 translate-x-10 pointer-events-none"
              }`}
            >
              <div className="relative w-85 h-110 lg:w-95 lg:h-120 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-stone-100">
                <Image
                  src={slide.image}
                  alt="Book Banner"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-stone-900/10 via-transparent to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400 pointer-events-none animate-bounce">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
          Scroll Down
        </span>
        <FiChevronDown size={18} className="text-stone-500" />
      </div>
    </section>
  );
};

export default Hero;
