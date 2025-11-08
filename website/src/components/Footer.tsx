import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#181818] flex flex-col justify-start items-center pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8">
        <div className="w-full sm:w-4/5">
          {/* Mobile: Logo centered above, then 2-column grid below */}
          {/* Desktop: Logo in first column of 4-column grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-6 lg:gap-8 mt-8 md:mt-4">
            {/* Logo - Full width on mobile, first column on desktop */}
            <div className="col-span-2 sm:col-span-2 md:col-span-1 flex justify-center mb-4 sm:mb-6 md:mb-0 md:justify-start">
              <Image
                src="/logo.png"
                alt="Pixels Logo"
                width={200}
                height={200}
                className="w-32 sm:w-36 md:w-32 lg:w-36 max-w-[150px] rounded-3xl"
              />
            </div>
            
            {/* Spacer for desktop */}
            <div className="hidden md:block" />
            
            {/* Contact Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-3">
              <p className="font-semibold text-sm sm:text-base text-gray-200 mb-1">Contact</p>
              <Link 
                href="mailto:sohailatwork10@gmail.com"
                className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors break-all text-center sm:text-left"
              >
                sohailatwork10@gmail.com
              </Link>
            </div>

            {/* About Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-3">
              <p className="font-semibold text-sm sm:text-base text-gray-200 mb-1">About</p>
              <div className="flex flex-col space-y-2 items-start">
                <Link 
                  href="/privacy-policy"
                  className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms-of-services"
                  className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Terms of Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1E1E1E] text-white py-4 sm:py-3 px-4">
        <div className="container mx-auto text-center text-xs sm:text-sm text-gray-200">
          &copy; {currentYear} Pixels. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
