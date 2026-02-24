import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import portrait3 from "@/assets/portrait-3.jpg";

const images = [
  { src: portrait1, alt: "Natural light portrait photography" },
  { src: portrait2, alt: "Urban portrait photography" },
  { src: portrait3, alt: "Studio portrait with dramatic lighting" },
];

const PortraitImage = ({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="group"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

const PortraitSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.15);

  return (
    <section id="portraits" className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-6">
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              Portraits
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
              Portraits
            </h2>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Intimate moments, beautifully preserved.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {images.map((img, i) => (
            <PortraitImage key={i} {...img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortraitSection;
