"use client";

import { useRef, useState } from "react";
import { asset } from "./assets";

// User-supplied public reels. Covers are academy gallery photos, not video stills.
const moments = [
  { id: "1320798773474924", image: "cohort-portrait.jpeg", title: "Professional accounting software training", alt: "Prinstine Academy attendee", position: "50% 35%" },
  { id: "2620882448288141", image: "cohort-community.jpeg", title: "Season’s greetings from Prinstine Group", alt: "Prinstine Academy community members gathered in an auditorium", position: "50% 45%" },
  { id: "1510674151073153", image: "cohort-award.jpeg", title: "A small business grant recipient’s update", alt: "Two men with an award at a Prinstine Academy event", position: "50% 35%" },
  { id: "2036485340573857", image: "cohort-group.jpeg", title: "Discover learning at Prinstine Academy", alt: "Three academy attendees wearing blue and gold scarves", position: "50% 50%" },
  { id: "1001544582887090", image: "prinstine-hero.jpeg", title: "Entrepreneurship & business development presentations", alt: "Attendees gathered at a Prinstine Academy event", position: "50% 50%" },
];
const reelUrl = (id: string) => `https://www.facebook.com/reel/${id}/`;

export default function CommunityStories() {
  const rail = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const [active, setActive] = useState(1);
  const [drag, setDrag] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const moment = moments[active];

  function goTo(index: number) {
    setPlaying(null);
    setActive(Math.max(0, Math.min(moments.length - 1, index)));
    setDrag(0);
  }

  return (
    <section id="community" aria-labelledby="community-title" className="overflow-hidden bg-white py-16 text-navy md:py-24 [&_button:focus-visible]:outline-3 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-brand [&_a:focus-visible]:outline-3 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-brand">
      <div className="mx-auto mb-9 w-[calc(100%_-_var(--page-gutter)*2)] max-w-[650px] text-center md:mb-12">
        <p className="mb-4 text-[11px] font-semibold tracking-[.16em] text-brand uppercase">Life at Prinstine</p>
        <h2 id="community-title" className="text-[32px] leading-[1.12] font-normal tracking-[-.04em] md:text-[46px]">Get to know the community<br className="hidden md:block" /> behind the learning.</h2>
      </div>
      <div className="mx-auto w-[calc(100%_-_var(--page-gutter)*2)] max-w-[1280px] [--story-width:calc(100vw_-_var(--page-gutter)*2_-_48px)] md:[--story-width:min(948px,calc(100vw_-_var(--page-gutter)*2_-_64px))]" role="region" aria-roledescription="carousel" aria-label="Videos from Prinstine Group">
        <div className="community-window overflow-clip rounded-2xl [touch-action:pan-y_pinch-zoom] md:rounded-3xl"
          onDragStart={event => event.preventDefault()}
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return;
            gesture.current = { x: event.clientX, y: event.clientY };
            dragged.current = false;
          }}
          onPointerMove={event => {
            const start = gesture.current;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (!dragged.current && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { gesture.current = null; return; }
            if (Math.abs(dx) > 8) {
              dragged.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              setDrag((active === 0 && dx > 0) || (active === moments.length - 1 && dx < 0) ? dx * .15 : dx);
            }
          }}
          onPointerUp={event => {
            if (!gesture.current) return;
            const dx = event.clientX - gesture.current.x;
            gesture.current = null;
            if (dragged.current && Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
            else setDrag(0);
          }}
          onPointerCancel={() => { gesture.current = null; setDrag(0); }}
          onClickCapture={event => { if (dragged.current) { dragged.current = false; event.preventDefault(); event.stopPropagation(); } }}
          onKeyDown={event => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); goTo(active + (event.key === "ArrowRight" ? 1 : -1)); }
          }}
        >
          <div ref={rail} className={`community-rail relative left-[calc((100%_-_var(--story-width))/2)] flex items-start gap-4 will-change-transform motion-reduce:transition-none ${drag ? "" : "transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"}`}
            style={{ transform: `translate3d(calc(${-active} * (var(--story-width) + 16px) + ${drag}px), 0, 0)` }}>
            {moments.map((item, index) => (
              <div key={item.id} className="w-[var(--story-width)] shrink-0" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${moments.length}: ${item.title}`} inert={index !== active}>
                <div className="relative aspect-video overflow-hidden rounded-3xl bg-navy md:rounded-[32px]">
                  {playing === index ? (
                    <iframe className="h-full w-full border-0" src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl(item.id))}&show_text=false&width=948&autoplay=false`} title={item.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                  ) : (
                    <>
                      <img src={asset(`/images/${item.image}`)} alt={item.alt} draggable={false} loading={Math.abs(index - active) <= 1 ? "eager" : "lazy"} width="948" height="533" className="h-full w-full select-none object-cover" style={{ objectPosition: item.position }} />
                      {index === 0 ? <a href={reelUrl(item.id)} target="_blank" rel="noreferrer" aria-label={`Watch on Facebook: ${item.title}`} className="absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-5px]!">
                        <span className="inline-flex items-center gap-2 rounded-xl bg-gold-soft px-5 py-4 text-sm font-semibold text-navy shadow-lg hover:bg-gold-bright">Watch on Facebook <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
                      </a> : <button type="button" onClick={() => setPlaying(index)} aria-label={`Load Facebook video: ${item.title}`} className="group absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing focus-visible:outline-offset-[-5px]!">
                        <span className="flex size-14 items-center justify-center rounded-xl bg-gold-soft text-navy shadow-lg transition-colors group-hover:bg-gold-bright md:size-18"><svg className="size-6 md:size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 4 12 8-12 8z" /></svg></span>
                      </button>}
                      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-gold-soft px-3 py-1.5 text-[10px] font-semibold tracking-wide text-navy md:top-6 md:left-6 md:text-xs">Prinstine Group · Reel</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-[var(--story-width)] px-1">
          <div className="min-h-[148px] pt-5 md:min-h-[112px]">
            <p className="text-sm font-medium md:text-base">{moment.title}</p>
            <p className="mt-1 text-xs text-muted">Video: Prinstine Group · Cover: academy gallery photo, not a video still</p>
            <div className="mt-2 flex flex-wrap gap-x-5 text-xs">
              <a href={reelUrl(moment.id)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2 font-semibold text-brand underline underline-offset-4">Open on Facebook <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg></a>
              {playing !== null && <button type="button" onClick={() => { setPlaying(null); requestAnimationFrame(() => rail.current?.children[active]?.querySelector<HTMLButtonElement>("button")?.focus()); }} className="cursor-pointer py-2 font-semibold text-brand underline underline-offset-4">Close video</button>}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-muted" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span aria-hidden="true">/</span><span className="sr-only">of</span> {String(moments.length).padStart(2, "0")}</p>
            <div className="flex gap-2">
              {[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? "Previous video" : "Next video"} disabled={active + direction < 0 || active + direction >= moments.length} onClick={() => goTo(active + direction)} className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-brand">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={direction < 0 ? "M19 12H5m7 7-7-7 7-7" : "M5 12h14m-7-7 7 7-7 7"} /></svg>
              </button>)}
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 w-[calc(100%_-_var(--page-gutter)*2)] max-w-[570px] text-center text-xs leading-relaxed text-muted">Videos load from Facebook only when you choose to play. Facebook may require sign-in or cookies; use “Open on Facebook” if a video is unavailable here.</p>
    </section>
  );
}
