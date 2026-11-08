import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, Captions } from "lucide-react";
import { parseVtt, cueAt, VttCue } from "../../utils/parseVtt";

interface TestimonialFilmProps {
  src: string;
  poster: string;
  captionsSrc?: string;
  /** brand = the early cinematic client-montage moment. featured = the
   *  selector experience's dominant film. proof = detail-page evidence
   *  scale. This is the one place sizing is decided — callers never
   *  hand-tune width; a new context gets a new variant here, not
   *  one-off classes at the call site. */
  variant?: "brand" | "featured" | "proof";
  className?: string;
  onPlayStart?: () => void;
}

// The canonical Zumetrix testimonial film — one design system for every
// real client video on the site, regardless of which page it appears on
// or what the source footage's own framing looks like. The outer "stage"
// (aspect ratio, corner radius, shadow, control language, caption safe
// area) is fixed; only its scale changes between variants. Playback is
// always user-initiated — a real person's voice never starts because
// someone scrolled past it.
const STAGE_SIZE: Record<NonNullable<TestimonialFilmProps["variant"]>, string> = {
  brand: "rounded-[2rem] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.75)]",
  featured: "rounded-[2rem] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.7)]",
  proof: "rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]",
};

const PLAY_BUTTON_SIZE: Record<NonNullable<TestimonialFilmProps["variant"]>, string> = {
  brand: "w-24 h-24 sm:w-28 sm:h-28",
  featured: "w-20 h-20 sm:w-24 sm:h-24",
  proof: "w-16 h-16 sm:w-20 sm:h-20",
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const TestimonialFilm: React.FC<TestimonialFilmProps> = ({
  src,
  poster,
  captionsSrc,
  variant = "proof",
  className = "",
  onPlayStart,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [ariaProgress, setAriaProgress] = useState(0);
  // On by default — while a film is muted (true for every autoplayed
  // moment until a visitor taps for sound), captions are the only way to
  // know what's being said, so there's nothing to opt into.
  const [ccOn, setCcOn] = useState(true);
  const [cues, setCues] = useState<VttCue[]>([]);
  const [activeCue, setActiveCue] = useState<VttCue | null>(null);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const [timecode, setTimecode] = useState({ current: 0, duration: 0 });
  const hasAutoplayedRef = useRef(false);

  const inView = useInView(sectionRef, { amount: 0.35 });

  // Reset to a clean, unplayed state whenever the source changes — this is
  // what makes switching between clients in the Homepage selector feel
  // deliberate rather than like the old video just kept running.
  useEffect(() => {
    setIsPlaying(false);
    setHasStarted(false);
    setIsMuted(true);
    setAriaProgress(0);
    setActiveCue(null);
    setShowSoundHint(false);
    setTimecode((t) => ({ current: 0, duration: t.duration }));
    hasAutoplayedRef.current = false;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [src]);

  // Captions are fetched lazily and only parsed once — burned-in captions
  // already cover most of these films, so this track stays off by default
  // and exists for the CC toggle and screen readers, not as a duplicate
  // overlay fighting the footage.
  useEffect(() => {
    if (!captionsSrc) {
      setCues([]);
      return;
    }
    let cancelled = false;
    fetch(captionsSrc)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setCues(parseVtt(text));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [captionsSrc]);

  // Autoplay is muted-only — every browser allows that unconditionally, so
  // this is the one autoplay behavior that actually works the same way on
  // Chrome, Safari, Firefox, and every mobile browser, instead of silently
  // failing on some of them. Sound always requires one real tap; nothing
  // running in a browser can promise otherwise.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView) {
      if (!video.paused) video.pause();
      return;
    }

    if (!hasAutoplayedRef.current) {
      hasAutoplayedRef.current = true;
      setHasStarted(true);
      onPlayStart?.();
      video.muted = true;
      video.play()
        .then(() => setShowSoundHint(true))
        .catch(() => {});
    } else if (video.paused) {
      video.play().catch(() => {});
    }
  }, [inView, onPlayStart]);

  useEffect(() => {
    const video = videoRef.current;
    const fill = progressFillRef.current;
    if (!video || !fill) return;

    const tick = () => {
      if (!isDraggingRef.current && video.duration) {
        fill.style.width = `${(video.currentTime / video.duration) * 100}%`;
        if (ccOn && cues.length) setActiveCue(cueAt(cues, video.currentTime));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, ccOn, cues]);

  const unmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    setShowSoundHint(false);
    if (video.paused) video.play().catch(() => {});
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!hasStarted) {
      setHasStarted(true);
      onPlayStart?.();
      video.play().catch(() => {});
      return;
    }
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  // While muted, the primary thing a click should do is turn sound on —
  // that's the action the visitor actually wants. Pausing is still
  // available, just not the first click's job while there's no sound yet.
  const handleStageClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) unmute();
    else togglePlay();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) unmute();
    else {
      video.muted = true;
      setIsMuted(true);
    }
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
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0.95, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28 }}
      className={`relative overflow-hidden border border-primary/15 ring-1 ring-inset ring-white/[0.03] ${STAGE_SIZE[variant]} ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.10),transparent_60%)] z-10" />
      {/* The stage is picture only. These films carry their own lower
          thirds, chapter cards and the Zumetrix mark in the bottom band, so
          nothing of ours is allowed to sit over the frame while it plays —
          the controls live in a rail of their own underneath (below). */}
      <div className="relative aspect-video bg-background">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            const video = videoRef.current;
            if (!video?.duration) return;
            setAriaProgress((video.currentTime / video.duration) * 100);
            setTimecode({ current: video.currentTime, duration: video.duration });
          }}
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video?.duration) setTimecode({ current: video.currentTime, duration: video.duration });
          }}
          onClick={handleStageClick}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        >
          {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" />}
        </video>

        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleStageClick}
              aria-label="Play video"
              className="btn-sheen absolute inset-0 flex items-center justify-center bg-black/25"
            >
              <motion.span
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-center rounded-full bg-background/80 backdrop-blur-xl border border-border/70 text-foreground ${PLAY_BUTTON_SIZE[variant]}`}
              >
                <Play size={variant === "brand" ? 34 : variant === "featured" ? 30 : 26} className="ml-1 fill-current" />
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* The console — one surface under the frame that holds everything
          that isn't picture. The seam is the timeline (a 2px hairline that
          grows under the pointer), and one row carries transport on the
          left, the live caption in the middle, timecode and CC on the
          right. Flat icons: on a dark rail a disc behind each icon is the
          default-skin tell, so hover gets a halo and nothing else. Nothing
          here ever sits over the footage — the films carry their own lower
          thirds, chapter cards and the Zumetrix mark down there. */}
      <div className="relative border-t border-white/[0.06] bg-[#0B0B0B]">
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
          className="group/bar absolute inset-x-0 -top-[5px] z-10 h-[11px] cursor-pointer touch-none"
        >
          <div className="absolute inset-x-0 top-[4px] h-[2px] bg-white/[0.08] transition-[height,top] duration-150 group-hover/bar:-top-px group-hover/bar:h-[4px]">
            <div ref={progressFillRef} className="relative h-full bg-primary/90" style={{ width: "0%" }}>
              <span className="absolute right-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 translate-x-1/2 scale-0 rounded-full bg-primary shadow-[0_0_0_3px_rgba(11,11,11,1)] transition-transform duration-150 group-hover/bar:scale-100" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4 px-2.5 sm:px-3 pt-2.5 pb-2 sm:py-0 sm:min-h-[64px]">
          {/* Caption — first in DOM order on phones (reads above the
              controls), middle column from sm: up. Crossfades per cue;
              fixed two-line box so the console never changes height. */}
          {ccOn && cues.length > 0 ? (
            <div className="order-first sm:order-none flex min-h-[2.6rem] items-center justify-center px-2 pb-1.5 sm:px-0 sm:pb-0" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={hasStarted ? activeCue?.start ?? "none" : "preview"}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className={`line-clamp-2 text-center text-[14px] leading-[1.35] sm:text-[15px] ${
                    hasStarted ? "text-foreground/85" : "text-muted-foreground/70"
                  }`}
                >
                  {hasStarted ? activeCue?.text ?? "" : cues[0]?.text ?? ""}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:block" />
          )}

          <div className="flex items-center justify-between sm:contents">
            <div className="flex items-center gap-1 sm:order-first">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/90 transition-colors duration-150 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {isPlaying ? <Pause size={17} className="fill-current" /> : <Play size={17} className="ml-0.5 fill-current" />}
              </button>
              {/* Sound. While the film runs muted the control says so in
                  words, once — then it's a plain icon like the others. */}
              {showSoundHint && isMuted ? (
                <button
                  onClick={unmute}
                  aria-label="Turn sound on"
                  className="btn-sheen inline-flex h-9 items-center gap-2 rounded-full border border-primary/35 bg-primary/10 pl-3 pr-3.5 text-[12px] font-semibold tracking-[0.01em] text-primary transition-colors duration-150 hover:bg-primary/15"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 motion-reduce:hidden" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Sound
                </button>
              ) : (
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/90 transition-colors duration-150 hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 sm:order-last">
              {timecode.duration > 0 && (
                <span className="px-1.5 font-mono text-[12px] tabular-nums text-muted-foreground/75" aria-live="off">
                  {formatTime(timecode.current)}
                  <span className="text-muted-foreground/70"> / {formatTime(timecode.duration)}</span>
                </span>
              )}
              {captionsSrc && cues.length > 0 && (
                <button
                  onClick={() => setCcOn((v) => !v)}
                  aria-label={ccOn ? "Turn off captions" : "Turn on captions"}
                  aria-pressed={ccOn}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                    ccOn ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Captions size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialFilm;
