import React, { useEffect, useRef } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate voxel floating particles
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles = [];
    const colors = ['#00f5d4', '#10b981', '#38bdf8', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(Math.random() * 8) + 4, // block pixel size
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.01
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Draw miniature 3D voxel cube
        const s = p.size;
        ctx.fillStyle = p.color;
        ctx.fillRect(-s / 2, -s / 2, s, s);

        // Highlight edge (voxel 3D effect)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(-s / 2, -s / 2, s, 2);
        ctx.fillRect(-s / 2, -s / 2, 2, s);

        // Shadow edge
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(-s / 2 + s - 2, -s / 2, 2, s);
        ctx.fillRect(-s / 2, -s / 2 + s - 2, s, 2);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
