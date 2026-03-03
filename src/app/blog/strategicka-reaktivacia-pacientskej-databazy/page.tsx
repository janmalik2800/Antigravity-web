import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Mail, Send, PieChart, Users, ArrowRight } from "lucide-react";
import ScrollGradientBackground from "../../../components/ScrollGradientBackground";
import SiteHeader from "../../../components/SiteHeader";

export const metadata: Metadata = {
    title: "Ako sme v ambulancii MUDr. Čajku zvýšili počet preventívnych prehliadok o 42 % | Blog | Mediconect",
    description:
        "Prípadová štúdia: Ako sme jednou e-mailovou kampaňou postavenou na edukatívnom obsahu zvýšili počet preventívnych prehliadok u MUDr. Čajku o 42,31 %.",
    alternates: {
        canonical:
            "https://www.mediconect.sk/blog/strategicka-reaktivacia-pacientskej-databazy",
    },
    openGraph: {
        title: "Ako sme v ambulancii MUDr. Čajku zvýšili počet preventívnych prehliadok o 42 % | Mediconect",
        description:
            "Prípadová štúdia: +42,31 % nárast rezervácií na preventívne prehliadky vďaka jednej e-mailovej kampani.",
        url: "https://www.mediconect.sk/blog/strategicka-reaktivacia-pacientskej-databazy",
        siteName: "Mediconect",
        locale: "sk_SK",
        type: "article",
    },
};

const metrics = [
    {
        icon: Send,
        label: "Odoslané e-maily",
        value: "1 618",
        description: "Celkový objem kampane",
    },
    {
        icon: Mail,
        label: "Miera doručenia",
        value: "98,52 %",
        description: "Takmer nulová chybovosť",
    },
    {
        icon: PieChart,
        label: "Open rate",
        value: "70,89 %",
        description: "2× priemer odvetvia",
    },
    {
        icon: TrendingUp,
        label: "Nárast rezervácií",
        value: "+42,31 %",
        description: "Merateľný dopad na prax",
    },
];

