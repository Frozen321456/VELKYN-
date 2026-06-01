import { create } from 'zustand';

interface AppState {
  activeSection: number;
  scrollProgress: number;
  hoveredAssetId: string | null;
  setActiveSection: (section: number) => void;
  setScrollProgress: (progress: number) => void;
  setHoveredAssetId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  activeSection: 0,
  scrollProgress: 0,
  hoveredAssetId: null,
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setHoveredAssetId: (id) => set({ hoveredAssetId: id }),
}));
