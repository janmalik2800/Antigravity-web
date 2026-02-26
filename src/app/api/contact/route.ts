import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Meno je príliš krátke"),
  clinic: z.string().min(2, "Názov kliniky je príliš krátky"),
  email: z.string().email("Neplatný e-mail"),
  phone: z.string().min(9, "Telefónne číslo je príliš krátke"),
  practice: z.string().optional(),
  message: z.string().optional(),
  marketing: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    // Initialize clients inside the handler to avoid build-time errors
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey || !resendApiKey) {
      const missing = [];
      if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
      if (!supabaseKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      if (!resendApiKey) missing.push("RESEND_API_KEY");

      console.error("Missing environment variables:", missing.join(", "));
      return NextResponse.json(
        { error: `Chyba konfigurácie servera. Chýba: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendApiKey);

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
          gdpr: true, // Implicitný súhlas s GDPR podľa textu "Odoslaním formulára..."
          // Ak už tabuľka nemá stĺpec marketing, odkomentuj po migrácii databázy:
          // marketing: data.marketing,
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
        from: "Mediconect Web <onboarding@resend.dev>",
        to: ["hupikcz@gmail.com"],
        subject: `Nová poptávka na webe mediconect: ${data.clinic}`,
        html: `
                    <!DOCTYPE html>
                    <html>
                    <head><meta charset="utf-8"></head>
                    <body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">

                      <!-- Header -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1628;padding:28px 0;">
                        <tr>
                          <td align="center">
                            <span style="color:#2dd4bf;font-size:26px;font-weight:900;letter-spacing:2px;">MEDICO<span style="color:#ffffff;">NECT</span></span>
                            <p style="color:#8ba0b8;font-size:12px;margin:4px 0 0;letter-spacing:1px;">MARKETING PRE ZDRAVOTNÍCTVO</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Body -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:32px 16px;">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                              <!-- Title bar -->
                              <tr>
                                <td style="background:#2dd4bf;padding:20px 32px;">
                                  <h1 style="margin:0;color:#0a1628;font-size:20px;font-weight:800;">📬 Nová poptávka na webe</h1>
                                </td>
                              </tr>

                              <!-- Intro -->
                              <tr>
                                <td style="padding:28px 32px 0;">
                                  <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">Ahojte,</p>
                                  <p style="color:#374151;font-size:15px;line-height:1.7;">niekto práve na webe <strong>mediconect.sk</strong> vyplnil poptávku po bezplatnej konzultácii.</p>
                                  <p style="color:#374151;font-size:15px;line-height:1.7;">Tu sú detaily, ktoré nám o sebe nechal:</p>
                                </td>
                              </tr>

                              <!-- Details card -->
                              <tr>
                                <td style="padding:16px 32px 24px;">
                                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f9;border-radius:10px;border-left:4px solid #2dd4bf;">
                                    <tr>
                                      <td style="padding:20px 24px;">
                                        <table width="100%" cellpadding="0" cellspacing="8">
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Meno a priezvisko</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#0a1628;font-size:16px;font-weight:700;padding-bottom:14px;">${data.name}</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Klinika / ambulancia</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#0a1628;font-size:16px;font-weight:700;padding-bottom:14px;">${data.clinic}</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Email</td>
                                          </tr>
                                          <tr>
                                            <td style="padding-bottom:14px;"><a href="mailto:${data.email}" style="color:#2dd4bf;font-size:15px;font-weight:600;text-decoration:none;">${data.email}</a></td>
                                          </tr>
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Telefón</td>
                                          </tr>
                                          <tr>
                                            <td style="padding-bottom:14px;"><a href="tel:${data.phone}" style="color:#2dd4bf;font-size:15px;font-weight:600;text-decoration:none;">${data.phone}</a></td>
                                          </tr>
                                          ${data.practice ? `
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Zameranie praxe</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">${data.practice}</td>
                                          </tr>
                                          ` : ''}
                                          ${data.message ? `
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Správa</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#0a1628;font-size:15px;">${data.message}</td>
                                          </tr>
                                          ` : ''}
                                          ${data.marketing ? `
                                          <tr>
                                            <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Marketingový súhlas</td>
                                          </tr>
                                          <tr>
                                            <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">Udeliť súhlas pre prijímanie kampaní (Áno)</td>
                                          </tr>
                                          ` : ''}
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                              <!-- CTA notice -->
                              <tr>
                                <td style="padding:0 32px 28px;">
                                  <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;border-top:1px solid #e5e7eb;padding-top:20px;">⚡ Tento email je vygenerovaný automaticky. Prosím, spracujte tento kontakt čo najskôr.</p>
                                  <p style="color:#374151;font-size:14px;line-height:1.7;margin:8px 0 0;">V prípade problému, napíšte prosím do skupiny na WhatsAppe.</p>
                                  <p style="color:#374151;font-size:14px;line-height:1.7;margin:8px 0 0;">Držím palce! 🤞</p>
                                </td>
                              </tr>

                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Footer -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:16px;color:#9ca3af;font-size:11px;">
                            © ${new Date().getFullYear()} Mediconect — Marketing pre zdravotníctvo
                          </td>
                        </tr>
                      </table>

                    </body>
                    </html>
                `,
      });
    } catch (emailError) {
      console.error("Resend Error:", emailError);
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

// Force deploy: Fix Vercel build error
