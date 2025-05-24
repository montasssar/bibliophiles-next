'use client';
import { useState } from 'react';
import SavedBooks from '@/components/library/SavedBooks';
import SavedQuotes from '@/components/library/SavedQuotes';
import Marketplace from '@/components/library/Marketplace';

const tabs = [
  { key: 'books', label: '📚 Saved Books' },
  { key: 'quotes', label: '💬 Saved Quotes' },
  { key: 'market', label: '🛍️ Marketplace' },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-red-600 text-white'
                : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'books' && <SavedBooks />}
        {activeTab === 'quotes' && <SavedQuotes />}
        {activeTab === 'market' && <Marketplace />}
      </div>
    </main>
  );
}
