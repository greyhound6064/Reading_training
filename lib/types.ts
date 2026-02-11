export interface Passage {
  id: string;
  title: string;
  source?: string;
  type?: string;
  tags: string[];
  original_text: string;
  analysis_text?: string;
  vocabulary_text?: string;
  created_at: string;
  updated_at: string;
}

export type TabType = 'original' | 'analysis' | 'vocabulary';
