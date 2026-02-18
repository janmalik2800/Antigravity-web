"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Mail, PieChart, Send } from "lucide-react";

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

                    <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                        <p>
                            Náš klient, všeobecný lekár, čelil problému s nízkou návštevnosťou preventívnych prehliadok.
                            Bežné notifikácie z informačného systému pacienti ignorovali alebo prehliadali.
                        </p>
                        <ul className="space-y-4 my-6">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <TrendingUp size={14} className="text-teal" />
                                </span>
                                <div>
                                    <strong className="text-white block">Riešenie</strong>
                                    <span className="text-sm">Nasadili sme personalizovanú e-mailovú kampaň zameranú na edukáciu o zdravotných rizikách.</span>
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


                </div>

                {/* Right: Dashboard Visual */}
                <div className="relative perspective-1000">
                    {/* Main Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 10, y: 20 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10"
                    >
                        {/* Header of Dashboard */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-white font-medium">Prehľad kampane</h3>
                                <p className="text-white/30 text-xs">Posledných 30 dní</p>
                            </div>
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <ArrowUpRight size={18} className="text-teal" />
                            </button>
                        </div>

                        {/* Big Metric */}
                        <div className="mb-8">
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-white">42,31 %</span>
                            </div>
                            <p className="text-white/40 text-sm mt-1">Nárast rezervácií na prehliadku</p>
                        </div>

                        {/* Chart Simulation (Visual only, simplistic SVG path) */}
                        <div className="h-32 w-full mb-8 relative">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                {/* Gradient defs */}
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d="M0 40 L0 30 C10 30, 10 35, 20 25 C30 15, 30 20, 40 10 C50 0, 50 15, 60 5 C70 -5, 70 10, 80 5 C90 0, 90 20, 100 15 L100 40 Z"
                                    fill="url(#gradient)"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                                <motion.path
                                    d="M0 30 C10 30, 10 35, 20 25 C30 15, 30 20, 40 10 C50 0, 50 15, 60 5 C70 -5, 70 10, 80 5 C90 0, 90 20, 100 15"
                                    fill="none"
                                    stroke="#4ECDC4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </svg>
                            {/* Data points */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute top-1/4 left-1/3 w-3 h-3 bg-teal border-2 border-navy rounded-full shadow-[0_0_10px_rgba(78,205,196,0.5)]"
                            />
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="absolute top-[10%] left-2/3 w-3 h-3 bg-teal border-2 border-navy rounded-full shadow-[0_0_10px_rgba(78,205,196,0.5)]"
                            />
                        </div>

                        {/* Grid Metrics */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-white/50 text-xs">
                                    <Send size={14} /> Odoslané emaily
                                </div>
                                <div className="text-lg font-bold text-white">1 618</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-white/50 text-xs">
                                    <Mail size={14} /> Doručené emaily
                                </div>
                                <div className="text-lg font-bold text-white">98,52 %</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-white/50 text-xs">
                                    <PieChart size={14} /> Otvorené emaily
                                </div>
                                <div className="text-lg font-bold text-white">70,89 %</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal/5 rounded-full blur-[80px] -z-10" />
                </div>
            </div>
        </div>
    );
}
