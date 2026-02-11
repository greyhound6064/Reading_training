'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPassages } from '@/lib/supabase';
import { Passage } from '@/lib/types';
import PassageCard from './PassageCard';

export default function PassageList() {
  const searchParams = useSearchParams();
  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPassages = async () => {
      setLoading(true);
      const query = searchParams.get('q') || undefined;
      const sort = (searchParams.get('sort') as 'desc' | 'asc') || 'desc';
      const data = await getPassages(query, sort);
      setPassages(data);
      setLoading(false);
    };

    fetchPassages();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (passages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          아직 등록된 지문이 없습니다.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          우측 하단의 + 버튼을 눌러 새 지문을 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {passages.map((passage) => (
        <PassageCard key={passage.id} passage={passage} />
      ))}
    </div>
  );
}
