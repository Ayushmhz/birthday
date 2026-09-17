import { useState, useCallback } from "react";
import { birthday } from "@/config/birthday";
import { burst, celebrate } from "@/lib/effects";
import { Reveal, Section } from "./Section";
import { Heart, Sparkles } from "lucide-react";

export function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const handleClick = useCallback(() => {
    setRevealed((prev) => !prev);
    burst({ count: 120, hearts: true });
    celebrate(true);
    window.dispatchEvent(new CustomEvent("birthday:start-music"));
  }, []);

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
            onClick={handleClick}
            className="group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-9 py-4 text-lg font-bold text-white shadow-[0_10px_35px_-5px_rgba(244,63,94,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-rose-400/40 [animation-duration:2.5s]"
            />
            <Heart
              className={`size-5 fill-white text-white transition-transform duration-300 ${
                revealed ? "scale-125 rotate-12" : "group-hover:scale-125"
              }`}
            />
            <span>{revealed ? "Surprise! 🎉" : "Click Me ❤️"}</span>
          </button>
        </div>
      </Reveal>

      {/* Smooth animated surprise message card */}
      <div
        className={`mx-auto mt-10 max-w-2xl overflow-hidden transition-all duration-700 ease-out ${
          revealed
            ? "max-h-[800px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative rounded-3xl border border-primary/20 bg-white/80 p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-12">
          {/* Floating glowing heart badge */}
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner">
            <Heart className="size-8 fill-rose-500 text-rose-500 animate-bounce" />
          </div>

          <h3 className="font-display text-2xl font-bold leading-tight text-secondary-foreground sm:text-4xl">
            Happy Birthday, {birthday.name} 🎂❤️
          </h3>

          <p className="mt-6 font-hand text-xl leading-relaxed text-secondary-foreground/90 sm:text-2xl">
            {birthday.finalLine}
          </p>

          <p className="mt-6 text-lg font-semibold text-primary sm:text-2xl">
            {birthday.finalOutro}
          </p>
        </div>
      </div>
    </Section>
  );
}
