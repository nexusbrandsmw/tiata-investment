import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ───────────────── BLOG ───────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex rounded-full bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold">
                Latest News
              </span>

              <h1 className="mt-6 text-4xl md:text-5xl font-display font-semibold text-brand-brown">
                Stories & Updates
              </h1>

              <p className="mt-5 text-lg text-brand-brown/70 leading-relaxed">
                Discover recipes, healthy living tips, company news, and
                everything happening at Tiata Investment.
              </p>
            </div>

            {/* Blog Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-[2rem] border border-brand-brown/10 bg-brand-cream transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
                        {post.category}
                      </span>

                      <span className="text-sm text-brand-brown/50">
                        {post.date}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-semibold leading-snug text-brand-brown transition-colors group-hover:text-brand-green">
                      {post.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 leading-relaxed text-brand-brown/70">
                      {post.excerpt}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 font-medium text-brand-green transition group-hover:text-brand-gold">
                      Read Article
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}