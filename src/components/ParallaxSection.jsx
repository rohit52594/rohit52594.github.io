import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxSection — wraps a section and provides scroll-linked transforms.
 * Uses Framer Motion's useScroll to track when the section enters/exits viewport.
 *
 * Props:
 *  - id: section id for navigation
 *  - className: additional class names
 *  - style: additional inline styles
 *  - children: section content
 *  - fadeIn: whether to fade in on enter (default true)
 *  - scaleDown: whether to scale down on exit (default false)
 */
export default function ParallaxSection({
  id,
  className = '',
  style = {},
  children,
  fadeIn = true,
  scaleDown = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fade in as section enters viewport
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    fadeIn ? [0, 1, 1, 0.3] : [1, 1, 1, 1]
  );

  // Optional scale-down on exit
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    scaleDown ? [0.95, 1, 1, 0.96] : [1, 1, 1, 1]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${className}`}
      style={{
        opacity,
        scale,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </motion.section>
  );
}

/**
 * useParallax — hook to get parallax transforms for a given ref.
 * Returns the section's scrollYProgress so children can derive transforms.
 */
export function useParallax(targetRef, offset = ['start end', 'end start']) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });
  return scrollYProgress;
}
