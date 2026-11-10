import { NextResponse } from "next/server";

// Forwards site submissions to a Google Form; the form's linked Google Sheet
// then holds one row per submission. Configure in .env.local (see .env.example).

type Kind = "register" | "rsvp";

const FIELDS: Record<Kind, string[]> = {
  register: ["name", "email", "block", "room", "notes"],
  rsvp: ["name", "email", "attending"],
};

export async function POST(req: Request) {
  let body: { kind?: string; fields?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const kind = body.kind as Kind;
  if (kind !== "register" && kind !== "rsvp") {
    return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  }

  const prefix = kind.toUpperCase();
  const url = process.env[`GOOGLE_FORM_${prefix}_URL`];
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Form is not connected yet. Set GOOGLE_FORM_" + prefix + "_URL in .env.local." },
      { status: 503 },
    );
  }

  const params = new URLSearchParams();
  for (const field of FIELDS[kind]) {
    const entry = process.env[`GOOGLE_FORM_${prefix}_ENTRY_${field.toUpperCase()}`];
    if (!entry) continue; // field not mapped to a question in the form
    const value = String(body.fields?.[field] ?? "").slice(0, 2000);
    params.set(entry, value);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "manual",
    });
    // Google answers 200 (or a 3xx redirect) on success, 4xx if the IDs are wrong.
    if (res.status >= 400) {
      return NextResponse.json({ ok: false, error: "Google Form rejected the submission" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not reach Google Forms" }, { status: 502 });
  }
}
