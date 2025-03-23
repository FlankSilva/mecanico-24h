import { AlertCircle } from 'lucide-react';

interface TooltipErrorProps {
  message?: string;
  className?: string;
}

export function TooltipError({ message, className }: TooltipErrorProps) {
  if (!message) return null;

  return (
    <div className={`relative group inline-block`}>
      <AlertCircle size={20} color="red" />
      <div className="w-[100px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-red-500 text-white text-xs rounded py-1 px-2  shadow-md">
        {message}
      </div>
    </div>
  );
}
