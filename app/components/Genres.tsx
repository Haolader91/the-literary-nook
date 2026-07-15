"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDynamicGenresFromBooks } from "../lib/getpost/books";

const STYLE_MAP: Record<string, { bgClass: string; slug: string }> = {
  Fiction: {
    slug: "fiction",
    bgClass: "bg-amber-50/80 border-amber-200 text-amber-900",
  },
  "Thriller & Mystery": {
    slug: "thriller-mystery",
    bgClass: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
  },
  "Sci-Fi & Fantasy": {
    slug: "sci-fi-fantasy",
    bgClass: "bg-blue-50/80 border-blue-200 text-blue-900",
  },
  "Poetry & Arts": {
    slug: "poetry-arts",
    bgClass: "bg-rose-50/80 border-rose-200 text-rose-900",
  },
  "Biography & Memoir": {
    slug: "biography",
    bgClass: "bg-purple-50/80 border-purple-200 text-purple-900",
  },
  "Business & Finance": {
    slug: "business-finance",
    bgClass: "bg-stone-50/80 border-stone-200 text-stone-900",
  },
};

const DEFAULT_STYLE = {
  slug: "unknown-genre",
  bgClass: "bg-stone-50/80 border-stone-200 text-stone-900",
};

interface GenreItem {
  name: string;
  count: number;
  slug: string;
  bgClass: string;
}

const Genres = () => {
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeGenres = async () => {
      try {
        const data = await getDynamicGenresFromBooks();

        const formattedGenres = data
          .map((item: { name: string; count: number }) => {
            const style = STYLE_MAP[item.name] || {
              bgClass: DEFAULT_STYLE.bgClass,
              slug: item.name
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/ /g, "-"),
            };

            return {
              name: item.name,
              count: item.count,
              slug: style.slug,
              bgClass: style.bgClass,
            };
          })
          .slice(0, 4);

        setGenres(formattedGenres);
      } catch (error) {
        console.error("Failed to load homepage genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeGenres();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#f5f3e6] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-6 w-48 bg-stone-300 rounded"></div>
            <div className="h-1 w-12 bg-stone-300 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (genres.length === 0) return null;

  return (
    <section className="py-16 bg-[#f5f3e6] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-stone-800 uppercase tracking-wider mb-2">
            Explore Genres
          </h2>
          <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre, idx) => (
            <Link
              key={idx}
              href={`/genres/${genre.slug}`}
              className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.99] shadow-sm flex flex-col justify-between h-36 cursor-pointer ${genre.bgClass}`}
            >
              <div>
                <h3 className="text-lg font-extrabold tracking-wide uppercase line-clamp-1">
                  {genre.name}
                </h3>
                <p className="text-xs font-semibold opacity-70 mt-1">
                  {genre.count} {genre.count === 1 ? "Book" : "Books"}
                </p>
              </div>
              <span className="text-xs font-bold underline underline-offset-4 tracking-wider uppercase">
                View Genre →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres;
