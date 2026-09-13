// Vanilla JS API (not the React API) — https://motion.dev/docs/animate
import { animate } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Nav: hamburger toggle on mobile, shared by every page.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Hero (index): logo scales up and spins in on load.
const logo = document.querySelector(".logo");

if (logo && !prefersReducedMotion) {
  animate(
    logo,
    { opacity: [0, 1], scale: [0, 1.08, 1], rotate: [-35, 8, 0] },
    { duration: 0.9, ease: "backOut" }
  );
}

// Placeholder pages: sleeping Sunny fades in, then a trail of Zzz's
// drifts up and away from her head, one after another, on a loop.
const placeholderImg = document.querySelector(".placeholder-img");

if (placeholderImg && !prefersReducedMotion) {
  animate(
    placeholderImg,
    { opacity: [0, 1], y: [16, 0] },
    { duration: 0.6, ease: "easeOut" }
  );
}

const zzzEls = document.querySelectorAll(".zzz");

if (zzzEls.length && !prefersReducedMotion) {
  zzzEls.forEach((el, i) => {
    const duration = 2.6;
    const delay = 0.6 + i * 0.6;

    // Straight-line, constant-speed drift up and to the right.
    animate(
      el,
      { x: [0, 18], y: [0, -34] },
      { duration, repeat: Infinity, ease: "linear", delay }
    );

    // Fade eases in and out independently of the linear travel.
    animate(
      el,
      { opacity: [0, 1, 1, 0] },
      { duration, repeat: Infinity, ease: "easeInOut", delay }
    );
  });
}
