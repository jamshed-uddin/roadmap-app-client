import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();
  const { isAuthenticated } = await auth();

  return (
    <nav className=" py-1">
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
          {isAuthenticated ? (
            <div>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={
                    (user?.externalAccounts[0].imageUrl as string) ||
                    (user?.imageUrl as string)
                  }
                  alt={user?.fullName || "User avatar"}
                  height={20}
                  width={30}
                  className="rounded-full h-full  w-full object-cover"
                />
              </div>
              <SignOutButton />
            </div>
          ) : (
            <div
              role="button"
              className="bg-indigo-600 rounded-md text-slate-100 px-3 py-1.5 active:scale-95 font-medium cursor-pointer"
            >
              <SignInButton />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
