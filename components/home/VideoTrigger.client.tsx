"use client";

import { useState } from "react";
import VideoModal from "./VideoModal.client";
import PlayIcon from "../ui/svgs/PlaySVG";

export default function VideoTrigger() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowVideo(true)}
        className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center group transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Play video">
        <PlayIcon />
      </button>

      {showVideo && <VideoModal setShowVideo={setShowVideo} />}
    </>
  );
}
