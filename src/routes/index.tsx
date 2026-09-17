import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";
import { OpeningScreen } from "@/components/birthday/OpeningScreen";
import { AmbientEffects } from "@/components/birthday/AmbientEffects";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { Hero } from "@/components/birthday/Hero";
import { Countdown } from "@/components/birthday/Countdown";
import { GiftBox } from "@/components/birthday/GiftBox";
import { PersonalMessage } from "@/components/birthday/PersonalMessage";
import { Gallery } from "@/components/birthday/Gallery";
import { Reasons } from "@/components/birthday/Reasons";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${birthday.name} 🎂 A Surprise Just For You` },
      {
        name: "description",
        content: `A little digital birthday gift for ${birthday.name} — music, memories, confetti and a message from her best friend.`,
      },
      { property: "og:title", content: `Happy Birthday, ${birthday.name} 🎂❤️` },
      {
        property: "og:description",
        content: `A personal birthday surprise made just for ${birthday.name}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [showOpening, setShowOpening] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const t = window.setTimeout(() => setSettled(true), 1100);
    return () => window.clearTimeout(t);
  }, [opened]);

  useEffect(() => {
    if (sessionStorage.getItem("birthday-opened") === "1") {
      setOpened(true);
      return;
    }
    setShowOpening(true);
  }, []);

  return (
    <>
      {showOpening && (
        <OpeningScreen
          onOpen={() => {
            sessionStorage.setItem("birthday-opened", "1");
            setOpened(true);
            setShowOpening(false);
          }}
        />
      )}
      <main
        className={`relative overflow-x-hidden transition-all duration-1000 ease-out ${
          settled
            ? "opacity-100"
            : opened
              ? "scale-100 opacity-100 blur-0"
              : "scale-95 opacity-0 blur-sm"
        }`}
      >
      <AmbientEffects />
      <MusicPlayer />
      <Hero />
      <Countdown />
      <GiftBox />
      <PersonalMessage />
      <Gallery />
      <Reasons />
      <FinalSurprise />
      <footer className="pb-10 text-center text-sm text-muted-foreground">
        Made with ❤️ just for {birthday.name}
      </footer>
      </main>
    </>
  );
}
