import { Link } from "react-router-dom";
import { INSTITUTION, PAPER_TITLE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border-c bg-bg-mid">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-blink" />
              </div>
              <span className="font-heading font-700 text-fg text-sm tracking-widest uppercase">GlucoSense</span>
            </div>
            <p className="font-body text-fg-muted text-sm leading-relaxed">
              Non-invasive blood glucose monitoring using microwave-based sensors and machine learning.
            </p>
          </div>

          {/* Research */}
          <div>
            <p className="font-body text-[10px] text-fg-muted uppercase tracking-[0.3em] mb-4">Research</p>
            <p className="font-body text-fg-muted text-sm leading-relaxed mb-2">{PAPER_TITLE}</p>
            <p className="font-body text-fg-muted/60 text-xs">{INSTITUTION}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body text-[10px] text-fg-muted uppercase tracking-[0.3em] mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Problem",    href: "#problem" },
                { label: "The Physics",href: "#physics" },
                { label: "Pipeline",   href: "#pipeline" },
                { label: "Results",    href: "#results" },
                { label: "Dashboard",  href: "/dashboard", isRoute: true },
              ].map((link) =>
                link.isRoute ? (
                  <Link key={link.label} to={link.href}
                    className="font-body text-sm text-fg-muted hover:text-secondary transition-colors w-fit">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href}
                    className="font-body text-sm text-fg-muted hover:text-secondary transition-colors w-fit">
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-c/40 flex flex-col md:flex-row
                        items-start md:items-center justify-between gap-4">
          <p className="font-body text-fg-muted/40 text-xs">
            All data on this site sourced exclusively from the research paper. No synthetic or simulated metrics.
          </p>
          <p className="font-body text-fg-muted/30 text-xs">
            Thapar Institute of Engineering &amp; Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
