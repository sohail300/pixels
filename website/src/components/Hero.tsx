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
    <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-row justify-between items-end w-full px-16 absolute bottom-0">
        <div className="p-4 z-10 py-20 md:pt-0 flex flex-col items-start">
          <h1 className="text-4xl md:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
            Wallpapers <br />
            Tailored for you
          </h1>
          <div className=" flex gap-8 mt-16">
            <Link href="#download-section">
              <Button className=" bg-brand-accentColor text-black hover:bg-[#]">
                Get Started
              </Button>
            </Link>
            <CustomAvatarGroup />
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <Image
            src={"/hero.png"}
            width="220"
            height="100"
            className="w-auto h-full rounded-xl object-cover object-center"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
