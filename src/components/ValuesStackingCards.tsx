"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Fingerprint, ShieldCheck, HeartHandshake, BrainCircuit } from "lucide-react";
import GlowCard from "./GlowCard";

const valuesData = [
    {
        id: "inovacie",
        title: "1. Inov\u00e1cie",
        subtitle: "Trendy men\u00edme na v\u00fdsledky",
        desc: "Svet digit\u00e1lnej komunik\u00e1cie sa men\u00ed r\u00fdchlejšie ako medic\u00ednske protokoly. Neust\u00e1le sledujeme v\u00fdvoj v oblasti AI, algoritmov soci\u00e1lnych siet\u00ed a pacientsk\u00e9ho spr\u00e1vania. Na\u0161\u00edm cie\u013eom v\u0161ak nie je len by\u0165 modern\u00fd, ale implementova\u0165 novinky tak, aby v\u00e1m \u0161etrili \u010das a prin\u00e1\u0161ali relevantn\u00fdch pacientov.",
        icon: <Lightbulb size={24} />,
        color: "#88D5DB",
    },
    {
        id: "individualizacia",
        title: "2. Individu\u00e1liz\u00e1cia",
        subtitle: "Medic\u00edna aj marketing na mieru",
        desc: "Rovnako ako neexistuje univerzálny liek na každú diagnózu, neexistuje ani univerzálna marketingová šablóna. Každá ambulancia má iný kontext, inú lokalitu a iné ciele. Či budujete prémiovú kliniku estetickej medicíny alebo stabilnú pediatrickú prax, vašu stratégiu staviame na vašej unikátnej odbornosti a reálnych potrebách vašej spádovej oblasti.",
        icon: <Fingerprint size={24} />,
        color: "#4CADB6",
    },
    {
        id: "integrita",
        title: "3. Integrita",
        subtitle: "Etika je u n\u00e1s na prvom mieste",
        desc: "Zdravotnícky marketing má svoje špecifické mantinely a etický kódex. My ich nielen rešpektujeme, ale pokladáme za základný rámec. Komunikujeme pravdivo, dôstojne a v súlade s platnou legislatívou. Chránime vaše dobré meno, pretože vieme, že reputácia je v zdravotníctve to najcennejšie aktívum, ktoré budujete roky.",
        icon: <ShieldCheck size={24} />,
        color: "#88D5DB",
    },
    {
        id: "interaktivita",
        title: "4. Interaktivita",
        subtitle: "Budujeme vz\u0165ah, nielen reklamu",
        desc: "Marketing v zdravotníctve nie je o jednorazovom predaji. Je o budovaní komunity a dôvery medzi lekárom a pacientom. Pomáhame vám nastaviť komunikáciu tak, aby nebola len jednostranným oznamom, ale živým dialógom. Vytvárame prostredie, kde sa pacient cíti vypočutý ešte skôr než vstúpi do vašej ambulancie.",
        icon: <HeartHandshake size={24} />,
        color: "#4CADB6",
    },
    {
        id: "inteligencia",
        title: "5. Inteligencia",
        subtitle: "Rozhodnutia podlo\u017een\u00e9 d\u00f4kazmi",
        desc: "V marketingu sa riadime podobným princípom ako v medicíne – faktami. Nespoliehame sa na pocity, ale na dáta. Analyzujeme správanie používateľov, meriame efektivitu kampaní a optimalizujeme procesy na základe reálnych výsledkov. Marketingová inteligencia znamená, že každé vaše euro vložené do propagácie má svoj merateľný význam a cieľ.",
        icon: <BrainCircuit size={24} />,
        color: "#88D5DB",
    },
];

