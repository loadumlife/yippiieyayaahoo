import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { playShutterSound } from "@/lib/sounds";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"in" | "visible" | "out" | "done">("in");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("visible"), 600),
      setTimeout(() => playShutterSound(), 1500),
      setTimeout(() => setPhase("out"), 2100),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.p
        className="font-display text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] lowercase select-none"
        style={{ color: "rgba(255,255,255,0.85)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: phase === "in" || phase === "out" ? 0 : 1,
          y: phase === "in" ? 12 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        deathofaheart.com
      </motion.p>
    </motion.div>
  );
};

export default IntroAnimation;
