import { useRef, useEffect } from 'react';
import { useMotionValueEvent, useMotionValue } from 'framer-motion';

/* ─── Acid Ink duotone ─── */
const ACID = { r: 200, g: 255, b: 45 };
const EMBER = { r: 255, g: 90, b: 31 };
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * ParticleNetwork — signature living digital sphere.
 * Layered nodes, orbiting particles, energy fields, scroll-reactive scale,
 * mouse tilt/distortion, and depth-sorted rendering. Pure 2D canvas.
 */
export default function ParticleNetwork({
  count = 160,
  scrollProgress = null,
  style = {},
  className = '',
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const fallbackScroll = useMotionValue(0);
  const scrollSource = scrollProgress ?? fallbackScroll;

  useMotionValueEvent(scrollSource, 'change', (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let size = 0;
    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const n = count;
    const nodes = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      nodes.push({
        bx: Math.cos(theta) * r,
        by: y,
        bz: Math.sin(theta) * r,
        mix: (Math.cos(theta) * r + 1) / 2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const links = [];
    const linkDist = 0.52;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = nodes[i].bx - nodes[j].bx;
        const dy = nodes[i].by - nodes[j].by;
        const dz = nodes[i].bz - nodes[j].bz;
        if (dx * dx + dy * dy + dz * dz < linkDist * linkDist) links.push([i, j]);
      }
    }

    // orbiting ring particles
    const orbitCount = 36;
    const orbits = Array.from({ length: orbitCount }, (_, i) => ({
      angle: (i / orbitCount) * Math.PI * 2,
      radius: 0.92 + (i % 3) * 0.07,
      speed: 0.004 + (i % 5) * 0.0012,
      tilt: (i % 7) * 0.4,
      mix: (i / orbitCount),
      size: 0.8 + (i % 4) * 0.3,
    }));

    // Size from layout box (NOT affected by parent CSS transforms / scale anims)
    const measure = (w, h) => {
      if (!w || !h) return;
      W = w;
      H = h;
      size = Math.min(w, h);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const box = entry.borderBoxSize?.[0];
        if (box) measure(box.inlineSize, box.blockSize);
        else measure(entry.contentRect.width, entry.contentRect.height);
      }
    });
    ro.observe(wrap);
    // initial synchronous measure so first paint is correct
    measure(wrap.clientWidth, wrap.clientHeight);

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible && !reduced && raf == null) raf = requestAnimationFrame(loop);
      }),
      { threshold: 0 }
    );
    io.observe(wrap);

    let rotY = 0;
    let rotX = 0.22;
    let curMX = 0, curMY = 0;
    const persp = 2.35;
    const proj = [];

    const render = (t) => {
      if (!W || !H) return;
      const cx = W / 2, cy = H / 2;
      const scroll = scrollRef.current;
      const breathe = 1 + scroll * 0.1;
      const R = size * 0.34 * breathe;
      ctx.clearRect(0, 0, W, H);

      curMX += (mouse.current.x - curMX) * 0.045;
      curMY += (mouse.current.y - curMY) * 0.045;

      // energy field — layered glow rings
      const glowPulse = reduced ? 1 : 0.85 + Math.sin(t / 1200) * 0.15;
      for (let ring = 3; ring >= 0; ring--) {
        const gr = R * (0.92 + ring * 0.1) * glowPulse;
        const g = ctx.createRadialGradient(cx, cy, gr * 0.2, cx, cy, gr);
        const a = (0.07 - ring * 0.015) * (1 - scroll * 0.4);
        g.addColorStop(0, `rgba(200,255,45,${a})`);
        g.addColorStop(0.5, `rgba(255,90,31,${a * 0.4})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(cx, cy, gr, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) rotY += 0.0028 + scroll * 0.001;
      const distort = curMX * 0.08;
      const ry = rotY + curMX * 0.55;
      const rx = rotX + curMY * 0.38;

      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);

      for (let i = 0; i < n; i++) {
        const nd = nodes[i];
        let x = nd.bx * cosY + nd.bz * sinY;
        let z = -nd.bx * sinY + nd.bz * cosY;
        let y = nd.by * cosX - z * sinX;
        z = nd.by * sinX + z * cosX;
        // mouse distortion — bulge toward viewer near cursor
        z += distort * nd.bx * 0.15;

        const scale = persp / (persp - z);
        proj[i] = { x: cx + x * R * scale, y: cy + y * R * scale, z, scale };
      }

      // links
      for (let k = 0; k < links.length; k++) {
        const a = proj[links[k][0]];
        const b = proj[links[k][1]];
        const depth = (a.z + b.z) / 2;
        const dAlpha = Math.max(0, (depth + 1) / 2);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200, 255, 45, ${0.05 + dAlpha * 0.16})`;
        ctx.lineWidth = 0.5 + dAlpha * 0.7;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // orbiting particles
      for (let oi = 0; oi < orbitCount; oi++) {
        const o = orbits[oi];
        if (!reduced) o.angle += o.speed;
        const ox = Math.cos(o.angle) * o.radius;
        const oz = Math.sin(o.angle) * o.radius;
        const oy = Math.sin(o.angle * 0.7 + o.tilt) * 0.35;
        let x = ox * cosY + oz * sinY;
        let z = -ox * sinY + oz * cosY;
        let y = oy * cosX - z * sinX;
        z = oy * sinX + z * cosX;
        const sc = persp / (persp - z);
        const px = cx + x * R * sc * 0.74;
        const py = cy + y * R * sc * 0.74;
        const dA = Math.max(0.15, (z + 1) / 2);
        const cr = lerp(ACID.r, EMBER.r, o.mix);
        const cg = lerp(ACID.g, EMBER.g, o.mix);
        const cb = lerp(ACID.b, EMBER.b, o.mix);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${0.2 + dA * 0.5})`;
        ctx.arc(px, py, o.size * sc * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes — back to front
      const order = proj.map((_, i) => i).sort((i, j) => proj[i].z - proj[j].z);
      const pmx = cx + curMX * W * 0.45;
      const pmy = cy + curMY * H * 0.45;

      for (let oi = 0; oi < order.length; oi++) {
        const i = order[oi];
        const p = proj[i];
        const nd = nodes[i];
        const dAlpha = Math.max(0.12, (p.z + 1) / 2);
        const pulse = reduced ? 1 : 0.75 + Math.sin(t / 650 + nd.pulse) * 0.25;

        let r = lerp(ACID.r, EMBER.r, nd.mix);
        let g = lerp(ACID.g, EMBER.g, nd.mix);
        let bb = lerp(ACID.b, EMBER.b, nd.mix);
        let rad = (1.2 + dAlpha * 2.6) * p.scale * 0.72 * pulse;
        let glow = 0;

        const mdx = p.x - pmx;
        const mdy = p.y - pmy;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 140) {
          const f = 1 - md / 140;
          rad += f * 3;
          glow = f * dAlpha;
          r = lerp(r, ACID.r, f * 0.55);
          g = lerp(g, ACID.g, f * 0.55);
          bb = lerp(bb, ACID.b, f * 0.55);
        }

        if (glow > 0.03) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${bb | 0},${0.16 * glow})`;
          ctx.arc(p.x, p.y, rad * 3.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${bb | 0},${0.38 + dAlpha * 0.62})`;
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = null;
    const loop = (t) => {
      render(t);
      if (!visible || reduced) { raf = null; return; }
      raf = requestAnimationFrame(loop);
    };

    if (reduced) render(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [count, scrollProgress]);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
}
