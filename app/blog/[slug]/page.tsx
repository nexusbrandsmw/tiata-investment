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

  const post = await getPostBySlug(slug).catch(() => notFound());

  if (!post) notFound();

  type Post = Awaited<ReturnType<typeof getAllPosts>>[number];

  let relatedPosts: Post[] = [];

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

                prose-p:text-brand-brown
                prose-p:leading-8

                prose-strong:text-brand-brown

                prose-a:text-brand-green
                prose-a:no-underline
                hover:prose-a:text-brand-gold

                prose-li:text-brand-brown
                prose-ul:text-brand-brown
                prose-ol:text-brand-brown

                prose-img:rounded-3xl
                prose-img:shadow-lg

                prose-blockquote:border-brand-green
                prose-blockquote:text-brand-brown/70

                [&_*]:!bg-transparent
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
            <div className="max-w-4xl mx-auto px-6">

              <h2 className="text-3xl font-display font-semibold text-brand-brown mb-8">
                Related Articles
              </h2>

              <div className="flex flex-col divide-y divide-brand-brown/10">

                {relatedPosts.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group py-6 flex items-center justify-between gap-6 transition"
                  >
                    <div>
                      <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
                        {article.category}
                      </span>

                      <h3 className="mt-3 text-xl font-display font-semibold text-brand-brown group-hover:text-brand-green transition">
                        {article.title}
                      </h3>

                      <p className="mt-2 text-sm text-brand-brown/60">
                        {article.date}
                      </p>
                    </div>

                    <span className="shrink-0 text-brand-green font-medium opacity-0 group-hover:opacity-100 transition">
                      Read →
                    </span>
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
