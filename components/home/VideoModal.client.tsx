"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type VideoModalProps = {
  setShowVideo: (show: boolean) => void;
};

export default function VideoModal({ setShowVideo }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowVideo(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowVideo]);

  return (
    <div className="video-modal" onClick={() => setShowVideo(false)}>
      <div className="video-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
          onClick={() => setShowVideo(false)}
          aria-label="Close video">
          <X className="h-8 w-8" />
        </button>
        <iframe
          src="https://player.vimeo.com/video/133876414?autoplay=1"
          title="Travel Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="eager"></iframe>
      </div>
    </div>
  );
}
