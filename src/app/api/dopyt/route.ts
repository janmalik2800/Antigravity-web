import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Basic rate limiting configuration
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return false;
  }
  
  const timestamps = rateLimitMap.get(ip)!.filter(t => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= MAX_REQUESTS) {
    return true;
  }
  
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// Validation schema
const formSchema = z.object({
  subjectType: z.string().min(1, "Typ subjektu je povinný"),
  orgName: z.string().min(1, "Názov organizácie/ambulancie je povinný"),
  city: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  contactName: z.string().min(1, "Meno kontaktnej osoby je povinné"),
  email: z.string().email("Neplatný e-mail"),
  phone: z.string().optional().nullable(),
  currentState: z.string().optional().nullable(),
  services: z.array(z.string()).optional(),
  goals: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    // Basic rate limit check
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Príliš veľa požiadaviek. Skúste to prosím neskôr." },
        { status: 429 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("Missing environment variable: RESEND_API_KEY");
      return NextResponse.json(
        { error: "Chyba konfigurácie servera." },
        { status: 500 }
      );
    }

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

    // Format subject type for display
    const formattedSubjectType = data.subjectType === "lekar" 
      ? "Lekár / Ambulancia" 
      : data.subjectType === "firma" 
      ? "Firma / Spoločnosť" 
      : data.subjectType;

    // 2. Send Email via Resend
    try {
      await resend.emails.send({
        from: "Mediconect Web <noreply@mediconect.sk>",
        to: ["info@mediconect.sk"],
        subject: `Nový dopyt z formulára: ${data.orgName}`,
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
                        <h1 style="margin:0;color:#0a1628;font-size:20px;font-weight:800;">📬 Nový dopyt z webu</h1>
                      </td>
                    </tr>

                    <!-- Intro -->
                    <tr>
                      <td style="padding:28px 32px 0;">
                        <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">Ahojte,</p>
                        <p style="color:#374151;font-size:15px;line-height:1.7;">niekto práve na webe <strong>mediconect.sk</strong> vyplnil podrobný dopytový formulár.</p>
                        <p style="color:#374151;font-size:15px;line-height:1.7;">Tu sú detaily dopytu:</p>
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
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Typ subjektu</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:16px;font-weight:700;padding-bottom:14px;">${formattedSubjectType}</td>
                                </tr>

                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Názov organizácie / ambulancie</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:16px;font-weight:700;padding-bottom:14px;">${data.orgName}</td>
                                </tr>

                                ${data.city ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Mesto</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">${data.city}</td>
                                </tr>
                                ` : ''}

                                ${data.website ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Webová stránka</td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:14px;"><a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank" rel="noopener noreferrer" style="color:#2dd4bf;font-size:15px;font-weight:600;text-decoration:none;">${data.website}</a></td>
                                </tr>
                                ` : ''}

                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Meno kontaktnej osoby</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:16px;font-weight:700;padding-bottom:14px;">${data.contactName}</td>
                                </tr>

                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Email</td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:14px;"><a href="mailto:${data.email}" style="color:#2dd4bf;font-size:15px;font-weight:600;text-decoration:none;">${data.email}</a></td>
                                </tr>

                                ${data.phone ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Telefón</td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:14px;"><a href="tel:${data.phone}" style="color:#2dd4bf;font-size:15px;font-weight:600;text-decoration:none;">${data.phone}</a></td>
                                </tr>
                                ` : ''}

                                ${data.currentState ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Čo ich najviac páli / aktuálny stav</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;padding-bottom:14px;white-space:pre-line;">${data.currentState}</td>
                                </tr>
                                ` : ''}

                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Vybrané služby</td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:14px;">
                                    <ul style="margin:0;padding:0;list-style-type:none;">
                                      ${data.services && data.services.length > 0 
                                        ? data.services.map(s => `<li style="margin-bottom:6px; color:#0a1628; font-size:15px;">• ${s}</li>`).join('')
                                        : '<li style="color:#6b7280; font-size:15px; font-style:italic;">Žiadne služby neboli vybrané</li>'
                                      }
                                    </ul>
                                  </td>
                                </tr>

                                ${data.goals ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Hlavný cieľ spolupráce</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">${data.goals}</td>
                                </tr>
                                ` : ''}

                                ${data.budget ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Mesačný rozpočet</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">${data.budget}</td>
                                </tr>
                                ` : ''}

                                ${data.timeline ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Časový rámec (kedy začať)</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;padding-bottom:14px;">${data.timeline}</td>
                                </tr>
                                ` : ''}

                                ${data.message ? `
                                <tr>
                                  <td style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Doplňujúca správa / poznámka</td>
                                </tr>
                                <tr>
                                  <td style="color:#0a1628;font-size:15px;white-space:pre-line;">${data.message}</td>
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
                        <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;border-top:1px solid #e5e7eb;padding-top:20px;">⚡ Tento email bol automaticky vygenerovaný z dopytového formulára.</p>
                        <p style="color:#374151;font-size:14px;line-height:1.7;margin:8px 0 0;">Prosím, spracujte tento kontakt čo najskôr a ozvite sa klientovi.</p>
                        <p style="color:#374151;font-size:14px;line-height:1.7;margin:8px 0 0;">Veľa úspechov! 🤞</p>
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
      return NextResponse.json(
        { error: "Nepodarilo sa odoslať emailovú notifikáciu." },
        { status: 500 }
      );
    }

    // 3. Add contact to Smartemailing
    try {
      const seUsername = process.env.SMARTEMAILING_USERNAME;
      const seApiKey = process.env.SMARTEMAILING_API_KEY;
      const seListId = process.env.SMARTEMAILING_CONTACT_LIST_ID;

      if (seUsername && seApiKey && seListId) {
        const nameParts = data.contactName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const response = await fetch("https://app.smartemailing.cz/api/v3/import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Basic " +
              Buffer.from(`${seUsername}:${seApiKey}`).toString("base64"),
          },
          body: JSON.stringify({
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
                emailaddress: data.email,
                name: firstName,
                surname: lastName,
                cellphone: data.phone || "",
                notes: data.orgName,
                contactlists: [
                  { id: parseInt(seListId), status: "confirmed" },
                ],
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Smartemailing API HTTP Error (${response.status}):`, errorText);
        }
      } else {
        console.error("Smartemailing missing env vars:", { seUsername, seApiKey, seListId });
      }
    } catch (seError) {
      console.error("Smartemailing Catch Error:", seError);
    }

    // 4. Send to Google Sheets (Webhook via Apps Script)
    try {
      const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

      if (sheetsWebhookUrl) {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not defined in .env");
      }
    } catch (sheetsError) {
      console.error("Google Sheets Error:", sheetsError);
    }

    return NextResponse.json({ success: true, message: "Dopyt bol úspešne odoslaný." });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}
