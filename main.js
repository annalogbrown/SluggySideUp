// Vanilla JS API (not the React API) — https://motion.dev/docs/animate & /docs/scroll
import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const hero = document.querySelector(".hero");
const title = document.querySelector(".hero-title");
const subtitle = document.querySelector(".hero-subtitle");
const emoji = document.querySelector(".hero-emoji");
const scrollCue = document.querySelector(".scroll-cue");

// Playful entrance: emoji pops, title bounces up, subtitle fades in after.
animate(
  emoji,
  { opacity: [0, 1], scale: [0.4, 1.15, 1], rotate: [-15, 8, 0] },
  { duration: 0.7, ease: "backOut" }
);

animate(
  title,
  { opacity: [0, 1], y: [40, 0], rotate: [-3, 0] },
  { duration: 0.7, delay: 0.15, ease: "backOut" }
);

animate(
  subtitle,
  { opacity: [0, 0.75], y: [16, 0] },
  { duration: 0.6, delay: 0.4, ease: "easeOut" }
);

// Idle bob on the "scroll" cue to invite scrolling.
animate(
  scrollCue,
  { y: [0, 8, 0] },
  { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
);

// Scroll-linked parallax/fade: as the hero scrolls out of view, ease it back and fade it.
scroll(
  animate(hero, { opacity: [1, 0.2], scale: [1, 0.94] }, { ease: "linear" }),
  { target: hero, offset: ["start start", "end start"] }
);
