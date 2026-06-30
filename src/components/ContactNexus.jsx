import { useRef, useEffect, useState, useCallback } from 'react';

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
};

/**
 * ContactNexus — an interactive communication network. A pulsing core links
 * to floating contact nodes via animated pathways with traveling signals.
 * Hovering a node lights its pathway; nodes are real links. Collapses to a
 * clean responsive grid on narrow screens.
 */
export default function ContactNexus({ nodes }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const [hover, setHover] = useState(null);
  const hoverRef = useRef(null);
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const compute = useCallback((w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.4;
    const n = nodes.length;
    const placed = nodes.map((node, i) => {
      const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return { ...node, x: cx + Math.cos(ang) * radius, y: cy + Math.sin(ang) * radius * 0.92 };
    });
    return { w, h, core: { x: cx, y: cy }, nodes: placed };
  }, [nodes]);

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

  useEffect(() => { hoverRef.current = hover; }, [hover]);

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
      parallax.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
      parallax.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 14;
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

    const draw = (t) => {
      const { core, nodes: ns } = layout;
      ctx.clearRect(0, 0, layout.w, layout.h);

      parallax.current.x += (parallax.current.tx - parallax.current.x) * 0.06;
      parallax.current.y += (parallax.current.ty - parallax.current.y) * 0.06;
      const px = parallax.current.x, py = parallax.current.y;

      const coreX = core.x + px * 0.4, coreY = core.y + py * 0.4;

      ns.forEach((node, i) => {
        const c = hexToRgb(node.color);
        const nx = node.x + px, ny = node.y + py;
        const isHover = hoverRef.current === i;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${isHover ? 0.55 : 0.14})`;
        ctx.lineWidth = isHover ? 1.6 : 0.8;
        ctx.moveTo(coreX, coreY);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        if (!reduced) {
          const count = isHover ? 3 : 1;
          for (let s = 0; s < count; s++) {
            const tp = ((t / (isHover ? 900 : 2200)) + i * 0.17 + s / count) % 1;
            const sx = coreX + (nx - coreX) * tp;
            const sy = coreY + (ny - coreY) * tp;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${isHover ? 0.9 : 0.5})`;
            ctx.arc(sx, sy, isHover ? 2.4 : 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      stage.style.setProperty('--px', px + 'px');
      stage.style.setProperty('--py', py + 'px');
      stage.style.setProperty('--cpx', (px * 0.4) + 'px');
      stage.style.setProperty('--cpy', (py * 0.4) + 'px');
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

  return (
    <div
      ref={stageRef}
      className="nexus-stage"
      style={{ position: 'relative', width: '100%', height: 'clamp(440px, 52vw, 560px)' }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />

      {/* core */}
      {layout && (
        <div
          style={{
            position: 'absolute',
            left: `calc(${layout.core.x}px + var(--cpx, 0px))`,
            top: `calc(${layout.core.y}px + var(--cpy, 0px))`,
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            zIndex: 4, pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 'clamp(74px, 9vw, 96px)', height: 'clamp(74px, 9vw, 96px)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 35%, rgba(200,255,45,0.18), rgba(14,14,12,0.85))',
            border: '1.5px solid rgba(200,255,45,0.35)',
            boxShadow: '0 0 40px rgba(200,255,45,0.25)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(20px, 2.6vw, 28px)', color: 'var(--accent)',
            }}>RS</span>
          </div>
          <span style={{
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
            color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', animation: 'dot-pulse 2s ease-in-out infinite' }} />
            Available
          </span>
        </div>
      )}

      {/* contact nodes */}
      {layout && layout.nodes.map((node, i) => {
        const isHover = hover === i;
        const Tag = node.href ? 'a' : 'div';
        return (
          <Tag
            key={node.label}
            href={node.href || undefined}
            target={node.external ? '_blank' : undefined}
            rel={node.external ? 'noopener noreferrer' : undefined}
            aria-label={`${node.label}: ${node.value}`}
            data-cursor="hover"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            style={{
              position: 'absolute',
              left: `calc(${node.x}px + var(--px, 0px))`,
              top: `calc(${node.y}px + var(--py, 0px))`,
              transform: `translate(-50%, -50%) scale(${isHover ? 1.07 : 1})`,
              transition: 'transform 320ms cubic-bezier(0.16,1,0.3,1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              width: 'clamp(120px, 15vw, 150px)', textAlign: 'center',
              zIndex: isHover ? 7 : 5, cursor: node.href ? 'pointer' : 'default',
            }}
          >
            <span style={{
              width: 52, height: 52, borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isHover ? `${node.color}1f` : 'rgba(14,14,12,0.78)',
              border: `1px solid ${isHover ? node.color : 'rgba(200,255,45,0.14)'}`,
              boxShadow: isHover ? `0 0 26px ${node.color}40` : '0 6px 20px rgba(0,0,0,0.45)',
              color: isHover ? node.color : 'var(--text-secondary)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 320ms ease',
            }}>
              {node.icon}
            </span>
            <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
              {node.label}
            </span>
            <span style={{
              fontSize: 12, fontWeight: 600, color: isHover ? node.color : 'var(--text-primary)',
              wordBreak: 'break-word', lineHeight: 1.4, transition: 'color 320ms ease',
            }}>
              {node.value}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}
