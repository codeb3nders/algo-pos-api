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
      set({ loadingData: true });
      set(({ orders }) => ({ orders: [...orders, order] }));
    } catch {
      // Todo show error
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

        // const total = price * quantity;
        groupedOrders[item].totalPriceByItem += total;
        groupedOrders[item].totalItemsByItem += quantity;
        groupedOrders[item].orders.push({ ...order, total });
      });

      // Calculate grand total price
      const grandTotalPrice: number = Object.values(groupedOrders).reduce(
        (sum, itemGroup) => sum + itemGroup.totalPriceByItem,
        0,
      );

      // Calculate total items
      const totalItems: number = Object.values(groupedOrders).reduce(
        (sum, itemGroup) => sum + itemGroup.totalItemsByItem,
        0,
      );

      // Log the results

      const all = {
        totalQuantity: totalItems,
        totalPrice: grandTotalPrice,
        orders: groupedOrders,
      };

      set({ voucher: all });
    }
  },

  // createVoucher: (orders: Order[]) => {
  //   const groupedOrderItems: GroupedOrderItem[] = [];

  //   orders.forEach((order: Order) => {
  //     const existingGroup = groupedOrderItems.find(
  //       (group) => group.itemId === order.itemId,
  //     );

  //     if (existingGroup) {
  //       existingGroup.totalQuantity += order.quantity;
  //       existingGroup.totalPrice += order.total;
  //       existingGroup.orders.push(order);
  //     } else {
  //       groupedOrderItems.push({
  //         itemId: order.itemId,
  //         totalQuantity: order.quantity,
  //         totalPrice: order.total,
  //         orders: [order],
  //       });
  //     }
  //   });

  //   set({ voucher: groupedOrderItems ? groupedOrderItems : null });
  // },
}));
