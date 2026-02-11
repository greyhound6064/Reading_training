import Link from "next/link";
import { Suspense } from "react";
import PassageList from "@/components/PassageList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">독해력 훈련</h1>
        
        <Suspense fallback={<div className="mb-6 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />}>
          <SearchBar />
        </Suspense>
        
        <Suspense fallback={
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        }>
          <PassageList />
        </Suspense>
        
        {/* 새 지문 추가 버튼 (하단 고정) */}
        <Link
          href="/input"
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="새 지문 추가"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
