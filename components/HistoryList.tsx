'use client';

import { Translation } from '@/types';

interface HistoryListProps {
  items: Translation[];
  onDelete: (id: string) => void;
}

export default function HistoryList({ items, onDelete }: HistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No translations yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {item.source_lang.toUpperCase()} → {item.target_lang.toUpperCase()}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-gray-500">Source:</span>
              <p className="text-gray-800">{item.source_text}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Target:</span>
              <p className="text-gray-800">{item.target_text}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}