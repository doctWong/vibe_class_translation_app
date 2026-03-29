'use client';

interface LanguageSwitchProps {
  sourceLang: 'en' | 'zh';
  onSwitch: () => void;
}

export function LanguageSwitch({ sourceLang, onSwitch }: LanguageSwitchProps) {
  const isEnToZh = sourceLang === 'en';

  return (
    <button
      onClick={onSwitch}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-900">
        {isEnToZh ? 'English' : '中文'}
      </span>
      <span className="text-gray-400">→</span>
      <span className="font-medium text-gray-900">
        {isEnToZh ? '中文' : 'English'}
      </span>
    </button>
  );
}