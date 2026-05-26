import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/resume';
import { useScrollProgress } from '../context/ScrollContext';

export default function Navigation() {
  const { scrollTo } = useScrollProgress();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Show navbar after scrolling down a bit */
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = 'hero';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop nav */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              borderRadius: 16,
              background: 'rgba(10, 10, 26, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(124, 106, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            id="main-nav"
          >
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: 10,
                  border: 'none',
                  background: activeSection === id ? 'rgba(124, 106, 255, 0.15)' : 'transparent',
                  color: activeSection === id ? '#a18aff' : 'rgba(232, 230, 240, 0.6)',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) e.target.style.color = '#e8e6f0';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) e.target.style.color = 'rgba(232, 230, 240, 0.6)';
                }}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#7c6aff',
                      boxShadow: '0 0 8px rgba(124, 106, 255, 0.6)',
                      transform: 'translateX(-50%)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 110,
          width: 44,
          height: 44,
          borderRadius: 12,
          border: '1px solid rgba(124, 106, 255, 0.2)',
          background: 'rgba(10, 10, 26, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer',
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
        className="mobile-menu-btn"
      >
        <span style={{
          display: 'block', width: 18, height: 1.5, borderRadius: 2,
          background: '#a18aff',
          transform: mobileOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
          transition: 'all 300ms ease',
        }} />
        <span style={{
          display: 'block', width: 18, height: 1.5, borderRadius: 2,
          background: '#a18aff',
          opacity: mobileOpen ? 0 : 1,
          transition: 'all 300ms ease',
        }} />
        <span style={{
          display: 'block', width: 18, height: 1.5, borderRadius: 2,
          background: '#a18aff',
          transform: mobileOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
          transition: 'all 300ms ease',
        }} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 105,
              background: 'rgba(5, 5, 16, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            {navLinks.map(({ id, label }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => { scrollTo(id); setMobileOpen(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === id ? '#a18aff' : 'rgba(232, 230, 240, 0.7)',
                  fontSize: 24,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '12px 32px',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          #main-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
