import Image from "next/image";
import React from "react";

const SuccessToast = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="relative flex w-full overflow-hidden rounded-lg text-sm shadow-xl backdrop-blur border border-white/20 bg-gradient-to-bl text-white from-green-600/90 to-teal-700/90 animate-[notif-enter_300ms]">
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
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.707 10.707l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0z"></path>
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-semibold">Success!</p>
            <p className="opacity-80">Operation completed successfully</p>
          </div>
        </div>
        <button className="relative flex shrink-0 cursor-pointer items-center justify-center border-l border-white/20 p-4 text-xs transition-colors hover:bg-white/10 active:bg-black/20">
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;
