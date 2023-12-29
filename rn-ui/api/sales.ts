import { Order, Sales } from '../interface';

let salesDb: Sales[] = [];

export const getSales = async () => {
  return salesDb;
};

export const saveSales = async (sales: Sales) => {
  salesDb.push(sales);
  return sales;
};

export const updateSales = async (sales: Sales) => {
  const targetId = sales._id;

  const newArray = salesDb.map((item) => {
    if (item._id === targetId) {
      // Update the status to "paid"
      return { ...item, ...sales };
    }
    return item;
  });

  salesDb = newArray;
  return salesDb;
};

// Function to update the quantity of an item in the 'orders' array based on '_id'
