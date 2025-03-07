import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Loading } from '../loading';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  isLoading = false,

  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        py-1 px-4 rounded 
        hover:bg-[#4338ca]/70 
        bg-[#4338ca]
        transition-all 
        duration-300 
        flex 
        justify-center
        w-full
         ${isLoading && 'pointer-events-none'}
        `}
      {...rest}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}
