import { useEffect, useRef } from 'react';

// ECG waveform amplitude at a given phase (0–1)
function ecgAmp(phase: number): number {
  if (phase < 0.08) return Math.sin((phase / 0.08) * Math.PI) * 2.5;           // P wave
  if (phase < 0.18) return 0;                                                    // PQ flat
  if (phase < 0.22) return -Math.sin(((phase - 0.18) / 0.04) * Math.PI) * 3;   // Q dip
  if (phase < 0.28) return Math.sin(((phase - 0.22) / 0.06) * Math.PI) * 20;   // R spike
  if (phase < 0.33) return -Math.sin(((phase - 0.28) / 0.05) * Math.PI) * 5;   // S dip
  if (phase < 0.43) return 0;                                                    // ST flat
  if (phase < 0.63) return Math.sin(((phase - 0.43) / 0.20) * Math.PI) * 7;    // T wave
  return 0;                                                                       // TP flat
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const nx = e.clientX;
      const ny = e.clientY + window.scrollY;
      targetPos.current = { x: nx, y: ny };

      const dx = nx - lastRipplePos.current.x;
      const dy = ny - lastRipplePos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 50 && ripples.current.length < 5) {
        ripples.current.push({ x: nx, y: ny, radius: 0, maxRadius: 70 + Math.random() * 50, alpha: 0.45 });
        lastRipplePos.current = { x: nx, y: ny };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particles
    const particles: Particle[] = [];
    for (let i = 0; i < 65; i++) {
      const y = Math.random() * (canvas.height || window.innerHeight * 4);
      particles.push({
        x: Math.random() * (canvas.width || window.innerWidth),
        y,
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // ── 1. Dot grid (visible viewport only) ──────────────────────────────
      const colCount = Math.ceil(canvas.width / GRID) + 1;
      const rowCount = Math.ceil(vh / GRID) + 1;
      const gridOffsetY = scrollY % GRID;

      for (let r = 0; r <= rowCount; r++) {
        for (let c = 0; c <= colCount; c++) {
          const gx = c * GRID;
          const gy = scrollY + r * GRID - gridOffsetY;
          const distToMouse = Math.sqrt((mx - gx) ** 2 + (my - gy) ** 2);
          const glow = Math.max(0, 1 - distToMouse / 180);
          const dotAlpha = 0.055 + glow * 0.22;
          const dotSize = 1.2 + glow * 1.4;
          ctx.beginPath();
          ctx.arc(gx, gy, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 220, ${dotAlpha})`;
          ctx.fill();
        }
      }

      // ── 2. Cursor glow ────────────────────────────────────────────────────
      // Outer ambient
      const outerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 480);
      outerGlow.addColorStop(0, 'rgba(0, 200, 220, 0.18)');
      outerGlow.addColorStop(0.35, 'rgba(0, 180, 210, 0.07)');
      outerGlow.addColorStop(1, 'rgba(0, 200, 220, 0)');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, scrollY, canvas.width, vh);

      // Inner sharp focus
      const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 110);
      innerGlow.addColorStop(0, 'rgba(0, 240, 255, 0.38)');
      innerGlow.addColorStop(0.5, 'rgba(0, 210, 230, 0.14)');
      innerGlow.addColorStop(1, 'rgba(0, 210, 230, 0)');
      ctx.fillStyle = innerGlow;
      ctx.fillRect(0, scrollY, canvas.width, vh);

      // ── 3. Ripple rings ───────────────────────────────────────────────────
      ripples.current = ripples.current.filter(r => r.alpha > 0.015);
      for (const ripple of ripples.current) {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.055;
        ripple.alpha *= 0.92;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 230, 245, ${ripple.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (ripple.radius > 25) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 200, 220, ${ripple.alpha * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── 4. ECG scanlines (two rows) ───────────────────────────────────────
      ecgOffset.current += 1.4;
      const ecgPeriod = 220;
      const ecgRows = [
        { y: scrollY + vh * 0.32, baseAlpha: 0.18, amplitude: 18 },
        { y: scrollY + vh * 0.67, baseAlpha: 0.11, amplitude: 13 },
      ];

      for (const { y: ecgY, baseAlpha, amplitude } of ecgRows) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const phase = (((x - ecgOffset.current) % ecgPeriod) + ecgPeriod) % ecgPeriod / ecgPeriod;
          const amp = ecgAmp(phase) * amplitude;
          if (x === 0) ctx.moveTo(x, ecgY - amp);
          else ctx.lineTo(x, ecgY - amp);
        }
        ctx.strokeStyle = `rgba(0, 235, 200, ${baseAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // bright cursor-proximity glow on the ECG line
        const distToCursor = Math.abs(mx - canvas.width / 2);
        if (distToCursor < canvas.width) {
          const nearY = Math.abs(my - ecgY);
          if (nearY < 120) {
            const nearGlow = Math.max(0, 1 - nearY / 120);
            ctx.beginPath();
            for (let x = 0; x <= canvas.width; x += 2) {
              const phase = (((x - ecgOffset.current) % ecgPeriod) + ecgPeriod) % ecgPeriod / ecgPeriod;
              const amp = ecgAmp(phase) * amplitude;
              if (x === 0) ctx.moveTo(x, ecgY - amp);
              else ctx.lineTo(x, ecgY - amp);
            }
            ctx.strokeStyle = `rgba(0, 255, 200, ${nearGlow * 0.4})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      // ── 5. Particles ──────────────────────────────────────────────────────
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

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const distToMouse = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
        const glow = Math.max(0, 1 - distToMouse / 320);
        const pulseFactor = 1 + Math.sin(p.pulse) * 0.25;
        const drawSize = p.size * pulseFactor + glow * 1.8;

        if (glow > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawSize + 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 225, ${glow * 0.14})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 225, ${0.30 + glow * 0.55})`;
        ctx.fill();
      }

      // ── 6. Particle connections ───────────────────────────────────────────
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
            ctx.strokeStyle = `rgba(0, 200, 220, ${lineAlpha})`;
            ctx.lineWidth = 0.5 + lineGlow * 0.9;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.88 }}
    />
  );
}
