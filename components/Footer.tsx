"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <footer className="bg-brand-brown text-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 py-12 transition-all duration-700 ease-out ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="grid gap-10 md:grid-cols-3">

          {/* ABOUT */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-brand-gold">
              Tiata Investment
            </h3>
            <p className="leading-relaxed text-white/80">
              Pressing fresh juice from locally sourced Malawian fruit,
              keeping value with the farmers and communities who grow it.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-brand-gold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-brand-gold text-white/80">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold text-white/80">About</Link></li>
              <li><Link href="/products" className="hover:text-brand-gold text-white/80">Products</Link></li>
              <li><Link href="/blog" className="hover:text-brand-gold text-white/80">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold text-white/80">Contact</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-brand-gold">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <Phone className="text-brand-gold mt-1" size={20} />
                <a href="tel:+265991234567" className="text-white/80 hover:text-brand-gold">
                  +265 993 266 432
                </a>
              </div>

              <div className="flex gap-3">
                <Mail className="text-brand-gold mt-1" size={20} />
                <a href="mailto:hello@tiatainvestment.mw" className="text-white/80 hover:text-brand-gold">
                  info@tiatamw.com
                </a>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-brand-gold mt-1" size={20} />
                <span className="text-white/80">
                  Area 25 Lilongwe, Malawi
                </span>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="pt-6 flex gap-4">
              <a href="https://web.facebook.com/profile.php?id=61565642885490" target="_blank" rel="noreferrer">
                <FaFacebookF className="hover:text-brand-gold cursor-pointer" />
              </a>

              <a href="https://www.instagram.com/tiata_investment/" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-brand-gold cursor-pointer" />
              </a>

              <a href="https://www.linkedin.com/company/107577742/" target="_blank" rel="noreferrer">
                <FaLinkedinIn className="hover:text-brand-gold cursor-pointer" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div>
            © {new Date().getFullYear()} Tiata Investment. All rights reserved.
          </div>

          <div>
            Developed by{" "}
            <a
              href="https://nexusbrandmw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors underline"
            >
              Nexus Brands
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}