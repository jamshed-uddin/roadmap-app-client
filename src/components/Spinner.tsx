import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const Spinner = ({
  variant = "medium",
  borderColor,
  className,
}: {
  variant?: "small" | "medium" | "large";
  borderColor: "black" | "white";
  className?: string;
}) => {
  const spinnerVariant = {
    small: "w-3 h-3",
    medium: "w-5 h-5 ",
    large: "w-7 h-7 ",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "animate-spin border-2    rounded-full inline-block ",
          spinnerVariant[variant],
          borderColor === "white"
            ? "border-white border-t-transparent"
            : "border-black border-t-transparent",
          className
        )
      )}
    ></span>
  );
};

export default Spinner;
