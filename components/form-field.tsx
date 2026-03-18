import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

type InputFieldProps = FieldProps & InputHTMLAttributes<HTMLInputElement>;

type TextareaFieldProps = FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const baseInputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white placeholder:text-muted transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

export function InputField({ label, error, hint, required, className, ...props }: InputFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/95">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      <input className={clsx(baseInputClass, className)} {...props} />
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </label>
  );
}

export function TextareaField({ label, error, hint, required, className, ...props }: TextareaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/95">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      <textarea className={clsx(baseInputClass, "min-h-[110px] resize-y", className)} {...props} />
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </label>
  );
}

type SelectFieldProps = FieldProps & {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

export function SelectField({ label, error, hint, required, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/95">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(baseInputClass, "appearance-none")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </label>
  );
}
