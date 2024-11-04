import React from "react";

const LaptopView = () => {
  return (
    <>
      <div className="bg-[#181818] flex flex-col justify-center items-center py-16">
        <div className="inline-block">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FCFCFC] to-[#959595] bg-clip-text text-transparent">
            Start using Pixels right now!
          </h2>
        </div>
        <div className=" w-[60%]">
          <img src="/laptop.png" alt="" className=" w-[100%]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-gray-200 px-16 w-4/5">
          <div className="p-4 text-center">
            <h3 className="text-3xl font-medium">100+</h3>
            <p className=" my-2 text-gray-400">100+ Wallpapers available</p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-3xl font-medium">50+</h3>
            <p className=" my-2 text-gray-400">50+ users downloaded the app</p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-3xl font-medium">200+</h3>
            <p className=" my-2 text-gray-400">200+ wallpapers downloaded</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaptopView;
