import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTA";
import { blogPosts } from "@/data/blog";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-sm font-medium text-brand-green">
              {post.category}
            </span>

            <h1 className="mt-6 text-5xl font-display font-semibold text-brand-brown">
              {post.title}
            </h1>

            <p className="mt-4 text-brand-brown/60">
              {post.date} • {post.readTime}
            </p>

            <div className="relative h-[420px] mt-10 rounded-[2rem] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none mt-12">
              {post.content.map((section) => (
                <div key={section.heading} className="mb-10">
                  <h2 className="font-display text-3xl text-brand-brown">
                    {section.heading}
                  </h2>

                  <p className="mt-4 leading-8 text-brand-brown/75">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-cream py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-display font-semibold text-brand-brown mb-10">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((article) => (
                <a
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block rounded-3xl bg-white overflow-hidden hover:-translate-y-2 transition"
                >
                  <div className="relative h-60">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="font-display text-2xl text-brand-brown">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-brand-brown/70">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}