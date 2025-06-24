"use client";

import React, { Suspense } from "react";
import Roadmaps from "./Roadmaps";

const RoadmapsWrapper = () => {
  return (
    <Suspense>
      <Roadmaps />
    </Suspense>
  );
};

export default RoadmapsWrapper;
