"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Send, Mail, PieChart, ArrowRight } from "lucide-react";

export default function CaseStudyDashboard() {
    return (
        <div className="glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                {/* Left: Text Context */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                        <span className="text-teal text-xs font-bold uppercase tracking-wider">Prípadová štúdia</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        Strategická reaktivácia <span className="text-gradient">pacientskej databázy</span>
                    </h2>

                    <div className="space-y-6 text-white/60 leading-relaxed text-lg mb-8">
                        <p>
                            Náš klient, všeobecný lekár, mal pretrvávajúci problém s počtom pacientov na preventívne prehliadky. Aj napriek notifikáciám, ktoré generoval jeho informačný systém, pacienti sa na prehliadky nehlásili v potrebnom počte, alebo sa prihlásili a neprišli.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <TrendingUp size={14} className="text-teal" />
                                </span>
                                <div>
                                    <strong className="text-white block">Riešenie</strong>
                                    <span className="text-sm">Pripravili sme kampaň v podobe informačného mailu, ktorý popisoval kritickú situáciu v populácii a zdravotné následky — bez priameho pozývania na návštevu.</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Users size={14} className="text-teal" />
                                </span>
                                <div>
                                    <strong className="text-white block">Výsledok</strong>
                                    <span className="text-sm">Nárast počtu rezervácií na preventívne prehliadky o 42,31 %.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* CTA button */}
                    <a
                        href="/blog/strategicka-reaktivacia-pacientskej-databazy"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal/10 border border-teal/20 text-teal font-semibold text-sm hover:bg-teal/20 hover:border-teal/40 transition-all duration-300 group"
                    >
                        Prečítať celú prípadovú štúdiu
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Right: Dashboard Visual */}
                <div className="relative perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 10, y: 20 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-white font-medium">Prehľad kampane</h3>
                                <p className="text-white/30 text-xs">Posledných 30 dní</p>
                            </div>
                            <a
                                href="/blog/strategicka-reaktivacia-pacientskej-databazy"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <ArrowUpRight size={18} className="text-teal" />
                            </a>
                        </div>

                        {/* Big Metric */}
                        <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-bold text-white font-kanit">42,31 %</span>
                            </div>
                            <p className="text-white/40 text-sm mt-1 font-kanit">Nárast rezervácií na prehliadku</p>
                        </div>

                        {/* Chart */}
                        <div className="h-28 w-full mb-6 relative">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d="M0 40 L0 38 C15 36, 25 30, 35 24 C50 16, 60 10, 75 5 C85 2, 92 1, 100 0 L100 40 Z"
                                    fill="url(#gradient)"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M0 38 C15 36, 25 30, 35 24 C50 16, 60 10, 75 5 C85 2, 92 1, 100 0"
                                    fill="none"
                                    stroke="#4ECDC4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </svg>
                        </div>

                        {/* Stats Grid — bigger emphasis */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Send, label: "Odoslané emaily", value: "1 618", color: "text-white" },
                                { icon: Mail, label: "Doručené emaily", value: "98,52 %", color: "text-white" },
                                { icon: PieChart, label: "Otvorené emaily", value: "70,89 %", color: "text-white" },
                            ].map(({ icon: Icon, label, value, color }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                                    className="p-3 lg:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-teal/20 transition-all duration-300 flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-1.5 text-white/40 text-[10px] lg:text-xs font-kanit">
                                        <Icon size={12} />
                                        {label}
                                    </div>
                                    <div className={`text-xl lg:text-2xl font-bold font-kanit ${color}`}>
                                        {value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Background blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal/5 rounded-full blur-[80px] -z-10" />
                </div>
            </div>
        </div>
    );
}
