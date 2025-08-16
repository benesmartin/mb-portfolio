import nodemailer from "nodemailer";
import validator from "validator";
import dns from "dns/promises";
import { parse } from "tldts";

const err = (status, message) =>
  new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const ok = () =>
  new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (s = "") =>
  s.replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[
        m
      ])
  );

const emailHtml = ({ name, email, message, meta }) => {
  return `
        <div style="font-family:sans-serif;font-size:15px;color:#222;line-height:1.6;">
            <h2 style="margin-bottom:10px;">Nová zpráva (Kontakt)</h2>
            <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(
              email
            )}">${escapeHtml(email)}</a></p>
            <p><strong>Zpráva:</strong></p>
            <pre style="background:#f5f5f5;padding:12px;border-radius:6px;border:1px solid #eee;white-space:pre-wrap;">${escapeHtml(
              message
            )}</pre>
            ${
              meta
                ? ` <div style="margin-top:16px;font-size:13px;color:#555;">
                        <div><strong>IP:</strong> ${escapeHtml(
                          meta.ip || ""
                        )}</div>
                        <div><strong>User Agent:</strong> ${escapeHtml(
                          meta.ua || ""
                        )}</div>
                        ${
                          meta.ref
                            ? `<div><strong>Referrer:</strong> ${escapeHtml(
                                meta.ref
                              )}</div>`
                            : ""
                        }
                    </div>`
                : ""
            }
        </div>
    `;
};

export default async (request) => {
  if (request.method !== "POST") return err(405, "Method not allowed");

  let body;
  try {
    body = await request.json();
  } catch {
    return err(400, "Invalid JSON");
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const hp = String(body.hp || body.website || "").trim();

  if (hp) return ok();

  if (!name || !email || !message) return err(400, "Missing fields");

  if (
    !validator.isEmail(email, { allow_display_name: false, require_tld: true })
  ) {
    return err(400, "Invalid email");
  }

  const domain = email.split("@")[1]?.toLowerCase();
  const { isIcann, publicSuffix } = parse(domain || "");
  if (!isIcann || !publicSuffix)
    return err(400, "Unknown or invalid email domain");

  try {
    const mx = await dns.resolveMx(domain);
    if (!mx || mx.length === 0) throw new Error("no-mx");
  } catch {
    return err(400, "Domain has no MX records");
  }

  if (message.length > 5000) return err(413, "Message too long");

  const headers = request.headers;
  const meta = {
    ip:
      headers.get("x-nf-client-connection-ip") ||
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("client-ip") ||
      headers.get("cf-connecting-ip") ||
      "",
    ua: headers.get("user-agent") || "",
    ref: headers.get("referer") || headers.get("referrer") || "",
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  try {
    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        "no-reply@netlify.app",
      to: process.env.EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio - ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: emailHtml({ name, email, message, meta }),
    });
    return ok();
  } catch (e) {
    console.error("Email error:", e);
    return err(502, "Email failed");
  }
};
