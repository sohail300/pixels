import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Zap,
  Phone,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  QrCode,
  History,
  DownloadIcon,
  Images,
  Fullscreen,
} from "lucide-react";
import Image from "next/image";

const AhlanPromo = () => {
  const details = [
    {
      title: "Curated Collection",
      description: "Discover handpicked wallpapers just for you",
      icon: <Images className="h-6 w-6" />,
    },
    {
      title: "High-Resolution Art",
      description: "Access HD wallpapers for a stunning display",
      icon: <Fullscreen className="h-6 w-6" />,
    },
    {
      title: "Download",
      description: "Easily download wallpapers to use anytime",
      icon: <DownloadIcon className="h-6 w-6" />,
    },
    {
      title: "Like",
      description: "Save your favorite wallpapers for later",
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 w-full h-full absolute z-[-10]">
        <div className="h-[15vh] col-span-1 border border-slate-100"></div>
        <div className="h-[15vh] col-span-1 border border-slate-100"></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4 p-4 sm:p-8 md:p-16 md:px-24 relative">
        <div className="flex-1">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-[#515050] via-[#020202] to-[#404040] bg-clip-text text-transparent">
              Why To Choose
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-0 bg-gradient-to-r from-[#515050] via-[#020202] to-[#404040] bg-clip-text text-transparent">
              And Use Pixels?
            </h2>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            {details.map((feature, index) => (
              <Card key={index} className={`border-none bg-transparent ${index % 2 === 0 ? 'self-start' : 'self-end sm:self-start'}`}>
                <CardContent className={`flex flex-col p-3 sm:p-4 ${index % 2 === 0 ? 'items-start' : 'items-end sm:items-start text-right sm:text-left'}`}>
                  <div className={`mb-3 sm:mb-4 rounded-full shadow-lg p-2 sm:p-3 bg-white ${index % 2 === 1 ? 'ml-auto sm:ml-0' : ''}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end items-center mt-4 md:mt-0">
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md md:max-w-none h-auto rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default AhlanPromo;
