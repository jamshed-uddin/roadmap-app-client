import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const ClerkAuthProvider = ({ children }: { children: ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkAuthProvider;
