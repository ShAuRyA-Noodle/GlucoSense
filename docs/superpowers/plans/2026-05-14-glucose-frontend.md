# Glucose Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a world-class Next.js landing page + web app dashboard for non-invasive glucose monitoring research — all content sourced exclusively from the PDF "ML based Blood Glucose Level Detection using Microwave based sensors" (Thapar Institute, 2024–25).

**Architecture:** Next.js 14 App Router with TypeScript. Landing page uses GSAP + Lenis for Apple-level scroll smoothness with pinned pipeline section. Dashboard shows research pipeline, ML model comparison, and system architecture. All displayed data is real and traceable to the PDF.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · GSAP (ScrollTrigger, SplitText) · @studio-freight/lenis · Framer Motion · Recharts · shadcn/ui · Figtree + Plus Jakarta Sans (Google Fonts)

---

## GROUND TRUTH DATA (from PDF — use these values ONLY, never invent)

```typescript
// lib/data.ts — ALL real data from paper. DO NOT ADD ANY VALUES NOT IN THIS FILE.
export const PAPER = {
  title: "ML based Blood Glucose Level Detection using Microwave based sensors",
  authors: ["Japleen Kaur", "Harshit Manik", "Mantra Gupta", "Shaurya Punj", "Nidhi Upadhyay", "Dr. Amanpreet Kaur"],
  institution: "Department of Electronics and Communication Engineering, Thapar Institute of Engineering and Technology, Patiala, India",
  keywords: ["Non invasive Blood Glucose Monitoring", "Logistic Regression", "Random Forest", "XGBoost", "CatBoost"],
  abstract: "This article presents a new, painless way to monitor blood sugar levels without using needles. It uses a microwave based antenna as a sensor to detect changes in blood glucose levels. The changes in the S-parameters of the antenna are then used to train machine learning model like Logistic Regression, Random Forest, XGBoost, and CatBoost to predict the blood sugar level accurately. The study found that some models, especially CatBoost, work very well with an exceptional AUC of 0.97. Overall, this method that uses antenna as sensor for capturing S parameter data for varying blood glucose levels with Machine learning offer a safe, quick, and comfortable alternative for people with diabetes to regularly check their blood sugar levels.",
  stats: {
    worldwideDiabetics: "828 million",
    indiaDiabetics: "212 million",
    indiaFraction: "roughly a quarter of total worldwide diabetics",
  },
  problem: {
    current: "Currently, the popular way of measuring it is using the invasive method of pricking the finger and the BGL displays on monitor of the device.",
    pain: "The measurement of BGL using needle can be uncomfortable as it causes pain, numb sensations, or can even cause shock to young people.",
    altProblems: "The major downside of these [non-invasive optical] methods is that there is lack in and inconsistency in comparison with finger stick method, easily affected by environmental factors for reverse iontophoresis, the experimental error ranges are exceptionally high for sonophoresis.",
  },
  physics: {
    principle: "Blood's dielectric property changes with variations in BGL, indicating an in-proportion frequency shift because of the varying Blood glucose levels.",
    mechanism: "When the microwaves are emitted by the antenna it interacts with the blood in the tissues consisting of glucose molecule. These glucose molecules are polar in nature and thus in presence of an electric field they tend to align themselves in the direction of electric field in order to minimize the energy causing the molecules to vibrate or oscillate.",
    result: "Relationship between the electric field during EM wave propagation and polar glucose molecules brings out the alterations in dielectric properties of the material that leads to the modifications in microwave signals. This can be measured and glucose level in specimen can be determined accordingly.",
    model: "Debye's model is used to describe the relationship between BGL and the blood plasma's dielectric characteristics",
  },
  hardware: {
    antennaSubstrate: "Rogers R5880",
    antennaType: "Flexible antenna with AMC backing",
    simulationTool: "CST MWS V'23 (CST Microwave Studio 2023)",
    phantom: "3-layer phantom",
    deployment: "Raspberry Pi (wearable IoT device)",
    iotStack: ["MongoDB (NoSQL) — stores glucose data efficiently", "MQTT Protocol — latent free data transfer", "Edge computing via Raspberry Pi"],
  },
  pipeline: [
    "Antenna (S-parameter capture)",
    "Feature Extraction",
    "Data Preprocessing",
    "LSTM Processing",
    "Standardisation / Normalisation",
    "Stacked Spatial-Temporal Features",
    "Optimal Feature Selection",
    "ML Model Inference",
    "Raspberry Pi Real-Time Prediction",
  ],
  preprocessing: {
    missingValues: "K-Nearest Neighbors (KNN) imputation",
    categorical: "Label Encoding",
    scaling: "Min-Max scaling",
    featureEngineering: "BMI category, age group, BMI-age interaction, glucose level classification",
    split: "80:20 train-test ratio",
  },
  models: [
    { name: "Logistic Regression", auc: 0.93, accuracy: 95.0, precision: 79.6, recall: 52.4, f1: 63.2 },
    { name: "Random Forest",       auc: 0.95, accuracy: 97.2, precision: 100.0, recall: 65.8, f1: 79.4 },
    { name: "XGBoost",             auc: 0.96, accuracy: 96.8, precision: 85.7,  recall: 73.1, f1: 78.9 },
    { name: "CatBoost",            auc: 0.97, accuracy: 97.1, precision: 94.9,  recall: 68.2, f1: 79.4 },
    { name: "TabNet",              auc: null, accuracy: 41.5, precision: 12.2,  recall: 100.0, f1: 21.9 },
  ],
  priorWork: [
    { tech: "Narrowband microwave (1.3 GHz)", metric: "R² = 0.75" },
    { tech: "Triple-band monopole (2.9 / 4.3 / 6.5 GHz)", metric: "19.43 MHz/mg/dL sensitivity" },
    { tech: "UWB patch antenna (3.15–10.55 GHz)", metric: "Robust under body conditions" },
  ],
  conclusions: {
    bestAUC: "CatBoost Algorithm showed the best performance in terms of AUC as 0.97.",
    bestAccuracy: "Random-forest achieved the highest accuracy (97.2 percent), making it the most effective traditional ML model.",
    xgboost: "XGBoost balanced precision and recall, ensuring reliable predictions with fewer false positives and false negatives.",
    tabnet: "TabNet showed poor accuracy but achieved 100 percent recall, making it useful for risk-averse predictions where missing a diabetic case is critical.",
  },
  futureWork: "Testing the models on larger and more diverse datasets, including data from real human subjects, would be crucial to validate these findings and assess the generalizability of the models.",
};
```

---

## FILE STRUCTURE

