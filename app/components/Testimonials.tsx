import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Anika Rahman",
      role: "Avid Reader",
      review:
        "Finding rare translation novels was so easy here! The delivery was incredibly fast and the book condition was pristine.",
    },
    {
      name: "Tanvir Ahmed",
      role: "Store Seller",
      review:
        "As a seller, the integration with Better-Auth made management seamless. Truly a modern marketplace for book lovers.",
    },
  ];

  return (
    <section className="py-16 bg-[#f5f3e6] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-stone-800 uppercase tracking-wider mb-2">
            What Our Community Says
          </h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/40 relative"
            >
              <FaQuoteLeft
                className="text-stone-200/70 absolute top-4 right-6"
                size={32}
              />
              <p className="text-sm text-stone-600 font-medium leading-relaxed italic relative z-10 mb-4">
                {rev.review}
              </p>
              <div>
                <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wide">
                  {rev.name}
                </h4>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                  {rev.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
