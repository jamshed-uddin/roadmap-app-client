import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "react-hot-toast";

const ibmPlex = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlex.className}   lg:max-w-[100rem] ;g:mx-auto mx-2 min-h-screen bg-slate-100 text-slate-800 lg:ml-20 lg:mr-20 lg`}
      >
        <StoreProvider>
          <Toaster />
          <Navbar />
          <main className="my-5">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
