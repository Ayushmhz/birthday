import { useEffect, useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { birthday } from "@/config/birthday";
import { burst, celebrate } from "@/lib/effects";
import { Reveal, Section } from "./Section";
import { Heart, Sparkles, X } from "lucide-react";

export function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [],
  );

  const handleOpen = useCallback(() => {
    setRevealed(true);
    burst({ count: 120, hearts: true });
    celebrate(true);
    window.dispatchEvent(new CustomEvent("birthday:start-music"));
  }, []);

  const handleClose = useCallback(() => {
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [revealed, handleClose]);

  return (
    <Section className="pb-32 text-center">
      <Reveal>
        <div className="flex items-center justify-center gap-2 text-primary font-hand text-2xl">
          <Sparkles className="size-5 animate-pulse" />
          <span>A special message for you</span>
          <Sparkles className="size-5 animate-pulse" />
        </div>
        <h2 className="mt-2 text-3xl font-semibold sm:text-5xl text-foreground">
          One More Thing...
        </h2>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleOpen}
            className="group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-9 py-4 text-lg font-bold text-white shadow-[0_10px_35px_-5px_rgba(244,63,94,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_45px_-5px_rgba(244,63,94,0.8)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-rose-400/40 [animation-duration:2.5s]"
            />
            <Heart className="size-5 fill-white text-white transition-transform group-hover:scale-125" />
            <span>Click Me ❤️</span>
          </button>
        </div>
      </Reveal>

      {revealed &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Final birthday message"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md animate-in fade-in duration-300"
          >
            {/* Twinkling background stars */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {stars.map((s) => (
                <span
                  key={s.id}
                  className="absolute animate-pulse rounded-full bg-white shadow-[0_0_10px_white]"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Popup Card */}
            <div className="relative my-auto w-full max-w-xl rounded-3xl border border-white/20 bg-gradient-to-b from-purple-950/90 via-pink-950/90 to-slate-950/95 p-6 text-center text-white shadow-2xl backdrop-blur-2xl sm:p-10">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="size-6" />
              </button>

              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                <Heart className="size-8 fill-rose-500 text-rose-500 animate-bounce" />
              </div>

              <h3 className="font-display text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 sm:text-4xl">
                Happy Birthday, {birthday.name}! 🎂
              </h3>

              <p className="mt-6 font-hand text-xl leading-relaxed text-pink-100/90 sm:text-2xl">
                {birthday.finalLine}
              </p>

              <p className="mt-6 text-base font-semibold text-amber-300 sm:text-xl">
                {birthday.finalOutro}
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/15 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-white/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Close ❤️
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Section>
  );
}