```
/Users/shauryapunj/Desktop/Amanpreet Mam Startup/
├── app/
│   ├── layout.tsx               # Root layout: Lenis provider, GSAP init, fonts
│   ├── page.tsx                 # Landing page (composes all sections)
│   ├── globals.css              # Tailwind + CSS variables + base styles
│   └── dashboard/
│       └── page.tsx             # Web app dashboard
├── components/
│   ├── landing/
│   │   ├── Nav.tsx              # Sticky glassmorphism nav
│   │   ├── Hero.tsx             # Hero + animated microwave signal SVG
│   │   ├── Problem.tsx          # Stats (828M / 212M) + problem framing
│   │   ├── Physics.tsx          # How microwave sensing works (Debye/polar molecules)
│   │   ├── Pipeline.tsx         # Pinned horizontal scroll pipeline visualization
│   │   ├── MLResults.tsx        # Performance tables + ROC curve visuals
│   │   ├── Technology.tsx       # Hardware: Rogers R5880, phantom, Raspberry Pi
│   │   ├── ResearchTeam.tsx     # Authors, institution
│   │   └── Footer.tsx           # Links + paper credit
│   ├── dashboard/
│   │   ├── PipelineStatus.tsx   # Animated pipeline stage monitor
│   │   ├── ModelComparison.tsx  # Recharts bar/radar for model metrics
│   │   ├── SignalVisualizer.tsx  # S-parameter visualization (simulated)
│   │   └── SystemInfo.tsx       # Hardware specs display
│   └── shared/
│       ├── SmoothScroll.tsx     # Lenis context provider
│       ├── MicrowaveRipple.tsx  # Reusable animated signal circles (SVG+GSAP)
│       └── CountUp.tsx          # Animated number counter (ScrollTrigger-driven)
├── lib/
│   ├── data.ts                  # ALL real PDF data (source of truth — no inventions)
│   ├── gsap.ts                  # GSAP plugin registration + RAF sync with Lenis
│   └── animations.ts            # Shared Framer Motion variants
├── tailwind.config.ts           # Design system: health-tech colors + fonts
└── next.config.ts               # Next.js config
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json` (via npx)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `next.config.ts`

- [ ] **Step 1: Bootstrap Next.js project**

```bash
cd "/Users/shauryapunj/Desktop/Amanpreet Mam Startup"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js 14 project created in current directory.

- [ ] **Step 2: Install all dependencies**

```bash
npm install gsap @studio-freight/lenis framer-motion recharts
npm install @gsap/react
npm install class-variance-authority clsx tailwind-merge lucide-react
npx shadcn@latest init --yes
npx shadcn@latest add card badge button separator
```

Expected: All packages install without errors.

- [ ] **Step 3: Configure tailwind.config.ts with design system**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:    { DEFAULT: "#0891B2", foreground: "#FFFFFF" },
        secondary:  { DEFAULT: "#22D3EE", foreground: "#0F172A" },
        accent:     { DEFAULT: "#059669", foreground: "#FFFFFF" },
        background: "#0A0F1A",          // Dark landing
        "background-light": "#ECFEFF",  // Light dashboard
        foreground: "#E2F8FF",
        muted:      { DEFAULT: "#0F2030", foreground: "#64748B" },
        border:     "#1E3A4A",
        card:       { DEFAULT: "#0D1F30", foreground: "#E2F8FF" },
        live:       "#22C55E",
        warning:    "#F59E0B",
        critical:   "#DC2626",
      },
      fontFamily: {
        heading: ["var(--font-figtree)", "sans-serif"],
        body:    ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        ripple: {
          "0%":   { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.3" },
        },
      },
      animation: {
        ripple:     "ripple 2s ease-out infinite",
        "pulse-dot":"pulse-dot 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up globals.css**

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-figtree: 'Figtree', sans-serif;
  --font-jakarta: 'Plus Jakarta Sans', sans-serif;
}

html {
  scroll-behavior: auto; /* Lenis handles this */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0A0F1A;
  color: #E2F8FF;
  font-family: var(--font-jakarta);
  overflow-x: hidden;
}

/* Lenis smooth scroll */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }

/* Selection color */
::selection { background: #0891B230; color: #22D3EE; }
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with health-tech design system"
```

---

## Task 2: Data Layer + GSAP Setup

**Files:**
- Create: `lib/data.ts`
- Create: `lib/gsap.ts`
- Create: `lib/animations.ts`

- [ ] **Step 1: Create lib/data.ts with ALL real PDF data**

