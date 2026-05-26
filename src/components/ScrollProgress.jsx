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
        background: 'linear-gradient(90deg, #7c6aff, #36d7c7, #ff6b9d)',
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
          background: '#36d7c7',
          boxShadow: '0 0 12px rgba(54, 215, 199, 0.6), 0 0 24px rgba(54, 215, 199, 0.3)',
        }}
      />
    </motion.div>
  );
}
