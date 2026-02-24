"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Target, Palette, Camera, Globe, Mail, Users, Layers, Zap, BrainCircuit, ArrowRight } from 'lucide-react';

/* ─── Data ─── */
const servicesData = [
    {
        id: "akvizicia",
        icon: <Target size={28} />,
        title: "Akvizícia a výkonnostný marketing",
        desc: "Kupujete si rýchlosť. Precízne cielené kampane (Google/Meta) nastavíme tak, aby prinášali zisk a merateľnú návratnosť – nie prázdne impresie.",
        detail: "Zameriavame sa na reálnu návratnosť investícií a kvalitu dopytov.",
        // 3D Position relative to center (0,0) - Adjusted for Left Column
        pos: { x: -140, y: -100, z: 20 }
    },
    {
        id: "web",
        icon: <Globe size={28} />,
        title: "Web a SEO",
        desc: "Budujete si dôveru. Web je „prvá vyšetrovacia miestnosť“ pacienta – miesto, kde si s vami vytvorí vzťah ešte pred prvým kontaktom.",
        detail: "Zjednodušujeme komunikáciu a automatizujeme proces objednávania.",
        pos: { x: 140, y: -80, z: -10 }
    },
    {
        id: "social",
        icon: <Users size={28} />,
        title: "Sociálne siete",
        desc: "Vytvárate komunitu a autoritu. Ukážeme ľudskú tvár praxe, prostredie a štýl komunikácie tak, aby pacient získal dôveru k vašej odbornosti.",
        detail: "Identita, ktorá vás odlíši od konkurencie a vzbudí okamžitú dôveru.",
        pos: { x: 160, y: 100, z: 30 }
    },
    {
        id: "email",
        icon: <Mail size={28} />,
        title: "Email marketing a práca s dátami",
        desc: "Email je privátna zóna. Kým sociálne siete sú námestie, email je ako zatvorené dvere v ambulancii. Z vašej kartotéky spravíme aktívnu databázu.",
        detail: "Zvyšuje návratnosť pacientov, podporuje prevenciu a šetrí čas personálu.",
        pos: { x: -160, y: 80, z: -30 }
    },
    {
        id: "crm",
        icon: <Layers size={28} />,
        title: "CRM a automatizácie",
        desc: "Prepojíme databázu so systémom, v ktorom vieme riadiť komunikáciu, segmentáciu a následné kroky pacienta.",
        detail: "Vrátane automatizovaného objednávania a šikovných pripomienok.",
        pos: { x: 0, y: 180, z: 10 }
    },
    {
        id: "ai",
        icon: <Camera size={28} />,
        title: "Umelá inteligencia",
        desc: "Naprogramujeme GPT asistenta pre vašu prax: odpovede na časté otázky, navigácia pacienta, interná podpora tímu.",
        detail: "Menej opakovania, viac času na medicínu a starostlivosť o pacientov.",
        pos: { x: 0, y: -180, z: 0 }
    },
];

