export const intakeGoals = [
  "Zhubnout / snížit množství tuku",
  "Nabrat svaly",
  "Zesílit",
  "Zlepšit kondici",
  "Začít pravidelně cvičit",
  "Zlepšit celkovou formu",
  "Jiný cíl",
] as const;

export const strengthExperienceOptions = [
  "Začínám úplně od začátku",
  "Už jsem někdy cvičil/a",
  "Cvičím nepravidelně",
  "Cvičím pravidelně",
  "Mám větší zkušenosti",
] as const;

export const currentActivityOptions = ["0", "1", "2", "3", "4+"] as const;
export const trainingFrequencyOptions = ["1", "2", "3", "4+"] as const;
export const sessionDurationOptions = ["45 min", "60 min", "75 min", "90+ min"] as const;
export const preferredTimeOptions = ["Ráno", "Dopoledne", "Odpoledne", "Večer"] as const;

export const workdayOptions = [
  "Převážně sedím",
  "Kombinuji sezení a pohyb",
  "Převážně se pohybuji / fyzicky pracuji",
  "Mám směnný nebo nepravidelný režim",
] as const;

export const guidanceStyleOptions = [
  "Chci vedení krok za krokem",
  "Chci kombinaci vedení a samostatnosti",
  "Chci hlavně plán a pravidelnou kontrolu",
] as const;

export type IntakeSubmission = {
  name: string;
  email: string;
  contact: string;
  birthYear: string;
  goals: string[];
  desiredOutcome: string;
  strengthExperience: string;
  currentActivityFrequency: string;
  currentActivities: string;
  exercisePreferences: string;
  trainingFrequency: string;
  sessionDuration: string;
  preferredTime: string;
  preferredDays: string;
  workday: string;
  consistencyBarrier: string;
  coachExpectation: string;
  guidanceStyle: string;
  additionalContext: string;
  preTrainingNote: string;
  privacyAccepted: boolean;
  website: string;
  startedAt: number;
};

export type IntakeField = keyof IntakeSubmission;
export type IntakeErrors = Partial<Record<IntakeField, string>>;

export const emptyIntakeSubmission: IntakeSubmission = {
  name: "",
  email: "",
  contact: "",
  birthYear: "",
  goals: [],
  desiredOutcome: "",
  strengthExperience: "",
  currentActivityFrequency: "",
  currentActivities: "",
  exercisePreferences: "",
  trainingFrequency: "",
  sessionDuration: "",
  preferredTime: "",
  preferredDays: "",
  workday: "",
  consistencyBarrier: "",
  coachExpectation: "",
  guidanceStyle: "",
  additionalContext: "",
  preTrainingNote: "",
  privacyAccepted: false,
  website: "",
  startedAt: 0,
};

const textLimits: Partial<Record<IntakeField, number>> = {
  name: 100,
  email: 254,
  contact: 160,
  birthYear: 4,
  desiredOutcome: 1200,
  currentActivities: 1000,
  exercisePreferences: 1000,
  preferredDays: 500,
  consistencyBarrier: 1200,
  coachExpectation: 1200,
  additionalContext: 1200,
  preTrainingNote: 1200,
  website: 200,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, field: IntakeField): string | null {
  const value = source[field];
  return typeof value === "string" ? value.trim() : null;
}

function isAllowed(value: string, options: readonly string[]): boolean {
  return options.includes(value);
}

export function validateIntakePayload(payload: unknown): {
  data: IntakeSubmission | null;
  errors: IntakeErrors;
} {
  if (!isRecord(payload)) {
    return { data: null, errors: { name: "Formulář se nepodařilo načíst." } };
  }

  const errors: IntakeErrors = {};
  const data: IntakeSubmission = { ...emptyIntakeSubmission, goals: [] };

  for (const field of Object.keys(textLimits) as IntakeField[]) {
    const value = readString(payload, field);
    if (value === null) {
      errors[field] = "Toto pole má neplatný formát.";
      continue;
    }

    const limit = textLimits[field] ?? 0;
    if (value.length > limit) {
      errors[field] = `Text může mít nejvýše ${limit} znaků.`;
      continue;
    }

    if (field !== "privacyAccepted" && field !== "startedAt" && field !== "goals") {
      Object.assign(data, { [field]: value });
    }
  }

  const requiredText: Array<[IntakeField, string]> = [
    ["name", "Doplň prosím jméno."],
    ["email", "Doplň prosím e-mail."],
    ["desiredOutcome", "Popiš prosím svůj očekávaný výsledek."],
    ["consistencyBarrier", "Doplň prosím krátkou odpověď."],
    ["coachExpectation", "Doplň prosím krátkou odpověď."],
  ];

  for (const [field, message] of requiredText) {
    if (!data[field]) errors[field] = message;
  }

  if (data.email && !emailPattern.test(data.email)) {
    errors.email = "Zadej prosím platný e-mail.";
  }

  if (data.birthYear) {
    const year = Number(data.birthYear);
    const currentYear = new Date().getUTCFullYear();
    if (!/^\d{4}$/.test(data.birthYear) || year < 1900 || year > currentYear) {
      errors.birthYear = "Zadej prosím platný rok.";
    }
  }

  const goals = payload.goals;
  if (!Array.isArray(goals) || goals.some((goal) => typeof goal !== "string")) {
    errors.goals = "Vyber prosím alespoň jeden cíl.";
  } else {
    const uniqueGoals = [...new Set(goals.map((goal) => goal.trim()))];
    if (uniqueGoals.length === 0 || uniqueGoals.some((goal) => !isAllowed(goal, intakeGoals))) {
      errors.goals = "Vyber prosím alespoň jeden cíl.";
    } else {
      data.goals = uniqueGoals;
    }
  }

  const selections: Array<[IntakeField, readonly string[]]> = [
    ["strengthExperience", strengthExperienceOptions],
    ["currentActivityFrequency", currentActivityOptions],
    ["trainingFrequency", trainingFrequencyOptions],
    ["sessionDuration", sessionDurationOptions],
    ["preferredTime", preferredTimeOptions],
    ["workday", workdayOptions],
    ["guidanceStyle", guidanceStyleOptions],
  ];

  for (const [field, options] of selections) {
    const value = readString(payload, field);
    if (value === null || !isAllowed(value, options)) {
      errors[field] = "Vyber prosím jednu možnost.";
    } else {
      Object.assign(data, { [field]: value });
    }
  }

  if (payload.privacyAccepted !== true) {
    errors.privacyAccepted = "Pro odeslání je potřeba potvrdit souhlas.";
  } else {
    data.privacyAccepted = true;
  }

  if (typeof payload.startedAt !== "number" || !Number.isFinite(payload.startedAt)) {
    errors.startedAt = "Formulář se nepodařilo ověřit.";
  } else {
    data.startedAt = payload.startedAt;
  }

  return {
    data: Object.keys(errors).length === 0 ? data : null,
    errors,
  };
}
