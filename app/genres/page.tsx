"use client";

import React from "react";
import Link from "next/link";
import {
  FiBookOpen,
  FiSearch,
  FiCompass,
  FiPenTool,
  FiUser,
  FiGlobe,
  FiSmile,
  FiTrendingUp,
} from "react-icons/fi";

interface GenreCard {
  id: number;
  name: string;
  count: string;
  slug: string;
  icon: React.ReactNode;
  bgClass: string;
}

const GenresPage = () => {
  const genres: GenreCard[] = [
    {
      id: 1,
      name: "Fiction",
      count: "120+ Books",
      slug: "fiction",
      icon: <FiBookOpen size={48} className="text-amber-600/80" />,
      bgClass: "bg-amber-50/70 border-amber-200/80 text-stone-800",
    },
    {
      id: 2,
      name: "Thriller & Mystery",
      count: "120+ Books",
      slug: "thriller-mystery",
      icon: <FiSearch size={48} className="text-emerald-600/80" />,
      bgClass: "bg-emerald-50/70 border-emerald-200/80 text-stone-800",
    },
    {
      id: 3,
      name: "Sci-Fi & Fantasy",
      count: "110+ Books",
      slug: "sci-fi-fantasy",
      icon: <FiCompass size={48} className="text-blue-600/80" />,
      bgClass: "bg-blue-50/70 border-blue-200/80 text-stone-800",
    },
    {
      id: 4,
      name: "Poetry & Arts",
      count: "120+ Books",
      slug: "poetry-arts",
      icon: <FiPenTool size={48} className="text-rose-600/80" />,
      bgClass: "bg-rose-50/70 border-rose-200/80 text-stone-800",
    },
    {
      id: 5,
      name: "Biography & Memoir",
      count: "120+ Books",
      slug: "biography-memoir",
      icon: <FiUser size={48} className="text-purple-600/80" />,
      bgClass: "bg-purple-50/70 border-purple-200/80 text-stone-800",
    },
    {
      id: 6,
      name: "History & Politics",
      count: "130+ Books",
      slug: "history-politics",
      icon: <FiGlobe size={48} className="text-cyan-600/80" />,
      bgClass: "bg-cyan-50/70 border-cyan-200/80 text-stone-800",
    },
    {
      id: 7,
      name: "Children's Books",
      count: "100+ Books",
      slug: "children-books",
      icon: <FiSmile size={48} className="text-orange-600/80" />,
      bgClass: "bg-orange-50/70 border-orange-200/80 text-stone-800",
    },
    {
      id: 8,
      name: "Business & Finance",
      count: "200+ Books",
      slug: "business-finance",
      icon: <FiTrendingUp size={48} className="text-stone-500/80" />,
      bgClass: "bg-stone-50/70 border-stone-200/80 text-stone-800",
    },
  ];

  return (
    <div className="min-h-[85vh] bg-[#f5f3e6] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl md:text-4xl font-black text-stone-800 uppercase tracking-widest relative inline-block">
            Explore Genres
            <span className="absolute left-0 bottom-[-8px] w-full h-[3px] bg-amber-400/80 rounded-full"></span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.slug}`}
              className={`group relative p-8 rounded-2xl border-2 flex flex-col items-center justify-between text-center h-64 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md cursor-pointer ${genre.bgClass}`}
            >
              <div className="mt-2 transition-transform duration-300 group-hover:scale-110">
                {genre.icon}
              </div>

              {/* টেক্সট কন্টেন্ট */}
              <div className="my-4">
                <h2 className="text-lg font-black uppercase tracking-wide leading-tight">
                  {genre.name}
                </h2>
                <p className="text-xs font-bold text-stone-500/80 mt-1">
                  {genre.count}
                </p>
              </div>

              {/* বটম অ্যাকশন টেক্সট */}
              <div className="w-full flex justify-center items-center gap-1 text-xs font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity mt-auto">
                <span>View Genre</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
