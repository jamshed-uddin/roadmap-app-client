import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center pb-4 pt-5">
      <Link href={"/"} className="text-xl font-bold">
        UpTrack
      </Link>

      <Link href={"/roadmaps"} className="">
        Roadmaps
      </Link>
      <h4 className="text-sm">
        Copyright © {new Date().getFullYear()} UpTrack
      </h4>
    </div>
  );
};

export default Footer;
