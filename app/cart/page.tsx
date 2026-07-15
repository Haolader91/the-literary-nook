"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoTrashOutline,
  IoArrowBackOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  addToCartDB,
  createCheckoutSession,
  getCartFromDB,
  removeFromCartDB,
} from "../lib/actions/books";

import DeleteConfirmModal from "../components/DeleteConfirmModal";

interface CartItem {
  _id: string;
  bookId: string;
  title: string;
  genre: string;
  price: string | number;
  imageUrl?: string;
  quantity: number;
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const loadCartData = () => {
    getCartFromDB()
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Cart loading error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCartData();
  }, []);

  const increaseQty = async (item: CartItem) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === item.bookId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

    try {
      await addToCartDB({
        bookId: item.bookId,
        title: item.title,
        genre: item.genre,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
      loadCartData();
    }
  };

  const decreaseQty = async (item: CartItem) => {
    if (item.quantity <= 1) return;

    setCartItems((prev) =>
      prev.map((i) =>
        i.bookId === item.bookId ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );

    try {
      await addToCartDB({
        bookId: item.bookId,
        title: item.title,
        genre: item.genre,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: -1,
      });
    } catch (err) {
      console.error(err);
      loadCartData();
    }
  };

  const openDeleteModal = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBookId) return;

    try {
      setModalLoading(true);
      await removeFromCartDB(selectedBookId);

      setCartItems((prev) =>
        prev.filter((item) => item.bookId !== selectedBookId),
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while removing the item.");
    } finally {
      setModalLoading(false);
      setSelectedBookId(null);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      setCheckoutLoading(true);
      const res = await createCheckoutSession(cartItems, shipping);

      if (res && res.url) {
        router.push(res.url);
      } else {
        alert("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 15.0 : 0;
  const total = subtotal + shipping;

  if (loading)
    return (
      <div className="text-center py-20 font-bold text-stone-600">
        Loading Cart...
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-stone-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider text-stone-900">
            Shopping Cart (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h1>
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            <IoArrowBackOutline
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-[#f5f3e6]/30 rounded-3xl border border-stone-100 p-8">
            <h2 className="text-lg font-black uppercase tracking-wider text-stone-700">
              Your cart is empty
            </h2>
            <Link
              href="/sale"
              className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-6 py-3 bg-stone-950 text-white rounded-xl hover:bg-stone-800 transition-colors shadow-md"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 bg-white border border-stone-200/60 rounded-2xl items-center relative hover:shadow-sm transition-shadow"
                >
                  <div className="w-20 h-28 bg-[#f5f3e6] rounded-xl overflow-hidden flex-shrink-0 relative border border-stone-100">
                    <Image
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400"
                      }
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      {item.genre}
                    </span>
                    <h3 className="text-sm font-black text-stone-900 truncate uppercase tracking-wide mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-black text-stone-900 mt-2">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                      <button
                        onClick={() => decreaseQty(item)}
                        disabled={item.quantity <= 1}
                        className={`p-2 hover:bg-stone-100 text-stone-600 transition-colors ${item.quantity <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => openDeleteModal(item.bookId)}
                      className="p-2 text-stone-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <IoTrashOutline size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f5f3e6]/40 border border-stone-200/60 rounded-3xl p-6 space-y-6 sticky top-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-stone-400">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
                <hr className="border-stone-200" />
                <div className="flex justify-between text-stone-900 pt-1">
                  <span className="font-black uppercase tracking-wide">
                    Total
                  </span>
                  <span className="text-xl font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className={`w-full flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider py-4 bg-[#2ec458] text-white hover:bg-[#27b04e] active:scale-98 transition-all rounded-xl shadow-lg shadow-emerald-600/10 ${checkoutLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <IoBagCheckOutline size={18} />
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove From Cart"
        message="Are you sure you want to remove this book from your shopping cart?"
        isLoading={modalLoading}
      />
    </div>
  );
};

export default CartPage;
