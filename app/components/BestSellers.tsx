import React from "react";
import Link from "next/link";

const BestSellers = () => {
  const sampleBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "$14.99",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: "$16.20",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "$12.50",
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-black text-stone-800 uppercase tracking-wider mb-1">
              Best Sellers
            </h2>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Top trending reads this week
            </p>
          </div>
          <Link
            href="/sale"
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
          >
            View All Books
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm hover:shadow-md transition-all flex gap-4"
            >
              <div className="w-24 h-36 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0 shadow-inner border border-stone-200/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-stone-800 line-clamp-2 uppercase tracking-wide leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    by {book.author}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-emerald-600">
                    {book.price}
                  </span>
                  <button className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-stone-900 text-white rounded-md hover:bg-[#2ec458] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
