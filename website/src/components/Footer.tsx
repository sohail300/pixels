import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col items-center justify-start border-t border-ink-700 bg-ink-900 px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 md:pb-12">
        <div className="w-full sm:w-4/5">
          {/* Mobile: Logo centered above, then 2-column grid below */}
          {/* Desktop: Logo in first column of 4-column grid */}
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 md:mt-4 md:grid-cols-4 md:gap-6 lg:gap-8">
            {/* Logo - Full width on mobile, first column on desktop */}
            <div className="col-span-2 mb-4 flex justify-center sm:col-span-2 sm:mb-6 md:col-span-1 md:mb-0 md:justify-start">
              <Image
                src="/logo.png"
                alt="Pixels Logo"
                width={200}
                height={200}
                className="w-32 max-w-[150px] rounded-sm sm:w-36 md:w-32 lg:w-36"
              />
            </div>

            {/* Spacer for desktop */}
            <div className="hidden md:block" />

            {/* Contact Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-3">
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-paper-300">
                Contact
              </p>
              <Link
                href="mailto:sohailatwork10@gmail.com"
                className="break-all text-center text-xs text-paper-500 transition-colors hover:text-paper-200 sm:text-left sm:text-sm"
              >
                sohailatwork10@gmail.com
              </Link>
            </div>

            {/* About Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-3">
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-paper-300">
                About
              </p>
              <div className="flex flex-col items-start space-y-2">
                <Link
                  href="/privacy-policy"
                  className="text-xs text-paper-500 transition-colors hover:text-paper-200 sm:text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-services"
                  className="text-xs text-paper-500 transition-colors hover:text-paper-200 sm:text-sm"
                >
                  Terms of Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-ink-700 bg-ink-950 px-4 py-4 text-paper-100 sm:py-3">
        <div className="container mx-auto text-center text-xs text-paper-500 sm:text-sm">
          &copy; {currentYear} Pixels. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
