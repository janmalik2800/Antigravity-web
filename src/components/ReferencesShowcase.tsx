"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";
import GlowCard from "./GlowCard";

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

interface ReferenceProject {
    name: string;
    description: string;
    url: string;
    displayUrl: string;
    image: string;
    tags: string[];
}

const projects: ReferenceProject[] = [
    {
        name: "Aurel Clinic",
        description: "Moderná klinika zdravia a krásy. Vytvorili sme elegantný web s dôrazom na estetickú medicínu, dermatológiu a stomatológiu. Web slúži ako reprezentatívna vizitka s prehľadným cenníkom a informáciami o zákrokoch.",
        url: "https://www.aurelclinic.sk",
        displayUrl: "www.aurelclinic.sk",
        image: "/images/aurel_clinic.png",
        tags: ["Prémiový Web", "SEO Optimalizácia", "Medicínsky Branding"],
    },
    {
        name: "MUDr. Jozef Čajka",
        description: "Ambulancia všeobecného lekára pre dospelých v Liptovskom Hrádku. Prehľadný a prístupný web pre pacientov všetkých vekových kategórií, ktorý uľahčuje komunikáciu, poskytuje ordinačné hodiny a dôležité tlačivá.",
        url: "https://www.drcajka.sk",
        displayUrl: "www.drcajka.sk",
        image: "/images/dr_cajka.png",
        tags: ["Lokálne SEO", "Dostupný Web", "Pacientsky Servis"],
    },
];

export default function ReferencesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const cardElements = container.querySelectorAll("[data-project-card]");
            if (cardElements.length === 0) return;

            let closestIndex = 0;
            let minDistance = Infinity;
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            cardElements.forEach((el, idx) => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.left + rect.width / 2;
                const distance = Math.abs(elCenter - containerCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = idx;
                }
            });

            setActiveIndex(closestIndex);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full">
            {/* Section Header */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-16"
            >
                <span className="text-teal text-sm font-semibold uppercase tracking-widest font-kanit">
                    Naše Referencie
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold mt-4 font-kanit">
                    Weby, ktoré <span className="text-gradient">pomáhajú rásť</span>
                </h2>
                <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto font-stolzl">
                    Pozrite si vybrané webové projekty, ktoré sme navrhli a spustili pre lekárov a kliniky. Spájajú estetický dizajn, technickú rýchlosť a etickú komunikáciu.
                </p>
            </motion.div>

            {/* Projects Grid / Slider */}
            <div
                ref={scrollContainerRef}
                className="flex md:grid flex-nowrap md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none gap-6 md:gap-8 lg:gap-12 px-6 md:px-0 pb-8 md:pb-0 -mx-6 md:mx-auto max-w-[calc(100%+3rem)] md:max-w-6xl"
            >
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        data-project-card
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        custom={idx + 1}
                        className="group shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-center md:snap-align-none"
                    >
                        <GlowCard className="h-full">
                            <div className="glass rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 border border-white/5 group-hover:border-white/10">
                                {/* Screenshot mockup wrapper */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/50 border-b border-white/5">
                                    {/* Subtle gradient overlay to make screenshot pop */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent z-10 pointer-events-none" />
                                    
                                    <Image
                                        src={project.image}
                                        alt={`Webstránka pre ${project.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:translate-y-[-1%]"
                                        priority={idx === 0}
                                    />
                                </div>

                                {/* Content wrapper */}
                                <div className="p-6 lg:p-8 flex flex-col flex-grow">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, tagIdx) => (
                                            <span
                                                key={tagIdx}
                                                className="px-3 py-1 text-xs font-medium font-kanit rounded-full bg-teal/10 text-teal/80 border border-teal/20/30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Title */}
                                    <h3 className="text-2xl font-bold font-kanit text-white mb-3">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-teal transition-colors duration-300"
                                        >
                                            {project.name}
                                        </a>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/60 text-sm leading-relaxed font-stolzl mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Link / CTA */}
                                    <div className="border-t border-white/5 pt-5 mt-auto">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2.5 px-6 py-3 bg-teal/10 border border-teal/30 text-teal font-semibold text-sm font-kanit rounded-xl hover:bg-teal/20 hover:border-teal/50 hover:shadow-lg hover:shadow-teal/15 transition-all duration-300"
                                        >
                                            <Globe size={16} />
                                            <span>Navštíviť web</span>
                                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </motion.div>
                ))}
            </div>

            {/* Carousel Dot Indicators (mobile only) */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            const container = scrollContainerRef.current;
                            if (container) {
                                const cardElements = container.querySelectorAll("[data-project-card]");
                                const targetEl = cardElements[idx];
                                if (targetEl) {
                                    targetEl.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                        inline: "center"
                                    });
                                }
                            }
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            activeIndex === idx 
                                ? "bg-teal w-6" 
                                : "bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Prejsť na projekt ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
