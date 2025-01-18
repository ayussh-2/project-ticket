"use client";
import { useState } from "react";
import { Hacker } from "@/types";

import Experience from "@/components/ticket/Experience";
import ThemeSelector from "@/components/ticket/theme-selector";
import SocialSidebar from "@/components/ticket/social-sidebar";

interface HackerPageProps {
  hacker: Hacker;
}

export default function HackerPage({ hacker }: HackerPageProps) {
  const [theme, setTheme] = useState(1);
  return (
    <>
      {hacker && (
        <div className="w-full h-screen content-center hacker-page">
          <div className="w-full h-[30vh] sm:h-[50vh] mt-5">
            <Experience hacker={hacker} theme={theme} />
          </div>
          <ThemeSelector setTheme={setTheme} />
          <p className="w-fit mx-auto text-xl sm:text-4xl md:text-5xl mt-16 font-poppins">
            <span className="text-[#E84B7D]">{hacker.name}</span> is attending
            hackNITR
          </p>
          <SocialSidebar hackerName={hacker.name} />
        </div>
      )}
    </>
  );
}
