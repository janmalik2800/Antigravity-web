"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";

export default function GDPRPage() {
    return (
        <div className="min-h-screen bg-navy-dark relative overflow-hidden text-white/80">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal hover:text-white transition-colors mb-8 text-sm font-medium">
                        <ArrowLeft size={16} /> Späť na hlavnú stránku
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ochrana osobných dajov
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed">
                            Informácie o spracúvaní osobných údajov a používaní cookies.
                        </p>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none space-y-12"
                >
                    {/* Section 1 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-6 text-teal">
                            <Shield size={28} />
                            <h2 className="text-2xl font-bold m-0 text-white">1. Základné ustanovenia</h2>
                        </div>
                        <p className="text-white/70">
                            Prevádzkovateľom osobných údajov podľa § 5 písm. o) zákona č. 18/2018 Z.z. o ochrane osobných údajov v znení neskorších predpisov (ďalej len „Zákon“) je spoločnosť prevádzkujúca tento web.
                        </p>
                        <ul className="list-disc pl-5 mt-4 text-white/60 space-y-2">
                            <li>Kontaktné údaje prevádzkovateľa nájdete v sekcii Kontakt na hlavnej stránke.</li>
                            <li>Osobnými údajmi sa rozumejú všetky informácie o identifikovanej alebo identifikovateľnej fyzickej osobe.</li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-6 text-teal">
                            <Lock size={28} />
                            <h2 className="text-2xl font-bold m-0 text-white">2. Zdroje a kategórie spracovávaných údajov</h2>
                        </div>
                        <p className="text-white/70">
                            Prevádzkovateľ spracúva osobné údaje, ktoré ste mu poskytli, alebo osobné údaje, ktoré prevádzkovateľ získal na základe plnenia Vašej objednávky / dopytu.
                        </p>
                        <ul className="list-disc pl-5 mt-4 text-white/60 space-y-2">
                            <li>Identifikačné a adresné údaje slúžiace k jednoznačnej a nezameniteľnej identifikácii (napr. meno, e-mail, telefón).</li>
                            <li>Údaje potrebné pre plnenie zmluvy / poskytnutie služby.</li>
                        </ul>
                    </div>

                    {/* Section 3 - Cookies */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-6 text-teal">
                            <Eye size={28} />
                            <h2 className="text-2xl font-bold m-0 text-white">3. Používanie súborov Cookies</h2>
                        </div>
                        <p className="text-white/70">
                            Táto stránka používa súbory cookies na zlepšenie používateľského zážitku, analýzu návštevnosti a marketingové účely.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">Aké cookies používame?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <strong className="text-teal block mb-2">Nevyhnutné</strong>
                                <p className="text-sm text-white/50">Sú potrebné pre správne fungovanie stránky a nemožno ich vypnúť.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <strong className="text-teal block mb-2">Analytické</strong>
                                <p className="text-sm text-white/50">Pomáhajú nám sledovať návštevnosť a správanie používateľov (Google Analytics).</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <strong className="text-teal block mb-2">Marketingové</strong>
                                <p className="text-sm text-white/50">Slúžia na zobrazovanie relevantnej reklamy naprieč internetom.</p>
                            </div>
                        </div>

                        <p className="mt-6 text-white/60">
                            Svoj súhlas s používaním voliteľných cookies môžete kedykoľvek zmeniť alebo odvolať v nastaveniach cookies lišty.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
