import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '../data/resume';
import ParallaxLayer from '../components/ParallaxLayer';
import { StippleReveal } from '../components/StippleText';
import ContactNexus from '../components/ContactNexus';
import SectionHeader from '../components/SectionHeader';

const I = {
  mail: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  phone: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  pin: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  linkedin: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  github: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  resume: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

const nodes = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: I.mail, color: '#c8ff2d' },
  { label: 'LinkedIn', value: 'in/rtsu', href: profile.social.linkedin, external: true, icon: I.linkedin, color: '#c8ff2d' },
  { label: 'GitHub', value: 'rohit52594', href: profile.social.github, external: true, icon: I.github, color: '#f3efe4' },
  { label: 'Resume', value: 'Download PDF', href: profile.resumeUrl, external: true, icon: I.resume, color: '#c8ff2d' },
  { label: 'Location', value: profile.location, href: null, icon: I.pin, color: '#ff8a5c' },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, icon: I.phone, color: '#ff5a1f' },
];

function NexusGrid() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
      marginTop: 44, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
    }}>
      {nodes.map((node) => {
        const Tag = node.href ? 'a' : 'div';
        return (
          <Tag key={node.label}
            href={node.href || undefined}
            target={node.external ? '_blank' : undefined}
            rel={node.external ? 'noopener noreferrer' : undefined}
            aria-label={`${node.label}: ${node.value}`}
            data-cursor="hover"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '22px 14px', borderRadius: 16, textAlign: 'center',
              background: 'rgba(14,14,12,0.6)', border: '1px solid rgba(200,255,45,0.12)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: node.color }}>{node.icon}</span>
            <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>{node.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-word' }}>{node.value}</span>
          </Tag>
        );
      })}
    </div>
  );
}

export default function Contact() {
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
    <section id="contact" className="section" ref={sectionRef} style={{
      position: 'relative', overflow: 'hidden', paddingBottom: 60,
    }}>
      {/* Decorative dotted rings with different parallax speeds */}
      <ParallaxLayer speed={0.1} style={{
        position: 'absolute', top: '8%', left: '8%',
        width: 360, height: 360, border: '2px dotted rgba(200, 255, 45, 0.08)',
        borderRadius: '50%', animation: 'spin-slow 80s linear infinite',
        pointerEvents: 'none',
      }} />
      <ParallaxLayer speed={0.15} style={{
        position: 'absolute', bottom: '14%', right: '6%',
        width: 280, height: 280, border: '2px dotted rgba(255, 90, 31, 0.08)',
        borderRadius: '50%', animation: 'spin-slow 70s linear infinite',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Massive CTA header */}
        <SectionHeader sectionRef={sectionRef} centered>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label" style={{ justifyContent: 'center' }}>Contact</span>
            <h2 className="sr-only">Let's Talk</h2>
            <div style={{ marginBottom: 24 }} aria-hidden="true">
              <StippleReveal text="Let's Talk" fontSize={120} gap={5} align="center" />
            </div>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Open to new opportunities, collaborations, and conversations about building great software.
              Pick a node to start the conversation.
            </p>
          </motion.div>
        </SectionHeader>

        {/* Communication network */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: wide ? 'clamp(36px, 6vh, 72px)' : 0 }}
        >
          {wide ? <ContactNexus nodes={nodes} /> : <NexusGrid />}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: 60, paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
            © {new Date().getFullYear()} Rohit Sahu. Built with React & Canvas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
