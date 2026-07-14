"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  IoCheckmarkCircleOutline,
  IoBagHandleOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

import { getCartFromDB, removeFromCartDB } from "../lib/actions/books";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    const id = searchParams.get("session_id");
    if (id) {
      setSessionId(id);

      const clearAllCartItems = async () => {
        try {
          const cartItems = await getCartFromDB();

          if (cartItems && cartItems.length > 0) {
            const deletePromises = cartItems.map((item: any) =>
              removeFromCartDB(item.bookId),
            );

            await Promise.all(deletePromises);
          }

          setCartCleared(true);
          console.log("Database Cart cleared successfully!");
        } catch (error) {
          console.error("Failed to clear cart:", error);
        }
      };

      clearAllCartItems();
    }
  }, [searchParams]);

  return (
    <div className="max-w-md w-full bg-white border border-stone-200/60 rounded-3xl p-8 md:p-10 text-center shadow-lg shadow-stone-200/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2ec458]"></div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-50 animate-ping opacity-75"></div>
          <div className="relative bg-emerald-50 border border-emerald-100 p-4 rounded-full text-[#2ec458]">
            <IoCheckmarkCircleOutline size={48} className="animate-pulse" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-stone-900 mb-2">
        Payment Successful!
      </h1>
      <p className="text-xs font-black uppercase tracking-widest text-[#2ec458] mb-6">
        Thank you for your order
      </p>

      <div className="bg-[#f5f3e6]/40 border border-stone-200/60 rounded-2xl p-4 mb-8 text-left space-y-2.5">
        <div className="flex justify-between text-xs">
          <span className="font-bold text-stone-400 uppercase tracking-wider">
            Status
          </span>
          <span className="font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            Paid
          </span>
        </div>

        <div className="flex justify-between text-xs border-t border-stone-200/40 pt-2">
          <span className="font-bold text-stone-400 uppercase tracking-wider">
            Cart Status
          </span>
          <span
            className={`font-black text-[10px] uppercase tracking-wider ${cartCleared ? "text-stone-500" : "text-amber-600"}`}
          >
            {cartCleared ? "Cleared & Saved" : "Clearing Cart..."}
          </span>
        </div>

        {sessionId && (
          <div className="flex flex-col gap-1 border-t border-stone-200/40 pt-2.5">
            <span className="font-bold text-stone-400 text-[10px] uppercase tracking-wider">
              Session ID
            </span>
            <span
              className="font-mono text-[10px] text-stone-600 break-all select-all hover:text-stone-900 transition-colors cursor-pointer"
              title="Click to copy"
            >
              {sessionId}
            </span>
          </div>
        )}
      </div>

      <p className="text-sm text-stone-500 leading-relaxed mb-8">
        Your payment has been processed successfully. Your cart is now reset,
        and we are preparing your literary gems to head your way!
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/sale"
          className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest py-4 bg-stone-950 text-white hover:bg-stone-800 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          <IoBagHandleOutline size={16} /> Continue Shopping
        </Link>

        <Link
          href="/"
          className="group w-full flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-widest py-3 text-stone-500 hover:text-stone-900 transition-colors"
        >
          Go to Homepage
          <IoArrowForwardOutline
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <div className="min-h-[85vh] bg-[#f5f3e6] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-stone-800">
      <Suspense
        fallback={
          <div className="text-center font-bold text-stone-600">
            Loading Success Details...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
};

export default SuccessPage;
