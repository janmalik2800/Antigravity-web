'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
    ['Služby', '/#sluzby'],
    ['Prípadová štúdia', '/#case-study'],
    ['Proces', '/#proces'],
    ['FAQ', '/#faq'],
] as const;

export default function SiteHeader() {
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`absolute md:fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
            style={{
                background: 'linear-gradient(to bottom, #060f18 0%, rgba(6,15,24,0.85) 60%, transparent 100%)',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/Logo final.png"
                            alt="Mediconect – logo, healthcare marketing agentúra"
                            width={234}
                            height={59}
                            priority
                            className="h-[58px] w-auto transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm text-white/60 hover:text-teal transition-colors duration-300"
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            href="/#kontakt"
                            className="px-6 py-2.5 bg-teal text-navy-dark font-semibold text-sm rounded-xl hover:bg-teal/90 transition-all duration-300 hover:shadow-lg hover:shadow-teal/25"
                        >
                            Bezplatná konzultácia
                        </Link>
                    </div>

                </div>
            </div>
        </motion.nav>
    );
}
