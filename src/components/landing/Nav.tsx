import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Problem",    href: "#problem" },
  { label: "The Physics", href: "#physics" },
  { label: "Pipeline",   href: "#pipeline" },
  { label: "Results",    href: "#results" },
  { label: "Team",       href: "#team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-2xl border-b border-border-c/60 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border border-primary/50 animate-ring-1 group-hover:border-primary/80 transition-colors" />
              <div className="absolute inset-[4px] rounded-full border border-primary/30" />
              <div className="absolute inset-[9px] rounded-full bg-primary animate-blink" />
            </div>
            <div>
              <span className="font-heading font-700 text-sm tracking-widest text-fg uppercase">
                GlucoSense
              </span>
              <span className="hidden sm:block text-[10px] text-fg-muted font-body tracking-wider uppercase -mt-0.5">
                Thapar Institute Research
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.href)}
                className="relative text-sm text-fg-muted hover:text-secondary font-body transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 text-secondary text-sm font-body hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Dashboard
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="menu"
            >
              <span className={`block h-px bg-fg transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block h-px bg-fg transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-fg transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[68px] inset-x-0 z-40 bg-bg/95 backdrop-blur-2xl border-b border-border-c lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="text-left text-lg font-body text-fg-muted hover:text-secondary transition-colors py-2 border-b border-border-c/30"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/dashboard" className="mt-2 text-primary font-body font-500">
                Dashboard →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
