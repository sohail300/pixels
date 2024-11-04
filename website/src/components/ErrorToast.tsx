import Image from "next/image";
import React from "react";

const ErrorToast = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="relative flex w-full overflow-hidden rounded-lg text-sm shadow-xl backdrop-blur border border-white/20 bg-gradient-to-bl text-white from-orange-600/90 to-red-700/90 animate-[notif-enter_300ms]">
        {/* <Image
          alt=""
          src="/images/patterns/pattern-grid-11.svg"
          width="50"
          height="50"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-10"
          loading="lazy"
          style={{ color: "transparent" }}
        /> */}

        <div className="relative flex flex-1 items-start gap-3 p-4">
          <div className="mt-0.5 shrink-0 text-2xl">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-semibold">An error occurred</p>
            <p className="opacity-80">Token not found</p>
          </div>
        </div>
        <button className="relative flex shrink-0 cursor-pointer items-center justify-center border-l border-white/20 p-4 text-xs transition-colors hover:bg-white/10 active:bg-black/20">
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;
