"use strict";

const backgroundVideo = document.getElementById("operations-background");
const backgroundSceneLabel = document.getElementById("background-scene");
const backgroundScenes = [
  {
    title: "Truck transport",
    src: "https://videos.pexels.com/video-files/15978611/15978611-sd_640_360_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/15978611/pexels-photo-15978611.jpeg?cs=tinysrgb&dpr=1&w=1920",
  },
  {
    title: "Forklift loading",
    src: "https://videos.pexels.com/video-files/6618335/6618335-sd_640_360_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/6618335/pexels-photo-6618335.jpeg?cs=tinysrgb&dpr=1&w=1280",
  },
  {
    title: "Warehouse operations",
    src: "https://videos.pexels.com/video-files/4291725/4291725-sd_640_360_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/4291725/pexels-photo-4291725.jpeg?cs=tinysrgb&dpr=1&w=1280",
  },
  {
    title: "Safety briefing",
    src: "https://videos.pexels.com/video-files/4477607/4477607-sd_640_360_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/4477607/meeting-team-meeting-teamplay-warehouse-4477607.jpeg?cs=tinysrgb&dpr=1&w=1280",
  },
  {
    title: "Administration team meeting",
    src: "https://videos.pexels.com/video-files/3246669/3246669-sd_640_360_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/3246669/free-video-3246669.jpg?cs=tinysrgb&dpr=1&w=1280",
  },
];

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
let activeBackgroundScene = 0;
let backgroundSceneTimer;
const failedBackgroundScenes = new Set();

function disableBackgroundVideo() {
  window.clearTimeout(backgroundSceneTimer);
  backgroundVideo?.pause();
  backgroundVideo?.classList.add("is-unavailable");
  if (backgroundSceneLabel) backgroundSceneLabel.textContent = "";
}

function findNextBackgroundScene() {
  for (let offset = 1; offset <= backgroundScenes.length; offset += 1) {
    const next = (activeBackgroundScene + offset) % backgroundScenes.length;
    if (!failedBackgroundScenes.has(next)) return next;
  }
  return -1;
}

function loadBackgroundScene(index) {
  if (!backgroundVideo || reducedMotionQuery.matches) return;

  activeBackgroundScene = index;
  const scene = backgroundScenes[index];
  backgroundVideo.classList.remove("is-unavailable");
  backgroundVideo.classList.add("is-switching");
  backgroundVideo.poster = scene.poster;
  backgroundVideo.src = scene.src;
  backgroundVideo.load();
  if (backgroundSceneLabel) {
    backgroundSceneLabel.textContent = `${index + 1} / ${backgroundScenes.length} · ${scene.title}`;
  }

  backgroundVideo.play().catch(() => {
    disableBackgroundVideo();
  });
}

if (backgroundVideo && !reducedMotionQuery.matches) {
  backgroundVideo.addEventListener("playing", () => {
    backgroundVideo.classList.remove("is-switching");
    window.clearTimeout(backgroundSceneTimer);
    backgroundSceneTimer = window.setTimeout(() => {
      const nextScene = findNextBackgroundScene();
      if (nextScene === -1) {
        disableBackgroundVideo();
        return;
      }
      loadBackgroundScene(nextScene);
    }, 3000);
  });

  backgroundVideo.addEventListener("error", () => {
    failedBackgroundScenes.add(activeBackgroundScene);
    const nextScene = findNextBackgroundScene();
    if (nextScene === -1) {
      disableBackgroundVideo();
      return;
    }
    window.clearTimeout(backgroundSceneTimer);
    backgroundSceneTimer = window.setTimeout(
      () => loadBackgroundScene(nextScene),
      400,
    );
  });

  reducedMotionQuery.addEventListener("change", (event) => {
    if (event.matches) disableBackgroundVideo();
    else loadBackgroundScene(activeBackgroundScene);
  });

  loadBackgroundScene(activeBackgroundScene);
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  navLinks.classList.remove("is-open");
}

navToggle?.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation" : "Close navigation",
  );
  navLinks?.classList.toggle("is-open", !isExpanded);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

document.getElementById("print-profile")?.addEventListener("click", () => {
  window.print();
});

const yearElement = document.getElementById("copyright-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const numberElements = document.querySelectorAll("[data-count]");

function formatCount(element, value) {
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || "";
  return `${value.toFixed(decimals)}${suffix}`;
}

function animateCount(element) {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;

  const duration = 1100;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = formatCount(element, target * eased);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.7 },
  );

  numberElements.forEach((element) => countObserver.observe(element));
} else {
  numberElements.forEach((element) => {
    element.textContent = formatCount(
      element,
      Number(element.dataset.count),
    );
  });
}
