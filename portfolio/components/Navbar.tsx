"use client";
import { useEffect, useState } from "react";

const links = ["Work", "Skills", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 backdrop-blur-md bg-black/60" : ""
      }`}
    >
      <nav className="flex items-center justify-between px-8 md:px-16 py-5">
        <div className="font-display text-xl tracking-widest">SM</div>

        <ul className="hidden md:flex gap-10">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="font-mono text-xs text-white/50 hover:text-white transition-colors duration-300 tracking-widest uppercase"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="font-mono text-xs text-white/30 tracking-wider">{time}</div>
      </nav>
    </header>
  );
}
