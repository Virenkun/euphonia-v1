"use client";

import React, { useRef, useEffect } from "react";

interface AutoPlayVideoProps {
  src: string;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({
  src,
  muted = true,
  loop = true,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Video failed to play automatically:", error);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className={`w-full object-fill rounded-lg ${className} border-4 border-purple-500 p-2`}
      autoPlay
      muted={muted}
      loop={loop}
      playsInline
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default AutoPlayVideo;