export default function ServicesNebula() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth rotation using springs
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovering(false);
    };

    return (
        <div
            className="w-full py-16 lg:py-24"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Title - Centered & Spaced */}
            <div className="relative z-10 text-center mb-24 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-teal text-sm font-bold uppercase tracking-widest block mb-3 font-kanit">Portfólio služieb</span>
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Komplexné riešenia <br />
                        <span className="text-white/30">pre rast vašej praxe</span>
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >

                    {/* LEFT COLUMN: 3D Nebula Cloud */}
                    <motion.div
                        className="relative h-[500px] flex items-center justify-center pt-10 perspective-1000"
                        style={{
                            perspective: 1000,
                            rotateX,
                            rotateY
                        }}
                    >
                        {/* Background Gradients */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[80px]" />
                        </div>

                        {/* Central Core (Logo) */}
                        <div
                            className="absolute z-10 w-32 h-32 rounded-full glass-strong glow-teal/50 flex items-center justify-center p-6 transition-transform duration-500"
                            style={{ transform: 'translateZ(0px)' }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/logo 2.png"
                                    alt="Mediconect Core"
                                    fill
                                    className="object-contain opacity-90 drop-shadow-[0_0_20px_rgba(78,205,196,0.6)]"
                                />
                            </div>
                        </div>

                        {/* Floating Nodes */}
                        {servicesData.map((service, index) => {
                            const isActive = activeIndex === index;

                            // Depth logic
                            const scale = 1 + (service.pos.z / 500);
                            const zIndex = isActive ? 100 : Math.floor(service.pos.z + 50);

                            return (
                                <motion.div
                                    key={service.id}
                                    className="absolute flex flex-col items-center justify-center group cursor-pointer"
                                    style={{
                                        x: service.pos.x,
                                        y: service.pos.y,
                                        zIndex: zIndex,
                                    }}
                                    animate={{
                                        y: [service.pos.y - 10, service.pos.y + 10, service.pos.y - 10],
                                        // Subtle random delay for organic feel
                                        transition: {
                                            duration: 6 + (index % 3),
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.5
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        setActiveIndex(index);
                                        setIsHovering(true);
                                    }}
                                >
                                    {/* Icon Bubble */}
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1.3 : 1,
                                            borderColor: isActive ? "rgba(78, 205, 196, 0.6)" : "rgba(255, 255, 255, 0.1)",
                                            backgroundColor: isActive ? "rgba(78, 205, 196, 0.1)" : "rgba(255, 255, 255, 0.03)",
                                        }}
                                        className={`
                                            w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10
                                            transition-colors duration-300 shadow-lg
                                        `}
                                    >
                                        <div className={`transition-all duration-300 ${isActive ? "text-teal drop-shadow-[0_0_10px_rgba(78,205,196,0.8)]" : "text-white/70"}`}>
                                            {service.icon}
                                        </div>
                                    </motion.div>

                                    {/* Label - visible always but highlighted on active */}
                                    <motion.div
                                        className={`mt-3 px-3 py-1 rounded-full border transition-all duration-300 whitespace-nowrap ${isActive
                                            ? "bg-teal text-navy-dark border-teal font-bold shadow-[0_0_15px_rgba(78,205,196,0.4)]"
                                            : "bg-black/30 text-white/60 border-white/5"
                                            }`}
                                    >
                                        <span className="text-xs font-kanit">{service.title}</span>
                                    </motion.div>
                                </motion.div>
                            );
                        })}

                        {/* Connecting Lines (Very subtle, organic) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(78, 205, 196, 0)" />
                                    <stop offset="50%" stopColor="rgba(78, 205, 196, 0.05)" />
                                    <stop offset="100%" stopColor="rgba(78, 205, 196, 0)" />
                                </linearGradient>
                            </defs>
                            {servicesData.map((service, i) => (
                                <motion.line
                                    key={i}
                                    x1="50%" y1="50%"
                                    x2={`calc(50% + ${service.pos.x}px)`}
                                    y2={`calc(50% + ${service.pos.y}px)`}
                                    stroke="url(#lineGrad)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            ))}
                        </svg>
                    </motion.div>

                    {/* RIGHT COLUMN: Detail Card */}
                    <div className="flex items-center justify-center h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-full max-w-lg h-[500px] glass-strong p-10 rounded-3xl border border-teal/20 shadow-[0_0_40px_rgba(78,205,196,0.1)] flex flex-col justify-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="inline-flex p-4 rounded-2xl bg-teal/10 text-teal mb-8 shadow-inner shadow-teal/20">
                                        {servicesData[activeIndex].icon}
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                                        {servicesData[activeIndex].title}
                                    </h3>
                                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                                        {servicesData[activeIndex].desc}
                                    </p>
                                    <div className="text-base text-teal font-medium flex items-center gap-3 pt-6 border-t border-white/5">
                                        <ArrowRight size={20} />
                                        {servicesData[activeIndex].detail}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
