"use client";
import { useEffect, useRef, useState } from "react";

const roles = ["Full Stack Developer", "React Engineer", "Node.js Expert", "System Architect"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 70);
      } else {
        timer = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, 35);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  // Grid dot animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let mouseX = -999, mouseY = -999;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouse);

    const gap = 40;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      const cols = Math.ceil(canvas.width / gap) + 1;
      const rows = Math.ceil(canvas.height / gap) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(t + i * 0.3 + j * 0.3) * 0.5 + 0.5;
          const proximity = Math.max(0, 1 - dist / 120);
          const alpha = 0.08 + pulse * 0.06 + proximity * 0.4;
          const size = 1 + proximity * 2;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display text-[20vw] leading-none text-white/[0.02] tracking-widest"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
        >
          DEV
        </span>
      </div>

      <div className="relative z-10 px-8 md:px-16 pt-32 pb-20">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-xs text-white/50 tracking-widest">AVAILABLE FOR WORK</span>
        </div>

        {/* Name */}
        <h1 className="font-display text-[12vw] md:text-[9vw] leading-[0.9] tracking-wider mb-6 overflow-hidden">
          <span
            className="block opacity-0 animate-fade-up"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            SURAJ
          </span>
          <span
            className="block opacity-0 animate-fade-up"
            style={{ animationDelay: "550ms", animationFillMode: "forwards" }}
          >
            MAURYA
          </span>
        </h1>

        {/* Role typewriter */}
        <div
          className="flex items-center gap-3 mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <div className="w-8 h-px bg-white/30" />
          <p className="font-mono text-sm text-white/50 tracking-widest">
            {displayed}
            <span className="animate-cursor-blink">|</span>
          </p>
        </div>

        {/* Description + CTA */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end gap-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          <p className="max-w-sm text-white/40 text-sm leading-relaxed font-body">
            I build scalable systems and beautiful interfaces. 2+ years crafting full-stack applications from concept to deployment.
          </p>
          <div className="flex gap-4">
            <a
              href="#work"
              className="group relative overflow-hidden border border-white px-8 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:text-black"
              onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative">View Work</span>
            </a>
            <a
              href="#contact"
              className="font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 px-4 py-3"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Let&apos;s Talk <span className="text-lg leading-none">→</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 flex gap-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
        >
          {[["2+", "Years Exp"], ["15+", "Projects"]].map(([num, label]) => (
            <div key={label}>
              <div className="font-display text-3xl tracking-wider">{num}</div>
              <div className="font-mono text-xs text-white/30 tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}>
        <div className="font-mono text-xs text-white/20 tracking-widest rotate-90 mb-4">SCROLL</div>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
