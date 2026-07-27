import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaStar, FaLeaf, FaSeedling, FaTruck, FaAward, FaShieldAlt, FaHeart, } from "react-icons/fa";
import { products } from "@/data/products";
import { getAllPosts } from "@/lib/wordpress";

export const revalidate = 60;

/* ─── DATA ─────────────────────────────────────────────────── */

const whyReasons = [
  "Locally sourced from Malawian farms",
  "No added sugar or preservatives",
  "100% natural ingredients",
  "Supporting Malawian communities",
];

const stats = [
  { value: "200+",  label: "Partner Farmers"    },
  { value: "48hrs", label: "Harvest to Bottle"  },
  { value: "5",     label: "Products"           },
  { value: "100%",  label: "Natural"            },
];

const testimonials = [
  {
    quote: "Tiata Mango juice tastes like fresh fruit, not the watered-down stuff I used to buy. My kids won't drink anything else now.",
    name: "Grace Banda",
    location: "Blantyre",
  },
  {
    quote: "You can taste the difference. Real fruit, real flavour. You can tell it is made properly — not from concentrate.",
    name: "Joseph Phiri",
    location: "Lilongwe",
  },
  {
    quote: "The Bwemba is something special. I have never seen that flavour in any shop before Tiata. It tastes like home.",
    name: "Mary Chikwanda",
    location: "Mzuzu",
  },
];

const productNames = products.map((product) =>
  product.name.toUpperCase()
);

/* ─── PAGE ──────────────────────────────────────────────────── */

