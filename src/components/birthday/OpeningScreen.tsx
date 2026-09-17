import { useCallback, useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import { burst, celebrate } from "@/lib/effects";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);
    // keep the user-gesture context so audio is allowed to start
    window.dispatchEvent(new CustomEvent("birthday:start-music"));
    burst({ y: window.innerHeight * 0.45, count: 110, hearts: true });
    celebrate(true);
    window.setTimeout(() => setGone(true), 900);
    window.setTimeout(onOpen, 1500);
  }, [opening, onOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto overscroll-contain px-4 py-8 transition-all duration-700 ease-out ${
        gone ? "pointer-events-none scale-110 opacity-0 blur-sm" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(120% 90% at 20% 10%, oklch(0.93 0.07 330) 0%, transparent 60%), radial-gradient(120% 90% at 85% 20%, oklch(0.90 0.08 300) 0%, transparent 55%), linear-gradient(160deg, oklch(0.96 0.04 20) 0%, oklch(0.93 0.06 320) 45%, oklch(0.90 0.08 295) 100%)",
      }}
    >
      {/* soft glowing orbs */}
      <span aria-hidden className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/30 blur-3xl animate-[breathe_6s_ease-in-out_infinite]" />
      <span aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-accent/30 blur-3xl animate-[breathe_7s_ease-in-out_infinite]" />

      {/* floating hearts + sparkles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 37) % 100;
          const delay = (i % 9) * 0.7;
          const dur = 9 + (i % 5);
          return (
            <span
              key={`h${i}`}
              className="absolute bottom-[-40px] select-none opacity-70"
              style={{
                left: `${left}%`,
                fontSize: `${12 + (i % 4) * 6}px`,
                animation: `float-up ${dur}s linear ${delay}s infinite`,
              }}
            >
              {i % 3 === 0 ? "✨" : "❤️"}
            </span>
          );
        })}
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={`s${i}`}
            className="absolute size-1.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 29) % 95}%`,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative my-auto w-full max-w-xl animate-[pop-in_800ms_cubic-bezier(0.22,1,0.36,1)] rounded-[2rem] border border-white/50 bg-white/35 px-5 py-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl sm:px-12 sm:py-14">
        <h1 className="font-display text-[1.75rem] leading-tight text-secondary-foreground drop-shadow-sm sm:text-5xl">
          🎂 Happy Birthday {birthday.name} ❤️
        </h1>
        <p className="mt-3 font-hand text-xl text-primary sm:mt-4 sm:text-3xl">
          Open your surprise gift now 🎁
        </p>

        <div className="my-6 flex justify-center sm:my-8">
          <span
            aria-hidden
            className={`relative select-none text-6xl transition-all duration-700 sm:text-8xl ${
              opening ? "scale-150 -translate-y-4 rotate-6 opacity-0" : ""
            }`}
            style={opening ? undefined : { animation: "bob 2.6s ease-in-out infinite" }}
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl" />
            🎁
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="group relative inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.15_350)] to-[oklch(0.72_0.15_300)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(200,80,160,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-9 sm:py-4 sm:text-xl"
        >
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/30 [animation-duration:2.6s]" />
          Open It 🎁
        </button>
      </div>
    </div>
  );
}
