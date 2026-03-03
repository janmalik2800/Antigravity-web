import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";
import ScrollGradientBackground from "../components/ScrollGradientBackground";

const baseUrl = "https://www.mediconect.sk";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Mediconect | Strategický partner pre zdravotníctvo",
        template: "%s | Mediconect",
    },
    description:
        "Budujeme dôveru a autoritu vašej praxe v očiach pacientov. Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie na Slovensku.",
    keywords: [
        "marketing pre lekárov",
        "zdravotnícky marketing",
        "akvizícia pacientov",
        "mediconect",
        "marketing klinika",
        "marketing ambulancia",
        "digitálny marketing zdravotníctvo",
        "SEO pre lekárov",
        "sociálne siete ambulancia",
        "email marketing lekár",
        "CRM zdravotníctvo",
        "umelá inteligencia medicína",
        "healthcare marketing Slovakia",
    ],
    authors: [{ name: "MediConect s.r.o.", url: baseUrl }],
    creator: "MediConect s.r.o.",
    publisher: "MediConect s.r.o.",
    alternates: {
        canonical: baseUrl,
    },
    openGraph: {
        title: "Mediconect | Strategický partner pre zdravotníctvo",
        description:
            "Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie. Budujeme dôveru a akvizíciu pacientov.",
        url: baseUrl,
        siteName: "Mediconect",
        locale: "sk_SK",
        type: "website",
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Mediconect – Strategický partner pre zdravotníctvo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Mediconect | Strategický partner pre zdravotníctvo",
        description:
            "Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie.",
        images: [`${baseUrl}/og-image.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    icons: {
        icon: "/Favikona web.png",
        shortcut: "/Favikona web.png",
        apple: "/Favikona web.png",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            name: "MediConect s.r.o.",
            url: baseUrl,
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/Logo final.png`,
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+421-948-220-845",
                contactType: "customer service",
                email: "info@mediconect.sk",
                areaServed: ["SK", "CZ"],
                availableLanguage: ["Slovak", "Czech"],
            },
            address: {
                "@type": "PostalAddress",
                streetAddress: "Lounská 629/2",
                addressLocality: "Liptovský Mikuláš",
                postalCode: "031 04",
                addressCountry: "SK",
            },
            sameAs: [],
            description:
                "Mediconect je marketingová agentúra špecializovaná na zdravotníctvo. Pomáhame lekárom, ambulanciám a klinikám budovať dôveru pacientov a rásť prostredníctvom dátami podloženého marketingu.",
        },
        {
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            url: baseUrl,
            name: "Mediconect",
            description:
                "Strategický marketingový partner pre zdravotníctvo – lekárov, kliniky a ambulancie.",
            publisher: { "@id": `${baseUrl}/#organization` },
            inLanguage: "sk-SK",
        },
        {
            "@type": "WebPage",
            "@id": `${baseUrl}/#webpage`,
            url: baseUrl,
            name: "Mediconect | Strategický partner pre zdravotníctvo",
            isPartOf: { "@id": `${baseUrl}/#website` },
            about: { "@id": `${baseUrl}/#organization` },
            description:
                "Komplexné marketingové riešenia pre lekárov, kliniky a ambulancie na Slovensku.",
            inLanguage: "sk-SK",
        },
        {
            "@type": "LocalBusiness",
            "@id": `${baseUrl}/#localbusiness`,
            name: "MediConect s.r.o.",
            image: `${baseUrl}/Logo final.png`,
            url: baseUrl,
            telephone: "+421948220845",
            email: "info@mediconect.sk",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Lounská 629/2",
                addressLocality: "Liptovský Mikuláš",
                postalCode: "031 04",
                addressCountry: "SK",
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: 49.0834,
                longitude: 19.6108,
            },
            priceRange: "€€",
            openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "17:00",
            },
            areaServed: [
                { "@type": "Country", name: "Slovakia" },
                { "@type": "Country", name: "Czech Republic" },
            ],
            knowsAbout: [
                "Healthcare Marketing",
                "Medical Practice SEO",
                "Patient Acquisition",
                "Healthcare CRM",
                "Medical Social Media Management",
                "AI for Healthcare",
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sk" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Preload critical fonts */}
                <link
                    rel="preload"
                    href="https://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcoaS.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/stolzl_regular.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/stolzl_bold.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
            </head>
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
