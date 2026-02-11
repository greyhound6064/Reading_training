'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPassage, updatePassage } from '@/lib/supabase';
import { Passage } from '@/lib/types';

interface PassageFormProps {
  existingPassage?: Passage | null;
}

export default function PassageForm({ existingPassage }: PassageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    original_text: '',
    analysis_text: '',
    vocabulary_text: '',
  });

  useEffect(() => {
    if (existingPassage) {
      setFormData({
        title: existingPassage.title,
        tags: existingPassage.tags.join(', '),
        original_text: existingPassage.original_text,
        analysis_text: existingPassage.analysis_text || '',
        vocabulary_text: existingPassage.vocabulary_text || '',
      });
    }
  }, [existingPassage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 필수 필드 검증
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!formData.original_text.trim()) {
      setError('원문을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 태그를 배열로 변환
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const passageData = {
        title: formData.title,
        tags,
        original_text: formData.original_text,
        analysis_text: formData.analysis_text || undefined,
        vocabulary_text: formData.vocabulary_text || undefined,
      };

      if (existingPassage) {
        // 수정 모드
        await updatePassage(existingPassage.id, passageData);
        router.push(`/passage/${existingPassage.id}`);
      } else {
        // 생성 모드
        await createPassage(passageData);
        router.push('/');
      }
    } catch (err) {
      console.error('Error saving passage:', err);
      setError('지문 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          제목 (출처) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="예: 2023학년도 수능 - 과학"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          태그 (쉼표로 구분)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="예: 수능, 과학, 물리"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          여러 태그를 입력할 때는 쉼표로 구분해주세요.
        </p>
      </div>

      <div>
        <label
          htmlFor="original_text"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          원문 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="original_text"
          name="original_text"
          value={formData.original_text}
          onChange={handleChange}
          rows={10}
          placeholder="지문의 원문을 입력하세요..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 resize-y"
          required
        />
      </div>

      <div>
        <label
          htmlFor="analysis_text"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          분석 내용
        </label>
        <textarea
          id="analysis_text"
          name="analysis_text"
          value={formData.analysis_text}
          onChange={handleChange}
          rows={8}
          placeholder="지문에 대한 분석 내용을 입력하세요..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 resize-y"
        />
      </div>

      <div>
        <label
          htmlFor="vocabulary_text"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          어휘 보충
        </label>
        <textarea
          id="vocabulary_text"
          name="vocabulary_text"
          value={formData.vocabulary_text}
          onChange={handleChange}
          rows={8}
          placeholder="어휘 보충 내용을 입력하세요..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 resize-y"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '저장 중...' : (existingPassage ? '수정하기' : '저장하기')}
        </button>
      </div>
    </form>
  );
}
