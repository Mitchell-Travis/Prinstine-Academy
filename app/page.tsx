import Pathways from "./Pathways";
import Navigation from "./Navigation";
import CommunityStories from "./CommunityStories";
import HeroPhotos from "./HeroPhotos";

const Arrow = () => <span aria-hidden="true">→</span>;

export default function Home() {
  return (
    <main className="relative isolate [--rail-inset:12px] [--rail-gap:20px] [--page-gutter:calc(var(--rail-inset)+var(--rail-gap))] md:[--rail-inset:24px] md:[--rail-gap:32px] min-[75rem]:[--rail-inset:40px] min-[75rem]:[--rail-gap:40px]">
      <div aria-hidden="true" className="page-rails pointer-events-none absolute inset-0 z-20 mx-auto max-w-[1440px] px-[var(--rail-inset)]">
        <div className="h-full border-x border-[#8b9dc2]/40" />
      </div>
      <div className="concept-bar"><span>Unofficial redesign concept</span><span>Prinstine Academy · September 2026</span></div>
      <Navigation />

      <section className="academy-hero scroll-mt-5 overflow-hidden bg-white [&_a:focus-visible]:outline-3 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-brand" id="top" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="academy-hero-inner mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-y-16 px-[var(--page-gutter)] min-[48.0625rem]:grid-cols-2 min-[48.0625rem]:gap-x-16 min-[75rem]:min-h-[574px] min-[75rem]:gap-x-20">
          <div className="academy-hero-copy relative z-1 pt-10 pb-0 motion-safe:animate-[hero-copy-in_.65s_ease-out_both] md:pt-8 min-[48.0625rem]:pb-10 min-[75rem]:pt-15 min-[75rem]:pb-18">
            <p className="mb-5 font-mono text-[10px] leading-relaxed tracking-widest text-brand uppercase md:mb-6 md:text-xs">Practical learning · Monrovia, Liberia</p>
            <h1 id="hero-title" className="m-0 text-[clamp(37px,10.6vw,50px)] leading-[1.1] font-normal tracking-[-.055em] text-navy md:text-[56px] min-[75rem]:text-[clamp(56px,4.45vw,64px)]">Practical skills.<br />Real confidence.<br /><span className="text-brand">Your next chapter.</span></h1>
            <p className="mt-4 mb-8 max-w-[680px] text-[17px] leading-[1.5] tracking-[-.015em] text-[#36405a] md:mt-3 md:mb-14 md:text-[18px] min-[75rem]:max-w-[560px] min-[75rem]:text-[19px]">Technical and vocational training programs streamlined to build practical, job-ready skills.</p>
            <div className="academy-hero-actions flex flex-wrap gap-3 max-[22.5rem]:grid">
              <a className="inline-flex min-h-[50px] items-center justify-center gap-4 rounded-[2px] border border-brand bg-brand px-4 text-sm font-semibold text-white transition-colors hover:border-brand-hover hover:bg-brand-hover md:gap-6 md:px-5 md:text-[15px]" href="#pathways">Explore programs <Arrow /></a>
              <a className="inline-flex min-h-[50px] items-center justify-center rounded-[2px] border border-navy px-4 text-sm font-semibold text-navy transition-colors hover:bg-mist md:px-5 md:text-[15px]" href="mailto:info@prinstineacademy.org">Talk to us</a>
            </div>
          </div>
          <div className="academy-hero-visual relative grid aspect-[88/81] w-full min-w-0 items-center self-center">
            <svg className="pointer-events-none absolute inset-0 h-full w-full text-gold-bright" viewBox="0 0 600 650" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M330 -100C180 85 220 175 355 279S590 456 276 736" stroke="currentColor" strokeWidth="140" />
            </svg>
            <figure className="academy-hero-photo relative m-0 ml-[4%] aspect-[1.55] w-[91%] overflow-hidden rounded-[14px] border-[6px] border-navy bg-navy shadow-[0_22px_26px_-12px_#07133d66,0_5px_8px_#07133d20] [transform:perspective(1600px)_rotateY(-16deg)] motion-safe:animate-[hero-photo-in_.9s_.1s_ease-out_both] md:rounded-[20px] md:border-[9px]">
              <HeroPhotos />
              <figcaption className="sr-only">Prinstine Academy community photos. Source: prinstineacademy.org.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <div className="border-y border-brand/10 bg-mist text-navy">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 items-center gap-x-2 gap-y-4 px-[var(--page-gutter)] py-6 md:flex md:min-h-[90px] md:justify-between md:gap-6">
          <p className="col-span-3 m-0 text-xs leading-normal text-muted md:text-sm">Learning with purpose.<br className="hidden md:block" /> Growing together in Liberia.</p>
          {["Educate.", "Empower.", "Elevate."].map(value => (
            <strong key={value} className="flex items-center gap-3 text-[clamp(21px,5.7vw,28px)] font-medium tracking-[-.045em] md:text-[clamp(23px,2.35vw,34px)]">
              <svg className="hidden size-5 shrink-0 text-brand lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /></svg>
              {value}
            </strong>
          ))}
        </div>
      </div>

      <Pathways />
      <CommunityStories />

      <footer id="concept-note" aria-labelledby="concept-title" className="bg-navy text-white">
        <div className="mx-auto max-w-[1440px] px-[var(--page-gutter)] py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-14">
            <h2 id="concept-title" className="max-w-[540px] text-[38px] leading-[1.08] font-normal tracking-[-.045em] md:text-[54px]">A glimpse of<br /><span className="text-gold-soft">what’s possible.</span></h2>
            <p className="max-w-[480px] text-sm leading-7 text-[#c2cbe5] md:text-base">This is a sample redesign exploring a fresh digital direction for Prinstine Academy. Created for presentation only—not the academy’s official website or an affiliated service.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-[#c2cbe5]">
            <span>Prinstine Academy · Unofficial concept</span>
            <a href="https://prinstineacademy.org/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright">Visit the official website <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
