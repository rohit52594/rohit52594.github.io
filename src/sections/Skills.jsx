import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/resume';
import ParallaxLayer from '../components/ParallaxLayer';
import SkillsConstellation from '../components/SkillsConstellation';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const CATEGORY_COLORS = [
  '#c8ff2d', '#ff5a1f', '#e0ff7a', '#ff8a5c', '#a6e000', '#ff7a3c', '#d4ff66',
];

function SkillClusters() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40 }}>
      {skillCategories.map((cat, i) => {
        const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
        return (
          <Reveal key={cat.name} index={i} stagger={0.06} y={24}>
            <div style={{
              padding: '20px 22px', borderRadius: 18,
              background: 'rgba(14,14,12,0.6)', border: '1px solid rgba(200,255,45,0.1)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: color, boxShadow: `0 0 12px ${color}` }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color }}>{cat.name}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map((skill) => (
                  <span key={skill} style={{
                    padding: '7px 15px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                    color: 'var(--text-primary)', background: `${color}10`, border: `1px solid ${color}22`,
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 760px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 700, color: 'rgba(200, 255, 45, 0.03)', lineHeight: 1, userSelect: 'none',
        }}>03</span>
      </ParallaxLayer>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader sectionRef={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Skills</span>
            <h2 className="section-title">Technical <span className="text-gradient">Expertise</span></h2>
            <p className="section-subtitle">
              An interconnected ecosystem of languages, frameworks, and tools.
              Each hub previews its stack — hover or tap to explore the full cluster.
            </p>
          </motion.div>
        </SectionHeader>

        <div className="sr-only">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <h3>{cat.name}</h3>
              <ul>{cat.skills.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </div>

        {wide ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: 24 }}
            aria-hidden="true"
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginBottom: 12, fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em',
            }}>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'var(--accent)' }}
              >→</motion.span>
              Interactive map — explore the nodes
            </div>
            <SkillsConstellation categories={skillCategories} colors={CATEGORY_COLORS} />
          </motion.div>
        ) : (
          <SkillClusters />
        )}
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />
    </section>
  );
}