```typescript
// lib/data.ts
// SOURCE OF TRUTH: All values from "ML based Blood Glucose Level Detection using 
// Microwave based sensors", Thapar Institute. DO NOT invent values.

export const PAPER_TITLE = "ML based Blood Glucose Level Detection using Microwave based sensors";
export const INSTITUTION = "Thapar Institute of Engineering and Technology, Patiala, India";
export const DEPARTMENT = "Department of Electronics and Communication Engineering";

export const AUTHORS = [
  { name: "Japleen Kaur",     email: "jkaur_be23@thapar.edu" },
  { name: "Harshit Manik",    email: "hmanik_be23@thapar.edu" },
  { name: "Mantra Gupta",     email: "mgupta5_be23@thapar.edu" },
  { name: "Shaurya Punj",     email: "spunj_be23@thapar.edu" },
  { name: "Nidhi Upadhyay",   email: "nupadhyay_phd22@thapar.edu" },
  { name: "Dr. Amanpreet Kaur", email: "amanpreet.kaur@thapar.edu", isPI: true },
];

export const ABSTRACT = `This article presents a new, painless way to monitor blood sugar levels without using needles. It uses a microwave based antenna as a sensor to detect changes in blood glucose levels. The changes in the S-parameters of the antenna are then used to train machine learning model like Logistic Regression, Random Forest, XGBoost, and CatBoost to predict the blood sugar level accurately. The study found that some models, especially CatBoost, work very well with an exceptional AUC of 0.97. Overall, this method that uses antenna as sensor for capturing S parameter data for varying blood glucose levels with Machine learning offer a safe, quick, and comfortable alternative for people with diabetes to regularly check their blood sugar levels.`;

export const KEYWORDS = ["Non invasive Blood Glucose Monitoring", "Logistic Regression", "Random Forest", "XGBoost", "CatBoost"];

// Epidemiological stats — verbatim from paper (citing Saeedi et al., 2019)
export const STATS = {
  worldwideDiabetics: 828_000_000,
  indiaDiabetics: 212_000_000,
  indiaShare: "roughly a quarter",
} as const;

// Problem framing — verbatim
export const PROBLEM_QUOTES = [
  {
    quote: "The measurement of BGL using needle can be uncomfortable as it causes pain, numb sensations, or can even cause shock to young people.",
    context: "On current fingerprick methods",
  },
  {
    quote: "There is lack in and inconsistency in comparison with finger stick method, easily affected by environmental factors for reverse iontophoresis, the experimental error ranges are exceptionally high for sonophoresis.",
    context: "On existing non-invasive alternatives",
  },
];

// Physics of microwave glucose sensing
export const PHYSICS = {
  dielectricPrinciple: "Blood's dielectric property changes with variations in BGL, indicating an in-proportion frequency shift because of the varying Blood glucose levels.",
  moleculeMechanism: "When the microwaves are emitted by the antenna it interacts with the blood in the tissues consisting of glucose molecule. These glucose molecules are polar in nature and thus in presence of an electric field they tend to align themselves in the direction of electric field in order to minimize the energy causing the molecules to vibrate or oscillate.",
  measurableResult: "Relationship between the electric field during EM wave propagation and polar glucose molecules brings out the alterations in dielectric properties of the material that leads to the modifications in microwave signals. This can be measured and glucose level in specimen can be determined accordingly.",
  debyes: "Debye's model is used to describe the relationship between BGL and the blood plasma's dielectric characteristics.",
};

// Hardware specs — from paper
export const HARDWARE = {
  antennaSubstrate: "Rogers R5880",
  antennaType: "Flexible antenna with AMC (Artificial Magnetic Conductor) backing",
  simulationTool: "CST MWS V'23 (CST Microwave Studio 2023)",
  phantomLayers: 3,
  iotDevice: "Raspberry Pi",
  description: "IoT-based monitoring system using Raspberry Pi implemented for real-time, non-invasive glucose detection",
};

export const IOT_STACK = [
  { tech: "MongoDB", role: "NoSQL database — stores glucose data efficiently" },
  { tech: "MQTT Protocol", role: "Latent free data transfer" },
  { tech: "Raspberry Pi", role: "Edge computing — real-time prediction" },
];

// Pipeline steps — from Fig. 1 flowchart in paper
export const PIPELINE_STEPS = [
  { step: 1, label: "Antenna Sensor",            description: "Flexible microwave antenna on Rogers R5880 captures S-parameter data from tissue", icon: "Antenna" },
  { step: 2, label: "Feature Extraction",         description: "S-parameter vs. frequency data processed to extract relevant signal features", icon: "Activity" },
  { step: 3, label: "Data Preprocessing",         description: "KNN imputation, Label Encoding, Min-Max scaling, 80:20 train-test split", icon: "Database" },
  { step: 4, label: "LSTM Processing",            description: "Long Short-Term Memory network processes spatial-temporal S-parameter sequences", icon: "Brain" },
  { step: 5, label: "Feature Optimisation",       description: "Stacked spatial-temporal features with weight optimisation and selection of optimal features", icon: "Sliders" },
  { step: 6, label: "ML Model Inference",         description: "CatBoost / Random Forest / XGBoost predicts blood glucose level from optimised features", icon: "Cpu" },
  { step: 7, label: "Raspberry Pi Prediction",    description: "Real-time non-invasive BGL prediction deployed on wearable IoT device", icon: "Monitor" },
] as const;

// ML model performance — Table I and Table II from paper
export const ML_MODELS = [
  { name: "Logistic Regression", auc: 0.93, accuracy: 95.0, precision: 79.6, recall: 52.4, f1: 63.2, color: "#64748B" },
  { name: "Random Forest",       auc: 0.95, accuracy: 97.2, precision: 100.0, recall: 65.8, f1: 79.4, color: "#22C55E", highlight: "highest-accuracy" },
  { name: "XGBoost",             auc: 0.96, accuracy: 96.8, precision: 85.7,  recall: 73.1, f1: 78.9, color: "#F59E0B", highlight: "best-balance" },
  { name: "CatBoost",            auc: 0.97, accuracy: 97.1, precision: 94.9,  recall: 68.2, f1: 79.4, color: "#0891B2", highlight: "highest-auc" },
  { name: "TabNet",              auc: null, accuracy: 41.5, precision: 12.2,  recall: 100.0, f1: 21.9, color: "#8B5CF6", highlight: "perfect-recall" },
] as const;

// Prior work comparison — from literature review in paper
export const PRIOR_WORK = [
  { tech: "Narrowband microwave sensor", frequency: "1.3 GHz",         metric: "R² = 0.75",                      source: "Deshmukh & Chorage, 2021" },
  { tech: "Triple-band monopole antenna", frequency: "2.9 / 4.3 / 6.5 GHz", metric: "19.43 MHz/mg/dL sensitivity", source: "Sharaf et al., 2025" },
  { tech: "UWB patch antenna (CMT)",      frequency: "3.15–10.55 GHz", metric: "Robust under body conditions",   source: "Modak et al., 2024" },
] as const;

export const CONCLUSIONS = {
  bestAUC: "CatBoost Algorithm showed the best performance in terms of AUC as 0.97.",
  bestAccuracy: "Random-forest achieved the highest accuracy (97.2 percent), making it the most effective traditional ML model.",
  xgboost: "XGBoost balanced precision and recall, ensuring reliable predictions with fewer false positives and false negatives.",
  tabnet: "TabNet showed poor accuracy but achieved 100 percent recall, making it useful for risk-averse predictions where missing a diabetic case is critical.",
};

export const FUTURE_WORK = "Testing the models on larger and more diverse datasets, including data from real human subjects, would be crucial to validate these findings and assess the generalizability of the models.";
```

- [ ] **Step 2: Create lib/gsap.ts — GSAP + Lenis sync**

```typescript
// lib/gsap.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };

// Sync GSAP ticker with Lenis RAF (call this after Lenis is initialized)
export function syncGSAPWithLenis(lenis: { raf: (time: number) => void }) {
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Text reveal animation — stagger chars with SplitText
export function revealText(element: Element, delay = 0) {
  const split = new SplitText(element, { type: "lines,words" });
  gsap.from(split.words, {
    y: 80,
    opacity: 0,
    duration: 0.9,
    stagger: 0.03,
    ease: "power4.out",
    delay,
  });
  return split;
}
```

- [ ] **Step 3: Create lib/animations.ts — Framer Motion variants**

```typescript
// lib/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
```

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add data layer, GSAP setup, and animation variants"
```

---

## Task 3: Root Layout + Smooth Scroll Provider

**Files:**
- Create: `components/shared/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create SmoothScroll.tsx — Lenis provider**

```tsx
// components/shared/SmoothScroll.tsx
"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { syncGSAPWithLenis } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-style ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    syncGSAPWithLenis(lenis);

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";

export const metadata: Metadata = {
  title: "Non-Invasive Glucose Monitoring — Thapar Institute Research",
  description: "ML-based blood glucose level detection using microwave-based sensors. Research by Thapar Institute of Engineering and Technology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx components/shared/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll with Apple-style easing"
```

---

## Task 4: Navigation

