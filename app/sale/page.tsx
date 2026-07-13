"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FiSliders, FiX, FiEye } from "react-icons/fi";
import { getAllBooks } from "../lib/getpost/books";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

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

const SalePage = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    getAllBooks()
      .then((data) => {
        if (Array.isArray(data)) {
          setAllBooks(data);
        }
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Failed to load sale books:", err);
        setLoadingData(false);
      });
  }, []);

  const genres = useMemo(() => {
    const extractedGenres = allBooks.map((book) => book.genre).filter(Boolean);
    return ["All", ...Array.from(new Set(extractedGenres))];
  }, [allBooks]);

  const filteredBooks = useMemo(() => {
    return allBooks
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.author &&
            book.author.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesGenre =
          selectedGenre === "All" || book.genre === selectedGenre;
        const matchesPrice = Number(book.price) <= maxPrice;

        return matchesSearch && matchesGenre && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [allBooks, searchQuery, selectedGenre, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-[#f5f3e6] text-stone-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200/80 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-stone-900">
              The Literary <span className="text-[#2ec458]">Shop</span>
            </h1>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
              Showing {loadingData ? "..." : filteredBooks.length} of{" "}
              {loadingData ? "..." : allBooks.length} books
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search in sale..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-white border border-stone-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden p-2 bg-white border border-stone-300 rounded-lg text-stone-700"
            >
              <FiSliders size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <aside className="hidden md:flex flex-col w-64 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-6 flex-shrink-0 sticky top-24">
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
                Genres
              </h3>
              <div className="flex flex-col gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`text-left text-[11px] font-bold py-1 px-2 rounded-md transition-colors uppercase tracking-wider ${
                      selectedGenre === genre
                        ? "bg-emerald-50 text-[#2ec458]"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-stone-100 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-emerald-600">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2ec458] cursor-pointer"
              />
            </div>
          </aside>

          <main className="flex-1">
            {loadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-stone-200/60 p-4 space-y-4 animate-pulse h-[420px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full h-48 bg-stone-200 rounded-xl"></div>
                      <div className="h-3 bg-stone-200 rounded w-1/3 mt-4"></div>
                      <div className="h-4 bg-stone-200 rounded w-3/4 mt-2"></div>
                      <div className="h-3 bg-stone-200 rounded w-full mt-2"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-stone-200 rounded w-1/4"></div>
                      <div className="h-9 bg-stone-200 rounded-xl w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-20 bg-white border rounded-2xl p-6">
                <p className="text-stone-500 font-medium">
                  No books found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="group bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden h-[430px]"
                  >
                    {book.isSale && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-stone-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md z-20">
                        Sale
                      </span>
                    )}

                    <div className="w-full h-48 bg-stone-50 rounded-xl overflow-hidden border border-stone-100 flex items-center justify-center relative mb-3 flex-shrink-0">
                      <img
                        src={
                          book.imageUrl ||
                          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400"
                        }
                        alt={book.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

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
                        {book.shortDescription ||
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
          </main>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end md:hidden">
          <div className="w-80 bg-white h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h2 className="text-sm font-black uppercase tracking-wider">
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-stone-500"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-lg border uppercase tracking-wider text-[10px] ${
                        selectedGenre === genre
                          ? "bg-emerald-50 border-[#2ec458] text-[#2ec458]"
                          : "border-stone-200 text-stone-600"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-stone-100 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
                    Max Price
                  </h3>
                  <span className="text-xs font-bold text-emerald-600">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2ec458] cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-2.5 bg-stone-900 text-white font-bold text-sm rounded-xl uppercase tracking-wider"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalePage;
