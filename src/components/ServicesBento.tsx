"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Target, Palette, Camera, Globe, Mail, Users, ArrowRight, ArrowUpRight, Layers, Zap, BrainCircuit } from "lucide-react";

/* ─── Data ─── */
const servicesData = [
    {
        id: "akvizicia",
        icon: <Target size={28} />,
        title: "Akvizícia a výkonnostný marketing",
        desc: "Kupujete si rýchlosť. Precízne cielené kampane (Google/Meta)...",
        detail: "Nastavíme kampane tak, aby prinášali zisk a merateľnú návratnosť – nie prázdne impresie.",
        colSpan: "md:col-span-2",
        bgGradient: "from-teal/20 to-transparent"
    },
    {
        id: "web",
        icon: <Globe size={28} />,
        title: "Web a SEO",
        desc: "Budujete si dôveru. Web je vaša „prvá vyšetrovacia miestnosť“...",
        detail: "Miesto, kde si s vami pacient vytvorí vzťah ešte pred prvým kontaktom.",
        colSpan: "md:col-span-1",
        bgGradient: "from-blue-500/10 to-transparent"
    },
    {
        id: "social",
        icon: <Users size={28} />,
        title: "Sociálne siete",
        desc: "Vytvárate komunitu a autoritu. Ukážeme ľudskú tvár praxe...",
        detail: "Prostredie a štýl komunikácie tak, aby pacient získal dôveru k vašej odbornosti.",
        colSpan: "md:col-span-1",
        bgGradient: "from-purple-500/10 to-transparent"
    },
    {
        id: "email",
        icon: <Mail size={28} />,
        title: "Email marketing",
        desc: "Email je privátna zóna. Z vašej kartotéky spravíme aktívnu databázu...",
        detail: "Zvyšuje návratnosť pacientov, podporuje prevenciu a šetrí čas personálu.",
        colSpan: "md:col-span-1",
        bgGradient: "from-pink-500/10 to-transparent"
    },
    {
        id: "crm",
        icon: <Layers size={28} />,
        title: "CRM a automatizácie",
        desc: "Prepojíme databázu so systémom riadenia komunikácie...",
        detail: "Segmentácia, objednávanie a pripomienky následných krokov pre pacienta.",
        colSpan: "md:col-span-1",
        bgGradient: "from-orange-500/10 to-transparent"
    },
    {
        id: "ai",
        icon: <Camera size={28} />,
        title: "Umelá inteligencia",
        desc: "Naprogramujeme GPT asistenta pre vašu prax a tím...",
        detail: "Odpovede na časté otázky a navigácia pacienta. Menej opakovania, viac medicíny.",
        colSpan: "md:col-span-2",
        bgGradient: "from-teal/10 to-transparent"
    },
];

export default function ServicesBento() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="w-full py-20 relative px-6 md:px-0">
            {/* Title - Centered */}
            <div className="relative z-10 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-teal text-sm font-bold uppercase tracking-widest block mb-3 font-kanit">Ekosystém služieb</span>
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Komplexná starostlivosť <br />
                        <span className="text-white/30">okolo vašej značky</span>
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto h-[600px] flex flex-col md:grid md:grid-cols-4 md:grid-rows-2 gap-4">
                {servicesData.map((service, index) => {
                    const isHovered = hoveredId === service.id;
                    const isAnyHovered = hoveredId !== null;

                    return (
                        <motion.div
                            key={service.id}
                            layout
                            onMouseEnter={() => setHoveredId(service.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`
                                relative rounded-3xl overflow-hidden glass border border-white/5 transition-colors duration-500 cursor-pointer group
                                ${// Grid positioning logic
                                // If hovered, this card spans more. If another is hovered, this card might shrink or stay same? 
                                // Actually with CSS Grid it is hard to animate "col-span" smoothly without FLIP.
                                // Let's try a different approach: Flexbox for rows? Or just LayoutGroup magic.
                                // For a true "Apple Bento" feel with expansion, usually we toggle classes.
                                // But simpler is to have a fixed grid where hover changes INTERNAL layout or Z-Index/Scale.

                                // ALTERNATIVE: Use standard grid but change style on hover
                                index === 0 ? "md:col-span-2 md:row-span-1" :
                                    index === 1 ? "md:col-span-1 md:row-span-1" :
                                        index === 2 ? "md:col-span-1 md:row-span-2" : // Tall card right
                                            "md:col-span-1 md:row-span-1"
                                }
                                ${isHovered ? "border-teal/50 shadow-[0_0_30px_rgba(78,205,196,0.15)] z-20" : "hover:border-white/10"}
                                ${isAnyHovered && !isHovered ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}
                            `}
                            // Let's use generic styles and override classes conditionally if we want true "expansion". 
                            // Creating a truly expanding grid where one item pushes others is complex. 
                            // Let's stick to the subtle "Focus" effect (others dim) + internal content expansion.
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Dynamic Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            <div className="absolute top-6 left-6 p-3 rounded-xl bg-white/5 text-teal group-hover:bg-teal group-hover:text-navy-dark transition-all duration-300">
                                {service.icon}
                            </div>

                            <motion.div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="text-white/40" />
                            </motion.div>

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent">
                                <motion.h3
                                    layout="position"
                                    className="text-xl md:text-2xl font-bold mb-2 group-hover:text-teal transition-colors"
                                >
                                    {service.title}
                                </motion.h3>

                                <motion.p
                                    layout="position"
                                    className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:text-white/90"
                                >
                                    {service.desc}
                                </motion.p>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: isHovered ? "auto" : 0,
                                        opacity: isHovered ? 1 : 0
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="pt-4 text-xs md:text-sm text-teal/80 border-t border-white/10 mt-4">
                                        {service.detail}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
