export default function MarqueeBand() {
  const items = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "GraphQL", "Redis", "Kubernetes"];
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-white/10 py-4 overflow-hidden bg-white/[0.02]">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-xs tracking-widest text-white/30 uppercase px-8">{item}</span>
            <span className="text-white/10">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
