"use client"
export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-mono text-xs text-white/20 tracking-widest">
        © 2026 SURAJ MAURYA
      </div>
      {/* <div className="font-mono text-xs text-white/10 tracking-widest">
        DESIGNED & BUILT WITH NEXT.JS + TAILWIND
      </div> */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-mono text-xs text-white/20 hover:text-white transition-colors tracking-widest uppercase"
      >
        BACK TO TOP ↑
      </button>
    </footer>
  );
}
