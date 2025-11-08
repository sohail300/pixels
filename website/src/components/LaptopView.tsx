import Image from "next/image";
import React from "react";

const LaptopView = () => {
  return (
    <>
      <div className="bg-[#181818] flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 px-4 sm:px-8">
        <div className="inline-block text-center md:text-left overflow-visible">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FCFCFC] to-[#959595] bg-clip-text text-transparent leading-normal pb-2">
            Start using Pixels right now!
          </h2>
        </div>
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mt-0">
          <Image
            src="/laptop.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8 text-gray-200 px-4 sm:px-8 md:px-16 w-full sm:w-4/5">
          <div className="p-4 text-center">
            <h3 className="text-2xl sm:text-3xl font-medium">100+</h3>
            <p className="my-2 text-sm sm:text-base text-gray-400">100+ Wallpapers available</p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-medium">50+</h3>
            <p className="my-2 text-sm sm:text-base text-gray-400">20+ users downloaded the app</p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-medium">200+</h3>
            <p className="my-2 text-sm sm:text-base text-gray-400">200+ wallpapers downloaded</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaptopView;
