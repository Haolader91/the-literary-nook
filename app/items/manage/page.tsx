"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { GiBookshelf } from "react-icons/gi";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { getAllBooks } from "@/app/lib/getpost/books";
import { removeFromCartDB } from "@/app/lib/actions/books";
import DeleteConfirmModal from "@/app/components/DeleteConfirmModal";

interface BookItem {
  _id: string;
  title: string;
  genre: string;
  price: string | number;
  shortDescription: string;
  userEmail?: string;
}

const ManageItemsPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [books, setBooks] = useState<BookItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.email) {
      getAllBooks()
        .then((data: BookItem[]) => {
          const myBooks = data.filter(
            (book) => book.userEmail === session.user.email,
          );
          setBooks(myBooks);
          setLoadingData(false);
        })
        .catch((err) => {
          console.error("Failed to load books:", err);
          setLoadingData(false);
        });
    }
  }, [session]);

  const openDeleteModal = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBookId) return;

    try {
      setDeletingId(selectedBookId);

      await removeFromCartDB(selectedBookId);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== selectedBookId),
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
      setSelectedBookId(null);
    }
  };

  const handleView = (bookId: string) => {
    router.push(`/sale/${bookId}`);
  };

  if (isPending || !session || loadingData) {
    return (
      <div className="min-h-screen bg-[#f5f3e6] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Loading Your Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3e6] py-10 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-6xl mx-auto bg-white border border-stone-200/60 p-6 rounded-2xl shadow-sm">
        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-stone-800 hidden sm:block">
              <GiBookshelf size={36} />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-wider text-stone-900">
                Manage <span className="text-[#2ec458]">Books</span>
              </h1>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                Your Personal Listed Items ({books.length} listed)
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/items/add")}
            className="px-4 py-2 bg-[#2ec458] hover:bg-[#27b04e] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors"
          >
            + Add New Book
          </button>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-stone-200 rounded-xl">
            <p className="text-stone-400 font-medium text-sm">
              You haven&apos;t added any books yet.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-xl border border-stone-200/60">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#fdfdfb] border-b border-stone-200/80 text-stone-400">
                  <th className="p-4 text-xs font-black uppercase tracking-wider">
                    Book Details
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-wider hidden md:table-cell">
                    Genre
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-wider">
                    Price
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100 text-sm">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="p-4 max-w-xs sm:max-w-md">
                      <div className="font-bold text-stone-900 line-clamp-1 uppercase tracking-wide">
                        {book.title}
                      </div>
                      <div className="text-xs text-stone-400 line-clamp-1 mt-0.5 font-medium">
                        {book.shortDescription}
                      </div>
                    </td>

                    <td className="p-4 hidden md:table-cell">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {book.genre}
                      </span>
                    </td>

                    <td className="p-4 font-black text-stone-900">
                      ${Number(book.price).toFixed(2)}
                    </td>

                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleView(book._id)}
                          className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/70 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(book._id)}
                          className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100/80 rounded-lg transition-colors"
                          title="Delete Book"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This item will be permanently removed from your catalog."
        isLoading={deletingId !== null}
      />
    </div>
  );
};

export default ManageItemsPage;
