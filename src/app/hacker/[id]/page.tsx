import { Metadata } from "next";
import HackerPage from "./client-page";
import { getHackerById } from "@/firebase/hackerOps";
import { Hacker } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

async function getMetadata(hackerDetails: Hacker): Promise<Metadata> {
  if (!hackerDetails) {
    return {
      title: "Hacker Not Found",
    };
  }

  return {
    title: `${hackerDetails.name} | hackNITR`,
    description: `Check out ${hackerDetails.name}'s hackNITR profile!`,
    openGraph: {
      title: `${hackerDetails.name} is attending hackNITR`,
      description: `Check out ${hackerDetails.name}'s hackNITR profile!`,
      images: [
        {
          url: `/api/og?name=${encodeURIComponent(hackerDetails.name)}`,
          width: 1200,
          height: 630,
          alt: `${hackerDetails.name}'s hackNITR profile`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${hackerDetails.name} is attending hackNITR`,
      description: `Check out ${hackerDetails.name}'s hackNITR ticket!`,
      images: [`/api/og?name=${encodeURIComponent(hackerDetails.name)}`],
    },
  };
}

export default async function Page({ params }: Props) {
  const hackerDetails = await getHackerById(params.id);
  if (!hackerDetails) {
    notFound();
  }
  return <HackerPage hacker={hackerDetails} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hackerDetails = await getHackerById(params.id);
  return getMetadata(hackerDetails!);
}
