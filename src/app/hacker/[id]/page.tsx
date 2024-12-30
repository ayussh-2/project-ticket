"use client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirebaseOperation } from "@/hooks/use-firebaseOps";
import { useEffect, useState } from "react";
import { Hacker } from "@/types";
import Loader from "@/components/ui/loader";

export default function HackerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { execute, isLoading } = useFirebaseOperation("getHackerById");
  const [hacker, setHacker] = useState<Hacker | null>(null);
  const [hackerId, setHackerId] = useState<string | null>(null);
  const [hackerFound, setHackerFound] = useState<boolean>(true);

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
    <div className="container mx-auto py-10">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
