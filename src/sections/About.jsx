import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { profile, education, certifications } from '../data/resume';
import GlassCard from '../components/GlassCard';
import ParallaxLayer from '../components/ParallaxLayer';

/* ─── Animated counting number ─── */
function AnimatedCounter({ target, suffix = '', color = 'var(--accent-light)' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} style={{
      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
      fontWeight: 700, fontFamily: 'var(--font-display)',
      color, lineHeight: 1,
    }}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const summaryX = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);
  const countersX = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Section number — decorative parallax bg */}
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 700, color: 'rgba(124, 106, 255, 0.025)', lineHeight: 1, userSelect: 'none',
        }}>01</span>
      </ParallaxLayer>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header with parallax */}
        <motion.div style={{ y: headerY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About</span>
            <h2 className="section-title">
              Building the <span className="text-gradient">future of software</span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Two-column: summary (left) + counters (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, marginTop: 48 }}>
          {/* Summary — slides from left */}
          <motion.div style={{ x: summaryX }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <GlassCard style={{ padding: 'clamp(32px, 4vw, 52px)', position: 'relative', overflow: 'hidden' }}>
                <p style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                  color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: 800,
                }}>
                  {profile.summary}
                </p>
                {/* Decorative gradient */}
                <div style={{
                  position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(124, 106, 255, 0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: -60, left: -60, width: 180, height: 180, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(54, 215, 199, 0.04) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Years counter — single prominent stat */}
          <motion.div style={{ x: countersX }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <GlassCard style={{ padding: 'clamp(24px, 3vw, 36px)', textAlign: 'center', maxWidth: 200 }}>
                <AnimatedCounter target="7" suffix="+" color="#7c6aff" />
                <div style={{
                  marginTop: 10, fontSize: 11, color: 'var(--text-muted)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                }}>Years Experience</div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Education & Certifications with staggered horizontal slide */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48 }}>
          <ParallaxLayer speed={0.2} horizontal={-0.3}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <GlassCard style={{ padding: 32, height: '100%' }}>
                <h3 style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--accent-light)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 20 }}>🎓</span> Education
                </h3>
                {education.map((edu, i) => (
                  <div key={edu.degree} style={{
                    marginBottom: i < education.length - 1 ? 20 : 0,
                    paddingBottom: i < education.length - 1 ? 20 : 0,
                    borderBottom: i < education.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{edu.institution}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{edu.year}</div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.2} horizontal={0.3}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <GlassCard style={{ padding: 32, height: '100%' }}>
                <h3 style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--cyan)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 20 }}>🏅</span> Certifications
                </h3>
                {certifications.map((cert) => (
                  <div key={cert.title}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{cert.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{cert.issuer}</div>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          </ParallaxLayer>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />

    </section>
  );
}
