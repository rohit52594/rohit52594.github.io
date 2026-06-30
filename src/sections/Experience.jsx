import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { experience } from '../data/resume';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ParallaxLayer from '../components/ParallaxLayer';

export default function Experience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.06, 0.92], ['0%', '100%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="experience" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* depth layer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '-10% 0', y: bgY, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(200,255,45,0.04) 1px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 20%, #000 80%, transparent)',
          maskImage: 'linear-gradient(180deg, transparent, #000 20%, #000 80%, transparent)',
        }}
      />

      <div className="exp-number" style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
        fontWeight: 700, color: 'rgba(255, 90, 31, 0.03)', lineHeight: 1, userSelect: 'none',
      }}>02</div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader sectionRef={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I've <span className="text-gradient">made impact</span></h2>
            <p className="section-subtitle">A journey through enterprise POS, AI healthcare, ERP systems, and more — one milestone at a time.</p>
          </motion.div>
        </SectionHeader>

        <div style={{ position: 'relative', marginTop: 'clamp(56px, 8vh, 88px)' }} className="timeline-container">
          <div className="timeline-rail" style={{
            position: 'absolute', left: 'clamp(24px, 3vw, 34px)', top: 8, bottom: 8, width: 4,
            backgroundImage: 'radial-gradient(circle, rgba(243, 239, 228, 0.16) 1.3px, transparent 1.6px)',
            backgroundSize: '4px 10px', backgroundRepeat: 'repeat-y',
          }}>
            <motion.div style={{
              width: '100%', height: lineHeight,
              backgroundImage: 'radial-gradient(circle, var(--accent) 1.6px, transparent 1.9px)',
              backgroundSize: '4px 10px', backgroundRepeat: 'repeat-y',
              filter: 'drop-shadow(0 0 5px var(--accent-glow))',
            }} />
          </div>

          <div className="timeline-track">
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} total={experience.length} />
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />

      <style>{`
        .timeline-track { padding-left: clamp(72px, 9vw, 110px); }
        @media (max-width: 600px) {
          .timeline-rail { left: 14px !important; }
          .timeline-track { padding-left: 44px !important; }
        }
      `}</style>
    </section>
  );
}

function ExperienceCard({ exp, index, total }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });
  const active = useInView(cardRef, { margin: '-42% 0px -42% 0px' });
  const isCurrent = index === 0;
  const num = String(index + 1).padStart(2, '0');

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [50 - index * 8, 0, -30 - index * 5]);
  const cardX = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -24 : 24, 0, index % 2 === 0 ? 12 : -12]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.4], [index % 2 === 0 ? -1.2 : 1.2, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.94, 1, 1, 0.97]);

  return (
    <div
      ref={cardRef}
      style={{ position: 'relative', marginBottom: index < total - 1 ? 'clamp(40px, 6vh, 72px)' : 0 }}
    >
      <motion.div
        className="exp-marker"
        animate={{
          scale: active ? 1.12 : 1,
          borderColor: active ? 'var(--accent)' : 'var(--border-visible)',
          boxShadow: active ? '0 0 24px rgba(200, 255, 45, 0.5)' : '0 0 0px rgba(200, 255, 45, 0)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 'clamp(-62px, -7.5vw, -92px)', top: 6,
          width: 'clamp(40px, 5vw, 52px)', height: 'clamp(40px, 5vw, 52px)',
          borderRadius: '50%', background: 'rgba(10, 10, 9, 0.85)',
          border: '1.5px solid var(--border-visible)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 700,
          color: active ? 'var(--accent)' : 'var(--text-secondary)', transition: 'color 300ms ease',
        }}>{num}</span>
      </motion.div>

      <motion.div
        style={{ y: cardY, x: cardX, rotateZ: cardRotate, scale: cardScale, transformOrigin: 'left center' }}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParallaxLayer speed={0.04 + index * 0.025}>
          <GlassCard style={{ padding: 'clamp(26px, 3.2vw, 44px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <div style={{
                display: 'inline-block', padding: '6px 16px', borderRadius: 100,
                background: 'var(--accent-dim)', border: '1px solid var(--border-subtle)',
                fontSize: 11, fontWeight: 700, color: 'var(--accent-light)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{exp.period}</div>

              {isCurrent && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100,
                  background: 'rgba(200, 255, 45, 0.1)', border: '1px solid rgba(200, 255, 45, 0.28)',
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent)', animation: 'dot-pulse 2s ease-in-out infinite',
                  }} />
                  Current
                </div>
              )}
            </div>

            <h3 style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{exp.company}</h3>
            <p style={{ fontSize: 'clamp(13px, 1.5vw, 15px)', color: 'var(--cyan)', fontWeight: 600, marginBottom: 26, letterSpacing: '0.02em' }}>{exp.role}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {exp.highlights.map((h, j) => (
                <HighlightRow key={j} text={h} index={j} inView={inView} active={active} />
              ))}
            </div>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--border-subtle)',
            }}>
              {exp.tech.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            <div style={{
              position: 'absolute', bottom: -40, right: -40, width: 180, height: 180, borderRadius: '50%',
              background: `radial-gradient(circle, ${isCurrent ? 'rgba(200, 255, 45, 0.05)' : 'rgba(255, 90, 31, 0.04)'} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
          </GlassCard>
        </ParallaxLayer>
      </motion.div>
    </div>
  );
}

function HighlightRow({ text, index, inView, active }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: 0.2 + index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '12px 14px 12px 16px', borderRadius: 12, cursor: 'default',
        background: hovered ? 'rgba(200, 255, 45, 0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(200,255,45,0.22)' : 'rgba(200,255,45,0.06)'}`,
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
        transition: 'background 250ms ease, border-color 250ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1)',
        overflow: 'hidden',
      }}
    >
      {/* animated left accent */}
      <motion.span
        animate={{ scaleY: hovered || active ? 1 : 0.35, opacity: hovered || active ? 1 : 0.4 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 2,
          background: 'linear-gradient(180deg, var(--accent), var(--cyan))',
          transformOrigin: 'center',
        }}
      />

      {/* bullet marker */}
      <span style={{
        position: 'relative', flexShrink: 0, marginTop: 8,
        width: 7, height: 7, borderRadius: '50%',
        background: hovered ? 'var(--accent)' : 'var(--cyan)',
        boxShadow: hovered ? '0 0 10px var(--accent-glow)' : '0 0 6px rgba(255,90,31,0.4)',
        transform: hovered ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 250ms ease',
      }} />

      <p style={{
        margin: 0, fontSize: 'clamp(13px, 1.4vw, 14px)',
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        lineHeight: 1.75, transition: 'color 250ms ease',
      }}>{text}</p>

      {/* stipple shimmer on hover */}
      {hovered && (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
          backgroundImage: 'radial-gradient(circle, rgba(200,255,45,0.5) 1px, transparent 1.4px)',
          backgroundSize: '10px 10px',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 30%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 30%, transparent)',
        }} />
      )}
    </motion.div>
  );
}
