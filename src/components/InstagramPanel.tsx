import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ──── Editable Instagram settings ────
const INSTAGRAM_HANDLE = "suchislifeisuppose";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
// ──────────────────────────────────────

const InstagramPanel = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Vertical tab on left edge */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center group"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        aria-label="Open Instagram panel"
      >
        <div className="relative flex items-center justify-center py-6 px-1.5 rounded-r-lg bg-card/60 backdrop-blur-md border border-l-0 border-border/30 transition-all duration-300 group-hover:px-2.5 group-hover:bg-card/80 group-hover:border-border/50">
          <span
            className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-200"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Instagram
          </span>
        </div>
      </motion.button>

      {/* Backdrop + Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop blur */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Panel – left slide on desktop, bottom drawer on mobile */}
            <motion.div
              ref={panelRef}
              className={
                isMobile
                  ? "fixed bottom-0 left-0 right-0 z-[70] bg-card border-t border-border rounded-t-2xl p-6"
                  : "fixed top-0 left-0 bottom-0 z-[70] w-80 bg-card border-r border-border p-8 flex flex-col justify-center"
              }
              initial={isMobile ? { y: "100%" } : { x: "-100%" }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: "100%" } : { x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className={isMobile ? "" : "space-y-6"}>
                {/* Profile circle */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <span className="font-display text-xl text-primary-foreground lowercase">d</span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">
                      @{INSTAGRAM_HANDLE}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      See what I'm up to.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-body tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  View on Instagram
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstagramPanel;
