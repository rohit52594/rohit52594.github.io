import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — button that magnetically follows cursor on hover
 * with glow and spring physics.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary', // 'primary' | 'outline'
  className = '',
  target,
  rel,
  style = {},
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`btn btn-${variant} ${className}`}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}

      {/* Glow ring on hover */}
      {hovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 'inherit',
            border: '1px solid var(--accent)',
            boxShadow: '0 0 20px var(--accent-glow)',
            pointerEvents: 'none',
          }}
        />
      )}
    </Tag>
  );
}
