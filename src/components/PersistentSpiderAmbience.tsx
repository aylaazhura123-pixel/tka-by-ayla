import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/soundEngine';

export const PersistentSpiderAmbience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mascotBubble, setMascotBubble] = useState<string | null>('Semangat belajarnya, Ila! 🕷️✨');

  useEffect(() => {
    const timer = setTimeout(() => setMascotBubble(null), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Glowing spider silk ember & star particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      type: 'dot' | 'spark' | 'silk';
    }

    const colors = ['#e11d48', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.3 - Math.random() * 0.7, // kinetic upward drift
        size: 1.2 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.25 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        type: i % 4 === 0 ? 'spark' : i % 7 === 0 ? 'silk' : 'dot',
      });
    }

    // Spider sense expanding radar pulse rings
    interface RadarRing {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
      speed: number;
    }

    const rings: RadarRing[] = [
      { x: width * 0.15, y: height * 0.2, radius: 10, maxRadius: 160, alpha: 0.35, color: '#e11d48', speed: 0.8 },
      { x: width * 0.85, y: height * 0.75, radius: 40, maxRadius: 220, alpha: 0.3, color: '#38bdf8', speed: 0.7 },
      { x: width * 0.5, y: height * 0.9, radius: 100, maxRadius: 280, alpha: 0.25, color: '#fbbf24', speed: 0.6 },
    ];

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw animated expanding spider-sense radar waves
      for (const r of rings) {
        r.radius += r.speed;
        if (r.radius > r.maxRadius) {
          r.radius = 10;
        }

        const ringProgress = r.radius / r.maxRadius;
        const currentAlpha = (1 - ringProgress) * r.alpha;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.stroke();

        // Secondary inner dash ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.setLineDash([4, 8]);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = Math.max(0, currentAlpha * 0.6);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Draw and connect kinetic particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + i * 0.5) * 0.35;
        p.y += p.vy;

        // Wrap around seamlessly
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Pulsing glow
        const currentAlpha = p.alpha + Math.sin(time * 3 + i) * 0.2;
        const drawAlpha = Math.max(0.1, Math.min(0.95, currentAlpha));

        ctx.beginPath();
        if (p.type === 'spark') {
          // 4-pointed diamond spark
          const sz = p.size * 1.5;
          ctx.moveTo(p.x, p.y - sz);
          ctx.lineTo(p.x + sz * 0.4, p.y);
          ctx.lineTo(p.x, p.y + sz);
          ctx.lineTo(p.x - sz * 0.4, p.y);
          ctx.closePath();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = drawAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw web line to close neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#e11d48';
            ctx.globalAlpha = (1 - dist / 120) * 0.22;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMascotClick = () => {
    sound.playWebShoot();
    const quotes = [
      'Semangat 17 hari, Ila! Kamu pasti bisa tembus PTN impian! 🕷️🔥',
      'Ingat rumus diagonal ruang kubus: s√3! 📐',
      'Biaya peluang itu alternatif terbaik yang dikorbankan ya! 💡',
      'Jangan lupa metode blurting: tutup catatan dan tulis semua! 🧠',
      'Musik Sunflower bikin fokus belajarmu makin asyik! 🌻',
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setMascotBubble(randomQuote);
    setTimeout(() => setMascotBubble(null), 4500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic HTML5 Canvas for continuous particles & radar ripples */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Top Left Persistent Swaying Corner Spider Web */}
      <div className="absolute -top-6 -left-6 w-48 h-48 text-rose-500/30 animate-web-swing origin-top-left pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(225,29,72,0.4)]">
          <path d="M 0 0 L 100 0 M 0 0 L 92 38 M 0 0 L 70 70 M 0 0 L 38 92 M 0 0 L 0 100" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 20 0 Q 18 18 0 20" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 40 0 Q 36 36 0 40" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 60 0 Q 54 54 0 60" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 80 0 Q 72 72 0 80" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 100 0 Q 90 90 0 100" fill="none" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </div>

      {/* Top Right Persistent Swaying Corner Spider Web */}
      <div className="absolute -top-6 -right-6 w-48 h-48 text-cyan-400/25 animate-web-swing origin-top-right pointer-events-none" style={{ animationDelay: '1.8s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          <path d="M 100 0 L 0 0 M 100 0 L 8 38 M 100 0 L 30 70 M 100 0 L 62 92 M 100 0 L 100 100" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 80 0 Q 82 18 100 20" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 60 0 Q 64 36 100 40" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 40 0 Q 46 54 100 60" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 20 0 Q 28 72 100 80" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M 0 0 Q 10 90 100 100" fill="none" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </div>

      {/* Ambient Moving Glow Halos */}
      <div className="absolute bottom-16 right-16 w-96 h-96 rounded-full bg-radial from-rose-600/15 via-cyan-500/10 to-transparent blur-3xl animate-spider-pulse pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-radial from-cyan-600/15 via-rose-500/5 to-transparent blur-3xl animate-float pointer-events-none" />

      {/* Mini Persistent Swinging Mascot Araki at Top Right (Pointer Events Enabled for mascot only!) */}
      <div className="absolute top-16 right-4 sm:right-8 z-20 pointer-events-auto flex flex-col items-center">
        {/* Glowing Web Thread */}
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-rose-500/80 via-white to-rose-400 shadow-[0_0_8px_rgba(225,29,72,0.8)]" />

        {/* Mascot Avatar that swings */}
        <motion.div
          animate={{
            rotate: [-6, 6, -6],
            y: [0, 4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handleMascotClick}
          className="relative cursor-pointer group active:scale-95 transition-transform"
          title="Klik Araki untuk tips superhero!"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-rose-950/80 group-hover:brightness-110">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-xl">
              🕷️
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-900 animate-ping" />

          {/* Speech Bubble on click */}
          <AnimatePresence>
            {mascotBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1 right-14 w-52 p-2.5 rounded-2xl bg-slate-900/95 border border-rose-500/60 text-xs font-semibold text-white shadow-2xl backdrop-blur-md z-30"
              >
                <div className="text-[10px] text-rose-400 font-bold mb-0.5">Araki Mentor:</div>
                <p className="leading-snug text-slate-200">{mascotBubble}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
