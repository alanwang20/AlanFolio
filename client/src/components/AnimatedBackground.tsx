import { useEffect, useRef } from 'react';

// ECG waveform amplitude at a given phase (0–1)
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
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // All coordinates are viewport-relative (clientX / clientY)
  const mousePos = useRef({ x: -2000, y: -2000 });
  const targetPos = useRef({ x: -2000, y: -2000 });
  const lastRipplePos = useRef({ x: -2000, y: -2000 });
  const ripples = useRef<Ripple[]>([]);
  const ecgOffset = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas exactly covers the viewport — everything is in viewport coordinates
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateCursor = (nx: number, ny: number) => {
      targetPos.current = { x: nx, y: ny };
      const dx = nx - lastRipplePos.current.x;
      const dy = ny - lastRipplePos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 50 && ripples.current.length < 5) {
        ripples.current.push({ x: nx, y: ny, radius: 0, maxRadius: 70 + Math.random() * 50, alpha: 0.45 });
        lastRipplePos.current = { x: nx, y: ny };
      }
    };

    const handleMouseMove = (e: MouseEvent) => updateCursor(e.clientX, e.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCursor(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCursor(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Particles live in viewport space and wrap at canvas boundaries
    const particles: Particle[] = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.022,
      });
    }

    const GRID = 55;

    const animate = () => {
      if (!ctx || !canvas) return;
      frameRef.current = requestAnimationFrame(animate);

      // Smooth cursor
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.10;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.10;

      const w = canvas.width;
      const h = canvas.height;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Dot grid ──────────────────────────────────────────────────────
      const colCount = Math.ceil(w / GRID) + 1;
      const rowCount = Math.ceil(h / GRID) + 1;

      for (let r = 0; r <= rowCount; r++) {
        for (let c = 0; c <= colCount; c++) {
          const gx = c * GRID;
          const gy = r * GRID;
          const distToMouse = Math.sqrt((mx - gx) ** 2 + (my - gy) ** 2);
          const glow = Math.max(0, 1 - distToMouse / 180);
          ctx.beginPath();
          ctx.arc(gx, gy, 1.2 + glow * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(28, 148, 158, ${0.055 + glow * 0.22})`;
          ctx.fill();
        }
      }

      // ── 2. Cursor glow ───────────────────────────────────────────────────
      const outerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 480);
      outerGlow.addColorStop(0, 'rgba(24, 138, 150, 0.18)');
      outerGlow.addColorStop(0.35, 'rgba(20, 128, 140, 0.07)');
      outerGlow.addColorStop(1, 'rgba(24, 138, 150, 0)');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, w, h);

      const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 110);
      innerGlow.addColorStop(0, 'rgba(28, 158, 168, 0.38)');
      innerGlow.addColorStop(0.5, 'rgba(24, 142, 152, 0.14)');
      innerGlow.addColorStop(1, 'rgba(24, 142, 152, 0)');
      ctx.fillStyle = innerGlow;
      ctx.fillRect(0, 0, w, h);

      // ── 3. Ripple rings ──────────────────────────────────────────────────
      ripples.current = ripples.current.filter(r => r.alpha > 0.015);
      for (const ripple of ripples.current) {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.055;
        ripple.alpha *= 0.92;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26, 152, 162, ${ripple.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (ripple.radius > 25) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(24, 138, 150, ${ripple.alpha * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── 4. ECG scanlines ─────────────────────────────────────────────────
      ecgOffset.current += 1.4;
      const ecgPeriod = 220;
      const ecgRows = [
        { y: h * 0.32, baseAlpha: 0.18, amplitude: 18 },
        { y: h * 0.67, baseAlpha: 0.11, amplitude: 13 },
      ];

      for (const { y: ecgY, baseAlpha, amplitude } of ecgRows) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const phase = (((x - ecgOffset.current) % ecgPeriod) + ecgPeriod) % ecgPeriod / ecgPeriod;
          const amp = ecgAmp(phase) * amplitude;
          if (x === 0) ctx.moveTo(x, ecgY - amp);
          else ctx.lineTo(x, ecgY - amp);
        }
        ctx.strokeStyle = `rgba(24, 150, 138, ${baseAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const nearY = Math.abs(my - ecgY);
        if (nearY < 120) {
          const nearGlow = Math.max(0, 1 - nearY / 120);
          ctx.beginPath();
          for (let x = 0; x <= w; x += 2) {
            const phase = (((x - ecgOffset.current) % ecgPeriod) + ecgPeriod) % ecgPeriod / ecgPeriod;
            const amp = ecgAmp(phase) * amplitude;
            if (x === 0) ctx.moveTo(x, ecgY - amp);
            else ctx.lineTo(x, ecgY - amp);
          }
          ctx.strokeStyle = `rgba(30, 162, 148, ${nearGlow * 0.4})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // ── 5. Particles ─────────────────────────────────────────────────────
      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 260 && dist > 0) {
          const force = (260 - dist) / 260;
          p.vx += (dx / dist) * force * 0.055;
          p.vy += (dy / dist) * force * 0.055;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const distToMouse = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
        const glow = Math.max(0, 1 - distToMouse / 320);
        const pulseFactor = 1 + Math.sin(p.pulse) * 0.25;
        const drawSize = p.size * pulseFactor + glow * 1.8;

        if (glow > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawSize + 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26, 145, 155, ${glow * 0.14})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 145, 155, ${0.30 + glow * 0.55})`;
        ctx.fill();
      }

      // ── 6. Particle connections ──────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const dMouse = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
            const lineGlow = Math.max(0, 1 - dMouse / 280);
            const lineAlpha = (0.10 + lineGlow * 0.32) * (1 - dist / 125);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(24, 138, 150, ${lineAlpha})`;
            ctx.lineWidth = 0.5 + lineGlow * 0.9;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.88, willChange: 'transform', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
    />
  );
}
