
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getAllPosts, getPostBySlug } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Tiata Investment" };
  }

  return {
    title: `${post.title} | Tiata Investment`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts()
    .filter((article) => article.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-sm font-medium text-brand-green">
              {post.category}
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-brand-brown md:text-6xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-brand-brown/60">
              <span>{post.date}</span>

              {post.author && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>

            <div className="relative mt-10 h-[300px] overflow-hidden rounded-[2rem] md:h-[450px]">
              <Image
                src={post.image || "/blog-placeholder.jpg"}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Blog Content */}
            <article
              className="
                prose prose-lg mt-14 max-w-none
                prose-headings:font-display
                prose-headings:text-brand-brown
                prose-p:text-black
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
                [&_p]:!text-black
                [&_p_*]:!text-black
                [&_li]:!text-black
                [&_li_*]:!text-black
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
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="mb-8 font-display text-3xl font-semibold text-brand-brown">
                Related Articles
              </h2>

              <div className="flex flex-col divide-y divide-brand-brown/10">
                {relatedPosts.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group py-5"
                  >
                    <h3 className="font-display text-xl font-semibold text-brand-brown transition group-hover:text-brand-green">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-sm text-brand-brown/60">
                      {article.excerpt}
                    </p>
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
