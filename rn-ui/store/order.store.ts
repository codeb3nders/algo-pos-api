import { create } from 'zustand';
import {
  Item,
  Order,
  OrderStore,
  GroupedOrderItem,
  GroupedOrders,
} from '../interface';

export const useOrderStore = create<OrderStore>((set) => ({
  queueOrder: null,
  orders: [],
  loadingData: false,
  voucher: null,
  setQueueOrder: (order: Item | null) =>
    set({ queueOrder: order ? order : null }),
  addOrder: async (order: Order) => {
    try {
      set(() => {
        return { loadingData: true };
      });
      set(({ orders }) => {
        const existingOrderIndex = orders.findIndex(
          (existingOrder) => existingOrder.itemId === order.itemId,
        );

        if (existingOrderIndex !== -1) {
          // Item already exists, update quantity
          const updatedOrders = [...orders];
          updatedOrders[existingOrderIndex].quantity += order.quantity;
          return { orders: updatedOrders };
        } else {
          // Item doesn't exist, add new order
          return { orders: [...orders, order] };
        }
      });
    } catch (error) {
      console.error('Error adding order:', error);
    } finally {
      set({ loadingData: false });
    }
  },

  updateOrder: (orders: Order[] | null) =>
    set({ orders: orders ? orders : [] }),

  createVoucher: (orders: Order[]) => {
    {
      const groupedOrders: GroupedOrders = {};

      orders.forEach((order: Order) => {
        const { item, price, quantity, total } = order;

        if (!groupedOrders[item]) {
          groupedOrders[item] = {
            totalPriceByItem: 0,
            totalItemsByItem: 0,
            orders: [],
          };
        }

        groupedOrders[item].totalPriceByItem += total;
        groupedOrders[item].totalItemsByItem += quantity;
        groupedOrders[item].orders.push({ ...order, total });
      });

      const grandTotalPrice: number = Object.values(groupedOrders).reduce(
        (sum, itemGroup) => sum + itemGroup.totalPriceByItem,
        0,
      );

      const totalItems: number = Object.values(groupedOrders).reduce(
        (sum, itemGroup) => sum + itemGroup.totalItemsByItem,
        0,
      );

      const all = {
        totalQuantity: totalItems,
        totalPrice: grandTotalPrice,
        orders: groupedOrders,
      };

      set({ voucher: all });
    }
  },
}));
