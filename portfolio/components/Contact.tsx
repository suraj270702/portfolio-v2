"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section id="contact" className="px-8 md:px-16 py-24 border-t border-white/10">
      <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Big CTA */}
        <div className="mb-20">
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="font-display text-[10vw] leading-none tracking-wider">
            LET&apos;S<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>BUILD.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
              { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key} className="group">
                <label className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-2">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 group-hover:border-white/30 focus:border-white/50 outline-none py-3 text-sm text-white placeholder:text-white/20 transition-colors"
                  required
                />
              </div>
            ))}

            <div className="group">
              <label className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 group-hover:border-white/30 focus:border-white/50 outline-none py-3 text-sm text-white placeholder:text-white/20 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group relative overflow-hidden border border-white px-10 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:text-black disabled:opacity-50 w-full md:w-auto"
            >
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative">
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "✓ Message Sent"}
              </span>
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-12">
            <div>
              <p className="font-mono text-xs text-white/20 tracking-widest uppercase mb-4">Email</p>
              <a href="mailto:surajmaurya2720@gmail.com" className="font-body text-lg text-white/60 hover:text-white transition-colors">
                surajmaurya2720@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-xs text-white/20 tracking-widest uppercase mb-4">Location</p>
              <p className="font-body text-lg text-white/60">Mumbai,Maharashtra</p>
            </div>
            <div>
              <p className="font-mono text-xs text-white/20 tracking-widest uppercase mb-4">Social</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "GitHub /suraj270702", url: "https://github.com/suraj270702" },
                  { label: "LinkedIn /in/surajmaurya", url: "https://www.linkedin.com/in/suraj-maurya-8ab6711ab" },
                  { label: "Twitter @suraj270702", url: "https://x.com/suraj270702" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-white/30 hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
