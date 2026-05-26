import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxLayer — a layer that moves at a different speed than normal scroll.
 *
 * Props:
 *  - speed: multiplier for vertical movement (default 0.5)
 *           0 = static, 1 = moves with scroll, >1 = moves faster
 *           negative = moves opposite direction
 *  - horizontal: multiplier for horizontal movement (default 0)
 *  - fadeRange: [start, end] of scroll progress for opacity (default [0, 1])
 *  - scaleRange: [startScale, endScale] (default null — no scaling)
 *  - rotateRange: [startDeg, endDeg] (default null — no rotation)
 *  - className: additional class names
 *  - style: additional inline styles
 *  - children: layer content
 *  - as: element type (default 'div')
 */
export default function ParallaxLayer({
  speed = 0.5,
  horizontal = 0,
  fadeRange = null,
  scaleRange = null,
  rotateRange = null,
  className = '',
  style = {},
  children,
  as = 'div',
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Vertical parallax: move elements based on speed differential
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 200}px`, `${-speed * 200}px`]
  );

  // Horizontal parallax
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${horizontal * 120}px`, `${-horizontal * 120}px`]
  );

  // Optional opacity fade
  const opacity = fadeRange
    ? useTransform(scrollYProgress, fadeRange, [0, 1])
    : undefined;

  // Optional scale
  const scale = scaleRange
    ? useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]])
    : undefined;

  // Optional rotation
  const rotate = rotateRange
    ? useTransform(scrollYProgress, [0, 1], rotateRange)
    : undefined;

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        y,
        x,
        ...(opacity !== undefined && { opacity }),
        ...(scale !== undefined && { scale }),
        ...(rotate !== undefined && { rotate }),
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
