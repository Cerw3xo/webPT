export const DEFAULT_ADMIN_EMAIL = "matejcervenka@icloud.com";
export const MAX_FORM_BODY_BYTES = 32 * 1024;

export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_EMAIL?: string;
}

export type OutgoingEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type EmailResult =
  | { ok: true }
  | { ok: false; reason: "configuration" | "network" | "provider"; status?: number; requestId?: string | null };

export class PayloadTooLargeError extends Error {}

export function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function readBoundedJson(request: Request, maxBytes = MAX_FORM_BODY_BYTES): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxBytes) throw new PayloadTooLargeError();

  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) throw new PayloadTooLargeError();
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bytes));
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export function displayHtmlValue(value: string): string {
  return value ? escapeHtml(value).replace(/\n/g, "<br>") : "—";
}

export async function sendEmail(env: EmailEnv, email: OutgoingEmail): Promise<EmailResult> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return { ok: false, reason: "configuration" };
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.CONTACT_EMAIL || DEFAULT_ADMIN_EMAIL],
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: "provider",
      status: response.status,
      requestId: response.headers.get("x-request-id"),
    };
  }

  return { ok: true };
}
