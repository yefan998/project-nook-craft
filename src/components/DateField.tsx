import { forwardRef } from "react";

interface DateFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

/**
 * Floating-label date input matching the cosmic editorial aesthetic.
 * Uses a native date picker for accuracy and mobile friendliness.
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label = "Date of Birth", value, onChange, id = "dob" }, ref) => {
    return (
      <div className="group relative flex-1">
        <label
          htmlFor={id}
          className="label-mono absolute -top-2.5 left-4 z-10 bg-background px-2 text-[10px] text-accent"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type="date"
          value={value}
          min="1900-01-01"
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-sm border border-border bg-transparent px-6 py-5 text-lg text-foreground outline-none ring-primary/20 transition-all [color-scheme:dark] focus:border-primary focus:ring-4"
        />
      </div>
    );
  },
);
DateField.displayName = "DateField";
