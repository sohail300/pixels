"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-[#3D3D3D] to-[#1F1F1F] text-white p-4 fixed w-full top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-2xl font-bold">Pixels</div>
        </Link>

        {/* Desktop menu */}
        {/* Logged In */}
        {/* 
        {isLoggedIn === true ? (
          <div className="hidden md:flex space-x-4 text-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger className=" rounded-full flex gap-4 bg-[#565656] justify-center items-center pl-2 pr-4 py-2">
                <Avatar>
                  <AvatarImage src="/sample-person.jpeg" sizes="md" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className=" text-base">User</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/profile"}>
                    <Button variant="ghost" className="">
                      <User className=" mr-4" />
                      Profile
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await signOut();
                      router.replace("/signin");
                    }}
                  >
                    <LogOut className=" mr-4 text-red-500" />
                    <span className="text-red-500">Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4 text-gray-200">
            <Link href={"/signin"}>
              <Button
                variant="ghost"
                className="hove hover:text-white hover:bg-[#565656]"
              >
                Signin
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile menu */}
        {/* 
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
          </DropdownMenuTrigger>
          {isLoggedIn === true ? (
            <DropdownMenuContent align="end">
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-red-500"
                onClick={async () => {
                  await signOut();
                  router.replace("/signin");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent align="end">
              <Link href={"/signin"}>
                <DropdownMenuItem>Signin</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
         */}
      </div>
    </nav>
  );
};

export default Navbar;
