"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    num: "01",
    title: "Planet Dreamers",
    category: "Business Website",
    tech: ["React.js"],
    description: "Built a complete interactive website using React.js, delivering a smooth and engaging user experience.",
    year: "2025",
    url:"https://planetdreamers.cooltheglobe.org"
  },
 
  {
    num: "02",
    title: "PharmaConnect",
    category: "Full-Stack Application",
    tech: ["Next.js", "Node.js", "React.js", "MongoDB","Typescript"],
    description: "Contributed to backend services and admin panel development, supporting full-stack feature implementation and system maintenance.",
    year: "2026",
    url:"https://www.pharmaconnect.co.in/sign-in"
  },
   {
    num: "03",
    title: "12 Grids",
    category: "Company Website",
    tech: ["Next.js", "React.js", "Gsap"],
    description: "Contributed to multiple sections of the company website, improving UI components, performance, and overall frontend experience.",
    year: "2025",
    url:"https://12grids.com"
  },
  {
    num: "04",
    title: "PharmaNow",
    category: "Content Platform",
    tech: ["Next.js", "React.js"],
    description: "Contributed to a content-driven platform dedicated to pharma professionals, enhancing content management features and overall user experience.",
    year: "2024",
    url:"https://www.pharmanow.live"
  },
 
   {
    num: "05",
    title: "Jetspray",
    category: "Business Website",
    tech: ["Next.js", "TailwindCSS","Typescript"],
    description: "Independently designed and developed a modern, responsive website using Next.js and TailwindCSS.",
    year: "2024",
    url:"https://www.jetspray.in"
  },
];

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
   <a href={project.url}>
     <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border-b border-white/10 group cursor-pointer transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`flex flex-col md:flex-row md:items-center gap-4 py-8 px-0 transition-all duration-300 ${hovered ? "px-6 bg-white/[0.02]" : ""}`}>
        <span className="font-mono text-xs text-white/20 w-8 shrink-0">{project.num}</span>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <h3 className="font-display text-3xl md:text-4xl tracking-wider group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-white/30 tracking-widest uppercase">{project.category}</span>
          </div>
          <p className={`text-sm text-white/40 mt-2 max-w-xl leading-relaxed transition-all duration-300 overflow-hidden ${hovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"}`}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:w-64 justify-start md:justify-end">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-xs border border-white/10 px-3 py-1 text-white/30 group-hover:border-white/20 group-hover:text-white/50 transition-all">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-xs text-white/20">{project.year}</span>
          <span className={`text-xl transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}>→</span>
        </div>
      </div>
    </div>
   </a>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" className="px-8 md:px-16 py-14  md:py-24">
      <div ref={ref} className={`flex items-end justify-between mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-3">Selected Work</p>
          <h2 className="font-display text-6xl md:text-8xl tracking-wider">PROJECTS</h2>
        </div>
        {/* <a href="#" className="hidden md:block font-mono text-xs text-white/30 hover:text-white transition-colors tracking-widest uppercase">
          All Projects →
        </a> */}
      </div>

      <div>
        {projects.map((p, i) => <ProjectRow key={p.num} project={p} index={i} />)}
      </div>
    </section>
  );
}
