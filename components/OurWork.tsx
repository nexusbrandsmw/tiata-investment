"use client";

import { useState } from "react";

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Graphic Design",
    "Branding",
    "Social Media",
    "Website",
  ];

  const projects = [
    { title: "Tiata Investment", category: "Branding", image: "/work/1.jpg" },
    { title: "Availon", category: "Graphic Design", image: "/work/2.jpg" },
    { title: "Amuhala Studios", category: "Social Media", image: "/work/3.jpg" },
    { title: "Kaka Investment", category: "Website", image: "/work/4.jpg" },
    { title: "Nexus Brands", category: "Branding", image: "/work/5.jpg" },
    { title: "Maid Recruitment Platform", category: "Website", image: "/work/6.jpg" },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-24 bg-accent">
      <div className="max-w-6xl mx-auto px-6">

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeFilter === filter
                  ? "bg-[#e01e41] text-white"
                  : "border border-[#000f22]/15 text-[#000f22] hover:border-[#e01e41] hover:text-[#e01e41]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000f22]/90 via-[#000f22]/20 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-5 left-5">
                <span className="text-xs text-white/70">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}