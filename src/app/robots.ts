import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
            // Allow AI crawlers explicitly
            {
                userAgent: "GPTBot",
                allow: "/",
            },
            {
                userAgent: "Google-Extended",
                allow: "/",
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
            },
        ],
        sitemap: "https://www.mediconect.sk/sitemap.xml",
        host: "https://www.mediconect.sk",
    };
}
