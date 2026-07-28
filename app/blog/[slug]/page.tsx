import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getAllPosts, getPostBySlug } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  let relatedPosts: any[] = [];

  try {
    const allPosts = await getAllPosts();

    relatedPosts = allPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2);
  } catch {
    relatedPosts = [];
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6">

            <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-sm font-medium text-brand-green">
              {post.category}
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-display font-semibold text-brand-brown leading-tight">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-brand-brown/60 text-sm">
              <span>{post.date}</span>

              {post.author && (
                <>
                  <span>•</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>

            <div className="relative h-[450px] mt-10 rounded-[2rem] overflow-hidden">
              <Image
                src={post.image || "/blog-placeholder.jpg"}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Blog Content */}
            <article
              className="
                mt-14
                prose
                prose-lg
                max-w-none

                prose-headings:font-display
                prose-headings:text-brand-brown

                prose-p:text-brand-brown/75
                prose-p:leading-8

                prose-strong:text-brand-brown

                prose-a:text-brand-green
                prose-a:no-underline
                hover:prose-a:text-brand-gold

                prose-ul:text-brand-brown/75
                prose-ol:text-brand-brown/75

                prose-img:rounded-3xl
                prose-img:shadow-lg

                prose-blockquote:border-brand-green
                prose-blockquote:text-brand-brown/70
              "
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-brand-cream py-20">
            <div className="max-w-6xl mx-auto px-6">

              <h2 className="text-4xl font-display font-semibold text-brand-brown mb-12">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                {relatedPosts.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group rounded-3xl bg-white overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition"
                  >
                    <div className="relative h-64">
                      <Image
                        src={article.image || "/blog-placeholder.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-8">

                      <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
                        {article.category}
                      </span>

                      <h3 className="mt-5 text-2xl font-display font-semibold text-brand-brown group-hover:text-brand-green transition">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-brand-brown/70 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-brand-green font-medium">
                        Read Article →
                      </span>

                    </div>
                  </Link>
                ))}

              </div>

            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}