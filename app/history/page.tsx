'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import HistoryList from '@/components/HistoryList';
import { Translation } from '@/types';

export default function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<Translation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 20;

  const fetchHistory = async (pageNum: number, search: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/history?${params}`);
      const data = await response.json();

      if (data.success) {
        setItems(data.data.items);
        setTotal(data.data.total);
        setPage(pageNum);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(page, searchQuery);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    fetchHistory(1, query);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
        setTotal(total - 1);
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      fetchHistory(page - 1, searchQuery);
    }
  };

  const handleNext = () => {
    if (page * limit < total) {
      fetchHistory(page + 1, searchQuery);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 text-sm mb-4 inline-block"
        >
          ← Back to Translator
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Translation History</h1>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <>
          <HistoryList items={items} onDelete={handleDelete} />

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}