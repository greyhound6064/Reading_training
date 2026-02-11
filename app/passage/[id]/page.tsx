'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPassage, deletePassage } from '@/lib/supabase';
import { Passage, TabType } from '@/lib/types';
import ReaderHeader from '@/components/PassageReader/ReaderHeader';
import ReaderContent from '@/components/PassageReader/ReaderContent';
import { useReaderSettings } from '@/lib/store';

export default function PassagePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('original');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isDarkMode } = useReaderSettings();

  useEffect(() => {
    const fetchPassage = async () => {
      setLoading(true);
      const data = await getPassage(id);
      setPassage(data);
      setLoading(false);
    };

    if (id) {
      fetchPassage();
    }
  }, [id]);

  useEffect(() => {
    // 다크모드 적용
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDelete = async () => {
    if (!passage) return;
    
    setIsDeleting(true);
    try {
      await deletePassage(passage.id);
      router.push('/');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">지문을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <ReaderHeader
        passageId={passage.id}
        title={passage.title}
        tags={passage.tags}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDelete={() => setShowDeleteModal(true)}
      />
      <ReaderContent
        activeTab={activeTab}
        originalText={passage.original_text}
        analysisText={passage.analysis_text}
        vocabularyText={passage.vocabulary_text}
      />

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              지문 삭제
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              정말로 &quot;{passage.title}&quot;을(를) 삭제하시겠습니까?<br />
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    삭제 중...
                  </>
                ) : (
                  '삭제'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
