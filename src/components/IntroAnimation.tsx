import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { playShutterSound } from "@/lib/sounds";

interface IntroAnimationProps {
  onComplete: () => void;
}

const navLinks = [
  { label: "concerts", id: "concerts" },
  { label: "portraits", id: "portraits" },
  { label: "get in touch", id: "contact" },
];

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"reveal" | "visible" | "out" | "done">("reveal");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("visible"), 800),
      setTimeout(() => playShutterSound(), 1500),
      setTimeout(() => setPhase("out"), 2400),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  const scrollTo = (id: string) => {
    setPhase("out");
    setTimeout(() => {
      onComplete();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Bar-reveal title */}
      <div className="relative overflow-hidden">
        <h1
          className="font-display text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] lowercase select-none"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          deathofaheart.com
        </h1>
        {/* Sweeping reveal bar */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ x: "0%" }}
          animate={{ x: "101%" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        />
      </div>

      {/* Nav links below */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {navLinks.map((link, i) => (
          <motion.button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="group flex items-center gap-2 text-sm md:text-base tracking-[0.15em] lowercase font-body transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: "easeOut" }}
          >
            <span>{link.label}</span>
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
              →
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
