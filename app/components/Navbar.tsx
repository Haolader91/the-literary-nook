"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";

interface NavLink {
  name: string;
  href: string;
}

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Bestsellers", href: "/bestsellers" },
    { name: "Genres", href: "/genres" },
    { name: "New Release", href: "/new-release" },
    { name: "Fiction", href: "/fiction" },
    { name: "Non-Fiction", href: "/nonfiction" },
    { name: "Sale", href: "/sale" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f5f3e6] border-b border-slate-100 bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto p-2 h-auto flex flex-col">
        {/* search  */}
        <div className="flex items-center justify-between w-full">
          <div className="hidden md:block w-48"></div>
          <div className="flex-1 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for books, authors, genres..."
              className="w-full bg-[#eadeca] border border-stone-300/60 rounded-lg px-4 py-2 text-sm text-stone-800 placeholder-stone-500 focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="flex items-center gap-4 text-stone-700 w-48 justify-end">
            <button className="hover:text-stone-900 transition-colors">
              <FaRegUser size={20} />
            </button>
            <button className="hover:text-stone-900 transition-colors relative p-1">
              <IoCartOutline size={24} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          {/* logo  */}
          <Link href="/">
            <div className=" flex items-center justify-center">
              <GiBookshelf className=" font-bold" size={30} />
            </div>
            <span className="uppercase font-bold tracking-wider text-black">
              The literary Nook
            </span>
          </Link>

          {/* menu  */}
          <div className="hidden md:flex items-center gap-6 capitalize tracking-wider ">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold p-2 transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-black border-b-2 border-amber-400"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          {/* mobail hambar  */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
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
        <div className="md:hidden flex flex-col items-center gap-6 capitalize tracking-wider absolute left-0 w-full shadow-md ">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={`text-sm font-semibold p-2 transition-colors duration-300 ease-in-out ${
                  isActive
                    ? "text-amber-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
