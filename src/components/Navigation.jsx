import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/resume';
import { useScrollProgress } from '../context/ScrollContext';

/** Minimal section-dot rail only — no top/bottom text nav. */
export default function Navigation() {
  const { scrollTo } = useScrollProgress();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = 'hero';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', right: 'clamp(12px, 2vw, 22px)', top: '50%',
        transform: 'translateY(-50%)', zIndex: 100,
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
      }}
      aria-label="Section navigation"
    >
      {navLinks.map(({ id, label }) => {
        const active = activeSection === id;
        const isHover = hovered === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(id)}
            onBlur={() => setHovered(null)}
            aria-label={`Go to ${label}`}
            aria-current={active ? 'true' : undefined}
            style={{
              position: 'relative', border: 'none', padding: 0, cursor: 'pointer',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              width: 18, height: 18,
            }}
          >
            {/* hover label pill */}
            <AnimatePresence>
              {isHover && (
                <motion.span
                  initial={{ opacity: 0, x: 8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.9 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', right: 'calc(100% + 14px)', top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 14px', borderRadius: 100, whiteSpace: 'nowrap',
                    fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? '#c8ff2d' : 'var(--text-primary)',
                    background: 'rgba(10,10,9,0.82)',
                    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                    border: `1px solid ${active ? 'rgba(200,255,45,0.4)' : 'rgba(200,255,45,0.16)'}`,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  {label}
                  {/* little arrow connector */}
                  <span style={{
                    position: 'absolute', right: -4, top: '50%',
                    width: 8, height: 8, transform: 'translateY(-50%) rotate(45deg)',
                    background: 'rgba(10,10,9,0.82)',
                    borderRight: `1px solid ${active ? 'rgba(200,255,45,0.4)' : 'rgba(200,255,45,0.16)'}`,
                    borderTop: `1px solid ${active ? 'rgba(200,255,45,0.4)' : 'rgba(200,255,45,0.16)'}`,
                  }} />
                </motion.span>
              )}
            </AnimatePresence>

            {/* dot */}
            <span style={{
              width: active ? 12 : 8, height: active ? 12 : 8,
              borderRadius: '50%',
              background: active || isHover ? '#c8ff2d' : 'rgba(243,239,228,0.22)',
              boxShadow: active
                ? '0 0 14px rgba(200,255,45,0.65)'
                : isHover ? '0 0 10px rgba(200,255,45,0.5)' : 'none',
              transform: isHover && !active ? 'scale(1.3)' : 'scale(1)',
              transition: 'all 320ms cubic-bezier(0.16,1,0.3,1)',
            }} />
          </button>
        );
      })}
    </motion.div>
  );
}
