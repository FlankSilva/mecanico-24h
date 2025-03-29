import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TooltipErrorProps {
  message?: string;
  className?: string;
}

export function TooltipError({ message, className }: TooltipErrorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleToggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  if (!message) return null;

  return (
    <div className="relative inline-block">
      {/* Botão para exibir Tooltip */}
      <div
        className="group cursor-pointer"
        onClick={handleToggleVisibility}
        onMouseEnter={() => !isMobile && setIsVisible(true)}
        onMouseLeave={() => !isMobile && setIsVisible(false)}
      >
        <AlertCircle size={20} color="red" />
      </div>

      <div
        className={`w-[100px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 ${isVisible ? 'block' : 'hidden'} bg-red-500 text-white text-xs rounded py-1 px-2 shadow-md`}
      >
        {message}
      </div>
    </div>
  );
}
