"use client";
import { notFound } from "next/navigation";
import { useFirebaseOperation } from "@/hooks/use-firebaseOps";
import { useEffect, useState } from "react";
import { Hacker } from "@/types";
import Loader from "@/components/ui/loader";

import Experience from "@/components/ticket/Experience";

export default function HackerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { execute, isLoading } = useFirebaseOperation("getHackerById");
  const [hacker, setHacker] = useState<Hacker | null>(null);
  const [hackerId, setHackerId] = useState<string | null>(null);
  const [hackerFound, setHackerFound] = useState<boolean>(true);
  const [theme, setTheme] = useState(1);

  async function getHackerById() {
    if (!hackerId) return;
    const hackerDetails = await execute(hackerId);
    if (!hackerDetails) return setHackerFound(false);
    setHacker(hackerDetails);
  }

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      if (resolvedParams.id) {
        setHackerId(resolvedParams.id);
      }
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    document.body.style.backgroundImage =
      "url('https://res.cloudinary.com/diwmwhu0x/image/upload/v1737101818/Background_mwcbdq.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundColor = "#200818";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  useEffect(() => {
    if (hackerId) {
      getHackerById();
    }
  }, [hackerId]);

  if (!hackerFound) {
    notFound();
  }

  if (isLoading) {
    return (
      <Loader
        fullScreen
        size="lg"
        message="Please wait while we do magic...🪄"
      />
    );
  }

  return (
    <>
      {hacker && (
        <div className="w-full h-screen content-center">
          <div className="w-full h-[30vh] sm:h-[50vh] mt-5">
            <Experience hacker={hacker} theme={theme} />
          </div>
          <div className=" max-w-[500px] mx-auto my-6 flex justify-around">
            <button
              className="w-8 h-8 bg-[#206EA6]"
              onClick={() => setTheme(1)}
            ></button>
            <button
              className="w-8 h-8 bg-[#BBD3D9]"
              onClick={() => setTheme(2)}
            ></button>
            <button
              className="w-8 h-8 bg-[#4C1077]"
              onClick={() => setTheme(3)}
            ></button>
            <button
              className="w-8 h-8 bg-[#FECF29]"
              onClick={() => setTheme(4)}
            ></button>
            <button
              className="w-8 h-8 bg-[#14F195]"
              onClick={() => setTheme(5)}
            ></button>
          </div>
          <p className="w-fit mx-auto text-xl sm:text-4xl md:text-5xl mt-16">
            <span className="text-[#E84B7D]">{hacker.name}</span> is attending
            hackNITR
          </p>
          <p className="w-fit mx-auto text-base sm:text-2xl md:text-3xl mt-5">
            Register and get your ticket now
          </p>
          <div className="w-fit mx-auto mt-10 space-x-4">
            <button className="bg-[#F4E7D6] text-[#E84B7D] rounded-lg px-4 py-2">
              Twitter
            </button>
            <button className="bg-[#F4E7D6] text-[#E84B7D] rounded-lg px-4 py-2">
              LinkedIn
            </button>
            <button className="bg-[#F4E7D6] text-[#E84B7D] rounded-lg px-4 py-2">
              Copy Link
            </button>
          </div>
        </div>
      )}
    </>
  );
}
