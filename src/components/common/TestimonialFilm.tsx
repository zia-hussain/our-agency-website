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
  const hasAutoplayedRef = useRef(false);

  // Auto-hiding controls — brand variant only (the homepage hero moment).
  // Every other instance keeps its controls permanently visible; this one
  // fades them out after a couple of idle seconds while playing, the same
  // way any premium video player behaves, and brings them straight back on
  // the first sign of a cursor or touch.
  const isAutoHideVariant = variant === "brand";
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Controls show on hover and hide the instant the pointer actually
  // leaves the stage — not a guessed timeout, a real signal. Touch has no
  // "leave" to listen for, so touch alone keeps a short idle fallback.
  // Either way, nothing hides while paused/poster state — only while
  // actually playing.
  const clearHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const showControls = () => {
    if (!isAutoHideVariant) return;
    clearHideTimer();
    setControlsVisible(true);
  };

  const handleStagePointerMove = (e: React.PointerEvent) => {
    if (!isAutoHideVariant) return;
    showControls();
    if (e.pointerType === "touch") {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2000);
    }
  };

  const handleStagePointerLeave = (e: React.PointerEvent) => {
    if (!isAutoHideVariant || e.pointerType === "touch") return;
    clearHideTimer();
    if (isPlaying) setControlsVisible(false);
  };

  useEffect(() => {
    if (!isAutoHideVariant) return;
    if (!isPlaying) {
      clearHideTimer();
      setControlsVisible(true);
      return;
    }
    // Starts visible the moment playback begins, then fades on its own a
    // couple of seconds later if nothing ever interacts with the stage at
    // all (the one case pointer events alone can't cover).
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2500);
    return clearHideTimer;
  }, [isPlaying, isAutoHideVariant]);

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
      <div
        className="relative aspect-video bg-background"
        onPointerMove={isAutoHideVariant ? handleStagePointerMove : undefined}
        onPointerDown={isAutoHideVariant ? showControls : undefined}
        onPointerLeave={isAutoHideVariant ? handleStagePointerLeave : undefined}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          loop
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            const video = videoRef.current;
            if (video?.duration) setAriaProgress((video.currentTime / video.duration) * 100);
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

        {/* Playing muted, silently, is invisible — this is the one prompt   */}
        {/* that tells a visitor sound exists and is one tap away.           */}
        <AnimatePresence>
          {showSoundHint && isMuted && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={unmute}
              aria-label="Tap for sound"
              className="btn-sheen absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 p-2 sm:pl-3 sm:pr-3.5 sm:py-2 text-xs font-semibold text-white"
            >
              <VolumeX size={13} />
              {/* Full pill only from sm: up — below that, the vertically  */}
              {/* centered play button and a text pill in the same corner  */}
              {/* have too little room and visually crowd each other. */}
              <span className="hidden sm:inline">Tap for sound</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pt-10 pb-3 px-4 sm:px-5 transition-opacity duration-500 ease-out ${
            isAutoHideVariant && !controlsVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
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
            <div ref={progressFillRef} className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: "0%" }}>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 shadow-[0_0_0_3px_rgba(0,0,0,0.35)]" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="btn-sheen flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="ml-0.5 fill-current" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="btn-sheen flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
            {captionsSrc && cues.length > 0 && (
              <button
                onClick={() => setCcOn((v) => !v)}
                aria-label={ccOn ? "Turn off captions" : "Turn on captions"}
                aria-pressed={ccOn}
                className={`btn-sheen flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${ccOn ? "text-primary" : "text-white hover:text-primary"}`}
              >
                <Captions size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Captions live in their own reserved strip below the frame, not */}
      {/* layered over it — this footage already carries its own burned-in */}
      {/* captions and graphics at positions that move throughout, so no   */}
      {/* overlay position could promise to never sit near one. A fixed    */}
      {/* height (not sized to each cue) keeps the stage from jumping      */}
      {/* between lines as the film plays.                                 */}
      {ccOn && cues.length > 0 && (
        <div className="relative flex min-h-[3.25rem] items-center justify-center border-t border-white/[0.06] bg-background px-5 py-2.5 sm:min-h-[3.75rem] sm:px-8">
          <p className="max-w-[90%] text-center text-sm font-medium leading-snug text-foreground/90 sm:text-base">
            {activeCue?.text ?? ""}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TestimonialFilm;
