"use client";

import { useRef, useCallback } from "react";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
            const card = cardRef.current;
            const glow = glowRef.current;
            if (!card || !glow) return;

            const rect = card.getBoundingClientRect();

            // Mouse position relative to card (0..1)
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            // Distance from center (0 = center, 1 = corner)
            const dx = x - 0.5;
            const dy = y - 0.5;
            const distFromCenter = Math.sqrt(dx * dx + dy * dy) * 2; // 0..~1.41

            // Inactive zone: if mouse is near center (dist < 0.35), fade out glow
            const INACTIVE_THRESHOLD = 0.35;
            const opacity = distFromCenter < INACTIVE_THRESHOLD
                ? Math.max(0, (distFromCenter / INACTIVE_THRESHOLD) * 0.6)
                : Math.min(1, (distFromCenter - INACTIVE_THRESHOLD) / 0.3) * 0.85;

            // Angle in degrees from center point
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            glow.style.setProperty("--glow-angle", `${angle}deg`);
            glow.style.setProperty("--glow-opacity", `${opacity}`);
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const glow = glowRef.current;
        if (glow) {
            glow.style.setProperty("--glow-opacity", "0");
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow border layer */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    // @ts-expect-error css custom props
                    "--glow-angle": "0deg",
                    "--glow-opacity": "0",
                    padding: "1.5px",
                    background: `conic-gradient(
                        from calc(var(--glow-angle) - 60deg),
                        transparent 0deg,
                        #2dd4bf 60deg,
                        #06b6d4 120deg,
                        transparent 180deg
                    )`,
                    opacity: "var(--glow-opacity)" as string,
                    transition: "opacity 0.3s ease",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: 2,
                }}
            />
            {/* Card content */}
            <div className="relative z-1 h-full">
                {children}
            </div>
        </div>
    );
}
