import { validateIntakePayload, type IntakeSubmission } from "../lib/intake";
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

const MIN_COMPLETION_TIME_MS = 1_500;

export type IntakeEnv = EmailEnv;

function textValue(value: string): string {
  return value || "—";
}

function emailSection(title: string, rows: Array<[string, string]>): string {
  const content = rows
    .map(([label, value]) => `<tr><td style="padding:8px 18px 8px 0;color:#919199;vertical-align:top;width:210px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#f1f0ed;vertical-align:top">${displayHtmlValue(value)}</td></tr>`)
    .join("");

  return `<section style="padding:28px 0;border-top:1px solid rgba(241,240,237,.14)"><h2 style="margin:0 0 14px;color:#966cd7;font-size:12px;letter-spacing:.22em">${title}</h2><table role="presentation" style="border-collapse:collapse;width:100%;font-size:15px;line-height:1.55">${content}</table></section>`;
}

function buildEmail(data: IntakeSubmission): { html: string; text: string } {
  const sections: Array<[string, Array<[string, string]>]> = [
    ["KONTAKT", [
      ["Jméno a příjmení", data.name],
      ["E-mail", data.email],
      ["Telefon / Instagram", data.contact],
      ["Rok narození", data.birthYear],
    ]],
    ["CÍL", [
      ["Cíle", data.goals.join(", ")],
      ["Dobrý výsledek za 3–6 měsíců", data.desiredOutcome],
    ]],
    ["ZKUŠENOSTI", [
      ["Zkušenosti s posilováním", data.strengthExperience],
      ["Pohyb týdně", data.currentActivityFrequency],
      ["Aktuální aktivity", data.currentActivities],
      ["Preference při cvičení", data.exercisePreferences],
    ]],
    ["REŽIM", [
      ["Reálně může trénovat", `${data.trainingFrequency}× týdně`],
      ["Délka tréninku", data.sessionDuration],
      ["Preferovaný čas", data.preferredTime],
      ["Preferované dny", data.preferredDays],
      ["Pracovní den", data.workday],
    ]],
    ["SPOLUPRÁCE", [
      ["Překážky konzistence", data.consistencyBarrier],
      ["Očekávání od trenéra", data.coachExpectation],
      ["Způsob vedení", data.guidanceStyle],
      ["Další kontext", data.additionalContext],
    ]],
    ["POZNÁMKA PŘED TRÉNINKEM", [
      ["Poznámka", data.preTrainingNote],
    ]],
  ];

  const htmlSections = sections.map(([title, rows]) => emailSection(title, rows)).join("");
  const textSections = sections
    .map(([title, rows]) => `${title}\n${rows.map(([label, value]) => `${label}: ${textValue(value)}`).join("\n")}`)
    .join("\n\n");

  return {
    html: `<div style="background:#000;padding:36px;color:#f1f0ed;font-family:Arial,sans-serif"><div style="max-width:720px;margin:0 auto"><p style="margin:0 0 8px;color:#919199;font-size:12px;letter-spacing:.2em">WEBPT / VSTUPNÍ DOTAZNÍK</p><h1 style="margin:0 0 36px;font-size:28px">${escapeHtml(data.name)}</h1>${htmlSections}</div></div>`,
    text: `WEBPT / VSTUPNÍ DOTAZNÍK\n${data.name}\n\n${textSections}`,
  };
}

export async function handleIntakeRequest(request: Request, env: IntakeEnv): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  if (!isSameOrigin(request)) {
    return jsonResponse({ ok: false, message: "Požadavek se nepodařilo ověřit." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false, message: "Neplatný formát požadavku." }, 415);
  }

  let payload: unknown;
  try {
    payload = await readBoundedJson(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return jsonResponse({ ok: false, message: "Formulář je příliš velký." }, 413);
    }
    return jsonResponse({ ok: false, message: "Formulář se nepodařilo přečíst." }, 400);
  }

  const { data, errors } = validateIntakePayload(payload);
  if (!data) {
    return jsonResponse({ ok: false, message: "Zkontroluj prosím označená pole.", errors }, 422);
  }

  const elapsed = Date.now() - data.startedAt;
  if (data.website || elapsed < MIN_COMPLETION_TIME_MS || elapsed < 0) {
    return jsonResponse({ ok: true });
  }

  const email = buildEmail(data);
  const result = await sendEmail(env, {
    subject: `Nový vstupní dotazník — ${data.name}`,
    html: email.html,
    text: email.text,
    replyTo: data.email,
  });

  if (!result.ok) {
    console.error(JSON.stringify({
      event: "intake_email_send_failed",
      reason: result.reason,
      status: result.status,
      requestId: result.requestId,
    }));
    const status = result.reason === "configuration" ? 503 : 502;
    return jsonResponse({ ok: false, message: "Dotazník se nepodařilo odeslat. Zkus to prosím znovu." }, status);
  }

  return jsonResponse({ ok: true });
}
