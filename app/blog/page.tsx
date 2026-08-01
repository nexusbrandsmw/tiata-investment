import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const allPosts = await getAllPosts();

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const blogPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
            {blogPosts.length === 0 ? (
              <p className="mt-16 text-center text-brand-brown/50">
                No posts published yet. Check back soon.
              </p>
            ) : (
              <>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Blog pagination"
                    className="mt-16 flex items-center justify-center gap-2"
                  >
                    {/* Previous */}
                    {safePage > 1 ? (
                      <Link
                        href={safePage - 1 === 1 ? "/blog" : `/blog?page=${safePage - 1}`}
                        className="inline-flex items-center justify-center rounded-full border border-brand-brown/15 w-11 h-11 text-brand-brown transition hover:border-brand-green hover:text-brand-green"
                        aria-label="Previous page"
                      >
                        ←
                      </Link>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center rounded-full border border-brand-brown/10 w-11 h-11 text-brand-brown/30 cursor-not-allowed"
                        aria-hidden
                      >
                        ←
                      </span>
                    )}

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <Link
                        key={num}
                        href={num === 1 ? "/blog" : `/blog?page=${num}`}
                        aria-current={num === safePage ? "page" : undefined}
                        className={`inline-flex items-center justify-center rounded-full w-11 h-11 text-sm font-medium transition ${
                          num === safePage
                            ? "bg-brand-green text-white"
                            : "border border-brand-brown/15 text-brand-brown hover:border-brand-green hover:text-brand-green"
                        }`}
                      >
                        {num}
                      </Link>
                    ))}

                    {/* Next */}
                    {safePage < totalPages ? (
                      <Link
                        href={`/blog?page=${safePage + 1}`}
                        className="inline-flex items-center justify-center rounded-full border border-brand-brown/15 w-11 h-11 text-brand-brown transition hover:border-brand-green hover:text-brand-green"
                        aria-label="Next page"
                      >
                        →
                      </Link>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center rounded-full border border-brand-brown/10 w-11 h-11 text-brand-brown/30 cursor-not-allowed"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </nav>
                )}
              </>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
