"use client";

import { FormEvent, useMemo, useState } from "react";
import { InputField, SelectField } from "@/components/form-field";

type FormState = {
  name: string;
  age: string;
  phoneNumber: string;
  emailAddress: string;
  instagramUsername: string;
  education: string;
  city: string;
  state: string;
  tradingExperience: string;
  expectedRegularIncome: string;
  amountToInvest: string;
  decisionSeriousness: string;
  favouriteCar: string;
  dreamIncome: string;
  hasMinimumTwoHundred: boolean;
  wantsFundedAccount: boolean;
};

const initialState: FormState = {
  name: "",
  age: "",
  phoneNumber: "",
  emailAddress: "",
  instagramUsername: "",
  education: "",
  city: "",
  state: "",
  tradingExperience: "none",
  expectedRegularIncome: "",
  amountToInvest: "",
  decisionSeriousness: "very_serious",
  favouriteCar: "",
  dreamIncome: "",
  hasMinimumTwoHundred: false,
  wantsFundedAccount: false
};

type ApiResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export default function PrivateFormPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const setValue = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const amountPreview = useMemo(() => {
    const num = Number(form.amountToInvest);
    if (!Number.isFinite(num) || num <= 0) {
      return "USD 0";
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
  }, [form.amountToInvest]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          amountToInvest: Number(form.amountToInvest)
        })
      });

      const payload: ApiResponse = await response.json();

      if (!response.ok || !payload.ok) {
        setSubmitError(payload.message || "Unable to submit your details right now.");
        setFieldErrors(payload.fieldErrors || {});
        return;
      }

      setSubmitSuccess("Your registration was received. Our team will review and contact you soon.");
      setForm(initialState);
    } catch {
      setSubmitError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-border bg-card/90 p-6 shadow-glow backdrop-blur sm:p-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">AIDEK PRIVATE FORM</p>
          <h1 className="font-[var(--font-jakarta)] text-3xl font-bold leading-tight sm:text-4xl">
            Registration & Deposit Intent
          </h1>
          <p className="max-w-3xl text-sm text-muted sm:text-base">
            Fill this private form carefully. This is a professional intake used by our admin team to evaluate profile quality,
            commitment, and capital readiness.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InputField
            label="Name"
            required
            value={form.name}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="Your full name"
            error={fieldErrors.name?.[0]}
          />

          <InputField
            label="Age"
            required
            type="number"
            min={18}
            value={form.age}
            onChange={(e) => setValue("age", e.target.value)}
            placeholder="18"
            error={fieldErrors.age?.[0]}
          />

          <InputField
            label="Phone number"
            required
            value={form.phoneNumber}
            onChange={(e) => setValue("phoneNumber", e.target.value)}
            placeholder="+91..."
            error={fieldErrors.phoneNumber?.[0]}
          />

          <InputField
            label="Email address"
            required
            type="email"
            value={form.emailAddress}
            onChange={(e) => setValue("emailAddress", e.target.value)}
            placeholder="you@example.com"
            error={fieldErrors.emailAddress?.[0]}
          />

          <InputField
            label="Instagram username"
            value={form.instagramUsername}
            onChange={(e) => setValue("instagramUsername", e.target.value)}
            placeholder="@username"
            error={fieldErrors.instagramUsername?.[0]}
          />

          <InputField
            label="Education"
            required
            value={form.education}
            onChange={(e) => setValue("education", e.target.value)}
            placeholder="Highest qualification"
            error={fieldErrors.education?.[0]}
          />

          <InputField
            label="City"
            required
            value={form.city}
            onChange={(e) => setValue("city", e.target.value)}
            placeholder="Your city"
            error={fieldErrors.city?.[0]}
          />

          <InputField
            label="State"
            required
            value={form.state}
            onChange={(e) => setValue("state", e.target.value)}
            placeholder="Your state"
            error={fieldErrors.state?.[0]}
          />

          <SelectField
            label="Experience in trading"
            required
            value={form.tradingExperience}
            onChange={(value) => setValue("tradingExperience", value)}
            options={[
              { value: "none", label: "No experience" },
              { value: "beginner", label: "Beginner (0-1 year)" },
              { value: "intermediate", label: "Intermediate (1-3 years)" },
              { value: "advanced", label: "Advanced (3+ years)" }
            ]}
            error={fieldErrors.tradingExperience?.[0]}
          />

          <InputField
            label="Expected regular income"
            required
            value={form.expectedRegularIncome}
            onChange={(e) => setValue("expectedRegularIncome", e.target.value)}
            placeholder="Example: 2000 USD/month"
            error={fieldErrors.expectedRegularIncome?.[0]}
          />

          <InputField
            label="Exact amount to invest"
            required
            type="number"
            min={200}
            value={form.amountToInvest}
            onChange={(e) => setValue("amountToInvest", e.target.value)}
            placeholder="Minimum 200"
            hint={`Current entry: ${amountPreview}`}
            error={fieldErrors.amountToInvest?.[0]}
          />

          <SelectField
            label="Are you extremely serious with your decision?"
            required
            value={form.decisionSeriousness}
            onChange={(value) => setValue("decisionSeriousness", value)}
            options={[
              { value: "very_serious", label: "Yes, very serious" },
              { value: "exploring", label: "Still exploring" },
              { value: "not_sure", label: "Not sure yet" }
            ]}
            error={fieldErrors.decisionSeriousness?.[0]}
          />

          <InputField
            label="Favourite car"
            required
            value={form.favouriteCar}
            onChange={(e) => setValue("favouriteCar", e.target.value)}
            placeholder="Example: Porsche 911"
            error={fieldErrors.favouriteCar?.[0]}
          />

          <InputField
            label="Dream income"
            required
            value={form.dreamIncome}
            onChange={(e) => setValue("dreamIncome", e.target.value)}
            placeholder="Example: 10,000 USD/month"
            error={fieldErrors.dreamIncome?.[0]}
          />

          <div className="sm:col-span-2 space-y-4 rounded-xl border border-border bg-background/50 p-4">
            <label className="flex items-start gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={form.hasMinimumTwoHundred}
                onChange={(e) => setValue("hasMinimumTwoHundred", e.target.checked)}
                className="mt-1 size-4 rounded border-border bg-card text-accent"
              />
              <span>
                I confirm that I have at least <strong>$200</strong> available to start. This is mandatory.
              </span>
            </label>
            {fieldErrors.hasMinimumTwoHundred?.[0] ? (
              <p className="text-xs text-danger">{fieldErrors.hasMinimumTwoHundred[0]}</p>
            ) : null}

            <label className="flex items-start gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={form.wantsFundedAccount}
                onChange={(e) => setValue("wantsFundedAccount", e.target.checked)}
                className="mt-1 size-4 rounded border-border bg-card text-accent"
              />
              <span>I want a funded account for free.</span>
            </label>
          </div>

          {submitError ? <p className="sm:col-span-2 text-sm text-danger">{submitError}</p> : null}
          {submitSuccess ? <p className="sm:col-span-2 text-sm text-success">{submitSuccess}</p> : null}

          <div className="sm:col-span-2 mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl border border-accent/40 bg-accent/10 px-6 py-3 font-semibold text-accent transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Private Form"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
