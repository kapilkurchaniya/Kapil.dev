import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const message = payload.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill every field." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const user = process.env.GOOGLE_USER_EMAIL;
    const pass = process.env.GOOGLE_APP_PASSWORD;
    const recipient = process.env.CONTACT_TO_EMAIL || "kapilkurchaniya98@gmail.com";

    if (!user || !pass || !recipient) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass
      }
    });

    await transporter.sendMail({
      from: `"Kapil Portfolio" <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n"),
      html: buildEmailTemplate({ name, email, message })
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    const isDevelopment = process.env.NODE_ENV !== "production";
    const details = error instanceof Error ? error.message : "Unknown email error";

    return NextResponse.json(
      {
        error: "Could not send message right now.",
        ...(isDevelopment ? { details } : {})
      },
      { status: 500 }
    );
  }
}

function buildEmailTemplate({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const sentAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(new Date());

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>New Portfolio Message</title>
      </head>
      <body style="margin:0;padding:0;background:#050713;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050713;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid rgba(103,232,249,0.22);border-radius:18px;overflow:hidden;background:#0b1021;">
                <tr>
                  <td style="padding:0;background:linear-gradient(135deg,#0b1021 0%,#10243b 52%,#1b1242 100%);">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:28px 30px 26px;">
                          <div style="display:inline-block;padding:8px 12px;border:1px solid rgba(103,232,249,0.35);border-radius:10px;background:rgba(103,232,249,0.10);color:#a5f3fc;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                            Portfolio Signal
                          </div>
                          <h1 style="margin:18px 0 8px;color:#ffffff;font-size:32px;line-height:1.15;font-weight:800;">
                            New message from ${safeName}
                          </h1>
                          <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.7;">
                            Someone submitted the contact form on Kapil Kurchaniya's portfolio.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 30px 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="padding:0 8px 14px 0;">
                          <div style="border:1px solid rgba(255,255,255,0.10);border-radius:14px;background:rgba(255,255,255,0.045);padding:16px;">
                            <p style="margin:0 0 6px;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Name</p>
                            <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">${safeName}</p>
                          </div>
                        </td>
                        <td width="50%" style="padding:0 0 14px 8px;">
                          <div style="border:1px solid rgba(255,255,255,0.10);border-radius:14px;background:rgba(255,255,255,0.045);padding:16px;">
                            <p style="margin:0 0 6px;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Email</p>
                            <p style="margin:0;color:#ffffff;font-size:16px;font-weight:700;">
                              <a href="mailto:${safeEmail}" style="color:#ffffff;text-decoration:none;">${safeEmail}</a>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="border:1px solid rgba(192,132,252,0.24);border-radius:16px;background:rgba(15,23,42,0.74);padding:20px;margin-top:2px;">
                      <p style="margin:0 0 12px;color:#c084fc;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">Message</p>
                      <div style="color:#e2e8f0;font-size:16px;line-height:1.75;">
                        ${safeMessage}
                      </div>
                    </div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;">
                      <tr>
                        <td style="padding:0 12px 12px 0;">
                          <a href="mailto:${safeEmail}?subject=Re:%20Portfolio%20message" style="display:inline-block;border-radius:12px;background:#67e8f9;color:#06111f;font-size:14px;font-weight:800;text-decoration:none;padding:13px 18px;">
                            Reply to ${safeName}
                          </a>
                        </td>
                        <td align="right" style="padding:0 0 12px;color:#94a3b8;font-size:13px;">
                          Sent ${escapeHtml(sentAt)} IST
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 30px 28px;border-top:1px solid rgba(255,255,255,0.08);">
                    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;">
                      This email was generated from the contact form on Kapil Kurchaniya's portfolio. Use reply-to to respond directly to the sender.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
