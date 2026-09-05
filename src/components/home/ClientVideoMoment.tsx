import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "/videos/Reema-Testimonial.mp4";

const ClientVideoMoment: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasAttemptedSoundRef = useRef(false);
  const isDraggingRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ariaProgress, setAriaProgress] = useState(0);

  // Live (not "once") — the video should start and stop every time the
  // section crosses the viewport, not just the first time.
  const inView = useInView(sectionRef, { amount: 0.5 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView) {
      video.pause();
      return;
    }

    // First time the video ever comes into view, try to play with sound —
    // browsers only allow this once the visitor has interacted with the
    // page (a click or tap anywhere counts). If it's blocked, fall back to
    // muted autoplay rather than leaving the video frozen. On every later
    // re-entry we just resume playback and leave the mute state exactly as
    // the visitor last set it.
    if (!hasAttemptedSoundRef.current) {
      hasAttemptedSoundRef.current = true;
      video.muted = false;
      video.play()
        .then(() => setIsMuted(false))
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    } else {
      video.play().catch(() => {});
    }
  }, [inView]);

  // Drive the progress fill directly every frame instead of on the
  // ~4x/sec `timeupdate` event, so the bar sweeps smoothly instead of
  // stepping.
  useEffect(() => {
    const video = videoRef.current;
    const fill = progressFillRef.current;
    if (!video || !fill) return;

    const tick = () => {
      if (!isDraggingRef.current && video.duration) {
        fill.style.width = `${(video.currentTime / video.duration) * 100}%`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

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

  const seekToClientX = (clientX: number) => {
    const bar = progressBarRef.current;
    const video = videoRef.current;
    const fill = progressFillRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    if (fill) fill.style.width = `${ratio * 100}%`;
    setAriaProgress(ratio * 100);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekToClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    seekToClientX(e.clientX);
  };
  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section ref={sectionRef} className="pt-8 pb-16 lg:pt-10 lg:pb-20 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/50 mb-6"
        >
          A client, unscripted
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-primary/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.03]"
        >
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.10),transparent_60%)] z-10" />
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
              onTimeUpdate={() => {
                const video = videoRef.current;
                if (video?.duration) setAriaProgress((video.currentTime / video.duration) * 100);
              }}
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

            {/* Bottom control bar — play/pause, drag-to-seek progress, mute */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pt-10 pb-3 px-4 sm:px-5">
              <div
                ref={progressBarRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                role="slider"
                aria-label="Seek video"
                aria-valuenow={Math.round(ariaProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="group/bar relative h-1 hover:h-1.5 transition-[height] duration-150 w-full rounded-full bg-white/20 cursor-pointer mb-2.5 touch-none"
              >
                <div
                  ref={progressFillRef}
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ width: "0%" }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 shadow-[0_0_0_3px_rgba(0,0,0,0.35)]" />
                </div>
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
