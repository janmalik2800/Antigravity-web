"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface MagicalButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function MagicalButton({ children, onClick, className = "" }: MagicalButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`group relative inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-white transition-transform duration-300 active:scale-95 isolation-auto ${className}`}
        >
            {/* 1. The BACKLIGHT GLOW (Soft, centered, scaled) - PREMIUM UPDATE */}
            {/* Reduced opacity to 20-40%, increased blur to xl/2xl for soft fade, removed white from gradient for less harshness */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[110%] rounded-2xl bg-teal opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl"
                style={{ zIndex: -2 }}
            />

            {/* 2. The ROTATING BORDER FRAME */}
            {/* Acts as a container clipping the spinner. Inset -1px to create a 1px border visible outside inner bg. */}
            <div
                className="absolute inset-[0px] rounded-2xl overflow-hidden transform-gpu"
                style={{ zIndex: -1 }}
            >
                {/* The Spinner: large enough to cover corners during rotation */}
                <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0D1B2A_0%,#4ECDC4_50%,#FFFFFF_100%)]" />
            </div>

            {/* 3. The INNER BACKGROUND */}
            {/* Covers the center, leaving only the border and glow visible */}
            {/* Inset 1px means 1px of the border frame is visible around this */}
            <div
                className="absolute inset-[1px] rounded-[15px] bg-[#0a1628] transition-colors duration-300 group-hover:bg-[#0f2038]"
                style={{ zIndex: 0 }}
            />

            {/* 4. The CONTENT */}
            <div className="relative z-10 flex items-center gap-3">
                <span className="flex items-center gap-2 bg-gradient-to-r from-white to-teal bg-clip-text text-transparent group-hover:text-white transition-all">
                    {children}
                </span>
                <ArrowRight className="text-teal transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" size={20} />
            </div>
        </button>
    );
}
