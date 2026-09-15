// Vanilla JS API (not the React API) — https://motion.dev/docs/animate
// Loaded dynamically so a failed/slow CDN only skips animations rather
// than breaking navigation and the contact form below.
let animate = null;
try {
  ({ animate } = await import("https://cdn.jsdelivr.net/npm/motion@12/+esm"));
} catch (err) {
  console.warn("Motion failed to load; animations are disabled.", err);
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Nav: hamburger toggle, shared by every page.
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

// Send a Letter: hand the contact form off to the visitor's own mail
// app, addressed to us, since a static site has no backend to send from.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    const subject = encodeURIComponent(`Message from ${email} via Sluggy Side Up`);
    const body = encodeURIComponent(`${message}\n\n— ${email}`);

    window.location.href = `mailto:sluggysideup@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Hero (index): logo scales up and spins in on load.
const logo = document.querySelector(".logo");

if (logo && animate && !prefersReducedMotion) {
  animate(
    logo,
    { opacity: [0, 1], scale: [0, 1.08, 1], rotate: [-35, 8, 0] },
    { duration: 0.9, ease: "backOut" }
  );
}

// Hero (index): nametag slides in from the right just after the logo.
const nametag = document.querySelector(".nametag");

if (nametag && animate && !prefersReducedMotion) {
  animate(
    nametag,
    { opacity: [0, 1], x: [50, 0], rotate: [6, 0] },
    { duration: 0.7, delay: 0.35, ease: "backOut" }
  );
}

// Placeholder pages: sleeping Sunny fades in, then a trail of Zzz's
// drifts up and away from her head, one after another, on a loop.
const placeholderImg = document.querySelector(".placeholder-img");

if (placeholderImg && animate && !prefersReducedMotion) {
  animate(
    placeholderImg,
    { opacity: [0, 1], y: [16, 0] },
    { duration: 0.6, ease: "easeOut" }
  );
}

const zzzEls = document.querySelectorAll(".zzz");

if (zzzEls.length && animate && !prefersReducedMotion) {
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

// Send a Letter: the little hearts above Sunny's head rise up
// toward the top of the page in a loop, one after another.
const heartEls = document.querySelectorAll(".floating-heart");

if (heartEls.length && animate && !prefersReducedMotion) {
  heartEls.forEach((el, i) => {
    const duration = 4.2;
    const delay = i * 0.9;

    animate(
      el,
      { x: [0, 8 + i * 4], y: [0, -280 - i * 30] },
      { duration, repeat: Infinity, ease: "linear", delay }
    );

    animate(
      el,
      { opacity: [0, 1, 1, 0] },
      { duration, repeat: Infinity, ease: "easeInOut", delay }
    );
  });
}
