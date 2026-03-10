import React, { useState, useRef, useCallback } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'MEwdfRxANKM';

const GoNanoVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      const newMuted = !isMuted;
      // YouTube IFrame API postMessage commands
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: newMuted ? 'mute' : 'unMute',
        }),
        '*'
      );
      setIsMuted(newMuted);
    }
  }, [isMuted]);

  return (
    <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="relative pb-[56.25%] sm:pb-[100%] lg:pb-[177.78%] h-0 bg-gray-900">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`}
          title="GoNano Nanotechnology Demo"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
        {/* Mute/Unmute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-colors backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4 sm:p-6 bg-card">
        <h4 className="font-bold text-base sm:text-lg mb-2">See GoNano in Action</h4>
        <p className="text-sm text-muted-foreground">
          Watch our demonstration of GoNano's protective nanotechnology.
        </p>
      </div>
    </div>
  );
};

export default GoNanoVideo;
