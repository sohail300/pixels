"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "./ui/button";
import Link from "next/link";
import CustomAvatarGroup from "./AvatarGroupComponent";

const Hero = () => {
  return (
    <div className="min-h-[40rem] md:h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col md:flex-row justify-between items-end w-full px-4 sm:px-8 md:px-16 absolute bottom-0 pb-0">
        <div className="px-4 z-10 py-8 md:pb-20 md:pt-0 flex flex-col items-center md:items-start w-full md:w-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 text-center md:text-left">
            Wallpapers <br />
            Tailored for you
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 md:mt-16 w-full sm:w-auto">
            <Link href="#download-section" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-brand-accentColor text-black hover:bg-[#]">
                Download for FREE
              </Button>
            </Link>
            <div className="hidden sm:block">
              <CustomAvatarGroup />
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-10 lg:mt-0 w-full md:w-auto flex justify-center md:justify-end">
          <Image
            src={"/hero.png"}
            width="220"
            height="100"
            className="w-auto h-full max-h-72 md:max-h-none rounded-xl object-cover object-center"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
