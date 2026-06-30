import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '../data/resume';
import SectionHeader from '../components/SectionHeader';

const ACCENTS = ['#c8ff2d', '#ff5a1f', '#e0ff7a'];
const NUMBERS = ['01', '02', '03'];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="projects" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
        fontWeight: 700, color: 'rgba(255, 90, 31, 0.03)', lineHeight: 1, userSelect: 'none',
      }}>04</div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader sectionRef={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Projects</span>
            <h2 className="section-title">Featured <span className="text-gradient">work</span></h2>
            <p className="section-subtitle">Impactful products unfolding as you scroll — each one a chapter of shipped work.</p>
          </motion.div>
        </SectionHeader>

        <div className="project-cinema" style={{ marginTop: 56 }}>
          {projects.map((proj, i) => (
            <ProjectPanel
              key={proj.id}
              proj={proj}
              index={i}
              total={projects.length}
              accent={ACCENTS[i % ACCENTS.length]}
              number={NUMBERS[i]}
            />
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />

      <style>{`
        .project-cinema { position: relative; }
        @media (max-width: 768px) {
          .project-panel-inner { grid-template-columns: 1fr !important; }
          .project-panel-num { min-height: 80px !important; border-right: none !important; border-bottom: 1px solid var(--border-subtle); }
        }
      `}</style>
    </section>
  );
}

function ProjectPanel({ proj, index, total, accent, number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.75, 1], [0, 1, 1, 0.5]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [4, 0]);
  const numX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stickyTop = 90 + index * 28;

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: index + 1,
        marginBottom: index < total - 1 ? 32 : '12vh',
        perspective: 1200,
      }}
    >
      <motion.div style={{ scale, y, opacity, rotateX, transformOrigin: 'center top' }}>
        <motion.div
          className="project-panel-inner"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(100px, 14vw, 180px) 1fr',
            borderRadius: 24,
            overflow: 'hidden',
            background: 'rgba(14, 14, 12, 0.72)',
            border: `1px solid ${accent}22`,
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px ${accent}08 inset`,
            position: 'relative',
          }}
        >
          {/* Number strip */}
          <motion.div
            className="project-panel-num"
            style={{
              x: numX,
              backgroundColor: `${accent}0a`,
              backgroundImage: `radial-gradient(circle, ${accent}44 1px, transparent 1.5px)`,
              backgroundSize: '8px 8px',
              borderRight: `1px solid ${accent}18`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '36px 16px', minHeight: 220,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 700, color: accent, lineHeight: 1, opacity: 0.85,
              textShadow: `0 0 30px ${accent}44`,
            }}>{number}</span>
            <div style={{ width: 28, height: 2, borderRadius: 2, background: accent, opacity: 0.35, marginTop: 14 }} />
          </motion.div>

          {/* Content */}
          <div style={{ padding: 'clamp(28px, 4vw, 48px)', position: 'relative' }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: accent,
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12,
            }}>{proj.company}</div>

            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700,
              marginBottom: 8, letterSpacing: '-0.02em',
            }}>{proj.title}</h3>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, fontWeight: 500 }}>
              {proj.subtitle}
            </p>

            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)', color: 'var(--text-secondary)',
              lineHeight: 1.85, maxWidth: 640,
            }}>{proj.description}</p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--border-subtle)',
            }}>
              {proj.tags.map((t) => (
                <span key={t} className="tag" style={{
                  color: accent, background: `${accent}08`, borderColor: `${accent}18`,
                }}>{t}</span>
              ))}
            </div>

            {/* accent glow */}
            <div style={{
              position: 'absolute', bottom: -60, right: -40, width: 220, height: 220,
              borderRadius: '50%', pointerEvents: 'none',
              background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
            }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
