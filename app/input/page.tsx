'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PassageForm from '@/components/PassageForm';
import { getPassage } from '@/lib/supabase';
import { Passage } from '@/lib/types';

function InputPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchPassage = async () => {
        setLoading(true);
        const data = await getPassage(id);
        setPassage(data);
        setLoading(false);
      };
      fetchPassage();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">
            {passage ? '지문 수정' : '새 지문 추가'}
          </h1>
        </div>

        <PassageForm existingPassage={passage} />
      </div>
    </main>
  );
}

export default function InputPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      </main>
    }>
      <InputPageContent />
    </Suspense>
  );
}
