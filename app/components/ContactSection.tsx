"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";

const contactEmail = "matejcervenka@icloud.com";
const phoneDisplay = "+420 774 030 859";
const phoneHref = "tel:+420774030859";
const goals = ["strength", "shape", "performance"] as const;

export function ContactSection() {
  const { content, contactGoal, setContactGoal } = useSite();
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "submitting") return;

    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const name = String(data.get("name") ?? "").trim();
    const replyTo = String(data.get("replyTo") ?? "").trim();
    const goal = String(data.get("goal") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, replyTo, goal, message, website, startedAt: startedAt.current }),
      });

      const result = await response.json() as { ok?: boolean };
      if (!response.ok || !result.ok) {
        setSubmitState("error");
        return;
      }

      formElement.reset();
      setContactGoal("");
      setSubmitState("success");
      startedAt.current = Date.now();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <header className="contact-header">
          <SectionLabel number="06" label={content.contact.label} />
          <h2 className="contact-title">
            <span>{content.contact.headlineMuted}</span>
            <span className="editorial-major__muted">{content.contact.headline}</span>
          </h2>
          <p className="contact-summary">{content.contact.summary}</p>
        </header>

        <div className="contact-grid">
          <form className="contact-form-visual" aria-label={content.contact.formLabel} onSubmit={handleSubmit}>
            <label className="contact-honeypot" aria-hidden="true">
              Nevyplňovat
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="visual-field">
              <input name="name" type="text" autoComplete="name" placeholder={content.contact.fields.name} aria-label={content.contact.fields.name} required />
            </label>
            <label className="visual-field">
              <input name="replyTo" type="text" autoComplete="email" placeholder={content.contact.fields.contact} aria-label={content.contact.fields.contact} required />
            </label>
            <label className="visual-field">
              <select
                name="goal"
                value={contactGoal}
                aria-label={content.contact.fields.goal}
                required
                onChange={(event) => setContactGoal(event.target.value as typeof contactGoal)}
              >
                <option value="" disabled>{content.contact.goalPlaceholder}</option>
                {content.services.items.map((service, index) => (
                  <option value={goals[index]} key={goals[index]}>{service.title}</option>
                ))}
                <option value="other">{content.contact.otherGoal}</option>
              </select>
            </label>
            <label className="visual-field visual-field--large">
              <textarea name="message" placeholder={content.contact.fields.message} aria-label={content.contact.fields.message} rows={4} />
            </label>
            <button className="visual-submit editorial-cta editorial-cta--minimal-text" type="submit" disabled={submitState === "submitting"}>
              <span className="editorial-cta__label">
                {submitState === "submitting" ? content.contact.sending : content.contact.submit}
              </span>
              <span className="editorial-cta__line" aria-hidden="true" />
              <span className="editorial-cta__arrow" aria-hidden="true">→</span>
            </button>
            <p
              className={`contact-form-note${submitState === "success" ? " contact-form-note--success" : ""}${submitState === "error" ? " contact-form-note--error" : ""}`}
              aria-live="polite"
            >
              {submitState === "success"
                ? content.contact.success
                : submitState === "error"
                  ? content.contact.error
                  : content.contact.formNote}
            </p>
          </form>

          <aside className="contact-details" aria-label={content.contact.label}>
            <a className="contact-detail" href={phoneHref}>
              <span>{phoneDisplay}</span>
              <i aria-hidden="true" />
            </a>
            <a className="contact-detail" href={`mailto:${contactEmail}`}>
              <span>{contactEmail}</span>
              <i aria-hidden="true" />
            </a>
            <p className="contact-detail contact-detail--availability">
              <span>{content.contact.availability}</span>
              <i aria-hidden="true" />
            </p>
            <p className="contact-location">{content.contact.location}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
