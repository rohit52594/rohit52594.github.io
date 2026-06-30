import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/resume';
import MagneticButton from '../components/MagneticButton';
import { useScrollProgress } from '../context/ScrollContext';
import StippleText from '../components/StippleText';
import ParticleNetwork from '../components/ParticleNetwork';

function TypeWriter({ words, speed = 90, pause = 2000 }) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setWordIdx((p) => (p + 1) % words.length); }
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

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const socialOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.15]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'clip', overflowY: 'visible' }}
    >
      {/* ambient glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 'clamp(500px, 55vw, 800px)', height: 'clamp(500px, 55vw, 800px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,45,0.07) 0%, rgba(255,90,31,0.03) 45%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="container hero-grid" style={{ flex: 1, position: 'relative', zIndex: 2, paddingTop: 100, paddingBottom: 120 }}>
        {/* ── Left column: identity + content ── */}
        <div className="hero-left">
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500,
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent-glow)', animation: 'dot-pulse 2.4s ease-in-out infinite',
            }} />
            {profile.location}
          </motion.p>

          <motion.div style={{ y: nameY, opacity: nameOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="sr-only">{profile.name}</h1>
              <StippleText text={profile.name.split(' ')[0]} fontSize={140} gap={4} />
              <StippleText text={profile.name.split(' ')[1]} fontSize={140} gap={4} style={{ marginTop: -6 }} />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                marginTop: 24, fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.6vw, 2.2rem)', fontWeight: 400, color: 'var(--text-secondary)',
              }}
            >
              <TypeWriter words={['Senior Software Engineer', 'Scalable Systems Developer', 'Full-Stack Engineer']} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{
                marginTop: 20, fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                color: 'var(--text-muted)', maxWidth: 480, lineHeight: 1.9,
              }}
            >
              Building scalable enterprise & AI-driven applications with React.js,
              TypeScript, and Node.js. 7+ years of shipping production-grade software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}
            >
              <MagneticButton variant="primary" onClick={() => scrollTo('experience')}>View Experience</MagneticButton>
              <MagneticButton variant="outline" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: socialOpacity }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="hero-social"
              style={{
                marginTop: 44, display: 'flex', flexWrap: 'wrap', gap: 24,
                paddingTop: 24, borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {[
                { label: profile.email, href: `mailto:${profile.email}` },
                { label: 'LinkedIn', href: profile.social.linkedin },
                { label: 'GitHub', href: profile.social.github },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="link-glow" data-cursor="hover" style={{ fontSize: 13, fontWeight: 500 }}>
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right column: signature sphere ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
        >
          <div className="hero-sphere-wrap">
            <div className="hero-sphere-glow" aria-hidden="true" />
            <ParticleNetwork count={170} scrollProgress={scrollYProgress} style={{ width: '100%', height: '100%' }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint — section-level, never overlaps social links */}
      <motion.div
        className="hero-scroll-hint"
        style={{ opacity: hintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.35em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Scroll</span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(16px, 3vw, 40px);
          min-height: calc(100vh - 180px);
        }
        .hero-left { max-width: 620px; }
        .hero-right {
          display: flex; align-items: center; justify-content: center;
          min-height: clamp(420px, 50vw, 680px);
          overflow: visible;
        }
        .hero-sphere-wrap {
          position: relative;
          width: clamp(400px, 44vw, 660px);
          height: clamp(400px, 44vw, 660px);
          margin: 0 auto;
        }
        .hero-sphere-glow {
          position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,255,45,0.12) 0%, rgba(255,90,31,0.06) 40%, transparent 72%);
          filter: blur(40px); pointer-events: none;
        }
        .hero-scroll-hint {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8;
          z-index: 5; pointer-events: none;
        }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr; min-height: auto; gap: 8px; }
          .hero-right {
            order: -1;
            min-height: clamp(240px, 64vw, 320px);
            opacity: 0.5 !important;
            margin-bottom: 8px;
          }
          .hero-sphere-wrap {
            width: min(50vw, 200px);
            height: min(50vw, 200px);
          }
          .hero-left { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .hero-scroll-hint { display: none; }
          .hero-social { gap: 16px !important; }
          .hero-social a { font-size: 12px !important; }
        }
      `}</style>
    </section>
  );
}
