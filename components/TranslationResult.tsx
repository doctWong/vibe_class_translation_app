'use client';

import { useState } from 'react';

interface TranslationResultProps {
  result: string;
  onCopy: () => void;
}

export function TranslationResult({ result, onCopy }: TranslationResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Translation</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-900 whitespace-pre-wrap">{result}</p>
      </div>
    </div>
  );
}