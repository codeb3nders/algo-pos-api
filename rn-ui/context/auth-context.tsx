import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { loginUser } from '../api/auth';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'token';
export const API_URL = 'http://127.0.0.1:3001';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user: {
      id: string;
      email: string;
    } | null;
  }>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const storage = await SecureStore.getItemAsync(TOKEN_KEY);
      const user = JSON.parse(storage || '{}');

      setAuthState({
        token: user.access_token,
        authenticated: !!user.access_token,
        user: { id: user._id, email: user.email },
      });
    };
    loadToken().catch(console.error.bind(console));
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string): Promise<any> => {
    try {
      const result = await loginUser(email, password);

      if (!result || !result.data.user.access_token) {
        return { error: true, msg: 'Invalid Credentials' };
      }

      const { user } = result.data;

      setAuthState({
        token: user.access_token,
        authenticated: !!user.access_token,
        user: { id: user._id, email: user.email },
      });

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.access_token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(user));
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    await SecureStore.setItemAsync(TOKEN_KEY, '');
    setAuthState({
      token: null,
      authenticated: false,
      user: null,
    });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
