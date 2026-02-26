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
import GlowCard from "../components/GlowCard";
import ValuesStackingCards from "@/components/ValuesStackingCards";
import MagicalButton from "../components/MagicalButton";
import TypewriterText from "../components/TypewriterText";

import ServicesNebula from "../components/ServicesNebula";
import ServicesCarousel from "../components/ServicesCarousel";

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
        <span ref={ref} className="font-kanit tabular-nums">
            {prefix}{count.toLocaleString("sk-SK")}{suffix}
        </span>
    );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
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
                        <div className="pb-6 text-white/60 leading-relaxed max-w-3xl space-y-4">{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Newsletter Form ─── */
function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [gdpr, setGdpr] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && gdpr) {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.trim() }),
                });

                if (response.ok) {
                    setIsSubmitted(true);
                } else {
                    const data = await response.json();
                    setError(data.error || "Niekde nastala chyba, skúste to prosím znova.");
                }
            } catch (err) {
                setError("Chyba pripojenia. Skontrolujte prosím svoje internetové pripojenie.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm flex flex-col items-center justify-center p-6 bg-teal/10 border border-teal/20 rounded-2xl text-center"
            >
                <div className="w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center mb-3">
                    <Check size={24} className="text-teal" />
                </div>
                <h4 className="text-white font-bold font-kanit text-lg mb-1">Ste na zozname!</h4>
                <p className="text-white/60 text-sm font-stolzl">
                    Ďakujeme. Najbližšie marketingové tipy pošleme do vašej schránky.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-lg">
            <form className="relative flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div className="relative flex items-center w-full">
                    <input
                        type="email"
                        placeholder="Váš e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-full py-5 pl-8 pr-32 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/50 transition-all font-stolzl text-base h-16 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !gdpr}
                        className="absolute right-2 px-6 h-12 bg-teal text-navy-dark font-bold font-kanit text-base rounded-full hover:bg-teal/90 hover:scale-105 transition-all duration-300 pointer flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Pridávam..." : "Odoberať"}
                    </button>
                </div>

                {/* GDPR checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group mt-2 ml-4">
                    <div className="relative mt-0.5">
                        <input
                            type="checkbox"
                            name="gdpr-newsletter"
                            required
                            checked={gdpr}
                            onChange={(e) => setGdpr(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-teal peer-checked:border-teal transition-all flex items-center justify-center">
                            {gdpr && <Check size={14} className="text-navy-dark" />}
                        </div>
                    </div>
                    <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                        Súhlasím so spracovaním osobných údajov na účely zasielania noviniek v súlade s dokumentom{" "}
                        <a href="/ochrana-osobnych-udajov" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline" onClick={(e) => e.stopPropagation()}>
                            Ochrana osobných údajov
                        </a>.
                    </span>
                </label>
            </form>
            {error && (
                <p className="text-red-400 text-sm mt-3 text-center lg:text-left ml-4 font-stolzl">{error}</p>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/*                  MAIN PAGE                     */
/* ═══════════════════════════════════════════════ */
export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
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
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Scrolled state (transparency)
            setScrolled(currentScrollY > 50);

            // Hide/Show logic removed for mobile as requested.
            // Navbar will just be absolute on mobile (scrolls away) and fixed on desktop.
            setIsHidden(false);

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-navy-dark bg-grid relative overflow-hidden">
            {/* ─── Background Orbs ─── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] bg-teal/3 rounded-full blur-[150px] animate-float-delayed" />
                <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-teal/4 rounded-full blur-[100px] animate-float" />
            </div>

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`absolute md:fixed top-0 left-0 right-0 z-50 transition-all duration-500 border ${scrolled ? "glass-strong border-teal/20 shadow-lg shadow-black/20" : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center group">
                            <Image
                                src="/nove-logo.png"
                                alt="Mediconect"
                                width={180}
                                height={45}
                                priority
                                className="h-11 w-auto transition-all duration-300"
                            />
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

                        {/* Mobile hamburger removed as per request */}
                    </div>
                </div>

                {/* Mobile menu removed as per request */}
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
                                <span className="text-teal text-sm font-medium font-kanit tracking-wide">
                                    Zdravotnícky marketing založený na dátach
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight mb-8"
                            >
                                Pomôžeme vám urobiť z&nbsp;vašej{" "}
                                <span className="text-gradient">ambulantnej praxe</span>{" "}
                                dôveryhodnú a&nbsp;rešpektovanú značku
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl mb-10"
                            >
                                Strategický partner pre lekárov, kliniky a ambulancie, ktoré hľadajú komplexné
                                riešenia v&nbsp;oblasti brandu, vizuálnej identity aj akvizície pacientov.
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
                                <span>Prepojíme vás s pacientmi prostredníctvom inovatívnych riešení digitálneho marketingu a navýšime príjmy vašej klinickej praxe. Aby ste sa vy mohli naplno venovať liečbe svojich pacientov.</span>
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
                                        <span className="text-xs text-white/40 uppercase tracking-wider font-medium font-kanit">Návratnosť investícií</span>
                                        <span className="text-xs text-teal bg-teal/10 px-2.5 py-1 rounded-full font-medium font-kanit">+247%</span>
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
                                            <p className="text-xs text-white/40 font-kanit">Spokojnosť</p>
                                            <p className="text-lg font-bold text-teal font-kanit">98,2%</p>
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
                                            <p className="text-xs text-white/40 font-kanit">Noví pacienti / mes.</p>
                                            <p className="text-lg font-bold font-kanit">+127</p>
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
                    className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2"
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
                                value: 72,
                                suffix: " %",
                                label: "72% pacientov používa sociálne siete na prieskum skôr, než sa objedná k novému lekárovi.",
                            },
                            {
                                value: 41,
                                suffix: " %",
                                label: "41% spotrebiteľov tvrdí, že sociálne siete priamo ovplyvnili ich výber konkrétnej nemocnice alebo lekára.",
                            },
                            {
                                value: 90,
                                suffix: " %",
                                label: "90% mladých dospelých (18–24) dôveruje zdravotným informáciám zdieľaným ich rovesníkmi na sieťach.",
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
                                Naša filozofia
                            </span>
                        </motion.div>
                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            className="text-3xl lg:text-5xl font-bold leading-tight mb-8"
                        >
                            Marketing, ktorý nie je o lajkoch. Je o{" "}
                            <span className="text-gradient">dôvere a konverzii.</span>
                        </motion.h2>
                        <motion.div variants={fadeUp} custom={2} className="space-y-6">
                            <p className="text-lg text-white/50 leading-relaxed">
                                Mediconect nie je len ďalšia marketingová agentúra. Sme tím špecialistov, ktorí preberajú plnú zodpovednosť za váš digitálny obraz. V&nbsp;Mediconecte veríme, že za každou úspešnou ambulanciou stojí silný príbeh a dôvera pacientov. Naším cieľom je pomôcť vám tento príbeh vyrozprávať moderne a profesionálne. Chápeme, že lekár nie je marketér – vaším poslaním je starostlivosť o zdravie, naším poslaním je starostlivosť o vašu prosperitu, dobré meno a&nbsp;konzistentný kmeň pacientov.
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
            <div id="sluzby" className="absolute -mt-24 h-24 w-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="block lg:hidden"
            >
                <ServicesCarousel />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="hidden lg:block py-20"
            >
                <ServicesNebula />
            </motion.div>


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
                                title: "Nezáväzná bezplatná konzultácia",
                                desc: "Krátky hovor, kde zistíme, ako vieme zabezpečiť rast vašej lekárskej praxe.",
                            },
                            {
                                step: "02",
                                title: "Vykonáme prieskum vašej online prítomnosti a identifikujeme príležitosti",
                                desc: "Upgradujeme kontakty, doplníme emaily, otestujeme dostupnosť a vytvoríme „zdroj potenciálu“, cieľové skupiny, tematické okruhy kampaní, tón komunikácie a KPI.",
                            },
                            {
                                step: "03",
                                title: "Stratégia na mieru",
                                desc: "Konkrétny plán prispôsobený vašej špecializácii a cieľom: Emailing, web/SEO, sociálne siete, CRM s minimálnym zaťažením vášho tímu.",
                            },
                            {
                                step: "04",
                                title: "Realizácia a výsledky",
                                desc: "Začneme spoluprácu a pravidelne reportujeme merateľné výsledky. Máte detailný prehľad o efektivite a výstupoch z vášho digitálneho marketingu.",
                            },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeUp} custom={i} className="relative group">
                                <GlowCard className="h-full">
                                    <div className="glass rounded-2xl p-8 h-full transition-all duration-500">
                                        <div className="text-5xl font-black text-teal/15 group-hover:text-teal/30 transition-colors duration-300 mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-3 group-hover:text-teal transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </GlowCard>
                                {/* Connector line (hidden on last) */}
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-teal/30 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══════════════ VALUES (5I Stacking Cards) ═══════════════ */}
            <Section className="py-24 lg:py-32 relative z-10 overflow-visible">

                {/* Parallax floating particles - background effects */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <span className="text-teal text-sm font-semibold uppercase tracking-widest font-kanit">
                            Prečo Mediconect
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-4 font-kanit">
                            <span className="text-gradient">Hodnoty</span>, na ktorých staviame váš úspech
                        </h2>
                        <p className="mt-6 text-white/60 text-lg leading-relaxed font-stolzl">
                            V Mediconecte nerobíme marketing od stola. Veríme, že moderná medicína si zaslúži modernú komunikáciu. Našich 5 pilierov (5I) tvorí základ každej stratégie, ktorú pre vás pripravujeme:
                        </p>
                    </motion.div>

                    {/* Vložená nová komponenta se skládacími kartami s fade-in animací */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        custom={1}
                    >
                        <ValuesStackingCards />
                    </motion.div>
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
                        {/* Background glow & Mesh Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-navy to-navy-dark" />
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.15),transparent_50%)] animate-pulse" />
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-blob" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />

                        {/* Particles - Fixed positions to prevent hydration mismatch */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[
                                { top: "15%", left: "10%", size: 4, delay: 0, dur: 6 },
                                { top: "35%", left: "85%", size: 3, delay: 1, dur: 8 },
                                { top: "65%", left: "18%", size: 2, delay: 2, dur: 7 },
                                { top: "80%", left: "75%", size: 5, delay: 0.5, dur: 9 },
                                { top: "45%", left: "55%", size: 3, delay: 1.5, dur: 6.5 },
                                { top: "90%", left: "30%", size: 2, delay: 3, dur: 8 },
                                { top: "10%", left: "65%", size: 4, delay: 2.5, dur: 7.5 },
                                { top: "25%", left: "40%", size: 3, delay: 4, dur: 6 },
                                { top: "75%", left: "90%", size: 2.5, delay: 1.2, dur: 5.5 },
                                { top: "5%", left: "25%", size: 3.5, delay: 3.5, dur: 7 },
                                { top: "60%", left: "5%", size: 2, delay: 0.8, dur: 8.5 },
                                { top: "95%", left: "50%", size: 4, delay: 2.2, dur: 6.8 },
                            ].map((p, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-teal/40"
                                    style={{
                                        top: p.top,
                                        left: p.left,
                                        width: p.size,
                                        height: p.size,
                                    }}
                                    animate={{
                                        y: [0, -30, 0],
                                        opacity: [0.2, 0.8, 0.2],
                                    }}
                                    transition={{
                                        duration: p.dur,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: p.delay,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10 glass-strong rounded-3xl px-4 py-10 sm:p-12 lg:p-20 text-center">
                            <motion.h2
                                variants={fadeUp}
                                custom={0}
                                className="text-2xl sm:text-3xl lg:text-5xl font-bold font-kanit leading-tight mb-6"
                            >
                                Vaša odbornosť si zaslúži správnu
                                <span className="text-gradient block mt-2 lg:mt-4 whitespace-nowrap">
                                    <TypewriterText words={["viditeľnosť", "pozornosť", "prezentáciu"]} />
                                </span>
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                custom={1}
                                className="text-base sm:text-lg text-white/50 leading-relaxed max-w-3xl font-stolzl mx-auto mb-10"
                            >
                                Spájame medicínsku etiku s dátovou inteligenciou. Rezervujte si 30-minútovú online konzultáciu, kde spoločne identifikujeme bariéry rastu vašej ambulancie a navrhneme riešenia, ktoré fungujú v praxi.
                            </motion.p>
                            <motion.div variants={fadeUp} custom={2} className="flex flex-col items-center gap-8">
                                <MagicalButton onClick={() => setModalOpen(true)}>
                                    Rezervovať termín stretnutia
                                </MagicalButton>

                                {/* Floating Contact Cards (Desktop only) */}
                                <div className="hidden lg:flex gap-6 mt-4">
                                    <div className="glass px-5 py-3 rounded-full flex items-center gap-3 text-sm text-teal/80 hover:text-teal hover:bg-teal/10 transition-all duration-300">
                                        <Mail size={16} />
                                        info@mediconect.sk
                                    </div>
                                    <div className="glass px-5 py-3 rounded-full flex items-center gap-3 text-sm text-teal/80 hover:text-teal hover:bg-teal/10 transition-all duration-300">
                                        <Phone size={16} />
                                        +421 948 220 845
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact info - Mobile only */}
                            <motion.div
                                variants={fadeUp}
                                custom={3}
                                className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-white/40 text-sm lg:hidden"
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
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[331px] h-[331px] bg-teal/15 rounded-full blur-[80px]" />
                            {/* Decorative ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[368px] h-[368px] rounded-full border border-teal/10"
                            />
                            <div className="relative w-[331px] h-[368px] lg:w-[368px] lg:h-[460px]">
                                <Image
                                    src="/tomas_final.png"
                                    alt="Tomáš Struhár"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    sizes="(max-width: 1024px) 331px, 368px"
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
                                            Od loga až po plnú čakáreň. Komplexne riadime váš marketing, sociálne siete a automatizovaný nábor pacientov. Vy liečite, my budujeme váš úspech.
                                        </p>
                                    </div>

                                    {/* Name & Title */}
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-xl font-bold text-white">
                                            Tomáš Kuchta
                                        </h3>
                                        <p className="text-teal font-medium mt-1">
                                            Sales & Operation Director
                                        </p>
                                    </div>

                                    {/* Contact links */}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
                                        <a
                                            href="tel:+421948220845"
                                            className="flex-shrink-0 flex items-center justify-center gap-3 px-5 py-3 rounded-xl glass hover:border-teal/30 border border-transparent transition-all duration-300 group"
                                        >
                                            <Phone size={18} className="text-teal" />
                                            <span className="text-white/70 group-hover:text-white transition-colors text-sm whitespace-nowrap">
                                                +421 948 220 845
                                            </span>
                                        </a>
                                        <a
                                            href="mailto:info@mediconect.sk"
                                            className="flex-shrink-0 flex items-center justify-center gap-3 px-5 py-3 rounded-xl glass hover:border-teal/30 border border-transparent transition-all duration-300 group"
                                        >
                                            <Mail size={18} className="text-teal" />
                                            <span className="text-white/70 group-hover:text-white transition-colors text-sm whitespace-nowrap">
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
                            answer="Po úvodnom nastavení stratégie preberáme operatívu (kampane, obsah, reporting aj optimalizáciu). Od vás potrebujeme len občasné schválenie kľúčových materiálov a spätnú väzbu na kvalitu dopytov. Marketing beží na pozadí, kým vy sa venujete pacientom."
                        />
                        <FAQItem
                            question="Ako rýchlo uvidím prvé výsledky marketingu?"
                            answer="Pri výkonnostných kampaniach sa prvé merateľné výsledky (návštevnosť a dopyty) zvyčajne objavia do 4–8 týždňov. Email marketing a práca s databázou môžu priniesť výsledky aj po prvej kampani. Budovanie autority je dlhodobý proces na niekoľko mesiacov. Spravidla si nechávame prvé 3 mesiace na optimálne nastavenie a testovanie všetkých systémov a databázy."
                        />
                        <FAQItem
                            question="Garantujete konkrétne výsledky (počet pacientov, dopytov)?"
                            answer="Negarantujeme nereálne čísla. Garantujeme transparentný reporting, jasne definované KPI a priebežnú optimalizáciu. Cieľom je stabilný a merateľný rast pri zachovaní reputácie ambulancie."
                        />
                        <FAQItem
                            question="Je vaša stratégia vhodná aj pre menšiu špecializovanú ambulanciu?"
                            answer="Áno. Riešenia sú modulárne a škálovateľné – od základnej stratégie a lokálneho SEO až po výkonnostné kampane, email marketing a automatizácie. Stratégiu prispôsobíme rozpočtu aj cieľom ambulancie."
                        />
                        <FAQItem
                            question="Ako komunikujete citlivé zdravotnícke alebo estetické témy?"
                            answer="Obsah a kampane pripravujeme v súlade s etickými normami, legislatívou a pravidlami reklamných platforiem. Používame profesionálny, edukatívny tón bez zavádzajúcich sľubov. Prioritou je dôvera a reputačná bezpečnosť."
                        />
                        <FAQItem
                            question="Neriskujem pri online reklame zablokovanie účtu alebo problémy s predpismi?"
                            answer="Nie. Pri regulovanom zdravotníckom segmente poznáme pravidlá platforiem (napr. Meta/Google) aj legislatívne hranice. Kampane nastavujeme tak, aby boli v súlade s predpismi a minimalizovali riziko zamietnutia alebo blokácie."
                        />
                        <FAQItem
                            question="Ako meriate úspešnosť marketingu v ambulancii?"
                            answer="Sledujeme najmä počet a kvalitu dopytov, cenu za dopyt/pacienta, konverzné pomery, návratnosť investície (ROI) a výkonnosť kanálov. Reporting je zrozumiteľný a orientovaný na rozhodovanie."
                        />
                        <FAQItem
                            question="Čo ak už máme marketingovú agentúru alebo interný tím?"
                            answer="Môžeme doplniť to, čo chýba: audit, výkonové kampane, práca s databázou a email marketing, CRM a automatizácie alebo strategické vedenie pre zdravotnícky segment. Spolupráca je možná aj popri existujúcom dodávateľovi."
                        />
                        <FAQItem
                            question="Koľko stojí marketing pre ambulanciu a kliniku?"
                            answer="Cena závisí od rozsahu (web/SEO, kampane, email marketing, CRM, obsah) a cieľov. Po konzultácii pripravíme návrh stratégie a odporúčaný rozpočet tak, aby dával ekonomický zmysel. Na rozdiel od veľkých reklamných agentúr so širokým rozsahom projektov, my sa sústreďujeme len na jeden segment. Na rozdiel od veľkých marketingových agentúr, ktoré si účtujú tisícky eur za svoje služby, my ideme cestou ekonomicky prívetivých balíkov a riešení, ktoré dokážeme flexibilne prispôsobiť vašim individuálnym potrebám."
                        />
                        <FAQItem
                            question="Ako začať spoluprácu?"
                            answer="Začneme krátkou nezáväznou konzultáciou, kde zhodnotíme aktuálny stav, ciele a najrýchlejšie príležitosti rastu. Následne pripravíme návrh stratégie a implementačný plán."
                        />
                        <FAQItem
                            question="Ako sú chránené kontakty a databázy pacientov, s ktorými pracujete?"
                            answer={
                                <>
                                    <p>Ochrana osobných údajov je základom každej spolupráce. Databázy pacientov spracúvame výlučne v súlade s GDPR a platnou slovenskou legislatívou. Ambulancia zostáva prevádzkovateľom údajov a výhradným vlastníkom databázy – my vystupujeme ako sprostredkovateľ na základe riadnej zmluvy o spracúvaní osobných údajov (DPA).</p>
                                    <p>Využívame zabezpečené cloudové riešenia v rámci EÚ, šifrovaný prenos dát (SSL/TLS), viacfaktorové overovanie prístupu a prístupové práva na princípe „need-to-know“. Údaje pravidelne zálohujeme, evidujeme prístupy a pracujeme iba s rozsahom údajov nevyhnutným na definovaný účel.</p>
                                    <p>Databázy nikdy nepredávame ani nepoužívame na vlastné marketingové aktivity. Transparentnosť, minimalizácia rizika a reputačná ochrana ambulancie sú pre nás rovnako dôležité ako samotný marketingový výkon.</p>
                                    <p>Bezpečnosť údajov nevnímame ako formalitu – ale ako súčasť profesionálnej zodpovednosti voči pacientom.</p>
                                </>
                            }
                        />
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════ NEWSLETTER (The Insider Footer) ═══════════════ */}
            <Section className="relative z-10 pb-16 lg:pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
                    >
                        {/* Background glow for the newsletter box */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* Text Content */}
                        <div className="relative z-10 max-w-xl text-center lg:text-left">
                            <h3 className="text-2xl lg:text-3xl font-bold font-kanit text-white mb-4">
                                Zákulisie úspešných ambulancií.
                            </h3>
                            <p className="text-white/60 text-sm md:text-base font-stolzl leading-relaxed">
                                Udržte si náskok. Prinášame overené marketingové postupy a dáta, z ktorých urobíte informované rozhodnutia pre vašu prax. Priamo na váš e-mail, bez zbytočného spamu.
                            </p>
                        </div>

                        {/* Input Form */}
                        <div className="relative z-10 w-full lg:w-auto flex-shrink-0 flex items-center justify-center lg:justify-end min-h-[80px]">
                            <NewsletterForm />
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div className="flex flex-col items-start text-left">
                            <a href="#" className="flex items-center mb-6">
                                <Image
                                    src="/nove-logo.png"
                                    alt="Mediconect"
                                    width={180}
                                    height={45}
                                    className="h-11 w-auto"
                                />
                            </a>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                Vašu odbornosť meníme na dôveru. Inteligentný marketing pre ambulancie a kliniky 21. storočia s víziou a integritou.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col items-start md:items-center text-left md:text-center">
                            <h4 className="font-semibold text-white/80 mb-4">Kontakt</h4>
                            <div className="flex flex-col gap-3 text-sm text-white/40">
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
                                <div className="mt-4 pt-4 border-t border-white/10 md:text-center text-left">
                                    <p>MediConect s.r.o.</p>
                                    <p>Lounská 629/2</p>
                                    <p>031 04 Liptovský Mikuláš</p>
                                    <p>IČO: 57016615</p>
                                    <p>IČ DPH: SK2122534216</p>
                                </div>
                            </div>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col items-start md:items-end text-left md:text-right">
                            <h4 className="font-semibold text-white/80 mb-4">Právne</h4>
                            <div className="flex flex-col gap-3 text-sm text-white/40 items-start md:items-end">
                                <a href="/ochrana-osobnych-udajov" className="block hover:text-teal transition-colors">
                                    Ochrana osobných údajov
                                </a>
                                <a href="/zasady-cookies" className="block hover:text-teal transition-colors">
                                    Zásady cookies
                                </a>
                                <button
                                    onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("open_cookie_settings")); }}
                                    className="block hover:text-teal transition-colors md:text-right text-left"
                                >
                                    Nastavenia cookies (Súhlas)
                                </button>
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
