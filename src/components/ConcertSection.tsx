import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import concert1 from "@/assets/concert-1.jpg";
import concert2 from "@/assets/concert-2.jpg";
import concert3 from "@/assets/concert-3.jpg";

const images = [
  { src: concert1, alt: "Live concert with dramatic stage lighting", aspect: "aspect-[16/9]" },
  { src: concert2, alt: "Close-up performer on stage", aspect: "aspect-[4/5]" },
  { src: concert3, alt: "Band performing for crowd", aspect: "aspect-[4/5]" },
];

const ConcertImage = ({
  src,
  alt,
  aspect,
  index,
}: {
  src: string;
  alt: string;
  aspect: string;
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className={`${aspect} overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        {/* Glow border on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg ring-1 ring-white/10 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const ConcertSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.15);

  return (
    <section
      id="concerts"
      className="relative min-h-screen py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Animated concert lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="concert-light concert-light-1" />
        <div className="concert-light concert-light-2" />
        <div className="concert-light concert-light-3" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Live Music
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>
              Concerts
            </h2>
            <p className="max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Capturing the raw energy and emotion of live performances.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 space-y-6">
          <ConcertImage {...images[0]} index={0} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConcertImage {...images[1]} index={1} />
            <ConcertImage {...images[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcertSection;
