"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Target, Palette, Camera, Globe, Mail, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

/* ─── Data ─── */
// Reusing the same data structure as in page.tsx for consistency
const servicesData = [
    {
        id: "akvizicia",
        icon: <Target size={28} />,
        title: "Akvizícia a marketing",
        desc: "Zabezpečujeme kontinuálny prísun nových pacientov prostredníctvom precízne cielených kampaní.",
        detail: "Kompletná správa kampaní na Google a Meta. Zameriavame sa na výkon a reálnu návratnosť investícií (ROI).",
    },
    {
        id: "branding",
        icon: <Palette size={28} />,
        title: "Vizuálna identita",
        desc: "Vytvárame unikátny vizuálny jazyk, ktorý vás odlíši od konkurencie.",
        detail: "Logo, farebná paleta, typografia a kompletný brand manuál pre vašu kliniku či ambulanciu.",
    },
    {
        id: "produkcia",
        icon: <Camera size={28} />,
        title: "Foto a video produkcia",
        desc: "Profesionálny vizuálny obsah priamo z vašich priestorov.",
        detail: "Tvorba reprezentatívnych fotografií a videí, ktoré budují dôveru ešte pred prvou návštevou.",
    },
    {
        id: "web",
        icon: <Globe size={28} />,
        title: "Webové riešenia",
        desc: "Moderné a funkčné weby optimalizované pre konverzie.",
        detail: "Rýchle, bezpečné a responzívne webstránky s integráciou rezervačných systémov.",
    },
    {
        id: "email",
        icon: <Mail size={28} />,
        title: "Email marketing",
        desc: "Udržiavanie vzťahu s existujúcimi pacientmi.",
        detail: "Automatizované newslettre a kampane na zvyšovanie lojality a frekvencie návštev.",
    },
    {
        id: "konzultacie",
        icon: <Users size={28} />,
        title: "Konzultácie a procesy",
        desc: "Optimalizácia interných procesov a školenia tímu.",
        detail: "Pomáhame nastaviť procesy tak, aby marketing fungoval ruku v ruke s chodom recepcie.",
    },
];

export default function ServicesOrbit() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Orbit configuration
    const radius = 240; // Slightly smaller to fit side-by-side
    const totalItems = servicesData.length;

    // Auto-rotation state
    const [rotation, setRotation] = useState(0);
    const rotationSpeed = 0.05;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        let animationFrame: number;
        const animate = () => {
            if (!isHovering) {
                setRotation(prev => (prev + rotationSpeed) % 360);
            }
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isHovering, isMounted]);

    const calculatePosition = (index: number) => {
        const angleDeg = (index * (360 / totalItems)) + rotation;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;
        return { x, y, angleDeg };
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMounted) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / 50;
        const y = (e.clientY - centerY) / 50;
        setMousePos({ x, y });
    };

    return (
        <div className="w-full py-16 lg:py-24">

            {/* Title - Centered & Spaced */}
            <div className="relative z-10 text-center mb-24 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-teal text-sm font-bold uppercase tracking-widest block mb-3">Ekosystém služieb</span>
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Komplexná starostlivosť <br />
                        <span className="text-white/30">okolo vašej značky</span>
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT COLUMN: Orbit */}
                    <div
                        className="relative h-[600px] flex items-center justify-center perspective-1000"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* Background Gradients */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[100px]" />
                        </div>

                        <motion.div
                            className="relative w-[500px] h-[500px] flex items-center justify-center preserve-3d"
                            style={{
                                rotateX: isMounted ? -mousePos.y * 0.5 : 0,
                                rotateY: isMounted ? mousePos.x * 0.5 : 0,
                                transition: "transform 0.1s ease-out"
                            }}
                        >
                            {/* Orbital Tracks */}
                            <div className="absolute inset-0 rounded-full border border-white/5" />
                            <div className="absolute inset-20 rounded-full border border-white/5 border-dashed opacity-50" />

                            {/* Central Core (Logo) */}
                            <div className="absolute z-20 w-32 h-32 rounded-full glass-strong glow-teal flex items-center justify-center p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/logo 2.png"
                                        alt="Central Node"
                                        fill
                                        className="object-contain opacity-90 drop-shadow-[0_0_15px_rgba(78,205,196,0.5)]"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full border border-teal/30 animate-ping-slow pointer-events-none" />
                            </div>

                            {/* Connecting Lines & Orbiting Items */}
                            {isMounted && servicesData.map((service, index) => {
                                const pos = calculatePosition(index);
                                const isActive = activeIndex === index;

                                return (
                                    <div key={service.id}>
                                        {/* Connecting Line (Pulse) */}
                                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10">
                                            <line
                                                x1="250" // Center of 500x500 box
                                                y1="250"
                                                x2={250 + pos.x}
                                                y2={250 + pos.y}
                                                stroke={isActive ? "rgba(78, 205, 196, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                                                strokeWidth={isActive ? 1.5 : 1}
                                            />
                                            {isActive && (
                                                <circle r="2" fill="#4ECDC4">
                                                    <animateMotion
                                                        dur="1.5s"
                                                        repeatCount="indefinite"
                                                        path={`M250,250 L${250 + pos.x},${250 + pos.y}`}
                                                    />
                                                </circle>
                                            )}
                                        </svg>

                                        {/* Planet */}
                                        <motion.button
                                            onMouseEnter={() => setActiveIndex(index)}
                                            className={`absolute w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 z-30 group ${isActive
                                                ? "glass-strong glow-teal scale-125 border-teal/50 shadow-[0_0_20px_rgba(78,205,196,0.3)]"
                                                : "glass hover:bg-white/10 hover:border-white/20"
                                                }`}
                                            style={{
                                                x: pos.x,
                                                y: pos.y,
                                            }}
                                            whileHover={{ scale: 1.15 }}
                                        >
                                            <div className={`transition-colors duration-300 ${isActive ? "text-teal" : "text-white/60 group-hover:text-teal/80"}`}>
                                                {service.icon}
                                            </div>
                                        </motion.button>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Detail Card */}
                    <div className="flex items-center justify-center h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-lg h-[500px] glass-strong p-10 rounded-3xl border border-teal/10 flex flex-col justify-center relative overflow-hidden"
                            >
                                {/* Decorative background glow for card */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="inline-flex p-4 rounded-2xl bg-teal/10 text-teal mb-8 shadow-inner shadow-teal/20">
                                        {servicesData[activeIndex].icon}
                                    </div>

                                    <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                                        {servicesData[activeIndex].title}
                                    </h3>

                                    <p className="text-lg text-white/70 leading-relaxed mb-10">
                                        {servicesData[activeIndex].desc}
                                    </p>

                                    <div className="text-base text-teal font-medium flex items-center gap-3 pt-8 border-t border-white/5">
                                        <ArrowRight size={20} />
                                        {servicesData[activeIndex].detail}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}
