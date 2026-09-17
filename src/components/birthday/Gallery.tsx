import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { birthday } from "@/config/birthday";
import { Reveal, Section, SectionTitle } from "./Section";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <Section id="memories">
      <Reveal>
        <SectionTitle kicker="our little archive">Memories 📸</SectionTitle>
      </Reveal>

      <div className="mt-12 columns-2 gap-4 sm:gap-5 lg:columns-3">
        {birthday.memories.map((m, i) => (
          <Reveal key={i} delay={i * 80} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open memory ${i + 1}`}
              className="group relative block w-full overflow-hidden rounded-3xl border border-primary/15 bg-white/50 p-2 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <span aria-hidden className="pointer-events-none absolute inset-2 rounded-2xl bg-[var(--gradient-primary)] opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Memory photo"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/70 p-4 pt-16 backdrop-blur-md animate-in fade-in sm:pt-4"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-foreground shadow-lg transition-transform hover:scale-110"
          >
            <X className="size-5" />
          </button>
          <img
            src={birthday.memories[active]!.src}
            alt={birthday.memories[active]!.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] w-auto max-w-full animate-pop-in rounded-3xl object-contain shadow-2xl sm:max-h-[85vh]"
          />
        </div>
      )}
    </Section>
  );
}
