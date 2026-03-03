import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Mail, Send, PieChart, Users, ArrowRight } from "lucide-react";
import ScrollGradientBackground from "../../../components/ScrollGradientBackground";
import SiteHeader from "../../../components/SiteHeader";

export const metadata: Metadata = {
    title: "Ako sme v ambulancii MUDr. ÄŚajku zvĂ˝Ĺˇili poÄŤet preventĂ­vnych prehliadok o 42 % | Blog | Mediconect",
    description:
        "PrĂ­padovĂˇ ĹˇtĂşdia: Ako sme jednou e-mailovou kampaĹou postavenou na edukatĂ­vnom obsahu zvĂ˝Ĺˇili poÄŤet preventĂ­vnych prehliadok u MUDr. ÄŚajku o 42,31 %.",
    alternates: {
        canonical:
            "https://www.mediconect.sk/blog/strategicka-reaktivacia-pacientskej-databazy",
    },
    openGraph: {
        title: "Ako sme u nĂˇĹˇho klienta zvĂ˝Ĺˇili poÄŤet preventĂ­vnych prehliadok o 42Â % | Mediconect",
        description:
            "PrĂ­padovĂˇ ĹˇtĂşdia: +42,31 % nĂˇrast rezervĂˇciĂ­ na preventĂ­vne prehliadky vÄŹaka jednej e-mailovej kampani.",
        url: "https://www.mediconect.sk/blog/strategicka-reaktivacia-pacientskej-databazy",
        siteName: "Mediconect",
        locale: "sk_SK",
        type: "article",
    },
};

