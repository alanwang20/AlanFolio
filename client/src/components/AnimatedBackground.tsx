import { useEffect, useRef } from 'react';

function ecgAmp(phase: number): number {
  if (phase < 0.08) return Math.sin((phase / 0.08) * Math.PI) * 2.5;
  if (phase < 0.18) return 0;
  if (phase < 0.22) return -Math.sin(((phase - 0.18) / 0.04) * Math.PI) * 3;
  if (phase < 0.28) return Math.sin(((phase - 0.22) / 0.06) * Math.PI) * 20;
  if (phase < 0.33) return -Math.sin(((phase - 0.28) / 0.05) * Math.PI) * 5;
  if (phase < 0.43) return 0;
  if (phase < 0.63) return Math.sin(((phase - 0.43) / 0.20) * Math.PI) * 7;
  return 0;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  pulse: number; pulseSpeed: number;
}

interface Ripple {
  x: number; y: number;
  radius: number; maxRadius: number;
  alpha: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos    = useRef({ x: -2000, y: -2000 });
  const targetPos   = useRef({ x: -2000, y: -2000 });
  const lastRipple  = useRef({ x: -2000, y: -2000 });
  const ripples     = useRef<Ripple[]>([]);
  const ecgOffset   = useRef(0);
  const rafId       = useRef(0);
  const lastFrameTs = useRef(0); // timestamp of last rAF tick

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── cursor / touch tracking ───────────────────────────────────────────
    const moveCursor = (x: number, y: number) => {
      targetPos.current = { x, y };
      const dx = x - lastRipple.current.x;
      const dy = y - lastRipple.current.y;
      if (Math.hypot(dx, dy) > 50 && ripples.current.length < 5) {
        ripples.current.push({ x, y, radius: 0, maxRadius: 70 + Math.random() * 50, alpha: 0.45 });
        lastRipple.current = { x, y };
      }
    };

    const onMouse  = (e: MouseEvent)  => moveCursor(e.clientX, e.clientY);
    const onTouchM = (e: TouchEvent)  => e.touches.length && moveCursor(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchS = (e: TouchEvent)  => e.touches.length && moveCursor(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener('mousemove',  onMouse);
    window.addEventListener('touchmove',  onTouchM, { passive: true });
    window.addEventListener('touchstart', onTouchS, { passive: true });

    // ── particles ────────────────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.022,
    }));

    const GRID = 55;

    // ── draw loop ────────────────────────────────────────────────────────
    const draw = () => {
      if (!ctx || !canvas) return;
      lastFrameTs.current = Date.now();
      rafId.current = requestAnimationFrame(draw);

      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.10;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.10;

      const w  = canvas.width;
      const h  = canvas.height;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      ctx.clearRect(0, 0, w, h);

      // 1 · dot grid
      const cols = Math.ceil(w / GRID) + 1;
      const rows = Math.ceil(h / GRID) + 1;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const gx = c * GRID, gy = r * GRID;
          const glow = Math.max(0, 1 - Math.hypot(mx - gx, my - gy) / 180);
          ctx.beginPath();
          ctx.arc(gx, gy, 1.2 + glow * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(28, 148, 158, ${0.055 + glow * 0.22})`;
          ctx.fill();
        }
      }

      // 2 · cursor glow
      const og = ctx.createRadialGradient(mx, my, 0, mx, my, 480);
      og.addColorStop(0,    'rgba(24, 138, 150, 0.18)');
      og.addColorStop(0.35, 'rgba(20, 128, 140, 0.07)');
      og.addColorStop(1,    'rgba(24, 138, 150, 0)');
      ctx.fillStyle = og;
      ctx.fillRect(0, 0, w, h);

      const ig = ctx.createRadialGradient(mx, my, 0, mx, my, 110);
      ig.addColorStop(0,   'rgba(28, 158, 168, 0.38)');
      ig.addColorStop(0.5, 'rgba(24, 142, 152, 0.14)');
      ig.addColorStop(1,   'rgba(24, 142, 152, 0)');
      ctx.fillStyle = ig;
      ctx.fillRect(0, 0, w, h);

      // 3 · ripple rings
      ripples.current = ripples.current.filter(r => r.alpha > 0.015);
      for (const rp of ripples.current) {
        rp.radius += (rp.maxRadius - rp.radius) * 0.055;
        rp.alpha  *= 0.92;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26, 152, 162, ${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (rp.radius > 25) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(24, 138, 150, ${rp.alpha * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 4 · ECG scanlines
      ecgOffset.current += 1.4;
      const period = 220;
      for (const { y: ey, base, amp } of [
        { y: h * 0.32, base: 0.18, amp: 18 },
        { y: h * 0.67, base: 0.11, amp: 13 },
      ]) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const ph = (((x - ecgOffset.current) % period) + period) % period / period;
          x === 0 ? ctx.moveTo(x, ey - ecgAmp(ph) * amp) : ctx.lineTo(x, ey - ecgAmp(ph) * amp);
        }
        ctx.strokeStyle = `rgba(24, 150, 138, ${base})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const nearY = Math.abs(my - ey);
        if (nearY < 120) {
          const g = Math.max(0, 1 - nearY / 120);
          ctx.beginPath();
          for (let x = 0; x <= w; x += 2) {
            const ph = (((x - ecgOffset.current) % period) + period) % period / period;
            x === 0 ? ctx.moveTo(x, ey - ecgAmp(ph) * amp) : ctx.lineTo(x, ey - ecgAmp(ph) * amp);
          }
          ctx.strokeStyle = `rgba(30, 162, 148, ${g * 0.4})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 5 · particles
      for (const p of particles) {
        const dx = mx - p.x, dy = my - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < 260 && d > 0) {
          const f = (260 - d) / 260;
          p.vx += (dx / d) * f * 0.055;
          p.vy += (dy / d) * f * 0.055;
        }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x  += p.vx;  p.y  += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        const glow = Math.max(0, 1 - Math.hypot(mx - p.x, my - p.y) / 320);
        const sz   = p.size * (1 + Math.sin(p.pulse) * 0.25) + glow * 1.8;
        if (glow > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz + 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26, 145, 155, ${glow * 0.14})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 145, 155, ${0.30 + glow * 0.55})`;
        ctx.fill();
      }

      // 6 · connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i], p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 125) {
            const lg = Math.max(0, 1 - Math.hypot(mx - (p1.x+p2.x)/2, my - (p1.y+p2.y)/2) / 280);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(24, 138, 150, ${(0.10 + lg * 0.32) * (1 - dist / 125)})`;
            ctx.lineWidth = 0.5 + lg * 0.9;
            ctx.stroke();
          }
        }
      }
    };

    draw();

    // ── iOS keepalive ─────────────────────────────────────────────────────
    // iOS Safari can pause rAF when the page is idle (no user interaction).
    // Every 150 ms, check if the last frame was more than 200 ms ago; if so,
    // cancel the stale rAF handle and kick off a fresh loop.
    const keepAlive = setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastFrameTs.current > 200) {
        cancelAnimationFrame(rafId.current);
        draw();
      }
    }, 150);

    // Also restart on tab focus / visibility restore
    const onVisible = () => {
      if (!document.hidden) {
        cancelAnimationFrame(rafId.current);
        draw();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(rafId.current);
      clearInterval(keepAlive);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouse);
      window.removeEventListener('touchmove',  onTouchM);
      window.removeEventListener('touchstart', onTouchS);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.88,
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}
