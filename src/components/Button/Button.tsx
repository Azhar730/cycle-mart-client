import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text: string;
  isRounded?: boolean;
  arrow?: boolean;
  isFullWidth?: boolean;
  isReversed?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  type,
  text,
  arrow,
  isFullWidth,
  handleClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        "px-5 bg-transparent border border-blue-400 text-primary h-[50px] my-3 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden shadow-md hover:scale-100 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-blue-400 font-semibold before:z-[-1] before:rounded-lg hover:before:left-0 hover:text-[#fff] hover:border-none",
        {
          "w-full": isFullWidth,
        }
      )}
    >
      {text}
      {arrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </button>
  );
}