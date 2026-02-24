"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Shield, Check } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        analytics: true,
        marketing: true,
    });

    useEffect(() => {
        // Check if consent is already stored
        const storedConsent = localStorage.getItem("cookie_consent");
        if (!storedConsent) {
            // Delay showing the banner slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem("cookie_consent", JSON.stringify(consent));
        setIsVisible(false);
        // Trigger potential GTM/Analytics initialization here if needed
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    const handleDecline = () => {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem("cookie_consent", JSON.stringify(consent));
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    const handleSaveSettings = () => {
        const consent = {
            necessary: true,
            analytics: preferences.analytics,
            marketing: preferences.marketing,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem("cookie_consent", JSON.stringify(consent));
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-5xl mx-auto glass-strong border border-teal/20 rounded-2xl p-6 shadow-2xl shadow-black/50 overflow-hidden relative">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[80px] pointer-events-none" />

                        {!showSettings ? (
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between relative z-10">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                                            <Cookie size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">Nastavenie súkromia</h3>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                                        Používame súbory cookies na zabezpečenie správneho fungovania stránky, analýzu návštevnosti a personalizáciu marketingu v súlade s GDPR.
                                    </p>
                                    <a href="/zasady-cookies" className="text-teal text-xs font-semibold hover:underline inline-block mt-1">
                                        Zásady cookies →
                                    </a>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                    >
                                        Nastavenia
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                    >
                                        Odmietnuť
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className="px-8 py-3 rounded-xl bg-teal text-navy-dark font-bold hover:bg-teal/90 hover:shadow-lg hover:shadow-teal/20 transition-all text-sm"
                                    >
                                        Prijať všetko
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Shield size={18} className="text-teal" />
                                        Predvoľby cookies
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="text-white/40 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Necessary */}
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div>
                                            <p className="font-semibold text-white text-sm">Nevyhnutné</p>
                                            <p className="text-white/40 text-xs mt-1">Potrebné pre fungovanie webu (vždy zapnuté).</p>
                                        </div>
                                        <div className="text-teal">
                                            <Check size={18} />
                                        </div>
                                    </div>

                                    {/* Analytics */}
                                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                        <div>
                                            <p className="font-semibold text-white text-sm">Analytické</p>
                                            <p className="text-white/40 text-xs mt-1">Pomáhajú nám rozumieť, ako web používate.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-white/10">
                                            <input
                                                type="checkbox"
                                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                                checked={preferences.analytics}
                                                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                            />
                                            <span className={`block w-full h-full rounded-full transition-colors duration-200 ${preferences.analytics ? 'bg-teal/20' : 'bg-navy-dark/50'}`} />
                                            <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${preferences.analytics ? 'translate-x-6 bg-teal' : 'translate-x-0'}`} />
                                        </div>
                                    </label>

                                    {/* Marketing */}
                                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                        <div>
                                            <p className="font-semibold text-white text-sm">Marketingové</p>
                                            <p className="text-white/40 text-xs mt-1">Pre personalizáciu reklám a obsahu.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-white/10">
                                            <input
                                                type="checkbox"
                                                className="absolute w-full h-full opacity-0 cursor-pointer"
                                                checked={preferences.marketing}
                                                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                            />
                                            <span className={`block w-full h-full rounded-full transition-colors duration-200 ${preferences.marketing ? 'bg-teal/20' : 'bg-navy-dark/50'}`} />
                                            <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${preferences.marketing ? 'translate-x-6 bg-teal' : 'translate-x-0'}`} />
                                        </div>
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="px-6 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                                    >
                                        Prijať všetko
                                    </button>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="px-8 py-2.5 rounded-xl bg-teal text-navy-dark font-bold hover:bg-teal/90 transition-all text-sm"
                                    >
                                        Uložiť nastavenia
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
