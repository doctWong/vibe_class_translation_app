'use client';

import { UserMenu } from '@/components/UserMenu';
import { TranslatorCard } from '@/components/TranslatorCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Translate</h1>
          <UserMenu />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <TranslatorCard />
      </main>
    </div>
  );
}