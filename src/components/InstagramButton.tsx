import { motion } from "framer-motion";

// ──── Editable Instagram settings ────
const INSTAGRAM_HANDLE = "suchislifeisuppose";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
// ──────────────────────────────────────

const InstagramButton = () => {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground text-xs font-body tracking-wide hover:bg-card transition-colors duration-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 3.5 }}
    >
      {/* Pulsing live dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-destructive/60 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-destructive to-accent" />
      </span>
      What I'm up to
    </motion.a>
  );
};

export default InstagramButton;
