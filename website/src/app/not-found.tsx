import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-ink-950 px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />

      <span className="relative font-mono text-xs uppercase tracking-[0.3em] text-brand-accentColor">
        404
      </span>
      <h1 className="relative font-display text-3xl font-medium text-paper-100 sm:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="relative max-w-sm text-sm text-paper-400">
        The wallpaper you&apos;re looking for isn&apos;t here. Let&apos;s get
        you back to the good stuff.
      </p>
      <Link
        href="/"
        className="relative rounded-sm bg-brand-accentColor px-6 py-2.5 text-sm font-semibold text-ink-950 shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000]"
      >
        Back to Pixels
      </Link>
    </div>
  );
}
