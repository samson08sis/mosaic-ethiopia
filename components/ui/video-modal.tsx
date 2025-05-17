import { X } from "lucide-react";

type VideoModalProps = {
  setShowVideo: (show: boolean) => void;
};

export default function VideoModal({ setShowVideo }: VideoModalProps) {
  return (
    <div className="video-modal" onClick={() => setShowVideo(false)}>
      <div className="video-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
          onClick={() => setShowVideo(false)}>
          <X className="h-8 w-8" />
        </button>
        <iframe
          src="https://player.vimeo.com/video/133876414?autoplay=1"
          title="Travel Video"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
