import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import { products } from "@/data/products";
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ───────────────── PRODUCTS ───────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto">

              <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-sm font-medium text-brand-green">
                Our Products
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-display font-semibold text-brand-brown">
                Discover Our Product Range
              </h2>

              <p className="mt-5 text-lg text-brand-brown/70 leading-relaxed">
                From refreshing fruit juices to quality kitchen essentials,
                every Tiata product is proudly made in Malawi using carefully
                selected natural ingredients.
              </p>

            </div>

            {/* JUICES */}
            <div className="mt-20">

              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-brand-brown/10" />
                <h3 className="font-body text-sm uppercase tracking-[0.25em] text-brand-green font-semibold">
                  Juices
                </h3>
                <div className="h-px flex-1 bg-brand-brown/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {products
                  .filter((product) => product.category === "Juices")
                  .map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group block rounded-[2rem] border border-brand-brown/10 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl"
                    >

                      <div className="relative h-64 mb-8">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h4 className="text-2xl font-display font-semibold text-brand-brown">
                        {product.name}
                      </h4>

                      <p className="mt-4 text-brand-brown/70 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        <span className="rounded-full bg-brand-green/10 px-3 py-2 text-xs font-medium text-brand-green">
                          100% Natural
                        </span>

                        <span className="rounded-full bg-brand-gold/15 px-3 py-2 text-xs font-medium text-brand-brown">
                          Premium Quality
                        </span>

                      </div>

                    </Link>
                  ))}

              </div>

            </div>

            {/* KITCHEN ESSENTIALS */}
            <div className="mt-24">

              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-brand-brown/10" />
                <h3 className="font-body text-sm uppercase tracking-[0.25em] text-brand-green font-semibold">
                  Kitchen Essentials
                </h3>
                <div className="h-px flex-1 bg-brand-brown/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">

                {products
                  .filter((product) => product.category === "Kitchen Essentials")
                  .map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group block rounded-[2rem] border border-brand-brown/10 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl"
                    >

                      <div className="relative h-64 mb-8">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h4 className="text-2xl font-display font-semibold text-brand-brown">
                        {product.name}
                      </h4>

                      <p className="mt-4 text-brand-brown/70 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        <span className="rounded-full bg-brand-green/10 px-3 py-2 text-xs font-medium text-brand-green">
                          Everyday Cooking
                        </span>

                        <span className="rounded-full bg-brand-gold/15 px-3 py-2 text-xs font-medium text-brand-brown">
                          Quality Ingredients
                        </span>

                      </div>

                    </Link>
                  ))}

              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}