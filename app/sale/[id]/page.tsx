"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiHeart, FiShare2, FiCheckCircle } from "react-icons/fi";
import { getAllBooks } from "@/app/lib/getpost/books";
import AddToCartButton from "@/app/components/AddToCartButton";

interface Book {
  _id: string;
  title: string;
  author?: string;
  genre: string;
  price: string | number;
  imageUrl?: string;
  rating?: number;
  isSale?: boolean;
  shortDescription?: string;
  fullDescription?: string;
}

const BookDetailsPage = () => {
  const params = useParams();
  const id = params?.id ? String(params.id) : "";
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    getAllBooks()
      .then((data) => {
        if (Array.isArray(data)) {
          const foundBook = data.find(
            (b) => b._id.toString() === id.toString(),
          );
          setBook(foundBook || null);
        } else {
          setBook(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="w-24 h-8 bg-stone-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="w-full h-125 bg-stone-200 rounded-3xl"></div>
            <div className="space-y-6">
              <div className="h-4 bg-stone-200 rounded w-1/4"></div>
              <div className="h-8 bg-stone-200 rounded w-3/4"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2"></div>
              <div className="h-24 bg-stone-200 rounded w-full"></div>
              <div className="h-10 bg-stone-200 rounded w-1/3"></div>
              <div className="h-12 bg-stone-200 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-stone-800 uppercase tracking-wider">
          Book Not Found
        </h2>
        <p className="text-stone-500 text-xs mt-2">
          The book ID {id} does not exist or has been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 bg-stone-900 text-white rounded-xl"
        >
          <IoArrowBackOutline size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors mb-8"
        >
          <IoArrowBackOutline
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to collection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="w-full bg-[#f5f3e6] rounded-3xl p-8 flex items-center justify-center border border-stone-200/40 shadow-sm relative overflow-hidden min-h-[400px] md:min-h-[550px]">
            {book.isSale && (
              <span className="absolute top-4 left-4 bg-amber-400 text-stone-900 text-xs font-black uppercase px-3 py-1 rounded-md z-10 shadow-sm">
                Sale
              </span>
            )}
            <img
              src={
                book.imageUrl ||
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600"
              }
              alt={book.title}
              className="max-h-[450px] object-contain rounded-xl shadow-2xl transform hover:scale-102 transition-transform duration-300"
            />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md">
                {book.genre}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-stone-500">
                <FiCheckCircle className="text-[#2ec458]" /> In Stock
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-black uppercase tracking-wider text-stone-900 leading-tight">
                {book.title}
              </h1>
              <p className="text-sm font-bold text-stone-500">
                By
                <span className="text-stone-800 underline decoration-stone-300 cursor-pointer">
                  {book.author || "Unknown Author"}
                </span>
              </p>
            </div>

            {book.rating && (
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1 w-fit">
                <span className="text-amber-500 text-sm">★</span>
                <span className="text-xs font-black text-amber-700">
                  {book.rating} / 5.0
                </span>
              </div>
            )}

            <hr className="border-stone-100" />

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
                Synopsis
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {book.fullDescription ||
                  book.shortDescription ||
                  "Discover this amazing literary piece filled with incredible stories, deep thoughts, and unparalleled imagination. A perfect addition to your book collection that hooks you from the very first page."}
              </p>
            </div>

            <hr className="border-stone-100" />

            <div className="flex items-baseline gap-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Price:
              </span>
              <span className="text-3xl font-black text-stone-900">
                ${Number(book.price).toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <AddToCartButton book={book} buttonText="Add to Shopping Cart" />

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3.5 border rounded-xl transition-all ${isFavorite ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                >
                  <FiHeart
                    size={20}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-3.5 bg-white border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors">
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
