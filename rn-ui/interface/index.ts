export interface ItemStore {
  items: Item[];
  loadItems: () => void;
  loadingData: boolean;
}

export interface Item {
  category: string;
  item: string;
  option: string;
  price: number;
  cost: number;
  modifier: number;
  onlineStoreAvailability: boolean;
  onlineStoreDescription: string;
  VATExempt: boolean;
}
