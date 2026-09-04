import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "/videos/Reema-Testimonial.mp4";

const ClientVideoMoment: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Live (not "once") — the video should start and stop every time the
  // section crosses the viewport, not just the first time.
  const inView = useInView(sectionRef, { amount: 0.5 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-border/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="relative aspect-video bg-background">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Center play affordance — shown whenever paused, whether by the
                user or because the section scrolled out of view. */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center bg-black/25"
                >
                  <motion.span
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/80 backdrop-blur-xl border border-border/70 text-foreground"
                  >
                    <Play size={26} className="ml-1 fill-current" />
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Bottom control bar — play/pause, seekable progress, mute */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pt-10 pb-3 px-4 sm:px-5">
              <div
                onClick={handleSeek}
                role="slider"
                aria-label="Seek video"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="relative h-1 w-full rounded-full bg-white/20 cursor-pointer mb-2.5"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-primary transition-colors duration-150"
                >
                  {isPlaying ? (
                    <Pause size={18} className="fill-current" />
                  ) : (
                    <Play size={18} className="ml-0.5 fill-current" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-primary transition-colors duration-150"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientVideoMoment;