export default function CaseStudyPage() {
    return (
        <div className="min-h-screen relative">
            <ScrollGradientBackground />

            <div className="relative" style={{ zIndex: 2 }}>
                {/* Nav */}
                <SiteHeader />

                {/* Breadcrumb */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pt-28">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-teal transition-colors text-sm"
                    >
                        <ArrowLeft size={14} />
                        Späť na Blog
                    </Link>
                </div>

                {/* Article */}
                <article className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-20">

                    {/* Header */}
                    <header className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8">
                            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                                Prípadová štúdia
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Ako sme v ambulancii MUDr. Čajku zvýšili počet{" "}
                            <span className="text-gradient">preventívnych prehliadok o 42&nbsp;%</span>
                        </h1>

                        <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-10">
                            V modernom zdravotníctve už nestačí len „liečiť". Skutočnou výzvou je
                            motivovať pacientov k prevencii skôr, než sa objaví problém.
                        </p>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {["E-mail marketing", "Preventívna starostlivosť", "Databázový marketing", "Zdravotníctvo"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-white/40 bg-white/5 border border-white/5 rounded-full px-4 py-1.5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Key metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                        {metrics.map((m) => (
                            <div
                                key={m.label}
                                className="glass rounded-2xl p-5 text-center border border-white/5 hover:border-teal/20 transition-colors"
                            >
                                <m.icon size={18} className="text-teal mx-auto mb-3 opacity-70" />
                                <div className="text-2xl font-bold text-teal font-kanit mb-1">
                                    {m.value}
                                </div>
                                <div className="text-white/80 text-xs font-semibold mb-1">
                                    {m.label}
                                </div>
                                <div className="text-white/30 text-[11px]">
                                    {m.description}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="space-y-14">

                        {/* Intro */}
                        <p className="text-lg text-white/60 leading-relaxed">
                            Spolu s naším klientom,{" "}
                            <strong className="text-white">MUDr. Romanom Čajkom</strong>,
                            všeobecným lekárom zo Žiliny, sme sa pozreli na to, ako digitálny
                            marketing dokáže reálne zlepšiť zdravie pacientov aj efektivitu
                            ambulancie.
                        </p>

                        {/* 1. Výzva */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">1.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    Výzva: Keď automatické systémy nestačia
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    Ambulancia MUDr. Čajku disponovala informačným systémom, ktorý
                                    pacientov automaticky upozorňoval na termíny preventívnych
                                    prehliadok. Výsledok? Pacienti na notifikácie nereagovali
                                    v dostatočnom počte, alebo sa objednali a neprišli.
                                </p>
                                <div className="glass rounded-2xl p-6 border border-teal/10 flex gap-4">
                                    <span className="text-teal text-2xl flex-shrink-0">💡</span>
                                    <p className="text-white/70">
                                        <strong className="text-white">Problém:</strong> Suchá
                                        informácia o termíne v dnešnom preplnenom digitálnom svete
                                        nestačí. Pacient potrebuje pochopiť „prečo".
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Stratégia */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">2.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    Stratégia: Od pripomienky k edukácii
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    V Mediconecte sme sa rozhodli „neliečiť symptómy, ale hľadať
                                    príčiny". Namiesto ďalšej strohej upomienky sme vytvorili
                                    edukačnú kampaň.
                                </p>
                                <div className="space-y-4">
                                    <div className="glass rounded-xl p-5 border border-white/5">
                                        <strong className="text-white block mb-2">Obsah s pridanou hodnotou</strong>
                                        <p className="text-sm">
                                            Pripravili sme e-mail, ktorý nevyzýval na návštevu, ale
                                            opisoval kritickú situáciu v populácii a zdravotné dôsledky
                                            zanedbanej prevencie.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border border-white/5">
                                        <strong className="text-white block mb-2">Emocionálna inteligencia</strong>
                                        <p className="text-sm">
                                            Text bol koncipovaný s úctou k lekárskej etike
                                            („rešpektujeme bielu farbu"), no s dôrazom na osobnú
                                            zodpovednosť pacienta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Realizácia */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">3.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    Realizácia: Precízny e-mail marketing
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    Cielili sme na databázu pacientov, ktorí dlhodobo odkladali svoju
                                    prehliadku. Celkovo sme odoslali{" "}
                                    <strong className="text-white">1 618 e-mailov</strong>.
                                </p>
                                <p>
                                    Využili sme nástroje, ktoré zabezpečili maximálnu doručiteľnosť a
                                    čistotu dizajnu, aby správa nepôsobila ako spam, ale ako dôležitý
                                    list od ich ošetrujúceho lekára.
                                </p>
                            </div>
                        </section>

                        {/* 4. Výsledky */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">4.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    Výsledky: Čísla, ktoré hovoria jasnou rečou
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg mb-8">
                                <p>
                                    Dosiahnuté dáta potvrdili, že personalizovaný a odborný prístup
                                    v zdravotníctve funguje násobne lepšie než komerčné štandardy:
                                </p>
                            </div>

                            {/* Dashboard */}
                            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-white font-medium">Prehľad kampane</h3>
                                        <p className="text-white/30 text-xs">Február 2025 · MUDr. Čajka</p>
                                    </div>
                                    <span className="text-xs text-teal bg-teal/10 px-3 py-1 rounded-full font-semibold font-kanit">
                                        Dokončená
                                    </span>
                                </div>
                                <div className="mb-8">
                                    <div className="text-5xl font-bold text-white font-kanit">42,31 %</div>
                                    <p className="text-white/40 text-sm mt-1 font-kanit">
                                        Nárast rezervácií na preventívnu prehliadku
                                    </p>
                                </div>
                                <div className="h-32 w-full mb-8 relative">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="cs-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 40 L0 38 C15 36, 25 30, 35 24 C50 16, 60 10, 75 5 C85 2, 92 1, 100 0 L100 40 Z" fill="url(#cs-gradient)" />
                                        <path d="M0 38 C15 36, 25 30, 35 24 C50 16, 60 10, 75 5 C85 2, 92 1, 100 0" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col gap-1 mb-2 text-white/50 text-xs font-kanit">
                                            <Send size={12} /> Odoslané
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">1 618</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col gap-1 mb-2 text-white/50 text-xs font-kanit">
                                            <Mail size={12} /> Doručené
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">98,52 %</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col gap-1 mb-2 text-white/50 text-xs font-kanit">
                                            <PieChart size={12} /> Otvorené
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">70,89 %</div>
                                    </div>
                                </div>

                                {/* Open rate note */}
                                <div className="mt-4 p-4 rounded-xl bg-teal/5 border border-teal/10 text-sm text-white/50">
                                    <span className="text-teal font-semibold">Open Rate 70,89 %</span> —
                                    svetový štatistický priemer v tomto segmente je 15–25 %. Naša stratégia
                                    dosiahla{" "}
                                    <strong className="text-white">viac ako dvojnásobnú úspešnosť</strong>.
                                </div>
                            </div>
                        </section>

                        {/* 5. Záver */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">5.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    Záver: Viac než len marketing
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    Táto prípadová štúdia dokazuje, že marketing v zdravotníctve nie
                                    je „predaj", ale budovanie dôvery. Vďaka správnej komunikácii sme
                                    pomohli MUDr. Čajkovi nielen zaplniť kapacity ambulancie
                                    relevantnými výkonmi, ale predovšetkým sme pomohli stovkám
                                    pacientov urobiť kľúčový krok pre ich zdravie.
                                </p>
                            </div>

                            {/* Quote */}
                            <blockquote className="mt-8 glass rounded-2xl p-8 border-l-4 border-teal relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-teal/5 rounded-full blur-[60px] pointer-events-none" />
                                <p className="text-white/80 text-xl italic leading-relaxed relative z-10">
                                    „Vy sa starajte o zdravie svojich pacientov. My sa postaráme o
                                    zdravie vašej značky."
                                </p>
                                <footer className="mt-4 text-teal text-sm font-semibold relative z-10">
                                    — Manifest Mediconect v praxi
                                </footer>
                            </blockquote>
                        </section>
                    </div>

                    {/* CTA block */}
                    <div className="mt-20 glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Users size={18} className="text-teal" />
                                    <span className="text-teal text-sm font-semibold uppercase tracking-wider">
                                        Chcete podobné výsledky?
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Porozprávajme sa o vašej praxi
                                </h3>
                                <p className="text-white/50 max-w-lg">
                                    Každá ambulancia má svoju databázu. Pomôžeme vám ju premeniť na
                                    merateľné výsledky – so stratégiou šitou na mieru.
                                </p>
                            </div>
                            <Link
                                href="/#kontakt"
                                className="flex-shrink-0 group inline-flex items-center gap-3 px-8 py-4 bg-teal text-navy-dark font-semibold text-lg rounded-2xl hover:bg-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-teal/25"
                            >
                                Bezplatná konzultácia
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
                            <Image
                                src="/Logo final.png"
                                alt="Mediconect"
                                width={140}
                                height={35}
                                className="h-[35px] w-auto"
                            />
                        </Link>
                        <p className="text-white/30 text-sm text-center">
                            © 2026 Mediconect. Všetky práva vyhradené.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/40">
                            <Link href="/blog" className="hover:text-teal transition-colors">
                                ← Blog
                            </Link>
                            <Link href="/ochrana-osobnych-udajov" className="hover:text-teal transition-colors">
                                Ochrana údajov
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
