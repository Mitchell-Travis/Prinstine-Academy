"use client";

import { useEffect, useRef } from "react";
import { asset } from "./assets";

const tracks = [
  { key: "certificate", title: "Certificate programs", image: "cohort-portrait.jpeg", copy: "Build practical skills through a structured 12-week program with hands-on learning and guidance." },
  { key: "organization", title: "Organization training", image: "cohort-group.jpeg", copy: "Flexible training shaped around the needs of your business, institution, or team." },
  { key: "acceleration", title: "Acceleration programs", image: "cohort-award.jpeg", copy: "Focused coaching and practical support for a personal, academic, or professional goal." },
];

export default function Pathways() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root || !window.IntersectionObserver) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 992px)");
    const animations: Animation[] = [];
    const heading = root.querySelector(".pathways-heading")!;
    const grid = root.querySelector(".pathways-grid")!;
    const reveal = (element: Element, offset: string, duration: number, delay = 0) => {
      animations.push(element.animate(
        [{ opacity: 0, transform: `translateY(${offset})` }, { opacity: 1, transform: "translateY(0)" }],
        { duration, delay, easing: "cubic-bezier(.25,.46,.45,.94)", fill: "backwards" },
      ));
    };
    const titles = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!reduced.matches) {
        reveal(heading.children[0], "50px", 500);
        reveal(heading.children[1], "30px", 500, 100);
      }
      titles.disconnect();
    }, { rootMargin: "0px 0px -10% 0px" });
    const cards = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!reduced.matches && desktop.matches) {
        [...grid.children].forEach((card, i) => reveal(card, "50%", 800, i * 300));
      }
      cards.disconnect();
    }, { rootMargin: "0px 0px -30% 0px" });
    const cancelMotion = () => { if (reduced.matches || !desktop.matches) animations.forEach(animation => animation.cancel()); };
    reduced.addEventListener("change", cancelMotion);
    desktop.addEventListener("change", cancelMotion);
    titles.observe(heading);
    cards.observe(grid);
    return () => {
      titles.disconnect();
      cards.disconnect();
      animations.forEach(animation => animation.cancel());
      reduced.removeEventListener("change", cancelMotion);
      desktop.removeEventListener("change", cancelMotion);
    };
  }, []);

  return (
    <section className="proof" id="pathways" aria-labelledby="pathways-title" ref={section}>
      <svg width="0" height="0" className="pathway-shape-defs" aria-hidden="true">
        <defs><clipPath id="pathway-clover" clipPathUnits="objectBoundingBox">
          <circle cx=".31" cy=".31" r=".31" /><circle cx=".69" cy=".31" r=".31" />
          <circle cx=".31" cy=".69" r=".31" /><circle cx=".69" cy=".69" r=".31" />
        </clipPath></defs>
      </svg>
      <div className="pathways-heading">
        <h2 id="pathways-title">Explore learning pathways</h2>
        <p>Designed around the needs of ambitious learners and the workplaces they serve.</p>
      </div>
      <div className="pathways-grid">
        {tracks.map(track => (
          <a id={`program-${track.key}`} className={`pathway pathway-${track.key} scroll-mt-6`} href="https://prinstineacademy.org/" target="_blank" rel="noreferrer" key={track.key} aria-label={`Explore ${track.title.toLowerCase()} on the official academy website`}>
            <div className="pathway-photo">
              <img src={asset(`/images/${track.image}`)} alt="" width="116" height="116" loading="lazy" />
            </div>
            <div className="pathway-content">
              <div className="pathway-copy"><h3>{track.title}</h3><p>{track.copy}</p></div>
              <span className="pathway-action" aria-hidden="true">
                <span className="pathway-action-label">View program</span>
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="2.3" /></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
