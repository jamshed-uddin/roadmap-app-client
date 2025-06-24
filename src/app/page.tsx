import Hero from "@/components/Hero";
import Roadmaps from "@/components/Roadmaps";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Suspense>
        <Roadmaps />
      </Suspense>
    </div>
  );
}
