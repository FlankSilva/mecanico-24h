import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor="" className="text-[14px] text-blue-500 font-bold">
        {label}
      </label>

      <input
        type="text"
        className="w-full p-0.5 border-b border-zinc-400 text-[14px]"
        {...rest}
      />
    </div>
  );
}
