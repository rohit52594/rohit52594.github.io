import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        background: 'linear-gradient(90deg, #c8ff2d, #ff5a1f)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
      }}
    >
      {/* Glow at the leading edge */}
      <div
        style={{
          position: 'absolute',
          right: -2,
          top: -4,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#c8ff2d',
          boxShadow: '0 0 12px rgba(200, 255, 45, 0.7), 0 0 24px rgba(200, 255, 45, 0.35)',
        }}
      />
    </motion.div>
  );
}
