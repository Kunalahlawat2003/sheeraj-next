import { NextRequest, NextResponse } from "next/server";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data: { success: boolean; score?: number } = await res.json();
  return data.success && (data.score ?? 1) >= 0.5;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { machinery, model, quantity, name, email, phone, company, message, recaptchaToken } =
    body as Record<string, unknown>;

  if (!recaptchaToken || typeof recaptchaToken !== "string") {
    return NextResponse.json({ error: "Missing reCAPTCHA token." }, { status: 400 });
  }

  const captchaOk = await verifyRecaptcha(recaptchaToken);
  if (!captchaOk) {
    return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  // TODO: forward to email / CRM
  console.log("Machinery inquiry:", { machinery, model, quantity, name, email, phone, company, message });

  return NextResponse.json({ success: true }, { status: 200 });
}
