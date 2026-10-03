import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/soundEngine';

interface RipplePoint {
  id: number;
  x: number;
  y: number;
}

export const TouchFeedback: React.FC = () => {
  const [ripples, setRipples] = useState<RipplePoint[]>([]);

  useEffect(() => {
    let count = 0;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (clientX === 0 && clientY === 0) return;

      // Avoid triggering on inputs/textareas to allow natural typing
      const target = e.target as HTMLElement | null;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      if (!isTyping) {
        sound.playTap();
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }

      const id = ++count;
      setRipples((prev) => [...prev.slice(-8), { id, x: clientX, y: clientY }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.9, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{ left: ripple.x - 28, top: ripple.y - 28 }}
            className="absolute w-14 h-14 rounded-full border border-rose-500/80 bg-radial from-rose-500/20 via-cyan-400/10 to-transparent flex items-center justify-center pointer-events-none"
          >
            {/* Small spider web micro-crosshair */}
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-cyan-400/70">
              <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="0.8" />
              <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
