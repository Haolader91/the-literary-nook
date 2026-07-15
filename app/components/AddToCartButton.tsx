"use client";

import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { addToCartDB } from "../lib/actions/books";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  book: {
    _id: string;
    title: string;
    genre: string;
    price: string | number;
    imageUrl?: string;
  };
  buttonText?: string;
}

export default function AddToCartButton({
  book,
  buttonText = "Add to Cart",
}: AddToCartButtonProps) {
  const handleAddToCart = async () => {
    try {
      await addToCartDB({
        bookId: book._id,
        title: book.title,
        genre: book.genre,
        price: book.price,
        imageUrl: book.imageUrl,
        quantity: 1,
      });
      toast.success("added to cart page");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-[#2ec458] text-white rounded-xl hover:bg-[#27b04e] active:scale-95 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300"
    >
      <IoCartOutline size={16} /> {buttonText}
    </button>
  );
}
