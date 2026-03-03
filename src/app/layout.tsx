import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";
import ScrollGradientBackground from "../components/ScrollGradientBackground";

export const metadata: Metadata = {
    title: "Mediconect | Strategický partner pre zdravotníctvo",
    description:
        "Budujeme dôveru a autoritu vašej praxe v očiach pacientov. Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie.",
    keywords: [
        "marketing pre lekárov",
        "zdravotnícky marketing",
        "akvizícia pacientov",
        "mediconect",
        "marketing klinika",
    ],
    openGraph: {
        title: "Mediconect | Strategický partner pre zdravotníctvo",
        description:
            "Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie.",
        type: "website",
    },
    icons: {
        icon: "/Favikona web.png",
        shortcut: "/Favikona web.png",
        apple: "/Favikona web.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sk" suppressHydrationWarning>
            <body className="antialiased" style={{ position: 'relative' }}>
                <ScrollGradientBackground />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {children}
                    <CookieConsent />
                </div>
            </body>
        </html>
    );
}
