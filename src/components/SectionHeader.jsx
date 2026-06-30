import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * SectionHeader — cinematic enter/exit tied to scroll progress.
 * Matches the Contact section's scale + opacity choreography.
 */
export default function SectionHeader({ sectionRef, children, centered = false, style = {} }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.08, 0.38], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0.08, 0.32], [0, 1]);
  const y = useTransform(scrollYProgress, [0.08, 0.38], [44, 0]);

  return (
    <motion.div style={{ scale, opacity, y, textAlign: centered ? 'center' : 'left', ...style }}>
      {children}
    </motion.div>
  );
}
