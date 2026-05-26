import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { profile } from '../data/resume';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';
import ParallaxLayer from '../components/ParallaxLayer';

const socialLinks = [
  {
    label: 'LinkedIn', href: profile.social.linkedin, color: '#0077b5',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'GitHub', href: profile.social.github, color: '#e8e6f0',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: 'Email', href: `mailto:${profile.email}`, color: '#ff6b9d',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerScale = useTransform(scrollYProgress, [0.1, 0.4], [0.85, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  return (
    <section id="contact" className="section" ref={sectionRef} style={{
      position: 'relative', overflow: 'hidden', paddingBottom: 60,
    }}>
      {/* Decorative rings with different parallax speeds */}
      <ParallaxLayer speed={0.1} style={{
        position: 'absolute', top: '10%', left: '10%',
        width: 350, height: 350, border: '1px solid rgba(124, 106, 255, 0.04)',
        borderRadius: '50%', animation: 'spin-slow 80s linear infinite',
        pointerEvents: 'none',
      }} />
      <ParallaxLayer speed={0.2} style={{
        position: 'absolute', top: '15%', left: '12%',
        width: 250, height: 250, border: '1px solid rgba(54, 215, 199, 0.03)',
        borderRadius: '50%', animation: 'spin-slow 60s linear infinite reverse',
        pointerEvents: 'none',
      }} />
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', bottom: '20%', right: '8%',
        width: 280, height: 280, border: '1px solid rgba(255, 107, 157, 0.03)',
        borderRadius: '50%', animation: 'spin-slow 70s linear infinite',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Massive CTA header */}
        <motion.div style={{
          scale: headerScale, opacity: headerOpacity,
          textAlign: 'center', maxWidth: 700, margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label" style={{ justifyContent: 'center' }}>Contact</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 8vw, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              Let's <span className="text-gradient">Talk</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Open to new opportunities, collaborations, and conversations about building great software.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact cards with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20, marginTop: 56, maxWidth: 750, margin: '56px auto 0',
          }}
        >
          {[
            { icon: '📧', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, speed: 0.08 },
            { icon: '📱', label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, speed: 0.12 },
            { icon: '📍', label: 'Location', value: profile.location, href: null, speed: 0.16 },
          ].map((item, i) => (
            <ParallaxLayer key={item.label} speed={item.speed}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <GlassCard style={{ padding: 28, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{
                    fontSize: 10, color: 'var(--text-muted)', marginBottom: 8,
                    letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
                  }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="link-glow" style={{ fontSize: 13, fontWeight: 600 }}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                  )}
                </GlassCard>
              </motion.div>
            </ParallaxLayer>
          ))}
        </motion.div>

        {/* Social links — orbital arrangement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 48 }}
        >
          {socialLinks.map(({ label, href, icon, color }, i) => (
            <ParallaxLayer key={label} speed={0.05 + i * 0.04}>
              <motion.a
                href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                whileHover={{ y: -6, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 56, height: 56, borderRadius: 16,
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  color: 'var(--text-secondary)',
                  transition: 'color 200ms, border-color 200ms, box-shadow 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.borderColor = color + '40';
                  e.currentTarget.style.boxShadow = `0 0 24px ${color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >{icon}</motion.a>
            </ParallaxLayer>
          ))}
        </motion.div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}
        >
          <MagneticButton variant="primary" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            marginTop: 100, paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
            © {new Date().getFullYear()} Rohit Sahu. Built with React & Three.js
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Crafted with ☕ and 💜
          </p>
        </motion.div>
      </div>
    </section>
  );
}
