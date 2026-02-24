import { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { playClickSound } from "@/lib/sounds";

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const springCfg = { damping: 25, stiffness: 350 };
  const x = useSpring(0, springCfg);
  const y = useSpring(0, springCfg);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [x, y]
  );

  const onOver = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement;
    setHovering(
      !!t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )
    );
  }, []);

  const onDown = useCallback(() => {
    setClicking(true);
    playClickSound();
    setTimeout(() => setClicking(false), 150);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.body.style.cursor = "none";
    const allInteractive = document.querySelectorAll("a, button, input, textarea, select");
    allInteractive.forEach((el) => ((el as HTMLElement).style.cursor = "none"));

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.body.style.cursor = "";
    };
  }, [isTouch, onMove, onOver, onDown]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference"
        animate={{
          width: hovering ? 44 : 12,
          height: hovering ? 44 : 12,
          scale: clicking ? 0.75 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
