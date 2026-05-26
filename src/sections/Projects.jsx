import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '../data/resume';
import GlassCard from '../components/GlassCard';
import ParallaxLayer from '../components/ParallaxLayer';

const PROJECT_ACCENTS = ['#7c6aff', '#36d7c7', '#ff6b9d'];
const PROJECT_NUMBERS = ['01', '02', '03'];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="projects" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Section number */}
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 700, color: 'rgba(255, 179, 71, 0.02)', lineHeight: 1, userSelect: 'none',
        }}>04</span>
      </ParallaxLayer>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div style={{ y: headerY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Projects</span>
            <h2 className="section-title">Featured <span className="text-gradient">work</span></h2>
            <p className="section-subtitle">Impactful products I've helped build and ship.</p>
          </motion.div>
        </motion.div>

        {/* Full-width stacked project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 56 }}>
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} accent={PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]} number={PROJECT_NUMBERS[i]} />
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />
    </section>
  );
}

function ProjectCard({ proj, index, accent, number }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParallaxLayer speed={0.06 + index * 0.03} horizontal={isEven ? 0.08 : -0.08}>
          <GlassCard style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(80px, 12vw, 160px) 1fr',
              minHeight: 200,
            }}
              className="project-card-grid"
            >
              {/* Left accent strip with project number */}
              <div style={{
                background: `linear-gradient(180deg, ${accent}18, ${accent}08)`,
                borderRight: `1px solid ${accent}15`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '32px 16px', position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700, color: `${accent}30`,
                  lineHeight: 1,
                }}>{number}</span>
                <div style={{
                  width: 24, height: 2, borderRadius: 2,
                  background: accent, opacity: 0.3,
                  marginTop: 12,
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                {/* Company label */}
                <div style={{
                  fontSize: 11, fontWeight: 700, color: accent,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: 14,
                }}>{proj.company}</div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 700, marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}>{proj.title}</h3>

                {/* Subtitle */}
                <p style={{
                  fontSize: 13, color: 'var(--text-muted)',
                  marginBottom: 20, fontWeight: 500,
                }}>{proj.subtitle}</p>

                {/* Description */}
                <p style={{
                  fontSize: 14, color: 'var(--text-secondary)',
                  lineHeight: 1.85, maxWidth: 650,
                }}>{proj.description}</p>

                {/* Tags */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 8,
                  marginTop: 24, paddingTop: 20,
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="tag" style={{
                      color: accent,
                      background: `${accent}08`,
                      borderColor: `${accent}15`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Corner glow */}
            <div style={{
              position: 'absolute', bottom: -50, right: -50,
              width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${accent}04 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
          </GlassCard>
        </ParallaxLayer>
      </motion.div>
    </div>
  );
}
