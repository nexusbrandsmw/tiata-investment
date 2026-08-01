import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {FaLeaf, FaAward, FaFlag, FaHeart,} from "react-icons/fa";
import Image from "next/image";

const values = [
  {
    title: "Quality",
    desc: "Every product is carefully prepared to meet high standards."
  },
  {
    title: "Integrity",
    desc: "We operate with honesty, transparency and accountability."
  },
  {
    title: "Innovation",
    desc: "We continuously improve our products and processes."
  },
  {
    title: "Customer Focus",
    desc: "Everything we do starts with our customers."
  }
];

const features = [
  {
    icon: FaLeaf,
    title: "100% Natural",
    description:
      "Our products are made using carefully selected natural ingredients for authentic taste and quality.",
  },
  {
    icon: FaAward,
    title: "Premium Quality",
    description:
      "Every product is produced under strict quality standards to ensure consistency and customer satisfaction.",
  },
  {
    icon: FaFlag,
    title: "Proudly Malawian",
    description:
      "We are committed to producing food products that represent the quality and pride of Malawi.",
  },
  {
    icon: FaHeart,
    title: "Made for Families",
    description:
      "Whether it's breakfast, lunch or dinner, Tiata products are created for everyday enjoyment.",
  },
];

const team = [
  {
    name: "John Banda",
    position: "Managing Director",
    image: "/team-1.jpg",
    bio: "Leading Tiata Investment with a vision to deliver quality food products that families across Malawi can trust.",
  },
  {
    name: "Kings Kondowe",
    position: "Finance Manager",
    image: "/team-2.jpeg",
    bio: "Oversees production processes and ensures every product meets our quality standards.",
  },
  {
    name: "Martha Majamanda",
    position: "Accountant",
    image: "/team-3.jpeg",
    bio: "Committed to maintaining product safety, consistency and excellence throughout production.",
  },
  {
    name: "Wakissa Kabuzi Munthali",
    position: "Production & Logistics Manager",
    image: "/team-4.jpeg",
    bio: "Connecting Tiata products with customers and building lasting relationships across Malawi.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <span className="inline-flex rounded-full bg-brand-green/10 px-5 py-2 text-sm font-medium text-brand-green">
              About Tiata Investment
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-display font-semibold text-brand-brown leading-tight">
              Proudly crafting
              <span className="block text-brand-gold">
                quality food products
              </span>
              for every Malawian home.
            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-brand-brown/70">
              Tiata Investment is a proudly Malawian food processing company
              committed to producing delicious, natural and high-quality products.
              From refreshing fruit juices to everyday kitchen essentials,
              we create products families can trust.
            </p>

          </div>
        </section>

        <section className="bg-brand-cream py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

            <div className="relative">
              <div className="relative h-[520px] rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/about-story.jpg"
                  alt="Tiata Investment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>

              <span className="text-brand-green uppercase tracking-[0.25em] text-sm font-semibold">
                Our Story
              </span>

              <h2 className="mt-5 text-4xl md:text-5xl font-display font-semibold text-brand-brown">
                Made with passion.
                <span className="block text-brand-gold">
                  Shared with pride.
                </span>
              </h2>

              <p className="mt-8 text-lg text-brand-brown/70 leading-relaxed">
                Tiata Investment was founded with a simple vision: to produce
                quality food products that Malawians can enjoy every day.
                Every product reflects our commitment to freshness, consistency
                and exceptional taste.
              </p>

              <p className="mt-6 text-lg text-brand-brown/70 leading-relaxed">
                We continue to grow our product range while maintaining
                high production standards that deliver value,
                convenience and confidence to every customer.
              </p>

            </div>

          </div>
        </section>

        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="rounded-[2rem] border border-brand-brown/10 p-10">

                <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green text-3xl">
                  👁
                </div>

                <h3 className="mt-8 text-3xl font-display font-semibold text-brand-brown">
                  Our Vision
                </h3>

                <p className="mt-5 text-brand-brown/70 leading-relaxed">
                  To become one of Malawi's leading manufacturers of
                  trusted food and beverage products recognised for
                  quality, innovation and customer satisfaction.
                </p>

              </div>

              <div className="rounded-[2rem] bg-brand-green text-white p-10">

                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">
                  🎯
                </div>

                <h3 className="mt-8 text-3xl font-display font-semibold">
                  Our Mission
                </h3>

                <p className="mt-5 text-white/80 leading-relaxed">
                  To manufacture high-quality food products using
                  carefully selected ingredients while delivering
                  outstanding value and satisfaction to customers
                  throughout Malawi.
                </p>

              </div>

            </div>

          </div>
        </section>

        <section className="bg-brand-cream py-24">

          <div className="max-w-6xl mx-auto px-6">

          <div className="text-center">

          <h2 className="font-display text-5xl font-semibold text-brand-brown">
          Our Values
          </h2>

          <p className="mt-5 text-brand-brown/70">
          The principles that guide everything we do.
          </p>

          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {values.map((value)=>(

          <div
          key={value.title}
          className="bg-white rounded-[2rem] p-8 text-center shadow-sm hover:shadow-xl transition"
          >

          <h3 className="font-display text-2xl font-semibold text-brand-brown">
          {value.title}
          </h3>

          <p className="mt-4 text-brand-brown/70">
          {value.desc}
          </p>

          </div>

          ))}

          </div>

          </div>

          </section>


          {/* WHY CHOOSE US */}
          <section className="bg-brand-green py-24">
            <div className="max-w-7xl mx-auto px-6">

              <div className="text-center max-w-3xl mx-auto">

                <span className="inline-flex rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white">
                  Why Choose Tiata
                </span>

                <h2 className="mt-6 text-4xl md:text-5xl font-display font-semibold text-white">
                  Quality You Can
                  <span className="block text-brand-gold">
                    Trust Every Day
                  </span>
                </h2>

              </div>

              <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white rounded-[2rem] p-8 text-center"
                  >

                    <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center">

                      <feature.icon className="text-3xl text-brand-green" />

                    </div>

                    <h3 className="mt-6 font-display text-2xl text-brand-brown font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-brand-brown/70 leading-relaxed">
                      {feature.description}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          </section>

          {/* ───────────────── TEAM ───────────────── */}
          <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">

              {/* Heading */}
              <div className="text-center max-w-3xl mx-auto">

                <span className="inline-flex rounded-full bg-brand-green/10 px-5 py-2 text-sm font-medium text-brand-green">
                  Meet Our Team
                </span>

                <h2 className="mt-6 text-4xl md:text-5xl font-display font-semibold text-brand-brown">
                  The People Behind
                  <span className="block text-brand-gold">
                    Tiata Investment
                  </span>
                </h2>

                <p className="mt-6 text-lg text-brand-brown/70 leading-relaxed">
                  Behind every Tiata product is a dedicated team committed to quality,
                  innovation and delivering food products that customers can trust.
                </p>

              </div>

              {/* Team Grid */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {team.map((member) => (

                  <div
                    key={member.name}
                    className="group rounded-[2rem] overflow-hidden border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">

                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                    </div>

                    {/* Content */}
                    <div className="p-8">

                      <h3 className="font-display text-2xl font-semibold text-brand-brown">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-brand-green font-semibold">
                        {member.position}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>
          </section>

      </main>

      <Footer />
    </>
  );
}