**Files:**
- Create: `components/landing/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx — glassmorphism sticky nav**

```tsx
// components/landing/Nav.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Problem",    href: "#problem" },
  { label: "Technology", href: "#physics" },
  { label: "Pipeline",   href: "#pipeline" },
  { label: "Results",    href: "#results" },
  { label: "Team",       href: "#team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0F1A]/80 backdrop-blur-xl border-b border-[#1E3A4A]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full border border-[#0891B2] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0891B2] animate-pulse-dot" />
          </div>
          <span className="font-heading font-600 text-sm tracking-wider text-[#E2F8FF] uppercase">
            GlucoSense
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#64748B] hover:text-[#22D3EE] transition-colors duration-300 font-body"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#0891B2]/50 text-[#22D3EE] text-sm font-body hover:bg-[#0891B2]/10 transition-all duration-300"
        >
          Dashboard →
        </Link>
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/Nav.tsx
git commit -m "feat: add glassmorphism sticky navigation"
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/shared/MicrowaveRipple.tsx`
- Create: `components/landing/Hero.tsx`

- [ ] **Step 1: Create MicrowaveRipple.tsx — animated SVG signal**

This is scientifically accurate: shows expanding microwave rings from antenna source, with small dots (glucose molecules) that subtly rotate when the wave passes through — directly representing the paper's description of polar molecule alignment.

```tsx
// components/shared/MicrowaveRipple.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function MicrowaveRipple({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const rings = svgRef.current.querySelectorAll(".wave-ring");
    const molecules = svgRef.current.querySelectorAll(".molecule");

    // Expanding rings — represent microwave propagation
    rings.forEach((ring, i) => {
      gsap.fromTo(
        ring,
        { scale: 0.3, opacity: 0.8, transformOrigin: "center" },
        {
          scale: 2.2,
          opacity: 0,
          duration: 3 + i * 0.4,
          ease: "power1.out",
          repeat: -1,
          delay: i * 0.8,
        }
      );
    });

    // Molecules — represent polar glucose molecules aligning to EM field
    molecules.forEach((mol, i) => {
      gsap.to(mol, {
        rotation: 180,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
        transformOrigin: "center",
      });
      gsap.to(mol, {
        opacity: 0.8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      });
    });

    return () => gsap.killTweensOf([rings, molecules]);
  }, []);

  // Molecule positions — scattered around center
  const moleculePositions = [
    { cx: 240, cy: 160 }, { cx: 310, cy: 200 }, { cx: 180, cy: 230 },
    { cx: 340, cy: 280 }, { cx: 160, cy: 300 }, { cx: 280, cy: 340 },
    { cx: 230, cy: 380 }, { cx: 360, cy: 350 }, { cx: 140, cy: 180 },
    { cx: 380, cy: 180 }, { cx: 200, cy: 130 }, { cx: 320, cy: 130 },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 520 520"
      className={`w-full h-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wave rings */}
      {[60, 100, 140, 180].map((r, i) => (
        <circle
          key={i}
          className="wave-ring"
          cx="260"
          cy="260"
          r={r}
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.6"
        />
      ))}

      {/* Antenna center — the sensor */}
      <circle cx="260" cy="260" r="20" fill="#0891B2" opacity="0.15" />
      <circle cx="260" cy="260" r="8"  fill="#0891B2" opacity="0.9" />
      <circle cx="260" cy="260" r="4"  fill="#22D3EE" />

      {/* Glucose molecules — polar, shown as oriented ellipses */}
      {moleculePositions.map((pos, i) => (
        <g key={i} className="molecule" transform={`translate(${pos.cx}, ${pos.cy})`}>
          <ellipse cx="0" cy="0" rx="5" ry="2.5" fill="#059669" opacity="0.5" />
          <circle  cx="4"  cy="0" r="1.5" fill="#22D3EE" opacity="0.7" />
          <circle  cx="-4" cy="0" r="1.5" fill="#22D3EE" opacity="0.7" />
        </g>
      ))}

      {/* S-parameter label */}
      <text x="260" y="470" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="3">
        S-PARAMETER MEASUREMENT
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Create Hero.tsx**

```tsx
// components/landing/Hero.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MicrowaveRipple from "@/components/shared/MicrowaveRipple";
import { gsap, SplitText } from "@/lib/gsap";
import { STATS } from "@/lib/data";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headingRef.current || !subRef.current) return;

    const splitH = new SplitText(headingRef.current, { type: "lines,words" });
    const splitS = new SplitText(subRef.current,    { type: "lines" });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(splitH.words, { y: 100, opacity: 0, duration: 1,    stagger: 0.04, delay: 0.3 })
      .from(splitS.lines,  { y: 40,  opacity: 0, duration: 0.8,  stagger: 0.06 }, "-=0.4");

    return () => {
      splitH.revert();
      splitS.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A] via-[#071520] to-[#0A0F1A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0891B2]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0891B2]/40 bg-[#0891B2]/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse-dot" />
            <span className="text-xs text-[#22D3EE] font-body tracking-widest uppercase">
              Thapar Institute — Research
            </span>
          </motion.div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-heading text-5xl lg:text-7xl font-800 text-[#E2F8FF] leading-[1.05] tracking-tight mb-6"
          >
            No needles.
            <span className="block text-[#0891B2]">No pain.</span>
            <span className="block text-3xl lg:text-4xl font-400 text-[#64748B] mt-2">
              Non-invasive glucose monitoring.
            </span>
          </h1>

          {/* Subheading — from abstract verbatim */}
          <p
            ref={subRef}
            className="font-body text-[#64748B] text-lg leading-relaxed mb-10 max-w-lg"
          >
            A microwave-based antenna sensor combined with machine learning offers{" "}
            <span className="text-[#E2F8FF]">
              a safe, quick, and comfortable alternative
            </span>{" "}
            for people with diabetes to regularly check their blood sugar levels.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10">
            <div>
              <p className="font-heading text-3xl font-700 text-[#22D3EE]">828M</p>
              <p className="text-xs text-[#64748B] font-body mt-1">diabetics worldwide</p>
            </div>
            <div className="w-px bg-[#1E3A4A]" />
            <div>
              <p className="font-heading text-3xl font-700 text-[#0891B2]">212M</p>
              <p className="text-xs text-[#64748B] font-body mt-1">in India (~25%)</p>
            </div>
            <div className="w-px bg-[#1E3A4A]" />
            <div>
              <p className="font-heading text-3xl font-700 text-[#059669]">0.97</p>
              <p className="text-xs text-[#64748B] font-body mt-1">CatBoost AUC</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#pipeline"
              className="px-6 py-3 bg-[#0891B2] text-white rounded-full font-body font-500 hover:bg-[#0891B2]/80 transition-all duration-300 hover:scale-105"
            >
              See How It Works
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-[#1E3A4A] text-[#64748B] rounded-full font-body hover:border-[#0891B2]/50 hover:text-[#22D3EE] transition-all duration-300"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Right — animated microwave visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative w-full aspect-square max-w-lg mx-auto"
        >
          <MicrowaveRipple />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#64748B] font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0891B2] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/shared/MicrowaveRipple.tsx components/landing/Hero.tsx
git commit -m "feat: hero with animated microwave signal visualization"
```

---

## Task 6: Problem Section

**Files:**
- Create: `components/shared/CountUp.tsx`
- Create: `components/landing/Problem.tsx`

- [ ] **Step 1: Create CountUp.tsx — ScrollTrigger-driven counter**

```tsx
// components/shared/CountUp.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ end, suffix = "", decimals = 0, duration = 2, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = obj.val.toFixed(decimals) + suffix;
            }
          },
        });
      },
      once: true,
    });
  }, [end, suffix, decimals, duration]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
