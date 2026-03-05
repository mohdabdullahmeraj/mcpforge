"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-black/40 dark:text-neutral-300"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.4 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.8 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.5, 0.9, 0.5],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
                {/* Custom content overlay replacing just the h1 part from the original component */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className="inline-flex items-center border border-black/10 rounded-full p-1 bg-white/50 backdrop-blur-sm shadow-sm mb-8">
                        <span className="px-3 py-1 text-xs font-semibold bg-[#F5F5F4] rounded-full text-black/70 mr-1">New</span>
                        <span className="px-3 py-1 text-xs font-medium pr-4">v2.0 Beta Pipeline Available</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        {words.map((word, wordIndex) => {
                            if (wordIndex >= 4) {
                                // "in under 60 seconds." part
                                return (
                                    <span key={wordIndex} className="inline-block mr-3 last:mr-0 font-serif italic font-light text-black/80">
                                        {word.split("").map((letter, letterIndex) => (
                                            <motion.span
                                                key={`${wordIndex}-${letterIndex}`}
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    delay: wordIndex * 0.1 + letterIndex * 0.03,
                                                    type: "spring", stiffness: 150, damping: 25,
                                                }}
                                                className="inline-block"
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </span>
                                )
                            }
                            // "From prompt to production" part
                            return (
                                <span key={wordIndex} className="inline-block mr-4 last:mr-0 text-black">
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: wordIndex * 0.1 + letterIndex * 0.03,
                                                type: "spring", stiffness: 150, damping: 25,
                                            }}
                                            className="inline-block"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            );
                        })}
                    </h1>

                    <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Generate servers, scan them with 8 security tools across 2 gates, monitor upstream changes, and sync configs to every major AI client.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Button
                                variant="ghost"
                                className="rounded-[1.15rem] px-8 py-6 text-base font-semibold backdrop-blur-md bg-white hover:bg-white/90 text-black transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 hover:shadow-md"
                            >
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                    Start Building
                                </span>
                                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                                    →
                                </span>
                            </Button>
                        </div>
                        <button className="h-[50px] px-8 bg-black border border-black/10 text-white font-medium rounded-2xl shadow-sm hover:shadow-md hover:border-black/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-full sm:w-auto overflow-hidden">
                            <span className="font-mono text-sm">npm i mcpforge</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                    </div>

                    {/* Hero Metrics */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-black/5 pt-12">
                        <div>
                            <div className="text-4xl font-serif italic text-black/90 mb-2">12K+</div>
                            <div className="text-xs font-mono font-medium text-black/50 uppercase tracking-widest">Servers Generated</div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif italic text-black/90 mb-2">4.2K+</div>
                            <div className="text-xs font-mono font-medium text-black/50 uppercase tracking-widest">Repos Monitored</div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif italic text-[#10B981] mb-2">87%</div>
                            <div className="text-xs font-mono font-medium text-[#10B981]/70 uppercase tracking-widest">Quality Improvement</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
