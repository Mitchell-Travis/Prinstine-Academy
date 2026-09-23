"use client";

import { useEffect, useState } from "react";
import { asset } from "./assets";

// Photos from the official homepage's “We Educate. Empower. Elevate.” slideshow.
const photos = [
  { file: "cohort-group.jpeg", alt: "Three attendees wearing blue and gold Prinstine Academy scarves" },
  { file: "hero-cohort-2.jpeg", alt: "Prinstine Academy event participants standing together in blue and gold scarves" },
  { file: "hero-cohort-3.jpeg", alt: "A presenter holding a framed certificate at a Prinstine Academy ceremony" },
  { file: "prinstine-hero.jpeg", alt: "Prinstine Academy community gathered in an auditorium" },
];

export default function HeroPhotos() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || hovered || focused) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % photos.length), 6000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, hovered, focused]);

  return (
    <div className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-bright" role="group" aria-roledescription="carousel" aria-label="Prinstine Academy photos. Focus to pause the slideshow." tabIndex={0} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {photos.map((photo, index) => (
        <img key={photo.file} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`} src={asset(`/images/${photo.file}`)} width={index === 3 ? 1280 : 1536} height={index === 3 ? 720 : 1024} fetchPriority={index === 0 ? "high" : "low"} alt={photo.alt} aria-hidden={index !== active} />
      ))}
      <span className="sr-only" aria-live={reducedMotion || hovered || focused ? "polite" : "off"}>Photo {active + 1} of {photos.length}</span>
    </div>
  );
}
