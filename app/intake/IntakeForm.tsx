"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  currentActivityOptions,
  emptyIntakeSubmission,
  guidanceStyleOptions,
  intakeGoals,
  preferredTimeOptions,
  sessionDurationOptions,
  strengthExperienceOptions,
  trainingFrequencyOptions,
  validateIntakePayload,
  workdayOptions,
  type IntakeErrors,
  type IntakeField,
  type IntakeSubmission,
} from "@/lib/intake";
import styles from "./intake.module.css";

type SectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

type ChoiceGroupProps = {
  name: IntakeField;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  compact?: boolean;
  onChange: (value: string) => void;
};

type TextFieldProps = {
  name: IntakeField;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
  onChange: (value: string) => void;
};

type TextAreaProps = Omit<TextFieldProps, "type" | "autoComplete" | "inputMode">;

function FormSection({ number, title, children }: SectionProps) {
  return (
    <section className={styles.formSection} aria-labelledby={`intake-section-${number}`}>
      <header className={styles.sectionHeader}>
        <span>{number}</span>
        <i aria-hidden="true" />
        <h2 id={`intake-section-${number}`}>{title}</h2>
      </header>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}

function FieldMeta({ label, required, optional }: Pick<TextFieldProps, "label" | "required" | "optional">) {
  return (
    <span className={styles.fieldLabel}>
      <span>{label}{required ? " *" : ""}</span>
      {optional ? <small>Volitelné</small> : null}
    </span>
  );
}

function TextField({
  name,
  label,
  value,
  error,
  required,
  optional,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  onChange,
}: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <label className={styles.field}>
      <FieldMeta label={label} required={required} optional={optional} />
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className={styles.error} id={errorId}>{error}</span> : null}
    </label>
  );
}

function TextArea({ name, label, value, error, required, optional, maxLength, onChange }: TextAreaProps) {
  const errorId = `${name}-error`;
  return (
    <label className={styles.field}>
      <FieldMeta label={label} required={required} optional={optional} />
      <textarea
        name={name}
        value={value}
        required={required}
        rows={4}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className={styles.error} id={errorId}>{error}</span> : null}
    </label>
  );
}

