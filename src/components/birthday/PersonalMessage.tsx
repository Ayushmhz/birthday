import { birthday } from "@/config/birthday";
import { Reveal, Section } from "./Section";

export function PersonalMessage() {
  return (
    <Section>
      <Reveal>
        <div className="relative mx-auto max-w-3xl">
          <span aria-hidden className="absolute -left-3 -top-8 text-6xl text-primary/25">“</span>
          <div className="glass-card rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
            <h2 className="text-center font-hand text-3xl text-primary sm:text-4xl">A little message ❤️</h2>
            <p className="mt-6 font-hand text-2xl leading-[1.7] text-secondary-foreground sm:text-3xl sm:leading-[1.8]">
              {birthday.personalMessage}
            </p>
            <p className="mt-8 text-right font-hand text-2xl text-primary">— your best friend, always</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
