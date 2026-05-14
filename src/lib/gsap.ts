import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };

// Sync GSAP ticker with Lenis RAF for perfectly smooth animations
export function syncLenis(lenis: { raf: (t: number) => void }) {
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Reveal heading words with SplitText
export function revealHeading(el: Element, delay = 0) {
  const split = new SplitText(el, { type: "lines,words" });
  gsap.set(split.words, { overflow: "hidden" });
  const tl = gsap.timeline({ delay });
  tl.from(split.words, {
    yPercent: 110,
    opacity: 0,
    duration: 1.0,
    stagger: 0.035,
    ease: "power4.out",
  });
  return { tl, split };
}

// Fade + slide up reveal for elements
export function revealFadeUp(
  els: Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; stagger?: number; duration?: number } = {}
) {
  const { delay = 0, stagger = 0.08, duration = 0.8 } = options;
  return gsap.from(els, {
    y: 50,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    delay,
  });
}

// ScrollTrigger-based reveal
export function scrollReveal(
  trigger: Element,
  targets: Element | Element[] | NodeListOf<Element>,
  options: { stagger?: number; y?: number } = {}
) {
  const { stagger = 0.1, y = 50 } = options;
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration: 0.9,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      once: true,
    },
  });
}
