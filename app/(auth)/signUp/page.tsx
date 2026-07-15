"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiShoppingBag } from "react-icons/fi";
import { signUp } from "@/app/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await signUp.email({
        email: email,
        password: password,
        name: name,
        role: role,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message || "Failed to register. Email might already exist.",
        );
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
        <h2 className="text-xl font-bold text-center text-stone-800 uppercase tracking-wide mb-6">
          Create Account
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1 ${
              role === "user"
                ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 font-bold"
                : "border-stone-200 text-stone-500 hover:border-stone-300 bg-stone-50/30"
            }`}
          >
            <FiUser size={20} />
            <span className="text-xs tracking-wide">General User</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1 ${
              role === "admin"
                ? "border-amber-500 bg-amber-50/40 text-amber-800 font-bold"
                : "border-stone-200 text-stone-500 hover:border-stone-300 bg-stone-50/30"
            }`}
          >
            <FiShoppingBag size={20} />
            <span className="text-xs tracking-wide">Become a Seller</span>
          </button>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-transparent px-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div className="relative border-b border-stone-300 py-1.5 focus-within:border-emerald-500 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
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
              placeholder="Password (Min. 6 chars)"
              className="w-full bg-transparent px-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div className="relative border-b border-stone-300 py-1.5 focus-within:border-emerald-500 transition-colors">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full bg-transparent px-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-md font-semibold text-base active:scale-[0.99] transition-all shadow-md mt-4 disabled:cursor-not-allowed flex items-center justify-center ${
              role === "admin"
                ? "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400"
                : "bg-[#2ec458] hover:bg-[#27b04e] disabled:bg-emerald-400"
            }`}
          >
            {loading
              ? "Creating Account..."
              : role === "admin"
                ? "Join as Seller"
                : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Already have an account?
            <Link
              href="/login"
              className="text-emerald-600 font-bold hover:underline transition-all"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
