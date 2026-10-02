"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";

const control =
  "mt-2 block w-full rounded-lg border border-line-strong bg-paper px-3.5 py-3 text-[1rem] text-ink placeholder:text-subtle transition-colors focus:border-brass focus:outline-none";
const labelCls = "text-[0.875rem] font-medium text-ink";

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {!props.required && <span className="ml-1 font-normal text-subtle">(optional)</span>}
      </label>
      <input id={id} {...props} className={control} />
      {hint && <p className="mt-1.5 text-[0.82rem] text-subtle">{hint}</p>}
    </div>
  );
}