function ChoiceGroup({ name, legend, options, value, error, compact, onChange }: ChoiceGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset className={styles.choiceField} aria-describedby={error ? errorId : undefined}>
      <legend><FieldMeta label={legend} required /></legend>
      <div className={compact ? styles.compactChoices : styles.choices}>
        {options.map((option) => (
          <label className={styles.choice} key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              required
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error ? <span className={styles.error} id={errorId}>{error}</span> : null}
    </fieldset>
  );
}

export function IntakeForm() {
  const [form, setForm] = useState<IntakeSubmission>({ ...emptyIntakeSubmission, goals: [] });
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const updateField = <K extends IntakeField>(field: K, value: IntakeSubmission[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (submitState === "error") setSubmitState("idle");
  };

  const toggleGoal = (goal: string) => {
    const nextGoals = form.goals.includes(goal)
      ? form.goals.filter((item) => item !== goal)
      : [...form.goals, goal];
    updateField("goals", nextGoals);
  };

  const focusFirstError = (fieldErrors: IntakeErrors) => {
    const firstField = Object.keys(fieldErrors)[0];
    if (!firstField) return;
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "submitting") return;

    const payload: IntakeSubmission = { ...form, startedAt: startedAt.current };
    const validation = validateIntakePayload(payload);
    if (!validation.data) {
      setErrors(validation.errors);
      setSubmitState("error");
      setSubmitMessage("Zkontroluj prosím označená pole.");
      focusFirstError(validation.errors);
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = await response.json() as {
        ok?: boolean;
        message?: string;
        errors?: IntakeErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors(result.errors);
          focusFirstError(result.errors);
        }
        setSubmitState("error");
        setSubmitMessage(result.message || "Dotazník se nepodařilo odeslat. Zkus to prosím znovu.");
        return;
      }

      setForm({ ...emptyIntakeSubmission, goals: [] });
      setErrors({});
      setSubmitState("success");
      startedAt.current = Date.now();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitState("error");
      setSubmitMessage("Dotazník se nepodařilo odeslat. Zkontroluj připojení a zkus to znovu.");
    }
  };

  if (submitState === "success") {
    return (
      <section className={styles.success} aria-live="polite">
        <span aria-hidden="true">✓</span>
        <h2>Děkuju. Dotazník mám.</h2>
        <p>Projdeme ho před naším prvním tréninkem a navážeme na něj osobně.</p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.requiredNote}><span>*</span> Povinné pole</p>

      <FormSection number="01" title="Kontakt">
        <div className={styles.twoColumns}>
          <TextField name="name" label="Jméno a příjmení" value={form.name} error={errors.name} required autoComplete="name" maxLength={100} onChange={(value) => updateField("name", value)} />
          <TextField name="email" label="E-mail" value={form.email} error={errors.email} required type="email" autoComplete="email" inputMode="email" maxLength={254} onChange={(value) => updateField("email", value)} />
          <TextField name="contact" label="Telefon nebo Instagram" value={form.contact} error={errors.contact} optional autoComplete="tel" maxLength={160} onChange={(value) => updateField("contact", value)} />
          <TextField name="birthYear" label="Rok narození" value={form.birthYear} error={errors.birthYear} optional inputMode="numeric" maxLength={4} onChange={(value) => updateField("birthYear", value)} />
        </div>
      </FormSection>

      <FormSection number="02" title="Tvůj cíl">
        <fieldset className={styles.choiceField} aria-describedby={errors.goals ? "goals-error" : undefined}>
          <legend><FieldMeta label="Čeho chceš tréninkem dosáhnout?" required /></legend>
          <div className={styles.choices}>
            {intakeGoals.map((goal) => (
              <label className={styles.choice} key={goal}>
                <input type="checkbox" name="goals" value={goal} checked={form.goals.includes(goal)} onChange={() => toggleGoal(goal)} />
                <span>{goal}</span>
              </label>
            ))}
          </div>
          {errors.goals ? <span className={styles.error} id="goals-error">{errors.goals}</span> : null}
        </fieldset>
        <TextArea name="desiredOutcome" label="Jak by pro tebe vypadal dobrý výsledek za 3–6 měsíců?" value={form.desiredOutcome} error={errors.desiredOutcome} required maxLength={1200} onChange={(value) => updateField("desiredOutcome", value)} />
      </FormSection>

      <FormSection number="03" title="Zkušenosti">
        <ChoiceGroup name="strengthExperience" legend="Jaké máš zkušenosti s posilováním?" options={strengthExperienceOptions} value={form.strengthExperience} error={errors.strengthExperience} onChange={(value) => updateField("strengthExperience", value)} />
        <ChoiceGroup name="currentActivityFrequency" legend="Kolikrát týdně se aktuálně věnuješ sportu nebo pohybu?" options={currentActivityOptions} value={form.currentActivityFrequency} error={errors.currentActivityFrequency} compact onChange={(value) => updateField("currentActivityFrequency", value)} />
        <TextArea name="currentActivities" label="Jakým aktivitám se aktuálně věnuješ?" value={form.currentActivities} error={errors.currentActivities} optional maxLength={1000} onChange={(value) => updateField("currentActivities", value)} />
        <TextArea name="exercisePreferences" label="Je něco při cvičení, co tě baví nebo naopak nechceš dělat?" value={form.exercisePreferences} error={errors.exercisePreferences} optional maxLength={1000} onChange={(value) => updateField("exercisePreferences", value)} />
      </FormSection>

      <FormSection number="04" title="Tvůj režim">
        <ChoiceGroup name="trainingFrequency" legend="Kolikrát týdně můžeš reálně trénovat?" options={trainingFrequencyOptions} value={form.trainingFrequency} error={errors.trainingFrequency} compact onChange={(value) => updateField("trainingFrequency", value)} />
        <ChoiceGroup name="sessionDuration" legend="Kolik času máš obvykle na jeden trénink?" options={sessionDurationOptions} value={form.sessionDuration} error={errors.sessionDuration} compact onChange={(value) => updateField("sessionDuration", value)} />
        <ChoiceGroup name="preferredTime" legend="Kdy se ti nejlépe trénuje?" options={preferredTimeOptions} value={form.preferredTime} error={errors.preferredTime} compact onChange={(value) => updateField("preferredTime", value)} />
        <TextArea name="preferredDays" label="Které dny ti obvykle nejlépe vyhovují?" value={form.preferredDays} error={errors.preferredDays} optional maxLength={500} onChange={(value) => updateField("preferredDays", value)} />
        <ChoiceGroup name="workday" legend="Jak vypadá většina tvého pracovního dne?" options={workdayOptions} value={form.workday} error={errors.workday} onChange={(value) => updateField("workday", value)} />
      </FormSection>

      <FormSection number="05" title="Spolupráce">
        <TextArea name="consistencyBarrier" label="Co ti doposud nejvíc bránilo být v tréninku konzistentní?" value={form.consistencyBarrier} error={errors.consistencyBarrier} required maxLength={1200} onChange={(value) => updateField("consistencyBarrier", value)} />
        <TextArea name="coachExpectation" label="Co od trenéra očekáváš?" value={form.coachExpectation} error={errors.coachExpectation} required maxLength={1200} onChange={(value) => updateField("coachExpectation", value)} />
        <ChoiceGroup name="guidanceStyle" legend="Jaký způsob vedení ti vyhovuje?" options={guidanceStyleOptions} value={form.guidanceStyle} error={errors.guidanceStyle} onChange={(value) => updateField("guidanceStyle", value)} />
        <TextArea name="additionalContext" label="Je něco dalšího, co bych o tobě nebo tvém cíli měl vědět?" value={form.additionalContext} error={errors.additionalContext} optional maxLength={1200} onChange={(value) => updateField("additionalContext", value)} />
      </FormSection>

      <FormSection number="06" title="Před prvním tréninkem">
        <TextArea name="preTrainingNote" label="Je něco, co bych měl před prvním tréninkem vědět, aby pro tebe byl trénink bezpečný a příjemný?" value={form.preTrainingNote} error={errors.preTrainingNote} optional maxLength={1200} onChange={(value) => updateField("preTrainingNote", value)} />
        <p className={styles.safetyNote}>Pokud je potřeba řešit zdravotní omezení nebo jiné citlivé informace, můžeme je probrat osobně před prvním tréninkem.</p>
      </FormSection>

      <div className={styles.consent}>
        <label className={styles.consentChoice}>
          <input type="checkbox" name="privacyAccepted" checked={form.privacyAccepted} required onChange={(event) => updateField("privacyAccepted", event.target.checked)} />
          <span>Beru na vědomí, že uvedené údaje budou použity pro kontaktování a přípravu tréninkové spolupráce.</span>
        </label>
        <a href="#privacy-note">Ochrana osobních údajů</a>
        <p className={styles.privacyNote} id="privacy-note">Údaje z dotazníku slouží pouze k přípravě a navázání tréninkové spolupráce. Dotazy ke zpracování údajů můžeš poslat na matejcervenka@icloud.com.</p>
        {errors.privacyAccepted ? <span className={styles.error}>{errors.privacyAccepted}</span> : null}
      </div>

      <label className={styles.honeypot} aria-hidden="true">
        Nevyplňovat
        <input name="website" type="text" value={form.website} tabIndex={-1} autoComplete="off" onChange={(event) => updateField("website", event.target.value)} />
      </label>

      <div className={styles.submitArea}>
        <button className={styles.submit} type="submit" disabled={submitState === "submitting"}>
          <span>{submitState === "submitting" ? "Odesílám..." : "Odeslat dotazník"}</span>
          {submitState !== "submitting" ? <span aria-hidden="true">→</span> : null}
        </button>
        {submitMessage ? <p className={styles.submitError} role="alert">{submitMessage}</p> : null}
      </div>
    </form>
  );
}
