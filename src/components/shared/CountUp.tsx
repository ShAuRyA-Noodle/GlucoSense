import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = "",
  decimals = 0,
  duration = 2.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const el = ref.current;

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate() {
            el.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  }, [end, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
