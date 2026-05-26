import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { experience } from '../data/resume';
import GlassCard from '../components/GlassCard';
import ParallaxLayer from '../components/ParallaxLayer';

export default function Experience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  // Timeline line reveal — grows as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ['0%', '100%']);

  return (
    <section id="experience" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Section number */}
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 700, color: 'rgba(54, 215, 199, 0.025)', lineHeight: 1, userSelect: 'none',
        }}>02</span>
      </ParallaxLayer>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div style={{ y: headerY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I've <span className="text-gradient">made impact</span></h2>
            <p className="section-subtitle">A journey through enterprise POS, AI healthcare, ERP systems, and more.</p>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginTop: 64 }} className="timeline-container">
          {/* Animated timeline line — draws itself */}
          <div style={{
            position: 'absolute', left: 'clamp(14px, 2vw, 20px)', top: 0, bottom: 0,
            width: 2, background: 'rgba(124, 106, 255, 0.06)', borderRadius: 100,
          }}>
            <motion.div style={{
              width: '100%', height: lineHeight, borderRadius: 100,
              background: 'linear-gradient(to bottom, var(--accent), var(--cyan), var(--pink))',
              opacity: 0.5,
            }} />
          </div>

          <div style={{ paddingLeft: 'clamp(44px, 5vw, 60px)' }}>
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} total={experience.length} />
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />
    </section>
  );
}

function ExperienceCard({ exp, index, total }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      style={{ position: 'relative', marginBottom: index < total - 1 ? 48 : 0 }}
    >
      {/* Timeline dot — glows when in view */}
      <motion.div
        animate={inView ? {
          boxShadow: index === 0
            ? ['0 0 0px rgba(124, 106, 255, 0.3)', '0 0 16px rgba(124, 106, 255, 0.5)', '0 0 0px rgba(124, 106, 255, 0.3)']
            : 'none',
        } : {}}
        transition={index === 0 ? { duration: 2, repeat: Infinity } : {}}
        style={{
          position: 'absolute',
          left: 'clamp(-37px, -4vw, -47px)',
          top: 28,
          width: 14, height: 14, borderRadius: '50%',
          background: index === 0 ? 'var(--accent)' : 'var(--bg-surface)',
          border: `2px solid ${index === 0 ? 'var(--accent)' : 'var(--border-visible)'}`,
          zIndex: 3,
        }}
      />

      {/* Card — alternating slide direction */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <ParallaxLayer speed={0.08 + index * 0.03}>
          <GlassCard style={{ padding: 'clamp(24px, 3vw, 40px)', position: 'relative', overflow: 'hidden' }}>
            {/* Period */}
            <div style={{
              display: 'inline-block', padding: '5px 16px', borderRadius: 100,
              background: 'var(--accent-dim)', border: '1px solid var(--border-subtle)',
              fontSize: 11, fontWeight: 600, color: 'var(--accent-light)',
              marginBottom: 18, letterSpacing: '0.03em',
            }}>{exp.period}</div>

            {/* Company & role */}
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', fontWeight: 700, marginBottom: 6 }}>{exp.company}</h3>
            <p style={{ fontSize: 14, color: 'var(--cyan)', fontWeight: 600, marginBottom: 24, letterSpacing: '0.02em' }}>{exp.role}</p>

            {/* Highlights */}
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {exp.highlights.map((h, j) => (
                <motion.li key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + j * 0.08, duration: 0.5 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75,
                  }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent)', marginTop: 7, flexShrink: 0,
                    boxShadow: '0 0 6px var(--accent-glow)',
                  }} />
                  {h}
                </motion.li>
              ))}
            </ul>

            {/* Tech stack */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)',
            }}>
              {exp.tech.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            {/* Current badge */}
            {index === 0 && (
              <div style={{
                position: 'absolute', top: 24, right: 24,
                padding: '5px 14px', borderRadius: 100,
                background: 'rgba(54, 215, 199, 0.08)',
                border: '1px solid rgba(54, 215, 199, 0.2)',
                fontSize: 10, fontWeight: 700, color: '#36d7c7',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                ● Current
              </div>
            )}

            {/* Corner glow */}
            <div style={{
              position: 'absolute', bottom: -40, right: -40, width: 150, height: 150, borderRadius: '50%',
              background: `radial-gradient(circle, ${index === 0 ? 'rgba(124, 106, 255, 0.04)' : 'rgba(54, 215, 199, 0.03)'} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
          </GlassCard>
        </ParallaxLayer>
      </motion.div>
    </div>
  );
}
