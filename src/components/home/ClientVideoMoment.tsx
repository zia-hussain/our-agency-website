import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "/videos/Reema-Testimonial.mp4";

const ClientVideoMoment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-border/40"
        >
          <div className="relative aspect-video bg-background">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* The clip already carries its own quote, name, and title —
                no extra caption layered on top. Just the mute control. */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute right-5 top-5 sm:right-6 sm:top-6 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/70 backdrop-blur-xl border border-border/70 text-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientVideoMoment;
