import { createContext, useContext, useRef, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const ScrollContext = createContext({ progress: 0, scrollRef: null });

export function ScrollProvider({ children }) {
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v;
  });

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
