export interface ItemStore {
  items: Item[];
  loadItems: () => void;
  loadingData: boolean;
}

export interface Order {
  customer: any;
  date: string;
  item: string;
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
  option: string;
  price: number;
  cost: number;
  modifier: number;
  customer?: string;
  onlineStoreAvailability: boolean;
  onlineStoreDescription: string;
  VATExempt: boolean;
}

export interface Order {
  itemId: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  customer: any;
  status: any;
}
