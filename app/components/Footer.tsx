"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f5f3e6] border-t border-stone-200/80 text-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="text-xl font-black uppercase tracking-wider text-stone-900"
          >
            The Literary <span className="text-[#2ec458]">Nook</span>
          </Link>
          <p className="text-xs text-stone-600 font-medium leading-relaxed max-w-xs">
            Your premium gateway to infinite worlds. Buy, explore, or become a
            verified seller in our modern literary marketplace.
          </p>

          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: <FaFacebookF size={14} />, href: "#" },
              { icon: <FaTwitter size={14} />, href: "#" },
              { icon: <FaInstagram size={14} />, href: "#" },
              { icon: <FaLinkedinIn size={14} />, href: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="p-2 rounded-lg bg-white border border-stone-200/60 text-stone-600 hover:text-[#2ec458] hover:border-[#2ec458] transition-all shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm font-semibold text-stone-600">
            <li>
              <Link href="/" className="hover:text-[#2ec458] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/genres"
                className="hover:text-[#2ec458] transition-colors"
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                href="/sale"
                className="hover:text-[#2ec458] transition-colors"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">
            Support
          </h4>
          <ul className="space-y-2 text-sm font-semibold text-stone-600">
            <li>
              <a href="#" className="hover:text-[#2ec458] transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2ec458] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#2ec458] transition-colors">
                FAQ & Help
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">
            Contact Us
          </h4>
          <ul className="space-y-2 text-sm font-semibold text-stone-600">
            <li className="text-xs font-medium text-stone-500">
              Email: support@literarynook.com
            </li>
            <li className="text-xs font-medium text-stone-500">
              Phone: +880 1234-567890
            </li>
            <li className="text-xs font-medium text-stone-500">
              Location: Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200/50 bg-stone-100/50 py-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
          © {new Date().getFullYear()} The Literary Nook. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