```

- [ ] **Step 2: Create Problem.tsx — real epidemiological stats from paper**

```tsx
// components/landing/Problem.tsx
"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import CountUp from "@/components/shared/CountUp";
import { PROBLEM_QUOTES, STATS } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="problem" ref={sectionRef} className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4"
        >
          The Problem
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-700 text-[#E2F8FF] leading-tight mb-16 max-w-3xl"
        >
          Diabetes is a global crisis.
          <span className="block text-[#64748B] font-400 text-3xl lg:text-4xl mt-3">
            And the most common way to manage it still hurts.
          </span>
        </motion.h2>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E3A4A] rounded-2xl overflow-hidden mb-20"
        >
          {[
            {
              value: 828, suffix: "M", label: "diabetics worldwide",
              sub: "Source: Saeedi et al., Diabetes Res. Clin. Pract., 2019",
              color: "text-[#22D3EE]",
            },
            {
              value: 212, suffix: "M", label: "diabetics in India",
              sub: "Roughly a quarter of the world's diabetic population",
              color: "text-[#0891B2]",
            },
            {
              value: 1, suffix: "/4", label: "global diabetics are Indian",
              sub: "India bears the highest regional burden",
              color: "text-[#059669]",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-[#0D1F30] p-8 lg:p-12"
            >
              <p className={`font-heading text-5xl lg:text-6xl font-800 ${stat.color} mb-2`}>
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </p>
              <p className="font-body text-[#E2F8FF] text-lg font-500 mb-2">{stat.label}</p>
              <p className="font-body text-[#64748B] text-xs leading-relaxed">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Problem quotes from paper */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pain of current method */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="border border-[#1E3A4A] rounded-2xl p-8 relative overflow-hidden group hover:border-[#0891B2]/40 transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#DC2626] to-transparent rounded-full" />
            <p className="text-4xl text-[#DC2626] mb-4 font-heading font-800 leading-none">"</p>
            <p className="font-body text-[#E2F8FF] leading-relaxed mb-4">
              {PROBLEM_QUOTES[0].quote}
            </p>
            <p className="text-xs text-[#64748B] font-body uppercase tracking-widest">
              {PROBLEM_QUOTES[0].context}
            </p>
          </motion.div>

          {/* Alternatives also fail */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            custom={1}
            className="border border-[#1E3A4A] rounded-2xl p-8 relative overflow-hidden hover:border-[#0891B2]/40 transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#F59E0B] to-transparent rounded-full" />
            <p className="text-4xl text-[#F59E0B] mb-4 font-heading font-800 leading-none">"</p>
            <p className="font-body text-[#E2F8FF] leading-relaxed mb-4">
              {PROBLEM_QUOTES[1].quote}
            </p>
            <p className="text-xs text-[#64748B] font-body uppercase tracking-widest">
              {PROBLEM_QUOTES[1].context}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/shared/CountUp.tsx components/landing/Problem.tsx
git commit -m "feat: problem section with animated stats from paper"
```

---

## Task 7: Physics / How It Works Section

**Files:**
- Create: `components/landing/Physics.tsx`

- [ ] **Step 1: Create Physics.tsx — scientific explanation with animation**

```tsx
// components/landing/Physics.tsx
"use client";
import { motion } from "framer-motion";
import { PHYSICS } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Microwave Signal Emitted",
    description: PHYSICS.moleculeMechanism,
    color: "#0891B2",
  },
  {
    number: "02",
    title: "Dielectric Properties Shift",
    description: PHYSICS.dielectricPrinciple,
    color: "#22D3EE",
  },
  {
    number: "03",
    title: "S-Parameters Measured",
    description: PHYSICS.measurableResult,
    color: "#059669",
  },
  {
    number: "04",
    title: "Debye Model Applied",
    description: PHYSICS.debyes,
    color: "#8B5CF6",
  },
];

export default function Physics() {
  return (
    <section id="physics" className="py-32 px-6 lg:px-12 relative bg-[#071520]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4"
        >
          The Science
        </motion.p>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-700 text-[#E2F8FF] leading-tight mb-6 max-w-3xl"
        >
          How microwave sensing
          <span className="block text-[#0891B2]">measures glucose.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-body text-[#64748B] text-lg max-w-2xl mb-20 leading-relaxed"
        >
          Glucose molecules are polar. In the presence of a microwave electric field, 
          they align — and that alignment measurably changes the signal's properties.
        </motion.p>

        {/* Steps */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative border border-[#1E3A4A] rounded-2xl p-8 hover:border-[#0891B2]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(600px at 50% 0%, ${step.color}08, transparent)` }}
              />

              <div className="relative">
                <span
                  className="font-heading text-6xl font-800 leading-none mb-4 block"
                  style={{ color: step.color, opacity: 0.3 }}
                >
                  {step.number}
                </span>
                <h3 className="font-heading text-xl font-600 text-[#E2F8FF] mb-3">{step.title}</h3>
                <p className="font-body text-[#64748B] leading-relaxed text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key insight callout */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#0891B2]/10 to-[#059669]/10 border border-[#0891B2]/20"
        >
          <p className="font-heading text-2xl font-600 text-[#E2F8FF] leading-relaxed">
            "This characteristic implies that the microwave sensor is{" "}
            <span className="text-[#22D3EE]">ideally adapted for the non-invasive assessment</span>{" "}
            of biological parameters, such as BGL."
          </p>
          <p className="font-body text-xs text-[#64748B] mt-4 uppercase tracking-widest">
            — from the paper, on microwave sensing for glucose
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/Physics.tsx
git commit -m "feat: physics section with verbatim paper quotes"
```

---

## Task 8: Pipeline Section (Pinned Horizontal Scroll)

**Files:**
- Create: `components/landing/Pipeline.tsx`

- [ ] **Step 1: Create Pipeline.tsx — GSAP pinned horizontal scroll**

```tsx
// components/landing/Pipeline.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "framer-motion";
import { PIPELINE_STEPS } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  Antenna:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2v6M8.5 5.5l-2-2M15.5 5.5l2-2M5 12H2M22 12h-3M12 14a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round"/><path d="M12 14v8" strokeLinecap="round"/></svg>,
  Activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.657-4.03 3-9 3S3 13.657 3 12"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/></svg>,
  Brain:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.49-4.11 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.49-4.11 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24A2.5 2.5 0 0014.5 2z"/></svg>,
  Sliders:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  Cpu:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Monitor:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
};

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track  = trackRef.current;
    const cards  = track.querySelectorAll<HTMLElement>(".pipeline-card");
    const totalW = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalW + window.innerHeight}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(track, { x: -totalW, ease: "none" });

    // Cards reveal as they enter viewport
    cards.forEach((card, i) => {
      tl.from(card, { opacity: 0, y: 30, duration: 0.3 }, i * 0.12);
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="pipeline" ref={sectionRef} className="overflow-hidden bg-[#0A0F1A]">
      <div className="min-h-screen flex flex-col justify-center">
        {/* Header (stays fixed while scrolling) */}
        <div className="px-6 lg:px-12 pt-16 pb-8 shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4"
          >
            The Pipeline
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl lg:text-5xl font-700 text-[#E2F8FF]"
          >
            From antenna to prediction.
            <span className="block text-[#64748B] font-400 text-2xl lg:text-3xl mt-2">
              7 stages. Real-time. On a Raspberry Pi.
            </span>
          </motion.h2>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex items-center gap-6 px-12 pb-16" style={{ width: "max-content" }}>
          {PIPELINE_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="pipeline-card flex-shrink-0 w-72 lg:w-80 border border-[#1E3A4A] rounded-2xl p-8 bg-[#0D1F30] relative"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs text-[#1E3A4A] font-body font-600 tabular-nums">
                {String(step.step).padStart(2, "0")} / {String(PIPELINE_STEPS.length).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 border border-[#0891B2]/20 flex items-center justify-center text-[#0891B2] mb-6">
                {ICONS[step.icon]}
              </div>

              <h3 className="font-heading text-lg font-600 text-[#E2F8FF] mb-3">{step.label}</h3>
              <p className="font-body text-[#64748B] text-sm leading-relaxed">{step.description}</p>

              {/* Connector arrow (not on last card) */}
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-[#1E3A4A]">
                  <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/Pipeline.tsx
git commit -m "feat: pinned horizontal scroll pipeline visualization"
```

---

## Task 9: ML Results Section

**Files:**
- Create: `components/landing/MLResults.tsx`

- [ ] **Step 1: Create MLResults.tsx — real model performance tables + ROC viz**

```tsx
// components/landing/MLResults.tsx
"use client";
import { motion } from "framer-motion";
import { ML_MODELS, CONCLUSIONS, PRIOR_WORK } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, Cell, Legend,
} from "recharts";

const HIGHLIGHT_LABELS: Record<string, string> = {
  "highest-auc":      "Highest AUC",
  "highest-accuracy": "Highest Accuracy",
  "best-balance":     "Best Precision/Recall Balance",
  "perfect-recall":   "Perfect Recall (risk-averse screening)",
};

export default function MLResults() {
  // Recharts data — all real from paper
  const barData = ML_MODELS.map((m) => ({
    name:     m.name === "Logistic Regression" ? "Log. Reg." : m.name,
    Accuracy: m.accuracy,
    AUC:      m.auc ? m.auc * 100 : 0,
    color:    m.color,
  }));

  const radarData = [
    { metric: "Accuracy",  ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.accuracy])) },
    { metric: "Precision", ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.precision])) },
    { metric: "Recall",    ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.recall])) },
    { metric: "F1",        ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.f1])) },
    { metric: "AUC×100",   ...Object.fromEntries(ML_MODELS.map((m) => [m.name, m.auc ? m.auc * 100 : 0])) },
  ];

  return (
    <section id="results" className="py-32 px-6 lg:px-12 bg-[#071520]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4">
          Model Performance
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-700 text-[#E2F8FF] leading-tight mb-6 max-w-3xl">
          5 models. Real data.
          <span className="block text-[#0891B2]">CatBoost wins AUC.</span>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-body text-[#64748B] text-lg mb-20 max-w-2xl">
          Results from Table I and Table II of the paper. 80:20 train-test split on S-parameter + publicly available datasets.
        </motion.p>

        {/* Performance table */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1E3A4A]">
                {["Model", "AUC", "Accuracy", "Precision", "Recall", "F1-Score"].map((h) => (
                  <th key={h} className="text-left py-4 px-4 text-xs text-[#64748B] font-body uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ML_MODELS.map((model, i) => (
                <motion.tr
                  key={model.name}
                  variants={fadeUp}
                  custom={i}
                  className="border-b border-[#1E3A4A]/50 hover:bg-[#0D1F30] transition-colors group"
                >
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                      <span className="font-body font-500 text-[#E2F8FF]">{model.name}</span>
                      {model.highlight && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0891B2]/10 text-[#22D3EE] font-body hidden group-hover:inline-block">
                          {HIGHLIGHT_LABELS[model.highlight]}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-4 font-body tabular-nums">
                    <span className={model.auc === 0.97 ? "text-[#0891B2] font-700" : "text-[#64748B]"}>
                      {model.auc ?? "—"}
                    </span>
                  </td>
                  <td className="py-5 px-4 font-body tabular-nums">
                    <span className={model.accuracy === 97.2 ? "text-[#22C55E] font-700" : "text-[#64748B]"}>
                      {model.accuracy}%
                    </span>
                  </td>
                  <td className="py-5 px-4 text-[#64748B] font-body tabular-nums">{model.precision}%</td>
                  <td className="py-5 px-4 text-[#64748B] font-body tabular-nums">{model.recall}%</td>
                  <td className="py-5 px-4 text-[#64748B] font-body tabular-nums">{model.f1}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-[#1E3A4A] font-body mt-3 text-right">
            Source: Table I & Table II — paper by Kaur, Manik, Gupta, Punj, Upadhyay, Kaur. Thapar Institute.
          </p>
        </motion.div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bar chart — Accuracy */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="border border-[#1E3A4A] rounded-2xl p-6 bg-[#0D1F30]">
            <p className="font-heading text-sm font-600 text-[#E2F8FF] mb-1">Model Accuracy (%)</p>
            <p className="font-body text-xs text-[#64748B] mb-6">From Table II of the paper</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barSize={32}>
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "Plus Jakarta Sans" }} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 100]} tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0A0F1A", border: "1px solid #1E3A4A", borderRadius: 8 }}
                  labelStyle={{ color: "#E2F8FF", fontFamily: "Plus Jakarta Sans" }}
                  itemStyle={{ color: "#64748B" }}
                />
                <Bar dataKey="Accuracy" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AUC chart */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="border border-[#1E3A4A] rounded-2xl p-6 bg-[#0D1F30]">
            <p className="font-heading text-sm font-600 text-[#E2F8FF] mb-1">AUC (Area Under ROC Curve)</p>
            <p className="font-body text-xs text-[#64748B] mb-6">From Table I of the paper. TabNet AUC not reported.</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData.filter(d => d.AUC > 0)} barSize={32}>
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "Plus Jakarta Sans" }} axisLine={false} tickLine={false} />
                <YAxis domain={[88, 100]} tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v/100).toFixed(2)} />
                <Tooltip
                  contentStyle={{ background: "#0A0F1A", border: "1px solid #1E3A4A", borderRadius: 8 }}
                  labelStyle={{ color: "#E2F8FF", fontFamily: "Plus Jakarta Sans" }}
                  formatter={(v: number) => [(v/100).toFixed(2), "AUC"]}
                />
                <Bar dataKey="AUC" radius={[4, 4, 0, 0]}>
                  {barData.filter(d => d.AUC > 0).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Key conclusions from paper */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "0.97", label: "CatBoost AUC", sub: CONCLUSIONS.bestAUC,  color: "#0891B2" },
            { value: "97.2%", label: "Random Forest Accuracy", sub: CONCLUSIONS.bestAccuracy, color: "#22C55E" },
            { value: "Balanced", label: "XGBoost Trade-off",  sub: CONCLUSIONS.xgboost, color: "#F59E0B" },
            { value: "100%",  label: "TabNet Recall",         sub: CONCLUSIONS.tabnet, color: "#8B5CF6" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="border border-[#1E3A4A] rounded-xl p-6 bg-[#0D1F30]">
              <p className="font-heading text-3xl font-700 mb-1" style={{ color: item.color }}>{item.value}</p>
              <p className="font-body text-sm font-500 text-[#E2F8FF] mb-2">{item.label}</p>
              <p className="font-body text-xs text-[#64748B] leading-relaxed">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/landing/MLResults.tsx
git commit -m "feat: ML results with real performance tables and recharts visualizations"
```

---

## Task 10: Technology + Research Team + Footer

**Files:**
- Create: `components/landing/Technology.tsx`
- Create: `components/landing/ResearchTeam.tsx`
- Create: `components/landing/Footer.tsx`

- [ ] **Step 1: Create Technology.tsx**

```tsx
// components/landing/Technology.tsx
"use client";
import { motion } from "framer-motion";
import { HARDWARE, IOT_STACK, PRIOR_WORK } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Technology() {
  return (
    <section id="technology" className="py-32 px-6 lg:px-12 bg-[#0A0F1A]">
      <div className="max-w-7xl mx-auto">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4">
          Hardware
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-700 text-[#E2F8FF] leading-tight mb-16 max-w-3xl">
          Built on flexible substrate.
          <span className="block text-[#64748B] font-400 text-2xl mt-2">Deployed on Raspberry Pi.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Antenna Substrate",  value: HARDWARE.antennaSubstrate,  desc: "High-frequency laminate for microwave applications" },
            { label: "Antenna Type",        value: "Flexible + AMC Backing",    desc: HARDWARE.antennaType },
            { label: "Simulation Tool",     value: "CST MWS V'23",              desc: HARDWARE.simulationTool },
            { label: "Tissue Phantom",      value: `${HARDWARE.phantomLayers}-Layer Phantom`, desc: "Simulates human tissue at varying blood sugar levels" },
            { label: "IoT Deployment",      value: HARDWARE.iotDevice,          desc: HARDWARE.description },
            { label: "Signal Type",         value: "Microwave S-Parameters",    desc: "Scattering parameters captured vs. frequency" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="border border-[#1E3A4A] rounded-xl p-6 hover:border-[#0891B2]/30 transition-colors">
              <p className="text-xs text-[#64748B] font-body uppercase tracking-widest mb-2">{item.label}</p>
              <p className="font-heading text-lg font-600 text-[#22D3EE] mb-2">{item.value}</p>
              <p className="font-body text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* IoT Stack */}
        <div className="border border-[#1E3A4A] rounded-2xl p-8 mb-16">
          <p className="font-heading text-lg font-600 text-[#E2F8FF] mb-6">IoT Integration Stack</p>
          <div className="flex flex-wrap gap-4">
            {IOT_STACK.map((item, i) => (
              <div key={i} className="flex items-start gap-3 flex-1 min-w-48">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891B2] mt-2 shrink-0" />
                <div>
                  <p className="font-body font-600 text-[#E2F8FF] text-sm">{item.tech}</p>
                  <p className="font-body text-xs text-[#64748B] mt-1">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prior work comparison */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="font-heading text-lg font-600 text-[#E2F8FF] mb-4">Prior Art Comparison</p>
          <p className="font-body text-xs text-[#64748B] mb-6 uppercase tracking-widest">
            From literature review in the paper
          </p>
          <div className="space-y-3">
            {PRIOR_WORK.map((w, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#1E3A4A] py-3">
                <span className="font-body text-sm text-[#64748B]">{w.tech}</span>
                <div className="flex gap-6 text-right">
                  <span className="font-body text-xs text-[#1E3A4A]">{w.frequency}</span>
                  <span className="font-body text-sm font-500 text-[#E2F8FF]">{w.metric}</span>
                  <span className="font-body text-xs text-[#64748B]">{w.source}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ResearchTeam.tsx**

```tsx
// components/landing/ResearchTeam.tsx
"use client";
import { motion } from "framer-motion";
import { AUTHORS, INSTITUTION, DEPARTMENT, PAPER_TITLE } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ResearchTeam() {
  return (
    <section id="team" className="py-32 px-6 lg:px-12 bg-[#071520]">
      <div className="max-w-7xl mx-auto">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-xs text-[#0891B2] font-body tracking-[0.3em] uppercase mb-4">
          The Team
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-4xl lg:text-5xl font-700 text-[#E2F8FF] leading-tight mb-4">
          {DEPARTMENT}
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-body text-[#64748B] text-lg mb-16">
          {INSTITUTION}
        </motion.p>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUTHORS.map((author, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className={`border rounded-xl p-6 ${
                author.isPI
                  ? "border-[#0891B2]/50 bg-[#0891B2]/5"
                  : "border-[#1E3A4A] bg-[#0D1F30]"
              }`}>
              {/* Avatar placeholder — initials */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-700 text-sm mb-4 ${
                author.isPI ? "bg-[#0891B2] text-white" : "bg-[#1E3A4A] text-[#64748B]"
              }`}>
                {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <p className="font-heading text-base font-600 text-[#E2F8FF] mb-1">{author.name}</p>
              {author.isPI && (
                <span className="inline-block text-xs text-[#0891B2] font-body uppercase tracking-widest mb-2">
                  Principal Investigator
                </span>
              )}
              <p className="font-body text-xs text-[#64748B]">{author.email}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Paper citation */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-16 p-8 border border-[#1E3A4A] rounded-2xl">
          <p className="font-body text-xs text-[#64748B] uppercase tracking-widest mb-3">Paper</p>
          <p className="font-heading text-lg font-500 text-[#E2F8FF] leading-relaxed">
            {PAPER_TITLE}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Footer.tsx**

```tsx
// components/landing/Footer.tsx
"use client";
import { INSTITUTION } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E3A4A] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-heading font-600 text-[#E2F8FF] mb-1">GlucoSense</p>
          <p className="font-body text-xs text-[#64748B]">{INSTITUTION}</p>
        </div>
        <p className="font-body text-xs text-[#1E3A4A]">
          All data on this site sourced exclusively from the research paper. No synthetic or simulated metrics.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/landing/Technology.tsx components/landing/ResearchTeam.tsx components/landing/Footer.tsx
git commit -m "feat: technology, research team, and footer sections"
```

---

## Task 11: Compose Landing Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Compose page.tsx**

```tsx
// app/page.tsx
import Nav            from "@/components/landing/Nav";
import Hero           from "@/components/landing/Hero";
import Problem        from "@/components/landing/Problem";
import Physics        from "@/components/landing/Physics";
import Pipeline       from "@/components/landing/Pipeline";
import MLResults      from "@/components/landing/MLResults";
import Technology     from "@/components/landing/Technology";
import ResearchTeam   from "@/components/landing/ResearchTeam";
import Footer         from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Physics />
      <Pipeline />
      <MLResults />
      <Technology />
      <ResearchTeam />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Lenis smooth scroll works (buttery feel)
- Hero animation plays
- Nav glassmorphism activates on scroll
- Pipeline section pins and scrolls horizontally
- Stats count up on scroll-enter
- All content matches PDF data

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full landing page"
```

---

## Task 12: Dashboard Layout

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/dashboard/PipelineStatus.tsx`
- Create: `components/dashboard/ModelComparison.tsx`
- Create: `components/dashboard/SystemInfo.tsx`

- [ ] **Step 1: Create dashboard page.tsx — light-mode data-dense layout**

```tsx
// app/dashboard/page.tsx
import PipelineStatus  from "@/components/dashboard/PipelineStatus";
import ModelComparison from "@/components/dashboard/ModelComparison";
import SystemInfo      from "@/components/dashboard/SystemInfo";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#ECFEFF] text-[#164E63]">
      {/* Header */}
      <header className="border-b border-[#A5F3FC] bg-white/80 backdrop-blur-sm sticky top-0 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-dot" />
            <span className="font-heading font-600 text-[#164E63]">GlucoSense Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] font-body">System: </span>
            <span className="text-xs font-body text-[#22C55E] font-500">Simulation Mode</span>
            <span className="text-xs text-[#64748B] font-body ml-3">Raspberry Pi — Offline</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid gap-6">
        {/* Top row — system info */}
        <SystemInfo />

        {/* Middle — pipeline status */}
        <PipelineStatus />

        {/* Bottom — model comparison */}
        <ModelComparison />
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Create PipelineStatus.tsx**

```tsx
// components/dashboard/PipelineStatus.tsx
"use client";
import { PIPELINE_STEPS } from "@/lib/data";

export default function PipelineStatus() {
  return (
    <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
      <p className="font-heading text-sm font-600 text-[#164E63] mb-1">ML Pipeline</p>
      <p className="font-body text-xs text-[#64748B] mb-6">From Fig. 1 — paper by Kaur, Manik, Gupta, Punj, Upadhyay, Kaur</p>
      <div className="flex flex-wrap gap-3">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.step} className="flex items-center gap-2">
            <div className="flex flex-col items-center bg-[#ECFEFF] border border-[#A5F3FC] rounded-xl px-4 py-3 min-w-32">
              <span className="text-xs text-[#64748B] font-body mb-1">{String(step.step).padStart(2,"0")}</span>
              <span className="font-body text-xs font-500 text-[#164E63] text-center">{step.label}</span>
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <span className="text-[#A5F3FC] text-lg">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create ModelComparison.tsx**

```tsx
// components/dashboard/ModelComparison.tsx
"use client";
import { ML_MODELS } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

export default function ModelComparison() {
  const data = ML_MODELS.map((m) => ({
    name: m.name === "Logistic Regression" ? "Log.Reg." : m.name,
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    F1: m.f1,
    color: m.color,
  }));

  return (
    <div className="bg-white border border-[#A5F3FC] rounded-2xl p-6">
      <p className="font-heading text-sm font-600 text-[#164E63] mb-1">Model Performance Comparison</p>
      <p className="font-body text-xs text-[#64748B] mb-6">Table II — all values from paper</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={16} barGap={4}>
          <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 110]} tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip contentStyle={{ border: "1px solid #A5F3FC", borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontFamily: "Plus Jakarta Sans", fontSize: 11 }} />
          <Bar dataKey="Accuracy"  fill="#0891B2" radius={[3,3,0,0]} />
          <Bar dataKey="Precision" fill="#059669" radius={[3,3,0,0]} />
          <Bar dataKey="Recall"    fill="#F59E0B" radius={[3,3,0,0]} />
          <Bar dataKey="F1"        fill="#8B5CF6" radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

- [ ] **Step 4: Create SystemInfo.tsx**

```tsx
// components/dashboard/SystemInfo.tsx
import { HARDWARE, IOT_STACK } from "@/lib/data";

export default function SystemInfo() {
  const specs = [
    { label: "Antenna",          value: HARDWARE.antennaType },
    { label: "Substrate",        value: HARDWARE.antennaSubstrate },
    { label: "Simulation",       value: HARDWARE.simulationTool },
    { label: "Phantom",          value: `${HARDWARE.phantomLayers}-Layer Tissue` },
    { label: "Deployment",       value: HARDWARE.iotDevice },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {specs.map((spec, i) => (
        <div key={i} className="bg-white border border-[#A5F3FC] rounded-xl p-4">
          <p className="text-xs text-[#64748B] font-body uppercase tracking-widest mb-1">{spec.label}</p>
          <p className="font-body text-sm font-500 text-[#0891B2]">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Commit all dashboard files**

```bash
git add app/dashboard/ components/dashboard/
git commit -m "feat: dashboard with pipeline, model comparison, and system info"
```

---

## Task 13: Final Polish + Verification

- [ ] **Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Run dev server and full QA pass**

```bash
npm run dev
```

**Verify landing page:**
- [ ] Lenis scroll is buttery smooth
- [ ] Hero GSAP SplitText animation plays on load
- [ ] Nav glassmorphism activates at 80px scroll
- [ ] Stats in Problem section count up (828, 212) when scrolled into view
- [ ] Pipeline section PINS and horizontal cards scroll on scroll
- [ ] ML table renders with correct values (verify against paper data)
- [ ] Charts show correct bars
- [ ] All quotes match paper verbatim
- [ ] No made-up values (cross-check lib/data.ts)

**Verify dashboard:**
- [ ] Pipeline steps display correctly from PIPELINE_STEPS
- [ ] Model comparison chart renders 4 bars per model
- [ ] System info shows Rogers R5880, CST MWS V'23, etc.

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: Build completes with 0 errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete landing page + dashboard — all data from Thapar Institute paper"
```

---

## DATA INTEGRITY CHECKLIST

Before merging, verify these values match the PDF exactly:

| Item | Value in lib/data.ts | Must match |
|---|---|---|
| Worldwide diabetics | 828,000,000 | "828 million" in paper |
| India diabetics | 212,000,000 | "212 million" in paper |
| CatBoost AUC | 0.97 | Table I |
| Random Forest Accuracy | 97.2% | Table II |
| Random Forest Precision | 100% | Table II |
| XGBoost Recall | 73.1% | Table II |
| TabNet Accuracy | 41.5% | Table II |
| Antenna substrate | Rogers R5880 | Methodology section |
| Phantom layers | 3 | Methodology section |
| IoT device | Raspberry Pi | Methodology section |
| Train-test split | 80:20 | Preprocessing section |

**RULE: If a metric or fact is not in lib/data.ts, it cannot appear on the website.**
