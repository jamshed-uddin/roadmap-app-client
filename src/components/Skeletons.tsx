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
