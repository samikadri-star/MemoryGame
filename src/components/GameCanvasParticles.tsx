import React, { useEffect, useRef } from 'react';

export interface ParticleTrigger {
  x: number;
  y: number;
  color: string;
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  rotation: number;
  vRot: number;
}

interface Props {
  trigger?: ParticleTrigger | null;
  ambient?: boolean;
}

export const GameCanvasParticles: React.FC<Props> = ({ trigger, ambient = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ambientParticlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Setup ambient particles
  useEffect(() => {
    const ambientList = [];
    for (let i = 0; i < 45; i++) {
      ambientList.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35,
        size: 1 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2
      });
    }
    ambientParticlesRef.current = ambientList;
  }, []);

  // Spawn burst on trigger
  useEffect(() => {
    if (!trigger) return;
    const count = trigger.count || 28;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 6.5;
      newParticles.push({
        x: trigger.x,
        y: trigger.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 3 + Math.random() * 4,
        color: trigger.color || '#F59E0B',
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        gravity: 0.12,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2
      });
    }

    particlesRef.current.push(...newParticles);
  }, [trigger]);

  // Main 60fps render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      const rawDt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const dt = Math.min(rawDt, 0.05); // clamped dt

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Ambient Stardust
      if (ambient) {
        ctx.save();
        ambientParticlesRef.current.forEach((p) => {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
          p.pulse += dt * 2;

          if (p.y < 0) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;

          const currentAlpha = Math.max(0.1, p.alpha * (0.6 + 0.4 * Math.sin(p.pulse)));
          ctx.fillStyle = `rgba(217, 230, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // Render Burst Particles
      const activeBursts: Particle[] = [];
      particlesRef.current.forEach((p) => {
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.vy += p.gravity * dt * 60;
        p.alpha -= p.decay * dt * 60;
        p.rotation += p.vRot;

        if (p.alpha > 0.01) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;

          // Sparkle diamond shape
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.7, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.7, 0);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
          activeBursts.push(p);
        }
      });

      particlesRef.current = activeBursts;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [ambient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
