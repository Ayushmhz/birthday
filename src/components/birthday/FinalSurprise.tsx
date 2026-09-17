import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { birthday } from "@/config/birthday";
import { celebrate } from "@/lib/effects";
import { Reveal, Section } from "./Section";

export function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [],
  );

  useEffect(() => {
    if (!revealed) return;
    celebrate(true);
    const id = window.setInterval(() => celebrate(true), 3500);
    return () => window.clearInterval(id);
  }, [revealed]);

  return (
    <Section className="pb-32 text-center">
      <Reveal>
        <h2 className="text-3xl font-semibold sm:text-5xl">One More Thing...</h2>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-9 py-4 text-lg font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30 [animation-duration:3s]" />
          Click Me ❤️
        </button>
      </Reveal>

      {revealed && typeof document !== "undefined" && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Final birthday message"
          className="fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto overscroll-contain bg-foreground/85 px-5 py-12 backdrop-blur-lg animate-in fade-in duration-700"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {stars.map((s) => (
              <span
                key={s.id}
                className="absolute animate-twinkle rounded-full bg-white shadow-[0_0_12px_white]"
                style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
              />
            ))}
          </div>

          <div className="relative my-auto w-full max-w-2xl animate-pop-in text-center">
            <h3 className="text-gradient text-3xl font-bold leading-tight sm:text-6xl">
              Happy Birthday, {birthday.name} ❤️
            </h3>
            <p className="mt-5 font-hand text-xl leading-relaxed text-white/90 sm:mt-6 sm:text-3xl">
              {birthday.finalLine}
            </p>
            <p className="mt-5 text-base font-semibold text-peach sm:mt-6 sm:text-2xl">{birthday.finalOutro}</p>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="mt-8 rounded-full border border-white/40 px-6 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Close
            </button>
          </div>
        </div>,
        document.body,
      )}
    </Section>
  );
}
