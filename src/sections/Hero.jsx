import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/resume';
import MagneticButton from '../components/MagneticButton';
import { useScrollProgress } from '../context/ScrollContext';
import ParallaxLayer from '../components/ParallaxLayer';

/* ─── Typing effect ─── */
function TypeWriter({ words, speed = 90, pause = 2000 }) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return (
    <span>
      {text}
      <span style={{
        display: 'inline-block', width: 3, height: '0.9em',
        background: 'var(--accent)', marginLeft: 3,
        animation: 'typing-cursor 1s step-end infinite',
        verticalAlign: 'text-bottom', borderRadius: 2,
      }} />
    </span>
  );
}

export default function Hero() {
  const { scrollTo } = useScrollProgress();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms — each layer at different speed
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.3]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* Decorative gradient orb — deepest layer (0.1x speed) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          width: 'clamp(400px, 50vw, 700px)',
          height: 'clamp(400px, 50vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 106, 255, 0.07) 0%, rgba(54, 215, 199, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          y: orbY,
          scale: orbScale,
        }}
      />

      {/* Floating grid pattern — very slow layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: gridY,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(124, 106, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 106, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', paddingTop: 100, paddingBottom: 80, zIndex: 2 }}>
        {/* Location tag — fastest layer */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontSize: 12, color: 'var(--text-muted)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: 36, display: 'flex', alignItems: 'center', gap: 10,
            fontWeight: 500,
          }}
        >
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: '#36d7c7', boxShadow: '0 0 10px rgba(54, 215, 199, 0.6)',
          }} />
          {profile.location}
        </motion.p>

        {/* Name — slow parallax (stays visible longest) */}
        <motion.div style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              maxWidth: 900,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="text-gradient">{profile.name.split(' ')[0]}</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>{profile.name.split(' ')[1]}</span>
          </motion.h1>
        </motion.div>

        {/* Title + Summary — medium parallax */}
        <motion.div style={{ y: subtitleY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{
              marginTop: 28,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 3vw, 2.4rem)',
              fontWeight: 400,
              color: 'var(--text-secondary)',
            }}
          >
            <TypeWriter words={[
              'Senior Software Engineer',
              'Scalable Systems Developer',
              'Full-Stack Engineer',
            ]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            style={{
              marginTop: 24, fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.9,
            }}
          >
            Building scalable enterprise & AI-driven applications with React.js,
            TypeScript, and Node.js. 7+ years of shipping production-grade software.
          </motion.p>
        </motion.div>

        {/* CTA buttons — fast parallax (fades early) */}
        <motion.div style={{ y: ctaY, opacity: ctaOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 16 }}
          >
            <MagneticButton variant="primary" onClick={() => scrollTo('experience')}>
              View Experience
            </MagneticButton>
            <MagneticButton variant="outline" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Social row */}
        <motion.div style={{ y: ctaY, opacity: ctaOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 32,
              paddingTop: 28, borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {[
              { label: profile.email, href: `mailto:${profile.email}` },
              { label: 'LinkedIn', href: profile.social.linkedin },
              { label: 'GitHub', href: profile.social.github },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="link-glow" style={{ fontSize: 13, fontWeight: 500 }}>
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating stats badge — slowest parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 'clamp(100px, 16vh, 180px)',
            right: 'clamp(0px, 3vw, 60px)',
            y: badgeY,
          }}
          className="hero-badge"
        >
          <div style={{
            padding: '24px 32px', borderRadius: 20,
            background: 'rgba(10, 10, 30, 0.5)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(124, 106, 255, 0.1)',
            animation: 'float 7s ease-in-out infinite',
          }}>
            <div style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-display)', color: '#7c6aff' }}>7+</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>
              Years Experience
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}
          className="hero-scroll-hint"
        >
          <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Scroll</span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-badge { display: none !important; }
          .hero-scroll-hint { display: none !important; }
        }
      `}</style>
    </section>
  );
}
