'use client';

import { useResponseCreateUser } from '@/context/responseCreateUser';

export function TextErrorGeneral({ children }: { children: React.ReactNode }) {
  const { messageResponse } = useResponseCreateUser();

  return (
    <p
      className={`
        text-red-600 
        text-[13px] 
        text-center
        ${messageResponse ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {children}
    </p>
  );
}
