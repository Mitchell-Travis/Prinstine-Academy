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
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => { if (reduced.matches) setPaused(true); };
    stop();
    reduced.addEventListener("change", stop);
    return () => reduced.removeEventListener("change", stop);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % photos.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused]);

  return (
    <div className="absolute inset-0" role="group" aria-roledescription="carousel" aria-label="Prinstine Academy photos" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      {photos.map((photo, index) => (
        <img key={photo.file} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`} src={asset(`/images/${photo.file}`)} width={index === 3 ? 1280 : 1536} height={index === 3 ? 720 : 1024} fetchPriority={index === 0 ? "high" : "low"} alt={photo.alt} aria-hidden={index !== active} />
      ))}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-navy/85 p-1 text-white md:bottom-3 [&_button]:cursor-pointer [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-[-2px] [&_button:focus-visible]:outline-gold-bright">
        <button type="button" className="flex size-9 items-center justify-center rounded-full hover:bg-white/15" aria-label={paused ? "Play photo slideshow" : "Pause photo slideshow"} onClick={() => { setPaused(value => !value); setHovered(false); setFocused(false); }}>
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={paused ? "m8 4 12 8-12 8z" : "M6 4h4v16H6zm8 0h4v16h-4z"} /></svg>
        </button>
        {photos.map((photo, index) => <button key={photo.file} type="button" className="flex size-9 items-center justify-center rounded-full hover:bg-white/15" aria-label={`Show photo ${index + 1}`} aria-pressed={index === active} onClick={() => { setPaused(true); setActive(index); }}><span className={`h-2 rounded-full ${index === active ? "w-5 bg-white" : "w-2 bg-white/50"}`} /></button>)}
      </div>
      <span className="sr-only" aria-live={paused ? "polite" : "off"}>Photo {active + 1} of {photos.length}</span>
    </div>
  );
}
