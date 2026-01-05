import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

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
      targetPos.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };
    };

    const handleScroll = () => {
      targetPos.current.y = mousePos.current.y - (mousePos.current.y - window.scrollY) * 0.1 + window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseY: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      const y = Math.random() * canvas.height;
      particles.push({
        x: Math.random() * canvas.width,
        y: y,
        baseY: y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1.5,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      const scrollY = window.scrollY;
      
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.6;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.6;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        mousePos.current.x,
        mousePos.current.y,
        0,
        mousePos.current.x,
        mousePos.current.y,
        450
      );

      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
      gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.2)');
      gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.08)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const secondGradient = ctx.createRadialGradient(
        mousePos.current.x + 100,
        mousePos.current.y - 50,
        0,
        mousePos.current.x + 100,
        mousePos.current.y - 50,
        300
      );
      secondGradient.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
      secondGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = secondGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx += (dx / distance) * force * 0.08;
          particle.vy += (dy / distance) * force * 0.08;
        }

        particle.vx *= 0.96;
        particle.vy *= 0.96;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const distToMouse = Math.sqrt(
          Math.pow(mousePos.current.x - particle.x, 2) + 
          Math.pow(mousePos.current.y - particle.y, 2)
        );
        const glowIntensity = Math.max(0, 1 - distToMouse / 400);
        const particleAlpha = 0.4 + glowIntensity * 0.5;
        const particleSize = particle.size + glowIntensity * 2;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particleAlpha})`;
        ctx.fill();

        if (glowIntensity > 0.3) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particleSize + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${glowIntensity * 0.2})`;
          ctx.fill();
        }
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const distToMouse = Math.sqrt(
              Math.pow(mousePos.current.x - midX, 2) + 
              Math.pow(mousePos.current.y - midY, 2)
            );
            const lineGlow = Math.max(0, 1 - distToMouse / 350);
            const lineAlpha = (0.2 + lineGlow * 0.4) * (1 - distance / 150);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8 + lineGlow;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
