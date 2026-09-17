/* ============================================================
 *  ✨ CUSTOMIZE EVERYTHING HERE ✨
 *  Replace her name, photos, messages and music in this file.
 * ============================================================ */
import portraitPlaceholder from "@/assets/Roshni_pp.jpg";
import memory1 from "@/assets/Cute.png";
import memory2 from "@/assets/Left.png";
import memory3 from "@/assets/Right.png";
import memory4 from "@/assets/Merged.png";

export const birthday = {
  /** Her name — used everywhere on the page. */
  name: "Roshni",

  /** HER PHOTO: drop a file in src/assets/ and import it above,
   *  or paste a URL here. Leave "" to show the placeholder. */
  heroPhoto: "" as string,
  heroPhotoFallback: portraitPlaceholder,
  heroPhotoAlt: "Roshni, the birthday girl",

  heroSubtitle: "To my favorite person and my amazing best friend...",

  /** MUSIC: put your own MP3 in /public (e.g. /music/birthday.mp3)
   *  and set musicSrc to "/music/birthday.mp3".
   *  Leave "" to use the built-in gentle birthday melody. */
  musicSrc: "" as string,

  countdownSeconds: 5,
  countdownReveal: "The celebration starts now! 🎂",

  giftTeaser: "I have something for you...",
  giftMessage:
    "Wishing you a year full of laughter, tiny wins, big adventures and every single thing you've been quietly hoping for. 🎁",

  personalMessage:
    "Happy Birthday to my mahila mitarr. Thank you for all the  laughs, random conversations, and moments we've shared. I'm genuinely lucky to have you as my best friend. Ani dherai overthink nagrnu , life maa aghi badhnu , dherai nasochnu , move on hudai janu , comeback grnu chadai. I hope this year brings you everything you've been wishing for. Keep smiling, keep being yourself, and never forget how special you are. ❤️",

  /** MEMORY PHOTOS: add or replace freely. */
  memories: [
    { src: memory1, alt: "A memory of us" },
    { src: memory2, alt: "A memory of us" },
    { src: memory3, alt: "A memory of us" },
    { src: memory4, alt: "A memory of us" },
  ],

  reasons: [
    { emoji: "😊", title: "Your smile", text: "It genuinely makes ordinary days better." },
    { emoji: "❤️", title: "Your kindness", text: "You care in a way most people never learn to." },
    { emoji: "😂", title: "Your sense of humor", text: "Nobody makes me laugh like you do." },
    {
      emoji: "🫶",
      title: "The way you always listen",
      text: "You make people feel heard and safe.",
    },
    { emoji: "✨", title: "All the memories we've made", text: "Every one of them is a favorite." },
    { emoji: "💗", title: "Simply being you", text: "There is honestly no one else like you." },
  ],

  finalLine:
    "No matter where life takes us, I'll always be grateful that I got to call you my best friend.",
  finalOutro: "Have the most amazing birthday ever! 🎂✨❤️",
};

export type Birthday = typeof birthday;
