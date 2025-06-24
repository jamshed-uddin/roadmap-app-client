"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import clsx from "clsx";
import { removeUser } from "@/redux/features/userSlice";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const { userInfo } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

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
        <li className="relative">
          {userInfo ? (
            <Button onClick={() => setOpen((p) => !p)} className="">
              <span> Account</span>{" "}
              <ChevronDownIcon
                className={clsx(
                  "w-4 h-4 inline transition-all duration-300",
                  open ? "rotate-180" : "rotate-0"
                )}
              />
            </Button>
          ) : (
            <Link
              href={"/login"}
              className="bg-indigo-600 rounded-md text-slate-100 px-3 py-1.5 active:scale-95 font-medium cursor-pointer"
            >
              Login
            </Link>
          )}

          {open && (
            <ul
              className={clsx(
                " absolute top-10 px-4 py-2 rounded-md shadow-md bg-slate-50 text-sm space-y-2 "
              )}
            >
              <li>
                <Link href={"/account"} className="flex  items-center gap-2">
                  <Cog6ToothIcon className="w-4 h-4 " /> Settings
                </Link>
              </li>
              <li
                onClick={() => {
                  dispatch(removeUser());
                  setOpen(false);
                }}
                className="flex  items-center gap-2 cursor-pointer"
              >
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4 " /> Logout
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
