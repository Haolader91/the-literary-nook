"use client";

import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { getAllBooks } from "../lib/getpost/books";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface Book {
  _id: string;
  title: string;
  author?: string;
  genre: string;
  price: string | number;
  imageUrl?: string;
  rating?: number;
  isSale?: boolean;
  description?: string;
  createdAt?: string;
}

const NewReleases = () => {
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBooks()
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedBooks = [...data].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            return b._id.localeCompare(a._id);
          });
          setNewBooks(sortedBooks.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load new releases:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-stone-200 pb-4 mb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ec458] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              Fresh Arrivals
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-stone-900 mt-2">
              New <span className="text-[#2ec458]">Releases</span>
            </h2>
          </div>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider hidden sm:block">
            Explore the latest additions
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200/60 p-4 space-y-4 animate-pulse h-[420px] flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-48 bg-stone-100 rounded-xl"></div>
                  <div className="h-3 bg-stone-100 rounded w-1/3 mt-4"></div>
                  <div className="h-4 bg-stone-100 rounded w-3/4 mt-2"></div>
                  <div className="h-3 bg-stone-100 rounded w-full mt-2"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-stone-100 rounded w-1/4"></div>
                  <div className="h-9 bg-stone-100 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : newBooks.length === 0 ? (
          <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200/60">
            <p className="text-stone-500 font-medium">
              No new releases available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newBooks.map((book) => (
              <div
                key={book._id}
                className="group bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm hover:shadow-md hover:border-stone-300/80 transition-all flex flex-col justify-between relative overflow-hidden h-[430px]"
              >
                <span className="absolute top-3 left-3 bg-[#2ec458] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md z-20 shadow-sm">
                  New
                </span>

                <div className="w-full h-48 bg-stone-50 rounded-xl overflow-hidden border border-stone-100 flex items-center justify-center relative mb-3 flex-shrink-0">
                  <img
                    src={
                      book.imageUrl ||
                      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400"
                    }
                    alt={book.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* হোভার অ্যাকশন */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <AddToCartButton book={book} />
                  </div>
                </div>

                <div className="space-y-1 mb-3 flex-1 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {book.genre}
                    </span>
                    {book.rating && (
                      <span className="text-[10px] font-bold text-amber-500">
                        ★ {book.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-stone-900 line-clamp-1 uppercase tracking-wide pt-1">
                    {book.title}
                  </h3>

                  <p className="text-[11px] text-stone-500 font-medium truncate">
                    by {book.author || "Unknown Author"}
                  </p>

                  <p className="text-[11px] text-stone-400 line-clamp-2 pt-1 leading-normal">
                    {book.description ||
                      "Discover this amazing literary piece filled with incredible stories and thoughts."}
                  </p>
                </div>

                <div className="space-y-2.5 mt-auto pt-2 border-t border-stone-100 flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Price
                    </span>
                    <span className="text-sm font-black text-stone-900">
                      ${Number(book.price).toFixed(2)}
                    </span>
                  </div>

                  <Link href={`/sale/${book._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider py-2 bg-stone-50 text-stone-700 hover:bg-stone-100 rounded-xl border border-stone-200/60 transition-colors">
                      <FiEye size={14} /> View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewReleases;
