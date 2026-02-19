import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";

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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sk">
            <body className="antialiased">
                {children}
                <CookieConsent />
            </body>
        </html>
    );
}
