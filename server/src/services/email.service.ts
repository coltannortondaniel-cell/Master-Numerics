import nodemailer from "nodemailer";
import { env } from "../lib/env.js";

const smtpConfigured = env.SMTP_HOST && env.SMTP_PORT;

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth:
        env.SMTP_USER && env.SMTP_PASS
          ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
          : undefined,
    })
  : null;

export async function sendPasswordResetEmail(
  to: string,
  username: string,
  resetUrl: string
): Promise<void> {
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0A0B14;color:#F0F4FF;padding:40px;border-radius:16px">
      <h1 style="color:#FFB800;margin-top:0">Master Numerics</h1>
      <p>Hi ${username},</p>
      <p>Someone (hopefully you) asked to reset the password for your account.</p>
      <p style="margin:32px 0">
        <a href="${resetUrl}"
           style="background:#6B21D6;color:#F0F4FF;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold">
          Reset password
        </a>
      </p>
      <p style="color:#8b90a8;font-size:13px">
        This link expires in 1 hour. If you didn't ask for this, you can safely ignore this email —
        your password won't change.
      </p>
    </div>`;

  if (!transporter) {
    // Dev fallback: print the link so the flow is testable without SMTP.
    console.log(`[email:dev] Password reset for ${to}: ${resetUrl}`);
    return;
  }

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject: "Reset your Master Numerics password",
    html,
  });
}
