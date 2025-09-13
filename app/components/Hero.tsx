"use client";

import React, { useRef } from "react";

interface HeroProps {
  videoId: string;
}

export default function Hero({ videoId = "rIPwDmJVjjo" }: HeroProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from the URL if a full URL is provided
  const getVideoId = (videoIdOrUrl: string) => {
    if (
      videoIdOrUrl.includes("youtube.com") ||
      videoIdOrUrl.includes("youtu.be")
    ) {
      const url = new URL(videoIdOrUrl);
      if (videoIdOrUrl.includes("youtube.com")) {
        return url.searchParams.get("v") || videoIdOrUrl;
      } else {
        return url.pathname.split("/")[1] || videoIdOrUrl;
      }
    }
    return videoIdOrUrl;
  };

  const processedVideoId = getVideoId(videoId);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${processedVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${processedVideoId}&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      {/* Full overlay to prevent interaction with YouTube player */}
      <div
        className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
        onClick={(e) => e.preventDefault()}
      ></div>

      {/* Optional overlay for text or buttons */}
    </div>
  );
}
