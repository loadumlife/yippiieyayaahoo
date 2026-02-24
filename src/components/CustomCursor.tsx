import { useState, useEffect, useCallback, useRef } from "react";
import { playClickSound } from "@/lib/sounds";

interface Trail {
  id: number;
  x: number;
  y: number;
}

let trailId = 0;

const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastTrail = useRef(0);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    // Spawn trail particle every 40ms
    const now = Date.now();
    if (now - lastTrail.current > 40) {
      lastTrail.current = now;
      const id = ++trailId;
      setTrails((prev) => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 350);
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
    };
  }, [isTouch, onMove, onOver, onDown]);

  if (isTouch) return null;

  const size = hovering ? 36 : 8;
  const scale = clicking ? 0.7 : 1;

  return (
    <>
      {/* Trail particles */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-white/20 mix-blend-difference"
          style={{
            width: 4,
            height: 4,
            transform: `translate(${t.x - 2}px, ${t.y - 2}px)`,
            opacity: 0,
            animation: "cursor-trail 350ms ease-out forwards",
          }}
        />
      ))}

      {/* Main cursor */}
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
            boxShadow: "0 0 12px 2px rgba(255,255,255,0.12)",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
