import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#181818] flex flex-col justify-start items-center pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 text-gray-200 px-16 w-4/5">
          <div>
            <Image
              src="/logo.png"
              alt=""
              width={200}
              height={200}
              className="w-[65%] rounded-3xl"
            />
          </div>
          <div />
          <div className="p-4 flex flex-col">
            <p className=" my-2 font-semibold">Contact</p>
            <Link href="mailto:contact@heysohail.me">
              <p className=" my-2 text-gray-400">contact@heysohail.me</p>
            </Link>
            <Link href="mailto:sohailatwork10@gmail.com">
              <p className=" my-2 text-gray-400">sohailatwork10@gmail.com</p>
            </Link>
          </div>
          <div className="p-4 flex flex-col">
            <p className=" my-2 font-semibold">About</p>
            <Link href="/privacy-policy">
              <p className=" my-2 text-gray-400">Privacy Policy</p>
            </Link>
            <Link href="/terms-of-services">
              <p className=" my-2 text-gray-400">Terms of Services</p>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#1E1E1E] text-white py-3">
        <div className="container mx-auto text-center text-sm text-gray-200">
          &copy; {currentYear} Pixels. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
