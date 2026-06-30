import { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';

const ScrollContext = createContext({ progress: 0, scrollRef: null });

export function ScrollProvider({ children }) {
  const scrollRef = useRef(0);
  const lenisRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v;
  });

  /* Lenis smooth scrolling — skipped under reduced-motion */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -10, duration: 1.3 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ progress: scrollYProgress, scrollRef, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext);
}