export default async function Home() {
  // Fetch latest 3 posts from WordPress — falls back to empty array if API is unreachable
  let latestPosts: any[] = [];
  try {
    const allPosts = await getAllPosts();
    latestPosts = allPosts.slice(0, 3);
  } catch (e) {
    latestPosts = [];
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-cream/40 rounded-[2.5rem] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

              <div>
                <span className="inline-flex items-center gap-2 bg-brand-gold text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  🌿 100% Real Malawian Products
                </span>

                <h1 className="mt-8 font-display font-semibold leading-[1.05] text-brand-brown">
                  <span className="block text-5xl md:text-7xl">
                    Naturally Delicious.
                  </span>
                  <span className="block text-5xl md:text-7xl text-brand-green">
                    Proudly Malawian.
                  </span>
                </h1>

                <p className="mt-6 text-brand-brown/70 text-lg leading-relaxed max-w-md">
                  Discover Tiata's range of premium juices and kitchen products,
                  carefully crafted from quality natural ingredients to bring
                  fresh taste and trusted quality to every home.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="bg-brand-green text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition text-center"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/partner"
                    className="flex items-center justify-center gap-2 text-brand-brown px-8 py-4 font-medium border border-brand-brown rounded-full hover:text-brand-gold hover:border-brand-gold transition text-center"
                  >
                    Invest or Partner
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              {/* product shot */}
              <div className="relative">
                <div className="relative w-full aspect-square">
                  <Image src="/hero-bottle.png" alt="Bottle of Tiata juice" fill className="object-contain drop-shadow-2xl" priority />
                </div>

                <div className="absolute top-4 left-0 sm:-left-6 bg-brand-brown rounded-full shadow-lg px-5 py-4 flex items-center gap-3 max-w-[180px]">
                  <p className="text-sm font-medium text-brand-cream leading-snug">✓ 100% Natural</p>
                </div>
                <div className="absolute top-10 right-0 sm:-right-4 bg-brand-green rounded-full shadow-lg px-5 py-4 flex items-center gap-3 max-w-[170px]">
                  <p className="text-sm font-medium text-brand-cream leading-snug">✓ Malawian</p>
                </div>
                <div className="absolute bottom-10 left-0 sm:-left-4 bg-brand-gold rounded-full shadow-lg px-5 py-4 max-w-[160px]">
                  <p className="text-sm text-white leading-snug">✓ Top Quality</p>
                </div>
                <div className="absolute bottom-6 right-0 sm:-right-6 bg-white rounded-full border-brand-brown shadow-lg px-5 py-4 max-w-[170px]">
                  <p className="text-sm text-brand-brown leading-snug">✓ 5+ Products</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE MARQUEE ─────────────────────────────────────── */}
      <section className="bg-white py-10 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...products, ...products].map((product, i) => (
            <div
              key={`${product.slug}-${i}`}
              className="relative h-40 w-40 md:h-48 md:w-48 mx-6 shrink-0"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── TEXT MARQUEE ──────────────────────────────────────── */}
      <section className="bg-white py-8 overflow-hidden border-y border-brand-brown/10">
        <div className="flex w-max animate-marquee-reverse">
          {[...productNames, ...productNames].map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-8 mx-8 shrink-0 font-sans text-base md:text-lg font-medium uppercase tracking-wide text-brand-brown">
              {name}
              <span className="text-brand-gold font-bold" aria-hidden>•</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── OUR PRODUCT RANGE ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold">
              Our Product Range
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-brand-brown leading-tight">
              Proudly Made
              <br />
              <span className="text-brand-gold">In Malawi</span>
            </h2>

            <p className="mt-6 text-brand-brown/70 text-base md:text-lg leading-relaxed">
              Explore our growing range of refreshing fruit juices and quality kitchen
              essentials made for every home.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-3xl border border-brand-brown/10 p-8 transition-all duration-300 hover:border-brand-gold hover:shadow-lg hover:-translate-y-2"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── FROM OUR JOURNAL — WordPress posts ────────────────── */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-sm font-medium text-brand-green">
                Latest Stories
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-display font-semibold text-brand-brown leading-tight">
                Recipes, Tips &
                <span className="text-brand-gold"> Product Stories</span>
              </h2>

              <p className="mt-5 text-brand-brown/70 text-lg leading-relaxed">
                Discover delicious recipes, healthy lifestyle ideas and the stories
                behind the products that make Tiata a proudly Malawian brand.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-brown font-medium hover:text-brand-gold transition"
            >
              View All Articles
              <span>→</span>
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group block overflow-hidden rounded-[2rem] border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
                        {post.category}
                      </span>
                      <span className="text-xs text-brand-brown/50">{post.date}</span>
                    </div>

                    <h3 className="mt-2 text-2xl font-display font-semibold text-brand-brown leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-4 text-brand-brown/70 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                  </div>
                </Link>
              ))
            ) : (
              // Fallback static cards if WordPress is unreachable
              <>
                <article className="group overflow-hidden rounded-[2rem] border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src="/blog-mango.png" alt="Fresh mango juice" fill className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">Recipes</span>
                    <h3 className="mt-5 text-2xl font-display font-semibold text-brand-brown leading-snug">5 Refreshing Ways to Enjoy Tiata Mango Juice</h3>
                    <p className="mt-4 text-brand-brown/70 leading-relaxed">From breakfast smoothies to tropical mocktails, discover easy ways to enjoy your favourite mango juice.</p>
                    <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-medium text-brand-gold hover:gap-3 transition-all">Read Article →</Link>
                  </div>
                </article>

                <article className="group overflow-hidden rounded-[2rem] border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src="/blog-onion.png" alt="Cooking with onion flakes" fill className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <span className="inline-flex rounded-full bg-brand-brown/10 px-3 py-1 text-xs font-medium text-brand-brown">Kitchen Tips</span>
                    <h3 className="mt-5 text-2xl font-display font-semibold text-brand-brown leading-snug">Why Onion Flakes Deserve a Place in Every Kitchen</h3>
                    <p className="mt-4 text-brand-brown/70 leading-relaxed">Save preparation time while adding rich onion flavour to soups, sauces and everyday meals.</p>
                    <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-medium text-brand-gold hover:gap-3 transition-all">Read Article →</Link>
                  </div>
                </article>

                <article className="group overflow-hidden rounded-[2rem] border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src="/blog-local.png" alt="Made in Malawi" fill className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold">Brand Story</span>
                    <h3 className="mt-5 text-2xl font-display font-semibold text-brand-brown leading-snug">Proudly Made in Malawi, Crafted for Every Home</h3>
                    <p className="mt-4 text-brand-brown/70 leading-relaxed">Learn how Tiata combines quality ingredients and local expertise to create products families can trust.</p>
                    <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-medium text-brand-gold hover:gap-3 transition-all">Read Article →</Link>
                  </div>
                </article>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="block text-6xl font-display text-brand-gold leading-none">"</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-display font-semibold text-brand-brown">
              Customers <span className="text-brand-gold">Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-brand-cream rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-brand-gold mb-5">
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                  </div>
                  <p className="text-brand-brown/80 leading-relaxed text-sm">"{t.quote}"</p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-brown text-sm">{t.name}</p>
                    <p className="text-xs text-brand-brown/50">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────────── */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-green px-8 py-16 md:px-16 md:py-20 text-center">

            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-3xl mx-auto">

              <span className="inline-flex items-center rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white">
                Ready to Experience Tiata?
              </span>

              <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-white">
                Taste the Goodness of
                <span className="text-brand-gold"> Naturally Made Products</span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-white/85">
                Discover our range of refreshing juices and quality kitchen products,
                proudly made in Malawi using carefully selected natural ingredients.
                Whether for your home, business, or retail store, Tiata delivers
                products you can trust.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-brand-gold px-8 py-4 text-base font-medium text-white transition hover:scale-105 hover:shadow-lg"
                >
                  Explore Our Products
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white transition hover:bg-white hover:text-brand-green"
                >
                  Become a Stockist
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
