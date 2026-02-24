import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

// ──── Easily editable contact info ────
const CONTACT_EMAIL = "hello@deathofaheart.com";
const INSTAGRAM_HANDLE = "suchislifeisuppose";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
// ──────────────────────────────────────

const ContactSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.15);

  return (
    <section id="contact" className="min-h-screen py-32 bg-background flex items-center">
      <div className="container mx-auto px-6">
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-[1.1]">
              Want me to shoot at your concert? Let's make it happen.
            </h2>

            <div className="flex flex-col gap-5 mt-12">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                <Mail size={18} />
                <span className="text-lg font-body">{CONTACT_EMAIL}</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                <Instagram size={18} />
                <span className="text-lg font-body">@{INSTAGRAM_HANDLE}</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <motion.a
              href={`mailto:${CONTACT_EMAIL}?subject=Concert Photography Inquiry`}
              className="cta-button mt-16"
              whileTap={{ scale: 0.97 }}
            >
              Want me to shoot at your concert? Get in contact
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>

        <div className="mt-32 pt-8 border-t border-border/40">
          <p className="text-muted-foreground/50 text-sm font-body">
            © {new Date().getFullYear()} deathofaheart. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
