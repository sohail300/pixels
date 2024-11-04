import React from "react";

const AppDownload = () => {
  return (
    <>
      <div
        className="bg-[#181818] flex flex-col justify-center items-center py-16 pt-32"
        id="download-section"
      >
        <div className=" bg-[#232323] mx-8 px-20 py-16 flex flex-row rounded-3xl relative w-4/5">
          <div className=" flex flex-col gap-4">
            <h2 className="text-5xl font-semibold mb-4 bg-gradient-to-r from-[#FCFCFC] to-[#959595] bg-clip-text text-transparent">
              Get Pixels to your
              <br />
              mobile!
            </h2>
            <div className=" flex flex-row gap-8">
              <img
                src="/google_play.webp"
                alt=""
                className=" w-[15%] cursor-pointer"
              />
              <img
                src="/google_play.webp"
                alt=""
                className=" w-[15%] cursor-pointer"
              />
            </div>
          </div>
          <div className=" absolute bottom-0 right-0">
            <img src="/download.png" alt="" className=" w-[75%]" />
          </div>
        </div>
        <div className="inline-block"></div>
        <div className=" w-[60%]"></div>
      </div>
    </>
  );
};

export default AppDownload;
