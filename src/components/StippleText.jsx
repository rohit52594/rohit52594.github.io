import { useRef, useEffect } from 'react';

/* ─── Acid Ink duotone ─── */
const ACID = { r: 200, g: 255, b: 45 };
const EMBER = { r: 255, g: 90, b: 31 };
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * DotType — text as a living stipple field with halo particles, magnetic
 * cursor interaction, and wave propagation. Maintains full dot density.
 */
function DotType({
  text,
  fontSize = 120,
  fontWeight = 700,
  fontFamily = "'Space Grotesk', sans-serif",
  gap = 6,
  revealOnView = false,
  halo = true,
  align = 'left',
  className = '',
  style = {},
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointer = useRef({ x: -9999, y: -9999, inside: false, px: -9999, py: -9999 });
  const wave = useRef({ cx: -9999, cy: -9999, t: 0, strength: 0 });
  const assembled = useRef(!revealOnView);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cssW = 0;
    let cssH = 0;
    let padL = 0;
    let padT = 0;
    const radius = Math.max(90, fontSize * 0.75);

    const build = () => {
      const containerW = wrap.clientWidth || 600;
      const off = document.createElement('canvas');
      const octx = off.getContext('2d');

      let fs = fontSize;
      const setFont = (s) => { octx.font = `${fontWeight} ${s}px ${fontFamily}`; };
      setFont(fs);
      let w = octx.measureText(text).width;
      if (w > containerW - (halo ? gap * 14 : 0)) {
        fs = fs * ((containerW - (halo ? gap * 14 : 0)) / w);
        setFont(fs);
        w = octx.measureText(text).width;
      }

      const textW = Math.ceil(w + fs * 0.12);
      const textH = Math.ceil(fs * 1.18);
      padL = halo ? gap * 7 : 0;
      padT = halo ? gap * 4 : 0;
      cssW = textW + padL * 2;
      cssH = textH + padT * 2;

      off.width = textW;
      off.height = textH;
      setFont(fs);
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      octx.fillText(text, fs * 0.04, textH / 2);

      const data = octx.getImageData(0, 0, textW, textH).data;
      const dots = [];

      // glyph dots — dense stipple inside letterforms
      for (let y = 0; y < textH; y += gap) {
        for (let x = 0; x < textW; x += gap) {
          const alpha = data[(y * textW + x) * 4 + 3];
          if (alpha > 120) {
            const mix = x / textW;
            dots.push({
              tx: x + padL, ty: y + padT,
              x: revealOnView ? Math.random() * cssW : x + padL + (Math.random() - 0.5) * 5,
              y: revealOnView ? Math.random() * cssH : y + padT + (Math.random() - 0.5) * 5,
              r: lerp(ACID.r, EMBER.r, mix),
              g: lerp(ACID.g, EMBER.g, mix),
              b: lerp(ACID.b, EMBER.b, mix),
              size: 0.85 + Math.random() * 0.55,
              phase: Math.random() * Math.PI * 2,
              depth: 0.75 + Math.random() * 0.25,
              halo: false,
            });
          }
        }
      }

      // halo field — stipple identity surrounding the text
      if (halo) {
        const step = gap * 1.65;
        for (let y = -padT; y < textH + padT; y += step) {
          for (let x = -padL; x < textW + padL; x += step) {
            const jx = x + (Math.random() - 0.5) * gap * 0.9;
            const jy = y + (Math.random() - 0.5) * gap * 0.9;
            const ix = Math.floor(jx);
            const iy = Math.floor(jy);
            let onGlyph = false;
            if (ix >= 0 && iy >= 0 && ix < textW && iy < textH) {
              const a = data[(iy * textW + ix) * 4 + 3];
              if (a > 100) onGlyph = true;
            }
            if (onGlyph) continue;
            const mix = (jx + padL) / (textW + padL * 2);
            const distEdge = Math.min(
              jx + padL, textW - jx, jy + padT, textH - jy,
              padL, padT
            );
            const edgeFade = Math.min(1, Math.max(0, distEdge / (gap * 5)));
            if (edgeFade < 0.05) continue;
            dots.push({
              tx: jx + padL, ty: jy + padT,
              x: jx + padL + (Math.random() - 0.5) * 8,
              y: jy + padT + (Math.random() - 0.5) * 8,
              r: lerp(ACID.r, EMBER.r, mix),
              g: lerp(ACID.g, EMBER.g, mix),
              b: lerp(ACID.b, EMBER.b, mix),
              size: 0.35 + Math.random() * 0.55,
              phase: Math.random() * Math.PI * 2,
              depth: 0.3 + Math.random() * 0.4,
              halo: true,
            });
          }
        }
      }

      dotsRef.current = dots;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const time = (now || 0) / 1000;
      ctx.clearRect(0, 0, cssW, cssH);
      const dots = dotsRef.current;
      const target = assembled.current;
      const px = pointer.current;
      const active = px.inside && target && !reduced;

      // wave propagation from cursor movement
      if (active && !reduced) {
        const mv = Math.abs(px.x - px.px) + Math.abs(px.y - px.py);
        if (mv > 3) {
          wave.current = { cx: px.x, cy: px.y, t: time, strength: Math.min(1, mv / 18) };
        }
      }
      px.px = px.x;
      px.py = px.y;
      const wv = wave.current;
      const waveAge = time - wv.t;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const amb = reduced ? 0 : (d.halo ? 1.1 : 0.65);
        let goalX = d.tx + Math.sin(time * 0.85 + d.phase) * amb;
        let goalY = d.ty + Math.cos(time * 1.05 + d.phase) * amb;

        let drawSize = d.size;
        let alpha = d.halo ? 0.22 + d.depth * 0.18 : 0.78 + d.depth * 0.22;
        let rr = d.r, gg = d.g, bb = d.b;
        let glow = 0;

        // ripple wave
        if (!reduced && waveAge < 1.4 && wv.strength > 0.05) {
          const wdx = goalX - wv.cx;
          const wdy = goalY - wv.cy;
          const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
          const ripple = Math.sin(wdist * 0.14 - waveAge * 9) * wv.strength * Math.max(0, 1 - waveAge / 1.4);
          if (wdist > 0.001) {
            goalX += (wdx / wdist) * ripple * 5;
            goalY += (wdy / wdist) * ripple * 5;
          }
          if (Math.abs(ripple) > 0.08) drawSize += Math.abs(ripple) * 0.6;
        }

        if (active) {
          const dx = px.x - goalX;
          const dy = px.y - goalY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const reach = d.halo ? radius * 1.35 : radius;
          if (dist < reach) {
            const f = 1 - dist / reach;
            const pull = f * f * (d.halo ? 5 : 9);
            if (dist > 0.001) {
              goalX += (dx / dist) * pull;
              goalY += (dy / dist) * pull;
            }
            drawSize += f * (d.halo ? 1.4 : 2.4);
            alpha = Math.min(1, alpha + f * (d.halo ? 0.25 : 0.3));
            rr = lerp(rr, ACID.r, f * 0.55);
            gg = lerp(gg, ACID.g, f * 0.55);
            bb = lerp(bb, ACID.b, f * 0.55);
            glow = f;
          }
        }

        const speed = target ? (d.halo ? 0.12 : 0.16) : 0.05;
        d.x += (goalX - d.x) * speed;
        d.y += (goalY - d.y) * speed;

        if (glow > 0.02) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rr | 0}, ${gg | 0}, ${bb | 0}, ${0.1 * glow})`;
          ctx.arc(d.x, d.y, drawSize * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rr | 0}, ${gg | 0}, ${bb | 0}, ${alpha})`;
        ctx.arc(d.x, d.y, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf;
    const loop = (now) => { draw(now); raf = requestAnimationFrame(loop); };

    build();
    if (reduced) {
      assembled.current = true;
      dotsRef.current.forEach((d) => { d.x = d.tx; d.y = d.ty; });
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    let observer;
    if (revealOnView && !reduced) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) assembled.current = true; }),
        { threshold: 0.3 }
      );
      observer.observe(wrap);
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.inside = true;
    };
    const onLeave = () => { pointer.current.inside = false; };
    if (!reduced) {
      window.addEventListener('mousemove', onMove, { passive: true });
      wrap.addEventListener('mouseleave', onLeave);
    }

    let resizeT;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        build();
        if (reduced) {
          dotsRef.current.forEach((d) => { d.x = d.tx; d.y = d.ty; });
          draw(0);
        }
      }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [text, fontSize, fontWeight, fontFamily, gap, revealOnView, halo]);

  const canvasMargin = align === 'center' ? '0 auto' : '0';
  return (
    <div ref={wrapRef} className={className} style={{ width: '100%', ...style }}>
      <span className="sr-only">{text}</span>
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', maxWidth: '100%', margin: canvasMargin }} />
    </div>
  );
}

export default function StippleText(props) {
  return <DotType revealOnView={false} halo={false} {...props} />;
}

export function StippleReveal(props) {
  return <DotType revealOnView halo={false} {...props} />;
}
