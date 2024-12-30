import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export default function Loader({
  fullScreen = false,
  size = "md",
  className,
}: LoaderProps) {
  // Size mappings for the loader
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center space-y-4 text-center px-4",
    fullScreen && "h-screen w-full bg-background",
    className,
  );

  return (
    <div className={containerClasses}>
      {/* Animated Loader */}
      <div className="relative">
        {/* Primary loader */}
        <LoaderIcon
          className={cn("animate-spin text-primary", sizeMap[size])}
        />
        {/* Background loader for effect */}
        <div
          className={cn(
            "absolute top-0 left-0 animate-ping opacity-20 rounded-full bg-primary",
            sizeMap[size],
          )}
        />
      </div>
    </div>
  );
}
