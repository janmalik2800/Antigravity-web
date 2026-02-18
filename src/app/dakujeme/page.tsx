"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ArrowLeft, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Dakujeme() {
    return (
        <div className="min-h-screen bg-navy-dark text-white relative overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] bg-teal/3 rounded-full blur-[150px] animate-float-delayed" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="max-w-2xl w-full text-center">
                    {/* Success animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Check size={48} className="text-teal" />
                        </motion.div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Ďakujeme za{" "}
                        <span className="text-gradient">váš záujem!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg mx-auto"
                    >
                        Vaša žiadosť o bezplatnú konzultáciu bola úspešne odoslaná.
                        Náš tím vás bude kontaktovať do 24 hodín.
                    </motion.p>

                    {/* Director card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-strong rounded-3xl p-8 max-w-md mx-auto mb-10"
                    >
                        <p className="text-white/40 text-sm mb-6">Ozve sa vám</p>

                        <div className="flex items-center gap-4 mb-6 justify-center">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-teal/30 flex-shrink-0">
                                <Image
                                    src="/reditel.png"
                                    alt="PhDr. Víťazoslav Struhár"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-semibold text-lg">
                                    PhDr. Víťazoslav Struhár
                                </p>
                                <p className="text-teal text-sm font-medium">
                                    Marketingový riaditeľ
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="tel:+421948220845"
                                className="flex items-center gap-2 justify-center px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-teal/30 transition-all text-sm text-white/60 hover:text-white whitespace-nowrap"
                            >
                                <Phone size={14} className="text-teal" />
                                +421 948 220 845
                            </a>
                            <a
                                href="mailto:info@mediconect.sk"
                                className="flex items-center gap-2 justify-center px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-teal/30 transition-all text-sm text-white/60 hover:text-white"
                            >
                                <Mail size={14} className="text-teal" />
                                info@mediconect.sk
                            </a>
                        </div>
                    </motion.div>

                    {/* What happens next */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mb-12"
                    >
                        <h3 className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-6">
                            Čo sa stane ďalej?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                            {[
                                { step: "1", text: "Preštudujeme vašu žiadosť" },
                                { step: "2", text: "Kontaktujeme vás do 24h" },
                                { step: "3", text: "Naplánujeme konzultáciu" },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-sm">
                                        {item.step}
                                    </div>
                                    <p className="text-white/50 text-sm text-center">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Back to homepage */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl text-white/60 hover:text-teal hover:border-teal/30 transition-all duration-300"
                        >
                            <ArrowLeft size={18} />
                            Späť na hlavnú stránku
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
