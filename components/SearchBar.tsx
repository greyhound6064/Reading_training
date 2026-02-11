'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(
    (searchParams.get('sort') as 'desc' | 'asc') || 'desc'
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('sort', sortOrder);
    router.push(`/?${params.toString()}`);
  };

  const handleSortChange = (order: 'desc' | 'asc') => {
    setSortOrder(order);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('sort', order);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목 또는 태그로 검색..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          검색
        </button>
      </form>

      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange('desc')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            sortOrder === 'desc'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => handleSortChange('asc')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            sortOrder === 'asc'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          오래된순
        </button>
      </div>
    </div>
  );
}
