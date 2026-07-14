"use client";

import React, { useEffect, useState } from "react";
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
import { getDynamicGenresFromBooks } from "../lib/getpost/books";

const STYLE_MAP: Record<
  string,
  { icon: React.ReactNode; bgClass: string; slug: string }
> = {
  Fiction: {
    slug: "fiction",
    icon: <FiBookOpen size={48} className="text-amber-600/80" />,
    bgClass: "bg-amber-50/70 border-amber-200/80 text-stone-800",
  },
  "Thriller & Mystery": {
    slug: "thriller-mystery",
    icon: <FiSearch size={48} className="text-emerald-600/80" />,
    bgClass: "bg-emerald-50/70 border-emerald-200/80 text-stone-800",
  },
  "Sci-Fi & Fantasy": {
    slug: "sci-fi-fantasy",
    icon: <FiCompass size={48} className="text-blue-600/80" />,
    bgClass: "bg-blue-50/70 border-blue-200/80 text-stone-800",
  },
  "Poetry & Arts": {
    slug: "poetry-arts",
    icon: <FiPenTool size={48} className="text-rose-600/80" />,
    bgClass: "bg-rose-50/70 border-rose-200/80 text-stone-800",
  },
  "Biography & Memoir": {
    slug: "biography",
    icon: <FiUser size={48} className="text-purple-600/80" />,
    bgClass: "bg-purple-50/70 border-purple-200/80 text-stone-800",
  },
  "History & Politics": {
    slug: "history-politics",
    icon: <FiGlobe size={48} className="text-cyan-600/80" />,
    bgClass: "bg-cyan-50/70 border-cyan-200/80 text-stone-800",
  },
  "Children's Books": {
    slug: "children-books",
    icon: <FiSmile size={48} className="text-orange-600/80" />,
    bgClass: "bg-orange-50/70 border-orange-200/80 text-stone-800",
  },
  "Business & Finance": {
    slug: "business-finance",
    icon: <FiTrendingUp size={48} className="text-stone-500/80" />,
    bgClass: "bg-stone-50/70 border-stone-200/80 text-stone-800",
  },
};

const DEFAULT_STYLE = {
  slug: "unknown-genre",
  icon: <FiBookOpen size={48} className="text-stone-600/80" />,
  bgClass: "bg-stone-50/70 border-stone-200/80 text-stone-800",
};

interface GenreCard {
  name: string;
  count: number;
  slug: string;
  icon: React.ReactNode;
  bgClass: string;
}

const GenresPage = () => {
  const [genres, setGenres] = useState<GenreCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getDynamicGenresFromBooks();

        const dynamicGenres = data.map(
          (item: { name: string; count: number }) => {
            const style = STYLE_MAP[item.name] || {
              ...DEFAULT_STYLE,

              slug: item.name
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/ /g, "-"),
            };

            return {
              name: item.name,
              count: item.count,
              slug: style.slug,
              icon: style.icon,
              bgClass: style.bgClass,
            };
          },
        );

        setGenres(dynamicGenres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[85vh] bg-[#f5f3e6] flex flex-col items-center justify-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
          Loading Genres...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#f5f3e6] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl md:text-4xl font-black text-stone-800 uppercase tracking-widest relative inline-block">
            Explore Genres
            <span className="absolute left-0 -bottom-2 w-full h-0.75 bg-amber-400/80 rounded-full"></span>
          </h1>
        </div>

        {genres.length === 0 ? (
          <div className="text-center py-20 bg-white/50 border border-stone-200/60 rounded-2xl">
            <p className="text-sm font-black uppercase tracking-wider text-stone-400">
              No books or genres found in the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map((genre, index) => (
              <Link
                key={index}
                href={`/genres/${genre.slug}`}
                className={`group relative p-8 rounded-2xl border-2 flex flex-col items-center justify-between text-center h-64 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md cursor-pointer ${genre.bgClass}`}
              >
                <div className="mt-2 transition-transform duration-300 group-hover:scale-110">
                  {genre.icon}
                </div>

                <div className="my-4">
                  <h2 className="text-lg font-black uppercase tracking-wide leading-tight line-clamp-2">
                    {genre.name}
                  </h2>
                  <p className="text-xs font-bold text-stone-500/80 mt-1">
                    {genre.count} {genre.count === 1 ? "Book" : "Books"}
                  </p>
                </div>

                <div className="w-full flex justify-center items-center gap-1 text-xs font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity mt-auto">
                  <span>View Genre</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenresPage;
