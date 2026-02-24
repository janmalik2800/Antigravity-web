"use client";

import { useState, useRef } from "react";
import { Target, Palette, Camera, Globe, Mail, Users, ChevronLeft, ChevronRight, Layers, Zap, BrainCircuit } from "lucide-react";

const servicesData = [
    {
        id: "akvizicia",
        icon: <Target size={32} />,
        title: "Akvizícia a výkonnostný marketing",
        desc: "Kupujete si rýchlosť. Precízne cielené kampane (Google/Meta) nastavíme tak, aby prinášali zisk a merateľnú návratnosť – nie prázdne impresie.",
        detail: "Zameriavame sa na reálnu návratnosť investícií a kvalitu dopytov.",
        number: "01",
    },
    {
        id: "web",
        icon: <Globe size={32} />,
        title: "Web a SEO",
        desc: "Budujete si dôveru. Web je „prvá vyšetrovacia miestnosť“ pacienta – miesto, kde si s vami vytvorí vzťah ešte pred prvým kontaktom.",
        detail: "Zjednodušujeme komunikáciu a automatizujeme proces objednávania.",
        number: "02",
    },
    {
        id: "social",
        icon: <Users size={32} />,
        title: "Sociálne siete",
        desc: "Vytvárate komunitu a autoritu. Ukážeme ľudskú tvár praxe, prostredie a štýl komunikácie tak, aby pacient získal dôveru k vašej odbornosti.",
        detail: "Identita, ktorá vás odlíši od konkurencie a vzbudí okamžitú dôveru.",
        number: "03",
    },
    {
        id: "email",
        icon: <Mail size={32} />,
        title: "Email marketing a práca s dátami",
        desc: "Email je privátna zóna. Kým sociálne siete sú námestie, email je ako zatvorené dvere v ambulancii. Z vašej kartotéky spravíme aktívnu databázu.",
        detail: "Zvyšuje návratnosť pacientov, podporuje prevenciu a šetrí čas personálu.",
        number: "04",
    },
    {
        id: "crm",
        icon: <Layers size={32} />,
        title: "CRM a automatizácie",
        desc: "Prepojíme databázu so systémom, v ktorom vieme riadiť komunikáciu, segmentáciu a následné kroky pacienta.",
        detail: "Vrátane automatizovaného objednávania a šikovných pripomienok.",
        number: "05",
    },
    {
        id: "ai",
        icon: <Camera size={32} />,
        title: "Umelá inteligencia",
        desc: "Naprogramujeme GPT asistenta pre vašu prax: odpovede na časté otázky, navigácia pacienta, interná podpora tímu.",
        detail: "Menej opakovania, viac času na medicínu a starostlivosť o pacientov.",
        number: "06",
    },
];

export default function ServicesCarousel() {
    return (
        <div className="py-20 relative overflow-hidden">
            <div className="px-6 mb-8 text-center text-left">
                <span className="text-teal text-xs font-bold uppercase tracking-widest block mb-2 font-kanit">Portfólio služieb</span>
                <h2 className="text-3xl font-bold leading-tight">Komplexné riešenia <br /> <span className="text-white/50">pre rast vašej praxe</span></h2>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory flex gap-4 px-6">
                {servicesData.map((service) => (
                    <div
                        key={service.id}
                        className="snap-center shrink-0 w-[85vw] max-w-[320px] first:pl-2 last:pr-6"
                    >
                        <div className="h-full glass-strong rounded-3xl p-8 flex flex-col relative overflow-hidden group min-h-[420px] border border-white/5">
                            {/* Background Number */}
                            <div className="absolute -right-4 -top-6 text-[120px] font-black text-white/[0.03] leading-none select-none pointer-events-none font-kanit">
                                {service.number}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center text-teal mb-6 group-hover:bg-teal group-hover:text-navy-dark transition-colors duration-300 shadow-inner shadow-teal/20">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-4 leading-snug">{service.title}</h3>

                                <p className="text-white/80 leading-relaxed text-sm mb-4">
                                    {service.desc}
                                </p>

                                <p className="text-white/50 leading-relaxed text-sm mt-auto border-t border-white/10 pt-4">
                                    {service.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4 opacity-50">
                <div className="text-white/40 text-xs flex items-center gap-2">
                    <ChevronLeft size={14} /> Potiahnite pre viac <ChevronRight size={14} />
                </div>
            </div>
        </div>
    );
}
