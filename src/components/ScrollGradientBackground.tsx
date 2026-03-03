'use client';

import { useEffect, useRef } from 'react';

export default function ScrollGradientBackground() {
    const rotationRef = useRef(0);
    const targetRotationRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const orbGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Both scroll directions rotate clockwise — much slower multiplier
            targetRotationRef.current += Math.abs(e.deltaY) * 0.025;
        };

        window.addEventListener('wheel', handleWheel, { passive: true });

        const animate = () => {
            // Very slow, silky lerp
            rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.025;

            if (orbGroupRef.current) {
                orbGroupRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* Full-page background base */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    background: '#060f18',
                    pointerEvents: 'none',
                }}
            />

            {/* Rotating orb cluster */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                }}
            >
                <div
                    ref={orbGroupRef}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '180vmax',
                        height: '180vmax',
                        transform: 'translate(-50%, -50%) rotate(0deg)',
                        transformOrigin: 'center center',
                        willChange: 'transform',
                    }}
                >
                    {/* Orb 1 – teal/cyan, top-left quadrant */}
                    <div style={{
                        position: 'absolute',
                        top: '12%',
                        left: '18%',
                        width: '55vmax',
                        height: '55vmax',
                        background: 'radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.80) 0%, rgba(44, 160, 152, 0.50) 35%, rgba(78, 205, 196, 0.10) 65%, transparent 80%)',
                        filter: 'blur(72px)',
                        borderRadius: '50%',
                    }} />

                    {/* Orb 2 – deep teal/navy, bottom-right */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '12%',
                        width: '62vmax',
                        height: '62vmax',
                        background: 'radial-gradient(circle at 55% 50%, rgba(27, 100, 120, 0.70) 0%, rgba(13, 60, 80, 0.45) 40%, rgba(78, 205, 196, 0.08) 65%, transparent 80%)',
                        filter: 'blur(80px)',
                        borderRadius: '50%',
                    }} />

                    {/* Orb 3 – soft teal accent, bottom-left */}
                    <div style={{
                        position: 'absolute',
                        bottom: '18%',
                        left: '6%',
                        width: '42vmax',
                        height: '42vmax',
                        background: 'radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.50) 0%, rgba(44, 160, 152, 0.20) 50%, transparent 72%)',
                        filter: 'blur(60px)',
                        borderRadius: '50%',
                    }} />

                    {/* Orb 4 – navy/deep blue, top-right */}
                    <div style={{
                        position: 'absolute',
                        top: '8%',
                        right: '8%',
                        width: '48vmax',
                        height: '48vmax',
                        background: 'radial-gradient(circle at 50% 50%, rgba(13, 60, 100, 0.65) 0%, rgba(6, 30, 60, 0.35) 45%, transparent 70%)',
                        filter: 'blur(75px)',
                        borderRadius: '50%',
                    }} />

                    {/* Orb 5 – centre glow, subtle teal */}
                    <div style={{
                        position: 'absolute',
                        top: '38%',
                        left: '40%',
                        width: '28vmax',
                        height: '28vmax',
                        background: 'radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.22) 0%, transparent 70%)',
                        filter: 'blur(55px)',
                        borderRadius: '50%',
                    }} />
                </div>

                {/* Vignette to deepen edges */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(6, 15, 24, 0.80) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>
        </>
    );
}
