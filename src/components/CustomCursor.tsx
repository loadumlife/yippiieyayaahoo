import { useState, useEffect, useCallback, useRef } from "react";
import { playClickSound } from "@/lib/sounds";

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

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

    const style = document.createElement("style");
    style.textContent = "a,button,input,textarea,select,[role='button']{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.body.style.cursor = "";
      style.remove();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, onMove, onOver, onDown]);

  if (isTouch) return null;

  const size = hovering ? 36 : 8;
  const scale = clicking ? 0.7 : 1;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div
        className="rounded-full -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference"
        style={{
          width: size,
          height: size,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: "width 0.2s ease, height 0.2s ease, transform 0.15s ease",
          boxShadow: "0 0 12px 2px rgba(255,255,255,0.15)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
