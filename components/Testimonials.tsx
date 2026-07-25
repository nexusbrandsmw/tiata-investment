export default function Testimonials() {
  const testimonials = [
    {
      name: "Tiata Investment",
      text: "Nexus Brands helped us build a strong and professional identity that truly represents our business.",
    },
    {
      name: "Kaka Investment",
      text: "The website and branding work completely changed how clients perceive our company.",
    },
    {
      name: "Amuhala Studios",
      text: "Very creative and reliable team. They delivered exactly what we needed on time.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="max-w-2xl">
          <span className="uppercase tracking-[0.2em] text-sm text-[#e01e41]">
            Testimonials
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-[#000f22] leading-tight">
            What our clients say
          </h2>

          <p className="mt-6 text-[#000f22]/70 leading-relaxed">
            We work closely with businesses to deliver results that speak for themselves.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-[#000f22]/10 hover:border-[#e01e41] transition"
            >
              <p className="text-[#000f22]/70 leading-relaxed">
                “{item.text}”
              </p>

              <h4 className="mt-6 font-bold text-[#000f22]">
                {item.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}