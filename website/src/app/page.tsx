import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LaptopView from "@/components/LaptopView";
import AppDownload from "@/components/AppDownload";
import WhyToChoose from "@/components/WhyToChoose";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <>
      <Hero />
      <WhyToChoose />
      <LaptopView />
      <AppDownload />
      <Footer />
    </>
  );
}
