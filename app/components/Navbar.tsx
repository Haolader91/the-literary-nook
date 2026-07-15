"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { signOut, useSession } from "../lib/auth-client";
import { getCartFromDB } from "../lib/actions/books";

interface NavLink {
  name: string;
  href: string;
}
interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: "user" | "admin";
}

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [cartCount, setCartCount] = useState(0);

  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;
  const user = session?.user as ExtendedUser | undefined;

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isLoggedIn) {
        setCartCount(0);
        return;
      }

      try {
        const cartItems = await getCartFromDB();

        if (Array.isArray(cartItems)) {
          setCartCount(cartItems.length);
        }
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 2000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const publicLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Genres", href: "/genres" },
    { name: "Sale", href: "/sale" },
  ];

  const privateLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Genres", href: "/genres" },
    ...(user?.role === "admin"
      ? [
          { name: "Add Book", href: "/items/add" },
          { name: "Manage Books", href: "/items/manage" },
        ]
      : []),
    { name: "Sale", href: "/sale" },
  ];

  const navLinks = isLoggedIn ? privateLinks : publicLinks;

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f5f3e6] border-b border-stone-200 bg-opacity-95 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto p-3 h-auto flex flex-col gap-3">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="hidden md:block w-32"></div>

          <div className="flex-1 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for books, authors, genres..."
              className="w-full bg-[#eadeca]/70 border border-stone-300/60 rounded-lg px-4 py-2 text-sm text-stone-800 placeholder-stone-500 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-4 text-stone-700 w-auto md:w-64 justify-end">
            {!isPending && (
              <>
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="hover:text-stone-900 font-semibold text-sm transition-colors"
                      title="Login"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signUp"
                      className="hidden md:flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-[#2EC458] hover:border-[#2EC458] hover:text-white font-semibold text-xs uppercase tracking-wider transition-all"
                    >
                      <FaRegUser size={14} />
                      Become A Seller
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-stone-700 max-w-25 truncate">
                      Hi, {user?.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <FaSignOutAlt size={18} />
                    </button>
                  </div>
                )}
              </>
            )}

            <Link
              href="/cart"
              className="hover:text-stone-900 transition-colors relative p-1 block"
            >
              <IoCartOutline size={24} />

              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-stone-200/40 pt-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center text-stone-800">
              <GiBookshelf size={30} />
            </div>
            <span className="uppercase font-black tracking-wider text-stone-900 text-xl md:text-base">
              The Literary <span className="text-[#2ec458]">Nook</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 capitalize tracking-wider">
            {!isPending &&
              navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold p-2 transition-colors duration-300 ease-in-out ${
                      isActive
                        ? "text-black border-b-2 border-amber-400 font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-stone-800 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* mobail menu  */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 capitalize tracking-wider absolute left-0 w-full bg-[#f5f3e6] py-6 shadow-md border-t border-stone-200/60 z-50">
          {!isPending &&
            navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`text-sm font-semibold p-2 w-11/12 text-center rounded-md transition-colors ${
                    isActive
                      ? "text-amber-700 bg-amber-500/10 font-bold"
                      : "text-slate-600 hover:bg-stone-200/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

          {!isLoggedIn && !isPending && (
            <Link
              href="/signUp"
              onClick={toggleMenu}
              className="mt-2 w-11/12 text-center py-2 bg-[#2EC458] text-white font-bold rounded-lg text-sm uppercase tracking-wide shadow-sm"
            >
              Become A Seller
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
