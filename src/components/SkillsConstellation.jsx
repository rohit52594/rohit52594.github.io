import { useRef, useEffect, useState, useCallback } from 'react';

/* Relative hub anchor points (x,y in 0..1) arranged around an open core */
const HUB_ANCHORS = [
  { x: 0.16, y: 0.28 },
  { x: 0.42, y: 0.15 },
  { x: 0.70, y: 0.24 },
  { x: 0.87, y: 0.52 },
  { x: 0.66, y: 0.80 },
  { x: 0.36, y: 0.84 },
  { x: 0.13, y: 0.60 },
];

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

/**
 * SkillsConstellation — an interactive technology network. A central core
 * connects to category hubs; each hub orbits its skills. Lines pulse with
 * traveling particles, the cursor parallaxes the field, and hovering a hub
 * lights its cluster. Falls back to a clean cluster layout on narrow screens.
 */
export default function SkillsConstellation({ categories, colors }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const [active, setActive] = useState(null); // active category index
  const activeRef = useRef(null);
  const autoRef = useRef(0);
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const compute = useCallback((w, h) => {
    const hubs = categories.map((cat, i) => {
      const a = HUB_ANCHORS[i % HUB_ANCHORS.length];
      const hx = a.x * w;
      const hy = a.y * h;
      const baseAngle = Math.atan2(0.5 * h - hy, 0.5 * w - hx) + Math.PI;
      const skills = cat.skills.map((s, j) => {
        const span = Math.PI * 1.5;
        const ang = baseAngle - span / 2 + (cat.skills.length === 1 ? span / 2 : (j / (cat.skills.length - 1)) * span);
        const rr = Math.min(w, h) * 0.12;
        return { label: s, x: hx + Math.cos(ang) * rr, y: hy + Math.sin(ang) * rr };
      });
      return { name: cat.name, x: hx, y: hy, color: colors[i % colors.length], skills };
    });
    return { w, h, core: { x: w / 2, y: h / 2 }, hubs };
  }, [categories, colors]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      const r = stage.getBoundingClientRect();
      setLayout(compute(r.width, r.height));
    });
    ro.observe(stage);
    const r = stage.getBoundingClientRect();
    setLayout(compute(r.width, r.height));
    return () => ro.disconnect();
  }, [compute]);

  useEffect(() => { activeRef.current = active; }, [active]);

  // Canvas line/particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage || !layout) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(layout.w * dpr);
    canvas.height = Math.floor(layout.h * dpr);
    canvas.style.width = layout.w + 'px';
    canvas.style.height = layout.h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      parallax.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
      parallax.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 18;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        visible = en.isIntersecting;
        if (visible && !reduced && raf == null) raf = requestAnimationFrame(loop);
      }),
      { threshold: 0 }
    );
    io.observe(stage);

    let lastAuto = performance.now();

    const draw = (t) => {
      const { core, hubs } = layout;
      ctx.clearRect(0, 0, layout.w, layout.h);

      parallax.current.x += (parallax.current.tx - parallax.current.x) * 0.06;
      parallax.current.y += (parallax.current.ty - parallax.current.y) * 0.06;
      const px = parallax.current.x;
      const py = parallax.current.y;

      // auto-cycle active cluster until user interacts
      if (!reduced && activeRef.current == null && t - lastAuto > 2600) {
        autoRef.current = (autoRef.current + 1) % hubs.length;
        lastAuto = t;
      }
      const act = activeRef.current != null ? activeRef.current : (reduced ? -1 : autoRef.current);

      hubs.forEach((hub, i) => {
        const isAct = i === act;
        const c = hexToRgb(hub.color);
        const hx = hub.x + px;
        const hy = hub.y + py;

        // backbone core -> hub
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${isAct ? 0.5 : 0.12})`;
        ctx.lineWidth = isAct ? 1.4 : 0.7;
        ctx.moveTo(core.x + px, core.y + py);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // traveling particle on backbone
        if (!reduced) {
          const tp = ((t / 2600) + i * 0.13) % 1;
          const bx = core.x + px + (hx - (core.x + px)) * tp;
          const by = core.y + py + (hy - (core.y + py)) * tp;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${isAct ? 0.9 : 0.4})`;
          ctx.arc(bx, by, isAct ? 2.2 : 1.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // hub -> skills
        hub.skills.forEach((sk, j) => {
          const sx = sk.x + px;
          const sy = sk.y + py;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${isAct ? 0.34 : 0.08})`;
          ctx.lineWidth = isAct ? 1 : 0.6;
          ctx.moveTo(hx, hy);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          if (!reduced && isAct) {
            const tp = ((t / 1400) + j * 0.2) % 1;
            const bx = hx + (sx - hx) * tp;
            const by = hy + (sy - hy) * tp;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`;
            ctx.arc(bx, by, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // store parallax so DOM overlay matches
      stage.style.setProperty('--px', px + 'px');
      stage.style.setProperty('--py', py + 'px');
    };

    let raf = null;
    const loop = (t) => {
      draw(t);
      if (!visible || reduced) { raf = null; return; }
      raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(0); else raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [layout]);

  const act = active;

  return (
    <div
      ref={stageRef}
      className="constellation-stage"
      style={{ position: 'relative', width: '100%', height: 'clamp(540px, 60vw, 680px)' }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />

      {layout && layout.hubs.map((hub, i) => {
        const isAct = i === act;
        return (
          <div key={hub.name}>
            {/* skill nodes */}
            {hub.skills.map((sk) => (
              <div
                key={sk.label}
                className="constellation-skill"
                style={{
                  position: 'absolute',
                  left: `calc(${sk.x}px + var(--px, 0px))`,
                  top: `calc(${sk.y}px + var(--py, 0px))`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex', alignItems: 'center', gap: 7,
                  pointerEvents: 'none',
                  zIndex: isAct ? 6 : 4,
                }}
              >
                <span style={{
                  width: isAct ? 7 : 5, height: isAct ? 7 : 5, borderRadius: '50%',
                  background: hub.color, flexShrink: 0,
                  boxShadow: isAct ? `0 0 12px ${hub.color}` : 'none',
                  transition: 'all 300ms ease',
                }} />
                <span style={{
                  fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                  color: isAct ? 'var(--text-primary)' : 'var(--text-muted)',
                  opacity: isAct ? 1 : 0.42,
                  transform: isAct ? 'translateX(0)' : 'translateX(-2px)',
                  transition: 'all 300ms ease',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}>{sk.label}</span>
              </div>
            ))}

            {/* hub node */}
            <button
              className="constellation-hub"
              data-cursor="hover"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              style={{
                position: 'absolute',
                left: `calc(${hub.x}px + var(--px, 0px))`,
                top: `calc(${hub.y}px + var(--py, 0px))`,
                transform: `translate(-50%, -50%) scale(${isAct ? 1.06 : 1})`,
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 16px 9px 12px', borderRadius: 100,
                background: isAct ? `${hub.color}1f` : 'rgba(14,14,12,0.72)',
                border: `1px solid ${isAct ? hub.color : 'rgba(200,255,45,0.14)'}`,
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                boxShadow: isAct ? `0 0 30px ${hub.color}33` : '0 4px 18px rgba(0,0,0,0.4)',
                cursor: 'pointer', zIndex: isAct ? 8 : 5,
                transition: 'background 300ms ease, border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.16,1,0.3,1)',
                color: 'var(--text-primary)',
              }}
            >
              <span style={{
                width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                background: hub.color,
                boxShadow: `0 0 14px ${hub.color}`,
                animation: isAct ? 'none' : 'dot-pulse 3s ease-in-out infinite',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
                  {hub.name}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 500, color: isAct ? hub.color : 'var(--text-muted)',
                  opacity: isAct ? 0.95 : 0.5, whiteSpace: 'nowrap',
                  transition: 'opacity 300ms ease, color 300ms ease',
                }}>
                  {isAct
                    ? hub.skills.map((s) => s.label).join(' · ')
                    : `${hub.skills.slice(0, 2).map((s) => s.label).join(', ')}${hub.skills.length > 2 ? ' +' : ''}`}
                </span>
              </div>
            </button>
          </div>
        );
      })}

      {/* central core */}
      {layout && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `calc(${layout.core.x}px + var(--px, 0px))`,
            top: `calc(${layout.core.y}px + var(--py, 0px))`,
            transform: 'translate(-50%, -50%)',
            width: 18, height: 18, borderRadius: '50%',
            background: 'radial-gradient(circle, #f3efe4 0%, #c8ff2d 60%, transparent 75%)',
            boxShadow: '0 0 24px rgba(200,255,45,0.6)',
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
}
