import { create } from 'zustand';

import { Discount, Sales, SalesStore } from '../interface';
import { saveSales } from '../api/sales';

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  discount: null,
  vat: null,
  isSaving: false,
  saveSales: async (sales: Sales) => {
    try {
      set({ isSaving: true });
      const response = await saveSales(sales);
      set(({ sales }) => ({ sales: [...sales, response] }));
    } catch {
      // Todo show error
    } finally {
      set({ isSaving: false });
    }
  },
  setDiscount: async (discount: Discount) => {
    set({ discount: discount });
  },
  setVat: async (vat: Discount) => {
    set({ vat: vat });
  },
}));
