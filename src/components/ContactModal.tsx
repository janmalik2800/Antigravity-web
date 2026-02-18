"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        clinic: "",
        email: "",
        phone: "",
        practice: "",
        message: "",
        gdpr: false,
    });

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: "",
                clinic: "",
                email: "",
                phone: "",
                practice: "",
                message: "",
                gdpr: false,
            });
        }
    }, [isOpen]);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
        onClose();
        window.location.href = "/dakujeme";
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-md" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-teal/30 border border-transparent transition-all cursor-pointer z-20"
                        >
                            <X size={18} className="text-white/60" />
                        </button>

                        {/* Two-column layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left: Info + Director */}
                            <div className="lg:col-span-2 p-8 lg:p-10 relative overflow-hidden">
                                {/* Background glow */}
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal/10 rounded-full blur-[80px]" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
                                        Posuňme vašu prax na{" "}
                                        <span className="text-gradient">vyššiu úroveň</span>
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        Naša spolupráca začína jednoduchým rozhovorom. Vyplňte formulár a my sa vám ozveme do 24 hodín, aby sme prebrali vaše ciele.
                                    </p>
                                    <p className="text-teal text-sm font-medium italic mb-10">
                                        Prvá konzultácia je úplne zadarmo a k ničomu vás nezaväzuje.
                                    </p>

                                    {/* Director card */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-teal/30 flex-shrink-0">
                                            <Image
                                                src="/reditel.png"
                                                alt="PhDr. Víťazoslav Struhár"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">
                                                PhDr. Víťazoslav Struhár
                                            </p>
                                            <p className="text-teal text-sm font-medium">
                                                Marketingový riaditeľ
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contact links */}
                                    <div className="space-y-2">
                                        <a
                                            href="tel:+421948220845"
                                            className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors text-sm"
                                        >
                                            <Phone size={14} className="text-teal/70" />
                                            +421 948 220 845
                                        </a>
                                        <a
                                            href="mailto:info@mediconect.sk"
                                            className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors text-sm"
                                        >
                                            <Mail size={14} className="text-teal/70" />
                                            info@mediconect.sk
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="lg:col-span-3 p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/5 relative">
                                {/* Background glow */}
                                <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal/5 rounded-full blur-[80px]" />

                                <form onSubmit={handleFormSubmit} className="relative z-10">
                                    <div className="space-y-4">
                                        {/* Name + Clinic row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-white/60 text-sm mb-1.5">
                                                    Meno a priezvisko *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm"
                                                    placeholder="Vaše celé meno"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white/60 text-sm mb-1.5">
                                                    Názov kliniky / ambulancie *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="clinic"
                                                    required
                                                    value={formData.clinic}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm"
                                                    placeholder="Názov vášho pracoviska"
                                                />
                                            </div>
                                        </div>

                                        {/* Email + Phone row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-white/60 text-sm mb-1.5">
                                                    E-mail *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm"
                                                    placeholder="Váš email"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white/60 text-sm mb-1.5">
                                                    Telefónne číslo *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm"
                                                    placeholder="+421 ..."
                                                />
                                            </div>
                                        </div>

                                        {/* Practice focus */}
                                        <div>
                                            <label className="block text-white/60 text-sm mb-1.5">
                                                Zameranie vašej lekárskej praxe
                                            </label>
                                            <input
                                                type="text"
                                                name="practice"
                                                value={formData.practice}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm"
                                                placeholder="Napr. stomatológia, chirurgia, všeobecný lekár..."
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-white/60 text-sm mb-1.5">
                                                S čím vám môžeme pomôcť?
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleFormChange}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 focus:border-teal/50 focus:outline-none transition-colors text-sm resize-none"
                                                placeholder="Stručne nám popíšte vaše ciele alebo otázky"
                                            />
                                        </div>

                                        {/* GDPR checkbox */}
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="relative mt-0.5">
                                                <input
                                                    type="checkbox"
                                                    name="gdpr"
                                                    required
                                                    checked={formData.gdpr}
                                                    onChange={handleFormChange}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-teal peer-checked:border-teal transition-all flex items-center justify-center">
                                                    {formData.gdpr && <Check size={14} className="text-navy-dark" />}
                                                </div>
                                            </div>
                                            <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                                                Súhlasím so spracovaním osobných údajov v súlade s{" "}
                                                <a href="#" className="text-teal hover:underline">nariadením GDPR</a>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full mt-6 py-4 bg-teal text-navy-dark font-bold text-base rounded-2xl hover:bg-teal/90 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:shadow-teal/25 uppercase tracking-wide"
                                    >
                                        Chcem bezplatnú konzultáciu
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
