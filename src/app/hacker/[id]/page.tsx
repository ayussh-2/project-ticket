"use client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container mx-auto py-10 flex h-screen border-2 content-center">
      <Card>
        <CardHeader>
          <CardTitle>Hacker Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Name</div>
              <div className="col-span-3">{hacker?.name}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Email</div>
              <div className="col-span-3">{hacker?.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-semibold">Team Name</div>
              <div className="col-span-3">{hacker?.teamName}</div>
            </div>
            <div className="justify-between flex w-full mt-3">
              <button
                onClick={() => setTheme(1)}
                className="bg-[#206EA6] h-10 w-10"
              ></button>
              <button
                onClick={() => setTheme(2)}
                className="bg-[#BBD3D9] h-10 w-10"
              ></button>
              <button
                onClick={() => setTheme(3)}
                className="bg-[#4C1077] h-10 w-10"
              ></button>
              <button
                onClick={() => setTheme(4)}
                className="bg-[#FECF29] h-10 w-10"
              ></button>
              <button
                onClick={() => setTheme(5)}
                className="bg-[#14F195] h-10 w-10"
              ></button>
            </div>
          </div>
        </CardContent>
      </Card>
      {hacker && <Experience hacker={hacker} theme={theme} />}
    </div>
  );
}
