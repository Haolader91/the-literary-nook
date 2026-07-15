"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { GiBookshelf } from "react-icons/gi";
import { addedBook } from "@/app/lib/actions/books";
import { toast } from "react-toastify";

const AddBookPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    genre: "Fiction",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalBookData = {
        ...formData,
        userEmail: session?.user?.email,
      };

      const result = await addedBook(finalBookData);

      if (result.insertedId) {
        toast.success("Book added successfully to The Literary Nook!");

        setFormData({
          title: "",
          author: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          genre: "Fiction",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#f5f3e6] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Checking Authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3e6] py-12 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-2xl mx-auto bg-white border border-stone-200/60 p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center text-stone-800 mb-2">
            <GiBookshelf size={40} />
          </div>
          <h1 className="text-xl font-black uppercase tracking-wider text-stone-900">
            Add New <span className="text-[#2ec458]">Book</span>
          </h1>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
            List a new literary masterpiece on the store
          </p>
        </div>

        {/* 💡 এখান থেকে পুরনো কাস্টম অ্যালার্ট মেসেজের ডোম (DOM) ব্লকটি পুরোপুরি ডিলিট করে দিয়েছি, কারণ এখন টোস্ট দেখাবে */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Book Title */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., The Midnight Library"
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all"
            />
          </div>

          {/* Author Name */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g., Matt Haig"
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="A brief one-line hook about the book..."
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              required
              rows={4}
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Write a detailed plot summary, author background, or book specifications..."
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none"
            />
          </div>

          {/* Price & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="14.99"
                className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all cursor-pointer"
              >
                <option value="Fiction">Fiction</option>
                <option value="Thriller & Mystery">Thriller & Mystery</option>
                <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500">
              Image URL
              <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-stone-400 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2ec458] text-white font-bold text-sm rounded-xl uppercase tracking-wider hover:bg-[#27b04e] disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors shadow-sm active:scale-[0.99]"
            >
              {loading ? "Adding Book..." : "Submit (Add Book)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
