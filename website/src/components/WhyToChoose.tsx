import React from "react";
import { Images, Fullscreen, DownloadIcon, Heart } from "lucide-react";

const features = [
  {
    index: "01",
    title: "Curated collection",
    description:
      "Handpicked wallpapers sorted into categories, not an endless dump of random images.",
    icon: Images,
  },
  {
    index: "02",
    title: "High-resolution art",
    description:
      "Every wallpaper is full HD, so it looks sharp on any phone screen.",
    icon: Fullscreen,
  },
  {
    index: "03",
    title: "One-tap download",
    description:
      "Save wallpapers straight to your gallery — no ads standing in the way.",
    icon: DownloadIcon,
  },
  {
    index: "04",
    title: "Save your favorites",
    description:
      "Like what you see and find it again later in your own liked list.",
    icon: Heart,
  },
];

const WhyToChoose = () => {
  return (
    <section
      id="why-pixels"
      className="relative overflow-hidden bg-ink-900 py-20 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" />

      <div className="container relative mx-auto grid gap-14 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accentColor">
            Why pixels
          </p>
          <h2 className="mt-3 max-w-md text-balance font-display text-3xl font-medium leading-tight text-paper-100 sm:text-4xl md:text-5xl">
            Everything a wallpaper app should be, nothing it shouldn&apos;t
          </h2>

          <ul className="mt-10 divide-y divide-ink-700 border-y border-ink-700">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.index}
                  className="group flex items-start gap-5 py-6"
                >
                  <span className="font-mono text-sm text-paper-500">
                    {feature.index}
                  </span>
                  <Icon className="mt-0.5 h-5 w-5 flex-none text-paper-300 transition-colors duration-200 group-hover:text-brand-accentColor" />
                  <div>
                    <h3 className="font-medium text-paper-100">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-paper-400">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none md:self-center">
          <div className="absolute -inset-3 -z-10 rounded-sm border border-ink-700 bg-ink-800/60" />
          <div className="relative overflow-hidden rounded-sm border border-ink-600 shadow-[8px_8px_0_0_#fdd700]">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full object-cover"
            >
              <track kind="captions" />
            </video>
          </div>
          <span className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-brand-accentColor" />
          <span className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-brand-accentColor" />
        </div>
      </div>
    </section>
  );
};

export default WhyToChoose;
