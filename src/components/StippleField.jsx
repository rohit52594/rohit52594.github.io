import { useRef, useEffect } from 'react';
import { useScrollProgress } from '../context/ScrollContext';

/* ─── Acid Ink duotone (matches CSS tokens) ─── */
const ACID = { r: 200, g: 255, b: 45 };
const EMBER = { r: 255, g: 90, b: 31 };

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * StippleField — fullscreen 2D canvas dot-grid background.
 * Dots react to a mouse spotlight (scale + brightness) and to scroll
 * progress (duotone acid -> ember shift + gentle vertical drift).
 * Honors prefers-reduced-motion by rendering a single static frame.
 */
export default function StippleField() {
  const canvasRef = useRef(null);
  const { scrollRef } = useScrollProgress();
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 30;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
    };
    resize();

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });

    const radius = 180; // spotlight radius
    let raf;
    let t0 = performance.now();
    // smoothed mouse for parallax + interaction
    let smx = window.innerWidth / 2;
    let smy = window.innerHeight / 2;

    const draw = (now) => {
      const time = (now - t0) / 1000;
      const scroll = scrollRef?.current ?? 0;
      ctx.clearRect(0, 0, width, height);

      const mActive = mouse.current.active;
      if (mActive) {
        smx += (mouse.current.x - smx) * 0.12;
        smy += (mouse.current.y - smy) * 0.12;
      }
      const mx = smx;
      const my = smy;

      // whole-field parallax for depth (subtle)
      const par = mActive ? (smx / width - 0.5) : 0;
      const parY = mActive ? (smy / height - 0.5) : 0;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          // per-row depth: deeper rows drift more for layered parallax
          const depth = 0.5 + ((ix * 7 + iy * 13) % 10) / 20; // 0.5..1
          const x = ix * spacing - par * 26 * depth;
          // gentle scroll + time drift on the vertical axis
          const drift = reduced ? 0 : Math.sin(time * 0.4 + ix * 0.35) * 3;
          const y = iy * spacing + drift - (scroll * 40) - parY * 22 * depth;
          const yWrapped = ((y % (height + spacing)) + height + spacing) % (height + spacing);

          // base duotone by position + scroll
          const mixBase = Math.min(1, Math.max(0, (ix / cols) * 0.55 + scroll * 0.6));
          let r = lerp(ACID.r, EMBER.r, mixBase);
          let g = lerp(ACID.g, EMBER.g, mixBase);
          let b = lerp(ACID.b, EMBER.b, mixBase);

          let dx2 = x, dy2 = yWrapped;
          let size = 1.05 * depth + 0.3;
          let alpha = 0.08 + depth * 0.06;

          if (mActive) {
            const dx = x - mx;
            const dy = yWrapped - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              const f = 1 - dist / radius;
              size += f * 2.8;
              alpha += f * 0.7;
              // magnetic gather toward cursor — densify, never void
              const pull = f * f * 10;
              if (dist > 0.001) {
                dx2 = x - (dx / dist) * pull;
                dy2 = yWrapped - (dy / dist) * pull;
              }
              r = lerp(r, ACID.r, f * 0.5);
              g = lerp(g, ACID.g, f * 0.5);
              b = lerp(b, ACID.b, f * 0.5);
            }
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
          ctx.arc(dx2, dy2, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [scrollRef]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background:
          'radial-gradient(ellipse at 50% 0%, #15150f 0%, #0a0a09 55%, #070706 100%)',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      {/* soft halftone vignette to add depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(7,7,6,0.6) 100%)',
        }}
      />
    </div>
  );
}
