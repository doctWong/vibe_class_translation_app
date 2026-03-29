'use client';

import { useState } from 'react';
import { LanguageSwitch } from './LanguageSwitch';
import { TranslationResult } from './TranslationResult';

export function TranslatorCard() {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState<'en' | 'zh'>('en');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSwitch = () => {
    setSourceLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang: sourceLang === 'en' ? 'zh' : 'en',
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setResult(data.data.translation);
      } else {
        setResult(data.error || 'Translation failed');
      }
    } catch {
      setResult('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Translate</h2>
          <LanguageSwitch sourceLang={sourceLang} onSwitch={handleSwitch} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {sourceLang === 'en' ? 'English' : 'Chinese'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter ${sourceLang === 'en' ? 'English' : 'Chinese'} text to translate...`}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading || !text.trim()}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {result && <TranslationResult result={result} onCopy={handleCopy} />}
      </div>
    </div>
  );
}