import {
  PayloadTooLargeError,
  displayHtmlValue,
  escapeHtml,
  isSameOrigin,
  jsonResponse,
  readBoundedJson,
  sendEmail,
  type EmailEnv,
} from "./form-utils";

const MIN_COMPLETION_TIME_MS = 1_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const goals = {
  strength: "Síla a svaly",
  shape: "Forma a redukce tuku",
  performance: "Kondice a výkon",
  other: "Jiný cíl",
} as const;

type ContactPayload = {
  name: string;
  replyTo: string;
  goal: keyof typeof goals;
  message: string;
  website: string;
  startedAt: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validatePayload(payload: unknown): { data: ContactPayload | null; errors: Record<string, string> } {
  if (!isRecord(payload)) {
    return { data: null, errors: { form: "Neplatný formulář." } };
  }

  const errors: Record<string, string> = {};
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const replyTo = typeof payload.replyTo === "string" ? payload.replyTo.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const goal = typeof payload.goal === "string" && payload.goal in goals
    ? payload.goal as keyof typeof goals
    : null;
  const startedAt = typeof payload.startedAt === "number" && Number.isFinite(payload.startedAt)
    ? payload.startedAt
    : null;

  if (!name) errors.name = "Doplň prosím jméno.";
  if (name.length > 100) errors.name = "Jméno je příliš dlouhé.";
  if (!replyTo) errors.replyTo = "Doplň prosím kontakt.";
  if (replyTo.length > 254) errors.replyTo = "Kontakt je příliš dlouhý.";
  if (!goal) errors.goal = "Vyber prosím cíl.";
  if (payload.message !== undefined && typeof payload.message !== "string") errors.message = "Neplatná zpráva.";
  if (message.length > 2_000) errors.message = "Zpráva je příliš dlouhá.";
  if (website.length > 200) errors.website = "Neplatný formulář.";
  if (startedAt === null) errors.startedAt = "Formulář se nepodařilo ověřit.";

  if (Object.keys(errors).length > 0 || !goal || startedAt === null) {
    return { data: null, errors };
  }

  return { data: { name, replyTo, goal, message, website, startedAt }, errors };
}

function buildEmail(data: ContactPayload): { html: string; text: string } {
  const goal = goals[data.goal];
  const html = `<div style="background:#000;padding:36px;color:#f1f0ed;font-family:Arial,sans-serif"><div style="max-width:680px;margin:0 auto"><p style="margin:0 0 8px;color:#919199;font-size:12px;letter-spacing:.2em">WEBPT / KONTAKTNÍ FORMULÁŘ</p><h1 style="margin:0 0 32px;font-size:28px">${escapeHtml(data.name)}</h1><table role="presentation" style="border-collapse:collapse;width:100%;font-size:15px;line-height:1.55"><tr><td style="padding:12px 18px 12px 0;color:#919199;width:150px">Kontakt</td><td style="padding:12px 0;color:#f1f0ed">${displayHtmlValue(data.replyTo)}</td></tr><tr><td style="padding:12px 18px 12px 0;color:#919199">Cíl</td><td style="padding:12px 0;color:#f1f0ed">${escapeHtml(goal)}</td></tr><tr><td style="padding:12px 18px 12px 0;color:#919199;vertical-align:top">Zpráva</td><td style="padding:12px 0;color:#f1f0ed;vertical-align:top">${displayHtmlValue(data.message)}</td></tr></table></div></div>`;
  const text = `WEBPT / KONTAKTNÍ FORMULÁŘ\n\nJméno: ${data.name}\nKontakt: ${data.replyTo}\nCíl: ${goal}\n\nZpráva:\n${data.message || "—"}`;
  return { html, text };
}

export async function handleContactRequest(request: Request, env: EmailEnv): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false }, 403);
  }

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false }, 415);
  }

  let payload: unknown;
  try {
    payload = await readBoundedJson(request);
  } catch (error) {
    return jsonResponse({ ok: false }, error instanceof PayloadTooLargeError ? 413 : 400);
  }

  const { data, errors } = validatePayload(payload);
  if (!data) {
    return jsonResponse({ ok: false, errors }, 422);
  }

  const elapsed = Date.now() - data.startedAt;
  if (data.website || elapsed < MIN_COMPLETION_TIME_MS || elapsed < 0) {
    return jsonResponse({ ok: true });
  }

  const email = buildEmail(data);
  const result = await sendEmail(env, {
    subject: `Nová zpráva z webu — ${data.name}`,
    html: email.html,
    text: email.text,
    replyTo: emailPattern.test(data.replyTo) ? data.replyTo : undefined,
  });

  if (!result.ok) {
    console.error(JSON.stringify({
      event: "contact_email_send_failed",
      reason: result.reason,
      status: result.status,
      requestId: result.requestId,
    }));
    return jsonResponse({ ok: false }, result.reason === "configuration" ? 503 : 502);
  }

  return jsonResponse({ ok: true });
}
