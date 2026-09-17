import { useState } from "react";
import { birthday } from "@/config/birthday";
import { celebrate } from "@/lib/effects";
import { Reveal, Section } from "./Section";

export function GiftBox() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    celebrate(true);
  };

  return (
    <Section className="text-center">
      <Reveal>
        <p className="font-hand text-3xl text-primary">{birthday.giftTeaser}</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Open Your Surprise 🎁</h2>
      </Reveal>

      <Reveal delay={120}>
        <button
          type="button"
          onClick={handleOpen}
          aria-expanded={open}
          aria-label={open ? "Gift opened" : "Open your gift"}
          className="group relative mx-auto mt-12 block focus-visible:outline-none"
        >
          <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-[var(--gradient-primary)] opacity-30 blur-3xl transition-opacity group-hover:opacity-60" />
          <span
            aria-hidden
            className="block text-[6rem] transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-95 sm:text-[8rem]"
            style={{ transform: open ? "scale(1.15) rotate(-6deg)" : undefined }}
          >
            {open ? "🎉" : "🎁"}
          </span>
          {!open && (
            <span className="mt-4 inline-block rounded-full bg-[var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:-translate-y-0.5">
              Tap to open ✨
            </span>
          )}
        </button>
      </Reveal>

      <div
        className="mx-auto mt-10 max-w-xl overflow-hidden transition-all duration-700 ease-out"
        style={{ opacity: open ? 1 : 0, maxHeight: open ? 400 : 0, transform: open ? "none" : "translateY(16px)" }}
      >
        <div className="glass-card rounded-3xl p-8">
          <p className="font-hand text-2xl leading-relaxed text-secondary-foreground sm:text-3xl">
            {birthday.giftMessage}
          </p>
        </div>
      </div>
    </Section>
  );
}
