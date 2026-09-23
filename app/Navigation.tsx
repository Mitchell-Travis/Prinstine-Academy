"use client";

import { useRef, useState } from "react";

const links = [
  ["Programs", "#pathways"],
  ["For organizations", "#program-organization"],
  ["About us", "https://prinstineacademy.org/"],
  ["Gallery", "https://prinstineacademy.org/gallery"],
];
const pathways = [
  ["Certificate programs", "12 weeks of practical, guided learning.", "#program-certificate"],
  ["Organization training", "Flexible training tailored to your team.", "#program-organization"],
  ["Acceleration programs", "Focused support for your next step.", "#program-acceleration"],
];

function NavIcon({ name, className = "" }: { name: "arrow" | "chevron" | "certificate" | "menu" | "close"; className?: string }) {
  const paths = {
    arrow: "M7 17 17 7M7 7h10v10",
    chevron: "m7 10 5 5 5-5",
    certificate: "M14 3H5v18h14V8l-5-5ZM14 3v5h5M8 14l2.5 2.5L16 11",
    menu: "M3 5h18M3 12h18M3 19h18",
    close: "m5 5 14 14M5 19 19 5",
  };
  return <svg className={`shrink-0 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function Navigation() {
  const [open, setOpen] = useState<"programs" | "navigation" | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  return (
    <header className="academy-header relative z-10 bg-white text-navy [&_a:focus-visible]:outline-3 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-brand [&_button:focus-visible]:outline-3 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-brand" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(null);
        trigger.current?.focus();
      }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
    }}>
      <div aria-hidden="true" className="nav-rails pointer-events-none absolute inset-0 mx-auto max-w-[1440px] px-[var(--rail-inset)]">
        <div className="h-full border-y border-[#8b9dc2]/40" />
      </div>
      <a className="absolute -top-40 left-5 z-20 bg-navy px-5 py-3 text-white focus:top-3" href="#top">Skip to content</a>
      <nav className="academy-nav mx-auto flex min-h-20 max-w-[1440px] items-center gap-2 px-[var(--page-gutter)] md:min-h-[88px] md:gap-5" aria-label="Main navigation">
        <a className="academy-wordmark flex shrink-0 flex-col pb-1 text-navy" href="#top" aria-label="Prinstine Academy home">
          <span className="font-serif text-[29px] leading-none tracking-[-.06em] md:text-[34px]">Prinstine</span>
          <span className="mt-1 text-[9px] leading-none tracking-[.32em] md:text-[10px]">ACADEMY</span>
        </a>
        <div className="academy-links hidden items-center gap-6 text-[15px] whitespace-nowrap min-[56rem]:flex">
          <button className="flex min-h-11 cursor-pointer items-center gap-2 hover:text-brand" aria-expanded={open === "programs"} aria-controls="program-navigation" onClick={(event) => {
            trigger.current = event.currentTarget;
            setOpen(open === "programs" ? null : "programs");
          }}>Programs <NavIcon name="chevron" className={`size-4 transition-transform ${open === "programs" ? "rotate-180" : ""}`} /></button>
          <a className="hidden min-h-11 items-center hover:text-brand min-[75rem]:flex" href="#program-organization">For organizations</a>
          <a className="flex min-h-11 items-center hover:text-brand" href="https://prinstineacademy.org/" target="_blank" rel="noreferrer">About us</a>
          <a className="hidden min-h-11 items-center hover:text-brand min-[75rem]:flex" href="https://prinstineacademy.org/gallery" target="_blank" rel="noreferrer">Gallery <NavIcon name="arrow" className="ml-1 size-4" /></a>
        </div>
        <div className="academy-actions ml-auto flex shrink-0 items-center gap-2">
          <a className="mr-1 hidden min-h-11 items-center text-[14px] underline underline-offset-4 hover:text-brand min-[75rem]:flex" href="https://prinstineacademy.org/verify-certificate" target="_blank" rel="noreferrer">Verify certificate <NavIcon name="arrow" className="ml-1 size-4" /></a>
          <a className="hidden size-11 items-center justify-center hover:text-brand md:flex min-[75rem]:hidden" href="https://prinstineacademy.org/verify-certificate" target="_blank" rel="noreferrer" aria-label="Verify a certificate" title="Verify a certificate"><NavIcon name="certificate" /></a>
          <a className="inline-flex min-h-11 items-center justify-center rounded-[2px] border border-brand bg-brand px-3 text-[14px] whitespace-nowrap text-white transition-colors hover:border-brand-hover hover:bg-brand-hover md:px-5 md:text-base" href="https://prinstineacademy.org/register" target="_blank" rel="noreferrer">Enroll now</a>
          <a className="hidden min-h-11 items-center justify-center rounded-[2px] border border-navy px-5 text-base whitespace-nowrap transition-colors hover:bg-mist md:inline-flex" href="mailto:info@prinstineacademy.org">Talk to us</a>
          <button className="nav-toggle flex size-11 cursor-pointer items-center justify-center min-[75rem]:hidden" type="button" aria-expanded={open === "navigation"} aria-controls="mobile-navigation" aria-label={open === "navigation" ? "Close navigation" : "Open navigation"} onClick={(event) => {
            trigger.current = event.currentTarget;
            setOpen(open === "navigation" ? null : "navigation");
          }}>
            <NavIcon name={open === "navigation" ? "close" : "menu"} />
          </button>
        </div>
        <div id="program-navigation" hidden={open !== "programs"} className="absolute inset-x-0 top-full hidden border-y border-line bg-white shadow-xl md:block [&[hidden]]:hidden" onClick={() => setOpen(null)}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-6 px-[var(--page-gutter)] py-9">
            {pathways.map(([title, description, href]) => <a className="rounded-sm p-3 hover:bg-mist" href={href} key={href}><span className="flex justify-between gap-3 text-[18px] font-semibold">{title}<NavIcon name="arrow" className="size-5 text-brand" /></span><span className="mt-3 block text-sm leading-relaxed text-muted">{description}</span></a>)}
          </div>
        </div>
        <div id="mobile-navigation" hidden={open !== "navigation"} className="absolute inset-x-0 top-full grid max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-line bg-white px-[var(--page-gutter)] pt-3 pb-6 shadow-xl [&[hidden]]:hidden min-[75rem]:hidden [&_a]:flex [&_a]:items-center [&_a]:justify-between [&_a]:border-b [&_a]:border-line [&_a]:py-4" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(null);
        }}>
          {links.map(([label, href]) => <a key={href} href={href} {...(href.startsWith("https") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}{href.startsWith("https") && <NavIcon name="arrow" className="size-4" />}</a>)}
          <a href="https://prinstineacademy.org/verify-certificate" target="_blank" rel="noreferrer">Verify certificate <NavIcon name="arrow" className="ml-1 size-4" /></a>
          <a href="mailto:info@prinstineacademy.org">Talk to the academy</a>
        </div>
      </nav>
    </header>
  );
}
