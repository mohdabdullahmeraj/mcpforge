import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Navigation Layer */}
      <header className="fixed top-0 w-full z-50 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-white">
            MCPForge
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#docs" className="hover:text-white transition-colors">Documentation</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-white text-neutral-950 rounded-md hover:bg-neutral-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col mt-16">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-6 md:pt-48 md:pb-32 overflow-hidden text-center">
          {/* Subtle Ambient Gradient Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Enterprise AI Infrastructure
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
              Build MCP Servers for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">
                AI Agent Workflows
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
              Create, manage, and scale the Model Context Protocol infrastructure that powers secure, B2B AI interactions. Connect your enterprise data directly to multi-agent systems seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-950 font-medium rounded-md hover:bg-neutral-200 transition-colors text-center">
                Get Started
              </Link>
              <Link href="/docs" className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 text-white font-medium rounded-md border border-neutral-800 hover:bg-neutral-800 transition-colors text-center">
                View Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Core Infrastructure</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">Everything you need to provision robust MCP layers connecting existing business tools to cognitive architectures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Secure MCP Generation</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Instantly spin up isolated, encrypted MCP servers enforcing strict logical boundaries.</p>
              </div>

              <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Enterprise Tool Integration</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Bridge your legacy CRM, ERP, and API suites natively using protocol adapters.</p>
              </div>

              <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Supabase Data Layer</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Backed by ultra-low latency PostgreSQL, offering real-time persistence and native edge-computing.</p>
              </div>

              <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Agent-Ready Architecture</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Expose strictly typed conversational capabilities instantly testable by your agents.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 border-t border-neutral-900 bg-neutral-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Deployment Pipeline</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">From raw data sources to intelligent agent readiness in three stages.</p>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute left-6 top-8 bottom-8 w-px bg-neutral-800" />

              <div className="flex gap-6 md:gap-8 items-start relative">
                <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-semibold z-10 relative">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">Connect Your Data</h3>
                  <p className="text-neutral-400 leading-relaxed">Authenticate with your enterprise systems via OAuth or secure tokens. We map your database schemas and APIs automatically into our intermediate staging layer powered by Supabase.</p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8 items-start relative">
                <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-semibold z-10 relative">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">Define Tools via MCP</h3>
                  <p className="text-neutral-400 leading-relaxed">Specify exactly which data endpoints and business logic functions should be exposed to your AI agents using the declarative Model Context Protocol format. Enforce granular permissions and rate limits.</p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8 items-start relative">
                <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-semibold z-10 relative">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">Deploy for AI Agents</h3>
                  <p className="text-neutral-400 leading-relaxed">Generate your dedicated MCP Server instance in seconds. Provide your AI fleets the secure endpoint URI—ready to interpret context and execute workflows autonomously.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">MCPForge</span>
            <span className="text-neutral-600">|</span>
            <span className="text-sm text-neutral-500">Intelligent Workflows.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
