"use client";

import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/lib/auth-client";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = (role: "user" | "admin") => {
    setError("");
    if (role === "admin") {
      setEmailOrPhone("admin@theliterarynook.com");
      setPassword("admin1234");
    } else {
      setEmailOrPhone("user@theliterarynook.com");
      setPassword("user1234");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await signIn.email({
        email: emailOrPhone,
        password: password,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Invalid credentials. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#f5f3e6] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-stone-200/60">
        <h2 className="text-xl font-bold text-center text-stone-800 uppercase tracking-wide mb-8">
          Login / <Link href="/signUp">Sign Up</Link>
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#3b5998] text-white py-2.5 px-4 rounded-md font-semibold text-sm hover:bg-[#344e86] transition-colors shadow-sm"
          >
            <FaFacebookF size={16} />
            Facebook
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#ea4335] text-white py-2.5 px-4 rounded-md font-semibold text-sm hover:bg-[#d63b2f] transition-colors shadow-sm"
          >
            <FaGoogle size={16} />
            Google
          </button>
        </div>

        <div className="flex items-center justify-center my-6">
          <span className="text-sm font-bold text-stone-900 tracking-wider">
            OR
          </span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative border-b border-stone-300 py-1.5 focus-within:border-emerald-500 transition-colors">
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Phone or Email"
              className="w-full bg-transparent px-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              required
              disabled={loading}
            />
          </div>
          <div className="relative border-b border-stone-300 py-1.5 focus-within:border-emerald-500 transition-colors">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent px-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2ec458] text-white py-3 rounded-md font-semibold text-base hover:bg-[#27b04e] active:scale-[0.99] transition-all shadow-md mt-4 disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? "Logging in..." : "Next"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Quick Demo Login
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="text-xs bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-md hover:bg-amber-200/80 transition-colors"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="text-xs bg-stone-800 text-white font-bold px-4 py-2 rounded-md hover:bg-stone-900 transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
