"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
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
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const signout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#3D3D3D] to-[#1F1F1F] text-white p-4 fixed w-full top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-2xl font-bold">Pixels</div>
        </Link>

        {/* Desktop menu */}
        {session ? (
          <div className="hidden md:flex space-x-4 text-gray-200">
            <Link href={"/upload"}>
              <Button className="hove hover:text-black hover:bg-brand-accentColor/90 bg-brand-accentColor text-black">
                Upload
              </Button>
            </Link>

            <Button
              className="hove hover:text-black hover:bg-brand-accentColor/90 bg-red-500 text-black"
              onClick={signout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4 text-gray-200">
            <Button
              className="hove hover:text-black hover:bg-brand-accentColor/90 bg-brand-accentColor text-black"
              onClick={signin}
            >
              Login
            </Button>
          </div>
        )}

        {/* Mobile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
          </DropdownMenuTrigger>
          {session ? (
            <DropdownMenuContent align="end">
              <Link href={"/upload"}>
                <DropdownMenuItem>Upload</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-red-500"
                onClick={async () => {
                  await signOut();
                  router.replace("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
