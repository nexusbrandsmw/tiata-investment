"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <Navbar />
      {/* HEADER */}
      <PageHeader
        title="Let's Start the Conversation"
        subtitle="Have a question about our investment services, partnerships, or business opportunities? Our team is here to help."
      />

      {/* CONTACT SECTION */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

          {/* LEFT INFO */}
          <div>
            <span className="inline-flex rounded-full bg-brand-gold/20 px-4 py-2 text-sm font-medium text-brand-gold">
              Get in touch
            </span>

            <p className="mt-4 text-black/90">
              We respond quickly and help you choose the right solution for your business.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <Phone className="text-brand-green" />
                <span className="text-black/90">+265 993 266 432</span>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-brand-green" />
                <span className="text-black/90">info@tiatamw.com</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-brand-green" />
                <span className="text-black/90">Area 25 Lilongwe, Malawi</span>
              </div>

              {/* WHATSAPP CTA */}
              <a
                href="https://wa.me/265993266432"
                target="_blank"
                className="inline-flex items-center gap-2 mt-6 bg-green-500 text-white px-5 py-3 rounded-full hover:opacity-90 transition"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </a>

            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-secondary p-8 rounded-2xl border border-brand-brown/30"
          >
            <div className="space-y-5">

              <h2 className="text-3xl py-5 font-bold text-brand-brown">
                Send a Message
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border text-brand-brown border-brand-brown/50 focus:outline-none focus:border-brand-green"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border text-brand-brown border-brand-brown/50 focus:outline-none focus:border-brand-green"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 rounded-xl border text-brand-brown border-brand-brown/50 focus:outline-none focus:border-brand-green"
              />

              <button
                type="submit"
                className="w-full bg-brand-green text-white py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                Send Message
              </button>

            </div>
          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}