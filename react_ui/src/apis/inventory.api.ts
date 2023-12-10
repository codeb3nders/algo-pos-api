import { INVENTORY_URL } from '@/constants/inventory.constant';
import axios from 'axios';

export const getInventory = (id: string) => {
  const url: string = `${INVENTORY_URL}/${id}`;

  try {
    return axios(url, { withCredentials: true });
  } catch (error) {}
};

export const getAllInventory = () => {
  const url: string = `${INVENTORY_URL}`;
  return axios(url, { withCredentials: true });
};
