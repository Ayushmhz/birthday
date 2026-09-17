import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import { celebrate } from "@/lib/effects";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const photo = !broken && birthday.heroPhoto ? birthday.heroPhoto : birthday.heroPhotoFallback;

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 60);
    const c = window.setTimeout(() => celebrate(true), 900);
    return () => { window.clearTimeout(t); window.clearTimeout(c); };
  }, []);

  return (
    <header className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-20 text-center sm:gap-10 sm:px-8 sm:py-24 lg:flex-row lg:gap-16 lg:text-left">
      <div
        className="relative shrink-0 transition-all duration-1000 ease-out"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px) scale(0.92)" }}
      >
        <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-[var(--gradient-primary)] opacity-30 blur-3xl" />
        <div className="relative animate-bob rounded-[2rem] bg-white/70 p-3 pb-14 shadow-[var(--shadow-glow)] backdrop-blur-sm sm:p-4 sm:pb-16">
          <img
            src={photo}
            onError={() => setBroken(true)}
            alt={birthday.heroPhotoAlt}
            width={900}
            height={1100}
            fetchPriority="high"
            className="h-[17rem] w-[13rem] rounded-[1.5rem] object-cover object-top sm:h-[25rem] sm:w-[20rem]"
          />
          <p className="absolute bottom-4 left-0 right-0 font-hand text-2xl text-primary sm:text-3xl">
            {birthday.name} ✨
          </p>
        </div>
        <span aria-hidden className="absolute -right-4 -top-4 animate-twinkle text-3xl">🎈</span>
        <span aria-hidden className="absolute -bottom-3 -left-5 animate-twinkle text-3xl [animation-delay:1.2s]">🎂</span>
      </div>

      <div
        className="max-w-xl transition-all duration-1000 ease-out [transition-delay:200ms]"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)" }}
      >
        <p className="mb-3 font-hand text-2xl text-primary sm:mb-4 sm:text-4xl">🎉 Happy Birthday 🎉</p>
        <h1 className="text-gradient text-[2rem] font-bold leading-[1.15] sm:text-6xl">
          Happy Birthday, {birthday.name} 🎂❤️
        </h1>
        <p className="mt-5 text-base text-muted-foreground sm:mt-6 sm:text-xl">{birthday.heroSubtitle}</p>
        <p className="mt-8 text-sm text-muted-foreground/80">Scroll down — there's a surprise waiting 💝</p>
      </div>
    </header>
  );
}
