import React, { useRef, useEffect, useState } from "react";

const Reel = ({ videoSrc, user }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {}); // Safe play
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-[80vh] w-80 rounded-xl overflow-hidden bg-black shadow-lg shrink-0">
      {/* Lazy Load Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      />

      {/* Mute/Unmute */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white z-20"
      >
        <span className="material-symbols-outlined text-2xl">
          {isMuted ? "volume_off" : "volume_up"}
        </span>
      </button>

      {/* User Info */}
      <div className="absolute bottom-4 left-4 text-white z-10">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full border object-cover object-top aspect-square"
          />
          <span className="font-semibold text-sm">{user.name}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-4 text-white z-10">
        <button><span className="material-symbols-outlined text-3xl">favorite</span></button>
        <button><span className="material-symbols-outlined text-3xl">chat_bubble</span></button>
      
      </div>
    </div>
  );
};

export default Reel;
