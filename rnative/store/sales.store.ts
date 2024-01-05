import { create } from 'zustand';

import { Discount, Sales, SalesStore } from '../interface';
import { saveSales, updateSales, getSales } from '../api/sales';

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  discount: null,
  vat: null,
  isSaving: false,
  getSales: async () => {
    const response = await getSales();
    set({ sales: response });
  },
  saveSales: async (sales: Sales) => {
    try {
      set({ isSaving: true });
      await saveSales(sales);
    } catch {
      // Todo show error
    } finally {
      set({ isSaving: false });
    }
  },

  updateSales: async (sales: Sales) => {
    try {
      set({ isSaving: true });

      const response = await updateSales(sales);
      set({ sales: response });
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