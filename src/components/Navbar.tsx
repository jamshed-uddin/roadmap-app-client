"use client";

import { useAppSelector } from "@/hooks/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { userInfo } = useAppSelector((state) => state.user);

  //to avoid hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className=" py-2">
      <ul className="flex items-center gap-4">
        <li className="flex-1">
          <Link href={"/"} className="text-xl font-bold">
            UpTrack
          </Link>
        </li>
        <li>
          <Link href={"/roadmaps"} className="">
            Roadmaps
          </Link>
        </li>
        <li>
          {userInfo ? (
            <Link
              href={"/account"}
              className="bg-indigo-600 rounded-md text-slate-100 px-3 py-1.5 active:scale-95 font-medium cursor-pointer"
            >
              Account
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="bg-indigo-600 rounded-md text-slate-100 px-3 py-1.5 active:scale-95 font-medium cursor-pointer"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
