// Vanilla JS API (not the React API) — https://motion.dev/docs/animate
import { animate } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const logo = document.querySelector(".logo");
const shopBtn = document.querySelector(".shop-btn");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  animate(
    logo,
    { opacity: [0, 1], scale: [0, 1.08, 1], rotate: [-35, 8, 0] },
    { duration: 0.9, ease: "backOut" }
  );

  animate(
    shopBtn,
    { opacity: [0, 1], y: [16, 0] },
    { duration: 0.5, delay: 0.55, ease: "easeOut" }
  );
}
