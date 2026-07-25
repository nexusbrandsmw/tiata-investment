"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Wrench,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface SingleProjectProps {
  title: string;
  client: string;
  industry: string;
  timeline: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  images: string[];
}

export default function SingleProject({
  title,
  client,
  industry,
  timeline,
  services,
  description,
  challenge,
  solution,
  outcome,
  images,
}: SingleProjectProps) {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openImage = (index: number) => setActiveIndex(index);

  const closeImage = () => setActiveIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === 0 ? images.length - 1 : activeIndex - 1
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === images.length - 1 ? 0 : activeIndex + 1
    );
  };

  return (
    <>
      {/* Your existing UI */}

      {/* Replace hardcoded values */}

      <h1>{title}</h1>

      <p>{description}</p>

      <p>{client}</p>

      <p>{industry}</p>

      <p>{timeline}</p>

      {services.map((service) => (
        <span key={service}>
          {service}
        </span>
      ))}

      {/* Challenge */}
      <p>{challenge}</p>

      {/* Solution */}
      <p>{solution}</p>

      {/* Outcome */}
      <p>{outcome}</p>

      {/* Gallery */}
      {images.map((img, i) => (
        <div key={i} onClick={() => openImage(i)}>
          <img src={img} />
        </div>
      ))}

      {/* Lightbox remains unchanged */}
    </>
  );
}