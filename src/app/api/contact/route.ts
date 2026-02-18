import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const formSchema = z.object({
    name: z.string().min(2, "Meno je príliš krátke"),
    clinic: z.string().min(2, "Názov kliniky je príliš krátky"),
    email: z.string().email("Neplatný e-mail"),
    phone: z.string().min(9, "Telefónne číslo je príliš krátke"),
    practice: z.string().optional(),
    message: z.string().optional(),
    gdpr: z.boolean().refine((val) => val === true, "Musíte súhlasiť so spracovaním údajov"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate data
        const result = formSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Neplatné údaje", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const data = result.data;

        // 2. Save to Supabase
        const { error: dbError } = await supabase
            .from("leads")
            .insert([
                {
                    name: data.name,
                    clinic: data.clinic,
                    email: data.email,
                    phone: data.phone,
                    practice: data.practice,
                    message: data.message,
                    gdpr: data.gdpr,
                },
            ]);

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return NextResponse.json(
                { error: "Chyba pri ukladaní do databázy" },
                { status: 500 }
            );
        }

        // 3. Send Email via Resend
        try {
            await resend.emails.send({
                from: "Mediconect Web <onboarding@resend.dev>", // TODO: Update with verified domain if available, otherwise use onboarding
                to: ["info@mediconect.sk"], // Send to client
                subject: `Nová poptávka: ${data.clinic}`,
                html: `
                    <h1>Nová poptávka z webu</h1>
                    <p><strong>Meno:</strong> ${data.name}</p>
                    <p><strong>Klinika:</strong> ${data.clinic}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Telefón:</strong> ${data.phone}</p>
                    <p><strong>Zameranie:</strong> ${data.practice || "Neuvedené"}</p>
                    <p><strong>Správa:</strong></p>
                    <p>${data.message || "Bez správy"}</p>
                `,
            });
        } catch (emailError) {
            console.error("Resend Error:", emailError);
            // Don't fail the request if email fails, but log it. Data is saved.
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Interná chyba servera" },
            { status: 500 }
        );
    }
}