const metrics = [
    {
        icon: Send,
        label: "OdoslanĂ© e-maily",
        value: "1 618",
        description: "CelkovĂ˝ objem kampane",
    },
    {
        icon: Mail,
        label: "Miera doruÄŤenia",
        value: "98,52 %",
        description: "Takmer nulovĂˇ chybovosĹĄ",
    },
    {
        icon: PieChart,
        label: "Open rate",
        value: "70,89 %",
        description: "2Ă— priemer odvetvia",
    },
    {
        icon: TrendingUp,
        label: "NĂˇrast rezervĂˇciĂ­",
        value: "+42,31 %",
        description: "MerateÄľnĂ˝ dopad na prax",
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
                        SpĂ¤ĹĄ na Blog
                    </Link>
                </div>

                {/* Article */}
                <article className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-20">

                    {/* Header */}
                    <header className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8">
                            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                                PrĂ­padovĂˇ ĹˇtĂşdia
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Ako sme u nĂˇĹˇho klienta zvĂ˝Ĺˇili poÄŤet{" "}
                            <span className="text-gradient">preventĂ­vnych prehliadok o 42&nbsp;%</span>
                        </h1>

                        <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-10">
                            V modernom zdravotnĂ­ctve uĹľ nestaÄŤĂ­ len â€žlieÄŤiĹĄ". SkutoÄŤnou vĂ˝zvou je
                            motivovaĹĄ pacientov k prevencii skĂ´r, neĹľ sa objavĂ­ problĂ©m.
                        </p>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {["E-mail marketing", "PreventĂ­vna starostlivosĹĄ", "DatabĂˇzovĂ˝ marketing", "ZdravotnĂ­ctvo"].map((tag) => (
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
                            Spolu s naĹˇĂ­m klientom, vĹˇeobecnĂ˝m lekĂˇrom, sme sa pozreli na to, ako digitĂˇlny
                            marketing dokĂˇĹľe reĂˇlne zlepĹˇiĹĄ zdravie pacientov aj efektivitu
                            ambulancie.
                        </p>

                        {/* 1. VĂ˝zva */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">1.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    VĂ˝zva: KeÄŹ automatickĂ© systĂ©my nestaÄŤia
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    Ambulancia MUDr. ÄŚajku disponovala informaÄŤnĂ˝m systĂ©mom, ktorĂ˝
                                    pacientov automaticky upozorĹoval na termĂ­ny preventĂ­vnych
                                    prehliadok. VĂ˝sledok? Pacienti na notifikĂˇcie nereagovali
                                    v dostatoÄŤnom poÄŤte, alebo sa objednali a nepriĹˇli.
                                </p>
                                <div className="glass rounded-2xl p-6 border border-teal/10 flex gap-4">
                                    <span className="text-teal text-2xl flex-shrink-0">đź’ˇ</span>
                                    <p className="text-white/70">
                                        <strong className="text-white">ProblĂ©m:</strong> SuchĂˇ
                                        informĂˇcia o termĂ­ne v dneĹˇnom preplnenom digitĂˇlnom svete
                                        nestaÄŤĂ­. Pacient potrebuje pochopiĹĄ â€žpreÄŤo".
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. StratĂ©gia */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">2.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    StratĂ©gia: Od pripomienky k edukĂˇcii
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    V Mediconecte sme sa rozhodli â€žnelieÄŤiĹĄ symptĂłmy, ale hÄľadaĹĄ
                                    prĂ­ÄŤiny". Namiesto ÄŹalĹˇej strohej upomienky sme vytvorili
                                    edukaÄŤnĂş kampaĹ.
                                </p>
                                <div className="space-y-4">
                                    <div className="glass rounded-xl p-5 border border-white/5">
                                        <strong className="text-white block mb-2">Obsah s pridanou hodnotou</strong>
                                        <p className="text-sm">
                                            Pripravili sme e-mail, ktorĂ˝ nevyzĂ˝val na nĂˇvĹˇtevu, ale
                                            opisoval kritickĂş situĂˇciu v populĂˇcii a zdravotnĂ© dĂ´sledky
                                            zanedbanej prevencie.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border border-white/5">
                                        <strong className="text-white block mb-2">EmocionĂˇlna inteligencia</strong>
                                        <p className="text-sm">
                                            Text bol koncipovanĂ˝ s Ăşctou k lekĂˇrskej etike
                                            (â€žreĹˇpektujeme bielu farbu"), no s dĂ´razom na osobnĂş
                                            zodpovednosĹĄ pacienta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. RealizĂˇcia */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">3.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    RealizĂˇcia: PrecĂ­zny e-mail marketing
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    Cielili sme na databĂˇzu pacientov, ktorĂ­ dlhodobo odkladali svoju
                                    prehliadku. Celkovo sme odoslali{" "}
                                    <strong className="text-white">1 618 e-mailov</strong>.
                                </p>
                                <p>
                                    VyuĹľili sme nĂˇstroje, ktorĂ© zabezpeÄŤili maximĂˇlnu doruÄŤiteÄľnosĹĄ a
                                    ÄŤistotu dizajnu, aby sprĂˇva nepĂ´sobila ako spam, ale ako dĂ´leĹľitĂ˝
                                    list od ich oĹˇetrujĂşceho lekĂˇra.
                                </p>
                            </div>
                        </section>

                        {/* 4. VĂ˝sledky */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">4.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    VĂ˝sledky: ÄŚĂ­sla, ktorĂ© hovoria jasnou reÄŤou
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg mb-8">
                                <p>
                                    DosiahnutĂ© dĂˇta potvrdili, Ĺľe personalizovanĂ˝ a odbornĂ˝ prĂ­stup
                                    v zdravotnĂ­ctve funguje nĂˇsobne lepĹˇie neĹľ komerÄŤnĂ© Ĺˇtandardy:
                                </p>
                            </div>

                            {/* Dashboard */}
                            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-white font-medium">PrehÄľad kampane</h3>
                                        <p className="text-white/30 text-xs">FebruĂˇr 2025 Â· MUDr. ÄŚajka</p>
                                    </div>
                                    <span className="text-xs text-teal bg-teal/10 px-3 py-1 rounded-full font-semibold font-kanit">
                                        DokonÄŤenĂˇ
                                    </span>
                                </div>
                                <div className="mb-8">
                                    <div className="text-5xl font-bold text-white font-kanit">42,31 %</div>
                                    <p className="text-white/40 text-sm mt-1 font-kanit">
                                        NĂˇrast rezervĂˇciĂ­ na preventĂ­vnu prehliadku
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
                                            <Send size={12} /> OdoslanĂ©
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">1 618</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col gap-1 mb-2 text-white/50 text-xs font-kanit">
                                            <Mail size={12} /> DoruÄŤenĂ©
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">98,52 %</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col gap-1 mb-2 text-white/50 text-xs font-kanit">
                                            <PieChart size={12} /> OtvorenĂ©
                                        </div>
                                        <div className="text-lg font-bold text-white font-kanit">70,89 %</div>
                                    </div>
                                </div>

                                {/* Open rate note */}
                                <div className="mt-4 p-4 rounded-xl bg-teal/5 border border-teal/10 text-sm text-white/50">
                                    <span className="text-teal font-semibold">Open Rate 70,89 %</span> â€”
                                    svetovĂ˝ ĹˇtatistickĂ˝ priemer v tomto segmente je 15â€“25 %. NaĹˇa stratĂ©gia
                                    dosiahla{" "}
                                    <strong className="text-white">viac ako dvojnĂˇsobnĂş ĂşspeĹˇnosĹĄ</strong>.
                                </div>
                            </div>
                        </section>

                        {/* 5. ZĂˇver */}
                        <section>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-teal font-black text-3xl font-kanit">5.</span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                    ZĂˇver: Viac neĹľ len marketing
                                </h2>
                            </div>
                            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                                <p>
                                    TĂˇto prĂ­padovĂˇ ĹˇtĂşdia dokazuje, Ĺľe marketing v zdravotnĂ­ctve nie
                                    je â€žpredaj", ale budovanie dĂ´very. VÄŹaka sprĂˇvnej komunikĂˇcii sme
                                    pomohli MUDr. ÄŚajkovi nielen zaplniĹĄ kapacity ambulancie
                                    relevantnĂ˝mi vĂ˝konmi, ale predovĹˇetkĂ˝m sme pomohli stovkĂˇm
                                    pacientov urobiĹĄ kÄľĂşÄŤovĂ˝ krok pre ich zdravie.
                                </p>
                            </div>

                            {/* Quote */}
                            <blockquote className="mt-8 glass rounded-2xl p-8 border-l-4 border-teal relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-teal/5 rounded-full blur-[60px] pointer-events-none" />
                                <p className="text-white/80 text-xl italic leading-relaxed relative z-10">
                                    â€žVy sa starajte o zdravie svojich pacientov. My sa postarĂˇme o
                                    zdravie vaĹˇej znaÄŤky."
                                </p>
                                <footer className="mt-4 text-teal text-sm font-semibold relative z-10">
                                    â€” Manifest Mediconect v praxi
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
                                        Chcete podobnĂ© vĂ˝sledky?
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    PorozprĂˇvajme sa o vaĹˇej praxi
                                </h3>
                                <p className="text-white/50 max-w-lg">
                                    KaĹľdĂˇ ambulancia mĂˇ svoju databĂˇzu. PomĂ´Ĺľeme vĂˇm ju premeniĹĄ na
                                    merateÄľnĂ© vĂ˝sledky â€“ so stratĂ©giou Ĺˇitou na mieru.
                                </p>
                            </div>
                            <Link
                                href="/#kontakt"
                                className="flex-shrink-0 group inline-flex items-center gap-3 px-8 py-4 bg-teal text-navy-dark font-semibold text-lg rounded-2xl hover:bg-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-teal/25"
                            >
                                BezplatnĂˇ konzultĂˇcia
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
                            Â© 2026 Mediconect. VĹˇetky prĂˇva vyhradenĂ©.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/40">
                            <Link href="/blog" className="hover:text-teal transition-colors">
                                â† Blog
                            </Link>
                            <Link href="/ochrana-osobnych-udajov" className="hover:text-teal transition-colors">
                                Ochrana Ăşdajov
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

