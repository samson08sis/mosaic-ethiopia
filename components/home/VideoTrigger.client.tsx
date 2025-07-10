"use client";

import { useState } from "react";
import VideoModal from "./VideoModal.client";

export default function VideoTrigger() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        onClick={() => setShowVideo(true)}
        className="cursor-pointer hover:scale-105 transition-transform"
        aria-label="Play video"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === "Enter" && setShowVideo(true)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="40"
          cy="40"
          r="40"
          fill="white"
          fillOpacity="0.9"
          className="group-hover:fill-white transition-colors"
        />
        <path
          d="M52 40L34 50.3923L34 29.6077L52 40Z"
          fill="#E67E22"
          className="group-hover:scale-110 transition-transform origin-center"
        />
        <circle
          cx="40"
          cy="40"
          r="39"
          stroke="#0D9488"
          strokeWidth="2"
          className="group-hover:stroke-primary-600 transition-colors"
        />
      </svg>

      {showVideo && <VideoModal setShowVideo={setShowVideo} />}
    </>
  );
}
