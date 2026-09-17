import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import { useReveal } from "@/hooks/use-reveal";
import { celebrate } from "@/lib/effects";
import { Section } from "./Section";

export function Countdown() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [count, setCount] = useState(birthday.countdownSeconds);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c <= 1) { window.clearInterval(id); celebrate(false); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  const done = count === 0;

  return (
    <Section className="py-24 text-center">
      <div ref={ref} className="mx-auto max-w-2xl">
        <p className="font-hand text-2xl text-primary/80">Counting down to your day</p>
        <div className="relative mx-auto mt-8 flex size-40 items-center justify-center sm:size-52">
          <span aria-hidden className="absolute inset-0 rounded-full bg-[var(--gradient-primary)] opacity-25 blur-2xl" />
          <div className="glass-card flex size-full items-center justify-center rounded-full">
            <span
              key={count}
              aria-live="polite"
              className="animate-pop-in font-display text-6xl font-bold text-gradient sm:text-7xl"
            >
              {done ? "🎂" : count}
            </span>
          </div>
        </div>
        <h2
          className="mt-10 text-3xl font-semibold transition-all duration-700 sm:text-4xl"
          style={{ opacity: done ? 1 : 0.25, transform: done ? "none" : "translateY(12px)" }}
        >
          {birthday.countdownReveal}
        </h2>
        <p
          className="mt-4 text-muted-foreground transition-opacity duration-700"
          style={{ opacity: done ? 1 : 0 }}
        >
          Today the whole world gets a little brighter, because it's your birthday. 🌸
        </p>
      </div>
    </Section>
  );
}
