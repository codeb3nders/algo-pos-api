export interface ItemStore {
  items: Item[];
  loadItems: () => void;
  loadingData: boolean;
}

export interface Sales {
  _id: any;
  customer: string;
  orders: any;
  status: string;
  paymentMethod: string;
  date: Date;
  amount: number;
  discount: number;
  Vat: number;
  referenceNumber?: string;
  details?: string;
}

export interface Discount {
  type: string;
  value: number;
}

export interface IPaymentMethod {
  type: string;
}

export interface SalesStore {
  sales: Sales[];
  discount: Discount | null;
  vat: Discount | null;
  isSaving: boolean;
  getSales: () => void;
  saveSales: (sales: Sales) => void;
  setDiscount: (discount: Discount) => void;
  updateSales: (sales: Sales) => void;
  setVat: (vat: Discount) => void;
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
  paymentMethod?: string;
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
  categoryColor: string;
  item: string;
  image: string;
  option: string;
  price: number;
  cost: number;
  modifier: number;
  onlineStoreAvailability: boolean;
  onlineStoreDescription: string;
  VATExempt: boolean;
  variants?: {name: string; price: number}[] | null;
  customer?: string;
}

export interface Order {
  itemId: string;
  item: string;
  option: string;
  quantity: number;
  price: number;
  deduction: {type: string; value: number} | null;
  total: number;
  date: Date;
  customer: any;
  status: any;
}

export interface SettingProperty {
  autoPrint: boolean;
}

export interface ISetting {
  settings: SettingProperty | null;
  setSettings: (settings: SettingProperty) => void;
}
