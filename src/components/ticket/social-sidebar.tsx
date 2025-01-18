import React from "react";
import { Twitter, Share2 } from "lucide-react";

const SocialSidebar = ({ hackerName }: { hackerName: string }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleTwitterShare = () => {
    const tweetText = `Check out ${hackerName}'s hackNITR profile!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${hackerName}'s hackNITR Profile`,
          text: `Check out ${hackerName}'s hackNITR profile!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      <button
        onClick={handleTwitterShare}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-6 h-6 text-[#1DA1F2]" />
      </button>

      <button
        onClick={handleShare}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Share"
      >
        <Share2 className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default SocialSidebar;
