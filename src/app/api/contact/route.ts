import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

const RATE_LIMIT_MAP = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = RATE_LIMIT_MAP.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  RATE_LIMIT_MAP.set(ip, [...recent, now]);
  return recent.length >= RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const { name, email, company, message } = parsed.data;

  const contactEmail = process.env.CONTACT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && contactEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CCP NEXATECH <noreply@ccpnexatech.com.br>",
          to: [contactEmail],
          reply_to: email,
          subject: `Novo contato: ${name}${company ? ` — ${company}` : ""}`,
          text: `Nome: ${name}\nE-mail: ${email}\nEmpresa: ${company ?? "—"}\n\nMensagem:\n${message}`,
        }),
      });
    } catch {
      return NextResponse.json({ error: "Email service error" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
