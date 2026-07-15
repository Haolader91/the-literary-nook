import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/lib/auth";
// import { auth } from "./lib/auth"; // আপনার প্রজেক্টের auth.ts এর পাথ

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚀 আগের মতো সহজভাবে Better Auth সেশন চেক
  const session = await auth.api.getSession({
    headers: request.headers,
    baseURL: request.nextUrl.origin, // এজ এনভায়রনমেন্টে সেফটি নিশ্চিত করতে
  });

  // 🔒 ১. ইউজার লগইন না থাকলে (সেশন না থাকলে) কার্ট পেজে আটকে দেওয়া হবে
  if (!session) {
    if (pathname.startsWith("/cart")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 🛡️ ২. ইউজার লগইন থাকলে (সেশন থাকলে) অ্যাড বা ম্যানেজ পেজে যেতে দেওয়া হবে না
  if (session) {
    if (
      pathname.startsWith("/items/add") ||
      pathname.startsWith("/items/manage")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/items/add", "/items/manage"],
};
