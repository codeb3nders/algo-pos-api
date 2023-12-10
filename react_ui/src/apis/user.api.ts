import { USER_URL } from '@/constants/user.constant';
import axios from 'axios';

export const getUser = (id: string) => {
  const url: string = `${USER_URL}/auth/users/${id}`;

  try {
    return axios(url);
  } catch (error) {}
};

export const getAllUsers = () => {
  const url: string = `${USER_URL}/auth/users`;
  return axios(url, { withCredentials: true });
};

export const loginUser = async (email: string, password: string) => {
  const url: string = `${USER_URL}/auth/login`;
  return await axios.post(url, { email, password }, { withCredentials: true });
};

export const logoutUser = () => {
  const url: string = `${USER_URL}/auth/logout`;
  return axios(url, { withCredentials: true });
};
