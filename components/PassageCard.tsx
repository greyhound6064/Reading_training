import Link from 'next/link';
import { Passage } from '@/lib/types';

interface PassageCardProps {
  passage: Passage;
}

export default function PassageCard({ passage }: PassageCardProps) {
  const formattedDate = new Date(passage.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/passage/${passage.id}`}
      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {passage.title}
          </h3>
          
          {passage.tags && passage.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {passage.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
        </div>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </Link>
  );
}
