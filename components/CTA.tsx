import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="pt-24 pb-4 bg-brand-green text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* SMALL LABEL */}
        <span className="uppercase tracking-[0.2em] text-sm text-white/60">
          Grow With Tiata
        </span>

        {/* HEADING */}
        <h2 className="mt-6 text-3xl md:text-5xl font-display font-semibold leading-tight">
          Ready to invest in Malawi&apos;s next juice brand?
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-white/70 leading-relaxed">
          Whether you grow fruit, run a shop, or are looking for a stake in
          local agro-processing, there is a place for you in the Tiata supply
          chain.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          {/* PRIMARY CTA */}
          <Link
            href="/partner"
            className="group bg-brand-gold text-white px-7 py-3 rounded-full font-medium hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          >
            Become a Partner
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>

          {/* SECONDARY CTA */}
          <a
            href="https://wa.me/265991234567"
            target="_blank"
            className="group border border-white/20 px-7 py-3 rounded-full font-medium hover:border-brand-gold transition inline-flex items-center justify-center gap-2"
          >
            WhatsApp Us
            <FaWhatsapp className="text-green-400" />
          </a>

        </div>

      </div>

    </section>

  );
}
