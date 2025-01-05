"use client";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-6 bg-background text-foreground font-jakarta">
      {/* Main Container */}
      <div className="flex flex-col items-center space-y-4 text-center px-4">
        {/* Error Code */}
        <h1 className="text-8xl font-bold text-primary">404</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          Oops! The page you&apos;re looking for seems to have wandered off into
          the digital wilderness. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            variant="default"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "https://hacknitr.com/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Hack Nitr
          </Button>
        </div>
      </div>
    </div>
  );
}
