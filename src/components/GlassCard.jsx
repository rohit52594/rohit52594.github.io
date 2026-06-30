import { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * GlassCard — glassmorphism card with 3D tilt on hover.
 */
export default function GlassCard({
  children,
  className = '',
  style = {},
  tilt = true,
  glowOnHover = true,
  as = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !tilt) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-py * 6);
    rotateY.set(px * 6);
  }, [tilt, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={`glass ${className}`}
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Subtle halftone corner accent */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 110,
          height: 110,
          borderTopRightRadius: 'inherit',
          backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1.4px)',
          backgroundSize: '9px 9px',
          opacity: 0.1,
          WebkitMaskImage: 'radial-gradient(circle at top right, #000 0%, transparent 70%)',
          maskImage: 'radial-gradient(circle at top right, #000 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {children}

      {/* Hover glow border */}
      {glowOnHover && hovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 'inherit',
            border: '1px solid var(--glass-hover)',
            boxShadow: '0 0 24px var(--accent-glow)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
    </Tag>
  );
}
