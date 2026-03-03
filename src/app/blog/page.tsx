import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import ScrollGradientBackground from "../../components/ScrollGradientBackground";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
    title: "Blog | Mediconect",
    description:
        "Overené marketingové postupy a dáta z reálnych projektov pre lekárov, ambulancie a kliniky. Pozrite si, ako Mediconect dosahuje merateľné výsledky.",
    alternates: {
        canonical: "https://www.mediconect.sk/blog",
    },
    openGraph: {
        title: "Blog | Mediconect",
        description:
            "Overené marketingové postupy a reálne výsledky pre zdravotnícky sektor.",
        url: "https://www.mediconect.sk/blog",
        siteName: "Mediconect",
        locale: "sk_SK",
        type: "website",
    },
};

const posts = [
    {
        slug: "strategicka-reaktivacia-pacientskej-databazy",
        badge: "Prípadová štúdia",
        title: "Ako sme v ambulancii MUDr. Čajku zvýšili počet preventívnych prehliadok o 42 %",
        excerpt:
            "Spolu s MUDr. Romanom Čajkom, všeobecným lekárom zo Žiliny, sme ukázali, ako digitálny marketing dokáže reálne zlepšiť zdravie pacientov aj efektivitu ambulancie.",
        date: "Marec 2026",
        tags: ["E-mail marketing", "Preventívna starostlivosť", "Zdravotníctvo"],
        metrics: [
            { label: "Nárast rezervácií", value: "+42,31 %" },
            { label: "Miera doručenia e-mailov", value: "98,52 %" },
            { label: "Open rate", value: "70,89 %" },
        ],
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen relative">
            <ScrollGradientBackground />

            <div className="relative" style={{ zIndex: 2 }}>
                <SiteHeader />

                {/* Hero */}
                <section className="relative z-10 pt-32 pb-16 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8">
                                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                <span className="text-teal text-sm font-medium tracking-wide">
                                    Overené výsledkami
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                <span className="text-gradient">Blog</span>
                            </h1>
                            <p className="text-lg text-white/50 leading-relaxed">
                                Reálne výsledky, merateľné dáta a overené marketingové
                                postupy zo zdravotníckeho sektora. Žiadne teórie – len to,
                                čo skutočne funguje.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Posts grid */}
                <section className="relative z-10 pb-32 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group block"
                                >
                                    <article className="h-full glass rounded-3xl p-8 lg:p-10 hover:border-teal/20 border border-white/5 transition-all duration-500 hover:shadow-xl hover:shadow-teal/5">
                                        {/* Badge */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-semibold uppercase tracking-wider">
                                                <Tag size={10} />
                                                {post.badge}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-teal transition-colors duration-300 leading-snug">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-white/50 leading-relaxed mb-8">
                                            {post.excerpt}
                                        </p>

                                        {/* Metrics */}
                                        <div className="grid grid-cols-3 gap-3 mb-8">
                                            {post.metrics.map((m) => (
                                                <div
                                                    key={m.label}
                                                    className="rounded-xl bg-white/5 border border-white/5 p-3 text-center"
                                                >
                                                    <div className="text-teal font-bold text-lg font-kanit">
                                                        {m.value}
                                                    </div>
                                                    <div className="text-white/40 text-[11px] mt-0.5 leading-tight">
                                                        {m.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-white/30 bg-white/5 rounded-full px-3 py-1"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Meta + CTA */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5 pt-6">
                                            <div className="flex items-center gap-2 text-white/30 text-sm">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={13} />
                                                    {post.date}
                                                </span>
                                            </div>
                                            <span className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal text-navy-dark font-semibold text-sm group-hover:bg-teal/90 transition-all duration-300">
                                                Čítať viac
                                                <ArrowRight size={15} />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
                            <Image
                                src="/Logo final.png"
                                alt="Mediconect"
                                width={140}
                                height={35}
                                className="h-[35px] w-auto"
                            />
                        </Link>
                        <p className="text-white/30 text-sm text-center">
                            © 2026 Mediconect. Všetky práva vyhradené.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/40">
                            <Link href="/" className="hover:text-teal transition-colors">
                                ← Späť na hlavnú
                            </Link>
                            <Link
                                href="/ochrana-osobnych-udajov"
                                className="hover:text-teal transition-colors"
                            >
                                Ochrana údajov
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
