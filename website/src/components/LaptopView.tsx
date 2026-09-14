import Image from "next/image";
import React from "react";

const stats = [
  { value: "100+", label: "Wallpapers in the library" },
  { value: "4", label: "Categories to explore" },
  { value: "0", label: "Ads getting in your way" },
];

const LaptopView = () => {
  return (
    <section className="relative overflow-hidden border-t border-ink-700 bg-ink-900 py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]" />

      <div className="container relative mx-auto flex flex-col items-center px-4 text-center sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accentColor">
          On any device
        </p>
        <h2 className="mt-3 max-w-xl text-balance font-display text-2xl font-medium leading-tight text-paper-100 sm:text-3xl md:text-4xl">
          Start using Pixels right now
        </h2>

        <div className="relative mt-12 w-full sm:w-[85%] md:w-[70%] lg:w-[60%]">
          <div className="absolute inset-x-10 top-6 -z-10 h-40 rounded-full bg-brand-accentColor/10 blur-[100px]" />
          <Image
            src="/laptop.png"
            alt="Pixels wallpaper browser open on a laptop"
            width={1000}
            height={1000}
            className="h-auto w-full"
          />
        </div>

        <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-8 border-t border-ink-700 pt-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-medium tabular-nums text-paper-100 sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-paper-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaptopView;
