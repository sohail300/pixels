import Image from "next/image";
import React from "react";

const AppDownload = () => {
  return (
    <>
      <div
        className="bg-[#181818] flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 pt-16 sm:pt-24 md:pt-32 px-4 sm:px-8"
        id="download-section"
      >
        <div className="bg-[#232323] mx-4 sm:mx-8 px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 flex flex-col md:flex-row rounded-2xl sm:rounded-3xl relative w-full sm:w-4/5">
          <div className="flex flex-col gap-4 sm:gap-6 z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-4 bg-gradient-to-r from-[#FCFCFC] to-[#959595] bg-clip-text text-transparent">
              Get Pixels to your mobile!
            </h2>
            <div className="flex flex-row gap-4 sm:gap-8">
              <Image
                src="/qr_code.png"
                alt="QR Code"
                width={400}
                height={60}
                className="w-24 sm:w-32 md:w-40 cursor-pointer"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 opacity-50 md:opacity-100">
            <Image
              src="/apk_store.png"
              alt="App Store and Play Store"
              width={400}
              height={40}
              className="w-32 sm:w-48 md:w-64 lg:w-80"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDownload;
