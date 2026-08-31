"use client";

import type { FormEvent } from "react";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

const contactEmail = "matejcervenka@icloud.com";
const phoneDisplay = "+420 774 030 859";
const phoneHref = "tel:+420774030859";
const goals = ["strength", "shape", "performance"] as const;

export function ContactSection() {
  const { content, contactGoal, setContactGoal } = useSite();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const replyTo = String(data.get("replyTo") ?? "").trim();
    const goal = String(data.get("goal") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const goalIndex = goals.indexOf(goal as (typeof goals)[number]);
    const goalLabel = goalIndex >= 0 ? content.services.items[goalIndex].title : content.contact.otherGoal;
    const subject = encodeURIComponent(`${content.contact.mailSubject} — ${goalLabel}`);
    const body = encodeURIComponent([
      `${content.contact.fields.name}: ${name}`,
      `${content.contact.fields.contact}: ${replyTo}`,
      `${content.contact.fields.goal}: ${goalLabel}`,
      "",
      `${content.contact.fields.message}:`,
      message,
    ].join("\n"));

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <div className="contact-grid">
          <div className="contact-intro">
            <SectionLabel number="06" label={content.contact.label} />
            <h2 className="contact-title"><span className="editorial-major__muted">{content.contact.headlineMuted}</span> {content.contact.headline}</h2>
            <p className="lead-copy">{content.contact.summary}</p>
            <p className="contact-availability"><span aria-hidden="true" />{content.contact.availability}</p>
            <div className="contact-links">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={phoneHref}>{phoneDisplay}</a>
            </div>
            <p>{content.contact.location}</p>
          </div>

          <form className="contact-form-visual" aria-label={content.contact.formLabel} onSubmit={handleSubmit}>
            <label className="visual-field">
              <span>01</span>
              <input name="name" type="text" autoComplete="name" placeholder={content.contact.fields.name} aria-label={content.contact.fields.name} required />
            </label>
            <label className="visual-field">
              <span>02</span>
              <input name="replyTo" type="text" autoComplete="email" placeholder={content.contact.fields.contact} aria-label={content.contact.fields.contact} required />
            </label>
            <label className="visual-field">
              <span>03</span>
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
              <span>04</span>
              <textarea name="message" placeholder={content.contact.fields.message} aria-label={content.contact.fields.message} rows={4} />
            </label>
            <button className="visual-submit" type="submit">
              {content.contact.submit} <span aria-hidden="true">→</span>
            </button>
            <p className="contact-form-note">{content.contact.formNote}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
