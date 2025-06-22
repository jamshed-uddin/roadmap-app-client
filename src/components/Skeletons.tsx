export const RoadmapListSkeleton = () => {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded-lg px-3 py-1.5 h-10 w-32 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export const RoadmapDetailsSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-300 animate-pulse rounded-xl w-1/5 h-12"></div>
      <div className=" space-y-3">
        <div className="bg-gray-300 animate-pulse rounded-xl  h-8"></div>
        <div className="bg-gray-300 animate-pulse rounded-xl w-3/4 h-8"></div>
      </div>

      <div className="space-y-3 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 animate-pulse rounded-xl w-full lg:w-1/2 h-8"
          ></div>
        ))}
      </div>
    </div>
  );
};
