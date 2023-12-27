export interface ItemStore {
  items: Item[];
  loadItems: () => void;
  loadingData: boolean;
}

export interface Sales {
  customer: string;
  orders: any;
  status: string;
  paymentMethod: string;
  date: Date;
  amount: number;
  discount: number;
  Vat: number;
}

export interface Discount {
  type: string;
  value: number;
}

export interface SalesStore {
  sales: Sales[];
  discount: Discount | null;
  vat: Discount | null;
  isSaving: boolean;
  saveSales: (sales: Sales) => void;
  setDiscount: (discount: Discount) => void;
  setVat: (vat: Discount) => void;
}

export interface Order {
  customer: any;
  date: Date;
  item: string;
  option: string;
  itemId: string;
  price: number;
  quantity: number;
  status: any;
  total: number;
}

export interface GroupedOrders {
  [item: string]: {
    totalPriceByItem: number;
    totalItemsByItem: number;
    orders: Order[];
  };
}

export interface GroupedOrderItem {
  totalQuantity: number;
  totalPrice: number;
  orders: GroupedOrders;
}

export interface OrderStore {
  queueOrder: Item | null;
  orders: Order[];
  voucher: GroupedOrderItem | null | undefined;
  setQueueOrder: (item: Item | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orders: Order[]) => void;
  loadingData: boolean;
  createVoucher: (voucher: Order[]) => void;
}

export interface Item {
  _id: string;
  category: string;
  item: string;
  image: string;
  option: string;
  price: number;
  cost: number;
  modifier: number;
  onlineStoreAvailability: boolean;
  onlineStoreDescription: string;
  VATExempt: boolean;
  customer?: string;
}

export interface Order {
  itemId: string;
  item: string;
  option: string;
  quantity: number;
  price: number;
  deduction: { name: string; value: number };
  total: number;
  date: Date;
  customer: any;
  status: any;
}
