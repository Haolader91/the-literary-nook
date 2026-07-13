import React from "react";
import Link from "next/link";

const Genres = () => {
  const genres = [
    {
      name: "Fiction",
      count: "120+ Books",
      bg: "bg-amber-50/80 border-amber-200 text-amber-900",
    },
    {
      name: "Thriller & Mystery",
      count: "85+ Books",
      bg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
    },
    {
      name: "Sci-Fi & Fantasy",
      count: "60+ Books",
      bg: "bg-blue-50/80 border-blue-200 text-blue-900",
    },
    {
      name: "Poetry & Arts",
      count: "45+ Books",
      bg: "bg-rose-50/80 border-rose-200 text-rose-900",
    },
  ];

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
              href="/genres"
              key={idx}
              className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.99] shadow-sm flex flex-col justify-between h-36 cursor-pointer ${genre.bg}`}
            >
              <div>
                <h3 className="text-lg font-extrabold tracking-wide uppercase">
                  {genre.name}
                </h3>
                <p className="text-xs font-semibold opacity-70 mt-1">
                  {genre.count}
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
