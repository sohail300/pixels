"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-ink-950 px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />

      <span className="relative font-mono text-xs uppercase tracking-[0.3em] text-brand-accentColor">
        Error
      </span>
      <h2 className="relative font-display text-3xl font-medium text-paper-100 sm:text-4xl">
        Something went wrong
      </h2>
      <p className="relative max-w-sm text-sm text-paper-400">
        The page hit a snag loading. Try again, or head back to the homepage.
      </p>
      <div className="relative flex items-center gap-6">
        <button
          onClick={() => reset()}
          className="rounded-sm bg-brand-accentColor px-6 py-2.5 text-sm font-semibold text-ink-950 shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000]"
        >
          Try again
        </button>
        <a
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-paper-400 underline-offset-4 transition-colors hover:text-paper-100 hover:underline"
        >
          Back home
        </a>
      </div>
      {error.digest && (
        <p className="relative font-mono text-[11px] text-paper-600">
          Error ref: {error.digest}
        </p>
      )}
    </div>
  );
}
