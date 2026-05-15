import { TRUST_TECH } from "@/lib/constants";

export function TrustBar() {
  return (
    <section className="border-y border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
          Technologies we build with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_TECH.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
