import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReaderSettings {
  fontSize: number;
  isDarkMode: boolean;
  setFontSize: (size: number) => void;
  toggleDarkMode: () => void;
}

export const useReaderSettings = create<ReaderSettings>()(
  persist(
    (set) => ({
      fontSize: 16,
      isDarkMode: false,
      setFontSize: (size) => set({ fontSize: size }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'reader-settings',
    }
  )
);
