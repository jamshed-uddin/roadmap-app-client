import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ClerkAuthProvider from "@/providers/ClerkAuthProvider";
import Navbar from "@/components/Navbar";

const ibmPlex = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UpTrack",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlex.className}   max-w-[100rem] mx-auto min-h-screen bg-slate-100 text-slate-800 ml-20 mr-20`}
      >
        <ClerkAuthProvider>
          <Navbar />
          <main className="mt-5">{children}</main>
        </ClerkAuthProvider>
      </body>
    </html>
  );
}
