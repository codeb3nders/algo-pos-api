import { create } from 'zustand';
import { getItems } from '../api/item';
import { Item, ItemStore } from '../interface';

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  loadingData: false,
  loadItems: async () => {
    try {
      set({ loadingData: true });
      const response: Item[] = await getItems();
      set({ items: response });
    } catch {
      // Todo show error
    } finally {
      set({ loadingData: false });
    }
  },
}));