export default function ValuesStackingCards() {
    const [active, setActive] = useState<number | null>(0); // První karta je defaultně otevřená

    return (
        <div className="w-full max-w-4xl mx-auto px-4 relative z-20">
            <div className="flex flex-col relative pt-4 pb-12">
                {valuesData.map((val, i) => {
                    const isActive = active === i;

                    // Vizuální hloubka - čím dále od aktivní karty, tím je více vzadu (menší z-index)
                    // a tím menší má šířku (pomocí paddingu, NE marginInline kvůli stabilní flexbox velikosti)
                    const distFromActive = Math.abs((active !== null ? active : 0) - i);
                    const zIndex = isActive ? 10 : 5 - distFromActive;

                    return (
                        <motion.div
                            key={val.id}
                            initial={false}
                            animate={{
                                // Karta se vždycky fyzicky dotýká té nad ní, abychom zamezili dírám v DOMu
                                marginTop: i === 0 ? "0px" : "-20px",
                                // Místo paddingu použijeme čisté SCALE: neposunuje nativní DOM formátování, 
                                // pouze ho vizuálně zmenší (vytvoří jehlan od prostředku obrazovky).
                                // 100% zamezí přeřádkování a 'poskakování' odstavců v průběhu animace!
                                scale: 1 - (distFromActive * 0.035),
                                // Lehce to odskočí zpět ypsilonkou, pokud je to spodní karta, aby se zamezilo příliš velkému smrsknutí 
                                y: i > (active !== null ? active : 0) ? -distFromActive * 8 : 0,
                            }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{
                                position: "relative",
                                zIndex,
                                transformOrigin: "top center"
                            }}
                        >
                            <div
                                onClick={() => setActive(isActive ? null : i)}
                                className="cursor-pointer"
                            >
                                <GlowCard>
                                    <motion.div
                                        className="rounded-3xl border transition-all duration-500 relative overflow-hidden"
                                        animate={{
                                            backgroundColor: isActive
                                                ? "rgba(4, 29, 44, 0.98)" // Tmavší pokud aktivní (v popředí)
                                                : "rgba(4, 20, 35, 0.92)",
                                            borderColor: isActive ? `${val.color}40` : `${val.color}15`,
                                            boxShadow: isActive
                                                ? `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 20px -5px ${val.color}10`
                                                : "0 0 0 0 rgba(0,0,0,0)",
                                        }}
                                        style={{
                                            backdropFilter: "blur(20px)",
                                        }}
                                    >
                                        {/* Header - Stále viditelný */}
                                        <div className="flex items-center gap-4 lg:gap-6 p-5 lg:p-7 relative z-20">
                                            <div
                                                className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
                                                style={{
                                                    background: isActive ? `${val.color}15` : `${val.color}05`,
                                                    color: val.color,
                                                    border: `1px solid ${val.color}${isActive ? "30" : "15"}`,
                                                }}
                                            >
                                                {val.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3
                                                    className="font-bold font-kanit text-lg lg:text-2xl truncate transition-colors duration-500"
                                                    style={{ color: isActive ? val.color : "rgba(255,255,255,0.6)" }}
                                                >
                                                    {val.title}
                                                </h3>
                                                <p className="text-sm lg:text-[15px] font-stolzl truncate transition-colors duration-500" style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}>
                                                    {val.subtitle}
                                                </p>
                                            </div>
                                            <div
                                                className="text-4xl lg:text-6xl font-black font-kanit select-none flex-shrink-0 transition-opacity duration-500"
                                                style={{
                                                    color: val.color,
                                                    opacity: isActive ? 0.15 : 0.05,
                                                }}
                                            >
                                                0{i + 1}
                                            </div>
                                        </div>

                                        {/* Tělo - Viditelné pouze když je karta rozbalena */}
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{
                                                        height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                                                        opacity: { duration: 0.3, delay: 0.1 }
                                                    }}
                                                    className="overflow-hidden relative"
                                                >
                                                    <div className="px-5 lg:px-7 pb-6 lg:pb-8 pt-1" style={{ width: "100%", contain: "content" }}>
                                                        <p className="text-[15px] lg:text-lg text-white/60 leading-relaxed font-stolzl m-0">
                                                            {val.desc}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* "Click" hint for non-active cards on desktop hover */}
                                        {!isActive && (
                                            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                                <span className="text-white/80 font-stolzl text-sm tracking-wider uppercase">Kliknite pre zobrazenie</span>
                                            </div>
                                        )}
                                    </motion.div>
                                </GlowCard>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
