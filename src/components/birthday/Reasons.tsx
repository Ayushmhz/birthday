import { birthday } from "@/config/birthday";
import { Reveal, Section, SectionTitle } from "./Section";

export function Reasons() {
  return (
    <Section>
      <Reveal>
        <SectionTitle kicker="just a few of many">Reasons You're Amazing 💕</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {birthday.reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 90}>
            <article className="glass-card group h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2">
              <span aria-hidden className="inline-block text-4xl transition-transform duration-500 group-hover:scale-125">
                {r.emoji}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
