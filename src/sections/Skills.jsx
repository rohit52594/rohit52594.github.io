import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { skillCategories } from '../data/resume';
import GlassCard from '../components/GlassCard';
import ParallaxLayer from '../components/ParallaxLayer';

const CATEGORY_ICONS = {
  'Languages': '💻',
  'Frontend': '🎨',
  'Backend & Database': '⚡',
  'Cloud & Infrastructure': '☁️',
  'Tools': '🛠️',
  'AI-Assisted Development': '🤖',
  'Domain Expertise': '🏢',
};

const CATEGORY_COLORS = [
  '#7c6aff', '#36d7c7', '#ff6b9d', '#ffb347', '#a18aff', '#4ecdc4', '#ff8a80',
];

export default function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="skills" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Section number */}
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', top: 'clamp(30px, 6vh, 80px)', right: 'var(--container-padding)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 700, color: 'rgba(255, 107, 157, 0.02)', lineHeight: 1, userSelect: 'none',
        }}>03</span>
      </ParallaxLayer>

      {/* Decorative rings */}
      <ParallaxLayer speed={0.1} style={{
        position: 'absolute', top: '20%', left: '-5%', width: 300, height: 300,
        border: '1px solid rgba(124, 106, 255, 0.04)', borderRadius: '50%',
        animation: 'spin-slow 60s linear infinite', pointerEvents: 'none',
      }} />
      <ParallaxLayer speed={0.2} style={{
        position: 'absolute', bottom: '10%', right: '-3%', width: 200, height: 200,
        border: '1px solid rgba(54, 215, 199, 0.04)', borderRadius: '50%',
        animation: 'spin-slow 45s linear infinite reverse', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div style={{ y: headerY }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Skills</span>
            <h2 className="section-title">Technical <span className="text-gradient">Areas</span></h2>
            <p className="section-subtitle">Technologies and tools I use to bring ideas to life.</p>
          </motion.div>
        </motion.div>

        {/* Skills grid — radial burst from center */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
          marginTop: 48,
          alignItems: 'stretch',
        }}
          className="skills-grid"
        >
          {skillCategories.map((cat, i) => {
            const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
            // Calculate radial direction from center for burst effect
            const cols = 3;
            const row = Math.floor(i / cols);
            const col = i % cols;
            const dirX = (col - 1) * 40; // -40, 0, 40
            const dirY = row * 30;

            return (
              <motion.div key={cat.name}
                initial={{ opacity: 0, x: dirX, y: dirY + 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ height: '100%' }}
              >
                <ParallaxLayer speed={0.05 + (i % 3) * 0.04} style={{ height: '100%' }}>
                  <GlassCard style={{
                    padding: 'clamp(24px, 3vw, 32px)', height: '100%',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Category header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: `${color}10`,
                        border: `1px solid ${color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                      }}>
                        {CATEGORY_ICONS[cat.name] || '⚡'}
                      </div>
                      <h3 style={{
                        fontSize: 15, fontWeight: 700, color,
                        letterSpacing: '0.01em',
                      }}>{cat.name}</h3>
                    </div>

                    {/* Skill pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {cat.skills.map((skill, j) => (
                        <motion.span key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.3 + i * 0.07 + j * 0.04, duration: 0.4 }}
                          style={{
                            padding: '7px 18px', borderRadius: 100,
                            fontSize: 12, fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: `${color}08`,
                            border: `1px solid ${color}15`,
                            transition: 'all 250ms ease',
                            cursor: 'default', letterSpacing: '0.01em',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = `${color}18`;
                            e.target.style.borderColor = `${color}40`;
                            e.target.style.boxShadow = `0 0 20px ${color}20`;
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = `${color}08`;
                            e.target.style.borderColor = `${color}15`;
                            e.target.style.boxShadow = 'none';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >{skill}</motion.span>
                      ))}
                    </div>

                    {/* Corner glow */}
                    <div style={{
                      position: 'absolute', bottom: -30, right: -30, width: 120, height: 120, borderRadius: '50%',
                      background: `radial-gradient(circle, ${color}06 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }} />
                  </GlassCard>
                </ParallaxLayer>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: 'var(--section-padding)' }} />

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
