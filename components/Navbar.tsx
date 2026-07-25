"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="hidden md:block bg-brand-brown text-white text-xs">
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">

          <div className="flex items-center gap-2 text-white/80">
            <FaEnvelope className="text-white" />
            <span>info@tiatamw.com</span>
          </div>

          <div className="flex items-center gap-2 text-white/80">
            <FaPhone className="text-white" />
            <span>+265 993 266 432</span>
          </div>

        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="backdrop-blur-md bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Tiata Investment"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-brown">

            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative pb-1 transition ${
                    isActive(link.href)
                      ? "text-brand-gold"
                      : "hover:text-brand-gold"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-brand-gold rounded-full" />
                  )}
                </Link>
              </li>
            ))}

          </ul>

          {/* CTA */}
          <Link
            href="/partner"
            className="hidden md:block bg-brand-green text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
          >
            Order in Bulk
            <span className="transition-transform group-hover:translate-x-1"> → </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl text-brand-brown"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white border-t">

            <ul className="flex flex-col p-4 gap-4 text-brand-brown">

              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/partner"
                  onClick={() => setOpen(false)}
                  className="bg-brand-gold text-white px-4 py-2 rounded-lg inline-block"
                >
                  Become a Partner
                </Link>
              </li>

            </ul>

          </div>
        )}

      </nav>
    </header>
  );
}
