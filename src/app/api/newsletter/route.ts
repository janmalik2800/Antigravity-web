import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Neplatná e-mailová adresa" },
                { status: 400 }
            );
        }

        const username = process.env.SMARTEMAILING_USERNAME || "";
        const apiKey = process.env.SMARTEMAILING_API_KEY || "";
        const listId = process.env.SMARTEMAILING_LIST_ID || "";

        const credentials = Buffer.from(`${username}:${apiKey}`).toString("base64");

        const payload = {
            settings: {
                update: true,
                add_namedays: true,
                add_genders: true,
                add_salutations: true,
                preserve_unsubscribed: true,
                skip_invalid_emails: true,
                create_update_custom_fields: false,
            },
            data: [
                {
                    emailaddress: email.trim(),
                    contactlists: [
                        {
                            id: parseInt(listId),
                            status: "confirmed",
                        },
                    ],
                },
            ],
        };

        const response = await fetch("https://app.smartemailing.cz/api/v3/import", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials}`,
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("SmartEmailing API Error:", errorData);
            return NextResponse.json(
                { error: "Chyba pri ukladaní e-mailu do systému. Skúste to prosím neskôr." },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, message: "Kontakt bol úspešne pridaný." });
    } catch (error) {
        console.error("Newsletter API Error:", error);
        return NextResponse.json(
            { error: "Interná chyba servera pri spracovaní požiadavky." },
            { status: 500 }
        );
    }
}
