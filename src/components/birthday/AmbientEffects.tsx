import { useEffect, useMemo, useState } from "react";

/** Floating hearts + twinkling sparkles rendered behind all content. */
export function AmbientEffects() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 14,
        size: 12 + Math.random() * 20,
        drift: `${(Math.random() - 0.5) * 160}px`,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [],
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose/25 blur-[110px] animate-breathe" />
      <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-lavender/25 blur-[120px] animate-breathe [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-peach/30 blur-[110px] animate-breathe [animation-delay:4s]" />

      {mounted && sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_currentColor] text-gold animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {mounted && hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-10vh] select-none text-rose"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            ["--drift" as string]: h.drift,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
