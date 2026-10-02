"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const control =
  "mt-2 block w-full rounded-[2px] border border-line-strong bg-white px-3.5 py-3 text-[1rem] text-ink placeholder:text-subtle/80 transition-colors focus:border-navy focus:outline-none";
const labelCls = "text-[0.78rem] font-semibold tracking-[0.08em] text-navy uppercase";

function Wrap({ id, label, required, hint, children }: { id: string; label: string; required?: boolean; hint?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required ? <span className="text-gold-deep"> *</span> : <span className="ml-1 font-normal tracking-normal text-subtle normal-case">(optional)</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[0.82rem] text-subtle">{hint}</p>}
    </div>
  );
}

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: ReactNode }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={props.required} hint={hint}>
      <input id={id} {...props} className={control} />
    </Wrap>
  );
}

export function Select({ label, hint, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; hint?: ReactNode }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={props.required} hint={hint}>
      <select id={id} {...props} className={`${control} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 8l5 5 5-5%22 fill=%22none%22 stroke=%22%23071B33%22 stroke-width=%221.6%22/></svg>')] bg-[length:18px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}>
        {children}
      </select>
    </Wrap>
  );
}

export function TextArea({ label, hint, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: ReactNode }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={props.required} hint={hint}>
      <textarea id={id} {...props} className={`${control} min-h-28 resize-y`} />
    </Wrap>
  );
}

/** Minus / number / plus. */
export function Quantity({ value, onChange, min = 1, max = 500, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label?: string }) {
  const id = useId();
  const set = (n: number) => onChange(Math.min(max, Math.max(min, Number.isFinite(n) ? Math.round(n) : min)));
  const btn = "flex h-12 w-12 items-center justify-center text-[1.2rem] text-navy transition-colors hover:bg-mist disabled:opacity-30";
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="mt-2 inline-flex items-center border border-line-strong">
        <button type="button" className={btn} onClick={() => set(value - 1)} disabled={value <= min} aria-label="Fewer">
          −
        </button>
        <input id={id} inputMode="numeric" value={value} onChange={(e) => set(Number(e.target.value.replace(/\D/g, "")) || min)} className="h-12 w-14 border-x border-line-strong text-center text-[1rem] focus:outline-none" />
        <button type="button" className={btn} onClick={() => set(value + 1)} disabled={value >= max} aria-label="More">
          +
        </button>
      </div>
    </div>
  );
}

/** Small rectangular option buttons, e.g. sizes. */
export function Options({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className={labelCls}>{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-w-12 border px-3.5 py-2.5 text-[0.88rem] transition-colors ${value === o ? "border-navy bg-navy text-white" : "border-line-strong text-navy hover:border-navy"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
