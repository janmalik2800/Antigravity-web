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
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase">
                            OCHRANA OSOBNÝCH ÚDAJOV (GDPR)
                        </h1>
                        <p className="text-lg text-white/60 leading-relaxed">
                            v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR)<br />
                            a zákonom č. 18/2018 Z. z. o ochrane osobných údajov
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
                        <h2 className="text-xl font-bold mb-6 text-teal">1. Prevádzkovateľ osobných údajov</h2>
                        <div className="text-white/70 space-y-2">
                            <p>Prevádzkovateľom osobných údajov je:</p>
                            <p className="font-bold text-white mt-4 italic">
                                MediConect s.r.o.<br />
                                Lounská 629/2<br />
                                031 04 Liptovský Mikuláš<br />
                                Slovenská republika
                            </p>
                            <p>IČO: 57016615<br />DIČ: 2122534216</p>
                            <p>Email: info@mediconect.sk<br />Tel.: +421 948 220 845</p>
                            <p className="mt-4">(ďalej len „Prevádzkovateľ“)</p>
                            <p className="mt-4 text-sm text-white/50">
                                Prevádzkovateľ spracúva osobné údaje v súlade s čl. 13 a 14 Nariadenia GDPR a § 19 zákona č. 18/2018 Z. z.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">2. Rozsah spracúvaných osobných údajov</h2>
                        <p className="text-white/70 mb-4">Prevádzkovateľ spracúva tieto osobné údaje:</p>
                        <ul className="list-disc pl-5 text-white/60 space-y-2">
                            <li>meno</li>
                            <li>priezvisko</li>
                            <li>názov spoločnosti</li>
                            <li>e-mailový kontakt</li>
                            <li>telefonický kontakt</li>
                            <li>preferencie záujemcu o marketingové služby</li>
                            <li>technické údaje získané prostredníctvom cookies (IP adresa, zariadenie, správanie na stránke)</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">3. Účely spracovania a právny základ</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white font-bold mb-3">3.1 Kontaktný formulár</h3>
                                <p className="text-white/70"><span className="text-white/40">Účel:</span> odpoveď na dopyt, komunikácia so záujemcom</p>
                                <p className="text-white/70"><span className="text-white/40">Právny základ:</span> čl. 6 ods. 1 písm. b) GDPR – plnenie zmluvy alebo vykonanie opatrení pred uzatvorením zmluvy</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-3">3.2 Newsletter a marketingová komunikácia</h3>
                                <p className="text-white/70"><span className="text-white/40">Účel:</span> zasielanie informácií o službách, novinkách a marketingových aktivitách</p>
                                <p className="text-white/70"><span className="text-white/40">Právny základ:</span> čl. 6 ods. 1 písm. a) GDPR – súhlas dotknutej osoby</p>
                                <p className="text-white/50 text-sm mt-2">Dotknutá osoba môže súhlas kedykoľvek odvolať.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-3">3.3 Analytika a cookies</h3>
                                <p className="text-white/70 mb-2"><span className="text-white/40">Účel:</span> meranie návštevnosti, optimalizácia webovej stránky, zlepšovanie služieb</p>
                                <div className="text-white/70 space-y-1">
                                    <p className="flex gap-2"><span>•</span> <span>čl. 6 ods. 1 písm. a) GDPR – súhlas (marketingové a analytické cookies)</span></p>
                                    <p className="flex gap-2"><span>•</span> <span>čl. 6 ods. 1 písm. f) GDPR – oprávnený záujem (základné technické cookies)</span></p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-3">3.4 Evidencia preferencií záujemcov</h3>
                                <p className="text-white/70"><span className="text-white/40">Účel:</span> prispôsobenie ponuky marketingových služieb</p>
                                <p className="text-white/70"><span className="text-white/40">Právny základ:</span> čl. 6 ods. 1 písm. b) GDPR – predzmluvné vzťahy alebo čl. 6 ods. 1 písm. f) GDPR – oprávnený záujem Prevádzkovateľa</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">4. Doba uchovávania údajov</h2>
                        <p className="text-white/70 mb-4">Osobné údaje uchovávame:</p>
                        <ul className="list-disc pl-5 text-white/60 space-y-2">
                            <li>počas trvania zmluvného vzťahu a následne 3 roky po jeho ukončení</li>
                            <li>pri marketingovej komunikácii do odvolania súhlasu</li>
                            <li>analytické údaje podľa nastavenia konkrétneho nástroja (zvyčajne max. 26 mesiacov)</li>
                        </ul>
                        <p className="mt-6 text-white/50 text-sm italic">
                            V súlade s čl. 5 ods. 1 písm. e) GDPR uchovávame údaje len po dobu nevyhnutnú na splnenie účelu.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">5. Príjemcovia osobných údajov</h2>
                        <p className="text-white/70 mb-4">Osobné údaje môžu byť sprístupnené:</p>
                        <ul className="list-disc pl-5 text-white/60 space-y-2">
                            <li>poskytovateľom IT služieb a hostingu</li>
                            <li>poskytovateľom emailových a marketingových nástrojov</li>
                            <li>analytickým nástrojom (napr. Google Analytics alebo obdobné systémy)</li>
                            <li>účtovným a právnym poradcom (ak je to nevyhnutné)</li>
                        </ul>
                        <p className="mt-6 text-white/60 text-sm">
                            Údaje sa neprenášajú do tretích krajín mimo EÚ, pokiaľ konkrétny nástroj nevyžaduje prenos. V takom prípade sa prenos uskutočňuje na základe primeraných záruk podľa čl. 46 GDPR.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="glass-strong p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 text-teal">6. Práva dotknutej osoby</h2>
                        <p className="text-white/70 mb-4">Podľa čl. 15 až 22 GDPR máte právo:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/60 text-sm">
                            <p>• na prístup k osobným údajom (čl. 15 GDPR)</p>
                            <p>• na opravu nesprávnych údajov (čl. 16 GDPR)</p>
                            <p>• na vymazanie („právo byť zabudnutý“) (čl. 17 GDPR)</p>
                            <p>• na obmedzenie spracovania (čl. 18 GDPR)</p>
                            <p>• na prenositeľnosť údajov (čl. 20 GDPR)</p>
                            <p>• namietať spracovanie (čl. 21 GDPR)</p>
                            <p>• odvolať súhlas kedykoľvek (čl. 7 ods. 3 GDPR)</p>
                        </div>
                        <p className="mt-8 text-white/80">Žiadosť je možné podať emailom na: <span className="text-teal font-bold">info@mediconect.sk</span></p>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-white font-bold mb-4">Máte právo podať sťažnosť dozornému orgánu:</p>
                            <address className="not-italic text-sm text-white/60 space-y-1">
                                Úrad na ochranu osobných údajov SR<br />
                                Hraničná 12<br />
                                820 07 Bratislava 27<br />
                                <a href="https://www.dataprotection.gov.sk" className="text-teal hover:underline">www.dataprotection.gov.sk</a>
                            </address>
                            <p className="text-[10px] text-white/30 mt-2">(v súlade s čl. 77 GDPR)</p>
                        </div>
                    </div>

                    {/* Section 7 - 11 */}
                    <div className="space-y-4">
                        <div className="glass-strong p-6 rounded-xl border border-white/5">
                            <h2 className="text-lg font-bold mb-2 text-white">7. Povinnosť poskytnúť údaje</h2>
                            <p className="text-white/60 text-sm">Poskytnutie osobných údajov je dobrovoľné, avšak v prípade neposkytnutia údajov nemusí byť možné odpovedať na dopyt alebo uzatvoriť zmluvu.</p>
                        </div>

                        <div className="glass-strong p-6 rounded-xl border border-white/5">
                            <h2 className="text-lg font-bold mb-2 text-white">8. Automatizované rozhodovanie a profilovanie</h2>
                            <p className="text-white/60 text-sm">Prevádzkovateľ nevykonáva automatizované individuálne rozhodovanie podľa čl. 22 GDPR.</p>
                            <p className="text-white/60 text-sm mt-2">Profilovanie sa môže uskutočňovať len v rozsahu marketingovej analytiky a preferencií služieb, bez právnych účinkov na dotknutú osobu.</p>
                        </div>

                        <div className="glass-strong p-6 rounded-xl border border-white/5">
                            <h2 className="text-lg font-bold mb-2 text-white">9. Bezpečnosť spracovania údajov</h2>
                            <p className="text-white/60 text-sm">Prevádzkovateľ prijal primerané technické a organizačné opatrenia podľa čl. 32 GDPR na zabezpečenie ochrany osobných údajov pred stratou, zneužitím alebo neoprávneným prístupom.</p>
                        </div>

                        <div className="glass-strong p-6 rounded-xl border border-white/5">
                            <h2 className="text-lg font-bold mb-2 text-white">10. Kontaktná osoba pre ochranu osobných údajov</h2>
                            <div className="text-white/60 text-sm">
                                <p className="font-bold text-white uppercase text-xs tracking-wider mb-2">Zodpovedná osoba:</p>
                                <p>PhDr. Víťazoslav Struhár</p>
                                <p>Email: info@mediconect.sk</p>
                                <p>Tel.: +421 948 220 845</p>
                            </div>
                        </div>

                        <div className="glass-strong p-6 rounded-xl border border-white/5">
                            <h2 className="text-lg font-bold mb-2 text-white">11. Záverečné ustanovenia</h2>
                            <p className="text-white/60 text-sm">Tieto zásady ochrany osobných údajov nadobúdajú účinnosť dňom ich zverejnenia na webovej stránke Prevádzkovateľa.</p>
                            <p className="text-white/40 text-xs mt-4 mb-1 uppercase tracking-tighter">Spracovanie osobných údajov sa riadi:</p>
                            <ul className="text-white/60 text-[11px] space-y-1">
                                <li>• Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR)</li>
                                <li>• Zákonom č. 18/2018 Z. z. o ochrane osobných údajov</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 text-center text-white/30 text-xs italic">
                        Liptovský Mikuláš 20.2.2026
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
