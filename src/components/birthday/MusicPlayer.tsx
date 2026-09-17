import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Volume2, Pause } from "lucide-react";
import { birthday } from "@/config/birthday";

/* "Happy Birthday to You" melody (Web Audio) — used when no MP3 is provided.
   [frequency in Hz (0 = rest), length in beats] */
const G4 = 392.0, A4 = 440.0, B4 = 493.88, C5 = 523.25, D5 = 587.33,
  E5 = 659.25, F5 = 698.46, G5 = 783.99;
const MELODY: Array<[number, number]> = [
  // Happy birth-day to you
  [G4, 0.5], [G4, 0.5], [A4, 1], [G4, 1], [C5, 1], [B4, 2],
  // Happy birth-day to you
  [G4, 0.5], [G4, 0.5], [A4, 1], [G4, 1], [D5, 1], [C5, 2],
  // Happy birth-day dear Roshni
  [G4, 0.5], [G4, 0.5], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 1],
  // Happy birth-day to you
  [F5, 0.5], [F5, 0.5], [E5, 1], [C5, 1], [D5, 1], [C5, 2],
  [0, 1.5],
];

function useSynthMelody() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const idxRef = useRef(0);
  const nextTimeRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    ctxRef.current?.suspend();
  }, []);

  const start = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = 0.16;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = master;
      nextTimeRef.current = ctx.currentTime + 0.1;
    }
    const ctx = ctxRef.current!;
    void ctx.resume();

    const schedule = () => {
      const master = gainRef.current!;
      while (nextTimeRef.current < ctx.currentTime + 1.2) {
        const [freq, beats] = MELODY[idxRef.current % MELODY.length]!;
        const dur = beats * 0.46;
        const t = nextTimeRef.current;
        if (freq > 0) for (const [mult, vol] of [[1, 1], [2, 0.25], [0.5, 0.4]] as const) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.value = freq * mult;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.35 * vol, t + 0.04);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.25);
          osc.connect(g).connect(master);
          osc.start(t);
          osc.stop(t + dur * 1.3);
        }
        nextTimeRef.current += dur;
        idxRef.current += 1;
      }
    };
    schedule();
    timerRef.current = window.setInterval(schedule, 250);
  }, []);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); void ctxRef.current?.close(); }, []);

  const isRunning = useCallback(() => ctxRef.current?.state === "running", []);

  return { start, stop, isRunning };
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = useSynthMelody();
  const hasFile = Boolean(birthday.musicSrc);

  const playingRef = useRef(false);
  const setPlayingState = useCallback((v: boolean) => { playingRef.current = v; setPlaying(v); }, []);

  const play = useCallback(() => {
    if (playingRef.current) return;
    if (hasFile) {
      const el = audioRef.current;
      if (!el) return;
      void el.play().then(() => setPlayingState(true)).catch(() => {
        // autoplay blocked or file missing — fall back to the built-in melody
        synth.start();
        window.setTimeout(() => setPlayingState(synth.isRunning()), 250);
      });
      return;
    }
    synth.start();
    window.setTimeout(() => setPlayingState(synth.isRunning()), 250);
  }, [hasFile, synth, setPlayingState]);

  useEffect(() => {
    const handler = () => play();
    window.addEventListener("birthday:start-music", handler);
    return () => window.removeEventListener("birthday:start-music", handler);
  }, [play]);

  /* Start the music as soon as the site opens. Browsers require a gesture if autoplay is blocked,
     so we attempt autoplay immediately, and retry on any pointer/touch/click event. */
  useEffect(() => {
    play();

    const unlockAndPlay = () => {
      play();
    };

    const events = ["pointerdown", "touchstart", "mousedown", "click", "keydown", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, unlockAndPlay, { once: true, passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, unlockAndPlay));
    };
  }, [play]);

  const toggle = useCallback(() => {
    if (hasFile) {
      const el = audioRef.current;
      if (!el) return;
      if (playing) { el.pause(); setPlayingState(false); }
      else { void el.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false)); }
      return;
    }
    if (playing) { synth.stop(); setPlayingState(false); }
    else { synth.start(); setPlayingState(true); }
  }, [hasFile, playing, synth, setPlayingState]);

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-7 sm:right-7">
      {hasFile && <audio ref={audioRef} src={birthday.musicSrc} loop preload="none" />}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"}
        className="group relative flex items-center gap-2 rounded-full border border-primary/25 bg-white/75 px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {playing && (
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20 [animation-duration:2.4s]" />
        )}
        {playing ? <Volume2 className="size-4 text-primary" /> : <Music className="size-4 text-primary" />}
        <span className="hidden sm:inline">{playing ? "Music Playing" : "Play Music"}</span>
        <span aria-hidden className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-primary/80 transition-all"
              style={
                playing
                  ? { animation: `bar-dance 900ms ease-in-out ${i * 120}ms infinite alternate`, height: "40%" }
                  : { height: "22%" }
              }
            />
          ))}
        </span>
        {playing && <Pause className="size-3.5 text-muted-foreground" />}
      </button>
      <style>{`@keyframes bar-dance { from { height: 20%; } to { height: 100%; } }`}</style>
    </div>
  );
}
