"use client";

import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      console.log("Subscribed email:", email);

      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200/40">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
        {/* 📝 টেক্সট সেকশন */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-stone-800 uppercase tracking-wider">
            Join The Literary Club
          </h2>
          <p className="text-sm text-stone-500 font-medium max-w-md mx-auto">
            Subscribe to our weekly newsletter and receive exclusive discounts,
            new book arrivals, and authors insights directly.
          </p>
        </div>

        {/* 🎯 ফর্ম এবং সাবমিট লজিক */}
        <div className="max-w-md mx-auto pt-2">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#f5f3e6]/60 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#2ec458] hover:bg-[#27b04e] text-white font-bold text-sm rounded-xl transition-all shadow-md whitespace-nowrap active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-bold animate-fade-in">
              Thank you! You have successfully subscribed to our newsletter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
