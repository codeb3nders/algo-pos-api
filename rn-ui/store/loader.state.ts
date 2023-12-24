import { create } from 'zustand';

interface LoaderStateInterface {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoaderStore = create<LoaderStateInterface>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: any) => set({ isLoading }),
}));
