import Image from "next/image";
import React from "react";

const AppDownload = () => {
  return (
    <section
      id="download-section"
      className="relative overflow-hidden bg-ink-900 py-20 sm:py-24 md:py-28"
    >
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border border-ink-600 bg-ink-800 px-6 py-12 shadow-[10px_10px_0_0_#fdd700] sm:px-10 sm:py-16 md:px-16">
          <div
            aria-hidden
            className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          />
          <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-brand-accentColor" />
          <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-brand-accentColor" />

          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="max-w-md">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accentColor">
                Get the app
              </p>
              <h2 className="mt-3 text-balance font-display text-2xl font-medium leading-tight text-paper-100 sm:text-3xl md:text-4xl">
                Pixels, right in your pocket
              </h2>
              <p className="mt-4 text-sm text-paper-400 sm:text-base">
                Scan the code to install the Android app. Free, no account
                required.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-sm border border-ink-600 bg-paper-100 p-3">
                <Image
                  src="/qr_code.png"
                  alt="QR code to download the Pixels app"
                  width={160}
                  height={160}
                  className="h-28 w-28 sm:h-32 sm:w-32"
                />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper-500">
                Scan to install
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
