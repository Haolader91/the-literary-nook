import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import AddToCartButton from "@/app/components/AddToCartButton";
import { getAllBooks } from "@/app/lib/getpost/books";

const GENRE_MAP: Record<string, string> = {
  fiction: "Fiction",
  "thriller-mystery": "Thriller & Mystery",
  "sci-fi-fantasy": "Sci-Fi & Fantasy",
  "business-finance": "Business & Finance",
  biography: "Biography",
  "poetry-arts": "Poetry & Arts",
  "history-politics": "History & Politics",
  "children-books": "Children's Books",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const GenreDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const genreRealName = GENRE_MAP[slug] || "Books";

  let books = [];
  try {
    const allBooks = await getAllBooks();

    books = allBooks.filter((book: any) => book.genre === genreRealName);
  } catch (error) {
    console.error("Failed to load genre books:", error);
  }

  return (
    <div className="min-h-screen bg-[#f5f3e6] py-12 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link
            href="/genres"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-500 hover:text-stone-800 transition-colors"
          >
            <FiArrowLeft size={16} /> Back to Genres
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-black uppercase tracking-widest text-stone-900">
              {genreRealName} <span className="text-[#2ec458]">Collection</span>
            </h1>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
              Explore our curated selection of {genreRealName.toLowerCase()}{" "}
              masterpieces
            </p>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200/60 rounded-2xl shadow-sm">
            <p className="text-sm font-black uppercase tracking-wider text-stone-400">
              No books found in this genre yet.
            </p>
            <Link
              href="/items/add/"
              className="mt-4 inline-block text-xs font-black uppercase tracking-wider text-[#2ec458] hover:underline"
            >
              Be the first to add a book!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book: any) => (
              <div
                key={book._id}
                className="bg-white border border-stone-200/60 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="aspect-3/4 w-full bg-stone-100 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center border border-stone-100">
                  {book.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                      No Cover
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-stone-900/90 text-[#f5f3e6] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    ${book.price}
                  </span>
                </div>

                <div className="mb-4 grow">
                  <h3 className="text-sm font-black uppercase tracking-wide text-stone-900 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs font-bold text-[#2ec458] uppercase tracking-wider mt-0.5">
                    by {book.author || "Unknown Author"}
                  </p>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                    {book.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <AddToCartButton book={book} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreDetailsPage;
