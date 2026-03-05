import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans text-white">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">MCPForge Landing Pages</h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Select a design concept to explore. The neo-brutalist OS theme is available now, and a new modern iteration will be added next.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          <Link href="/neo-brutalist" className="group block p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-500 hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-[#39FF14] transition-colors flex items-center gap-2">
              Neo-Brutalist OS
              <span className="text-sm px-2 py-0.5 bg-neutral-800 rounded-md text-neutral-400 ml-auto">Ready</span>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              A highly tactile, PostHog-inspired desktop OS experience with draggable windows, heavy borders, and brutalist layouts.
            </p>
          </Link>

          <Link href="/new-design" className="group block p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-500 hover:-translate-y-1 transition-all opacity-80">
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
              Modern Minimalist
              <span className="text-sm px-2 py-0.5 bg-blue-900/50 text-blue-400 rounded-md ml-auto">Ready</span>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              The next iteration. A sleek, modern design system focusing on minimalism, typography, and negative space.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
