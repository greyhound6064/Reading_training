'use client';

import { useReaderSettings } from '@/lib/store';
import { TabType } from '@/lib/types';

interface ReaderContentProps {
  activeTab: TabType;
  originalText: string;
  analysisText?: string;
  vocabularyText?: string;
}

export default function ReaderContent({
  activeTab,
  originalText,
  analysisText,
  vocabularyText,
}: ReaderContentProps) {
  const { fontSize } = useReaderSettings();

  const renderContent = () => {
    let content = '';
    let isOriginal = false;

    switch (activeTab) {
      case 'original':
        content = originalText;
        isOriginal = true;
        break;
      case 'analysis':
        content = analysisText || '분석 내용이 없습니다.';
        break;
      case 'vocabulary':
        content = vocabularyText || '어휘 보충 내용이 없습니다.';
        break;
    }

    // 문단 분리
    const paragraphs = content.split('\n').filter((p) => p.trim());

    return (
      <div
        className={`${isOriginal ? 'reader-content' : 'px-4 md:px-8 py-6'}`}
        style={{ fontSize: isOriginal ? `${fontSize}px` : undefined }}
      >
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`${
              isOriginal
                ? 'mb-6'
                : 'mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-white dark:bg-gray-900">
      {renderContent()}
    </div>
  );
}
