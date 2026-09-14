"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { SessionContext } from "@/providers/SessionProvider";

const Navbar: React.FC = () => {
  const sessionContext = useContext(SessionContext);

  const session = sessionContext?.session;
  const router = useRouter();

  const signin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Admin login failed:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  const signout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-ink-700/60 bg-ink-950/90 p-3 text-paper-100 backdrop-blur-md sm:p-4">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Pixels"
            width={32}
            height={32}
            className="h-7 w-7 rounded-sm sm:h-8 sm:w-8"
          />
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-paper-100">
            Pixels
          </span>
        </Link>

        {/* Desktop menu */}
        {session ? (
          <div className="hidden items-center space-x-3 md:flex">
            <Link href={"/upload"}>
              <Button className="rounded-sm bg-brand-accentColor text-ink-950 transition-colors hover:bg-brand-accentColor/90">
                Upload
              </Button>
            </Link>

            <Button
              className="rounded-sm border border-red-500/40 bg-transparent text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
              onClick={signout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden items-center space-x-3 md:flex">
            <Button
              className="rounded-sm bg-brand-accentColor text-ink-950 transition-colors hover:bg-brand-accentColor/90"
              onClick={signin}
            >
              Admin login
            </Button>
          </div>
        )}

        {/* Mobile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <button className="p-2 text-paper-100">
              <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </DropdownMenuTrigger>
          {session ? (
            <DropdownMenuContent
              align="end"
              className="border-ink-700 bg-ink-900 text-paper-100"
            >
              <Link href={"/upload"}>
                <DropdownMenuItem className="focus:bg-ink-800 focus:text-paper-100">
                  Upload
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-red-400 focus:bg-ink-800 focus:text-red-300"
                onClick={signout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent
              align="end"
              className="border-ink-700 bg-ink-900 text-paper-100"
            >
              <DropdownMenuItem
                className="focus:bg-ink-800 focus:text-paper-100"
                onClick={signin}
              >
                Admin login
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
