export default function GoogleMap() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#020f22]">
            Find Us
          </h2>

          <p className="text-gray-600 mt-3">
            Area 46, Grand Business Park, Lilongwe, Malawi
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="w-full h-[350px] overflow-hidden rounded-2xl shadow-lg">

            <iframe
                title="The Dstrict Sports Arena Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.8118770023702!2d33.73470096909626!3d-13.988535051067078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3948ea64a0f%3A0xe4bbe20835b86413!2sThe%20District%20Sports%20Arena!5e1!3m2!1sen!2sus!4v1780812136484!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />

            </div>
        </div>

      </div>
    </section>
  );
}