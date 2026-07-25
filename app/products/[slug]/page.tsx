import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTA";

import {
  FaLeaf,
  FaAward,
  FaCheckCircle,
  FaBox,
} from "react-icons/fa";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (p) =>
      p.category === product.category &&
      p.slug !== product.slug
  );

  return (
    <>
      <Navbar />

      {/* HERO */}

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative h-[500px]">

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />

            </div>

            <div>

              <span className="text-brand-green uppercase tracking-[0.25em] text-sm font-body">

                {product.category}

              </span>

              <h1 className="mt-5 text-5xl lg:text-6xl font-display font-semibold text-brand-brown">

                {product.name}

              </h1>

              <p className="mt-6 text-lg leading-8 text-brand-brown/70">

                {product.description}

              </p>

              <div className="mt-10 flex flex-wrap gap-3">

                <span className="rounded-full bg-brand-green text-white px-5 py-3 text-sm">
                  ✓ 100% Natural
                </span>

                <span className="rounded-full bg-brand-gold text-white px-5 py-3 text-sm">
                  ✓ Made in Malawi
                </span>

                <span className="rounded-full bg-brand-brown text-white px-5 py-3 text-sm">
                  ✓ Premium Quality
                </span>

              </div>

              <Link
                href="/contact"
                className="inline-block mt-10 bg-brand-green text-white px-8 py-4 rounded-full hover:opacity-90 transition"
              >
                Order Now
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* DETAILS */}

      <section className="bg-brand-cream py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14">

          {/* Product Highlights */}
          <div>
            <h2 className="text-3xl font-display font-semibold text-brand-brown">
              Why You'll Love It
            </h2>

            <div className="mt-8 space-y-5">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <FaCheckCircle className="text-brand-green" />
                  </div>

                  <span className="text-lg text-brand-brown">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Sizes */}
          <div>
            <h2 className="text-3xl font-display font-semibold text-brand-brown">
              Available Sizes
            </h2>

            <p className="mt-4 text-brand-brown/70 leading-relaxed">
              Available in convenient pack sizes to suit every occasion, whether
              you're enjoying it on the go, sharing with family, or stocking up at
              home.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {product.sizes.map((size) => (
                <div
                  key={size}
                  className="bg-brand-cream rounded-2xl px-8 py-5 flex items-center gap-3 border border-brand-brown/10"
                >
                  <FaBox className="text-brand-green text-lg" />
                  <span className="font-medium text-brand-brown">
                    {size}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* RELATED PRODUCTS */}

      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="uppercase tracking-[0.25em] text-sm text-brand-green">
                More Products
              </span>

              <h2 className="mt-3 text-4xl font-display font-semibold text-brand-brown">
                You May Also Like
              </h2>
            </div>

            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-brand-green font-medium hover:text-brand-brown transition"
            >
              View All Products
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group text-center"
              >
                <div className="relative h-64 md:h-72">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 text-xl md:text-2xl font-display font-semibold text-brand-brown transition group-hover:text-brand-green">
                  {item.name}
                </h3>
              </Link>
            ))}

          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              View All Products
              <span aria-hidden>→</span>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}