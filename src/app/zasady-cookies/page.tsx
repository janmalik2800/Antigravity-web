"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cookie, ShieldCheck, Settings } from "lucide-react";

export default function CookiePolicyPage() {
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
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
                            ZÁSADY POUŽÍVANIA COOKIES (COOKIE POLICY)
                        </h1>
                        <p className="text-lg text-white/60 leading-relaxed">
                            v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR),<br />
                            zákonom č. 18/2018 Z. z. o ochrane osobných údajov<br />
                            a zákonom č. 452/2021 Z. z. o elektronických komunikáciách
                        </p>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Section 1 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">1. Prevádzkovateľ webovej stránky</h2>
                        <div className="text-white/70 space-y-2">
                            <p>Prevádzkovateľom webovej stránky a správcom osobných údajov je:</p>
                            <p className="font-bold text-white mt-4 italic text-lg">
                                MediConect s.r.o.<br />
                                Lounská 629/2<br />
                                031 04 Liptovský Mikuláš<br />
                                Slovenská republika
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <p>IČO: 57016615<br />DIČ: 2122534216</p>
                                <p>Email: info@mediconect.sk<br />Tel.: +421 948 220 845</p>
                            </div>
                            <p className="mt-4 pt-4 border-t border-white/10">
                                <span className="text-white/40 uppercase text-xs tracking-wider">Zodpovedná osoba:</span> <span className="text-white font-medium">Tomáš Kuchta</span>
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">2. Čo sú cookies</h2>
                        <p className="text-white/70 mb-4">
                            Cookies sú malé textové súbory, ktoré sa ukladajú do vášho zariadenia (počítač, tablet, mobil) pri návšteve webovej stránky.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div>
                                <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Používajú sa najmä na:</h3>
                                <ul className="list-disc pl-5 text-white/60 text-sm space-y-1">
                                    <li>zabezpečenie správneho fungovania stránky</li>
                                    <li>zapamätanie vašich nastavení</li>
                                    <li>meranie návštevnosti</li>
                                    <li>personalizáciu obsahu a marketingu</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Cookies môžu byť:</h3>
                                <ul className="list-disc pl-5 text-white/60 text-sm space-y-1">
                                    <li>dočasné (session cookies) – vymažú sa po zatvorení prehliadača</li>
                                    <li>trvalé (persistent cookies) – zostávajú uložené určitý čas</li>
                                    <li>prvej strany – nastavené priamo našou stránkou</li>
                                    <li>tretích strán – nastavené externými službami</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">3. Aké cookies používame</h2>
                        <div className="space-y-8">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">3.1 Nevyhnutné (technické) cookies</h3>
                                <p className="text-white/70 text-sm mb-4">Tieto cookies sú potrebné na správne fungovanie webovej stránky.</p>
                                <div className="text-white/40 text-[11px] space-y-1 mb-4">
                                    <p>Právny základ: čl. 6 ods. 1 písm. f) GDPR – oprávnený záujem</p>
                                    <p>§ 109 ods. 8 zákona č. 452/2021 Z. z.</p>
                                </div>
                                <p className="text-teal font-bold text-xs uppercase tracking-widest">Tieto cookies nie je možné odmietnuť.</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">3.2 Analytické cookies</h3>
                                <p className="text-white/70 text-sm mb-4">Slúžia na meranie návštevnosti a zlepšovanie obsahu webovej stránky (napr. sledovanie počtu návštevníkov, správania na stránke).</p>
                                <div className="mb-4">
                                    <p className="text-white/40 text-xs mb-2">Môžu zahŕňať nástroje ako napr.:</p>
                                    <p className="text-white/70 text-sm">• Google Analytics alebo obdobné analytické nástroje</p>
                                </div>
                                <p className="text-white/40 text-[11px]">Právny základ: čl. 6 ods. 1 písm. a) GDPR – súhlas dotknutej osoby</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">3.3 Marketingové cookies</h3>
                                <div className="space-y-2 mb-4">
                                    <p className="text-white/40 text-xs">Používajú sa na:</p>
                                    <ul className="text-white/70 text-sm space-y-1">
                                        <li>• personalizáciu reklamy</li>
                                        <li>• sledovanie preferencií záujemcu o marketingové služby</li>
                                        <li>• vyhodnocovanie efektivity kampaní</li>
                                    </ul>
                                </div>
                                <p className="text-white/40 text-[11px]">Právny základ: čl. 6 ods. 1 písm. a) GDPR – súhlas</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 & 5 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-strong p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-teal">4. Ako udeľujete súhlas</h2>
                            <p className="text-white/70 text-sm mb-4">Pri prvej návšteve webovej stránky sa vám zobrazí cookie lišta, ktorá umožňuje:</p>
                            <ul className="list-disc pl-5 text-white/60 text-sm space-y-1">
                                <li>prijať všetky cookies</li>
                                <li>odmietnuť všetky nepovinné cookies</li>
                                <li>nastaviť individuálne preferencie</li>
                            </ul>
                            <p className="mt-6 text-teal/80 text-xs font-bold">Súhlas je dobrovoľný a môžete ho kedykoľvek odvolať.</p>
                        </div>

                        <div className="glass-strong p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-teal">5. Ako môžete cookies kontrolovať</h2>
                            <p className="text-white/70 text-sm mb-4">Cookies môžete spravovať prostredníctvom cookie lišty na našej stránke alebo v nastaveniach vášho prehliadača.</p>
                            <div className="space-y-1">
                                <p className="text-white/40 text-xs mb-2">Odkazy na správu cookies:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Google Chrome', 'Mozilla Firefox', 'Microsoft Edge', 'Safari'].map(browser => (
                                        <span key={browser} className="text-white/60 text-xs">• {browser}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-6 text-white/30 text-[10px] italic">Upozorňujeme, že vypnutie niektorých cookies môže obmedziť funkčnosť stránky.</p>
                        </div>
                    </div>

                    {/* Section 6 & 7 */}
                    <div className="space-y-6">
                        <div className="glass-strong p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-teal">6. Doba uchovávania cookies</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-white font-bold text-sm mb-1">Technické</p>
                                    <p className="text-white/50 text-xs">doba relácie / max. 12 mesiacov</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-white font-bold text-sm mb-1">Analytické</p>
                                    <p className="text-white/50 text-xs">zvyčajne do 26 mesiacov</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-white font-bold text-sm mb-1">Marketingové</p>
                                    <p className="text-white/50 text-xs">podľa nástroja</p>
                                </div>
                            </div>
                            <p className="mt-6 text-white/30 text-[10px]">V súlade s čl. 5 ods. 1 písm. e) GDPR uchovávame údaje len po nevyhnutnú dobu.</p>
                        </div>

                        <div className="glass-strong p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-teal">7. Prenos do tretích krajín</h2>
                            <p className="text-white/70 text-sm mb-4">Ak používame nástroje poskytované spoločnosťami mimo EÚ (napr. USA), môže dôjsť k prenosu údajov.</p>
                            <div className="space-y-3 bg-white/5 p-4 rounded-lg">
                                <p className="text-white/60 text-xs">Takýto prenos sa uskutočňuje na základe:</p>
                                <p className="text-white/80 text-sm">• rozhodnutia o primeranosti podľa čl. 45 GDPR</p>
                                <p className="text-center text-white/20 text-[10px]">alebo</p>
                                <p className="text-white/80 text-sm">• štandardných zmluvných doložiek podľa čl. 46 GDPR</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 8 & 9 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">8. Vaše práva</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-white/60 text-sm mb-8">
                            <p>• na prístup k údajom (čl. 15 GDPR)</p>
                            <p>• na opravu (čl. 16 GDPR)</p>
                            <p>• na vymazanie (čl. 17 GDPR)</p>
                            <p>• na obmedzenie spracovania (čl. 18 GDPR)</p>
                            <p>• namietať spracovanie (čl. 21 GDPR)</p>
                            <p>• odvolať súhlas (čl. 7 ods. 3 GDPR)</p>
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-6">
                            <div>
                                <p className="text-white/40 text-xs mb-1 uppercase">Svoje práva môžete uplatniť na:</p>
                                <p className="text-teal font-bold">info@mediconect.sk</p>
                            </div>
                            <div>
                                <p className="text-white/40 text-xs mb-2">Dozorný orgán:</p>
                                <address className="not-italic text-sm text-white/60">
                                    Úrad na ochranu osobných údajov SR<br />
                                    Hraničná 12, 820 07 Bratislava 27<br />
                                    <a href="https://www.dataprotection.gov.sk" className="text-teal hover:underline">www.dataprotection.gov.sk</a>
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-4 text-white">9. Záverečné ustanovenia</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Tieto Zásady používania cookies sú platné a účinné dňom ich zverejnenia. Prevádzkovateľ si vyhradzuje právo na ich aktualizáciu v prípade legislatívnych zmien alebo zmien používaných nástrojov.
                        </p>
                    </div>

                    <div className="pt-12 text-center text-white/30 text-xs italic">
                        Liptovský Mikuláš 20.2.2026
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
