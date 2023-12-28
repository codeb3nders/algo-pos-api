import { Order, Sales } from '../interface';

const salesDb: Sales[] = [];

export const getSales = async () => {
  return salesDb;
};

export const saveSales = async (sales: Sales) => {
  salesDb.push(sales);
  return sales;
};

export const updateSales = async (sales: Sales) => {
  // const saleStore = useSalesStore();

  // Example usage:

  const orderIdToUpdate: any = sales._id;
  const itemIdToUpdate: any = null;
  const newQuantity: any = sales;

  const updatedSales = updateQuantityByOrderId(
    salesDb,
    orderIdToUpdate,
    itemIdToUpdate,
    newQuantity,
  );

  return updatedSales;
};

// Function to update the quantity of an item in the 'orders' array based on '_id'
function updateQuantityByOrderId(
  sales: Sales[],
  orderIdToUpdate: any,
  itemIdToUpdate: string,
  newQuantity: number,
): Sales[] {
  return sales.map((sale) => {
    if (sale._id === orderIdToUpdate) {
      // If the '_id' matches, update the 'orders' array
      const updatedOrders = sale.orders.map((order: Order) => {
        if (order.itemId === itemIdToUpdate) {
          // If the 'itemId' of the order matches, update the quantity
          return {
            ...order,
            quantity: newQuantity,
            total: order.price * newQuantity,
          };
        }
        // If the 'itemId' of the order doesn't match, keep the order unchanged
        return order;
      });

      // Return the sale with the updated 'orders' array
      return { ...sale, orders: updatedOrders };
    }
    // If the '_id' doesn't match, keep the sale unchanged
    return sale;
  });
}
