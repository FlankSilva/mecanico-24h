'use client';

import { Copy } from 'lucide-react';
import { useState } from 'react';

export default function CopyTextField({
  uniqueCode = '',
}: {
  uniqueCode: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uniqueCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar', error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 border p-2 rounded-lg mb-4">
      <span className="text-gray-700">{uniqueCode}</span>
      <button onClick={handleCopy}>
        <Copy color={copied ? '#2ecc71' : '#ccc'} />
      </button>
    </div>
  );
}
