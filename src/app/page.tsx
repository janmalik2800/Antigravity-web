"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    Target,
    Palette,
    Camera,
    Globe,
    Mail,
    Users,
    Phone,
    MapPin,
    Clock,
    BarChart3,
    Shield,
    Layers,
    Plus,
    Minus,
    Menu,
    X,
    Check,
    Send,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import CaseStudyDashboard from "../components/CaseStudyDashboard";


const ContactModal = dynamic(() => import("../components/ContactModal"), {
    ssr: false,
});

/* ─── Animation Variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

/* ─── Reusable Section Wrapper with scroll reveal ─── */
function Section({
    children,
    className = "",
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.section
            ref={ref}
            id={id}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.section>
    );
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString("sk-SK")}{suffix}
        </span>
    );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/5">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
            >
                <span className="text-lg font-medium text-white/90 group-hover:text-teal transition-colors pr-8">
                    {question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center transition-all group-hover:bg-teal/20">
                    {open ? <Minus size={16} className="text-teal" /> : <Plus size={16} className="text-teal" />}
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-white/60 leading-relaxed max-w-3xl">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


/* ─── Services Data ─── */
const servicesData = [
    {
        icon: <Target size={32} />,
        iconSmall: <Target size={20} />,
        title: "Akvizícia a výkonnostný marketing",
        desc: "Zabezpečujeme kontinuálny prísun nových pacientov prostredníctvom precízne cielených kampaní na platformách Google a Meta. Zameriavame sa na reálnu návratnosť investícií a kvalitu dopytov.",
        number: "01",
    },
    {
        icon: <Palette size={32} />,
        iconSmall: <Palette size={20} />,
        title: "Vizuálna identita a branding",
        desc: "Vytvárame unikátny vizuálny jazyk vašej praxe. Od loga a firemnej typografie až po kompletnú identitu, ktorá vás odlíši od konkurencie a vzbudí okamžitú dôveru.",
        number: "02",
    },
    {
        icon: <Camera size={32} />,
        iconSmall: <Camera size={20} />,
        title: "Produkcia a vizuálny obsah",
        desc: "Zabezpečujeme profesionálnu foto a video produkciu priamo vo vašich priestoroch. Disponujeme vlastným zázemím vrátane modelov, aby sme vytvorili reprezentatívny obsah bez zaťaženia vášho personálu.",
        number: "03",
    },
    {
        icon: <Globe size={32} />,
        iconSmall: <Globe size={20} />,
        title: "Webové riešenia a CRM",
        desc: "Navrhujeme a spravujeme moderné, plne funkčné webové stránky a systémy na správu pacientov (CRM), ktoré zjednodušujú komunikáciu a automatizujú proces objednávania.",
        number: "04",
    },
    {
        icon: <Mail size={32} />,
        iconSmall: <Mail size={20} />,
        title: "Email marketing a práca s dátami",
        desc: "Pomáhame vám naplno využiť potenciál vašej súčasnej databázy. Cez diskrétny a etický emailing udržiavame kontakt s vašimi pacientmi a zvyšujeme ich lojalitu k vašej ambulancii.",
        number: "05",
    },
    {
        icon: <Users size={32} />,
        iconSmall: <Users size={20} />,
        title: "Konzultácie a predajné procesy",
        desc: "Poskytujeme odborné poradenstvo pri nastavovaní interných procesov a školíme váš tím tak, aby ste z vášho marketingu a autority vyťažili maximum.",
        number: "06",
    },
];

/* ─── Interactive Services Showcase ─── */
function ServicesShowcase() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const DURATION = 3500;

    useEffect(() => {
        if (paused || !isInView) return;
        const tick = 50;
        let elapsed = 0;
        intervalRef.current = setInterval(() => {
            elapsed += tick;
            setProgress((elapsed / DURATION) * 100);
            if (elapsed >= DURATION) {
                setActive((prev) => (prev + 1) % servicesData.length);
                elapsed = 0;
                setProgress(0);
            }
        }, tick);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [paused, active, isInView]);

    const handleSelect = (index: number) => {
        setActive(index);
        setProgress(0);
    };

    const current = servicesData[active];

    return (
        <motion.section
            ref={sectionRef}
            id="sluzby"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-24 lg:py-32 relative z-10"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
                    <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                        Portfólio služieb
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-bold mt-4">
                        Komplexné riešenia pre rast{" "}
                        <span className="text-gradient">vašej praxe</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    custom={1}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Left: Navigation Tabs */}
                    <div className="lg:col-span-5 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {servicesData.map((service, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink cursor-pointer w-64 lg:w-full ${active === i
                                    ? "glass-strong glow-teal border-teal/25"
                                    : "glass hover:border-teal/15 border-transparent"
                                    }`}
                            >
                                <span
                                    className={`text-xs font-bold flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${active === i
                                        ? "bg-teal text-navy-dark"
                                        : "bg-white/5 text-white/30 group-hover:text-white/50"
                                        }`}
                                >
                                    {service.number}
                                </span>
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className={`flex-shrink-0 transition-colors duration-300 ${active === i ? "text-teal" : "text-white/30 group-hover:text-white/50"
                                            }`}
                                    >
                                        {service.iconSmall}
                                    </span>
                                    <span
                                        className={`text-sm font-medium truncate transition-colors duration-300 ${active === i ? "text-white" : "text-white/50 group-hover:text-white/70"
                                            }`}
                                    >
                                        {service.title}
                                    </span>
                                </div>
                                {active === i && (
                                    <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-teal rounded-full transition-[width] duration-[50ms] linear"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Active Service Content */}
                    <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 40, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -40, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="glass-strong rounded-3xl p-10 lg:p-14 h-full flex flex-col relative overflow-hidden text-left"
                            >
                                <div className="absolute -top-6 -right-4 text-[180px] font-black text-teal/[0.04] leading-none select-none pointer-events-none">
                                    {current.number}
                                </div>
                                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-teal/8 rounded-full blur-[80px]" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex-1 flex flex-col justify-center">
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.1, duration: 0.4 }}
                                            className="w-16 h-16 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-8 glow-teal"
                                        >
                                            {current.icon}
                                        </motion.div>
                                        <motion.h3
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                            className="text-2xl lg:text-3xl font-bold mb-5 leading-snug"
                                        >
                                            {current.title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25, duration: 0.4 }}
                                            className="text-white/50 text-base lg:text-lg leading-relaxed max-w-xl"
                                        >
                                            {current.desc}
                                        </motion.p>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.35, duration: 0.4 }}
                                        className="mt-6 flex items-center justify-end gap-3"
                                    >
                                        <button
                                            onClick={() => {
                                                const next = (active - 1 + servicesData.length) % servicesData.length;
                                                handleSelect(next);
                                            }}
                                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        <div className="flex gap-2 mx-2">
                                            {servicesData.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelect(i)}
                                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${active === i
                                                        ? "w-6 bg-teal"
                                                        : "w-1.5 bg-white/20 hover:bg-white/40"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                const next = (active + 1) % servicesData.length;
                                                handleSelect(next);
                                            }}
                                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                                        >
                                            <ChevronRight size={16} />
                                        </button>

                                        <span className="text-sm font-medium text-white/40 min-w-[3ch] text-right ml-2">
                                            {active + 1}/{servicesData.length}
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                     */
/* ═══════════════════════════════════════════════ */
export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        clinic: "",
        email: "",
        phone: "",
        practice: "",
        message: "",
        gdpr: false,
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: send data to email / Supabase / Google Sheets
        console.log("Form submitted:", formData);
        setModalOpen(false);
        setFormData({ name: "", clinic: "", email: "", phone: "", practice: "", message: "", gdpr: false });
        window.location.href = "/dakujeme";
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-navy-dark bg-grid relative">
            {/* ─── Background Orbs ─── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] bg-teal/3 rounded-full blur-[150px] animate-float-delayed" />
                <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-teal/4 rounded-full blur-[100px] animate-float" />
            </div>

            {/* ═══════════════ NAVBAR ═══════════════ */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border ${scrolled ? "glass-strong border-teal/20 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <Image
                                src="/logo 2.png"
                                alt="Mediconnect"
                                width={40}
                                height={40}
                                priority
                                className="rounded-xl group-hover:shadow-lg group-hover:shadow-teal/30 transition-all duration-300"
                            />
                            <span className="text-xl font-bold tracking-tight">
                                Medi<span className="text-teal">connect</span>
                            </span>
                        </a>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {[
                                ["Služby", "#sluzby"],
                                ["Prípadová štúdia", "#case-study"],
                                ["Proces", "#proces"],
                                ["FAQ", "#faq"],
                            ].map(([label, href]) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="text-sm text-white/60 hover:text-teal transition-colors duration-300"
                                >
                                    {label}
                                </a>
                            ))}
                            <a
                                href="#kontakt"
                                className="px-6 py-2.5 bg-teal text-navy-dark font-semibold text-sm rounded-xl hover:bg-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-teal/25 cursor-pointer"
                            >
                                Bezplatná konzultácia
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden text-white/80"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass-strong border-t border-white/5 overflow-hidden"
                        >
                            <div className="px-6 py-6 flex flex-col gap-4">
                                {[
                                    ["Služby", "#sluzby"],
                                    ["Proces", "#proces"],
                                    ["Prípadová štúdia", "#case-study"],
                                    ["FAQ", "#faq"],
                                ].map(([label, href]) => (
                                    <a
                                        key={href}
                                        href={href}
                                        className="text-white/70 hover:text-teal transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {label}
                                    </a>
                                ))}
                                <a
                                    href="#kontakt"
                                    className="mt-2 px-6 py-3 bg-teal text-navy-dark font-semibold text-center rounded-xl"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Bezplatná konzultácia
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Hero-specific background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Animated gradient mesh */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-30">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal/20 via-transparent to-transparent blur-[120px] animate-float" />
                        <div className="absolute inset-10 rounded-full bg-gradient-to-tl from-teal/10 via-transparent to-transparent blur-[100px] animate-float-delayed" />
                    </div>
                    {/* Radial lines */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 75% 50%, rgba(78,205,196,0.4) 0%, transparent 50%)`,
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                        {/* Left: Text content */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8"
                            >
                                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                <span className="text-teal text-sm font-medium">
                                    Strategický partner pre zdravotníctvo
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-8"
                            >
                                Budujeme dôveru a&nbsp;autoritu{" "}
                                <span className="text-gradient">vašej praxe</span>{" "}
                                v&nbsp;očiach pacientov
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10"
                            >
                                Strategický partner pre lekárov, kliniky a ambulancie, ktoré hľadajú komplexné
                                riešenia v&nbsp;oblasti marketingu, vizuálnej identity a akvizície pacientov.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-4 mb-12"
                            >
                                <a
                                    href="#kontakt"
                                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-teal text-navy-dark font-semibold text-lg rounded-2xl hover:bg-teal/90 transition-all duration-300 animate-pulse-glow cursor-pointer"
                                >
                                    Bezplatná konzultácia
                                    <ArrowRight
                                        size={20}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </a>
                                <a
                                    href="#sluzby"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 glass rounded-2xl text-white/80 hover:text-teal transition-all duration-300 hover:border-teal/30"
                                >
                                    Naše služby
                                    <ChevronDown size={20} />
                                </a>
                            </motion.div>

                            {/* Social proof strip */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: 0.8 }}
                                className="flex items-center gap-6 text-white/30 text-sm"
                            >
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-navy-dark bg-gradient-to-br from-teal/30 to-teal/10 flex items-center justify-center"
                                        >
                                            <span className="text-[10px] font-bold text-teal/60">
                                                {["MU", "PK", "DL", "SK"][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <span>Dôverujú nám kliniky po celom Slovensku</span>
                            </motion.div>
                        </div>

                        {/* Right: Floating UI elements */}
                        <div className="relative hidden lg:block lg:col-span-4 h-[420px]">
                            {/* Orbiting ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 rounded-full border border-teal/[0.07]"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 rounded-full border border-dashed border-teal/[0.05]"
                            />

                            {/* Main metric card */}
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute top-12 left-8 right-16"
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="glass-strong rounded-2xl p-6 glow-teal"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Návratnosť investícií</span>
                                        <span className="text-xs text-teal bg-teal/10 px-2.5 py-1 rounded-full font-medium">+247%</span>
                                    </div>
                                    <div className="flex items-end gap-1.5 h-14">
                                        {[35, 45, 30, 55, 70, 60, 85, 75, 90, 80, 95, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                                                className="flex-1 bg-gradient-to-t from-teal/40 to-teal/80 rounded-sm"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-3 text-[10px] text-white/25">
                                        <span>Jan</span>
                                        <span>Dec</span>
                                    </div>
                                    <div className="flex justify-between mt-3 text-[10px] text-white/25">
                                        <span>Jan</span>
                                        <span>Dec</span>
                                    </div>
                                    {/* Animated Graph Overlay or Replacement? 
                                        Actually the existing bar chart is nice. 
                                        Let's add the AnimatedGraph as a subtle background line or just use it elsewhere. 
                                        User asked for "grownig graph at ROI". The current bars grow. 
                                        Let's keep the bars but make them loop or pulse? 
                                        The user specifically liked "graf co roste u ROI". 
                                        I will add a small AnimatedGraph icon next to the percentage.
                                    */}

                                </motion.div>
                            </motion.div>

                            {/* Patient satisfaction card */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.7 }}
                                className="absolute top-52 right-0 w-52"
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="glass-strong rounded-2xl p-5"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center">
                                            <BarChart3 size={18} className="text-teal" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40">Spokojnosť</p>
                                            <p className="text-lg font-bold text-teal">98,2%</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "98%" }}
                                            transition={{ delay: 1.2, duration: 1.5 }}
                                            className="h-full bg-gradient-to-r from-teal/60 to-teal rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* New patients card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0, duration: 0.7 }}
                                className="absolute bottom-28 left-0 w-56"
                            >
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1 }}
                                    className="glass-strong rounded-2xl p-5 will-change-transform"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center">
                                            <Users size={18} className="text-teal" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40">Noví pacienti / mes.</p>
                                            <p className="text-lg font-bold">+127</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-teal flex items-center gap-1">
                                            <ArrowRight size={10} className="rotate-[-45deg]" />
                                            32%
                                        </span>
                                        <span className="text-white/30">oproti min. mesiacu</span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Floating service badges */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                                className="absolute bottom-12 right-12"
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                                    className="w-14 h-14 glass-strong rounded-2xl flex items-center justify-center glow-teal will-change-transform"
                                >
                                    <Target size={24} className="text-teal" />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4, duration: 0.5 }}
                                className="absolute top-4 right-4"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
                                    className="w-12 h-12 glass-strong rounded-xl flex items-center justify-center will-change-transform"
                                >
                                    <Globe size={20} className="text-teal/60" />
                                </motion.div>
                            </motion.div>


                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <Section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                value: 80,
                                suffix: " %",
                                label: "Pacientov hľadá lekára online pred prvou návštevou",
                            },
                            {
                                value: 72,
                                suffix: " %",
                                label: "Dôveruje online recenziám rovnako ako odporúčaniam",
                            },
                            {
                                value: 45,
                                suffix: " %",
                                label: "Vyššia návratnosť pacientov s aktívnou komunikáciou",
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                custom={i}
                                className="glass rounded-2xl p-8 text-center hover:glow-teal transition-all duration-500 group"
                            >
                                <div className="text-4xl lg:text-5xl font-bold text-teal mb-3">
                                    <Counter target={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════ PHILOSOPHY ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="filozofia">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div variants={fadeUp} custom={0} className="mb-6">
                            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                                Filozofia
                            </span>
                        </motion.div>
                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            className="text-3xl lg:text-5xl font-bold leading-tight mb-8"
                        >
                            Marketing pre zdravotníctvo, ktorý rozumie{" "}
                            <span className="text-gradient">hodnote vášho času</span>
                        </motion.h2>
                        <motion.div variants={fadeUp} custom={2} className="space-y-6">
                            <p className="text-lg text-white/50 leading-relaxed">
                                Mediconect nie je len ďalšia marketingová agentúra. Sme tím špecialistov, ktorí
                                preberajú plnú zodpovednosť za vašu digitálnu stopu. Chápeme, že lekár nie je
                                marketér – vaším poslaním je starostlivosť o zdravie, naším poslaním je starostlivosť
                                o vašu prosperitu a dobré meno.
                            </p>
                            <p className="text-lg text-white/50 leading-relaxed">
                                Využívame vaše minimum času na dosiahnutie maximálnych výsledkov. Či už ide o tvorbu
                                vizuálnej identity, správu sociálnych sietí alebo sofistikovanú automatizáciu, každý
                                krok konzultujeme efektívne a s ohľadom na vašu vyťaženosť.
                            </p>
                        </motion.div>
                        {/* Decorative accent line */}
                        <motion.div
                            variants={fadeUp}
                            custom={3}
                            className="mt-12 h-px bg-gradient-to-r from-teal/50 via-teal/20 to-transparent"
                        />
                    </div>
                </div>
            </Section>

            {/* ═══════════════ SERVICES (Interactive Showcase) ═══════════════ */}
            <ServicesShowcase />

            {/* ═══════════════ CASE STUDY ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="case-study">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <CaseStudyDashboard />
                </div>
            </Section>

            {/* ═══════════════ PROCESS ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="proces">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
                        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                            Proces
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-4">
                            Ako prebieha <span className="text-gradient">spolupráca</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Nezáväzná konzultácia zadarmo",
                                desc: "Hovor, kde sa navzájom dozvieme, či sme pre seba správna voľba.",
                            },
                            {
                                step: "02",
                                title: "Audit a analýza",
                                desc: "Vykonáme prieskum vašej online prítomnosti a identifikujeme príležitosti.",
                            },
                            {
                                step: "03",
                                title: "Stratégia na mieru",
                                desc: "Konkrétny plán prispôsobený vašej špecializácii a cieľom.",
                            },
                            {
                                step: "04",
                                title: "Realizácia a výsledky",
                                desc: "Začneme spoluprácu a pravidelne reportujeme merateľné výsledky.",
                            },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeUp} custom={i} className="relative group">
                                <div className="glass rounded-2xl p-8 h-full hover:glow-teal transition-all duration-500 hover:border-teal/25">
                                    <div className="text-5xl font-black text-teal/15 group-hover:text-teal/30 transition-colors duration-300 mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3 group-hover:text-teal transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                                {/* Connector line (hidden on last) */}
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-teal/30 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════ VALUES ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
                        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                            Prečo Mediconect
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-4">
                            Naše <span className="text-gradient">hodnoty</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <Clock size={28} />,
                                title: "Efektivita času",
                                desc: "Vieme, že váš čas je vzácny. Naše procesy sú nastavené tak, aby sme vás zaťažovali minimálne.",
                            },
                            {
                                icon: <BarChart3 size={28} />,
                                title: "Data a stratégia",
                                desc: "Nerobíme marketing na základe pocitov. Každý krok je podložený dátami a smeruje k dlhodobému cieľu.",
                            },
                            {
                                icon: <Layers size={28} />,
                                title: "Komplexnost",
                                desc: "Od prvého loga až po vlastné call centrum – sme jediným partnerom, ktorého pre svoj rast potrebujete.",
                            },
                            {
                                icon: <Shield size={28} />,
                                title: "Etika a bezpečnosť",
                                desc: "Všetky naše kampane a systémy sú v plnom súlade s GDPR a lekárskou etikou.",
                            },
                        ].map((val, i) => (
                            <motion.div
                                key={i}
                                variants={scaleIn}
                                custom={i}
                                className="glass rounded-2xl p-8 flex gap-6 items-start group hover:glow-teal transition-all duration-500 hover:border-teal/25"
                            >
                                <div className="w-14 h-14 rounded-xl bg-teal/10 flex-shrink-0 flex items-center justify-center text-teal group-hover:bg-teal/20 transition-all duration-300">
                                    {val.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-teal transition-colors duration-300">
                                        {val.title}
                                    </h3>
                                    <p className="text-white/45 leading-relaxed text-sm">{val.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════ CTA ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="kontakt">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        variants={fadeIn}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal/15 via-navy to-navy-dark" />
                        <div className="absolute top-0 right-0 w-80 h-80 bg-teal/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal/5 rounded-full blur-[80px]" />

                        <div className="relative z-10 glass-strong rounded-3xl p-12 lg:p-20 text-center">
                            <motion.h2
                                variants={fadeUp}
                                custom={0}
                                className="text-3xl lg:text-5xl font-bold leading-tight mb-6"
                            >
                                Otvorme diskusiu o budúcnosti{" "}
                                <span className="text-gradient">vašej kliniky</span>
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                custom={1}
                                className="text-lg text-white/50 leading-relaxed max-w-3xl mx-auto mb-10"
                            >
                                Každá spolupráca v Mediconect začína hĺbkovým pochopením vašich potrieb. Ak
                                hľadáte partnera, ktorý sa postará o váš rast s rovnakou precíznosťou, s akou vy
                                pristupujete k svojim pacientom, radi sa s vami stretneme na nezáväznej konzultácii.
                            </motion.p>
                            <motion.div variants={fadeUp} custom={2}>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-teal text-navy-dark font-bold text-lg rounded-2xl hover:bg-teal/90 transition-all duration-300 animate-pulse-glow cursor-pointer"
                                >
                                    Bezplatná konzultácia
                                    <ArrowRight
                                        size={22}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </button>
                            </motion.div>

                            {/* Contact info */}
                            <motion.div
                                variants={fadeUp}
                                custom={3}
                                className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-white/40 text-sm"
                            >
                                <a
                                    href="mailto:info@mediconect.sk"
                                    className="flex items-center gap-2 hover:text-teal transition-colors"
                                >
                                    <Mail size={16} />
                                    info@mediconect.sk
                                </a>
                                <a
                                    href="tel:+421948220845"
                                    className="flex items-center gap-2 hover:text-teal transition-colors"
                                >
                                    <Phone size={16} />
                                    +421 948 220 845
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════ DIRECTOR / TRUST ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="tym">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
                        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                            Váš kontaktný partner
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-4">
                            Osobný prístup na{" "}
                            <span className="text-gradient">prvom mieste</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        custom={1}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto"
                    >
                        {/* Left: Photo */}
                        <div className="relative flex justify-center">
                            {/* Glow behind photo */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal/15 rounded-full blur-[80px]" />
                            {/* Decorative ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-teal/10"
                            />
                            <div className="relative w-72 h-80 lg:w-80 lg:h-[400px]">
                                <Image
                                    src="/reditel.png"
                                    alt="PhDr. Víťazoslav Struhár"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    sizes="(max-width: 1024px) 288px, 320px"
                                />
                            </div>
                        </div>

                        {/* Right: Info card */}
                        <div className="space-y-8">
                            <div className="glass-strong rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                                {/* Background glow */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal/8 rounded-full blur-[60px]" />

                                <div className="relative z-10">
                                    {/* Quote */}
                                    <div className="mb-8">
                                        <div className="text-teal text-4xl font-serif leading-none mb-4">&ldquo;</div>
                                        <p className="text-white/80 text-lg leading-relaxed italic">
                                            Každá klinika je unikátna a zaslúži si individuálny prístup. Naším cieľom je pochopiť vaše potreby a premeniť ich na merateľné výsledky.
                                        </p>
                                    </div>

                                    {/* Name & Title */}
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-xl font-bold text-white">
                                            PhDr. Víťazoslav Struhár
                                        </h3>
                                        <p className="text-teal font-medium mt-1">
                                            Marketingový riaditeľ
                                        </p>
                                    </div>

                                    {/* Contact links */}
                                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                        <a
                                            href="tel:+421948220845"
                                            className="flex items-center gap-3 px-5 py-3 rounded-xl glass hover:border-teal/30 border border-transparent transition-all duration-300 group"
                                        >
                                            <Phone size={18} className="text-teal" />
                                            <span className="text-white/70 group-hover:text-white transition-colors text-sm whitespace-nowrap">
                                                +421 948 220 845
                                            </span>
                                        </a>
                                        <a
                                            href="mailto:info@mediconect.sk"
                                            className="flex items-center gap-3 px-5 py-3 rounded-xl glass hover:border-teal/30 border border-transparent transition-all duration-300 group"
                                        >
                                            <Mail size={18} className="text-teal" />
                                            <span className="text-white/70 group-hover:text-white transition-colors text-sm">
                                                info@mediconect.sk
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════ FAQ ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10" id="faq">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
                        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                            FAQ
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-4">
                            Často kladené <span className="text-gradient">otázky</span>
                        </h2>
                    </motion.div>

                    <motion.div variants={fadeUp} custom={1}>
                        <FAQItem
                            question="Koľko môjho času si bude vyžadovať správa marketingu?"
                            answer="Vieme, že váš čas je najcennejší v ambulancii pri pacientoch. Naším cieľom je odbremeniť vás. Po úvodnom nastavení stratégie preberáme operatívu na seba. Od vás budeme potrebovať len občasné schválenie kľúčových materiálov alebo spätnú väzbu na kvalitu dopytov. Marketing beží na pozadí, zatiaľ čo vy pracujete."
                        />
                        <FAQItem
                            question="Ako komunikujete citlivé zdravotnícke alebo estetické témy?"
                            answer="Všetky naše kampane a komunikácia prechádzajú prísnym interným procesom, ktorý zabezpečuje súlad s etickými normami a legislatívnymi požiadavkami. Máme skúsenosti so špecifikami zdravotníckeho marketingu a vieme, kde sú hranice."
                        />
                        <FAQItem
                            question="Je vaša stratégia vhodná aj pre menšiu špecializovanú ambulanciu?"
                            answer="Absolútne. Naše riešenia sú modulárne a škálovateľné. Či už ste veľká klinika alebo menšia špecializovaná ambulancia, prispôsobíme stratégiu vášmu rozpočtu a cieľom tak, aby ste dosahovali merateľné výsledky."
                        />
                        <FAQItem
                            question="Kedy môžem očakávať prvé výsledky a viete mi ich zaručiť?"
                            answer="Prvé výsledky v podobe zvýšeného trafficu a dopytov sa zvyčajne dostavujú v priebehu 4-8 týždňov. Dlhodobé budovanie autority a značky je proces na niekoľko mesiacov. Negarantujeme konkrétne čísla, ale garantujeme transparentný reporting a neustálu optimalizáciu."
                        />
                        <FAQItem
                            question="Neriskujem pri online reklame zablokovanie účtu alebo problémy s predpismi?"
                            answer="Nie. Máme rozsiahle skúsenosti s reklamou v regulovanom zdravotníckom sektore. Poznáme pravidlá reklamných platforiem aj legislatívne požiadavky. Vaše účty sú v bezpečí a všetky kampane sú v súlade s predpismi."
                        />
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <a href="#" className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/logo 2.png"
                                    alt="Mediconnect"
                                    width={40}
                                    height={40}
                                    className="rounded-xl"
                                />
                                <span className="text-xl font-bold tracking-tight">
                                    Medi<span className="text-teal">connect</span>
                                </span>
                            </a>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                Strategický partner pre kliniky a ambulancie v oblasti marketingu, vizuálnej
                                identity a akvizície pacientov.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold text-white/80 mb-4">Kontakt</h4>
                            <div className="space-y-3 text-sm text-white/40">
                                <a
                                    href="mailto:info@mediconect.sk"
                                    className="flex items-center gap-2 hover:text-teal transition-colors"
                                >
                                    <Mail size={14} />
                                    info@mediconect.sk
                                </a>
                                <a
                                    href="tel:+421948220845"
                                    className="flex items-center gap-2 hover:text-teal transition-colors"
                                >
                                    <Phone size={14} />
                                    +421 948 220 845
                                </a>
                            </div>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-semibold text-white/80 mb-4">Právne</h4>
                            <div className="space-y-3 text-sm text-white/40">
                                <a href="#" className="block hover:text-teal transition-colors">
                                    Ochrana súkromia
                                </a>
                                <a href="#" className="block hover:text-teal transition-colors">
                                    GDPR
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/5 pt-8 text-center text-sm text-white/30">
                        © 2026 Mediconect. Všetky práva vyhradené.
                    </div>
                </div>
            </footer>

            {/* ═══════════════ CONTACT MODAL ═══════════════ */}
            <ContactModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
