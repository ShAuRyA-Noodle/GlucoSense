import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredAssets = [
  "public/assets/r5880.png",
  "public/assets/physics-visual.png",
  "public/assets/antenna-closeup.png",
  "public/assets/thapar-institute.png",
  "public/pipeline/stage-1.png",
  "public/pipeline/stage-2.png",
  "public/pipeline/stage-3.png",
  "public/pipeline/stage-4.png",
  "public/pipeline/stage-5.png",
  "public/pipeline/stage-6.png",
  "public/pipeline/stage-7.png",
];

const sourceExpectations = [
  {
    file: "src/components/landing/Hero.tsx",
    includes: ["<MicrowaveRipple />"],
    excludes: ["/assets/hero-bg.png", "/assets/hero-background.png"],
  },
  {
    file: "src/components/landing/Physics.tsx",
    includes: ["/assets/physics-visual.png"],
    excludes: ["/assets/physics-visual.jpg"],
  },
  {
    file: "src/components/landing/Technology.tsx",
    includes: ["/assets/antenna-closeup.png", "/assets/r5880.png"],
    excludes: ["/assets/antenna-closeup.jpg"],
  },
  {
    file: "src/components/landing/ResearchTeam.tsx",
    includes: ["/assets/thapar-institute.png"],
    excludes: ["/assets/thapar-institute.jpg"],
  },
  {
    file: "src/components/landing/Pipeline.tsx",
    includes: ["/pipeline/stage-${step.step}.png", "<img"],
    excludes: ["/pipeline/stage-{step.step}.jpg"],
  },
  {
    file: "src/components/shared/Marquee.tsx",
    includes: ["marquee-track", "animate-marquee", "Research highlights ticker"],
    excludes: ["marquee-ghost"],
  },
];

const failures = [];

for (const asset of requiredAssets) {
  if (!existsSync(join(root, asset))) {
    failures.push(`Missing asset: ${asset}`);
  }
}

for (const expectation of sourceExpectations) {
  const path = join(root, expectation.file);
  const source = readFileSync(path, "utf8");

  for (const text of expectation.includes) {
    if (!source.includes(text)) {
      failures.push(`${expectation.file} should include ${text}`);
    }
  }

  for (const text of expectation.excludes) {
    if (source.includes(text)) {
      failures.push(`${expectation.file} should not include ${text}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Asset wiring contract passed.");
