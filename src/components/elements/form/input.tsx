import { InputHTMLAttributes } from 'react';
import { TooltipError } from './toltip';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  message?: string;
};

export function Input({ label, message, ...rest }: InputProps) {
  return (
    <div className="flex items-center border-b border-zinc-400 pr-1">
      <div className=" flex-1">
        <label htmlFor="" className="text-[14px] text-blue-500 font-bold">
          {label}
        </label>

        <input
          type="text"
          className="w-full p-0.5 border-b border-zinc-400 text-[14px]"
          {...rest}
        />
      </div>
      <TooltipError message={message} />
    </div>
  );
}
