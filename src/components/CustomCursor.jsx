import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — a soft acid dot + trailing ring that reacts to interactive
 * elements. Only mounts on fine-pointer (mouse) devices and respects
 * reduced-motion. Interactive targets are detected via tag/role or a
 * `data-cursor="hover"` attribute.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea, [role="button"]')) {
        setHovering(true);
      }
    };
    const out = (e) => {
      const t = e.target;
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea, [role="button"]')) {
        setHovering(false);
      }
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mouseout', out, { passive: true });
    window.addEventListener('mousedown', downH);
    window.addEventListener('mouseup', upH);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', downH);
      window.removeEventListener('mouseup', upH);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 56 : 30;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          translateX: ringX, translateY: ringY,
          x: '-50%', y: '-50%',
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: ringSize, height: ringSize,
            opacity: hovering ? 0.9 : 0.5,
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            width: 30, height: 30, borderRadius: '50%',
            border: '1.5px solid #c8ff2d',
            boxSizing: 'border-box',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          translateX: dotX, translateY: dotY,
          x: '-50%', y: '-50%',
        }}
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#c8ff2d',
            boxShadow: '0 0 10px rgba(200,255,45,0.8)',
          }}
        />
      </motion.div>
    </>
  );
}
