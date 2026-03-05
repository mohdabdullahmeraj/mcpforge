"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function NewDesign() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F5F4] text-[#1A1A1A] font-sans relative overflow-x-hidden selection:bg-[#22D3EE] selection:text-black">
            {/* Noise Texture Overlay */}
            <div
                className="fixed inset-0 z-50 opacity-[0.03] pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Ambient Edge Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#22D3EE] rounded-full blur-[120px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#E879F9] rounded-full blur-[150px] opacity-[0.07] pointer-events-none translate-x-1/3 translate-y-1/3" />

            {/* Blueprint Grid Lines (Subtle) */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#F5F5F4]/80 backdrop-blur-md border-b border-black/5 py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-6 h-6 bg-black rounded-[2px] flex items-center justify-center group-hover:scale-95 transition-transform">
                            <span className="text-white text-xs font-bold font-mono">M</span>
                        </div>
                        <span className="font-semibold tracking-tight">MCPForge</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
                        <Link href="#features" className="hover:text-black transition-colors">Features</Link>
                        <Link href="#security" className="hover:text-black transition-colors">Security</Link>
                        <Link href="#quality" className="hover:text-black transition-colors">Quality Scoring</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/docs" className="text-sm font-medium hover:text-black/60 transition-colors">Documentation</Link>
                        <button className="bg-black text-white px-4 py-2 text-sm font-medium rounded-[2px] hover:bg-black/90 transition-colors shadow-sm">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-24">

                {/* Hero Section */}
                <BackgroundPaths title="From prompt to production in under 60 seconds." />

                {/* How It Works Section */}
                <section className="py-24 relative">
                    {/* Subtle background glow for this section */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8B5CF6] rounded-full blur-[120px] opacity-[0.04] pointer-events-none" />

                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="font-mono text-sm text-[#8B5CF6] font-semibold tracking-wider uppercase mb-3 block">Workflow</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Three steps to <span className="font-serif italic font-light text-black/70">production.</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            <div className="bg-white/60 backdrop-blur-md border border-black/5 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-black/10 transition-all group relative overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-[#F5F5F4] border border-black/5 flex items-center justify-center font-mono text-sm font-bold mb-6 group-hover:bg-[#8B5CF6] group-hover:text-white group-hover:border-[#8B5CF6] transition-colors">
                                    1
                                </div>
                                <h3 className="text-xl font-bold mb-3">Describe Your API</h3>
                                <p className="text-black/60 text-sm leading-relaxed">
                                    Use natural language, import a GitHub repo, or paste an OpenAPI spec. 60 seconds to production-ready code.
                                </p>
                                {/* Decorative faint grid in background of card */}
                                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 10H100M0 30H100M0 50H100M0 70H100M0 90H100M10 0V100M30 0V100M50 0V100M70 0V100M90 0V100" stroke="black" strokeWidth="0.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white/60 backdrop-blur-md border border-black/5 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-black/10 transition-all group relative overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-[#F5F5F4] border border-black/5 flex items-center justify-center font-mono text-sm font-bold mb-6 group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-colors">
                                    2
                                </div>
                                <h3 className="text-xl font-bold mb-3">Generate & Scan</h3>
                                <p className="text-black/60 text-sm leading-relaxed">
                                    8 security tools run in 2 gates — pre-generation and post-generation. Critical findings block delivery.
                                </p>
                                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
                                        <circle cx="50" cy="50" r="20" stroke="black" strokeWidth="0.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white/60 backdrop-blur-md border border-black/5 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-black/10 transition-all group relative overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-[#F5F5F4] border border-black/5 flex items-center justify-center font-mono text-sm font-bold mb-6 group-hover:bg-[#22D3EE] group-hover:text-white group-hover:border-[#22D3EE] transition-colors">
                                    3
                                </div>
                                <h3 className="text-xl font-bold mb-3">Deploy & Monitor</h3>
                                <p className="text-black/60 text-sm leading-relaxed">
                                    Link a GitHub repo for automatic change detection. Track usage analytics. Sync configs to every major AI client.
                                </p>
                                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 80L50 20L80 80H20Z" stroke="black" strokeWidth="0.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Bento Grid */}
                <section className="py-24 max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Built for every workflow.</h2>
                        <p className="text-black/50 text-lg">Flexible input methods to build servers how you want.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Chat Interface */}
                        <div className="bg-white/80 border border-black/5 rounded-2xl p-8 hover:shadow-lg transition-all flex flex-col h-[380px]">
                            <div className="w-12 h-12 bg-[#F5F5F4] rounded-[4px] flex items-center justify-center text-xl mb-8">
                                💬
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Chat Interface</h3>
                            <p className="text-black/60 text-sm mb-8 flex-grow">
                                Describe in natural language what your MCP server should do. Get production-ready code generated in under 60 seconds.
                            </p>
                            <ul className="space-y-2 mt-auto">
                                {['Natural language input', 'Iterative refinement', 'Preview before deploy', 'Template library'].map((item, i) => (
                                    <li key={i} className="flex items-center text-xs font-mono text-black/70">
                                        <span className="text-black/30 mr-2">→</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* GitHub Int */}
                        <div className="bg-white/80 border border-black/5 rounded-2xl p-8 hover:shadow-lg transition-all flex flex-col h-[380px] lg:scale-[1.02] lg:-translate-y-2 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE] opacity-10 blur-3xl rounded-full" />
                            <div className="w-12 h-12 bg-[#F5F5F4] rounded-[4px] flex items-center justify-center text-xl mb-8">
                                🐙
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">GitHub Integration</h3>
                            <p className="text-black/60 text-sm mb-8 flex-grow relative z-10">
                                Import any GitHub repo. MCPForge analyzes your codebase with Tree-sitter, detects changes via webhooks, and proposes surgical updates.
                            </p>
                            <ul className="space-y-2 mt-auto relative z-10">
                                {['Repo import & analysis', 'Webhook change detection', 'Impact classification', 'Auto-PR proposals'].map((item, i) => (
                                    <li key={i} className="flex items-center text-xs font-mono text-black/70">
                                        <span className="text-[#22D3EE] mr-2">→</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* OpenAPI Import */}
                        <div className="bg-white/80 border border-black/5 rounded-2xl p-8 hover:shadow-lg transition-all flex flex-col h-[380px]">
                            <div className="w-12 h-12 bg-[#F5F5F4] rounded-[4px] flex items-center justify-center text-xl mb-8">
                                📄
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">OpenAPI Import</h3>
                            <p className="text-black/60 text-sm mb-8 flex-grow">
                                Paste an OpenAPI spec and get a fully typed MCP server. Every endpoint becomes a tool with proper schemas and descriptions.
                            </p>
                            <ul className="space-y-2 mt-auto">
                                {['Full spec parsing', 'Auto type generation', 'Schema validation', 'Endpoint mapping'].map((item, i) => (
                                    <li key={i} className="flex items-center text-xs font-mono text-black/70">
                                        <span className="text-black/30 mr-2">→</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Security & Quality Split Section */}
                <section className="py-24 bg-[#0A0A0A] text-white my-12 border-y border-white/10 relative overflow-hidden">
                    {/* Dark mode internal glow */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#22D3EE] rounded-full blur-[180px] opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/3" />

                    <div className="max-w-6xl mx-auto px-6 relative z-10">

                        {/* Security Pipeline */}
                        <div className="mb-24">
                            <div className="inline-flex items-center border border-white/20 rounded-full p-1 bg-black/50 backdrop-blur-sm shadow-sm mb-6">
                                <span className="px-3 py-1 text-xs font-semibold bg-white text-black rounded-full mr-1">Security</span>
                                <span className="px-3 py-1 text-xs font-mono font-medium text-white/70">8-Tool Pipeline</span>
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight mb-4">Every server gets scanned <span className="font-serif italic font-light text-white/70">twice.</span></h2>
                            <p className="text-white/50 text-sm max-w-xl mb-12">Gate 1 before generation and Gate 2 after. Critical findings block delivery.</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                    { t: 'SAST Analysis', d: 'Static code analysis for vulnerabilities and anti-patterns' },
                                    { t: 'Secret Detection', d: 'Scan for leaked API keys, tokens, and credentials' },
                                    { t: 'CVE & Dependency', d: 'Check dependencies against known vulnerability databases' },
                                    { t: 'Tool Poisoning', d: 'Detect behavioral mismatches and permission escalation' }
                                ].map((scan, i) => (
                                    <div key={i} className="p-6 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors">
                                        <h4 className="font-mono text-sm mb-2 text-white/90">{scan.t}</h4>
                                        <p className="text-xs text-white/40 leading-relaxed">{scan.d}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="px-3 py-1.5 rounded-[4px] bg-white/10 text-xs font-mono text-white/70 border border-white/5">8 security tools — 7 free forever</span>
                                <span className="px-3 py-1.5 rounded-[4px] bg-white/10 text-xs font-mono text-[#22D3EE] border border-white/5">Pre + post scanning</span>
                                <span className="px-3 py-1.5 rounded-[4px] bg-white/10 text-xs font-mono text-white/70 border border-white/5">Auto-fix suggestions</span>
                            </div>
                        </div>

                        {/* Quality Scoring */}
                        <div className="pt-24 border-t border-white/10">
                            <div className="inline-flex items-center border border-white/20 rounded-full p-1 bg-black/50 backdrop-blur-sm shadow-sm mb-6">
                                <span className="px-3 py-1 text-xs font-semibold bg-[#10B981] text-white rounded-full mr-1">Quality</span>
                                <span className="px-3 py-1 text-xs font-mono font-medium text-white/70">6-Dimension Scoring</span>
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight mb-4">Gate deploys on minimum scores.</h2>
                            <p className="text-white/50 text-sm max-w-xl mb-12">Get auto-fix suggestions to improve LLM understanding. 87% average improvement after applying fixes.</p>

                            <div className="grid grid-cols-2 md:grid-cols-6 gap-0 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                                {[
                                    { l: 'Tool Descriptions', v: '25%' },
                                    { l: 'Input Schemas', v: '20%' },
                                    { l: 'Error Handling', v: '15%' },
                                    { l: 'Security Posture', v: '20%' },
                                    { l: 'Behavioral', v: '10%' },
                                    { l: 'Documentation', v: '10%' }
                                ].map((score, i) => (
                                    <div key={i} className="p-6 border-b md:border-b-0 border-r border-white/10 last:border-r-0 flex flex-col justify-between hover:bg-white/[0.04] transition-colors">
                                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-4 break-words">{score.l}</span>
                                        <span className="font-serif italic text-3xl text-white">{score.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-black/5 py-12 text-center text-sm font-medium text-black/40">
                <p>© 2026 MCPForge. Minimalist Theme.</p>
            </footer>

            {/* Adding a minimal CSS for fade-in animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />
        </div>
    );
}
