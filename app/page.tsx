"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type AppID = "home" | "features" | "docs" | "servers";

interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  zIndex: number;
}

const APPS: Record<AppID, { icon: React.ReactNode; label: string; title: string }> = {
  home: {
    icon: <span className="text-3xl">🏠</span>,
    label: "Home",
    title: "home.mdx",
  },
  features: {
    icon: <span className="text-3xl">✨</span>,
    label: "Features",
    title: "features.tsx",
  },
  docs: {
    icon: <span className="text-3xl">📚</span>,
    label: "Docs",
    title: "docs.pdf",
  },
  servers: {
    icon: <span className="text-3xl">⚡</span>,
    label: "MCP Servers",
    title: "servers.exe",
  },
};

export default function Home() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [dragging, setDragging] = useState<{ id: AppID; startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  useEffect(() => {
    // Initial load: open home window in center
    if (typeof window !== "undefined") {
      const width = Math.min(850, window.innerWidth * 0.95);
      const height = Math.min(550, window.innerHeight * 0.85);
      const startX = Math.max(10, (window.innerWidth - width) / 2);
      const startY = Math.max(10, (window.innerHeight - height) / 2 - 20);

      setWindows([
        {
          id: "home",
          title: "home.mdx",
          isOpen: true,
          isMinimized: false,
          x: startX,
          y: startY,
          zIndex: 10,
        },
      ]);
    }
  }, []);

  const openWindow = (id: AppID) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      const maxZ = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex)) : 0;

      if (exists) {
        return prev.map((w) =>
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 } : w
        );
      }

      let startX = 100;
      let startY = 100;
      if (typeof window !== "undefined") {
        const width = Math.min(850, window.innerWidth * 0.95);
        const height = Math.min(550, window.innerHeight * 0.85);

        // Add slight stagger if multiple windows open so they don't perfectly overlap
        const stagger = (prev.length * 20) % 60;
        startX = Math.max(10, (window.innerWidth - width) / 2) + stagger;
        startY = Math.max(10, (window.innerHeight - height) / 2 - 20) + stagger;
      }

      return [
        ...prev,
        {
          id,
          title: APPS[id].title,
          isOpen: true,
          isMinimized: false,
          x: startX,
          y: startY,
          zIndex: maxZ + 1,
        },
      ];
    });
  };

  const focusWindow = (id: AppID) => {
    setWindows((prev) => {
      const maxZ = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex)) : 0;
      return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
    });
  };

  const closeWindow = (id: AppID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const minimizeWindow = (id: AppID) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const restoreWindow = (id: AppID) => {
    setWindows((prev) => {
      const maxZ = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex)) : 0;
      return prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
      );
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: AppID, x: number, y: number) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging({ id, startX: e.clientX, startY: e.clientY, initialX: x, initialY: y });
    focusWindow(id);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - dragging.startX;
    const dy = e.clientY - dragging.startY;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === dragging.id ? { ...w, x: dragging.initialX + dx, y: dragging.initialY + dy } : w
      )
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDragging(null);
    }
  };

  const renderWindowContent = (id: AppID) => {
    switch (id) {
      case "home":
        return (
          <div className="flex flex-col text-sm bg-white pb-12">
            {/* Hero Section */}
            <div className="py-12 px-6 flex flex-col items-center text-center bg-white border-b-4 border-black border-dashed">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#0055FF] text-white text-[10px] font-black uppercase mb-6 border-[3px] border-black shadow-[2px_2px_0px_#000] transform -rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#39FF14] animate-pulse"></span>
                MCP SERVER PLATFORM
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-4 leading-none uppercase">
                <span className="bg-[#39FF14] px-2 text-black block mb-2 transform rotate-1 border-4 border-black shadow-[4px_4px_0px_#000]">Generate.</span>
                <span className="block mb-2">Secure.</span>
                <span className="bg-[#FF6B00] px-2 text-white block transform -rotate-2 border-4 border-black shadow-[4px_4px_0px_#000]">Maintain.</span>
              </h1>
              <p className="text-sm md:text-base text-neutral-800 max-w-xl my-8 font-bold bg-[#F4F4F0] p-4 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                From prompt to production in under 60 seconds. <br className="hidden md:block" />
                <span className="text-black font-black">MCPForge generates servers, scans them with 8 security tools across 2 gates, monitors upstream changes, and syncs configs to every major AI client.</span>
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#FF6B00] text-black font-black border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none uppercase">
                  GET STARTED
                </button>
                <button className="px-6 py-3 bg-white text-black font-black border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none uppercase">
                  VIEW DOCS
                </button>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-12 w-full max-w-2xl">
                <div className="flex-1 min-w-[140px] bg-black text-[#39FF14] p-4 border-[3px] border-black shadow-[4px_4px_0px_#FF6B00]">
                  <div className="text-2xl font-black">12K+</div>
                  <div className="text-[10px] font-bold uppercase text-white">Servers Generated</div>
                </div>
                <div className="flex-1 min-w-[140px] bg-black text-[#0055FF] p-4 border-[3px] border-black shadow-[4px_4px_0px_#39FF14]">
                  <div className="text-2xl font-black">4.2K+</div>
                  <div className="text-[10px] font-bold uppercase text-white">Repos Monitored</div>
                </div>
                <div className="flex-1 min-w-[140px] bg-black text-[#FF6B00] p-4 border-[3px] border-black shadow-[4px_4px_0px_#0055FF]">
                  <div className="text-2xl font-black">87%</div>
                  <div className="text-[10px] font-bold uppercase text-white">Quality Improvement</div>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="py-12 px-6 bg-[#F4F4F0] border-b-4 border-black">
              <div className="mb-8">
                <div className="text-xs font-black text-[#0055FF] uppercase tracking-widest mb-1 pointer-events-none">HOW IT WORKS</div>
                <h2 className="text-3xl font-black uppercase text-black">Three Steps to Production</h2>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_#000] relative hover:-translate-y-1 transition-transform">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#39FF14] border-[3px] border-black flex items-center justify-center text-2xl font-black text-black">1</div>
                  <div>
                    <h3 className="text-lg font-black uppercase mb-2">Describe Your API</h3>
                    <p className="font-bold text-neutral-800 text-sm">Use natural language, import a GitHub repo, or paste an OpenAPI spec. 60 seconds to production-ready code.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_#000] relative hover:-translate-y-1 transition-transform">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B00] border-[3px] border-black flex items-center justify-center text-2xl font-black text-black">2</div>
                  <div>
                    <h3 className="text-lg font-black uppercase mb-2">Generate & Scan</h3>
                    <p className="font-bold text-neutral-800 text-sm">8 security tools run in 2 gates — pre-generation and post-generation. Critical findings block delivery.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_#000] relative hover:-translate-y-1 transition-transform">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] border-[3px] border-black flex items-center justify-center text-2xl font-black text-white">3</div>
                  <div>
                    <h3 className="text-lg font-black uppercase mb-2">Deploy & Monitor</h3>
                    <p className="font-bold text-neutral-800 text-sm">Link a GitHub repo for automatic change detection. Track usage analytics. Sync configs to every major AI client.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities Section */}
            <div className="py-12 px-6 bg-white border-b-4 border-black">
              <div className="mb-8">
                <div className="text-xs font-black text-[#39FF14] bg-black px-2 py-1 inline-block uppercase tracking-widest mb-2 border-[2px] border-black">CAPABILITIES</div>
                <h2 className="text-3xl font-black uppercase text-black">Built for Every Workflow</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-[3px] border-black p-5 shadow-[4px_4px_0px_#000] bg-[#F4F4F0] hover:-translate-y-1 transition-transform group">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">💬</div>
                  <h3 className="text-lg font-black uppercase mb-2 border-b-[3px] border-black pb-2 inline-block">Chat Interface</h3>
                  <p className="font-bold text-xs mb-4 text-neutral-700">Describe in natural language what your MCP server should do. Get production-ready code generated in under 60 seconds.</p>
                  <ul className="text-xs font-bold space-y-1 flex flex-col gap-1 text-black font-mono bg-white p-2 border-2 border-dashed border-black">
                    <li>{'>'} Natural language input</li>
                    <li>{'>'} Iterative refinement</li>
                    <li>{'>'} Preview before deploy</li>
                    <li>{'>'} Template library</li>
                  </ul>
                </div>

                <div className="border-[3px] border-black p-5 shadow-[4px_4px_0px_#000] bg-[#F4F4F0] hover:-translate-y-1 transition-transform group">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">🐙</div>
                  <h3 className="text-lg font-black uppercase mb-2 border-b-[3px] border-black pb-2 inline-block text-[#0055FF]">GitHub Integration</h3>
                  <p className="font-bold text-xs mb-4 text-neutral-700">Import any GitHub repo. MCPForge analyzes your codebase with Tree-sitter, detects changes via webhooks, and proposes surgical updates.</p>
                  <ul className="text-xs font-bold space-y-1 flex flex-col gap-1 text-black font-mono bg-white p-2 border-2 border-dashed border-black">
                    <li>{'>'} Repo import & analysis</li>
                    <li>{'>'} Webhook change detection</li>
                    <li>{'>'} Impact classification</li>
                    <li>{'>'} Auto-PR proposals</li>
                  </ul>
                </div>

                <div className="border-[3px] border-black p-5 shadow-[4px_4px_0px_#000] bg-[#F4F4F0] hover:-translate-y-1 transition-transform group">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">📄</div>
                  <h3 className="text-lg font-black uppercase mb-2 border-b-[3px] border-black pb-2 inline-block text-[#FF6B00]">OpenAPI Import</h3>
                  <p className="font-bold text-xs mb-4 text-neutral-700">Paste an OpenAPI spec and get a fully typed MCP server. Every endpoint becomes a tool with proper schemas and descriptions.</p>
                  <ul className="text-xs font-bold space-y-1 flex flex-col gap-1 text-black font-mono bg-white p-2 border-2 border-dashed border-black">
                    <li>{'>'} Full spec parsing</li>
                    <li>{'>'} Auto type generation</li>
                    <li>{'>'} Schema validation</li>
                    <li>{'>'} Endpoint mapping</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="py-12 px-6 bg-black text-white border-b-4 border-black">
              <div className="mb-8">
                <div className="text-xs font-black text-black bg-[#FF6B00] px-2 py-1 inline-block uppercase tracking-widest mb-2 border-[2px] border-white">SECURITY</div>
                <h2 className="text-3xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#FF6B00]">8-Tool Security Pipeline</h2>
                <p className="font-bold text-sm max-w-2xl mt-4 text-neutral-300">
                  Every server gets scanned twice — Gate 1 before generation and Gate 2 after. Critical findings block delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="border-[3px] border-white p-4 shadow-[4px_4px_0px_#39FF14] bg-[#111]">
                  <h4 className="font-black text-sm uppercase mb-2 text-[#39FF14]">SAST Analysis</h4>
                  <p className="text-xs font-bold text-neutral-400">Static code analysis for vulnerabilities and anti-patterns</p>
                </div>
                <div className="border-[3px] border-white p-4 shadow-[4px_4px_0px_#39FF14] bg-[#111]">
                  <h4 className="font-black text-sm uppercase mb-2 text-[#39FF14]">Secret Detection</h4>
                  <p className="text-xs font-bold text-neutral-400">Scan for leaked API keys, tokens, and credentials</p>
                </div>
                <div className="border-[3px] border-white p-4 shadow-[4px_4px_0px_#FF6B00] bg-[#111]">
                  <h4 className="font-black text-sm uppercase mb-2 text-[#FF6B00]">CVE & Dependency</h4>
                  <p className="text-xs font-bold text-neutral-400">Check dependencies against known vulnerability databases</p>
                </div>
                <div className="border-[3px] border-white p-4 shadow-[4px_4px_0px_#FF6B00] bg-[#111]">
                  <h4 className="font-black text-sm uppercase mb-2 text-[#FF6B00]">Tool Poisoning</h4>
                  <p className="text-xs font-bold text-neutral-400">Detect behavioral mismatches and permission escalation</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 font-mono text-[10px] font-bold">
                <span className="bg-[#39FF14] text-black px-2 py-1 border-[2px] border-white">8 security tools — 7 free forever</span>
                <span className="bg-[#0055FF] text-white px-2 py-1 border-[2px] border-white">Pre + post generation scanning</span>
                <span className="bg-[#FF6B00] text-black px-2 py-1 border-[2px] border-white">A-F security report cards</span>
                <span className="bg-white text-black px-2 py-1 border-[2px] border-white">Auto-fix suggestions</span>
              </div>
            </div>

            {/* Quality Section */}
            <div className="py-12 px-6 bg-[#F4F4F0]">
              <div className="mb-8">
                <div className="text-xs font-black text-white bg-[#0055FF] px-2 py-1 inline-block uppercase tracking-widest mb-2 border-[2px] border-black shadow-[2px_2px_0px_#000] transform -rotate-2">QUALITY</div>
                <h2 className="text-3xl font-black uppercase text-black">6-Dimension Quality Scoring</h2>
                <p className="font-bold text-sm max-w-2xl mt-4 text-neutral-800 p-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000]">
                  Score any MCP server across 6 dimensions. Get auto-fix suggestions to improve LLM understanding. Gate deploys on minimum scores. <span className="text-[#0055FF] font-black">87% average improvement after applying fixes.</span>
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Tool Descriptions</span>
                  <span className="font-black text-3xl mt-4 text-[#0055FF]">25%</span>
                </div>
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Input Schemas</span>
                  <span className="font-black text-3xl mt-4 text-[#FF6B00]">20%</span>
                </div>
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Error Handling</span>
                  <span className="font-black text-3xl mt-4 text-[#39FF14]">15%</span>
                </div>
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Security Posture</span>
                  <span className="font-black text-3xl mt-4 text-black">20%</span>
                </div>
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Behavioral Alignment</span>
                  <span className="font-black text-3xl mt-4 text-black">10%</span>
                </div>
                <div className="bg-white border-[3px] border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
                  <span className="font-black text-xs uppercase break-words">Documentation</span>
                  <span className="font-black text-3xl mt-4 text-[#0055FF]">10%</span>
                </div>
              </div>
            </div>

          </div>
        );

      case "features":
        return (
          <div className="p-6 bg-white h-full relative overflow-x-hidden text-sm">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-6">
              Why MCPForge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F4F4F0] border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 relative group hover:-translate-y-1 transition-all">
                <div className="absolute -top-3 -right-3 bg-[#39FF14] text-black border-2 border-black px-1.5 py-0.5 text-[10px] font-black uppercase transform rotate-6">
                  Secure
                </div>
                <h3 className="text-lg font-black text-black mb-1 uppercase">🔐 Isolated Logics</h3>
                <p className="text-xs font-bold text-neutral-800">Instantly spin up zero-trust, encrypted server environments. Expose single-purpose capabilities to agents securely.</p>
              </div>

              <div className="bg-black text-white border-[3px] border-black shadow-[4px_4px_0px_rgba(255,107,0,1)] p-4 relative group hover:-translate-y-1 transition-all">
                <div className="absolute -top-3 -left-3 bg-[#FF6B00] text-black border-2 border-black px-1.5 py-0.5 text-[10px] font-black uppercase transform -rotate-3">
                  Fast
                </div>
                <h3 className="text-lg font-black mb-1 uppercase text-[#39FF14]">⚡️ Supabase Backed</h3>
                <p className="text-xs font-bold text-neutral-300">Deployed to the edge. Ultra-low latency bridging built right into real-time Postgres. No custom DB layer required.</p>
              </div>

              <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 relative group hover:-translate-y-1 transition-all">
                <div className="absolute -top-3 -right-3 bg-[#0055FF] text-white border-2 border-black px-1.5 py-0.5 text-[10px] font-black uppercase transform rotate-3">
                  Legacy
                </div>
                <h3 className="text-lg font-black text-black mb-1 uppercase">📠 API Adapters</h3>
                <p className="text-xs font-bold text-neutral-800">Plug in an old SOAP service, SAP endpoint, or internal tool. We map it to Model Context Protocol instantly.</p>
              </div>

              <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 relative group hover:-translate-y-1 transition-all">
                <h3 className="text-lg font-black text-black mb-1 uppercase">🛠 Type Safe</h3>
                <p className="text-xs font-bold text-neutral-800">End-to-end typing guaranteed. Schema mismatches break the build, not the chat.</p>
              </div>
            </div>
          </div>
        );

      case "docs":
        return (
          <div className="p-6 bg-[#F4F4F0] min-h-full font-mono text-sm border-l-[16px] border-black">
            <h2 className="text-2xl font-black text-black uppercase mb-4 border-b-2 border-black pb-2">
              Documentation
            </h2>
            <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 mb-6 transform -rotate-1">
              <h3 className="text-xs font-bold bg-[#FF6B00] text-black inline-block px-1 mb-2">1. Initialization</h3>
              <pre className="bg-black text-[#39FF14] p-3 text-[11px] overflow-x-auto border-2 border-black">
                {`npx mcpforge init my-ai-endpoint
cd my-ai-endpoint
npm install`}
              </pre>
            </div>
            <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 transform rotate-1">
              <h3 className="text-xs font-bold bg-[#0055FF] text-white inline-block px-1 mb-2">2. Map Endpoints</h3>
              <pre className="bg-black text-[#e5e5e5] p-3 text-[11px] overflow-x-auto border-2 border-black font-bold">
                <span className="text-[#39FF14]">import</span> {`{ Server }`} <span className="text-[#39FF14]">from</span> <span className="text-[#0055FF]">'@mcp/sdk'</span>;<br /><br />
                {`const srv = new Server("my-db-bridge", "1.0.0");`}<br />
                {`srv.tool("queryDB", "SQL", { query: "str" }, async (args) => {`}<br />
                {`  // Bridge logic`}<br />
                {`});`}<br />
              </pre>
            </div>
          </div>
        );

      case "servers":
        return (
          <div className="flex items-center justify-center p-4 bg-[#111111] min-h-full relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#0055FF 1px, transparent 1px), linear-gradient(90deg, #0055FF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="z-10 w-full bg-black border-[3px] border-[#39FF14] shadow-[8px_8px_0px_#0055FF] p-4 relative max-h-full overflow-y-auto">
              <div className="text-[#39FF14] font-mono text-[10px] mb-2 border-b-2 border-neutral-800 pb-1 flex justify-between">
                <span>SYSTEM STATUS</span>
                <span className="animate-pulse">ONLINE</span>
              </div>
              <pre className="text-white font-mono text-xs font-bold leading-relaxed whitespace-pre-wrap">
                {`> Booting MCP runtime...
> Establishing secure WebSocket tunnel...
> Mapping 14 enterprise capabilities...
> Syncing via Supabase Realtime...

[OK] Server wss://api.mcpforge.com/agent-v2
[OK] Latency: 24ms
[OK] Context encryption: ACTIVE

Waiting for Agent Connections..._`}
              </pre>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#EAE8E3] text-[#111111] font-sans selection:bg-[#FF6B00] selection:text-white relative touch-none">
      {/* Heavy Noise Overlay for textured PostHog desktop feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-color-burn"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-8 left-4 md:left-8 flex flex-col gap-5 z-10 p-2">
        {Object.entries(APPS).map(([id, app]) => (
          <button
            key={id}
            onClick={() => openWindow(id as AppID)}
            className="flex flex-col items-center gap-1.5 w-16 md:w-20 group focus:outline-none"
          >
            <div className="w-14 h-14 bg-white border-[3px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_#000] group-hover:bg-[#39FF14] group-active:translate-y-[1px] group-active:shadow-none transition-all">
              {app.icon}
            </div>
            <span className="bg-white text-black px-1.5 py-0.5 text-[10px] md:text-xs font-bold border-2 border-black group-hover:bg-[#0055FF] group-hover:text-white text-center w-full truncate cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Draggable Windows */}
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((w) => (
          <div
            key={w.id}
            className="absolute flex flex-col w-[850px] h-[550px] max-w-[95vw] max-h-[85vh] bg-white border-[3px] md:border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] flex-shrink-0"
            style={{ left: w.x, top: w.y, zIndex: w.zIndex }}
            onPointerDown={() => focusWindow(w.id)}
          >
            {/* Window Header */}
            <div
              className={`bg-[#F4F4F0] border-b-[3px] md:border-b-4 border-black p-2 md:p-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none ${windows.length > 0 && Math.max(...windows.map(win => win.zIndex)) === w.zIndex ? "bg-white" : "opacity-80 grayscale-[20%]"
                }`}
              onPointerDown={(e) => handlePointerDown(e, w.id, w.x, w.y)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Window Controls */}
              <div className="flex gap-1.5 md:gap-2">
                <button
                  onClick={() => closeWindow(w.id)}
                  className="w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-black flex items-center justify-center hover:bg-[#FF6B00] active:scale-90 transition-all shadow-[1px_1px_0px_#000] active:shadow-none"
                  aria-label="Close"
                >
                  <span className="text-[10px] md:text-xs font-black text-black">X</span>
                </button>
                <button
                  onClick={() => minimizeWindow(w.id)}
                  className="w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-black flex items-center justify-center hover:bg-[#0055FF] active:scale-90 transition-all shadow-[1px_1px_0px_#000] active:shadow-none"
                  aria-label="Minimize"
                >
                  <span className="text-[10px] md:text-xs font-black text-black">_</span>
                </button>
              </div>

              {/* Window Title */}
              <div className="font-bold font-mono text-xs md:text-sm pointer-events-none uppercase tracking-widest text-black flex-1 text-center truncate px-4">
                {w.title}
              </div>

              {/* Spacer for balance */}
              <div className="w-[36px] md:w-[48px]" />
            </div>

            {/* Window Content Container */}
            <div className="flex-1 overflow-auto bg-white relative no-scrollbar">
              {renderWindowContent(w.id)}
            </div>
          </div>
        ))}

      {/* OS Dock / Taskbar */}
      <div className="absolute bottom-0 w-full h-12 md:h-14 bg-white border-t-[3px] md:border-t-4 border-black z-50 flex items-center px-2 md:px-4 gap-2 md:gap-4 shadow-[0px_-4px_0px_#000]">
        <button
          className="bg-[#39FF14] text-black font-black uppercase text-xs md:text-sm px-4 md:px-6 py-1 md:py-1.5 border-[3px] border-black hover:-translate-y-[2px] shadow-[3px_3px_0px_#000] active:translate-y-0 active:shadow-none transition-all mr-2"
        >
          START
        </button>

        <div className="w-1 h-6 md:h-8 bg-black opacity-20" />

        <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {windows.filter((w) => w.isOpen).map((w) => {
            const isActive = !w.isMinimized && Math.max(...windows.map(win => win.zIndex)) === w.zIndex;

            return (
              <button
                key={w.id}
                onClick={() => (w.isMinimized || !isActive ? restoreWindow(w.id) : minimizeWindow(w.id))}
                className={`px-3 py-1 border-[3px] border-black font-bold text-xs md:text-sm truncate max-w-[100px] md:max-w-[150px] transition-all flex-shrink-0
                  ${w.isMinimized
                    ? "bg-white text-neutral-500 hover:bg-neutral-100 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px]"
                    : isActive
                      ? "bg-black text-white shadow-inner translate-y-[2px] border-b-0 pb-1.5"
                      : "bg-[#F4F4F0] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px]"
                  }
                `}
              >
                {w.title}
              </button>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 border-l-[3px] border-black pl-4 h-full">
          <div className="bg-black text-[#FF6B00] font-mono text-[10px] font-bold px-2 py-0.5 border-2 border-black uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] inline-block animate-pulse"></span>
            v2.0 Beta
          </div>
        </div>
      </div>
    </div>
  );
}
