import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const tickerItems = [
  "HD wallpapers",
  "New drops weekly",
  "Free forever",
  "No account needed",
];

const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-brand-accentColor/20 blur-[120px]" />
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />

      <div className="container relative mx-auto grid gap-14 px-4 pb-20 pt-28 sm:px-6 md:grid-cols-2 md:items-center md:gap-8 md:pb-24 md:pt-36 lg:pt-44">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-6 inline-flex items-center gap-2 rounded-sm border border-ink-600 bg-ink-900/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-paper-300">
            <span className="h-1.5 w-1.5 bg-brand-accentColor" />
            wallpapers, curated
          </span>

          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper-100 sm:text-5xl md:text-6xl lg:text-7xl">
            Wallpapers
            <br />
            <span className="text-paper-400">tailored for you</span>
          </h1>

          <p className="mt-6 max-w-md text-balance text-sm text-paper-300 sm:text-base">
            Endless HD wallpapers picked to your taste. Search, like, and
            download in one tap — no account, no clutter.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="#download-section" className="w-full sm:w-auto">
              <Button className="h-12 w-full rounded-sm bg-brand-accentColor px-7 font-semibold text-ink-950 shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accentColor hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] sm:w-auto">
                Download for free
              </Button>
            </Link>
            <a
              href="#why-pixels"
              className="font-mono text-xs uppercase tracking-[0.2em] text-paper-400 underline-offset-4 transition-colors hover:text-paper-100 hover:underline"
            >
              See what&apos;s inside ↓
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm md:max-w-none">
          <div className="absolute inset-6 -z-10 hidden rounded-sm border border-ink-700 md:block" />
          <Image
            src="/hero.png"
            width={776}
            height={960}
            priority
            className="mx-auto h-auto w-full max-w-[19rem] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] sm:max-w-sm md:max-w-md"
            alt="Pixels app screens showing wallpaper search and a liked-wallpapers list"
          />
          <span className="absolute left-2 top-2 hidden h-6 w-6 border-l-2 border-t-2 border-brand-accentColor md:block" />
          <span className="absolute bottom-2 right-2 hidden h-6 w-6 border-b-2 border-r-2 border-brand-accentColor md:block" />
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-ink-700 bg-ink-900">
        <div className="flex w-max animate-marquee items-center gap-10 py-3">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-center gap-10"
            >
              {tickerItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-paper-500"
                >
                  {item}
                  <span className="text-brand-accentColor">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
