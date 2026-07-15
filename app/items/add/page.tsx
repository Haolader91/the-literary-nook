"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { GiBookshelf } from "react-icons/gi";
import { addedBook } from "@/app/lib/actions/books";
import { toast } from "react-toastify";
import { imageUpload } from "@/app/lib/imgUpload";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const imageFile = form.image.files?.[0];

    if (!imageFile) {
      toast.error("Please select a book cover image!");
      setLoading(false);
      return;
    }

    const toastId = toast.loading("Uploading image to ImgBB...");

    try {
      const uploadedImageUrl = await imageUpload(imageFile);
      toast.dismiss(toastId);

      const finalBookData = {
        ...formData,
        imageUrl: uploadedImageUrl,
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
        form.reset();
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
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
              Book Cover Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full bg-[#fdfdfb] border border-stone-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-stone-400 transition-all file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:uppercase file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 file:cursor-pointer cursor-pointer"
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
