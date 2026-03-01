"use client";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 97 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind / CSS", level: 90 },
      { name: "React Native", level: 82 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", level: 95 },
      { name: "GraphQL", level: 88 },
      { name: "PostgreSQL", level: 91 },
      { name: "Redis", level: 84 },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "AWS / GCP", level: 86 },
      { name: "Docker / K8s", level: 88 },
      { name: "CI/CD Pipelines", level: 90 },
      { name: "Terraform", level: 78 },
    ],
  },
];

function SkillBar({ name, level, visible }: { name: string; level: number; visible: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-xs text-white/60 tracking-wider">{name}</span>
        <span className="font-mono text-xs text-white/20">{level}%</span>
      </div>
      <div className="h-px bg-white/10 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
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
    <section id="skills" className="px-8 md:px-16 py-14 md:py-24 border-t border-white/10">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-3">Capabilities</p>
          <h2 className="font-display text-6xl md:text-7xl tracking-wider mb-8">SKILLS</h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm">
            Proficient across the entire stack. I specialize in building performant, scalable applications with modern tooling and best practices.
          </p>

          {/* Circular decoration */}
          <div className="relative w-40 h-40 mt-12">
            <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl tracking-wider">10+</span>
            </div>
            <div className="absolute -bottom-6 left-0 font-mono text-xs text-white/20 tracking-widest">TECHNOLOGIES</div>
          </div>
        </div>

        {/* Right - Skill groups */}
        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs text-white/20 tracking-widest uppercase">{group.category}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
