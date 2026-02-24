import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import InstagramButton from "@/components/InstagramButton";
import ConcertSection from "@/components/ConcertSection";
import PortraitSection from "@/components/PortraitSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleComplete} />}
      <CustomCursor />
      {introComplete && <InstagramButton />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
          <div className="text-center px-6">
            <motion.p
              className="text-muted-foreground text-xs tracking-[0.35em] uppercase mb-8 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Concert &amp; Portrait Photography
            </motion.p>
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-[10rem] text-foreground leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              death of
              <br />
              <span className="italic">a heart</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-10 text-lg max-w-sm mx-auto font-body font-light"
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Capturing moments that resonate.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.div
                className="w-px h-16 bg-border mx-auto"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
              />
            </motion.div>
          </div>
        </section>

        <ConcertSection />
        <PortraitSection />
        <ContactSection />
      </motion.div>
    </>
  );
};

export default Index;
