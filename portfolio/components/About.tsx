"use client";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2024",
    role: "Full Stack Developer",
    company: "12 Grids",
    desc: "Led end-to-end full-stack development, architecting scalable backend systems and building real-time collaborative features."
  },
  {
    year: "2024",
    role: "Full Stack Developer Intern",
    company: "Weframe Tech",
    desc: "Gained hands-on exposure to full-stack projects and developed a strong understanding of end-to-end application architecture."
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="px-8 md:px-16 py-24 border-t border-white/10">
      <div ref={ref} className={`grid md:grid-cols-2 gap-16 items-start transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Left - bio */}
        <div>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-3">About</p>
          <h2 className="font-display text-6xl md:text-7xl tracking-wider mb-8">ME</h2>

          <div className="space-y-4 text-white/50 text-sm leading-relaxed">
            <p>
              I&apos;m a full-stack developer based in Mumbai with a deep passion for building systems that are both technically excellent and delightful to use.
            </p>
            <p>
              I believe great software lives at the intersection of clean architecture, beautiful design, and rock-solid performance. Every line of code I write reflects that philosophy.
            </p>
            {/* <p>
              When I&apos;m not building, I&apos;m contributing to open source, writing about distributed systems, or mentoring junior developers.
            </p> */}
          </div>

          <div className="mt-10 flex gap-6">
            {[
              { name: "GitHub", url: "https://github.com/suraj270702" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/suraj-maurya-8ab6711ab" },
              { name: "Twitter", url: "https://x.com/suraj270702" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white/30 hover:text-white transition-colors tracking-widest uppercase border-b border-transparent hover:border-white/30 pb-0.5"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Photo placeholder */}
          {/* <div className="mt-12 relative w-48 h-60 border border-white/10">
            <div className="absolute inset-0 bg-white/[0.02]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-5xl tracking-wider text-white/10">AC</div>
                <div className="font-mono text-xs text-white/10 mt-2">PHOTO</div>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-3 w-full h-full border border-white/5" />
          </div> */}
        </div>

        {/* Right - timeline */}
        <div>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-8">Experience</p>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 pb-10 relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[2.5rem] top-3 bottom-0 w-px bg-white/10" />
                )}

                <div className="font-mono text-xs text-white/20 w-10 shrink-0 pt-1">{item.year}</div>

                <div className="flex-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute left-[2rem] top-1.5" />
                  <div className="font-display text-xl tracking-wider mb-0.5">{item.role}</div>
                  <div className="font-mono text-xs text-white/30 tracking-widest uppercase mb-2">{item.company}</div>
                  <p className="text-sm text-white/30 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
